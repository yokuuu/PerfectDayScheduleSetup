import { get, child, getDatabase, ref } from 'firebase/database'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserSchedule } from '../features/userScheduleSlice'
import { RootState } from '../features/userSlice'

const useGetUserScheduleData = (authCompleted: boolean) => {
    const dispatch = useDispatch()
    const dbRef = ref(getDatabase())
    const user = useSelector((state: RootState) => state.data.user)
    useEffect(() => {
        if (authCompleted) {
            get(child(dbRef, `users_tasks/${user.user.uid}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        dispatch(
                            setUserSchedule({ user_schedule: snapshot.val() })
                        )
                    } else {
                        console.log('No tasks available')
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [authCompleted])
}

export default useGetUserScheduleData

import { get, child, getDatabase, ref } from 'firebase/database'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserColors } from '../features/userColorsSlice'
import { RootState } from '../features/userSlice'

const useGetUserColorsData = (authCompleted: boolean) => {
    const dispatch = useDispatch()
    const dbRef = ref(getDatabase())
    const user = useSelector((state: RootState) => state.data.user)
    useEffect(() => {
        if (authCompleted) {
            get(child(dbRef, `users_colors/${user.user.uid}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        dispatch(setUserColors({ user_colors: snapshot.val() }))
                    } else {
                        console.log('No colors available')
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [authCompleted])
}

export default useGetUserColorsData

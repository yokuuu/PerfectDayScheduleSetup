import React, { useEffect, useState } from 'react'
import './shared/main.global.css'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { auth } from './firebase'
import { Header } from './shared/components/Header/Header'
import { RootState, loginUser, setLoading } from './shared/features/userSlice'
import HomePage from './shared/pages/HomePage'

const App = () => {
    const user = useSelector((state: RootState) => state.data.user)

    const dispatch = useDispatch()

    const [authCompleted, setAuthCompleted] = useState(false)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch(
                    loginUser({
                        uid: authUser.uid,
                        username: authUser.displayName,
                        email: authUser.email,
                    })
                )
                dispatch(setLoading(false))
                setAuthCompleted(true)
            } else {
                console.log('No user!')
            }
        })

        return () => unsubscribe()
    }, [])

    return (
        <div className="w-full h-full">
            <Header />
            {user.user ? (
                <HomePage authCompleted={authCompleted} />
            ) : (
                <>
                    {' '}
                    <div className="main__container">
                        <h1 className="main__title">Perfect Day Schedule</h1>
                        <h2 className="main__subtitle">
                            Создайте свой лучший график!
                        </h2>
                        <Link to={'/login'} className="button-main">
                            <div className="button-main-text">Начать</div>
                            <div className="button-main-icon">
                                <img
                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNSAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04LjQzODcgMC4yOTI4OTNDOC44MjA3MyAtMC4wOTc2MzExIDkuNDQwMTMgLTAuMDk3NjMxMSA5LjgyMjE3IDAuMjkyODkzTDE0LjcxMzUgNS4yOTI4OUMxNS4wOTU1IDUuNjgzNDIgMTUuMDk1NSA2LjMxNjU4IDE0LjcxMzUgNi43MDcxMUw5LjgyMjE3IDExLjcwNzFDOS40NDAxMyAxMi4wOTc2IDguODIwNzMgMTIuMDk3NiA4LjQzODcgMTEuNzA3MUM4LjA1NjY3IDExLjMxNjYgOC4wNTY2NyAxMC42ODM0IDguNDM4NyAxMC4yOTI5TDExLjY2IDdIMC45NzgyNjFDMC40Mzc5ODIgNyAwIDYuNTUyMjggMCA2QzAgNS40NDc3MiAwLjQzNzk4MiA1IDAuOTc4MjYxIDVIMTEuNjZMOC40Mzg3IDEuNzA3MTFDOC4wNTY2NyAxLjMxNjU4IDguMDU2NjcgMC42ODM0MTcgOC40Mzg3IDAuMjkyODkzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="
                                    loading="lazy"
                                    width="12.222221374511719"
                                    height="11.88305377960205"
                                    alt=""
                                    className="vectors-wrapper-8"
                                />
                            </div>
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default App

import { signOut } from 'firebase/auth'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { BreadcrumbComponent } from '../utils/Breadcrump'
import { logoutUser, RootState } from '../features/userSlice'

const ProfilePage = () => {
    const user = useSelector((state: RootState) => state.data.user.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logoutUser())
        signOut(auth)
        navigate(-1)
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <header className="w-9/12 flex justify-between items-center">
                <h1 className="text-white text-6xl font-bold p-6 pl-0">
                    Профиль
                </h1>
                <Link className="text-black text-lg" to={'/'}>
                    <svg
                        className=" w-12 h-12 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 12 16"
                    >
                        <path
                            stroke="white"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1v14m8.336-.479-6.5-5.774a1 1 0 0 1 0-1.494l6.5-5.774A1 1 0 0 1 11 2.227v11.546a1 1 0 0 1-1.664.748Z"
                        />
                    </svg>
                </Link>
            </header>
            <div className="bg-white w-full mb-[24vh]">
                <div className="w-9/12 flex  justify-start items-center m-auto">
                    <BreadcrumbComponent
                        firstValue={'Главная'}
                        secondValue={'Профиль'}
                    />
                </div>
            </div>
            <div className="bg-gray-200 flex justify-center items-center background-gradient">
                <div className=" border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
                    <h1 className="font-bold text-center block text-2xl">
                        Профиль
                    </h1>
                    <div className="flex flex-col items-start justify-start">
                        <div className="font-bold text-center  text-lg m-6 p-6 flex flex-col justify-start items-start">
                            <p>Имя: {user?.username}</p>
                            <p>Почта: {user?.email}</p>
                        </div>
                        <button
                            className="mt-6  transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg"
                            onClick={handleLogout}
                        >
                            Выйти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage

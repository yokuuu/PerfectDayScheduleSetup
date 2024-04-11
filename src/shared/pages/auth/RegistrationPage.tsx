import React, { useState } from 'react'
import { AuthButton, AuthInput } from '../../utils/AuthElements'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../../firebase'
import { Link } from 'react-router-dom'
import { BreadcrumbComponent } from '../../utils/Breadcrump'

export function RegistrationPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const user = auth.currentUser

    const signIn = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (user) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => updateProfile(user, { displayName: username }))
                .then((userCredentials) => {
                    console.log(userCredentials)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            console.log('Пользователь не выполнил вход.')
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <header className="w-9/12 flex justify-between items-center">
                <h1 className="text-white text-6xl font-bold p-6 pl-0">
                    Регистрация
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1v14m8.336-.479-6.5-5.774a1 1 0 0 1 0-1.494l6.5-5.774A1 1 0 0 1 11 2.227v11.546a1 1 0 0 1-1.664.748Z"
                        />
                    </svg>
                </Link>
            </header>
            <div className="bg-white w-full mb-24">
                <div className="w-9/12 flex  justify-start items-center m-auto">
                    <BreadcrumbComponent
                        firstValue={'Главная'}
                        secondValue={'Регистрация'}
                    />
                </div>
            </div>
            <div className="flex justify-center items-center w-full h-full">
                <div className=" border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
                    <h1 className="font-bold text-center block text-2xl">
                        Регистрация
                    </h1>
                    <form onSubmit={signIn}>
                        <AuthInput
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            id="email"
                            name="email"
                            label="Почта"
                            placeholder="example@gmail.com"
                            autofocus={true}
                        />
                        <AuthInput
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setUsername(e.target.value)}
                            value={username}
                            type="text"
                            id="username"
                            name="username"
                            label="Имя"
                            placeholder="Иван"
                            autofocus={false}
                        />
                        <AuthInput
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            id="password"
                            name="password"
                            label="Пароль"
                            placeholder="••••••••••"
                            autofocus={false}
                        />
                        <AuthButton value="Зарегистрироваться" type="submit" />
                        <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                            Уже есть аккаунт?{' '}
                            <Link className="text-blue-600" to={'/login'}>
                                Войдите
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

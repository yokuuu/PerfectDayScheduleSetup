import React from 'react'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const error = useRouteError()

    if (isRouteErrorResponse(error)) {
        return (
            <div
                id="error-page"
                className="flex flex-col items-center justify-center h-screen"
            >
                <h1 className="m-6 text-white text-4xl">Ой! {error.status}</h1>
                <p className="m-6 text-white text-2xl">{error.statusText}</p>
                {error.data?.message && (
                    <p className="m-6 text-white text-xl">
                        {error.data.message}
                    </p>
                )}
                <div>
                    <Link className="button-main" to={'/'}>
                        Вернуться назад
                    </Link>
                </div>
            </div>
        )
    } else if (error instanceof Error) {
        return (
            <div
                id="error-page"
                className="flex flex-col items-center justify-center h-screen"
            >
                <h1 className="m-6 text-white text-4xl">
                    Извините, произошла ошибка!
                </h1>
                <p className="m-6 text-white text-2xl">Что-то пошло не так.</p>
                <p className="m-6 text-white text-xl">{error.message}</p>
                <div className="text-white text-2xl">
                    <Link className="button-main" to={'/'}>
                        Вернуться назад
                    </Link>
                </div>
            </div>
        )
    } else {
        return <></>
    }
}

export default ErrorPage

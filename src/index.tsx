import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './shared/pages/auth/ErrorPage'
import { LoginPage } from './shared/pages/auth/LoginPage'
import { RegistrationPage } from './shared/pages/auth/RegistrationPage'
import ProfilePage from './shared/pages/ProfilePage'
import SettingsPage from './shared/pages/SettingsPage'
import { store } from './shared/state/store'

const rootEl = document.querySelector('#root')
if (!rootEl) throw new Error('Cannot find root element with that id')
const root = createRoot(rootEl)
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/registration',
        element: <RegistrationPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/profile',
        element: <ProfilePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/settings',
        element: <SettingsPage />,
        errorElement: <ErrorPage />,
    },
])

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)

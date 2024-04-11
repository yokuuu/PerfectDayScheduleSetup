import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../features/userSlice'
import CurrentModal from './HeaderWrapper/Current/CurrentModal'
import HelpModal from './HeaderWrapper/Help/HelpModal'
import {
    HiOutlineCog,
    HiOutlineCalendar,
    HiLogin,
    HiOutlineUser,
} from 'react-icons/hi'

export function Header() {
    const user = useSelector((state: RootState) => state.data.user.user)
    return (
        <div className="header__container w-nav">
            <header className="header">
                <a className="header__logo-link w--current header__logo-container">
                    <img
                        // src={require('../../../../public/assets/Images/MainLogo.png')}
                        alt="MainLogo"
                        className="header__logo"
                    />
                </a>
                <nav className="header__nav is-page-height-tablet">
                    <HiOutlineCalendar className="fill-minorPurple h-8 w-8 smallElement" />
                    <CurrentModal />
                    <Link
                        className="header__link flex flex-row"
                        to={'/settings'}
                    >
                        <HiOutlineCog />
                        <div className="text-[#cfcdff] header__link-text">
                            Настройки
                        </div>
                    </Link>
                    <HelpModal />
                    <div className="smallElement">
                        {user ? (
                            <Link to={'/profile'}>
                                <HiOutlineUser className="header__icon" />
                            </Link>
                        ) : (
                            <Link to={'/login'}>
                                <HiLogin className="header__icon" />
                            </Link>
                        )}
                    </div>
                </nav>
                <div className="header_button-wrapper">
                    <div className="button-secondary w-inline-block">
                        {user ? (
                            <div className="button_text-small">
                                <Link to={'/profile'}>Профиль</Link>
                            </div>
                        ) : (
                            <div className="button_text-small">
                                <Link to={'/login'}>Войти</Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </div>
    )
}

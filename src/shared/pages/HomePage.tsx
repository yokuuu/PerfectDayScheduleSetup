import React, { useState } from 'react'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { ru } from 'date-fns/locale'
import { Link } from 'react-router-dom'
import Calendar from '../components/Calendar/Calendar'
import useGetUserColorsData from '../hooks/useGetUserColorsData'
import useGetUserScheduleData from '../hooks/useGetUserScheduleData'
import { RootState } from '../features/userSlice'

interface Props {
    authCompleted: boolean
}

const HomePage = ({ authCompleted }: Props) => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [buttonClicked, setButtonClicked] = useState(false)
    const handleSetToday = () => {
        setCurrentDate(new Date())
        setButtonClicked(!buttonClicked)
    }

    const user = useSelector((state: RootState) => state.data.user)

    useGetUserScheduleData(authCompleted)
    useGetUserColorsData(authCompleted)

    return (
        <div className="w-full h-full">
            {user.user ? (
                <div className="content">
                    <div className=" w-2/5 flex items-center justify-center m-auto flex-col">
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-white">
                                Выбранная дата:{' '}
                                {format(currentDate, 'LLLL, dd, yyyy', {
                                    locale: ru,
                                })}
                            </span>
                            <div className="flex items-center justify-evenly">
                                <button
                                    onClick={handleSetToday}
                                    className="button-main text-white flex items-center justify-center"
                                >
                                    Сегодня
                                </button>
                            </div>
                        </div>
                    </div>
                    <Calendar
                        value={currentDate}
                        onChange={setCurrentDate}
                        buttonClicked={buttonClicked}
                        setButtonClicked={setButtonClicked}
                    />
                </div>
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

export default HomePage

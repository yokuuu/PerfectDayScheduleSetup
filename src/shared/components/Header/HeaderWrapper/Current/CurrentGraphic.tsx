import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getDatabase, ref, child, get } from 'firebase/database'
import { RootState } from '../../../../features/userSlice'

interface CurrentGraphic {
    checkbox: string[]
    select: {
        [key: string]: string[]
    }
}

const initialCurrentGraphic: CurrentGraphic = {
    checkbox: [],
    select: {
        key: [],
    },
}

const CurrentGraphic = () => {
    const [isGraphicExists, setIsGraphicExists] = useState(false)
    const [currentGraphic, setCurrentGraphic] = useState<CurrentGraphic>(
        initialCurrentGraphic
    )
    const [selectedOption, setSelectedOption] = useState('')

    const user = useSelector((state: RootState) => state.data.user)
    const dbRef = ref(getDatabase())

    useEffect(() => {
        if (user.user) {
            get(child(dbRef, `users/${user.user.uid}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        setCurrentGraphic(snapshot.val().user_schedule)
                        setIsGraphicExists(true)
                    } else {
                        console.log('No data available')
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [user.user])
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSelectedOption(value)
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            {isGraphicExists ? (
                <div className="w-full h-full flex items-center justify-evenly">
                    {currentGraphic.checkbox &&
                        currentGraphic.checkbox.map((value, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-start justify-center"
                            >
                                <h4 className="options__title text-white border-b-4 border-mainPurple">
                                    Ваши Чекбоксы :
                                </h4>
                                <div
                                    className="flex items-center justify-center m-6 ml-0"
                                    key={index}
                                >
                                    <label className="text-2xl mr-6 text-white">
                                        {value}
                                    </label>
                                    <input
                                        type="checkbox"
                                        key={index}
                                        value={value}
                                    />
                                </div>
                            </div>
                        ))}
                    {currentGraphic.select &&
                        Object.entries(currentGraphic.select).map(
                            ([key, value]) => (
                                <div
                                    key={key}
                                    className="flex flex-col items-start justify-center"
                                >
                                    <h4 className="options__title text-white border-b-4 border-mainPurple">
                                        Ваши Селекты :
                                    </h4>
                                    <div className="flex m-6 ml-0" key={key}>
                                        <p className="text-2xl mr-6 text-white">
                                            {key}
                                        </p>
                                        <select
                                            value={selectedOption}
                                            onChange={handleSelectChange}
                                            className="rounded"
                                        >
                                            <option key="choose-option">
                                                Выберете
                                            </option>
                                            {value.map((value, index) => (
                                                <option key={index}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )
                        )}
                </div>
            ) : (
                <div className="text-xl text-white">
                    На данный момент здесь ничего нет, добавьте свой график...
                    <div>
                        {user.user ? (
                            <Link className="text-blue-600" to={'/settings'}>
                                Добавить
                            </Link>
                        ) : (
                            <Link className="text-blue-600" to={'/login'}>
                                Войти
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CurrentGraphic

//@ts-nocheck
import React, { useState, useEffect } from 'react'
import { getDatabase, ref, child, get } from 'firebase/database'
import { useSelector } from 'react-redux'
import { writeScheduleData } from '../../../../firebase'
import { RootState } from '../../../features/userSlice'
import { Link } from 'react-router-dom'
import { CellColoring } from './CellColoring'

interface FormState {
    [key: string]: string | boolean
}

export interface CurrentGraphic {
    checkbox: string[]
    select: {
        [key: string]: string[]
    }
}

export interface ExecutedGraphic {
    [key: string]: {
        [key: string]: string | boolean
    }
}

const initialCurrentGraphic: CurrentGraphic = {
    checkbox: [],
    select: {
        key: [],
    },
}

interface Props {
    date: string
}

const CellFunction = ({ date }: Props) => {
    const [currentGraphic, setCurrentGraphic] = useState<CurrentGraphic>(
        initialCurrentGraphic
    )

    const dbRef = ref(getDatabase())
    const user = useSelector((state: RootState) => state.data.user)
    const schedule = useSelector((state: RootState) => state.data.user_schedule)
    const [isGraphicExists, setIsGraphicExists] = useState(false)
    const [isDayScheduleDone, setIsDayScheduleDone] = useState(false)
    const [formState, setFormState] = useState<FormState>({})

    useEffect(() => {
        get(child(dbRef, `users/${user.user.uid}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setCurrentGraphic(snapshot.val().user_schedule)
                    setIsGraphicExists(true)
                    if (snapshot.val().user_schedule.checkbox) {
                        snapshot
                            .val()
                            .user_schedule.checkbox.forEach((value: string) => {
                                setFormState((prevState) => ({
                                    ...prevState,
                                    [value]: false,
                                }))
                            })
                    }
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    useEffect(() => {
        if (
            schedule &&
            schedule.user_schedule &&
            schedule.user_schedule.user_schedule &&
            schedule.user_schedule.user_schedule[`${date.split('.').join('_')}`]
        ) {
            setIsDayScheduleDone(true)
        }
    }, [schedule, date])

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormState((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFormState((prevState) => ({ ...prevState, [name]: checked }))
    }

    const uid = user.user.uid
    const newDate = String(date).split('.').join('_')

    async function callWriteScheduleData() {
        writeScheduleData(user.user.uid, newDate, formState)
    }
    async function readScheduleData() {
        get(child(dbRef, `users_tasks/${user.user.uid}/${newDate}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    CellColoring(
                        currentGraphic,
                        snapshot.val().user_day_schedule,
                        date,
                        uid
                    )
                } else {
                    console.log('No success')
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        async function handleDataOperations() {
            await callWriteScheduleData()
            await readScheduleData()
        }

        handleDataOperations()

        window.location.reload(false)
    }

    return (
        <form className="w-full h-full" onSubmit={handleSubmit}>
            <div className="w-full h-full flex items-center justify-center">
                {isGraphicExists && !isDayScheduleDone && (
                    <div className="w-full h-full flex items-center justify-around flex-col">
                        <div className="w-full h-full flex items-center justify-evenly mb-16">
                            {currentGraphic.checkbox &&
                                currentGraphic.checkbox.map((value, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-start justify-center"
                                    >
                                        <h4 className="text-5xl font-black text-white">
                                            Ваши Чекбоксы:
                                        </h4>
                                        <div
                                            className="flex items-center justify-center m-6"
                                            key={index}
                                        >
                                            <label className="text-2xl mr-6 text-white">
                                                {value}
                                            </label>
                                            <input
                                                type="checkbox"
                                                key={index}
                                                value={value}
                                                name={value}
                                                checked={
                                                    formState[
                                                        currentGraphic.checkbox
                                                            .value || false
                                                    ]
                                                }
                                                onChange={handleCheckboxChange}
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
                                            <h4 className="cell__title text-white">
                                                Ваши Селекты:
                                            </h4>
                                            <div className="flex m-6" key={key}>
                                                <p className="text-2xl mr-6 text-white">
                                                    {key}
                                                </p>
                                                <select
                                                    name={key}
                                                    value={formState[key] || ''}
                                                    onChange={
                                                        handleSelectChange
                                                    }
                                                >
                                                    <option key="choose-option">
                                                        Выберете
                                                    </option>
                                                    {value.map(
                                                        (value, index) => (
                                                            <option key={index}>
                                                                {value}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    )
                                )}
                        </div>
                        <button
                            type="submit"
                            className="button-main text-white"
                        >
                            Сохранить
                        </button>
                    </div>
                )}

                {isGraphicExists && isDayScheduleDone && (
                    <div className="p-6 flex items-start justify-center flex-col">
                        <h3 className="cell__title text-white">
                            Ваши выполненные дела:
                        </h3>
                        {schedule.user_schedule.user_schedule[
                            `${date.split('.').join('_')}`
                        ].user_day_schedule &&
                            Object.entries(
                                schedule.user_schedule.user_schedule[
                                    `${date.split('.').join('_')}`
                                ].user_day_schedule
                            ).map(([key, value], index) => (
                                <div
                                    className="text-2xl text-white m-2"
                                    key={index}
                                >
                                    {key} -{' '}
                                    {value === true
                                        ? 'Выполнено!'
                                        : value === false
                                          ? 'Не Выполнено!'
                                          : value}
                                </div>
                            ))}
                    </div>
                )}

                {!isGraphicExists && (
                    <div className="text-xl text-white">
                        На данный момент здесь ничего нет, добавьте свой
                        график...
                        <div>
                            {user.user ? (
                                <button className="text-white">Добавить</button>
                            ) : (
                                <Link to={'/login'}>Войти</Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </form>
    )
}

export default CellFunction

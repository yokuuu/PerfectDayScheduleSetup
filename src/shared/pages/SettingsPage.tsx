import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { writeUserData } from '../../firebase'
import { BreadcrumbComponent } from '../utils/Breadcrump'
import { RootState } from '../features/userSlice'

interface SelectList {
    [key: string]: string[]
}

const SettingsPage = () => {
    const user = useSelector((state: RootState) => state.data.user)

    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState('')
    const [checkboxList, setCheckboxList] = useState<string[]>([])
    const [selectList, setSelectList] = useState<SelectList>({})
    const [optionsInputValue, setOptionsInputValue] = useState('')

    const [isSelectVisible, setIsSelectVisible] = useState(false)
    const [isOptionsInputVisible, setIsOptionsInputVisible] = useState(false)

    const [isSelectButtonDisabled, setIsSelectButtonDisabled] = useState(false)
    const [isCheckboxButtonDisabled, setIsCheckboxButtonDisabled] =
        useState(false)
    const [isAddSelectButtonDisabled, setAddIsSelectButtonDisabled] =
        useState(false)

    const [tags, setTags] = useState<string[]>([])

    const handleSelectClick = () => {
        setIsSelectVisible(true)
        setIsSelectButtonDisabled(true)
        setIsCheckboxButtonDisabled(false)
        setAddIsSelectButtonDisabled(false)
        setIsOptionsInputVisible(false)
    }

    const handleCheckboxClick = () => {
        setIsSelectVisible(false)
        setIsCheckboxButtonDisabled(true)
        setIsSelectButtonDisabled(false)
        setAddIsSelectButtonDisabled(false)
        setIsOptionsInputVisible(false)
    }

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setInputValue(event.target.value)
    }

    const handleAddCheckboxToList = () => {
        if (inputValue.trim() !== '') {
            setCheckboxList((prevState) => [...prevState, inputValue])
            setInputValue('')
            setTags((prevTags) => [...prevTags, inputValue])
        }
    }

    const handleAddSelectToList = () => {
        if (inputValue.trim() !== '') {
            setSelectList((prevState) => ({
                ...prevState,
                [inputValue]: [],
            }))
            setInputValue('')
            setIsOptionsInputVisible(true)
            setTags((prevTags) => [...prevTags, inputValue + ' '])
            setAddIsSelectButtonDisabled(true)
        }
    }

    const handleOptionsInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setOptionsInputValue(event.target.value)
    }

    const handleAddSelectOptionsToList = () => {
        if (optionsInputValue.trim() !== '') {
            if (Object.keys(selectList).length === 0) return

            const lastKey =
                Object.keys(selectList)[Object.keys(selectList).length - 1]
            setSelectList((prevState) => ({
                ...prevState,
                [lastKey]: [...prevState[lastKey], `${optionsInputValue}`],
            }))

            setOptionsInputValue('')
        }
    }

    const removeTags = (index: number) =>
        setTags((prevTags) => prevTags.filter((tag, i) => i !== index))

    const handleSave = () => {
        writeUserData(user.user.uid, user.user.username, user.user.email, {
            checkbox: checkboxList,
            select: selectList,
        })
        navigate(-1)
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <header className="w-9/12 flex justify-between items-center">
                <h1 className="text-white text-6xl font-bold p-6 pl-0">
                    Настойки
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
                        secondValue={'Настойки'}
                    />
                </div>
            </div>
            {user.user ? (
                <div className="max-w-[1280px] mx-0 my-auto flex items-center justify-center flex-col h-full">
                    <div className="flex w-full flex-col border-b">
                        <h2 className="text-white text-3xl font-bold">
                            Выберете, что хотите добавить:{' '}
                        </h2>
                        <div className="flex items-center justify-around">
                            <div className="m-6">
                                <button
                                    className={`stroke  transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer  transform hover:-translate-y-1 hover:shadow-lg ${
                                        isSelectButtonDisabled
                                            ? 'bg-gray-400 cursor-not-allowed bg-gradient-to-r from-gray-400 to-gray-600'
                                            : 'bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900'
                                    }`}
                                    onClick={handleSelectClick}
                                    disabled={isSelectButtonDisabled}
                                >
                                    Селект
                                </button>
                            </div>
                            <div className="m-6">
                                <button
                                    className={`stroke  transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-gradientFirst to-gradientSecond hover:from-gradientThird hover:to-gradientFourth focus:bg-gradientFifth transform hover:-translate-y-1 hover:shadow-lg ${
                                        isCheckboxButtonDisabled
                                            ? 'bg-gray-400 cursor-not-allowed bg-gradient-to-r from-gray-400 to-gray-600'
                                            : ''
                                    }`}
                                    onClick={handleCheckboxClick}
                                    disabled={isCheckboxButtonDisabled}
                                >
                                    Чекбокс
                                </button>
                            </div>
                        </div>
                    </div>
                    {tags.length == 0 ? (
                        <div className="mb-6"></div>
                    ) : (
                        <div className="flex items-center p-4 border-b mb-6">
                            {tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className={`m-2 w-fit stroke block py-3 px-4 text-white font-bold rounded cursor-pointer  ${
                                        tag[tag.length - 1] == ' '
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-400'
                                            : 'bg-gradient-to-r from-gradientFirst to-gradientSecond'
                                    }`}
                                >
                                    <span className="m-2">{tag}</span>
                                    <button onClick={() => removeTags(index)}>
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="">
                        {isSelectVisible ? (
                            <div className="flex flex-col">
                                <div className="flex flex-col items-start ">
                                    <h3 className="text-white text-4xl font-bold self-center">
                                        Селект
                                    </h3>
                                    <label className="m-6 ml-0 text-white text-xl font-bold">
                                        Введите название дела:
                                    </label>
                                </div>
                                <div className="flex">
                                    <div className="flex flex-col items-start mr-6">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            placeholder="Введите название дела..."
                                        />
                                        <button
                                            className={`stroke mt-6 mb-10  transition-all block py-3 px-[2.95rem] w-fit text-white font-bold rounded cursor-pointer  transform hover:-translate-y-1 hover:shadow-lg ${
                                                isAddSelectButtonDisabled
                                                    ? 'bg-gray-400 cursor-not-allowed bg-gradient-to-r from-gray-400 to-gray-600'
                                                    : 'bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900'
                                            }`}
                                            onClick={handleAddSelectToList}
                                            disabled={isAddSelectButtonDisabled}
                                        >
                                            Добавить Селект
                                        </button>
                                    </div>
                                    {isOptionsInputVisible && (
                                        <div className="flex flex-col items-start">
                                            <input
                                                type="text"
                                                value={optionsInputValue}
                                                onChange={
                                                    handleOptionsInputChange
                                                }
                                                placeholder="Введите опции"
                                            />
                                            <button
                                                className="stroke mt-6  transition-all block py-3 px-[2.95rem] w-fit text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg"
                                                onClick={
                                                    handleAddSelectOptionsToList
                                                }
                                            >
                                                Добавить опции
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-start mb-6">
                                <h3 className="text-white text-4xl font-bold self-center">
                                    Чекбокс
                                </h3>
                                <label className="m-6 ml-0 text-white text-xl font-bold">
                                    Введите название дела:
                                </label>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder="Введите название дела..."
                                />
                                <button
                                    className="stroke mt-6  transition-all block py-3 px-[2.7rem] w-fit text-white font-bold rounded cursor-pointer bg-gradient-to-r from-gradientFirst to-gradientSecond hover:from-gradientThird hover:to-gradientFourth focus:bg-gradientFifth transform hover:-translate-y-1 hover:shadow-lg"
                                    onClick={handleAddCheckboxToList}
                                >
                                    Добавить Чекбокс
                                </button>
                            </div>
                        )}
                        {tags.length == 0 ? (
                            <></>
                        ) : (
                            <div className="flex items-center justify-center self-start">
                                <button
                                    onClick={handleSave}
                                    className="button-main text-white"
                                >
                                    Сохранить
                                </button>
                            </div>
                        )}
                    </div>
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

export default SettingsPage

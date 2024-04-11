//@ts-nocheck
import React, { useEffect } from 'react'
import Cell from './Cell'
import {
    add,
    differenceInDays,
    endOfMonth,
    format,
    setDate,
    startOfMonth,
    sub,
    subMonths,
    getDaysInMonth,
} from 'date-fns'
import { ru } from 'date-fns/locale'
import CalendarModal from './CalendarModal'
import { useSelector } from 'react-redux'
import { RootState } from '../../features/userSlice'

interface Props {
    value?: Date
    onChange?: (value: Date) => void
    buttonClicked: boolean
    setButtonClicked
}

const Calendar: React.FunctionComponent<Props> = ({
    value = new Date(),
    onChange,
    buttonClicked,
    setButtonClicked,
}) => {
    const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

    const startDate = startOfMonth(value)
    const endDate = endOfMonth(value)
    const numDays = differenceInDays(endDate, startDate) + 1

    let prefixDays = 0
    if (startDate.getDay() === 0) {
        prefixDays = 6
    } else {
        prefixDays = startDate.getDay() - 1
    }
    let suffixDays = 0
    if (endDate.getDay() === 0) {
        suffixDays = 0
    } else {
        suffixDays = 7 - endDate.getDay()
    }

    const previousMonthDate = subMonths(value, 1)
    const prevMonthPrefixDays =
        getDaysInMonth(previousMonthDate) - prefixDays + 1

    const prevMonth = () => {
        onChange && onChange(sub(value, { months: 1 }))
        setButtonClicked(!buttonClicked)
    }
    const nextMonth = () => {
        onChange && onChange(add(value, { months: 1 }))
        setButtonClicked(!buttonClicked)
    }

    const prevYear = () => {
        onChange && onChange(sub(value, { years: 1 }))
        setButtonClicked(!buttonClicked)
    }
    const nextYear = () => {
        onChange && onChange(add(value, { years: 1 }))
        setButtonClicked(!buttonClicked)
    }

    const handleClickDate = (index: number) => {
        const date = setDate(value, index)
        onChange && onChange(date)
    }

    const currentDate = value

    const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2)
    const currentYear = currentDate.getFullYear().toString()
    const formattedString = `_${currentMonth}_${currentYear}`
    const colors = useSelector((state: RootState) => state.data.user_colors)

    useEffect(() => {
        if (colors.user_colors) {
            Object.keys(colors.user_colors.user_colors).forEach((id) => {
                const element = document.getElementById(id)
                const calendarCellList =
                    document.querySelectorAll('.calendarCell')
                const setColorForCells = async () => {
                    if (calendarCellList) {
                        for (let cell of calendarCellList) {
                            cell.style.backgroundColor =
                                'rgba(220, 230, 255, 0.07)'
                            await new Promise((resolve) =>
                                setTimeout(resolve, 0)
                            )
                        }
                    }

                    if (element) {
                        element.style.backgroundColor =
                            colors.user_colors.user_colors[id].color
                    }
                }
                setColorForCells()
            })
        }
    }, [colors.user_colors, buttonClicked])

    return (
        <div className="max-w-[980px] w-full rounded-sm m-16">
            <div className="grid grid-cols-7  items-center justify-center text-center calendarMain">
                <Cell className="text-white" onClick={prevYear}>
                    {'<<'}
                </Cell>
                <Cell className="text-white" onClick={prevMonth}>
                    {'<'}
                </Cell>
                <Cell className="col-span-3 text-white">
                    {format(value, 'LLLL yyyy', { locale: ru })
                        .charAt(0)
                        .toUpperCase() +
                        format(value, 'LLLL yyyy', { locale: ru }).slice(1)}
                </Cell>
                <Cell className="text-white" onClick={nextMonth}>
                    {'>'}
                </Cell>
                <Cell className="text-white" onClick={nextYear}>
                    {'>>'}
                </Cell>
                {daysOfWeek.map((day) => (
                    <Cell
                        key={day}
                        className="text-sm font-bold text-white border-white border-y-2 mt-2"
                    >
                        {day}
                    </Cell>
                ))}

                {Array.from({ length: prefixDays }).map((_, index) => (
                    <Cell className="text-gray-400" key={index}>
                        {prevMonthPrefixDays + index}
                    </Cell>
                ))}

                {Array.from({ length: numDays }).map((_, index) => {
                    const date = index + 1
                    const isCurrentDate = date === value.getDate()
                    const fullDateData = value.toLocaleString().split(',')[0]

                    return (
                        <Cell
                            className="text-white calendarCell"
                            isActive={isCurrentDate}
                            onClick={() => handleClickDate(date)}
                            key={date}
                            id={String(index + 1 + formattedString).padStart(
                                10,
                                '0'
                            )}
                        >
                            <CalendarModal
                                date={date}
                                fullDate={fullDateData}
                            />
                        </Cell>
                    )
                })}

                {Array.from({ length: suffixDays }).map((_, index) => (
                    <Cell className="text-gray-400" key={index}>
                        {index + 1}
                    </Cell>
                ))}
            </div>
        </div>
    )
}

export default Calendar

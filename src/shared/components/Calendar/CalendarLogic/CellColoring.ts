import { writeScheduleColorData } from '../../../../firebase'
import CurrentGraphic from '../../Header/HeaderWrapper/Current/CurrentGraphic'
import { ExecutedGraphic } from './CellFunction'

type TransformedData = {
    [key: string]: {
        [key: string]: string
    }
}

type Result = {
    key: string | number
    value: number
}[]

export function CellColoring(
    current: CurrentGraphic,
    executed: ExecutedGraphic,
    date: string,
    uid: string
) {
    let countCheckboxValues = 0
    if (current.checkbox) {
        countCheckboxValues = current.checkbox.length
    }

    let countSelectValues = 0
    if (current.select) {
        countSelectValues = Object.values(current.select).reduce(
            (total, options) => total + options.length,
            0
        )
    }

    const absolutePoints = 100 / (countCheckboxValues + countSelectValues)

    const transformedData: TransformedData = Object.keys(current.select).reduce(
        (acc: TransformedData, key) => {
            acc[key] = {}
            current.select[key].forEach((value, index) => {
                acc[key][value] = (absolutePoints * (index + 1)).toFixed(1)
            })
            return acc
        },
        {}
    )

    const results: Result = []
    const totalResults: number[] = []
    Object.entries(executed).forEach(([key, value]) => {
        if (
            transformedData[key] &&
            typeof value === 'string' &&
            typeof transformedData[key][value] === 'string'
        ) {
            const matchValue = parseFloat(transformedData[key][value])
            if (!isNaN(matchValue)) {
                const existingResult = results.find(
                    (result) => result.key === key
                )
                if (existingResult) {
                    existingResult.value += matchValue
                } else {
                    totalResults.push(matchValue)
                }
            }
        }
    })

    const checkboxPoints =
        Object.values(executed).filter((value) => {
            if (typeof value === 'boolean') {
                value === true
            }
        }).length * absolutePoints

    const sumOfResults = totalResults.reduce((acc, number) => acc + number, 0)
    const totalPoints = Math.round(sumOfResults + checkboxPoints)
    const newDate = String(date).split('.').join('_')

    const colorMap: { [key: number]: string } = {
        25: 'red',
        50: 'orange',
        75: 'yellow',
        100: 'green',
    }

    let color = ''
    for (let points in colorMap) {
        if (totalPoints < parseInt(points)) {
            color = colorMap[parseInt(points)]
            break
        }
    }

    writeScheduleColorData(uid, newDate, color)
}

import React from 'react'
import clsx from 'clsx'

interface Props extends React.PropsWithChildren {
    onClick?: () => void
    className?: string
    isActive?: boolean
    id?: string
}

const Cell: React.FunctionComponent<Props> = ({
    onClick,
    children,
    className,
    isActive = false,
    id,
}) => {
    return (
        <div
            onClick={isActive ? undefined : onClick}
            className={clsx(
                'h-20 flex items-center justify-center',
                {
                    'cursor-pointer calendar__cell': !!(isActive
                        ? undefined
                        : onClick),
                },
                { 'text-white calendar__cell': isActive },
                className
            )}
            id={id}
        >
            {children}
        </div>
    )
}

export default Cell

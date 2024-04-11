import React from 'react'

interface ButtonProps {
    value: string
    type: 'submit'
}

export const AuthButton = ({ value, type }: ButtonProps) => {
    return (
        <div>
            <button
                type={type}
                className="mt-6 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg"
            >
                {value}
            </button>
        </div>
    )
}

interface InputProps {
    type: string
    id: string
    name: string
    label: string
    placeholder: string
    autofocus: boolean
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AuthInput = ({
    type,
    id,
    name,
    label,
    placeholder,
    autofocus,
    value,
    onChange,
}: InputProps) => {
    return (
        <label className="text-gray-500 block mt-3">
            {label}
            <input
                value={value}
                onChange={onChange}
                autoFocus={autofocus}
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
            />
        </label>
    )
}

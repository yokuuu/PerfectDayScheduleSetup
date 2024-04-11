/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/client/index.html',
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        extend: {
            minWidth: {
                '1/2': '50%',
            },
        },
        colors: {
            mainBlack: '#313033',
            testBlack: '#1B1B1B',
            commonBlack: '#333',
            borderGray: '#353535',
            mainBlue: '#01C4FF',
            backgroundBlue: 'rgb(63, 0, 255)',
            mainPurple: '#9e9cff',
            minorPurple: '#cfcdff',
            gradientFirst: '#3f7b03',
            gradientSecond: '#b0b91a',
            gradientThird: '#57aa08',
            gradientFourth: '#bcc735',
            gradientFifth: '#ced17e',
        },
        size: {
            sm: 'max-w-sm',
            md: 'max-w-md',
            lg: 'max-w-lg',
            xl: 'max-w-xl',
            '2xl': 'max-w-2xl',
            '3xl': 'max-w-3xl',
            '4xl': 'max-w-4xl',
            '5xl': 'max-w-5xl',
            '6xl': 'max-w-6xl',
            '7xl': 'max-w-7xl',
        },
    },
    plugins: [require('flowbite/plugin')],
}

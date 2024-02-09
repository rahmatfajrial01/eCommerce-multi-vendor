import React from 'react'

export const Button = (props) => {
    const { name, type, color } = props
    return (
        <button
            type={type}
            className={`text-center w-full p-2 bg-${color}-500 rounded-xl text-white`}
        >
            {name}
        </button>
    )
}

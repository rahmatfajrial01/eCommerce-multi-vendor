import React from 'react'

export const Button = (props) => {
    const { name, type, color, onClick, w } = props
    return (
        <button
            onClick={onClick}
            type={type}
            className={`text-center w-${w} p-2 bg-${color}-500 rounded-xl text-white text-sm`}
        >
            {name}
        </button>
    )
}

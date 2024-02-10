import React from 'react'

const Input = (props) => {
    const { type, label, name, value, onChange, placeholder } = props
    return (
        <div className='flex flex-col text-sm'>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onChange}
                className='border p-2 rounded-xl'
            />
        </div>
    )
}

export default Input
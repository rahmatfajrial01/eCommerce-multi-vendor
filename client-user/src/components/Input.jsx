import React from 'react'

const Input = (props) => {
    const { label, placeholder } = props
    return (
        <div className='flex flex-col text-sm'>
            <label htmlFor="">{label}</label>
            <input
                className='border p-2 rounded-xl'
                type="text"
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input
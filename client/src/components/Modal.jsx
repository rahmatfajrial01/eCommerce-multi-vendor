import React, { useState } from 'react'

const Modal = (props) => {
    const { isOpen, children, closeModal, text } = props

    return (
        <div id='container' onClick={closeModal} className={`fixed inset-0 -top-5 z-10 min-h-screen w-full ${isOpen === true ? "flex justify-center items-center" : "hidden"}`}>
            <div className='max-w-fit space-y-3 bg-white p-3 border rounded-xl '>
                {text && <p>{text}</p>}
                <div className='flex justify-end gap-3 text-white'>
                    {/* <button type='reset' onClick={() => setIsOpen(false)} className='bg-blue-500 py-1 px-3 rounded-xl'>NO</button>
                    <button onClick={() => deleteAPost(idCat)} className='bg-red-500 p-1 px-3 rounded-xl'>Yes</button> */}
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal   
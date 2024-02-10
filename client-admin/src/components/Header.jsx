import React from 'react'

const Header = () => {
    return (
        <header className='w-full fixed top-0 z-10'>
            <section className='flex justify-between bg-green-500 text-white py-2 px-7'>
                <div>Seller Center</div>
                <div>Account</div>
            </section>
        </header>
    )
}

export default Header
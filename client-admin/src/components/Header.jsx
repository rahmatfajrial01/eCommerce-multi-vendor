import React from 'react'

const Header = () => {
    return (
        <header className='fixed w-full z-10 top-0'>
            <section className='flex justify-between bg-green-500 text-white py-2 px-8'>
                <div>Seller Center</div>
                <div>Account</div>
            </section>
        </header>
    )
}

export default Header
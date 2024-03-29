import React from 'react'

const DataTable = (props) => {
    const { headerTitle, data, children } = props
    return (
        <div className='overflow-x-auto p-5 bg-slate-200 rounded-xl'>
            <table className='border w-full text-nowrap bg-white rounded-xl'>
                <thead>
                    <tr className='border-2'>
                        {
                            headerTitle.map((item, index) =>
                                <th key={index} className='text-start p-2'>{item}</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    <>
                        {children}
                    </>
                </tbody>
            </table>
        </div>
    )
}

export default DataTable
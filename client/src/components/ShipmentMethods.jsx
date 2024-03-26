import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import images from '../constants/images'
import { updateShippment } from '../features/order/orderSlice'
import { getCost } from '../features/rajaOngkir/rajaOngkirSlice'
import { clearCost } from '../features/user/userSlice'


const ShipmentMethods = (props) => {
    const {
        item,
        fromChild,
        idShope,
        destination
    } = props
    console.log(item)

    const token = useSelector(state => state?.auth?.user?.token)
    const rajaOngkirState = useSelector((state) => state?.rajaOngkir)
    let [shipment, setShipment] = useState(item?.shippment)
    let [cost, setCost] = useState(item?.shippmentCost)
    let [service, setService] = useState(item?.shippmentService)
    const dispatch = useDispatch()

    // console.log(idShope)
    let [dataCost, setDataCost] = useState('')
    let [id, setId] = useState(item?.shope)

    useEffect(() => {
        if (rajaOngkirState?.cost?.rajaongkir?.query?.idShope === id)
            setDataCost(rajaOngkirState?.cost?.rajaongkir?.results[0]?.costs)
    }, [rajaOngkirState])

    useEffect(() => {
        if (shipment) {
            let data = { origin: '153', destination: destination, weight: item?.weight, courier: shipment, idShope: id }
            // let data = { origin: '501', destination: '114', weight: 1700, courier: 'jne' }
            let userData = {
                token, data
            }
            dispatch(getCost(userData))
            // dispatch(updateShippment())
        }
        // if (shipment !== item?.shippment) {
        // setCost('')
        // }
    }, [
        shipment, destination
    ])

    let handleClick = (a, b) => {
        setCost(a)
        setService(b)
        fromChild([{ id, a, b }])
    }

    const handleClearCost = () => {
        let data = { idShope: id }
        let userData = { token, data }
        console.log(userData)
        dispatch(clearCost(userData))
    }

    return (
        <div className='space-y-5' >
            <h1>Shipment Methods</h1>
            {/* <p>Sent From : <span>{rajaOngkirState?.cost?.rajaongkir?.origin_details?.province}, {rajaOngkirState?.cost?.rajaongkir?.origin_details?.city_name}</span></p> */}
            <div className='flex gap-5 items-center'>
                <button onClick={() => { handleClearCost(), setCost(''), setShipment('jne'), setId(idShope) }} className={`rounded-lg p-1  ${shipment === 'jne' && 'border-2 border-green-500'}`}>
                    <img className='h-16 w-24 object-cover' src={images.jne} alt="" />
                </button>
                <button onClick={() => { handleClearCost(), setCost(''), setShipment('pos'), setId(idShope) }} className={`rounded-lg p-1  ${shipment === 'pos' && 'border-2 border-green-500'}`}>
                    <img className='h-16 w-24 object-cover' src={images.pos} alt="" />
                </button>
                <button onClick={() => { handleClearCost(), setCost(''), setShipment('tiki'), setId(idShope) }} className={`rounded-lg p-1 pt-5 h-16   ${shipment === 'tiki' && 'border-2 border-green-500'}`}>
                    <img className='h-8 w-24 object-cover' src={images.tiki} alt="" />
                </button>
            </div>
            <div className='flex gap-5'>
                {
                    dataCost && dataCost.map((item, index) =>
                        <div key={index} className={`${item?.cost[0]?.value === cost && 'border-2 border-green-500'} space-y-3 p-3 rounded-xl border cursor-pointer `} onClick={() => handleClick(item?.cost[0]?.value, item?.service)}
                        >
                            <div className='flex justify-between gap-10'>
                                <p>{item?.service}</p>
                                <p>{item?.cost[0]?.etd}</p>
                            </div>
                            <p>Rp. {item?.cost[0]?.value}</p>
                        </div>
                    )
                }
            </div>

            {/* <Button
        type='button'
        name='Choose Address'
        color='green'
        onClick={() => { openModal() }}
    /> */}
        </div>
    )
}

export default ShipmentMethods
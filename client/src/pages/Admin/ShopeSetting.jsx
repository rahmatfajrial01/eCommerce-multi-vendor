import React, { useEffect, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../utils/firebase'
import { updateProfileShope } from '../../features/shope/shopeSlice';

const Address = () => {
    const dispatch = useDispatch()

    const shopeState = useSelector(state => state?.shope)
    const token = useSelector(state => state?.auth?.user?.token)

    const [picture, setPicture] = useState('')
    const [isLoading, setIsLoading] = useState('')

    useEffect(() => {
        if (picture) {
            //firebase delete picture
            setIsLoading(true)
            const storage = getStorage(app);
            if (shopeState?.currentShope?.shope[0]?.avatar) {
                const desertRef = ref(storage, shopeState?.currentShope?.shope[0]?.avatar);
                deleteObject(desertRef)
                    .then(() => { }).catch((error) => {
                        console.log(error)
                    });
            }
            //firebase update picture
            const fileName = new Date().getTime() + picture.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, picture);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // const progress =
                    //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // setImagePercent(Math.round(progress));
                },
                (error) => {
                    // setImageError(true);
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const data = { avatar: downloadURL }
                        const userData = { data, token, id: shopeState?.currentShope?.shope[0]?._id }
                        dispatch(updateProfileShope(userData))
                        setIsLoading(false)
                        // setImagePercent(0)
                    });
                }
            );
        }
    }, [picture])
    return (
        <section className='m-5 p-5 bg-slate-200 rounded-xl space-y-10'>
            <div className='bg-white rounded-xl  w-max p-5 space-y-3 flex flex-col items-center justify-between'>
                <h1 className='text-center font-semibold text-xl'>Shope Avatar</h1>
                {
                    shopeState?.currentShope?.shope[0]?.avatar
                        ?
                        <img className='rounded-full h-32 w-32 object-cover' src={shopeState?.currentShope?.shope[0]?.avatar} alt="" />
                        :
                        <label htmlFor="picture" className='w-full h-full flex items-center justify-center'>
                            <div className='bg-slate-200 h-32 w-32  rounded-full flex items-center justify-center'>
                                <IoAdd size={40} />
                            </div>
                        </label>
                }
                <input onChange={(e) => setPicture(e.target.files[0])} type="file" className='hidden' id='picture' />

                <div className=''>
                    <div className='text-sm bg-slate-200 py-1 px-2 rounded-xl'>
                        <p className='opacity-70'>Max Image Size : 1 MB</p>
                        <p className='opacity-70'>Format Image : .JPEG, .JPG, .PNG</p>
                    </div>
                </div>
                <label className='w-full bg-green-500 text-white text-center p-2 rounded-xl text-sm cursor-pointer' htmlFor="picture">
                    {isLoading ? "Loading..." : "Choose Photo"}
                </label>
                {/* <button className={`bg-green-500 text-white w-full p-2 rounded-xl text-sm`}>Choose Photo</button> */}
            </div>
            <div className='w-1/2 space-y-4'>
                <h1 className='font-semibold text-lg'>Shope Info</h1>
                <div>
                    <p className='font-semibold'>Telephone</p>
                    <p>{shopeState?.currentShope?.shope[0]?.telephone}</p>
                </div>
                <div>
                    <p className='font-semibold'>Shope Name</p>
                    <p>{shopeState?.currentShope?.shope[0]?.shopeName}</p>
                </div>
                <button className='p-2 bg-green-500 text-white rounded-xl text-sm'>Change Info</button>
            </div>
            <div>
                <h1 className='font-bold mb-2 text-lg'>Shope Address</h1>
                <div className='flex gap-5 mb-2'>
                    <div>
                        <p className='font-semibold'>province</p>
                        <p> {shopeState?.currentShope?.shope[0]?.addresses[0].province}</p>
                    </div>
                    <div>
                        <p className='font-semibold'>city</p>
                        <p> {shopeState?.currentShope?.shope[0]?.addresses[0].city}</p>
                    </div>
                    <div>
                        <p className='font-semibold'>full address</p>
                        <p> {shopeState?.currentShope?.shope[0]?.addresses[0].fullAddress}</p>
                    </div>
                </div>
                <button className='p-2 bg-green-500 text-white rounded-xl text-sm'>Change Address</button>
            </div>
        </section>
    )
}

export default Address
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../utils/firebase'
import { loginGoogle } from '../features/auth/authSlice'

const Oauth = () => {
    const dispatch = useDispatch()
    const authState = useSelector(state => state.auth)
    console.log("current", authState.user)
    const firebaseGoggle = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            const values = {
                name: result.user.displayName,
                email: result.user.email,
                avatar: result.user.photoURL,
            }

            dispatch(loginGoogle(values))

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <button onClick={firebaseGoggle} type='button' className='p-2 bg-red-500 text-white rounded-xl w-full'>Continue With Google</button>
    )
}

export default Oauth   
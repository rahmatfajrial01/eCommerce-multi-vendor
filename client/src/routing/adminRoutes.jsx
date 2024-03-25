import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { getCurrentUser } from "../features/auth/authSlice";

export const AdminRoutes = ({ children }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCurrentUser(authState?.user?.token))
    }, [])
    const authState = useSelector(state => state?.auth)
    if (authState?.currentUser?.role >= 3) {
        return children
    } else {
        return <Navigate to='*' replace={true} />
    }
}
import { FaHome, FaHeart, FaListUl } from "react-icons/fa"
import { MdOutlineManageAccounts } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MobileFooter = () => {
    const authState = useSelector(state => state?.auth?.currentUser)
    authState
    return (
        <footer className='fixed bottom-0 w-full flex justify-between z-10 bg-white py-3 border-t text-md md:hidden'>
            <Link to={`/`} className="flex flex-col items-center px-5">
                <FaHome size={23} />
                <span>Home</span>
            </Link>
            <Link to={`${authState ? '/user/wishlist' : '/login'}`} className="flex flex-col items-center px-5">
                <FaHeart size={23} />
                <div>Wishlist</div>
            </Link>
            <Link to={`${authState ? '/user/order' : '/login'}`} className="flex flex-col items-center px-5">
                <FaListUl size={23} />
                <div>Order</div>
            </Link>
            <Link to={`${authState ? '/user' : '/login'} `} className="flex flex-col items-center px-5">
                <MdOutlineManageAccounts size={23} />
                <div>Account</div>
            </Link>
        </footer>
    )
}

export default MobileFooter
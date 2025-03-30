import React, { useEffect } from 'react'; 
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { MdShoppingCart } from "react-icons/md";
import { IoHeart } from "react-icons/io5";
import { HiMiniShoppingBag } from "react-icons/hi2";

const Navbar = () => {

    const { uniqueItemsCount } = useSelector((state) => state.allCart);
    const { totalWishlistQuantity } = useSelector((state) => state.fullWishList);

    useEffect(() => {}, [totalWishlistQuantity])


    return (
        <div className='w-full h-20 text-white bg-blue-500 flex flex-row justify-between items-center shadow-2xl fixed top-0 left-0 z-50'>
            <h1 className='text-3xl ml-5'>Navbar</h1>
            <div className='w-250 h-20 text-white flex flex-row justify-evenly items-center gap-10'>
                <Link to="/" className='w-40 h-10 rounded flex items-center cursor-pointer'>
                    <HiMiniShoppingBag className='text-2xl my-2'/>All Products 
                </Link>
                <Link
                    to="/cart"
                    className="w-20 h-20 flex items-center cursor-pointer text-white rounded-full transition-all duration-300"
                >
                    <MdShoppingCart className='text-2xl' /> cart
                    {uniqueItemsCount > 0 && (
                        <div 
                        className="w-5 h-5 mb-5 text-1xl bg-red-500 rounded-full text-white flex items-center justify-center"
                    >
                        {uniqueItemsCount}
                    </div>
                    )}
                        
                    
                </Link>
                <Link to="/fav"
                    className='w-30 h-20 flex items-center cursor-pointer text-white rounded-full transition-all duration-300'
                >
                    <IoHeart className='text-2xl'/>Wishlist 
                    {totalWishlistQuantity > 0 ? (
                        <div
                            className='w-5 h-5 mb-5 bg-red-500 rounded-full text-white flex items-center justify-center'
                        >
                            {totalWishlistQuantity}
                        </div>
                    ): null}
                </Link>
            </div>
            <div className='flex flex-end'>
                <div className='relative'>
                    <FaSearch className='absolute top-1/2 left-8 transform -translate-y-1/2 text-gray-200 hover:text-gray-400' />
                    <input
                        type='text'
                        defaultValue=''
                        className='w-60 h-10 mx-5 border-white border-1 rounded px-10 bg-black/10 hover:placeholder-gray-300 hover:bg-black/30'
                        placeholder='Search...'
                    />
                </div>
            </div>
        </div>
    )
}

export default Navbar;
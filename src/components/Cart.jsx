import React, { useState, useEffect } from 'react'; 
import { MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCartTotal, removeItem, increaseQuantity, decreaseQuantity } from '../features/CartSlice';
import { addToWishList } from '../features/WishListSlice';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const Cart = () => {

    const { cart, totalQuantity, totalPrice } = useSelector((state) => state.allCart);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [ loaded, setLoaded ] = useState();

    useEffect(() => {
        dispatch(getCartTotal());
    }, [cart, dispatch])
    

    return (
        <div
            className="w-screen min-h-screen mt-20 flex justify-evenly items-center shadow-xl relative"
            style={{
              background: 'linear-gradient(90deg, rgba(171,3,245,1) 0%, rgba(96,47,140,1) 35%, rgba(44,105,156,1) 55%, rgba(0,212,255,1) 100%)'
            }}
        >   
            <div className={`w-230 h-auto mb-80 my-0 mt-20 mr-100 bg-white rounded-2xl flex flex-col overflow-auto ${cart.length === 0 ? 'mb-90' : ''}`}>
                <div className='w-230 h-20 py-6 px-5 text-2xl text-gray-500 bg-white border-b-1 border-gray-500 shadow-xl rounded-t-2xl '>
                    Cart - {cart.length} items
                </div>

                {/* Check if the cart is empty */}
                {cart?.length === 0 ? (
                    <div className='h-80 flex justify-center items-center'>
                        <p className='text-gray-500 text-5xl'>Your cart is empty ☹️</p>
                    </div>
                ) : (
                cart?.map((data, index) => (
                <div key={index} className='w-230 h-90 border-b-1 border-gray-500 shadow-xl flex flex-row justify-evenly '>
                    <div className='w-70 h-auto my-5 overflow-hidden group'>
                        <LazyLoadImage 
                            className={`object-cover transform transition-transform duration-500 ease-in-out will-change-transform cursor-pointer ${loaded ? "hover:scale-105" : ''}`} 
                            src={data.img} 
                            effect='opacity'
                            height="300px"
                            width='300px'
                            onLoad={() => setLoaded(true)}
                        />
                    </div>
                    <div className='w-70 h-80 my-5 flex flex-col'>
                        <h1 
                            className='text-2xl my-5 text-gray-700'
                        >
                            {data.title}
                        </h1>
                        {/* <h1 className='text-gray-600 my-5'>Color: blue</h1>
                        <h1 className='text-gray-600 my-5'>Size: M</h1> */}
                        <div className='flex flex-row '>
                            <button 
                                className='w-12 h-10 my-5 mx-2 bg-blue-500 px-4 shadow-xl rounded text-white hover:bg-blue-700 cursor-pointer'
                                onClick={() => dispatch(removeItem(data.id))}
                            >
                                <MdDelete />
                            </button>

                            <button 
                                className='w-12 h-10 mx-2 my-5 bg-red-500 px-4 shadow-xl rounded text-white hover:bg-red-700 cursor-pointer'
                                onClick={() => dispatch(addToWishList(data))}
                            >
                                <FaHeart />
                            </button>
                            
                        </div>
                    </div>
                    <div className='w-70 h-80 my-5 flex flex-col justify-center items-center'>
                        <div className='flex mb-50'>
                        <button 
                            className='w-12 h-10 bg-blue-500 px-4 shadow-xl rounded text-white hover:bg-blue-700 cursor-pointer'
                            onClick={() => dispatch(decreaseQuantity(data.id))}
                        >
                            -
                        </button>
                        <input 
                            type='text'
                            className='w-50 h-10 px-5 rounded shadow-xl'
                            placeholder='Quantity'
                            value={data.quantity}
                        />
                        <button 
                            className='w-12 h-10 bg-blue-500 px-4 shadow-xl rounded text-white hover:bg-blue-700 cursor-pointer'
                            onClick={() => dispatch(increaseQuantity(data.id))}    
                        >
                            +
                        </button>
                        </div>
                        <p className='text-2xl'>Total price</p>
                        <p className='mx-3'>Rs.{data.price * data.quantity} /-</p>
                    </div>
                </div>
                ))
            )}
            </div>


            <div className='w-80 h-80 my-30 mr-5 bg-white rounded-2xl shadow-xl fixed top-10 right-10'>
                <div className='w-80 h-20 py-6 px-5 text-2xl text-gray-500 bg-white border-b-1 border-gray-500 shadow-xl rounded-t-2xl'>
                    Summary
                </div>
                <div className='my-10 mx-2 flex flex-row justify-between items-center'>
                    <p>Total Quantity</p>
                    <p>{totalQuantity}</p>
                </div>
                <div className='my-10 mx-2 flex flex-row justify-between items-center'>
                    <p>Total Price</p>
                    <p>Rs.{totalPrice}</p>
                </div>
                <div className='flex items-center justify-center'>
                <button 
                    className='w-75 h-13 text-2xl rounded flex justify-center items-center text-white bg-blue-500 hover:bg-blue-700 cursor-pointer'
                    onClick={() => Navigate("/check")}
                >
                    Go to checkout 
                </button>
                </div>
            </div>
        </div>
    )
}

export default Cart;
import React, { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../features/CartSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaHeart } from "react-icons/fa";
import { addToWishList } from "../features/WishListSlice";

const ProductsCards = () => {

    const items = useSelector((state) => state.allCart.items);
    const dispatch = useDispatch();
    const [ loaded, setLoaded ] = useState(false);

    return (
        <div className='w-screen h-screen mt-25 flex flex-wrap justify-between text-black'>
            {items?.map((item) => (
            <div key={item.id} className='w-100 h-100 my-5 mx-5 rounded-2xl bg-gray-200 overflow-hidden shadow-xl'>
                <LazyLoadImage 
                    src={item.img}
                    className={`w-100 h-55 rounded-t-2xl bg-gray-500 object-contain cursor-pointer transform transition-transform duration-500 ${loaded ? "hover:scale-105" : ''}`}
                    effect='opacity'  
                    afterLoad={() => setLoaded(true)}                  
                />
                <h1 className='my-2 mx-4 text-2xl '>{item.title}</h1>
                <p className='my-3 mx-4'>
                    Rs.{item.price}/-
                </p>
                <div className='flex justify-between items-center'>
                <button 
                    className='w-30 h-10 mx-4 my-3 bg-blue-500 rounded text-white hover:bg-blue-600 cursor-pointer shadow-xl hover:shadow-2xl'
                    onClick={() => dispatch(addToCart(item))}
                >
                    Add to cart
                </button>
                <button 
                    className='w-12 h-10 mx-4 my-5 bg-red-500 px-4 shadow-xl rounded text-white hover:bg-red-600 cursor-pointer'
                    onClick={() => dispatch(addToWishList(item))}
                >
                    <FaHeart />
                </button>
                </div>
            </div>
            ))}
        </div>
    )
}

export default ProductsCards;
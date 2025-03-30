import React from 'react';
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../features/WishListSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MdShoppingCart } from "react-icons/md";
import { addToCart } from '../features/CartSlice';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Favourites = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { wishlist } = useSelector((state) => state.fullWishList);

  const handleClick = () => {
    Navigate("/check")
  }

  return (
    <div
      className="w-screen min-h-screen mt-20 flex justify-center items-center shadow-xl relative"
      style={{
        background: 'linear-gradient(90deg, rgba(171,3,245,1) 0%, rgba(96,47,140,1) 35%, rgba(44,105,156,1) 55%, rgba(0,212,255,1) 100%)'
      }}
    >
      <div className={`w-230 h-auto my-20 bg-white rounded-2xl flex flex-col overflow-auto ${wishlist.length === 0 ? '' : ''}`}>
        <div className='w-230 h-20 py-6 px-5 text-2xl text-gray-500 bg-white border-b-1 border-gray-500 shadow-xl rounded-t-2xl'>
          Wishlist - {wishlist.length} items
        </div>

        {/* Check if the wishlist is empty */}
        {wishlist.length === 0 ? (
          <div className='h-80 flex justify-center items-center'>
            <p className='text-gray-500 text-5xl'>Your wishlist is empty 💔</p>
          </div>
        ) : (
          wishlist.map((data) => (
            <div key={data.id} className='w-230 h-90 border-b-1 border-gray-500 shadow-xl flex flex-row justify-evenly'>
              
              {/* Product Image */}
              <div className='w-70 h-auto my-5'>
                <LazyLoadImage className='object-center transform transition-transform duration-300 hover:scale-105 cursor-pointer' src={data.img} alt={data.title} effect='opacity' />
              </div>

              {/* Product Details */}
              <div className='w-70 h-80 my-5 flex flex-col'>
                <h1 className='text-2xl my-5 text-gray-700'>{data.title}</h1>
                
                {/* Remove from Wishlist */}
                <div>
                <button
                  className='w-12 h-10 my-5 mx-2 bg-blue-500 px-4 shadow-xl rounded text-white hover:bg-blue-700 cursor-pointer'
                  onClick={() => dispatch(removeFromWishlist(data.id))}
                >
                  <MdDelete />
                </button>
                <button
                  className='w-12 h-10 my-5 mx-2 bg-indigo-500 px-4 shadow-xl rounded text-white hover:bg-indigo-600 cursor-pointer'
                  onClick={() => dispatch(addToCart(data))}
                >
                  <MdShoppingCart />
                </button>
                </div>
                <div className='h-10 w-40 my-10 flex items-center justify-center'>
                    <button 
                      className='w-40 h-10 bg-purple-500 text-white rounded hover:bg-purple-700 shadow-xl cursor-pointer'
                      onClick={handleClick}
                    >
                        Go to checkout
                    </button>
                </div>
              </div>
              
              {/* Display Price */}
              <div className='w-70 h-50 my-25 flex flex-col justify-center items-center'>
                <p className='text-2xl'>Price</p>
                <p className='mx-3'>Rs.{data.price} /-</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favourites;

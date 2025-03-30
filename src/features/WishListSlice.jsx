import { createSlice } from '@reduxjs/toolkit';
import ProductData from '../data/ProductData';

const initialState =  {
    wishlist: [],
    items: ProductData,
    totalWishlistQuantity: 0,
}

export const wishListSlice = createSlice({
    name: "Wishlist",
    initialState,
    reducers: {
        addToWishList: (state, action) => {
            const exist = state.wishlist.some((item) => item.id === action.payload.id);
            if(!exist) {
                state.wishlist.push({...action.payload, quantity: 1});
            }
            state.totalWishlistQuantity = state.wishlist.length; // update total quantity
        },
        removeFromWishlist: (state, action) => {
            state.wishlist = state.wishlist.filter((item) => item.id !== action.payload);
            state.totalWishlistQuantity = state.wishlist.length; // update total quantity
        }
    }
})

export const { addToWishList, removeFromWishlist } = wishListSlice.actions;

export default wishListSlice.reducer;
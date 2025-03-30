import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/CartSlice";
import wishListReducer from "../features/WishListSlice";

export const store = configureStore({
    reducer: {
        allCart: cartReducer,
        fullWishList: wishListReducer,
    },
})
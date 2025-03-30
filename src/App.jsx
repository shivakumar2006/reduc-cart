import React from 'react'; 
import "./App.css";
import  Navbar  from "./components/Navbar";
import ProductsCards from './components/ProductsCard';
import Cart from './components/Cart';
import Favourite from './components/Favourite';
import { Routes, Route } from "react-router-dom";
import Checkout from './components/Checkout';
import Success from './components/success';

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<ProductsCards />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/fav' element={<Favourite />} />
                <Route path='/check' element={<Checkout />} />
                <Route path='/success' element={<Success />} />
            </Routes>
        </div>
    )
}

export default App;
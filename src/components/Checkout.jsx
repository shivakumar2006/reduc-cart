import React, { useState } from 'react'; 
import { FaRegCreditCard } from "react-icons/fa6";
import { FaGooglePay } from "react-icons/fa";
import { FaApplePay } from "react-icons/fa6";
import { FaCcPaypal } from "react-icons/fa6";
import { BsAlipay } from "react-icons/bs";
import { FaAmazonPay } from "react-icons/fa";
import { SiFampay } from "react-icons/si";
import { RiWechatPayFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


const Checkout = () => {

    const [activeMethod, setActiveMethod] = useState(null);
    const [ formData, setFormData ] = useState({
        email: '',
        firstName: '',
        lastName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        zip: '',
        fampayId: '',
    })
    const Navigate = useNavigate();

    const handleKeyDown = (e) => {
        // Allow only numbers, backspace, delete, arrow keys, and space
    if (
        !/[0-9]/.test(e.key) &&
        e.key !== 'Backspace' &&
        e.key !== 'Delete' &&
        e.key !== 'ArrowLeft' &&
        e.key !== 'ArrowRight' &&
        e.key !== ' '
      ) {
        e.preventDefault(); // Prevent invalid input
      }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    }

    const handleOrderCLick = () => {
        if(!(formData.email || formData.firstName || formData.lastName)) {
            alert("Please fill in all required fields!");
            return;
        }
        if(activeMethod === "creditCard" && (!(formData.cardNumber || formData.expirationDate || formData.cvv || formData.zip))) {
            alert('Please fill in all credit card details!');
            return;
        }
        if(activeMethod === "fampayId" && (!formData.fampayId)) {
            alert("please enter you fampay upi id!");
            return;
        }

        alert("payment successfull");

        Navigate("/success");
    }

    const paymentMethods = [
        { id: 'creditCard', icon: <FaRegCreditCard /> },
        { id: 'googlePay', icon: <FaGooglePay /> },
        { id: 'applePay', icon: <FaApplePay /> },
        { id: 'paypal', icon: <FaCcPaypal /> },
        { id: 'alipay', icon: <BsAlipay /> },
        { id: 'amazonPay', icon: <FaAmazonPay /> },
        { id: 'fampay', icon: <SiFampay /> },
        { id: 'wechatPay', icon: <RiWechatPayFill /> },
    ];

    const handleClick = (methodId) => {
        setActiveMethod(methodId);
    }

    return (
        <div
            className='w-screen min-h-screen flex justify-center items-center'
            style={{
                background: 'linear-gradient(90deg, rgba(171,3,245,1) 0%, rgba(96,47,140,1) 35%, rgba(44,105,156,1) 55%, rgba(0,212,255,1) 100%)'
              }}
        >
            <div className="w-200 h-165 my-40 rounded-2xl bg-white shadow-2xl">
                <h1 className='w-full h-10 my-3 mx-5 text-2xl'>CHOOSE A PAYMENT METHOD</h1>
                <div className='w-183 mx-8 h-55 flex flex-wrap justify-between '>
                    {/* Payment Icons */}
                <div className='w-183 mx-8 h-55 flex flex-wrap justify-between'>
                    {paymentMethods.map((method) => (
                        <div
                            key={method.id}
                            className={`w-40 h-15 text-6xl my-5 text-gray-600 flex items-center justify-center cursor-pointer 
                                ${activeMethod === method.id ? 'border-b-3 border-purple-400' : 'hover:border-b-3 hover:border-blue-400'}`}
                            onClick={() => handleClick(method.id)}
                        >
                            {method.icon}
                        </div>
                    ))}
                </div>
                    
                    {/* user information */}
                    <div className='w-183 h-60 mt-8'>
                        <h1>YOUR INFORMATION</h1>
                        {[ "creditCard", "googlePay", "applePay", "paypal", "alipay", "amazonPay", "wechatPay" ].includes(activeMethod)&& (
                        <>
                        <input 
                            type='text'
                            className='w-183 h-12 border-gray-300 rounded border-2 bg-white px-3 hover:bg-black/10 text-black'
                            placeholder='Email Address'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <div className='flex flex-row'>
                            <input 
                                type='text'
                                className='w-100 h-12 my-2 border-gray-300 rounded border-2 bg-white px-3 hover:bg-black/10 text-black'
                                placeholder='First Name'
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                            <input 
                                type='text'
                                className='w-100 h-12 my-2 ml-2 border-gray-300 rounded border-2 bg-white px-3 hover:bg-black/10 text-black'
                                placeholder='Last Name'
                                name='lastName'
                                onChange={handleInputChange}
                            />
                        </div>
                        </>
                        )}

                        {/* additional mode for card payment */}
                        {activeMethod === 'creditCard' && (
                            <>
                        <input 
                            type='text'
                            className='w-183 h-12 border-gray-300 rounded border-2 bg-white px-3 hover:bg-black/10 text-black'
                            placeholder='Card Number'
                            name='cardNumber'
                            value={formData.cardNumber}
                            onKeyDown={handleKeyDown}
                            onChange={handleInputChange}
                        />
                        <div className='flex flex-row'>
                            <input 
                                type='text'
                                className='w-100 h-12 my-2 border-gray-300 rounded border-2 bg-white px-3 hover:bg-black/10 text-black'
                                placeholder='Expiration Date'
                                name='expirationDate'
                                value={formData.expirationDate}
                                onChange={handleInputChange}
                            />
                            <input 
                                type='text'
                                className='w-100 h-12 my-2 ml-2 border-gray-300 rounded border-2 bg-white px-3 hover:bg-black/10 text-black'
                                placeholder='CVV'
                                name='cvv'
                                value={formData.cvv}
                                onChange={handleInputChange}
                            />
                            <input 
                                type='text'
                                className='w-100 h-12 my-2 ml-2 border-gray-300 rounded border-2 bg-white px-3 hover:bg-black/10 text-black'
                                placeholder='Zip'
                                name='zip'
                                value={formData.zip}
                                onChange={handleInputChange}
                            />
                        </div>
                        </>
                        )}
                        {activeMethod === "fampay" && (
                            <>
                            <input 
                            type='text'
                            className='w-183 h-12 border-gray-300 rounded border-2 bg-white px-3 hover:bg-black/10 text-black'
                            placeholder='Enter fampay upi id'
                            name='fampayId'
                            value={formData.fampayId}
                            onChange={handleInputChange}
                        />
                        <div className='flex flex-row'>
                            <input 
                                type='text'
                                className='w-100 h-12 my-2 border-gray-300 rounded border-2 bg-white px-3 hover:bg-black/10 text-black'
                                placeholder='First Name'
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                            <input 
                                type='text'
                                className='w-100 h-12 my-2 ml-2 border-gray-300 rounded border-2 bg-white px-3 hover:bg-black/10 text-black'
                                placeholder='Last Name'
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                        </>
                        )}
                    </div>
                    <div className='w-200 h-15 my-5 flex justify-center items-center'>
                        <button 
                            className='w-183 h-15 border rounded-2xl bg-indigo-500 text-white text-2xl hover:bg-indigo-600 cursor-pointer'
                            onClick={handleOrderCLick}
                        >
                            OrderNow
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;
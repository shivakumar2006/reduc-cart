import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import payment from "../images/images.jpeg";
import successSound from "../audio/success.mp3";
import { useNavigate } from 'react-router-dom';

const Success = () => {

    const Navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio(successSound);

    const playAudio = () => {
      audio.play().catch(error => console.error('Audio playback failed:', error));
    };

    // Add a slight delay to sync with the animation
    const timer = setTimeout(playAudio, 500); // Adjust timing if needed

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-cente bg-black'>
      <div className='flex justify-center items-center ml-2'>
      <motion.img
        src={payment}
        className=''
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", bounce: 0.5 }}
      />
      </div>
      <h1 className='w-full h-auto text-green-500 text-2xl flex justify-center items-center'>Payment Successfull</h1>
      <div className='w-full h-20 flex justify-center items-center'>
        <button 
            className='w-100 h-15 mx-5 bg-blue-500 text-white rounded text-2xl hover:bg-blue-600'
            onClick={() => Navigate("/")}
        >
            Browse products
        </button>
      </div>
    </div>
  );
}

export default Success;

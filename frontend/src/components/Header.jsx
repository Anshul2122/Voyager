import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className='bg-blue-500 py-6'>
            <div className='container mx-auto flex justify-between'>
                <span className='text-3xl text-white font-bold tracking-tight'>
                    <Link to="/">MernHoliday.com</Link>
                </span>
                <span className='flex space-x-2 text-white'>
                    <Link to='/sign-in' className='  flex items-center  px-3 font-bold hover:bg-white hover:text-blue-500 rounded-3xl'>sign in</Link>
                </span>
            </div>
            <h1 className='font-bold text-2xl'></h1>
        </div>
    );
};

export default Header
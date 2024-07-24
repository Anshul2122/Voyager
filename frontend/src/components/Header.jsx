import React from 'react'
import { Link, useLocation  } from "react-router-dom";
import { useAppContext } from '../context/AppContext';
import SignOutButton from "./SignOutButton";

const Header = () => {
    const { isLoggedIn } = useAppContext();
    const location = useLocation();
    return (
        <div className='bg-blue-500 py-6'>
            <div className='container mx-auto flex justify-between'>
                <span className='text-3xl text-white font-bold tracking-tight'>
                    <Link to="/">MernHoliday.com</Link>
                </span>
                <span className='flex space-x-2 text-white'>
                    {isLoggedIn ? (
                        <>
                            
                            <Link
                                to="/my-bookings"
                                className='  flex items-center  px-3 font-bold hover:bg-white hover:text-blue-500 rounded-3xl'
                            > My bookings</Link>
                            <Link
                                to="/my-hotels"
                                className='  flex items-center  px-3 font-bold hover:bg-white hover:text-blue-500 rounded-3xl'
                            >My hotels</Link>
                            <SignOutButton/>
                        </>
                    ) : (
                            <>
                                    <Link
                                    to="/sign-in"
                                    className='  flex items-center  px-3 font-bold hover:bg-white hover:text-blue-500 rounded-3xl'
                                    >Sign-in</Link>
                                    <Link
                                    to="/register"
                                    className='  flex items-center  px-3 font-bold hover:bg-white hover:text-blue-500 rounded-3xl'
                                    >Register</Link>
                            </>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Header;
import React from 'react'
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import { useNavigate , Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useAppContext } from '../context/AppContext';
const Register = () => {

    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const mutation = useMutation(apiClient.register, {
        onSuccess: () => {
            showToast({ message: "Registration Success!", type: "SUCCESS" });
            navigate('/sign-in');
        },
        onError: (error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    });

    const { register, watch, handleSubmit, formState:{errors} } = useForm();
    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
      <>
        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
            <h2 className='text-3xl font-bold'>Create an Account</h2>
            <div className='flex flex-col md:flex-row gap-5'>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    First Name
                    <input className='border rounded w-full py-1 px-2 font-normal'
                        {...register("firstName", { required: "please enter the first name" })}
                    ></input>
                    {errors.firstName && ( <span className='text-red-500'>{errors.firstName.message}</span>)}
                </label>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Last Name
                    <input className='border rounded w-full py-1 px-2 font-normal'
                        {...register("lastName", { required: "please enter the last name" })}
                    ></input>
                    {errors.lastName && ( <span className='text-red-500'>{errors.lastName.message}</span>)}
                </label>
            </div>
            <label className='text-gray-700 text-sm font-bold flex flex-col '>
                Email
                <input type='email' className='border rounded w-5/12 py-1 px-4 font-normal'
                    {...register("email", { required: "please enter the email" })}
                ></input>
                {errors.email && ( <span className='text-red-500'>{errors.email.message}</span>)}
            </label>
            <label className='text-gray-700 text-sm font-bold flex flex-col'>
                Password
                <input type='password' className='border rounded w-5/12 py-1 px-2 font-normal'
                    {...register("password", { required: "please enter password",  minLength:{value:6} })}
                ></input>
                {errors.password && ( <span className='text-red-500'>{errors.password.message}</span>)}
            </label>
            <label className='text-gray-700 text-sm font-bold flex flex-col'>
                Confirm  Password
                <input type='password' className='border rounded w-5/12 py-1 px-2 font-normal'
                    {...register("confirmPassword", {
                        validate: (val) => {
                        if (!val) {
                            return "please enter password again";
                        } else if (watch("password") !== val) {
                            return "password didn't matched";
                        }
                        },
                    })}
                ></input>
                {errors.confirmPassword && ( <span className='text-red-500'>{errors.confirmPassword.message}</span>)}
            </label>

            <button type='submit' className='text-white bg-blue-500 hover:text-blue-500 hover:bg-blue-200 w-60 rounded-3xl py-2 border-blue-500 text-xl'>Create account</button>
        </form>
            <div className='m-1 px-1 text-gray-500 '>Already registerd? <span className='text-blue-400 hover:underline'><Link to="/sign-in">sign in</Link></span></div>
            </>
    // <Box
    //   component="form"
    //   sx={{
    //     '& .MuiTextField-root': { m: 1, width: '25ch' },
    //   }}
    //   noValidate
    //   autoComplete="off"
    //   >
    //     <Typography className='font-bold tracking-tight' variant="h3" gutterBottom>
    //     Create an Account
    //   </Typography>
    //       <div className=''>
    //           <div>
    //     <TextField
    //       required
    //       id="outlined-required-1"
    //       label="First Name"
    //       defaultValue=""
    //       className=' font-extrabold w-20'
    //     />
    //     <TextField
    //       required
    //       id="outlined-required-2"
    //       label="Last Name"
    //         defaultValue="" 
    //         className="font-extrabold w-20"
    //     />
    //     </div>
    //       <div>
    //         <TextField
    //         required
    //         id="outlined-password-input-1"
    //         label="Password"
    //         type="password"
    //         autoComplete=""
    //         className='font-extrabold w-20'
    //         />
    //       </div>
    //       <div>
    //         <TextField
    //         required
    //         id="outlined-password-input-2"
    //         label="confirm Password"
    //         type="password"
    //         autoComplete="" 
    //         className='font-extrabold w-20'      
    //         />
    //       </div>
    //       <div className='m-1 px-1 text-gray-500 '>Already registerd? <span className='text-blue-400 hover:underline'><Link to="/login">sign in</Link></span></div>
    //     </div>
    // </Box>
  )
}

export default Register
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';




const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, formState: { errors }, handleSubmit  } = useForm();
  
  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <>
    <form onSubmit={onSubmit} className='flex flex-col gap-5'>
      <h2 className='text-3xl font-bold'>login</h2>
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
        <button type='submit' className='text-white bg-blue-500 hover:text-blue-500 hover:bg-blue-200 max-w-40 rounded-3xl py-2 border-blue-500 text-xl'>login</button>
    </form>
    <span className='m-1 px-1 text-gray-500 '>
          not have account? <Link className="text-blue-400 hover:underline" to="/register">register here</Link>
        </span>
    </>
  )
}

export default SignIn;
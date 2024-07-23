
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from "../api-client";
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            console.log("1")
            await queryClient.invalidateQueries("validateToken");
            showToast({ message: "signed out!", type: "SUCCESS" });
        },
        onError: (error) => {
            console.log("2");
            showToast({message: error.message, type: "ERROR" });
        },
    });
    const handleClick = () => {
        
        mutation.mutate();
        showToast({ message: "signed out!", type: "SUCCESS" });
        navigate("/sign-in");
        setTimeout(() => {
            window.location.reload();
            onClose();
        }, 2 * 1000);
    };
    return (
    <button onClick={handleClick} className='hover:text-blue-500 px-3 font-bold hover:bg-gray-100 rounded-3xl'>Sign Out</button>
  )
}

export default SignOutButton;
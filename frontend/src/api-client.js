const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE_URL);
import { useNavigate } from "react-router-dom";


export const register = async (formData) => {
    const res = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registration failed');
    }

    return await res.json(); // Return the response body if needed
};

export const signIn = async (formData) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    

    if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message || 'Sign in failed');
    }

        return res.json();
    }
    catch (error) {
        console.log("error signing in: ", error);
        throw error;
    }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signOut = async () => {
    const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: 'include',
        method: 'POST',
    });
    if (res.ok) { 
        console.log("signout");
    }

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to sign out');
    } // Return the response body if needed
};

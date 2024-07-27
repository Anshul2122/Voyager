// for fetch request

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// console.log(3 + 1);
// console.log(API_BASE_URL);
export const register = async (formData) => {
    const res = await fetch(`${API_BASE_URL}api/users/register`, {
        method: 'POST',
        credentials:"include",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(formData),
    });
    const responseBody = await res.json();

    if (!res.ok) {
        throw new Error(responseBody.message);
    }
};

export const signIn = async (formData) => {
    const res = await fetch(`${API_BASE_URL}api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    const body = await res.json();
    if (!res.ok) {
        throw new Error(body.message);
    }
    return body;
};


export const validateToken = async () => {
     const res = await fetch(`${API_BASE_URL}api/auth/validate-token`, {
        credentials: "include",
    });
    if (!res.ok) {
        throw new Error("token invalid");
    }
    return res.json();
};

export const signOut = async () => {
    const res = await fetch(`${API_BASE_URL}api/auth/logout`, {
        credentials: "include",
        method: "POST",
    });

    if (!res.ok) {
        throw new Error("Failed to sign out");
    }
}

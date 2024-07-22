// for fetch request

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData) => {
    const res = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
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


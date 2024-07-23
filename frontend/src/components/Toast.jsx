import { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.reload();
            onClose();
        }, 3 * 1000);// 3 seconds
        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    const styles =
        type === "SUCCESS"
            ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-100"
            : "fixed top-4 right-4 z-50 rounded-md bg-red-600 text-white max-w-100";
    return (
        <div className={styles}>
            <div className='flex justify-center items-center'>
                <span className='text-lg font-semibold'>{message}</span>
            </div>
        </div>
    );
};

export default Toast;
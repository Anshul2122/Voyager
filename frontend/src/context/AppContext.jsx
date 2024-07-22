import React, {useContext, useState} from 'react'
import Toast from '../components/Toast';


const toastMessageType = {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
};

const AppContext = React.createContext(undefined);


export const AppContextProvider = ({ children }) => {
    const [toast, setToast] = useState(undefined);
    
    return (
        <AppContext.Provider value={{
            showToast:(toastMessage) => {
                setToast(toastMessage);
            },
        }}>
            {toast && <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(undefined)} />}
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
};
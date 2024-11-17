import { createContext, useContext, useEffect, useReducer } from "react";
import { getCurrentUser } from "../lib/appwrite";

// Create the context
const GlobalContext = createContext();

// Custom hook to use the Global Context
export const useGlobalContext = () => useContext(GlobalContext);

// Initial state for the reducer
const initialState = {
    isLoggedIn: false,
    isUser: null,
    isLoading: true,
};

// Reducer function to handle state updates
const globalReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                isLoggedIn: true,
                isUser: action.payload,
                isLoading: false,
            };
        case "LOGOUT_USER":
            return {
                ...state,
                isLoggedIn: false,
                isUser: null,
                isLoading: false,
            };
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};

// Global Provider component
const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res && res?.accountId) {
                    dispatch({ type: "SET_USER", payload: res });
                } else {
                    dispatch({ type: "LOGOUT_USER" });
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: "LOGOUT_USER" });
            });
    }, []);

    // Providing state and dispatch to children components
    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn: state.isLoggedIn,
                isUser: state.isUser,
                isLoading: state.isLoading,
                dispatch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;

import { createContext, useContext, useEffect, useState } from "react";


const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isUser, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

    }, [])


    return (
        <GlobalContext.Provider >
            {children}
        </GlobalContext.Provider>
    )
}
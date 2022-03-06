import { createContext, useState } from "react";

const AuthContext = createContext({});

//children represents the components that are inside the AuthProvider
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        //set the values we are passing to the AuthContext
        <AuthContext.Provider value={{ auth, setAuth }}>
            {/* children is components nested inide AuthProvider */}
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
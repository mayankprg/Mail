import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode"


const axios = require('axios').default;

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null)
    let [user, setUser] = useState(localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')): null)

    let loginUser = async (props) => {
        const formData = new FormData();
        formData.append('username', props.email);
        formData.append('password', props.password);
        let response = await axios.post('http://127.0.0.1:8000/api/token/', formData);
        if (response.status === 200){
            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.access));
            localStorage.setItem('authnTokens', JSON.stringify(response.data));
        } else {
            alert("something went wrong!");
        }
    }
    
    let contextData = {
        user: user,
        loginUser: loginUser
    }

    return (
        
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>

  
    )

}
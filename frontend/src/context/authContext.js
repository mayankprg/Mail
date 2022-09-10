import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";

const axios = require('axios').default;

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null)
    let [user, setUser] = useState(localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')): null)
    let [loading, setLoading] = useState(true);

    let navigate = useNavigate();

    let logout = () =>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let loginUser = async (props) => {
        const formData = new FormData();
        formData.append('username', props.email);
        formData.append('password', props.password);
        let response = await axios.post('http://127.0.0.1:8000/api/token/', formData);
        if (response.status === 200){
            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.access));
            localStorage.setItem('authnTokens', JSON.stringify(response.data));
            navigate('/');
            setLoading(false);
        } else {
            alert("something went wrong!");
        }
    }

    useEffect(() => {
        let fourMinutes = 1000 * 60 * 4;
        let interval = setInterval(() => {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading]);


    let updateToken = async () => {
      
        let response = await axios.post('http://127.0.0.1:8000/api/token/refresh/',{'refresh': authTokens.refresh} );
        if (response.status === 200){
            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.access));
            localStorage.setItem('authnTokens', JSON.stringify(response.data));
        } else {
            logout()
        }
    }
    
    let contextData = {
        user: user,
        loginUser: loginUser,
        logout: logout,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        setLoading:setLoading,
        setUser:setUser
    }


    return (
        
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )

}
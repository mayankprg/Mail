import {  useNavigate } from "react-router-dom";
import {useContext, useEffect} from "react";
import AuthContext from '../context/authContext';

const PrivateRoute = ({children}) =>{
    let navigate = useNavigate();
    let {user} = useContext(AuthContext)
    useEffect(()=>{
        if (!user){
            navigate('/login')
        }
    });
        
    return (
      children
    )
}

export default PrivateRoute
import React, { useContext, createContext} from 'react';
import AuthContext from './authContext';

const axios = require('axios').default;


const EmailContext = createContext();

export default EmailContext;



export const EmailProvider = ({children}) => {

    let {authTokens} = useContext(AuthContext);
  
    let getEmail = async (emailId, read) => {
        let emailResponse = await axios.get(`http://127.0.0.1:8000/api/emails/${emailId}`, { 
            headers:
        {
            'Content-Type': 'application/json'
            ,'Authorization': 'Bearer ' + String(authTokens.access)
            
        }});
        if (!read){
            await axios.put(`http://127.0.0.1:8000/api/emails/${emailId}`,{ 
                read: "True"
                },
                { 
                    headers:
                        {
                            'Content-Type': 'application/json'
                            ,'Authorization': 'Bearer ' + String(authTokens.access)
                            
                        }
                });
        }
        
        return emailResponse.data
        
        
    };
  

    let contextData = {
        getEmail:getEmail
    }

    return (
        
        <EmailContext.Provider value={contextData}>
            {children}
        </EmailContext.Provider>
    )

}



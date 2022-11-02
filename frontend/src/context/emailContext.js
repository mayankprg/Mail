import React, { useContext, createContext} from 'react';
import AuthContext from './authContext';

const axios = require('axios').default;


const EmailContext = createContext();

export default EmailContext;



export const EmailProvider = ({children}) => {

    const {authTokens} = useContext(AuthContext);

  
    const getEmail = async (emailId, read) => {
        let emailResponse = await axios.get(`http://127.0.0.1/api/emails/${emailId}`, { 
            headers:
        {
            'Content-Type': 'application/json'
            ,'Authorization': 'Bearer ' + String(authTokens.access)
            
        }});
        if (!read){
            await axios.put(`http://127.0.0.1/api/emails/${emailId}`,{ 
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

    const archive = async (emailId, bool) => {
        let state = true
        if (bool === "Unarchive"){
            state = false
        }
        let response = await axios.put(`http://127.0.0.1/api/emails/${emailId}`,{ 
            archived: state
            },
            { 
                headers:
                    {
                        'Content-Type': 'application/json'
                        ,'Authorization': 'Bearer ' + String(authTokens.access)
                        
                    }
            })
        return response.status
    }
    
  

    const contextData = {
        getEmail:getEmail,
        archive:archive
    }

    return (
        
        <EmailContext.Provider value={contextData}>
            {children}
        </EmailContext.Provider>
    )

}



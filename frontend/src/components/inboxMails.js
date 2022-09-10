import React, {useContext, useEffect} from 'react'
import AuthContext from '../context/authContext';


const axios = require('axios').default;


const InboxMails = () => {

    let {authTokens} = useContext(AuthContext);

    let getEmails = async () =>{
        let response = await axios.get(`http://127.0.0.1:8000/api/emails/inbox`,
        { headers:
             { 
                'Content-Type': 'application/json'
                ,'Authorization': 'Bearer ' + String(authTokens.access)
                
            }}
        );
        console.log(response)

   }

   useEffect(()=>{
        getEmails();

   }, [])


  return (
    <div>

       <p>Inbox</p>
    </div>
  )
}

export default InboxMails
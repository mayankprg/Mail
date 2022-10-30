import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../context/authContext';
import RenderMails from './renderMails';

const axios = require('axios').default;


const InboxMails = () => {

    let {authTokens} = useContext(AuthContext);
    let [data, setData] = useState([]);

    let getEmails = async () =>{
        let response = await axios.get(`http://127.0.0.1:8000/api/emails/inbox`,
        { headers:
             { 
                'Content-Type': 'application/json'
                ,'Authorization': 'Bearer ' + String(authTokens.access)
                
            }}
        );
        if (response.status=== 200){
          setData(response.data);
        }
        
   };

   useEffect(()=>{
    if (authTokens !== null){
      getEmails();
    }
     // eslint-disable-next-line
   }, []);


  return (
    data.length > 0 ?  <RenderMails data={data} /> : null
  )
}

export default InboxMails;
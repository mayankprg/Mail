import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../context/authContext';
import RenderMails from './renderMails';

const axios = require('axios').default;


const ArchivedMails = () => {

    let {authTokens} = useContext(AuthContext);
    let [data, setData] = useState([]);

    let getEmails = async () =>{
        let response = await axios.get(`http://127.0.0.1:8000/api/emails/archive`,
        { headers:
             { 
                'Content-Type': 'application/json'
                ,'Authorization': 'Bearer ' + String(authTokens.access)
                
            }}
        );
        if (response.status=== 200){
          return response.data;
        }
        
   }

   useEffect(()=>{
      if (authTokens !== null){
        getEmails()
        .then(data =>setData(data));
      
      }
   },[authTokens])



   return (
    data.length > 0 ?  <RenderMails data={data} /> : null
   
  )
}

export default ArchivedMails
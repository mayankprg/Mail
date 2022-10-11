import React from 'react';
import renderCSS from './renderMails.module.css';
import { useNavigate } from "react-router-dom";

const RenderMails = ({data}) => {

    const navigate = useNavigate();

    return (

		<div className={renderCSS["email-data"]}>
            {data.map((mail) =>
                <div className={mail.read ? renderCSS["read"]: renderCSS["uread"]}
                    key={mail.id} 
                    onClick={() =>{navigate(`/email/${mail.id}`);}}>

                        <div className={renderCSS.container}>

                            <div className={renderCSS.item1}>
                                <span className={renderCSS.sender}>{mail.sender}</span>
                            </div>

                            <div className={renderCSS.item2}>
                                <span className={renderCSS.subject}>
                                    {mail.subject? mail.subject: "(no subject)"}
                                </span>
                                <span className={renderCSS.body}>
                                {mail.body? ` - ${mail.body}`: ""}
                                </span>
                            </div>

                            <div className={renderCSS.item3}>
                                <span className={renderCSS.date}>
                                    {new Date().getFullYear() === new Date().getFullYear(mail.timestamp) 
                                        ? new Date(mail.timestamp).toLocaleString('en-us',{month:'short', day: 'numeric'}) 
                                        : new Date(mail.timestamp).toLocaleString('en-us',{day:'numeric', month:'numeric', year: 'numeric'})}
                                </span>
                            </div>      
                        </div>
                </div>
            )}
		</div>
	)
		
  
}

export default RenderMails;
import React from 'react';
import renderCSS from './renderMails.module.css';
import { useNavigate } from "react-router-dom";

const RenderMails = ({data}) => {


	
	let navigate = useNavigate();
    return (
		<div className={renderCSS["email-data"]}>
				{data.map((mail) =>
						<div className={mail.read ? renderCSS["read"]: renderCSS["emails-div"] } key={mail.id} onClick={() =>{navigate(`/email/${mail.id}`);}}>
							<table className={renderCSS["content-tb"]}>
								<tbody>
								<tr>
									<td className={`${renderCSS["sender"]}`}>
										{mail.sender}
									</td>
									<td className={`${renderCSS["truncate"]}`}>
										<span className={` ${renderCSS["subject"]}`} >{mail.subject? mail.subject: "(no subject)"}</span>
										<span className={` ${renderCSS["body"]}`}>-{mail.body}</span>
									</td>
									<td className={`${renderCSS["date"]}`}>
										{
											new Date().getFullYear() === new Date().getFullYear(mail.timestamp) 
												? new Date(mail.timestamp).toLocaleString('en-us',{month:'short', day: 'numeric'}) 
												: new Date(mail.timestamp).toLocaleString('en-us',{day:'numeric', month:'numeric', year: 'numeric'})
										}
									</td>
								</tr>
								</tbody>
							</table>
						</div>
				)}
		</div>
	)
		
  
}

export default RenderMails;
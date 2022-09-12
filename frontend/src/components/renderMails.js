import React from 'react'
import './renderMails.css'



const RenderMails = ({data}) => {

	

	const mails = data.map((mail) =>
		<div className='email-div' key={mail.id}>
			<p><span>{mail.sender}</span> <span>{mail.body}</span> <span>{mail.timestamp}</span> </p>	
		</div>
		
	) 


    return (
		<div>
			{mails}
		</div>
	)
		
  
}

export default RenderMails
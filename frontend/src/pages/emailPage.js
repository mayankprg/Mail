import React, {useState, useContext, useEffect} from 'react';
import EmailContext from '../context/emailContext';
import { useParams } from 'react-router-dom';
import EmailCSS from './emailPage.module.css';
import ReplyButton from '../components/replyButton';
import AuthContext from '../context/authContext';


const EmailPage = () => {
	
	const [email, setEmail] = useState({
        from: "",
        recipients: "",
        subject: "",
        body: "",
		timeStamp: "",
    })
	const [data, setData] = useState();
	const {user} = useContext(AuthContext);
	const {id} = useParams();
	const {getEmail} = useContext(EmailContext);

	useEffect(()=> {
		getEmail(id)
		.then(data => {
			setEmail({
				from: data.sender,
				recipients: data.recipientsList.join(' '),
				subject: data.subject,
				body: data.body,
				timeStamp: data.timestamp,
			})
			setData({data:data});
		})
		
	},[])


	return (
		<div className={EmailCSS["email-div"]}> 
			<article>
				<p><span className={EmailCSS['heading']}>From:</span> {email.from}</p>
				<p><span className={EmailCSS['heading']}>To:</span> {email.recipients}</p>
				<p><span className={EmailCSS['heading']}>Subject:</span> {email.subject}</p>
				<p><span className={EmailCSS['heading']}>TimeStamp:</span> {email.timeStamp}</p>
			</article>
			{user.username === email.from? null:<ReplyButton data={data}/>}
			<div className={EmailCSS['divider']}/>
			<article>
				<p className={EmailCSS['email-body']}>{email.body}</p>
			</article>
		</div>
	)
}

export default  EmailPage;





// changhe side bar 
// changees to a button when small screen

// change header 
// change all buttons to theme of material design
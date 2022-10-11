import React, {useState, useContext, useEffect} from 'react';
import EmailContext from '../context/emailContext';
import { useParams } from 'react-router-dom';
import EmailCSS from './emailPage.module.css';
import ReplyButton from '../components/replyButton';
import AuthContext from '../context/authContext';
import Notification from '../utils/notification';

const EmailPage = () => {
	
	const [email, setEmail] = useState({
        from: "",
        recipients: "",
        subject: "",
        body: "",
		timeStamp: "",
		archived: false,
    })


	const [notifications, setNotification] = useState([]);
	const [data, setData] = useState();
	const {user} = useContext(AuthContext);
	const {id} = useParams();
	const {getEmail, archive} = useContext(EmailContext);

	useEffect(()=> {
		getEmail(id)
		.then(data => {
			setEmail({
				from: data.sender,
				recipients: data.recipientsList.join(' '),
				subject: data.subject,
				body: data.body,
				timeStamp: data.timestamp,
				archived: data.archived? "Unarchive": "Archive",
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

			<button 
				className={EmailCSS['btn']}
				onClick={()=> {
					archive(id, email.archived)
					.then(status =>{
							if (status === 204 && email.archived === "Archive") {
								setEmail({...email, archived: "Unarchive"})
								setNotification([...notifications, 
									{
										type: "success", 
										id: notifications.length, 
										data: "Email Archived"
									}])
							} else {
								setEmail({...email, archived: "Archive"})
								setNotification([...notifications, 
									{
										type: "success", 
										id: notifications.length, 
										data: "Email Unarchived"
									}])
							}})
					}}>
				{email.archived}
			</button>
			
			<div className={EmailCSS['divider']}/>
			<article>
				<p className={EmailCSS['email-body']}>{email.body}</p>
			</article>


			
			{notifications.map(({id, type, data}) => (
				<Notification key={id} type={type} data={data} />
			))}

			
		</div>
	)
}

export default  EmailPage;





// changhe side bar 
// changees to a button when small screen

// change header 
// change all buttons to theme of material design
document.addEventListener('DOMContentLoaded', () => {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');

  document.querySelector('#compose-form').onsubmit = send;
  // send email to recipient/s
 
  
});




function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}


function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';
  

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  
  loadEmails(mailbox);

}


function load_email(){

  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'block';
  
}


async function getEmail(email_id) {
  let response = await fetch(`/emails/${email_id}`);
  let email = await response.json();

  
  
  const email_div = document.createElement('div');

  let from = document.createElement('p');
  let to = document.createElement('p');
  let subject = document.createElement('p');
  let timestamp = document.createElement('p');
  let body = document.createElement('p');

  from.innerHTML = `From:${email.sender}`;
  to.innerHTML = `To:${email.recipients}`;
  subject.innerHTML = `Subject:${email.subject}`;
  timestamp.innerHTML = `Timestamp:${email.timestamp}`;
  body.innerHTML = email.body;


  const reply = document.createElement('button');
  reply.innerHTML = "Reply";

  email_div.append(from, to, subject, timestamp, reply, body);

  document.querySelector('#email-view').append(email_div);

  load_email();



}




async function loadEmails(mailbox) {

  let response = await fetch(`/emails/${mailbox}`);
  let data = await response.json();
  let divMain = document.querySelector('#emails-view');
  
  // fill innerHtml of divMain 
  data.forEach(key => {
    let div = document.createElement("div");
    let sender = document.createElement('p');
    let subject = document.createElement('p');
    let timestamp =  document.createElement('p');

    sender.setAttribute('class', 'sender-p');
    subject.setAttribute('class', 'subject-p');
    timestamp.setAttribute('class', 'timestamp-p');

    sender.innerHTML = key["sender"];
    subject.innerHTML = key["subject"];
    timestamp.innerHTML = key["timestamp"];
    div.append(sender, subject, timestamp);
  
    if (key.read){
      div.setAttribute('class', 'grey info-div');
    } else {
      div.setAttribute('class', 'info-div');
    }

    divMain.append(div);
    div.childNodes.forEach(element  => {
      element.onclick = () => {getEmail(key.id)};
    })
    
  });

}


async function send(event) {
  event.preventDefault();
  let recipients = document.querySelector('#compose-recipients').value;
  let subject = document.querySelector('#compose-subject').value;
  let body = document.querySelector('#compose-body').value;

  let response = await fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body,
      })
  });
  let result = await response.json();
  if ('error' in result){
    alert(result.error);
  } else {
    console.log(result)
    load_mailbox("sent");
  }
  
}



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
  document.querySelector('#email-view').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

}


async function reply_view(email_id){

  let email = await getEmail(email_id);

  let recipients = email.sender;
  let body = `on ${email.timestamp} ${email.sender} wrote:${email.body}`;
  let subject = email.subject;

  if (!subject.startsWith("Re:")){
     subject = "Re:" + email.subject;
  }

  compose_email();

  // composition fields
  document.querySelector('#compose-recipients').value = recipients;
  document.querySelector('#compose-subject').value = subject;
  document.querySelector('#compose-body').value = body;

 
}


function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';
  
  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  
  emails_view(mailbox);

}


function load_email_view(){

  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'block';

  document.querySelector('#email-view').innerHTML = "";
  
}


async function getEmail(email_id) {

  let response = await fetch(`/emails/${email_id}`);
  return await response.json();

}


async function load_email(email_id, mailbox) {

  let email = await getEmail(email_id);
 
  load_email_view();
  read(email_id);

  const email_div = document.createElement('div');
  const hr = document.createElement('hr');

  let from = document.createElement('p');
  let to = document.createElement('p');
  let subject = document.createElement('p');
  let timestamp = document.createElement('p');
  let body = document.createElement('p');
  let button = document.createElement('button');

  from.innerHTML = `From:${email.sender}`;
  to.innerHTML = `To:${email.recipients}`;
  subject.innerHTML = `Subject:${email.subject}`;
  timestamp.innerHTML = `Timestamp:${email.timestamp}`;
  body.innerHTML = email.body;

  button.setAttribute('id', 'archive-btn');

    if (email.archived === false){
      button.innerHTML = "Archive";
    } else {
      button.innerHTML = "unarchive";
    }
  
  const reply = document.createElement('button');
  reply.setAttribute('id', 'reply-btn');
  reply.innerHTML = "Reply";

  // TODO change
  reply.onclick = () => {reply_view(email_id)}

  if (mailbox === "inbox"){
    button.onclick = () => {archive(email.id)};
    email_div.append(from, to, subject, timestamp, reply, button, hr, body);
  } else if (mailbox === "archive") {
    button.onclick = () => {unarchive(email.id)};
    email_div.append(from, to, subject, timestamp, reply, button, hr, body);
  } else {
    email_div.append(from, to, subject, timestamp, reply, hr, body);
  }

  document.querySelector('#email-view').append(email_div);
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


async function read(email_id){

 let response = await fetch(`/emails/${email_id}`, {
  method: "PUT",
  body: JSON.stringify({
    read: true
  })
 })
}


async function archive(email_id){

  let response = await fetch(`/emails/${email_id}`, {
   method: "PUT",
   body: JSON.stringify({
     archived: true
   })
  })
  load_mailbox('inbox');
}


async function unarchive(email_id){

  let response = await fetch(`/emails/${email_id}`, {
   method: "PUT",
   body: JSON.stringify({
     archived: false
   })
  })
  load_mailbox('inbox');
}


async function get_emails(mailbox) {
  let response = await fetch(`/emails/${mailbox}`);
  return await response.json();
}


async function emails_view(mailbox){

  let data = await get_emails(mailbox);

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
      element.onclick = () => {load_email(key.id, mailbox)};
    })
  });

}
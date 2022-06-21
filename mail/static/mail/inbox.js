document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');

  // send email to recipient/s
  document.querySelector('#compose-form').addEventListener('submit', event => {
    event.preventDefault();

    var recipients = document.querySelector('#compose-recipients').value;
    var subject = document.querySelector('#compose-subject').value;
    var body = document.querySelector('#compose-body').value;

    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body,
      })
    })
    .then(response => response.json())
    .then(result => {
      if ('error' in result){
        alert(result.error);
      } else {
        alert(result.message);
        document.querySelector('#sent').click();
      }
    });
  });




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

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  

  (async mailbox => {
    let response = await fetch('emails/' + mailbox);
    let data = await response.json();
    
    var divMain = document.querySelector('#emails-view');
    divMain.setAttribute('class', 'info-div');
    // fill innerHtml of divMain 
    data.forEach(element => {
      var div = document.createElement("div");
      var sender = document.createElement('p');
      var subject = document.createElement('p');
      var timestamp =  document.createElement('p');

      sender.setAttribute('class', 'sender-p');
      subject.setAttribute('class', 'subject-p');
      timestamp.setAttribute('class', 'timestamp-p');

      sender.innerHTML = element["sender"];
      subject.innerHTML = element["subject"];
      timestamp.innerHTML = element["timestamp"];

      div.append(sender,subject, timestamp);
      divMain.append(div);
    });
  })(mailbox);



}



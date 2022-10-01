import React from 'react'
import InboxMails from '../components/inboxMails';
import InboxCSS from './inbox.module.css'

const InboxPage = () => {
  return (
    <div className={InboxCSS.inboxdiv}>
      <InboxMails/>
    </div>
  )
}

export default InboxPage;
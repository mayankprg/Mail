import React from 'react';
import ButtonCSS from './replyButton.module.css'
import { useNavigate } from 'react-router-dom';

const ReplyButton = ({data}) => {

  const navigate = useNavigate();

  const handleReply = () => {
    navigate("/compose", {state:data})

  }

  
  return (
    <button  
      onClick={handleReply}
      className={ButtonCSS["rply-btn"]}><span>⮌</span> Reply</button>
  )
}

export default ReplyButton
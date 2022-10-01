import React from 'react';
import ButtonCSS from './replyButton.module.css'
import ComposeForm from './composeForm';
import { useNavigate } from 'react-router-dom';

const ReplyButton = ({data}) => {

  const navigate = useNavigate();

  const handleReply = () => {
    navigate("/compose", {state:data})

  }

  
  return (
    <button  
      onClick={handleReply}
      className={ButtonCSS["rply-btn"]}><span>⮌</span> Relpy</button>
  )
}

export default ReplyButton
import React, {useState} from 'react'
import NotifiyCSS from './notification.module.css'





const Notification = (props) => {
    
    let [isActive, setActive] = useState(false);
    if(props.type === "danger"){
        setActive(true);
    }

    const close = (event)=>{
        event.target.parentElement.remove();
    }

    return (
        <div className={`
            ${NotifiyCSS['main-div']} 
            ${NotifiyCSS['div-style']}
            ${NotifiyCSS['animate']}
            ${isActive? NotifiyCSS['red']: null}
            
        `}
            
        >
            <div className={NotifiyCSS["msg-div"]}>
                <p className={NotifiyCSS["message"]}> {props.message} </p> 
            </div>
           
            <p onClick={(event)=>{close(event)}}
            className={NotifiyCSS["close"]}>✘</p>

        </div>
    )
}

export default Notification
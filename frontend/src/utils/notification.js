import React from 'react'
import NotifiyCSS from './notification.module.css'
import ReactDOM from 'react-dom';
import CreateContainer from './createContainer';
import 'material-icons/iconfont/material-icons.css';

import { useLocation } from 'react-router-dom';

const container = CreateContainer();

export default function Notification({type, data}) {
    

    let currentUrl = useLocation()
    let handleClose = (event)=> {
        console.log(event.target.parentElement.parentElement)
        event.target.parentElement.parentElement.remove();
    }
    
    return ReactDOM.createPortal(
      
            <div className={`${NotifiyCSS.notification} ${NotifiyCSS.animate} ${type === "danger"? NotifiyCSS.red: null}`}>
                <button onClick={handleClose}
                    className={NotifiyCSS.close}>
                    <span className="material-icons">close</span>
                    
                </button>

                <div className={NotifiyCSS["msg-div"]}>
                    <p className={NotifiyCSS["message"]} 
                        onClick={handleClose}
                    >{data}</p>
                </div>
            </div>
        ,
        container
    );
}

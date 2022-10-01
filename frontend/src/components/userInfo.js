import React, {useContext} from 'react';
import AuthContext from '../context/authContext';
import InfoCSS from './userInfo.module.css';


const UserInfo = () => {

    let {user, logout}  = useContext(AuthContext);

    return (
    <div>
        {user? <div className={InfoCSS["user-info"]}>
            <p>Logged in as : <br/>{user.username}</p>
            <button
                type="button"
                className= {InfoCSS.button}
                onClick={logout}
              >
              Logout
            </button>
        </div> : null}
    </div>
    )
}

export default UserInfo
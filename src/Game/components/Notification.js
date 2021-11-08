import React from 'react'

const Notification =({showNotification}) =>{
    return (
        <div className={`notification-container ${showNotification ?  'show' :  ' '}`}>
            <p>You enterd this letter</p>
        </div>
    )
}

export default Notification;

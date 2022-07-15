import React from 'react'
import '../../style/nextuser.css'
import '../../style/overlay.css'

export function NextUsers(props) {
  return <div id={props.id} className="user">
     {props.users.map((user, index) => {
        if (index != 0) {
          return (<div className={user.role + "_"} style={{opacity: 0.2}}></div>)
        } else {
          return (<div className={user.role + "_"}></div>)
        }
      })}
  </div>
}
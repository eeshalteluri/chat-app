import React from 'react'
import RequestNotification from '../components/RequestNotification'

import getUser from '../methods/getUser'

const Notifications = () => {

    const user = async () => await getUser()
    console.log("noti user: ", user)

  return (
    <>
        <h2>Friend Requests</h2>
        <RequestNotification />
    </>
  )
}

export default Notifications
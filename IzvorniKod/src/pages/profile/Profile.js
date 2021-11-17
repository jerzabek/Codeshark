import React, { useContext } from 'react'
import { UserContext } from './../../common/UserContext';

function Profile(props) {
  const userContext = useContext(UserContext)

  return (
    <div>
      <h1>Your profile</h1>
      <h2>Currently logged in as {userContext.user.username}</h2>
    </div>
  );
}

export default Profile;
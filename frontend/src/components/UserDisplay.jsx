import React from 'react'

const UserDisplay = ({user}) => {
  return (
    <div className='w-full bg-red-300'>
        <p>{user.username}</p>
    </div>
  )
}

export default UserDisplay
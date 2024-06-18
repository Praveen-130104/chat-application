import React from 'react'
import Profile from '../components/Profile'
import FriendsList from '../components/FriendsList'
import { MyProvider } from '../context/Mycontext'

const Friends = () => {
    return (
        <MyProvider>
            <div className='w-full h-screen lg:grid md:grid-cols-12 '>

                <div className=' lg:col-span-2 '>
                    <Profile />
                </div>
                <div className='lg:col-span-4'>
                    <FriendsList />
                </div>
                <div className='lg:col-span-6 px-4 h-[99%]  '>
                    {/* <Chat /> */}
                </div>




            </div>
        </MyProvider>
    )
}

export default Friends
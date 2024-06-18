import React , { useEffect, useState } from 'react'
import Profile from '../components/Profile';
import Dash from '../components/Dash';
import Chat from '../components/Chat';
import Modal from '../components/Modal';
import { MyProvider, useMyContext } from '../context/Mycontext';
import { ChatProvider } from '../context/Chatcontext';
import { useLocation } from 'react-router-dom';
import FriendsList from '../components/FriendsList';
import AddFriend from '../components/AddFriend';

const Dashboard = () => {

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const [active, setActive] = useState('chat');
    // const { addFriend } = useMyContext();
    const location = useLocation();

    useEffect(() => {
      const menu = new URLSearchParams(location.search).get('menu');
      setActive(menu);
      console.log(active);
  }, [location.search]);

    useEffect(() => {
        if(!token || !user){
            console.log("No token or user");
            window.location.href = "/";
        }
    }, [token,user]);

    
  return (
    <MyProvider>
    <div className='w-full h-screen lg:grid md:grid-cols-12 '>

        <div className=' lg:col-span-2 '>
            <Profile />
        </div>

        <div className='lg:col-span-4'>
          {
            active === 'chat' ? <Dash /> :
            active === 'friends' ? <FriendsList /> :
            null
          }
        </div>
        <div className='lg:col-span-6 px-4 h-[99%]  '>
          {/* { addFriend ?( */}
          <ChatProvider>
            <Chat />
          </ChatProvider>
          {/* ): (
            <AddFriend/>
          )
          }  */}
        </div>

        {/* <button onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}>Logout</button>  */}

        
    </div>
    </MyProvider>
  )
}

export default Dashboard
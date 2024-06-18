import React, { useEffect, useRef, useState, Suspense } from 'react'
import axios from 'axios';
import { useMyContext } from '../context/Mycontext';
import ChatBox from './ChatBox';
import SendMessage from './SendMessage';
import { FiPhone } from "react-icons/fi";
import { IoVideocamOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useChatContext } from '../context/Chatcontext';



const Chat = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const containerRef = useRef();
  const { toChat, setToChat, chats, setChats } = useMyContext();

  const { friend, setFriend, message, setMessage, sendImage, setSendImage } = useChatContext();

  // const [friend, setFriend] = useState();
  // const [message, setMessage] = useState('');
  // const [sendImage, setSendImage] = useState(null)


  const getFriend = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/protected/getUser", {
        username: toChat,
        friend: user.username
      }, {
        headers: {
          Authorization: `${token}`
        }
      })
      if (response.status === 200) {
        const data = response.data.user;
        setFriend(data);
      }
      else {
        alert("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    try {

      if (sendImage) {
        const formData = new FormData();
        formData.append('image', sendImage);
        formData.append('username', user.username);
        formData.append('friend', friend.username);
        formData.append('collectionId', friend.chats);
        const response = await axios.post("http://localhost:3000/api/protected/sendImgMsg", formData, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data"
          }
        })
        if (response.status === 200) {
          setSendImage(null);
          displayChats();
        }
        else {
          alert("User not found");
        }
        return;
      }

      const response = await axios.post("http://localhost:3000/api/protected/sendMessage", {
        username: user.username,
        friend: friend.username,
        message: message,
        collectionId: friend.chats
      }, {
        headers: {
          Authorization: `${token}`
        }
      })
      if (response.status === 200) {
        setMessage('');
        // Use the updated value of message in the callback
        displayChats();
      }
      else {
        alert("User not found");
      }

    } catch (err) {
      console.log(err);
    }

  }

  const displayChats = async () => {
    try {
      if (!friend.chats) {
        return;
      }
      const response = await axios.post("http://localhost:3000/api/protected/displayChats", {
        collectionId: friend.chats
      }, {
        headers: {
          Authorization: `${token}`
        }
      })
      if (response.status === 200) {
        const data = response.data.messages;
        setChats(data);
      }
      else {
        alert("Chats not found");
      }

    } catch (err) {
      console.log(err);
    }

  }

  useEffect(() => {
    displayChats();
  }, [toChat, friend])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chats])

  

  useEffect(() => {
    if (toChat) {
      getFriend()
    }
  }, [toChat])

  return (
    <div className='w-full h-screen  bg-[#23262F] rounded-3xl flex items-center  flex-col p-3'>
      {friend && toChat ? (
        <>
          <div className=' text-white w-full flex justify-between m-2 p-2 h-[9%]'>
            <div className=' h-full w-[30%] p-2 flex justify-start items-center'>
              <img src={friend?.image} className='w-14 h-14 rounded-full  object-cover bg-gray-500' />
              <div className='ml-3'>
                <h2 className='text-md font-semibold'>{friend?.username}</h2>
                {friend?.status === 'online' ? <p className='text-sm text-green-500'>Online</p> : <p className='text-sm text-red-500'>Offline</p>}
              </div>
            </div>
            <div className='b h-full w-[40%] flex items-center justify-center gap-14'>
              <i className=' bg-[#3B3D46]  scale p-2 rounded-lg cursor-pointer transform hover:scale-110'><IoVideocamOutline /></i>
              <i className=' bg-[#3B3D46]  scale p-2 rounded-lg cursor-pointer transform hover:scale-110'><FiPhone /></i>
              <i className=' bg-[#3B3D46]  scale p-2 rounded-lg cursor-pointer transform hover:scale-110'
                onClick={() => setToChat('')}
              ><IoMdClose /></i>
            </div>
          </div>

          <div className={`w-full h-full  overflow-y-hidden mx-auto p-3  bg-re-200 `} ref={containerRef}>
            <Suspense fallback={<div>Loading...</div>}>
              <ChatBox chats={chats} sender={user} receiver={friend} sendMessage={sendMessage} />
            </Suspense>
          </div>


        </>
      ) : 'null'
      }
    </div >
  )
}

export default Chat
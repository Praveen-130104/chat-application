import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ChatExcerpt from './ChatExcerpt';
import { FaPlus } from 'react-icons/fa';  

const Dash = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [flag, setFlag] = useState(false);
  const [name, setName] = useState('');
  const [friends, setFriends] = useState([]);



  const fetchDataForFriends = async () => {
    const promises = user.friends.map(async (friendId) => {
      const detail = await getFriends(friendId);
      return detail;
    });

    const updatedFriends = await Promise.all(promises);
    setFriends(updatedFriends);
  }

  useEffect(() => {
    console.log("in")
    fetchDataForFriends();
  }, []);




  const addFriend = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/protected/addFriend", {
        username: user.username,
        friend: name
      }, {
        headers: {
          Authorization: `${token}`
        }
      })
      if (response.status === 200) {
        alert("Friend Added");
      }
      else {
        alert("Friend Not Added");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const acceptFriend = async (friend) => {
    try {
      const response = await axios.post("http://localhost:3000/api/protected/acceptFriend", {
        username: user.username,
        friend
      }, {
        headers: {
          Authorization: `${token}`
        }
      })
      if (response.status === 200) {
        alert("Friend Added");
      }
      else {
        alert("Friend Not Added");
      }
    } catch (err) {
      console.log(err);
    }
  }


  const getFriends = async (friend) => {
    try {
      const response = await axios.post("http://localhost:3000/api/protected/getUser", {
        username: friend,
        friend: user.username
      }, {
        headers: {
          Authorization: `${token}`
        }
      })
      if (response.status === 200) {
        return response.data.user;
        // setFriends(response.data.user);

      }
      else {
        alert("Friends Not Found");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='w-full h-screen bg-slate-200  rounded-3xl p-3'>
      <div className='flex justify-between items-center'>
        <div className='m-2 p-4 flex flex-col '>
          <h1 className=' font-bold text-2xl'>
            Chats
          </h1>
          <p className='text-sm'>
            Connect
          </p>
        </div>
        <div className='mx-12'>
          <button className='bg-[#23262F] p-2 rounded-lg flex justify-between text-white items-center'>
              <i className='text-white px-1'><FaPlus/></i>
              <p className='px-2'> New Chat </p>
          </button>
        </div>
      </div>
      {/* <ChatExcerpt name = {"Praveen"} profile={"https://firebasestorage.googleapis.com/v0/b/chat-app-1f283.appspot.com/o/profiles%2Fpraveen?alt=media&token=825c9f53-aa89-4b93-907b-ccc3b9696f6a"}
      lastMessage = {"Hello"}
      time = {"12:00"}
      /> */}

      <div className='m- p-4 gap-3  flex flex-col justify-between items-center'>

        {friends.length > 0 ? friends.map((friend) => {
          return (
            <ChatExcerpt name={friend.username} profile={friend.image} chat={friend.chats} />
          )

        }) : <>NULL</>}
      </div>

    </div>
  )
}

export default Dash
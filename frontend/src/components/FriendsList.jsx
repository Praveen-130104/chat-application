import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchFriend from './SearchFriend'
import { useMyContext } from '../context/Mycontext'
import { GrChat } from 'react-icons/gr'
import { FaPlus } from 'react-icons/fa'

const FriendsList = () => {

  const [friends, setFriends] = useState([])
  const [searching, setSearching] = useState(false);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  // console.log(user);
  const { setToChat, toChat  } = useMyContext();

  useEffect(() => {
    console.log(toChat);
  }, [toChat])

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

  const fetchDataForFriends = async () => {
    const promises = user.friends.map(async (friendId) => {
      const detail = await getFriends(friendId);
      return detail;
    });

    const updatedFriends = await Promise.all(promises);
    setFriends(updatedFriends);
  }

  useEffect(() => {
    fetchDataForFriends();
    setToChat('')
  }, []);



  return (
    <div className='w-full h-screen bg-slate-200  rounded-3xl p-3 cursor-pointer '>
      <div className='flex justify-between items-center'>
        <div className='m-2 p-4 flex flex-col '>
          <h1 className=' font-bold text-2xl'>
            Friends
          </h1>
          <p className='text-sm'>
            Connect
          </p>
        </div>
        {/* <div className='mx-12'>
          <button className='bg-[#23262F] p-2 rounded-lg flex justify-between text-white items-center' 
            onClick={()=>setAddFriend(true)}
          >
            <i className='text-white px-1'><FaPlus /></i>
            <p className='px-2' > Add Friend </p>
          </button>
        </div> */}
      </div>
      <SearchFriend friends={friends} setSearching={setSearching} />
      {!searching && (
      <div className='bg-lue-200 '>
        {friends.map((friend) => {
          return (
            <div className='flex justify-between items-center m-2 p-2 bg-slate-300   rounded-xl'>
              <div className='flex items-center'>
                <img src={friend.image} className='w-12 h-12 rounded-full border border-black object-cover bg-gray-500' />
                <div className='ml-3'>
                  <h2 className='text-md font-semibold'>{friend.username}</h2>
                  <p className='text-sm'>{friend.email}</p>
                </div>
              </div>
              <button className='bg-[#23262F] text-white p-2 rounded-md'
                onClick={() => {
                  setToChat(friend.username);
                }}
              ><GrChat /></button>
            </div>
          )

        })}
      </div>
      )}
    </div>
  )
}

export default FriendsList
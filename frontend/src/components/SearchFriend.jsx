import React, { useEffect, useState } from 'react'
import { FaSearch,FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { useMyContext } from '../context/Mycontext';

const SearchFriend = ({ friends, setSearching }) => {

    const [search, setSearch] = useState('');
    const [filteredFriends, setFilteredFriends] = useState([]);

    const[searchUser, setSearchUser] = useState([]);
    const {viewUser , setViewUser} = useMyContext();
    const token = localStorage.getItem('token');

    useEffect(() => {
        console.log("here" ,viewUser);
    }, [viewUser])

    useEffect(() => {
        if (search.length > 0) {
            setSearching(true);
            const filtered = friends.filter(friend => {
                return friend.username.toLowerCase().includes(search.toLowerCase());
            }
            )
            setFilteredFriends(filtered);
        }
        else if (search.length === 0) {
            setFilteredFriends([]);
            setSearching(false);
        }
    }, [search, friends]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post('http://localhost:3000/api/protected/searchFriend',{
                searchTerm: search
            }, {
                headers: {
                    Authorization: `${token}`
                }
            })
            // setSearchUser(response.data.user);
            console.log("response -> ",response.data.user);
        }
        if(filteredFriends.length === 0 && search.length > 0){
            console.log(filteredFriends)
            fetchData();
        }
        else if(search.length === 0){
            setSearchUser([]);
        }
    }, [search]);


    return (
        <div className='p-2'>
            <div className='w-full relative'>
                <i className="absolute top-3 left-3 text-gray-500 z-10">
                    <FaSearch/>
                </i>
                <input
                    type="text"
                    placeholder=""
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full h-10 p-2 rounded-xl border border-black bg-slate-00  pl-10 '
                />
            </div>
            <ul>
                {searchUser.length>0 && filteredFriends.length>0 &&  <h1>Your Friends</h1> }
                {filteredFriends.map((friend) => (
                    <li 
                        className='flex  justify-between items-center m-2 p-2 bg-slate-300   rounded-xl'
                        // onClick={}
                    >
                        <div className='flex items-center '>
                            <img src={friend.image} className='w-12 h-12 rounded-full border border-black object-cover bg-gray-500' />
                            <div className='ml-3'>
                                <h2 className='text-md font-semibold'>{friend.username}</h2>
                                <p className='text-sm'>{friend.email}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <ul>
                {searchUser.length>0 && <h1>Search Result</h1>}
                {searchUser?.map(friend => (
                    <li className='flex justify-between items-center m-2 p-2 bg-slate-300   rounded-xl'>
                        <div className='flex items-center'>
                            <img src={friend.image} className='w-12 h-12 rounded-full border border-black object-cover bg-gray-500' />
                            <div className='ml-3'>
                                <h2 className='text-md font-semibold'>{friend.username}</h2>
                                <p className='text-sm'>{friend.email}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SearchFriend
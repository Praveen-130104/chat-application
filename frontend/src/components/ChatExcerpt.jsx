import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useMyContext } from '../context/Mycontext';



const ChatExcerpt = ({ name, profile, chat }) => {

    const token = localStorage.getItem("token");
    const [lastMessage, setLastMessage] = useState('');
    const {toChat,setToChat , chats} = useMyContext();


    const getLastMessage = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/protected/getFriendChat", {
                collectionId: chat
            }, {
                headers: {
                    Authorization: `${token}`
                }
            })
            if (response.status === 200) {
                const data = response.data.lastmessage;
                // console.log(data);
                setLastMessage(data);
            }
            else {
                alert("User not found");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getTime = (time) => {
        const date = new Date(time);
        return date.getHours()+':'+date.getMinutes();
    }

    const activeStyle = 'bg-gray-500 rounded-xl  shadow-lg hover:bg-gray-6  scale-110  ';

    useEffect(() => {
        getLastMessage();
    }, [chats])
    
    

    return (
        <li className={`  list-none h-full ${toChat === name ? activeStyle : 'bg-slate-300 '}transition-all duration-200 ease-in-out rounded-xl  w-full h-16 p-2 transform hover:-translate-y-1 cursor-pointer`}
            onClick={(e) => {
                // localStorage.setItem("toChat", name);
                setToChat(name)
                // window.location.reload();
            }}
        >
            <div className='flex items-center justify-between'>
                <div className='flex items-center '>
                    <img src={profile} className='w-12 h-12 rounded-full border border-black object-cover bg-gray-500' />
                    <div className='ml-3'>
                        <h2 className='text-md font-semibold'>{name}</h2>
                        { 
                            lastMessage.type === 'image' ?(
                                <p>Image</p>
                            ):(
                            <p className='text-sm '>{lastMessage.message}</p>
                            )
                        }
                    </div>
                </div>
                
                <div className=''>
                    <p className='text-xs'>{ getTime(lastMessage?.time?.nanoseconds) }</p>
                </div>
            </div>
            
        </li>
    )
}

export default ChatExcerpt
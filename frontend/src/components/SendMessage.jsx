import React,{useEffect, useState} from 'react'
import { VscSend } from "react-icons/vsc";
import { GrGallery } from "react-icons/gr";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { useChatContext } from '../context/Chatcontext';
import axios from 'axios';




const SendMessage = ({sendMessage}) => {


    const {setMessage ,setSendImage} = useChatContext();

    


    return (
        <form onSubmit={sendMessage} className='flex justify-  items-center'>
            <input
                type="text"
                onChange={(e) => { 
                    setMessage(e.target.value)
                    
                 }}
                className='w-3/4 bg-[#23262F] text-white  p-3  rounded-lg outline-none'
                placeholder='Type a message here...'
            />
            <div className='flex items-center justify-center gap-7 mx-9'>
                <input
                    type="file"
                    id="file"
                    accept='.jpg,.png,.jpeg'
                    onChange={(e) => {
                        setSendImage(e.target.files[0])
                    }}
                    className="hidden"
                />
                 <i 
                    className=' bg-[#23262F]  scale p-4 rounded-lg cursor-pointer text-white transform hover:scale-110'
                   onClick={()=>document.getElementById('file').click()}
                   >
                    <GrGallery/>
                 </i>
                 <i className=' bg-[#23262F] scale p-4 rounded-lg cursor-pointer text-white transform hover:scale-110'>
                    <MdOutlineKeyboardVoice className='text-l'/>
                 </i>
                 <i className='bg-[#2F80EE]  scale p-4 rounded-lg cursor-pointer text-white transform hover:scale-110'
                    onClick={sendMessage}
                 >
                    <VscSend/>
                 </i>
            </div>
            
        </form>
    )
}

export default SendMessage
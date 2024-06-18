import React, { useEffect,  useState } from 'react'
import SendMessage from './SendMessage'
import { useChatContext } from '../context/Chatcontext'

const ChatBox = ({ chats, sender, receiver, sendMessage }) => {

  const { sendImage, setSendImage } = useChatContext();

  useEffect(() => {
    // Scroll to the bottom when the component mounts
    
  }, []);

  return (
    <>
      <div className='w-full h-full bg-[#484C55] rounded-2xl  flex flex-col justify-end '  >

        <div className='overflow-hidden overflow-y-scroll p-2'>
          {!sendImage && chats.map((chat) => {
            if (chat?.type == "image") {
              return (
                <div className={`flex  ${chat.sender === sender.username ? 'justify-end items-end' : ' justify-start items-start'}  text-white cursor-default`}>
                  {chat.sender === receiver.username ?
                    (<div className='bg-rd-200 mx-2 my-1'>
                      <img src={receiver.image} className='w-5 h-5 rounded-full  object-cover ' />
                    </div>)
                    : ('')}
                  <div className='p-5 w-1/3 bg-[#23262F] flex justify-center rounded-lg my-1  '>
                    <img src={chat.message} alt={"profile"} className='w-full h- rounded-sm  object-cover ' />
                  </div>
                </div>
              )
            }
            else if (chat.sender === sender.username) {
              return (
                <div className='flex justify-end items-end text-white cursor-default '>
                  <div className='w-fit px-5 py-3 bg-[#23262F] rounded-lg my-1  '>
                    <p>{chat.message}</p>
                  </div>

                </div>
              )
            }
            else if (chat.sender === receiver.username) {
              return (
                <div className='flex justify-start items-start text-white cursor-default'>
                  <div className='bg-rd-200 mx-2 my-1'>
                    <img src={receiver.image} className='w-5 h-5 rounded-full  object-cover ' />
                  </div>
                  <div className='w-fit px-5 py-3 bg-[#23262F] rounded-lg my-1 '>
                    <p>{chat.message}</p>
                  </div>
                </div>
              )
            }
          })}
          {
            sendImage && (
              <div className=' w-full h-full overflow-hidden  flex items-center justify-center  text-white cursor-default '>
                <div className=' px-5 py-5 bg-[#23262F] overflow-hidden rounded-lg w-full h-full flex items-center justify-center '>
                  <img src={URL.createObjectURL(sendImage)} className='w-full h-full object-contain' />
                </div>
              </div>
            )
          }
          <div className=' w-full p-2 mt-4'>
            <SendMessage sendMessage={sendMessage} />
          </div>
          
        </div>

      </div>
    </>
  )
}

export default ChatBox
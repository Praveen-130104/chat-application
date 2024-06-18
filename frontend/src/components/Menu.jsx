import React, { useEffect, useState } from 'react'
import { IoHomeOutline, IoChatbubblesOutline, IoSettingsOutline } from "react-icons/io5";
import { RiContactsLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Menu = () => {

    const location = useLocation();

    const [active, setActive] = useState('chat');
    const activeStyle = 'relative bg-gradient-to-r from-blue-200 to-blue-0 rounded-r-md';



    useEffect(() => {
        const menu = new URLSearchParams(location.search).get('menu');
        setActive(menu);
    }, [location.search])


    return (
        <div className=' my-2 mx-3 py-2 grid grid-rows-5 gap-7 '>
            <div className={` grid grid-cols-3 gap-0 cursor-pointer p-2 ${active == 'home' ? activeStyle : null}  `} onClick={() => setActive('home')}>
                {active == 'home' &&
                    <img src="https://res.cloudinary.com/djdhjstoc/image/upload/v1706634344/Rect_zwu114.svg" alt="rect" className='absolute left-[-49%] w-full h-full' />
                }
                <i className='cols-span-1 flex items-center justify-center text-xl   '><IoHomeOutline /></i>
                <p className='cols-span-2 text-md font-bold tracking-wide  '>HOME</p>
            </div>
            <Link to={`/dashboard?menu=chat`} className={` grid grid-cols-3 gap-0 cursor-pointer p-2 ${active == 'chat' ? activeStyle : ''}  `} onClick={() => setActive('chat')} >
                {active == 'chat' &&
                    <img src="https://res.cloudinary.com/djdhjstoc/image/upload/v1706634344/Rect_zwu114.svg" alt="rect" className='absolute left-[-49%] w-full h-full' />
                }
                <i className='cols-span-1 flex items-center justify-center text-xl   '><IoChatbubblesOutline /></i>
                <p className='cols-span-2 text-md font-bold tracking-wide  '>Chat</p>
            </Link>
            <Link to='/dashboard?menu=friends' className={` grid grid-cols-3 gap-0 cursor-pointer p-2 ${active == 'friends' ? activeStyle : null}  `} onClick={() => setActive('friends')}>
                {active == 'friends' &&
                    <img src="https://res.cloudinary.com/djdhjstoc/image/upload/v1706634344/Rect_zwu114.svg" alt="rect" className='absolute left-[-49%] w-full h-full' />
                }
                <i className='cols-span-1 flex items-center justify-center text-xl   '><RiContactsLine /></i>
                <p className='cols-span-2 text-md font-bold tracking-wide  '>Friends</p>
            </Link>
            <Link to='/notifications' className={` grid grid-cols-3 gap-0 cursor-pointer p-2 ${active == 'noti' ? activeStyle : null}  `} onClick={() => setActive('noti')}>
                {active == 'noti' &&
                    <img src="https://res.cloudinary.com/djdhjstoc/image/upload/v1706634344/Rect_zwu114.svg" alt="rect" className='absolute left-[-49%] w-full h-full' />
                }
                <i className='cols-span-1 flex items-center justify-center text-xl   '><IoMdNotificationsOutline /></i>
                <p className='cols-span-2 text-md font-bold tracking-wide  '>Notifications</p>
            </Link>
            <div className={` grid grid-cols-3 gap-0 cursor-pointer p-2 ${active == 'set' ? activeStyle : null}  `} onClick={() => setActive('set')}>
                {active == 'set' &&
                    <img src="https://res.cloudinary.com/djdhjstoc/image/upload/v1706634344/Rect_zwu114.svg" alt="rect" className='absolute left-[-49%] w-full h-full' />
                }
                <i className='cols-span-1 flex items-center justify-center text-xl   '><IoSettingsOutline /></i>
                <p className='cols-span-2 text-md font-bold tracking-wide  '>Settings</p>
            </div>
        </div>
    )
}

export default Menu
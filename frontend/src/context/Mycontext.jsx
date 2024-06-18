// MyContext.js
import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [toChat, setToChat] = useState('');
  const [chats, setChats] = useState([]);
  const [addFriend, setAddFriend] = useState(false);
  const [viewUser, setViewUser] = useState();

  return (
    <MyContext.Provider value={{ toChat , setToChat , chats , setChats , addFriend , setAddFriend ,viewUser ,setViewUser }}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  return useContext(MyContext);
};

export { MyProvider, useMyContext };

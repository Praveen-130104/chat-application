import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

    const [friend, setFriend] = useState();
  const [message, setMessage] = useState('');
  const [sendImage, setSendImage] = useState(null);

  return (
    <ChatContext.Provider value={{ friend,setFriend , message , setMessage , sendImage ,setSendImage }}>
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => {
  return useContext(ChatContext);
};

export { ChatProvider, useChatContext};
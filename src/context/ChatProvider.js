import React, { createContext, useContext, useState, useEffect } from 'react';


const chatContext = createContext();

const ChatProvider = ({ children })=> {
    const [users, setUsers] = useState("")
    const [selectedUserChat, setSelectedUserChat] = useState("");
    const [chats,setChats]=useState([]);
    const [userChat,setUserChat]=useState([]);
    const [chatUserName, setChatUserName] = useState("Username")
    // console.log("chat provider users",users)
    useEffect(() => {
        const loggedInUser =  JSON.parse(sessionStorage.getItem("userInfo"));
        // console.log("chat provider users", loggedInUser)
        setUsers(loggedInUser);
        
        // if (loggedInUser === "" || loggedInUser === null || loggedInUser === undefined) {
        //     window.location('/');
        // }
    },[]);
    return (
        <chatContext.Provider value={{users,setUsers,selectedUserChat, chatUserName, setChatUserName, setSelectedUserChat,chats,setChats,userChat,setUserChat}}>
            {children}
        </chatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(chatContext);
   
  };


export default ChatProvider
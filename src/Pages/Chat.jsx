
import React, { useState, useEffect } from 'react'
import UserHeader from './UserHeader'
import { Container, Row, Col, Form, Button, InputGroup, ListGroup, Offcanvas, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import Picker from 'emoji-picker-react';
import { FaPaperPlane,FaSpinner  } from 'react-icons/fa';
import { FiSmile } from 'react-icons/fi';
import $ from 'jquery';
import axios from 'axios';


function Chat() {


  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [searchData, setSearchData] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [show, setShow] = useState(false);
  const [selectedUserChat, setSelectedUserChat] = useState("");
  const [chats, setChats] = useState([]);
  const [userChat, setUserChat] = useState([]);
  const [chatUserName, setChatUserName] = useState("Username")
  const [userError, setUserError] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const loggedInUser = JSON.parse(sessionStorage.getItem("userInfo"));
  // console.log("user token role", loggedInUser.role)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let History = useNavigate()

  
  useEffect(()=> {
    console.log(loggedInUser)
    if(!loggedInUser || loggedInUser === null ){
      History("/Login.jsx")
    }
    
    if(loggedInUser.role === 3){
      $("#chat_bar").hide()
      $("#searchUser").hide();
    }
     
    
  })


  $(".validate").focus(function () {
    $("#userError").hide();
    // $("#searchUser").hide();
  })


  // =========function for serach all user=======
  const handleSearch = async () => {

    setLoading(true)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loggedInUser.accessToken}`,
        },
      };
      console.log("search headers", config)
      const { data } = await axios.get(`http://148.72.244.170:3000/userslist?search=${search}`, config);
      setLoading(false)
      // console.log("get searched users data", data)


      if (data.statusCode === 400) {
        setUserError(data.statusMsj);
      }
      if (data.statusCode === 200) {
        // console.log("users", data.users)
        setSearchData(data.users);
      }
    } catch (error) {
      console.log("Search errror", error)

    }
    // setSearch("")
  };

  const onKeyUp = (event) => {
    if (event.key === 'Enter' || event.charCode === 13) {
      handleSearch();
    }
  }


  // =========function for create chat of all user=========
  const createChat = async (userId) => {
    console.log("userid", userId)

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${loggedInUser.accessToken}`,
        },
      };

      await axios.post("http://148.72.244.170:3000/chat/createChat", { userId }, config).then(res => {

      // console.log("res", res)
        console.log("res.data",res.data)
        if(res.data.statusCode === 200 && res.data.statusMsg === 'Chat already Created'){
          console.log("'Chat already Created'",res.data.Chat)
        }
        // setSelectedUserChat(chatId);
        setChatUserName()
        // console.log("Selected User Chat id", res.data.Chat)

      }).catch(err => {
        console.log("err", err)
      })
    }

    catch (error) {
      console.log("error", error)
    }
    setShow(false)
  }

  // ==========function for fetch all user=======
  const fetchUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loggedInUser.accessToken}`,
        },
      };
      // console.log("config for fetch users", config)
      await axios.get("http://148.72.244.170:3000/chat/fetchchat", config)
        .then(res => {
          // console.log("config for fetch users within api", config)
          // console.log("res", res.data)
          console.log("fetch users for chat:", res.data.chat)
          setLoading(false)
          if (res.data.statusCode === 400) {
            History('/chat');
            // setChats(null)
          } else {
            // console.log("res.data.chat",res.data.chat)
            setChats(res.data.chat);

          }

        })
        .catch(error => {
          console.log("error", error)
        })

    }
    catch (error) {
      console.log("fecth api", error)
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [show])


  //=============function for fetch  all users chat messages============
  const fetchMessage = async (chatId, username) => {
    console.log("Chat Id selected user ----", chatId, username)
    setSelectedUserChat(chatId);
    setChatUserName(username)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loggedInUser.accessToken}`,
        },
      };

      // console.log("config for fetching user chat", config)

      await axios.post(`http://148.72.244.170:3000/message/allMessages`,{chatId}, config).then(xyz => {
        console.log("chat msg res", xyz.data)

       
        setUserChat(xyz.data.message)
      }).catch(err => {
        console.log("chat msg err", err)
      })

    }
    catch (error) {
      console.log("error while fetching user chat ", error)
    }


  }

  useEffect(() => {
    fetchMessage();
  }, [])


  //=============function for  send messages============

  const sendMessage = async () => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loggedInUser.accessToken}`,
        },
      };

      console.log("selectedUserChat",selectedUserChat)
      // console.log("newMessage",newMessage)

      const data = await axios.post("http://148.72.244.170:3000/message/sendMessage", {
        content: newMessage,
        chatId: selectedUserChat
      }, config)

      console.log("send Message data:", data.data.message);
  
     
      setUserChat(data.data.message)
      console.log("messageeeeeeeeeeee:", data.data.message);
      // setUserChat(data.data.message)

      // axios.post(`http://148.72.244.170:3000/message/allMessages`,{selectedUserChat}, config).then(xyz => {
      //   console.log("resssssssss", xyz)
      //   setUserChat(xyz.data.message)
      // }).catch(err => {
      //   console.log("err", err)
      // })
    }
    catch (error) {
      console.log("errror", error)
    }
    setNewMessage("")
    setShowPicker(false);
  }
  const enterText = (event) => {
    if (event.key === 'Enter' || event.charCode === 13) {
      sendMessage()
      setShowPicker(false);
    }
  }

//=============function for emoji icons============
  const onEmojiClick = (event, emojiObject) => {
    setNewMessage(prevInput => prevInput + emojiObject.emoji);
    
  };

  return (
    <div>
      <UserHeader />
      <div className="chat_box">
        <Container fluid>
          <Row>
            <Col lg={3} md={3} className="left_chat_box px-0">
              <div className="search_text">
                <p className='text-center' id="searchUser" onClick={handleShow}>Search New Users Here <BsArrowLeft /></p>

                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Row>
                      <Col lg={12} md={12}>
                        <h6 className='title_head'>Search users for create chat</h6>
                      </Col>
                      <Col lg={12} md={12}>
                        <InputGroup className="p-3 searchDiv">
                          <Form.Control type="text" placeholder="Search..." className='search_bar validate' value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={onKeyUp} />
                          <Button variant="primary" size="md" active onClick={handleSearch}>
                            <FaSearch />
                          </Button>
                        </InputGroup><br></br>
                        {userError && <h5 className='error text-center'>User not found</h5>}
                      </Col>


                      <Col lg={12} md={12}>
                        {/* ========search data function========= */}
                        {loading ?
                          <div className='loader' style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                            <FaSpinner icon="spinner" className="spinner" />
                          </div>
                          :
                        
                            <div className="user_list p-2 "><div> </div>
                              {searchData && searchData.map((e, i) => {
                                return (
                                  <ListGroup variant="" key={i}>
                                    <ListGroup.Item >
                                      <div className="users" onClick={() => createChat(e._id)}>
                                        <div className="user_img">
                                          <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" width="45px" /><span>{e.first_name} {e.last_name}</span>
                                        </div>

                                      </div>
                                    </ListGroup.Item>
                                  </ListGroup>
                                )
                              })}
                            </div>
                            }
                        </
                        Col>
                    </Row>

                  </Offcanvas.Body>
                </Offcanvas>
              </div>


              {/* ========selected user data function========= */}


              {
                loading ? <div className='loader'>
                  <FaSpinner icon="spinner" className="spinner" />
                </div> :
                  <div className="user_list px-2">

                    {chats ?
                      <div>
                       
                      {
                       
                      chats.map((chatData, index) => {
                        return (
                          <div>
                            <ListGroup variant="" onClick={() => fetchMessage(chatData._id, chatData.reciver_name)} key={index}>
                              <div className='active_user_icon' style={{ display: "none" }}></div>
                              <div className="user_img">
                                {/* <Avatar name={e.first_name+" "+e.last_name} maxInitials={2}/> */}
                                <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" width="45px" />
                                <span className='name_font'>{chatData.reciver_name}</span>
                              </div>
                            </ListGroup>
                          </div>
                          // <ListGroup variant="" onClick={() => fetchMessage(chatData._id, chatData.users)} key={index}>
                            // <ListGroup.Item>
                            //   <div>{chatData.users.map((e, i) => {
                            //     if (loggedInUser.data._id !== e._id) {
                            //       return (
                            //         <div className="users" key={i}>
                            //           <div className='active_user_icon' style={{ display: "none" }}></div>
                                      // <div className="user_img">
                                      //   {/* <Avatar name={e.first_name+" "+e.last_name} maxInitials={2}/> */}
                                      //   <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" width="45px" />
                                      //   <span className='name_font'>{e.first_name} {e.last_name}</span>
                                      // </div>
                            //         </div>
                            //       )
                            //     }
                            //   })}</div>
                            // </ListGroup.Item>
                          // </ListGroup>
                        )
                      })
                    }
                      </div>
                      :
                      <div className='row'>
                        <div className='col-md-12'>
                          <h4 className='no-user'>Start Chat on Secure Chat</h4>
                        </div>
                      </div>
                    }

                  </div>
              }
            </Col>

            <Col lg={9} md={9} className="right_chat_box px-0">
              {/* ========show chat data function========= */}
              <div>
                {
                  selectedUserChat ?
                    <div className="chat_user_name">
                      <div className="active_user_img p-2">
                        <div className="user_img">
                          <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" width="45px" />
                        </div>
                      </div>
                      <div className="active_user">
                        <p className='chatwith'>Chat with</p>
                        <p className='username'>{chatUserName}</p>
                      </div>
                    </div>
                    :
                    <div className="chat_user_name" style={{ display: "none" }}></div>
                }


                <div className="chat_room">
                  {selectedUserChat ?
                    <div className="chatMsg">
                    { userChat ? 
                        userChat.map((e) => {
                            // console.log("e",e)

                            if(loggedInUser._id === e.sender_id){
                              return ( 
                                <div className="message">
                                  <div className="odd-blurb">
                                    <p>{e.content}</p>
                                  </div>
                                </div>
                              )
                            }if(loggedInUser.role === 3 && e.sender_id === e.users[1]){
                              return ( 
                                <div className="message">
                                  <div className="odd-blurb">
                                    <p>{e.content}</p>
                                  </div>
                                </div>
                              )
                            }
                            else{
                              return (
                                <div className="message">
                                  <div className="blurb">
                                    <p>{e.content}</p>
                                  </div>
                                </div>
                              )
                            }
                        })
                       : 
                      <div>
                      <p>waiting.............</p>
                      </div>
                      }
                    </div>
                    :
                    <div className='row'>
                      <div className='col-lg-12'>
                        <div className='chatting_title'> Click on a user to start chatting</div>
                      </div>
                    </div>
                  }

                </div>

                <div className="chat-bar" id="chat_bar">
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={12} >
                      <div className="msg_ins d-flex">
                        <Form.Control className='' type="text" placeholder="Write new message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={enterText} />
                        <div className="send_msg d-flex">
                          <span className='grin-icon'>

                            <FiSmile onClick={() => setShowPicker(val => !val)} />
                          </span>
                          <Button onClick={sendMessage}><span><FaPaperPlane /></span></Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <UserFooter /> */}
    </div>
  )
}

export default Chat
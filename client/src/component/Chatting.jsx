import React, { useEffect, useState } from 'react';
import axios from "axios";
import socketio from "socket.io-client";

const socket = socketio.connect("http://localhost:8080");


export const Chatting = () => {
  const [talk, setTalk] = useState(false)
  const [roomList, setRoomList] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [chatting, setChatting] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [roomHeader, setRoomHeader] = useState('');



  useEffect(() => {
    socket.on('chatroom', (obj) => {
      console.log(obj);
      setRoomList([...roomList, obj]);
    });
    console.log(roomList);
    socket.emit('roomName', roomCode)
    socket.on('msg', (obj) => {
      setMessageList([...messageList, obj]);
    });

  })



  useEffect(() => {
    List()
  }, [])

  const List = async () => {
    await axios.post('/api/chatting/RoomList', {
      id: window.sessionStorage.getItem('id')
    }).then((res) => {
      try {
        setChatList(res.data.result[0])
      } catch (err) {
        console.log(err);
      }
    }).catch((err) => {
      console.log(err);
    })
  }




  const onRoomClick = (k) => {
    setChatting(true);
    setRoomCode(k.c_idx)
    setRoomHeader(k.roomname)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    socket.emit('msg', {
      name: window.sessionStorage.getItem('id'),
      roomName: roomCode,
      message: message
    });
    setMessage('');
  }

  const handleChatting = () => {
    setChatting(false)
    setRoomCode('')
    socket.emit('leave', roomCode);
    setMessageList([]);
  }


  return (
    <div className="chatting">
      {
        talk ?
          <div className="chat_room">
            <div className="chat_header">
              <p>상담하기</p>
              <button className="room_btn" onClick={() => setTalk(!talk)}>X</button>

            </div>

            <div className="list_wrap">

              {chatting === true ?
                < ChattingRoom
                  setChatting={handleChatting}
                  roomCode={roomCode}
                  onSubmit={onSubmit}
                  message={message}
                  onChange={e => setMessage(e.target.value)}
                  messageList={messageList}
                  roomHeader={roomHeader}
                />
                :
                <>
                  {chatList ? chatList.map(k => {
                    return (
                      <div className="chat_list" onClick={() => onRoomClick(k)}>
                        <img src="" alt="" />
                        <p>{k.roomname}</p>
                      </div>
                    )
                  }) : '안나와'
                  }
                  {roomList ? roomList.map(k => {
                    return (
                      <>
                        {k.username || k.manager_id === window.sessionStorage.getItem('id') ?
                          <div className="chat_list" onClick={() => onRoomClick(k)}>
                            <img src="" alt="" />
                            <p>{k.roomname}</p>
                          </div>
                          : ''}
                      </>
                    )
                  }) : '안나와'
                  }
                </>
              }



            </div>
          </div>
          :
          <button className="chat_btn" onClick={() => setTalk(!talk)}>
            상담하기
          </button>
      }
    </div>
  )
}


export const ChattingRoom = (props) => {
  const [chattingList, setChattingList] = useState([]);

  useEffect(() => {
    CList()
  }, [])

  const CList = async () => {
    await axios.post("/api/chatting/ChattingList", {
      roomCode: props.roomCode
    }).then((res) => {
      try {
        setChattingList(res.data.result)
      } catch (err) {
        console.log(err);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="room_wrap">
      <div className="back" >
        <h2>{props.roomHeader}</h2>
        <button onClick={props.setChatting}>Back</button>
      </div>
      <div className="in_room">


        <div className="socket_send">
          {props.messageList ? props.messageList.map(k => {
            return (
              <div style={k.name === window.sessionStorage.getItem('id') ? { "textAlign": "right" } : { "textAlign": "left" }}>
                <div>
                  <p>
                    아이디 : {k.name}<br />
                    내용 : {k.message}<br />
                  </p>
                </div>
              </div>
            )
          }) : '안나와'
          }
        </div>
        <div className="send">
          {
            chattingList ? chattingList.map(k => {
              return (
                <div style={k.user_id === window.sessionStorage.getItem('id') ? { "textAlign": "right" } : { "textAlign": "left" }}>
                  <div>
                    <p>
                      아이디 : {k.user_id}<br />
                      내용 : {k.chatting}<br />
                    </p>
                  </div>
                </div>
              )
            }) : '안나와'
          }

        </div>

      </div>
      <form onSubmit={props.onSubmit}>
        <input
          type="text"
          name="message"
          value={props.message}
          onChange={props.onChange}
          required
        />
        <button type="submit">전송</button>
      </form>
    </div>
  )
}
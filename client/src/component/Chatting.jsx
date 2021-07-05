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

  useEffect(() => {
    socket.on('chatroom', (obj) => {
      console.log(obj);
      setRoomList([...roomList, obj]);
    });
    console.log(roomList);
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
    alert('방이동')
    setChatting(true);
    setRoomCode(k.c_idx)
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
                <ChattingRoom
                  setChatting={() => setChatting(false)}
                  roomCode={roomCode}
                />
                : <>
                  {chatList ? chatList.map(k => {
                    return (
                      <div className="chat_list" onClick={() => onRoomClick(k)}>
                        <img src="" alt="" />
                        <p>{k.roomname}</p>
                      </div>
                    )
                  }) : '안나와'
                  }
                </>
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
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.emit('roomName', props.roomCode)
    socket.on('msg', (obj) => {
      setMessageList([...messageList, obj]);
    });
  })


  const onSubmit = (e) => {
    e.preventDefault();

    socket.emit('msg', {
      name: window.sessionStorage.getItem('id'),
      roomName: props.roomCode,
      message: message
    });
    setMessage('');
  }



  return (
    <>
      <input
        type="text"
        name="message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit" value="submit" onClick={onSubmit}>버튼이요</button>
      <button onClick={props.setChatting}>뒤로가기</button>
      {messageList ? messageList.map(k => {
        return (
          <div className="send">
            <h2>{k.roomName}</h2>
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
    </>
  )
}
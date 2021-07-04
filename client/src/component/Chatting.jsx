import React, { useEffect, useState } from 'react';
import axios from "axios";
import socketio from "socket.io-client";

const socket = socketio.connect("http://localhost:8080");


export const Chatting = () => {
  const [talk, setTalk] = useState(false)
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    socket.on('chatroom', (obj) => {
      console.log(obj);
      setRoomList([...roomList, obj]);
    });
    console.log(roomList);
  })

  const onRoomClick = () => {
    alert('방이동')
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

              {roomList ? roomList.map(k => {
                return (
                  <div className="chat_list" onClick={onRoomClick}>
                    <img src="" alt="" />
                    <p>{k.roomname}</p>
                  </div>
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

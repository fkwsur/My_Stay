import React, { useEffect, useState } from 'react';
import axios from "axios";

export const Chatting = () => {
  const [talk, setTalk] = useState(false)

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
            <div className="list_wrap" onClick={onRoomClick}>
              <div className="chat_list">
                <img src="" alt="" />
                <p>이름</p>
              </div>
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

export const InRoom = () => {
  return (
    <>
      <p>채팅할거에요~</p>
    </>
  )
}
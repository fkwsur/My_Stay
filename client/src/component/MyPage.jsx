import React, { useEffect, useState } from 'react';
import axios from "axios";
import socketio from "socket.io-client";

const socket = socketio.connect("http://localhost:8080");


export const MyPage = () => {
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    List()
  }, [])

  const List = async () => {
    await axios
      .post("/api/reservation/UserReservationList", {
        token: window.sessionStorage.getItem('x_auth'),
      })
      .then((res) => {
        console.log(res);
        if (res.data.result) {
          console.log(res.data.result);
          setRoomList(res.data.result);
        }
        else {
          console.log("에러발생");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onClick = async (k) => {
    console.log(k);
    console.log(k.manager_id);
    console.log(k.stay_manager);
    console.log(k.stay_name);
    alert('여기다가 넣어서보낼거임')

    //socket.emit('msg', {
    //  roomname: name,
    //  name: '현지',
    //  name2: '현지',
    //});

    //await axios
    //.post("/api/reservation/UserReservationList", {
    //  token: window.sessionStorage.getItem('x_auth'),
    //})
    //.then((res) => {
    //  console.log(res);
    //  if (res.data.result) {
    //    console.log(res.data.result);
    //    setRoomList(res.data.result);
    //  }
    //  else {
    //    console.log("에러발생");
    //  }
    //})
    //.catch((err) => {
    //  console.log(err);
    //});
  }

  return (
    <>
      <div className="mypage">
        <h2>마이페이지</h2>
        {window.sessionStorage.getItem('id') ?
          <p>{window.sessionStorage.getItem('id')}님 환영합니다.</p>
          : ''}
      </div>
      <h3>예약내역</h3>
      {window.sessionStorage.getItem('id') ?
        <>
          {
            roomList.map(k => {
              return (
                <div className="menu">
                  <img src={k.stay_image} alt="숙소이미지" />
                  <div className="content">
                    <div style={{ "display": "flex" }}>
                      <h3>{k.stay_name}</h3>
                      <button
                        style={{ "marginLeft": "10px" }}
                        className="room_btn"
                        onClick={() => onClick(k)}
                      >상담</button>
                    </div>
                    <p>{k.room_name} / Address.{k.address}</p>
                    <p>{k.content}</p>
                    <p>결제금액 {k.room_price}원 / 예약날짜{k.reserved_day}</p>
                  </div>
                </div>
              )
            })
          }
        </>
        : '로그인 후 이용가능합니다.'}
    </>
  )
}

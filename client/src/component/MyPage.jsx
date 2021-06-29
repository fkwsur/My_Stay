import React, { useEffect, useState } from 'react';
import axios from "axios";

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
                    <h2>{k.stay_name}</h2>
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

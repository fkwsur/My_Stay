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
      마이페이지
      예약내역
      {window.sessionStorage.getItem('id') ?
        <>
          {
            roomList.map(k => {
              return (
                <>
                  <hr />
                  <p>숙소이름{k.stay_name}</p>
                  <img src={k.stay_image} alt="숙소이미지" />
                  <p>숙소번호{k.stay_number}</p>
                  <p>주소{k.address}</p>
                  <p>방이름{k.room_name}</p>
                  <p>방설명{k.content}</p>
                  <p>결제금액{k.room_price}</p>
                  <p>예약날짜{k.reserved_day}</p>

                </>
              )
            })
          }
        </>
        : '로그인 후 이용가능합니다.'}
    </>
  )
}

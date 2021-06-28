import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export const Reserve = () => {
  const [room, setRoom] = useState([])

  useEffect(() => {
    List()
  }, [])

  const List = async () => {
    const url = window.location.pathname;
    const r_idx = url.split('/')[2];
    console.log(r_idx);
    await axios
      .post("/api/rooms/FindRoom", {
        r_idx: r_idx
      })
      .then((res) => {
        console.log(res);
        if (res.data.result) {
          console.log(res.data.result);
          setRoom(res.data.result);
        }
        else {
          alert("에러발생");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      예약페이지
      <p>예약자명 :{window.sessionStorage.getItem("id")}</p>
      <p>예약숙소 :{room.room_name}</p>
      <p>방이름 :{room.room_name}</p>
      <p>예약일 :<input type="date" /></p>
      <p>가격 :{room.room_price}</p>
    </>
  )
}

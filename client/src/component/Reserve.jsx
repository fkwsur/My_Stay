import React, { useEffect, useState } from 'react';
import axios from "axios";

export const Reserve = () => {
  const [room, setRoom] = useState([])
  const [date, setDate] = useState("")

  useEffect(() => {
    List()
  }, [])

  const onChange = (e) => {
    setDate(e.target.value);
  }

  const List = async () => {
    const url = window.location.pathname;
    const r_idx = url.split('/')[3];
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const url = window.location.pathname;
    const r_idx = url.split('/')[3];
    console.log(r_idx);
    await axios
      .post("/api/reservation/reserveRoom", {
        token: window.sessionStorage.getItem('x_auth'),
        r_idx: r_idx,
        reserved_day: date
      })
      .then((res) => {
        console.log(res);
        if (res.data.result) {
          alert(res.data.result);
          window.location.href = "/main";
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const formatDate = () => {
    let today = new Date();

    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  }


  return (
    <form onSubmit={onSubmit}>
      예약페이지
      <p>예약자아이디 :{window.sessionStorage.getItem("id")}</p>
      <p>예약자명 :{window.sessionStorage.getItem("username")}</p>
      <p>예약숙소 :{room.room_name}</p>
      <p>방이름 :{room.room_name}</p>
      <p>예약일 :<input type="date" min={formatDate()} onChange={onChange} value={date} required /></p>
      <p>가격 :{room.room_price}</p>
      <button type="submit">예약하기</button>
    </form>
  )
}

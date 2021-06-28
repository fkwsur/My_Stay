import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export const Header = () => {

  const remove = () => {
    window.sessionStorage.removeItem('id');
    window.sessionStorage.removeItem('x_auth');
    window.sessionStorage.removeItem('owner');
    window.sessionStorage.removeItem('username');
    window.location.reload();
  }

  return (
    <>
      <li>
        <Link to="/main">메인화면</Link>
      </li>
      <li>
        {window.sessionStorage.getItem('id') ?
          <button type="button" onClick={remove}>Logout</button>
          :
          <Link to="/auth">로그인페이지</Link>
        }
      </li>
      <li>
        <Link to="/admin">관리자페이지</Link>
      </li>
      <li>
        <Link to="/MyPage">마이페이지</Link>
      </li>
      {window.sessionStorage.getItem('id') ?
        <p>{window.sessionStorage.getItem('id')}님 환영합니다.</p>
        :
        ''
      }
    </>
  )
}

export const Main = () => {
  const [stayList, setStayList] = useState([])

  useEffect(() => {
    List()
  }, [])

  const List = async (e) => {
    const url = window.location.pathname;
    const s_idx = url.split('/')[3];
    console.log(s_idx);
    await axios
      .get("/api/stayinfo/AllStayList")
      .then((res) => {
        console.log(res);
        if (res.data.result) {
          console.log(res.data.result);
          setStayList(res.data.result);
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
      메인화면
      {stayList.map(k => {
        return (
          <>
            <p>{k.s_idx}</p>
            <p>이름: {k.stay_manager}</p>
            <p>숙박이름: {k.stay_name}</p>
            <img src={k.stay_image} alt="대표이미지" />
            <p>위치: {k.address}</p>
            <p>설명: {k.content}</p>
            <button type="button"><Link to={`/main/${k.s_idx}`}>자세히보기</Link></button>
            <hr />
          </>
        )
      })}

    </>
  )
}

export const DetailRoom = () => {
  const [roomList, setRoomList] = useState([])

  useEffect(() => {
    List()
  }, [])

  const List = async () => {
    const url = window.location.pathname;
    const s_idx = url.split('/')[2];
    console.log(s_idx);
    await axios
      .post("/api/rooms/AllRoomList", {
        s_idx: s_idx
      })
      .then((res) => {
        console.log(res);
        if (res.data.result.length === 0) {
          alert("방이 없습니다.");
          window.location.href = "/main";
        }
        else if (res.data.result) {
          console.log(res.data.result);
          setRoomList(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onClick = () => {
    alert('로그인 후 이용가능합니다.')
    window.location.href = "/auth";
  }

  return (
    <>
      {roomList ? roomList.map(k => {
        return (
          <>
            <p>{k.r_idx}</p>
            <p>이름: {k.stay_code}</p>
            <p>설명: {k.stay_content}</p>
            <img src={k.room_image} alt="대표이미지" />
            <p>가격 {k.room_price}</p>
            <p>잔여방 개수 {k.room_count}</p>

            {window.sessionStorage.getItem('id') ?
              <button type="button" >
                <Link to={`/main/reserve/${k.r_idx}`}>예약하기</Link>
              </button>
              :
              <button onClick={onClick}>예약하기</button>
            }
            <hr />
          </>
        )
      }) : "방이 없습니다."}

    </>
  )
}


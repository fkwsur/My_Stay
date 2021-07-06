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
    <div className="header">
      <li>
        <Link to="/main">메인화면</Link>
      </li>
      <li>
        <Link to="/MyPage">마이페이지</Link>
      </li>
      <li>
        <Link to="/admin">관리자페이지</Link>
      </li>
      <li>
        {window.sessionStorage.getItem('id') ?
          <button type="button" onClick={remove}>Logout</button>
          :
          <Link to="/auth">로그인페이지</Link>
        }
      </li>

    </div>
  )
}

export const Main = () => {
  const [stayList, setStayList] = useState([])

  useEffect(() => {
    List()
  }, [])

  const List = async (e) => {
    try {
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
    } catch (err) {
      console.log(err); //서버자체 문제가 아니라 함수 자체가 오류일때
    };
  }

  return (
    <>
      <h2>숙박 시설</h2>
      <div className="main">
        {stayList.map(k => {
          return (
            <div className="menu">
              <img src={k.stay_image} alt="대표이미지" />
              <div className="content">
                <h3>{k.stay_name}</h3>
                <p>위치: {k.address}</p>
                <p>{k.content}</p>

                <button type="button"><Link to={`/main/${k.s_idx}`}>예약하기</Link></button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export const DetailRoom = () => {
  const [roomList, setRoomList] = useState([])
  const [stayName, setStayName] = useState("")

  useEffect(() => {
    List()
  }, [])

  const List = async () => {
    try {
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

      await axios
        .post("/api/stayinfo/FindStay", {
          s_idx: s_idx
        })
        .then((res) => {
          console.log(res);
          if (res.data.result) {
            setStayName(res.data.result.stay_name)
          }
          else {
            console.log('에러');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err); //서버자체 문제가 아니라 함수 자체가 오류일때
    };
  }

  const onClick = () => {
    alert('로그인 후 이용가능합니다.')
    window.location.href = "/auth";
  }



  return (
    <div className="main">
      <h2>{stayName}</h2>
      {roomList ? roomList.map(k => {
        return (
          <div className="menu">
            <img src={k.room_image} alt="대표이미지" />
            <div className="content">
              <h2>{k.room_name}</h2>
              <p>{k.content}</p>
              <p>{k.room_price}원 / 잔여 객실 {k.room_count}</p>
              {window.sessionStorage.getItem('id') ?
                <button type="button" >
                  <Link to={`/main/reserve/${k.r_idx}`}>예약하기</Link>
                </button>
                :
                <button onClick={onClick}>예약하기</button>
              }

            </div>
          </div>
        )
      }) : "방이 없습니다."}
    </div>
  )
}


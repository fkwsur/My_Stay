import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Room = () => {
  const [roomList, setRoomList] = useState([]);
  const [createRoom, setCreateRoom] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomPrice, setRoomPrice] = useState('');
  const [roomCount, setRoomCount] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    List()
  }, [])

  const List = async (e) => {
    const url = window.location.pathname;
    const s_idx = url.split('/')[2];
    console.log(s_idx);
    await axios
      .post("/api/rooms/RoomList", {
        token: window.sessionStorage.getItem('x_auth'),
        s_idx: s_idx
      })
      .then((res) => {
        console.log(res);
        if (res.data.result) {
          console.log(res.data.result);
          setRoomList(res.data.result);
        }
        else {
          alert("에러발생");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "roomName") setRoomName(value);
    if (name === "roomPrice") setRoomPrice(value);
    if (name === "roomCount") setRoomCount(value);
    if (name === "content") setContent(value);
  }

  const fileChange = (e) => {
    const {
      target: { name, files },
    } = e;
    if (name === "image") {
      setImage(files[0]);
    }
  };

  const roomSubmit = async (e) => {
    e.preventDefault();
    const url = window.location.pathname;
    const s_idx = url.split('/')[2];
    console.log(s_idx);
    const formData = new FormData();
    formData.append("s_idx", s_idx);
    formData.append("token", window.sessionStorage.getItem('x_auth'));
    formData.append("room_name", roomName);
    formData.append("room_price", roomPrice);
    formData.append("image", image);
    formData.append("room_count", roomCount);
    formData.append("content", content);
    console.log(formData);
    await axios
      .post("/api/rooms/CreateRoom", formData)
      .then((res) => {
        console.log(res);
        if (res.data.result !== true) {
          alert('잘못된 정보를 입력했습니다.');
          return false;
        }
        if (res.data.result === true) {
          alert("숙박이 생성되었습니다.");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      방 추가하기
      <button type="button" onClick={() => setCreateRoom(true)}>숙소생성하기</button><br />
      {createRoom === true ?
        <form onSubmit={roomSubmit}>
          <input type="text" name="roomName" value={roomName} onChange={onChange} required />방이름<br />
          <textarea type="text" name="content" value={content} onChange={onChange} required />설명<br />
          <input type="text" name="roomPrice" value={roomPrice} onChange={onChange} required />가격<br />
          <input type="file" name="image" file={image} onChange={fileChange} />대표이미지<br />
          <input type="text" name="roomCount" value={roomCount} onChange={onChange} required />방개수설정<br />
          <button type="submit">생성완료</button>
        </form>
        : ''}

      룸 관리페이지
      {roomList.map(k => {
        return (
          <>
            <p>{k.r_idx}</p>
            <p>{k.room_name}</p>방이름
            <p>{k.content}</p>설명
            <p>{k.room_price}</p>가격
            <img src={k.room_image} alt="대표이미지" />
            <p>{k.room_count}</p>잔여 방 개수
            <button type="button"><Link to={`/admin/checkIn/${k.r_idx}`}>체크인/체크아웃</Link></button>
            <hr />
          </>
        )
      })}
    </>
  )
}

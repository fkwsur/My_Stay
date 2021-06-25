import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export const Admin = () => {
  const [createStay, setCreateStay] = useState(false);
  const [stayName, setStayName] = useState("");
  const [stayNumber, setStayNumber] = useState('');
  const [address, setAddress] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [stayList, setStayList] = useState([]);

  const List = async (e) => {
    await axios
      .post("/api/stayinfo/StayList", {
        token: window.sessionStorage.getItem('x_auth'),
      })
      .then((res) => {
        console.log(res);
        if (res.data.result) {
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

  useEffect(() => {
    List()
  }, [])


  const onChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    if (name === "stayName") setStayName(value);
    if (name === "stayNumber") setStayNumber(value);
    if (name === "address") setAddress(value);
    if (name === "content") setContent(value);
  }

  const FileChange = (e) => {
    const {
      target: { name, files },
    } = e;
    if (name === "image") {
      setImage(files[0]);
    }
  };

  const staySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("token", window.sessionStorage.getItem('x_auth'));
    formData.append("stay_name", stayName);
    formData.append("stay_number", stayNumber);
    formData.append("image", image);
    formData.append("address", address);
    formData.append("content", content);
    console.log(formData);
    await axios
      .post("/api/stayinfo/CreateStay", formData)
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
      숙박관리페이지
      <button type="button" onClick={() => setCreateStay(true)}>숙소생성하기</button><br />
      {createStay === true ?
        <form onSubmit={staySubmit}>
          <input type="text" name="stayName" value={stayName} onChange={onChange} required />이름<br />
          <input type="text" name="stayNumber" value={stayNumber} onChange={onChange} required />번호<br />
          <input type="text" name="address" value={address} onChange={onChange} required />주소<br />
          <textarea type="text" name="content" value={content} onChange={onChange} required />설명<br />
          <input type="file" name="image" file={image} onChange={FileChange} />대표이미지<br />
          <button type="submit">생성완료</button>
        </form>
        : ''}
      숙소리스트
      {stayList.map(k => {
        return (
          <>
            <p>{k.s_idx}</p>
            <p>{k.manager_id}</p>
            <p>{k.stay_manager}</p>
            <p>{k.stay_name}</p>
            <p>{k.stay_number}</p>
            <img src={k.stay_image} alt="대표이미지" />
            <p>{k.address}</p>
            <p>{k.content}</p>
            <button type="button"><Link to={`/admin/${k.s_idx}`}>룸 관리하기</Link></button>
          </>
        )
      })}
    </>

  )
}
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
    <div className="main">
      {window.sessionStorage.getItem('owner') === 'yes' ?
        <>
          <h2>숙박관리페이지</h2>
          <button type="button" onClick={() => setCreateStay(true)}>숙소생성하기</button><br />
          {createStay === true ?
            <form onSubmit={staySubmit}>
              이름.<input type="text" name="stayName" value={stayName} onChange={onChange} required /><br />
              번호.<input type="text" name="stayNumber" value={stayNumber} onChange={onChange} required /><br />
              주소.<input type="text" name="address" value={address} onChange={onChange} required /><br />
              설명.<textarea type="text" name="content" value={content} onChange={onChange} required /><br />
              대표이미지.<input type="file" name="image" file={image} onChange={FileChange} /><br />
              <button type="submit">생성완료</button>
            </form>
            : ''}
          {stayList.map(k => {
            return (
              <div className="menu">
                <img src={k.stay_image} alt="대표이미지" />
                <div className="content">
                  <h2>{k.stay_name}</h2>
                  <p>{k.content}</p>
                  <p>{k.address} / Tell. {k.stay_number}</p>
                  <button type="button">
                    <Link to={`/admin/${k.s_idx}`}>룸 관리하기</Link>
                  </button>
                </div>
              </div>
            )
          })}
        </>
        : '관리자권한이 없습니다.'
      }
    </div>

  )
}
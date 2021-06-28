import React, { useState } from 'react';
import axios from "axios";

export const Auth = () => {
  const [login, isLogin] = useState(true);
  const [id, setId] = useState("");
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [owner, setOwner] = useState('');

  const onChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    if (name === "id") setId(value);
    if (name === "password") setPassword(value);
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "phoneNumber") setPhoneNumber(value);
    if (name === "owner") setOwner(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/user/signup", {
        user_id: id,
        nickname: username,
        password: password,
        email: email,
        phone_number: phoneNumber,
        owner: owner
      })
      .then((res) => {
        console.log(res);
        if (res.data.result !== true) {
          alert('잘못된 정보를 입력했습니다.');
          return false;
        }
        if (res.data.result === true) {
          alert("가입이 성공하였습니다.");
          isLogin(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/user/signin", {
        user_id: id,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.result) {
          alert(res.data.result);
          return false;
        }
        alert('로그인에 성공하였습니다.');
        window.sessionStorage.setItem("id", id);
        window.sessionStorage.setItem("username", res.data.rows.username);
        window.sessionStorage.setItem("owner", res.data.rows.owner);
        window.sessionStorage.setItem("x_auth", res.data.token);
        window.location.href = "/main";
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <>
      {login === false ?
        <form onSubmit={onSubmit}>
          회원가입 <br />
          <input name="id" value={id} onChange={onChange} required />아이디 <br />
          <input name="password" value={password} onChange={onChange} required />비밀번호<br />
          <input name="username" value={username} onChange={onChange} required />성함<br />
          <input name="email" value={email} onChange={onChange} required />메일<br />
          <input name="phoneNumber" value={phoneNumber} onChange={onChange} required />휴대폰번호<br />
          <input
            type="radio"
            name="owner"
            value="yes"
            className="input"
            onChange={onChange}
            required
          />
          yes
          <input
            type="radio"
            name="owner"
            value="no"
            className="input"
            onChange={onChange}
            required
          />
          no
          <button type="submit">가입하기</button>
          <button type="button" onClick={() => isLogin(true)}>로그인하기</button>
        </form>
        :
        <form onSubmit={onLogin}>
          로그인 <br />
          <input name="id" value={id} onChange={onChange} required />아이디 <br />
          <input name="password" value={password} onChange={onChange} required />비밀번호<br />
          <button type="submit" onClick={() => isLogin(true)}>로그인하기</button>
          <button type="button" onClick={() => isLogin(false)}>회원가입하기</button>
        </form>
      }
    </>
  )
}
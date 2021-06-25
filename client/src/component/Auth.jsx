import React, { useState } from 'react';

export const Auth = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "id") setId(value);
    if (name === "password") setPassword(value);
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "phoneNumber") setPhoneNumber(value);
    if (name === "owner") setPhoneNumber(value);
  }

  const onSubmit = async (e) => {
    console.log('전송');
    //   await axios
    //     .post("", {
    //     })
    //     .then((res) => {
    //     })
    //     .catch((err) => {
    //     });
    // }

    return (
      <form onSubmit={onSubmit}>
        로그인 / 회원가입 <br />
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
      </form>
    )
  }
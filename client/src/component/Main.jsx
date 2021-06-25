import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <>
      <Link to="/">메인화면</Link>
      <Link to="/auth">로그인페이지</Link>
      <Link to="/admin">관리자페이지</Link>
      <p>{window.sessionStorage.getItem('id')}님 환영합니다.</p>
    </>
  )
}

export const Main = () => {
  return (
    <>
      메인화면

    </>
  )
}
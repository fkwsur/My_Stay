import React, { useEffect, useState } from 'react';
import axios from "axios";

export const CheckIn = (e) => {
  const [check, setCheck] = useState([]);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");


  useEffect(() => {
    List()
  }, [])

  const List = async (e) => {
    try {
      const url = window.location.pathname;
      const r_idx = url.split('/')[3];
      console.log(r_idx);
      await axios
        .post("/api/reservation/ReservationList", {
          token: window.sessionStorage.getItem('x_auth'),
          r_idx: r_idx
        })
        .then((res) => {
          console.log(res);
          if (res.data.result) {
            console.log(res.data.result);
            setCheck(res.data.result);
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

  const onChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    if (name === "checkin") setCheckin(value);
    if (name === "checkout") setCheckout(value);
  }

  const onCheckIn = async (idx) => {
    try {
      await axios
        .post("/api/reservation/CheckIn", {
          token: window.sessionStorage.getItem('x_auth'),
          idx: idx,
          CheckInTime: checkin
        })
        .then((res) => {
          console.log(res);
          if (res.data.result) {
            console.log(res.data.result);
            alert("체크인 완료");
            window.location.reload();
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

  const onCheckOut = async (idx) => {
    try {
      const url = window.location.pathname;
      const r_idx = url.split('/')[3];
      console.log(r_idx);
      await axios
        .post("/api/reservation/checkOut", {
          token: window.sessionStorage.getItem('x_auth'),
          r_idx: r_idx,
          idx: idx,
          CheckOutTime: checkout
        })
        .then((res) => {
          console.log(res);
          if (res.data.result) {
            console.log(res.data.result);
            alert(res.data.result);
            window.location.reload();
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
    <div className="main">
      <h2>체크인 / 체크아웃 관리</h2>
      {check.map(k => {
        return (
          <div className="menu_check">
            <ListFormat
              idx={k.idx}
              user_id={k.user_id}
              reserved={k.reserved}
              reserved_day={k.reserved_day}
              RemainingRooms={k.RemainingRooms}

              onChange={onChange}
              checkin={checkin}
              checkout={checkout}

              onCheckIn={onCheckIn}
              onCheckOut={onCheckOut}

              checkinres={k.checkin}
              checkoutres={k.checkout}
            />
          </div>
        )
      })}
    </div>
  )
}

export const ListFormat = (props) => {
  return (
    <>
      <p>{props.idx}.</p>
      <p>예약자아이디: {props.user_id}</p>
      <p>예약여부: {props.reserved}</p>
      <p>예약일: {props.reserved_day}</p>
      <p>남은방개수: {props.RemainingRooms}</p>

      <p>체크인여부: &nbsp;&nbsp;&nbsp;
        <CheckInput
          name="checkin"
          onChange={props.onChange}
          value={props.checkin}
          required
        />
        <button type="button" onClick={() => props.onCheckIn(props.idx)}>입력</button>
        {props.checkinres}
      </p>
      <p>체크아웃여부:
        <CheckInput
          name="checkout"
          onChange={props.onChange}
          value={props.checkout}
          required
        />
        <button type="button" onClick={() => props.onCheckOut(props.idx)}>입력</button>
        {props.checkoutres}
      </p>
    </>
  )
}

export const CheckInput = (props) => {
  return (
    <input
      type="time"
      name={props.name}
      onChange={props.onChange}
      value={props.checkin}
      required
    />
  )
}
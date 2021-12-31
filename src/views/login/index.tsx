// main
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Md5 } from "ts-md5/dist/md5";
import "./index.scss";
import { Toast, Grid } from "antd-mobile";
import logo from "assets/images/logo.svg";
import UserContext from "context/UserContext";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;
interface User {
  id: string;
  username: string;
  nickname: string;
  password: string;
  token: string;
}

export default function Login() {
  let navigate = useNavigate();
  // 账号 昵称 密码
  const [user, setUser] = useState({
    username: "",
    nickname: "",
    password: "",
  });

  // @ts-ignore
  const { userInfo, setUserInfo } = useContext(UserContext);

  // true 登录 false 注册
  const [loginState, setLoginState] = useState(true);

  // 是否记录密码
  const [checked, setChecked] = React.useState(true);

  // 提交
  const submitHandle = (e: any) => {
    e.preventDefault();
    console.log(loginState, "登录状态");
    if (loginState) {
      // 登录
      let md5 = Md5.hashStr(user.password);
      let data = {
        username: user.username,
        password: md5,
      };
      console.log(data, "data");
      axios
        .post(`${apiUrl}/user/login`, data)
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            Toast.show({ icon: "success", content: res.msg });
            // 登录成功后跳转路由，存储登录信息
            // data: {
            //   id: "5f35461d98ac4506b8c01b4ad280d817"
            //   nickname: "123"
            //   token: "ffe1061786aa46cfaa07046f41d974f7"
            //   username: "test"
            // }
            // msg: "登录成功"
            // success: true
            // const ThemeContext = React.createContext('light');
            // setUserInfo(res.data);
            // JSON.stringify(userInfo);
            setUserInfo({ ...res.data });
            console.log(userInfo, "userInfo");
            // 页面跳转
            navigate("/person");
          } else {
            Toast.show({ icon: "fail", content: res.msg });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // 注册
      let md5 = Md5.hashStr(user.password);
      let data = {
        username: user.username,
        nickname: user.nickname,
        password: md5,
      };
      axios
        .post(`${apiUrl}/user/save`, data)
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            Toast.show({ icon: "success", content: res.msg });
            // 注册成功
          } else {
            Toast.show({ icon: "fail", content: res.msg });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const regHandle = () => {
    setLoginState(!loginState);
  };

  // 复选框绑定值
  const changeHandle = (e: any) => {
    setChecked(e.target.checked);
  };

  return (
    <Grid columns={1} gap={8}>
      <div className="logo">
        <img src={logo} alt="24G Logo"></img>
      </div>
      <form>
        <div className="form-main-box">
          {/* 用户名 */}
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              name="username"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          {/* 昵称 - 注册 */}
          {!loginState ? (
            <div className="form-group">
              <label htmlFor="nickname">昵称</label>
              <input
                type="text"
                name="nickname"
                id="nickname"
                value={user.nickname}
                onChange={(e) => setUser({ ...user, nickname: e.target.value })}
              />
            </div>
          ) : null}
          {/* 密码 */}
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          {/* 登录按钮 */}
          <div className="form-group btns-wrap">
            <button className="fullWidth" onClick={submitHandle}>
              {loginState ? "登 录" : "注 册"}
            </button>
          </div>
          {/* 记住密码 */}
          <div className="form-group">
            <div className="left">
              <input
                type="checkbox"
                name="re-password"
                id="re-password"
                checked={checked}
                onChange={(e) => changeHandle(e)}
              />
              <label htmlFor="re-password">记住密码</label>
            </div>
            <div className="right">
              {/* 登录|注册 切换 */}
              <span onClick={regHandle}>{!loginState ? "登 录" : "注 册"}</span>
            </div>
          </div>
        </div>
      </form>
    </Grid>
  );
}

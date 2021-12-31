import React from "react";
import { useEffect, useState, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./person.scss";
import "styles/form.scss";
import UserContext from "context/UserContext";

export const Person = () => {
  // @ts-ignore
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    console.log(userInfo, "userInfo 个人中心");
  });

  const updatePassword = () => {
    console.log("修改密码", userInfo.id);
  };

  const logout = () => {
    console.log("注销登录");
    setUserInfo({
      ...{
        id: "",
        username: "",
        nickname: "",
        token: "",
      },
    });
  };

  return (
    <div className="g-wrap">
      <div className="login-tool">
        {userInfo.id ? (
          <a href="javascript:;" onClick={logout}>
            <i className="fas fa-sign-out-alt"></i>注销
          </a>
        ) : (
          <Link to="/login">
            <i className="fas fa-sign-out-alt"></i>登录
          </Link>
        )}
        <div className="avatar"></div>
        <Link to="/login">
          注册<i className="fas fa-clipboard-list"></i>
        </Link>
      </div>
      <div className="user-info">
        <dl>
          <dt>用户名</dt>
          <dd>{userInfo.username}</dd>
          <dt>昵称</dt>
          <dd>{userInfo.nickname}</dd>
          <dt>编号</dt>
          <dd>{userInfo.id}</dd>
          <dt>TOKEN</dt>
          <dd>{userInfo.token}</dd>
        </dl>
        <button onClick={updatePassword}>修改密码</button>
      </div>
    </div>
  );
};

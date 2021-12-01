// main
import React, { useState, useEffect } from "react";
import axios from "axios";
// mui
import {
  Box,
  FormControl,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const apiUrl = process.env.REACT_APP_API_URL;

interface User {
  username: string;
  nickname: string;
  password: string;
}

const testUser = {
  username: "admin",
  nickname: "admin@admin.com",
  password: "123456",
};

export default function Login() {
  // 账号 昵称 密码
  const [user, setUser] = useState({
    username: "",
    nickname: "",
    password: "",
  });

  // true 登录 false 注册
  const [loginState, setLoginState] = useState(true);

  // 是否记录密码
  const [checked, setChecked] = React.useState(true);

  // 提交
  const submitHandle = () => {
    console.log(user.username, user.nickname, user.password, checked);
    if (loginState) {
      // 登录
      if (
        user.username === testUser.username &&
        user.password === testUser.password
      ) {
        // 登录成功
        alert("登录成功");
        setLoginState(true);
      } else {
        // 登录失败
        alert("用户名或密码错误");
      }
    } else {
      // 注册
      axios
        .post(`${apiUrl}/user/save`, user)
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            alert(res.msg);
          } else {
            alert(res.msg);
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
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ padding: "160px 50px 0" }}
    >
      {/* 用户名 */}
      <FormControl fullWidth sx={{ marginBottom: "20px" }}>
        <TextField
          id="username"
          label="用户名"
          variant="standard"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
        />
      </FormControl>

      {/* 昵称 - 注册 */}
      {!loginState ? (
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <TextField
            id="nickname"
            label="昵称"
            variant="standard"
            value={user.nickname}
            onChange={(e) => setUser({ ...user, nickname: e.target.value })}
            required
          />
        </FormControl>
      ) : (
        <div></div>
      )}

      {/* 密码 */}
      <FormControl fullWidth sx={{ marginBottom: "40px" }}>
        <TextField
          id="password"
          label="密码"
          variant="standard"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
      </FormControl>

      {/* 登录按钮 */}
      <FormControl fullWidth sx={{ marginBottom: "20px" }}>
        <Button variant="contained" onClick={submitHandle}>
          {loginState ? "登 录" : "注 册"}
        </Button>
      </FormControl>

      {/* 记住密码 */}
      <FormControlLabel
        checked={checked}
        onChange={(e) => changeHandle(e)}
        defaultChecked
        label="Label"
        control={<Checkbox />}
      />

      {/* 登录|注册 切换 */}
      <Button variant="outlined" sx={{ float: "right" }} onClick={regHandle}>
        {!loginState ? "登 录" : "注 册"}
      </Button>
    </Box>
  );
}

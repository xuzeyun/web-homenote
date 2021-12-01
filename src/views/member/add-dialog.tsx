// main
import React, { useState, useEffect } from "react";
import axios from "axios";
// mui
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Box,
  FormControl,
  MenuItem,
  InputLabel,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// lab
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
// icon
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import XMassage from "components/x-massage/index";
import { Row } from "antd";
const apiUrl = process.env.REACT_APP_API_URL;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props: {
  isModalVisible: boolean;
  type: number;
  closeModel: any;
  getList: any;
  curRow: any;
}) {
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgType, setMsgType] = useState("info");
  const [msgMsg, setMsgMsg] = useState("info");

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [sex, setSex] = useState("");
  const [birthday, setBirthday] = useState("");
  const [life, setLife] = useState("");
  const [zodiac, setZodiac] = useState("");
  const [constellation, setConstellation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [interest, setInterest] = useState("");
  const [contact, setContact] = useState("");
  const [intro, setIntro] = useState("");

  const dateChange = (e: any) => {
    setBirthday(e);
  };

  // 关闭弹窗
  const handleClose = () => {
    props.closeModel();
  };

  // 保存信息
  const handleSave = () => {
    let param = {
      id: props.curRow.id,
      name,
      nickname,
      sex,
      birthday,
      life,
      zodiac,
      constellation,
      occupation,
      interest,
      contact,
      intro,
    };
    console.log(param, "param");
    // 有 id 新增，无 id 修改
    axios
      .post(`${apiUrl}/member/save`, param)
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          openMassage("success", res.msg);
          handleClose();
          props.getList();
        } else {
          openMassage("error", res.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openMassage = (type: string, msg: string) => {
    setMsgOpen(true);
    setMsgType("success");
    setMsgMsg(msg);
  };
  const closeMassage = () => {
    setMsgOpen(false);
  };

  useEffect(() => {
    // 请求列表
    setName(props.curRow.name);
    setNickname(props.curRow.nickname);
    setSex(props.curRow.sex);
    setBirthday(props.curRow.birthday);
    setLife(props.curRow.life);
    setZodiac(props.curRow.zodiac);
    setConstellation(props.curRow.constellation);
    setOccupation(props.curRow.occupation);
    setInterest(props.curRow.interest);
    setContact(props.curRow.contact);
    setIntro(props.curRow.intro);
  }, [props]);

  return (
    <div>
      <Dialog
        fullScreen
        open={props.isModalVisible}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {props.type === 1
                ? "新增成员"
                : props.type === 2
                ? "修改成员"
                : props.curRow.name + "信息"}
            </Typography>
            {/* 保存按钮 */}
            <Button autoFocus color="inherit" onClick={handleSave}>
              <SaveIcon />
            </Button>
          </Toolbar>
        </AppBar>
        {/* 弹窗内容 */}
        <Box
          className="form-box"
          component="form"
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <TextField
              label="尊姓大名"
              id="name"
              helperText="必填"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <TextField
              label="别号"
              id="nickname"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <InputLabel id="sex-label">男女</InputLabel>
            <Select
              required
              labelId="sex-label"
              label="男女"
              id="sex"
              value={sex}
              onChange={(e) => {
                setSex(e.target.value);
              }}
            >
              <MenuItem value={1}>男</MenuItem>
              <MenuItem value={0}>女</MenuItem>
            </Select>
          </FormControl>

          {/* 生日 */}
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="生辰"
                views={["year", "month", "day"]}
                value={birthday}
                onChange={(e) => {
                  dateChange(e);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <InputLabel id="life-label">生死</InputLabel>
            <Select
              required
              labelId="life-label"
              label="生死"
              id="life"
              value={life}
              onChange={(e) => {
                setLife(e.target.value);
              }}
            >
              <MenuItem value={1}>生</MenuItem>
              <MenuItem value={0}>死</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <InputLabel id="zodiac-label">生肖</InputLabel>
            <Select
              labelId="zodiac-label"
              label="生肖"
              id="zodiac"
              value={zodiac}
              onChange={(e) => {
                setZodiac(e.target.value);
              }}
            >
              <MenuItem value="鼠">子（鼠）</MenuItem>
              <MenuItem value="牛">丑（牛）</MenuItem>
              <MenuItem value="虎">寅（虎）</MenuItem>
              <MenuItem value="兔">卯（兔）</MenuItem>
              <MenuItem value="龙">辰（龙）</MenuItem>
              <MenuItem value="蛇">巳（蛇）</MenuItem>
              <MenuItem value="马">午（马）</MenuItem>
              <MenuItem value="羊">未（羊）</MenuItem>
              <MenuItem value="猴">申（猴）</MenuItem>
              <MenuItem value="鸡">酉（鸡）</MenuItem>
              <MenuItem value="狗">戌（狗）</MenuItem>
              <MenuItem value="猪">亥（猪）</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <InputLabel id="constellation-label">星座</InputLabel>
            <Select
              labelId="constellation-label"
              label="星座"
              id="constellation"
              value={constellation}
              onChange={(e) => {
                setConstellation(e.target.value);
              }}
            >
              <MenuItem value="白羊座">白羊座</MenuItem>
              <MenuItem value="金牛座">金牛座</MenuItem>
              <MenuItem value="双子座">双子座</MenuItem>
              <MenuItem value="巨蟹座">巨蟹座</MenuItem>
              <MenuItem value="狮子座">狮子座</MenuItem>
              <MenuItem value="处女座">处女座</MenuItem>
              <MenuItem value="天秤座">天秤座</MenuItem>
              <MenuItem value="天蝎座">天蝎座</MenuItem>
              <MenuItem value="射手座">射手座</MenuItem>
              <MenuItem value="摩羯座">摩羯座</MenuItem>
              <MenuItem value="水瓶座">水瓶座</MenuItem>
              <MenuItem value="双鱼座">双鱼座</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <TextField
              label="行当"
              id="occupation"
              value={occupation}
              onChange={(e) => {
                setOccupation(e.target.value);
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <TextField
              label="志趣"
              id="interest"
              value={interest}
              onChange={(e) => {
                setInterest(e.target.value);
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <TextField
              label="通讯"
              id="contact"
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <TextField
              label="简述"
              id="intro"
              value={intro}
              onChange={(e) => {
                setIntro(e.target.value);
              }}
              multiline
              rows={4}
            />
          </FormControl>
        </Box>
      </Dialog>

      {msgOpen ? (
        <XMassage
          type={msgType}
          open={msgOpen}
          msg={msgMsg}
          emitClose={closeMassage}
        ></XMassage>
      ) : (
        ""
      )}
    </div>
  );
}

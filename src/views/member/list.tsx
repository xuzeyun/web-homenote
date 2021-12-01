// main
import React, { useState, useEffect } from "react";
import axios from "axios";
// mui
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Button,
  Box,
  Pagination,
} from "@mui/material";
// icon
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import GroupAddIcon from "@mui/icons-material/GroupAdd";
// service
import AddDialog from "./add-dialog";
import XMassage from "components/x-massage/index";
import "./index.scss";
const apiUrl = process.env.REACT_APP_API_URL;

// ts
interface Member {
  id: String;
  name: String;
  nickname: String;
  sex: Number;
  birthday: Date;
  life: Number;
  zodiac: String;
  constellation: String;
  occupation: String;
  interest: String;
  contact: String;
  intro: String;
}

export default function MemberList() {
  // 列表信息
  const [list, setList] = useState([]);
  // 弹窗显示隐藏
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 当前行信息
  const [curRow, setCurRow] = useState({});
  const [type, setType] = useState(1);

  useEffect(() => {
    // 请求列表
    getList();
  }, []);

  // 关闭弹窗
  const closeModel = () => {
    setIsModalVisible(false);
    setCurRow({});
  };

  // 请求列表
  const getList = () => {
    axios
      .get(`${apiUrl}/member/list?name=`)
      .then((res) => res.data)
      .then((res) => {
        setList(res.data);
      });
  };

  // 修改
  const editHandel = (row: Member) => {
    setType(2);
    setCurRow(row);
    setIsModalVisible(true);
  };

  // 详情
  const viewHandle = (row: Member) => {
    // setType(3)
    // viewHandle(row);
    // setIsModalVisible(true);
  };

  // 删除
  const deleteHandel = (id: string) => {
    axios
      .delete(`${apiUrl}/member/delete/` + id)
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          openMassage("success", res.msg);
          getList();
        } else {
          openMassage("error", res.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [msgOpen, setMsgOpen] = useState(false);
  const [msgType, setMsgType] = useState("info");
  const [msgMsg, setMsgMsg] = useState("info");
  const openMassage = (type: string, msg: string) => {
    setMsgOpen(true);
    setMsgType("success");
    setMsgMsg(msg);
  };
  const closeMassage = () => {
    setMsgOpen(false);
  };

  const listItems = list.map((member: any, index: number) => (
    <ListItem
      key={index}
      className="list-bottom-border"
      onClick={() => {
        viewHandle(member);
      }}
      secondaryAction={
        <IconButton edge="end">
          <EditIcon onClick={() => editHandel(member)} color="primary" />
          <DeleteIcon onClick={() => deleteHandel(member.id)} color="error" />
        </IconButton>
        // <IconButton edge="end" aria-label="delete" color="">

        // </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={member.name} secondary={member.intro} />
    </ListItem>
  ));

  return (
    <div>
      {/* 新增 */}
      <Box mb={1.5}>
        <Button
          variant="contained"
          startIcon={<GroupAddIcon />}
          onClick={() => {
            setIsModalVisible(true);
            setType(1);
          }}
        >
          载入成员
        </Button>
      </Box>
      <Box mb={1.5} className="g-box">
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {listItems}
        </List>
      </Box>
      <Box>
        <Pagination count={10} color="primary" />
      </Box>
      <AddDialog
        isModalVisible={isModalVisible}
        type={type}
        closeModel={closeModel}
        getList={getList}
        curRow={curRow}
      ></AddDialog>
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

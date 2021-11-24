import React, { useState, useEffect, Children } from "react";
import ReactDOM from "react-dom";
import { Table, Space, Button, message, Row } from "antd";
import { MemberModel } from "./Model";
import axios from "axios";
import "./index.scss";

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
interface SearchPanelProps {
  list: Member[];
}

export const MemberTable = () => {
  const [list, setList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [curRow, setCurRow] = useState({});

  useEffect(() => {
    // 请求列表
    getList();
  }, []);

  // 关闭弹窗
  const closeModel = () => {
    setIsModalVisible(false);
  };

  // 请求列表
  const getList = () => {
    fetch(`http://localhost:3000/member/list?name=`)
      .then((res) => res.json())
      .then((res) => {
        setList(res.data);
      });
  };

  // 修改
  const editHandel = (row: Member) => {
    console.log(row, "row");
    setCurRow(row);
    setIsModalVisible(true);
  };

  // 删除
  const deleteHandel = (id: string) => {
    axios
      .delete("http://localhost:3000/member/delete/" + id)
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          message.success(res.msg);
          getList();
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 列表配置
  const columns = [
    // { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: "尊姓大名", dataIndex: "name", key: "name", width: 100 },
    { title: "别号", dataIndex: "nickname", key: "nickname", width: 100 },
    { title: "性别", dataIndex: "sex", key: "sex", width: 100 },
    { title: "生辰", dataIndex: "birthday", key: "birthday", width: 100 },
    { title: "生死", dataIndex: "life", key: "life", width: 100 },
    { title: "生肖", dataIndex: "zodiac", key: "zodiac", width: 100 },
    {
      title: "星座",
      dataIndex: "constellation",
      key: "constellation",
      width: 100,
    },
    { title: "行当", dataIndex: "occupation", key: "occupation", width: 100 },
    { title: "志趣", dataIndex: "interest", key: "interest", width: 200 },
    { title: "通讯", dataIndex: "contact", key: "contact", width: 100 },
    { title: "简述", dataIndex: "intro", key: "intro", width: 200 },
    // 操作
    {
      title: "操作",
      key: "action",
      render: (text: String, record: any) => (
        <Space size="middle">
          <a onClick={() => editHandel(record)}>修改</a>
          <a onClick={() => deleteHandel(record.id)}>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row className="row-bottom">
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          新成员
        </Button>
      </Row>
      <Row>
        <Table columns={columns} dataSource={list} bordered />
      </Row>
      <MemberModel
        isModalVisible={isModalVisible}
        closeModel={closeModel}
        getList={getList}
        curRow={curRow}
      ></MemberModel>
    </div>
  );
};

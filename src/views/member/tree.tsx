import React, { useEffect, useState } from "react";
import axios from "axios";
import Draggable from "react-draggable"; // The default

const apiUrl = process.env.REACT_APP_API_URL;

const treeData = [
  {
    label: "许申炎",
    children: [
      {
        label: "许正民",
        partnerLabel: "张寸鱼",
        children: [
          {
            label: "许永红",
            partnerLabel: "张彩风",
            children: [
              { label: "许泽云", partnerLabel: "刘亚兴" },
              { label: "张泽青" },
            ],
          },
          {
            label: "许孝玲",
            children: [
              { label: "张旭刚" },
              { label: "张旭强" },
              { label: "张旭清" },
            ],
          },
          {
            label: "许素玲",
            children: [{ label: "许琳青" }, { label: "许瑞青" }],
          },
          {
            label: "许红玲",
            children: [{ label: "许林清" }, { label: "张旭强" }],
          },
        ],
      },
    ],
  },
];

export default function MemberTree() {
  // ======================================== data
  const [curTab, setCurTab] = useState(1);
  // 列表信息
  const [list, setList] = useState([]);

  // ======================================== mounted
  useEffect(() => {
    // 请求列表
    getList();
  }, []);

  const createTreeNode = (treeData: any) => {
    return treeData.map((item: any) => {
      if (item.children) {
        return (
          <li>
            <a href="#">
              <span>{item.label}</span>
              {item.partnerLabel ? (
                <span className="partner">{item.partnerLabel}</span>
              ) : null}
            </a>
            <ul>{createTreeNode(item.children)}</ul>
          </li>
        );
      } else {
        return (
          <li>
            <a href="#">
              <span>{item.label}</span>
              {item.partnerLabel ? (
                <span className="partner">{item.partnerLabel}</span>
              ) : null}
            </a>
          </li>
        );
      }
    });
  };

  // ======================================== method
  // 请求列表
  const getList = () => {
    axios
      .get(`${apiUrl}/member/list?name=`)
      .then((res) => res.data)
      .then((res) => {
        setList(res.data);
      });
  };

  // ======================================== template
  return (
    <div className="g-wrap">
      <div className="drag-wrap">
        <Draggable>
          <div className="tree-list">
            <ul>{createTreeNode(treeData)}</ul>
          </div>
        </Draggable>
      </div>
    </div>
  );
}

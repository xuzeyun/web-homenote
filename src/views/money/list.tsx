import React from "react";
import { useEffect, useState } from "react";
// import "./money.scss"

export const MoneyList = () => {
  // 弹窗显示隐藏
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 列表信息
  // const [list, setList] = useState([]);
  const list = [
    {
      type: 0,
      tag: "餐饮",
      price: "12.8",
      bz: "味来美食",
      createTime: "2021-12-25",
    },
    {
      type: 1,
      tag: "工资",
      price: "5000",
      bz: "发工资",
      createTime: "2021-12-24",
    },
  ];

  // 删除
  const deleteHandel = (id: string) => {};

  const listItems = list.map((money: any, index: number) => (
    <li key={index} className="clearfix">
      <h3 className={money.type ? "in-color" : "out-color"}>
        {/* {money.type ? '收入': '支出'} */}
        <span className="icon-bg"></span>
        <span>
          {money.type ? "+" : "-"}
          {money.price}
        </span>
      </h3>
      <div className="info">
        {/* 出入 类型标签 金额 人员 时间 */}
        <span>{money.tag}</span>
        <span>{money.member}</span>
        <span>{(money.createTime + "").substring(0, 10)}</span>
        <br />
        <span>{money.bz}</span>
      </div>
      <div className="tool">
        <i
          className="fas fa-trash error"
          onClick={() => deleteHandel(money.id)}
        ></i>
      </div>
    </li>
  ));

  return (
    <div>
      <div className="g-bottom top-btns">
        {/* 查询 */}
        {/* 按人员 按日期 按种类 按金额 */}

        {/* 新增 */}
        {/* <i
          className="fas fa-user-plus"
          onClick={() => {
            setIsModalVisible(true);
          }}>
        </i> */}
      </div>
      <div className="g-wrap clearfix">
        <div className="money-list">
          <ul>{listItems}</ul>
        </div>
      </div>
    </div>
  );
};

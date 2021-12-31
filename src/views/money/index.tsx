import React from "react";
import { useEffect, useState } from "react";
import { MoneyList } from "./list";
import { MoneyCharts } from "./charts";
import "./money.scss";

export const Money = () => {
  const [curTab, setCurTab] = useState(1);
  return (
    <div>
      <div className="top-tabs g-bottom">
        <span className="orn orn-left"></span>
        <div className="span-wrap">
          <span
            onClick={() => {
              setCurTab(1);
            }}
            className={curTab === 1 ? "active" : ""}
          >
            账单
          </span>
          <span
            onClick={() => {
              setCurTab(2);
            }}
            className={curTab === 2 ? "active" : ""}
          >
            统计
          </span>
        </div>
        <span className="orn orn-right"></span>
      </div>
      {curTab === 1 ? <MoneyList></MoneyList> : <MoneyCharts></MoneyCharts>}
    </div>
  );
};

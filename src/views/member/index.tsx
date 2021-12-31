import React from "react";
import { useEffect, useState } from "react";
import MemberList from "./list";
import MemberTree from "./tree";

export const MemberIndex = () => {
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
            家谱
          </span>
          <span
            onClick={() => {
              setCurTab(2);
            }}
            className={curTab === 2 ? "active" : ""}
          >
            成员列表
          </span>
        </div>
        <span className="orn orn-right"></span>
      </div>
      {curTab === 1 ? <MemberTree></MemberTree> : <MemberList></MemberList>}
    </div>
  );
};

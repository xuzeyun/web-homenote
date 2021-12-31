import React from "react";
import { useEffect, useState } from "react";
// import "./money.scss"

export const LineNote = () => {
  return (
    <div className="line-wrap">
      <div className="date">2021-10-01</div>
      <div className="line"></div>
      <div className="cont">
        <p>
          Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0
          的桌面端组件库
        </p>
      </div>
      <div className="date">2021-10-01</div>
      <div className="line"></div>
      <div className="cont">
        <p>
          Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0
          的桌面端组件库
        </p>
      </div>
    </div>
  );
};

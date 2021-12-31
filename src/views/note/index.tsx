import React from "react";
import { useEffect, useState } from "react";
import { DateNote } from "./date-note";
import { LineNote } from "./line-note";
import "./note.scss";

export const Note = () => {
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
            日记
          </span>
          <span
            onClick={() => {
              setCurTab(2);
            }}
            className={curTab === 2 ? "active" : ""}
          >
            大事记
          </span>
        </div>
        <span className="orn orn-right"></span>
      </div>
      {curTab === 1 ? <DateNote></DateNote> : <LineNote></LineNote>}
    </div>
  );
};

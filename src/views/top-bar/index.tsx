import React from "react";
import { useEffect, useState } from "react";
import logo from "assets/images/logo_2.svg";

export const TopBar = () => {
  return (
    <div className="top-bar g-bottom">
      <h1 className="logo">
        <img src={logo} alt="24G Logo"></img>
      </h1>
    </div>
  );
};

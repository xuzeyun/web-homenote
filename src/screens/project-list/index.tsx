import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { MemberTable } from "./list";

// const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <MemberTable></MemberTable>
    </div>
  );
};

import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";

export const SideBarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiOutlineHome />,
    cName: "nav-text",
  },
  {
    title: "Ebm",
    path: "/ebm",
    icon: <BiIcons.BiBible />,
    cName: "nav-text",
  },
  {
    title: "Culte",
    path: "/culte",
    icon: <BiIcons.BiChurch />,
    cName: "nav-text",
  },
  {
    title: "Other",
    path: "/other",
    icon: <AiIcons.AiOutlineAppstoreAdd />,
    cName: "nav-text",
  },
];

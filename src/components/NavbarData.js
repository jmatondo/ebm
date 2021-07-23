import React from "react";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";

export const SideBarData = [
  {
    title: "Accueil",
    path: "/",
    icon: <AiIcons.AiOutlineHome />,
    cName: "nav-text",
  },
  {
    title: "Cultes dominicales",
    path: "/cultes",
    icon: <BiIcons.BiChurch />,
    cName: "nav-text",
  },
  {
    title: "Méga Impact Conf.",
    path: "/mics",
    icon: <BiIcons.BiChurch />,
    cName: "nav-text",
  },
  {
    title: "Etudes bibliques",
    path: "/ebm",
    icon: <BiIcons.BiBible />,
    cName: "nav-text",
  },

  {
    title: "Other",
    path: "/other",
    icon: <AiIcons.AiOutlineAppstoreAdd />,
    cName: "nav-text",
  },
];

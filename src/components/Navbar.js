import React, { useState, useHistory } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { SideBarData } from "./NavbarData";
import "./Navbar.css";

import { Grid, Hidden } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

const Navbar = () => {
  const [sidebar, setsidebar] = useState(false);
  const showSidebar = () => setsidebar(!sidebar);
  //const history = useHistory();
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Hidden xsDown>
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </Hidden>
          <Hidden smUp>
            <Link to="/" className="menu-bars">
              <FaIcons.FaHome />
            </Link>
          </Hidden>
          <Hidden xsDown>
            <Grid className="titre">
              <span className="main-title">RB</span>
              <span className="sub-title">Résumés bibliques</span>
            </Grid>
          </Hidden>
          <Hidden smUp>
            <Grid className="titre">
              <span className="main-title">RB</span>
              <span className="sub-title">Résumés bibliques</span>
            </Grid>
          </Hidden>
          <div></div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <div className="test">
              {SideBarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="title2">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </div>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;

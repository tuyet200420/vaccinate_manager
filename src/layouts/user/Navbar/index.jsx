import { Space } from "antd";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import history from "../../../utils/history";
import { HomeOutlined } from "@ant-design/icons";

import * as Style from "./styles";

const NAV_MENU = [
  {
    title: <HomeOutlined />,
    path: "/",
    icon: "",
  },
  {
    title: "Vắc Xin",
    path: "/vaccine",
    icon: "",
  },
  {
    title: "Lịch Tiêm Chuẩn",
    path: "/injection_schedule",
    icon: "",
  },
  {
    title: "Đăng Ký Tiêm",
    path: "/register_vaccination",
    icon: "",
  },
  {
    title: "Lịch Sử Tiêm",
    path: "/history_vaccine",
    icon: "",
  },
  {
    title: "Thông Tin Cá Nhân",
    path: "/personal_information",
    icon: "",
  },
];
function NavBar({ location }) {
  console.log("🚀 ~ file: index.jsx ~ line 47 ~ NavBar ~ location", location);

  function renderMenu() {
    return NAV_MENU.map((menuItem, menuIndex) => {
      return (
        <Style.MenuItem
          key={`navbar-${menuIndex}`}
          active={location.pathname === menuItem.path}
        >
          <p onClick={() => history.push(menuItem.path)}>{menuItem.title}</p>
        </Style.MenuItem>
      );
    });
  }
  return (
    <Style.NavbarContainer>
      <Style.NavbarContent>
        <Style.CustomSpace>{renderMenu()}</Style.CustomSpace>
      </Style.NavbarContent>
    </Style.NavbarContainer>
  );
}
export default NavBar;

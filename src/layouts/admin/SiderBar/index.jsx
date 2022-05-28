import React, { useState, useEffect } from "react";
import { Menu } from "antd";

import history from "../../../utils/history";

import * as Icons from "@ant-design/icons";

const SIDEBAR_MENU = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <Icons.HomeOutlined />,
  },
  {
    title: "Quản Lý Vắc Xin",
    path: "/admin/vaccines",
    icon: <Icons.MedicineBoxOutlined />,
  },
  {
    title: "Quán Lý Kho Vắc Xin",
    path: "/admin/storages",
    icon: <Icons.QrcodeOutlined />,
  },
  {
    title: "Quản Lý Danh Sách Tiêm",
    path: "/admin/patientVaccines",
    icon: <Icons.SolutionOutlined />,
  },
  {
    title: "Quản Lý Kế Hoạch Tiêm Chủng",
    path: "/admin/vaccinationPlans",
    icon: <Icons.ShoppingOutlined />,
  },
  {
    title: "Quản Lý Thông Tin Sau Tiêm",
    path: "/admin/afterInjections",
    icon: <Icons.UserOutlined />,
  },
  {
    title: "Quản Lý Đăng Ký Tiêm",
    path: "/admin/registerVaccinations",
    icon: <Icons.UserOutlined />,
  },
  {
    title: "Quản Lý Tài Khoản",
    path: "/admin/users",
    icon: <Icons.UserOutlined />,
  }
];

function Sidebar({ location }) {

  function renderSidebarMenu() {
    return SIDEBAR_MENU.map((sidebarItem, sidebarIndex) => {
      return (
          <Menu.Item
              icon={sidebarItem.icon}
              key={sidebarIndex}
              active={location.pathname === sidebarItem.path}
              onClick={() => history.push(sidebarItem.path)}
            >
              {sidebarItem.title}
          </Menu.Item>
      );
    });
  }
  
  return (
    <>
      <Menu theme="dark" mode="inline">
        {renderSidebarMenu()}
      </Menu>
    </>
  );
}

export default Sidebar;
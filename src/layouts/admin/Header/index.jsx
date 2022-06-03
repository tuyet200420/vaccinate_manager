import * as Style from "./styles";
import { Avatar, Col, Menu, Dropdown, Button } from "antd";
import history from "../../../utils/history";
import { useState } from "react";
import * as Icon from "@ant-design/icons";
import logo from "../../../assets/images/logo3.png";
import { useSelector, useDispatch } from "react-redux";
import {
  logoutAction
} from"../../../redux/actions"
function HeaderLayOut() {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.userReducer);
  function handleLogout() {
    localStorage.removeItem('userInfo');
    dispatch(logoutAction());
  };
  function renderUserDropdown() {
    return (
      <Menu>
        {/* <Menu.Item>Profile</Menu.Item> */}
        <Menu.Item
        onClick={() => handleLogout()}
        >
          Đăng xuất
        </Menu.Item>
      </Menu>
    );}
  return (
    <>
    <Style.HeaderConteiner>
    <Style.HeaderDesktop>
        <div className="top-bar">
          <div className="container">
            <img src={logo} width="50" />
            <div>
              {userDetail.data.name ? (
                <Dropdown overlay={renderUserDropdown()} trigger={["click"]}>
                  <Style.Account avatar={userDetail.data.avatar}>
                  <Avatar icon={<Icon.UserOutlined />} />
                    {userDetail.data.name}
                  </Style.Account>
                </Dropdown>
              ) : (
                <Button
                  type="primary"
                  danger
                  onClick={() =>
                    history.push({
                      pathname: "/login",
                      state: {
                        prevPath: history.location.pathname,
                      },
                    })
                  }
                >
                  Đăng nhập
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="bar-content"></div>
      </Style.HeaderDesktop>
    </Style.HeaderConteiner>
    </>
  )
}
export default HeaderLayOut
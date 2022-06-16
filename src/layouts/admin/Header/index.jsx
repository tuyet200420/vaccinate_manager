import * as Style from "./styles";
import { Avatar, Menu, Dropdown, Button, Badge, Space } from "antd";
import history from "../../../utils/history";
import * as Icon from "@ant-design/icons";
import logo from "../../../assets/images/logo3.png";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../../redux/actions";
import { useState, useEffect } from "react";
function HeaderLayOut() {
  const dispatch = useDispatch();
  const { messengerList, messengerDetail } = useSelector(
    (state) => state.messengerReducer
  );
  const { userDetail } = useSelector((state) => state.userReducer);
  function handleLogout() {
    localStorage.removeItem("userInfo");
    dispatch(logoutAction());
  }

  const GetCount = messengerList.data.reduce((sum,item, index) => {
    return sum + item.countAdminSee 
  },0)
  function renderUserDropdown() {
    return (
      <Menu>
        {/* <Menu.Item>Profile</Menu.Item> */}
        <Menu.Item onClick={() => handleLogout()}>Đăng xuất</Menu.Item>
      </Menu>
    );
  }
  return (
    <>
      <Style.HeaderConteiner>
        <Style.HeaderDesktop>
          <div className="top-bar">
            <div className="container">
              <img src={logo} width="50" />
              <div style={{cursor:"pointer"}}>
                {userDetail.data.name ? (
                  <Space size={"large"}>
                    <div onClick={()=>{
                      history.push("/admin/messengers")
                    }}>
                      <Badge size="small" count={GetCount}>
                        <Icon.CommentOutlined
                          style={{
                            fontSize: "30px",
                          }}
                        />
                      </Badge>
                    </div>

                    <Dropdown
                      overlay={renderUserDropdown()}
                      trigger={["click"]}
                    >
                      <Style.Account avatar={userDetail.data.avatar}>
                        <Avatar icon={<Icon.UserOutlined />} />
                        {userDetail.data.name}
                      </Style.Account>
                    </Dropdown>
                  </Space>
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
  );
}
export default HeaderLayOut;

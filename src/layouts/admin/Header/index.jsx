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
  const [Count, setCount] = useState("");
  const { userDetail } = useSelector((state) => state.userReducer);
  function handleLogout() {
    localStorage.removeItem("userInfo");
    dispatch(logoutAction());
  }
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
              <div>
                {userDetail.data.name ? (
                  <Space size={"large"}>
                    <div>
                      <Badge size="small" count={5}>
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

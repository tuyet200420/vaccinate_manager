import {
  Avatar,
  Badge,
  Menu,
  Dropdown,
  Button,
  Card,
  Space,
  Input,
  Empty,
} from "antd";
import history from "../../../utils/history";
import { useState } from "react";
import * as Icon from "@ant-design/icons";
import logo from "../../../assets/images/logo3.png";
import chat from "../../../assets/images/chat.png";
import { useSelector, useDispatch } from "react-redux";
import {
  logoutAction,
  editMessengerAction,
  createMessengerAction,
} from "../../../redux/actions";
import * as Style from "./styles";

function Header() {
  const { TextArea } = Input;
  const { Meta } = Card;
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.userReducer);
  const [value, setValue] = useState("");
  const [ShowMsg, setShowMsg] = useState("");
  const { messengerList, messengerDetail } = useSelector(
    (state) => state.messengerReducer
  );
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
  const GetListMsgItem = (ListItem) => {
    return ListItem.map((item, index) => {
      return (
        <>
          {item.content_admin ? (
            <Style.ChatItem>
              <Space size={"small"}>
                <Avatar icon={<Icon.UserOutlined />} />
                <span className="admin" span={12}>
                  {item.content_admin}
                </span>
              </Space>
            </Style.ChatItem>
          ) : (
            ""
          )}
          {item.content_user ? (
            <Style.ChatItem>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <span className="user">{item.content_user}</span>
              </div>
            </Style.ChatItem>
          ) : (
            ""
          )}
        </>
      );
    });
  };
  const handlerSendMsg = () => {
    const arrayMsg = [
      ...messengerDetail.data.messenger,
      { content_user: value },
    ];
    const data = {
      ...messengerDetail.data,
      messenger: arrayMsg,
      countAdminSee: messengerDetail.data.countAdminSee + 1,
      user_id: messengerDetail.data.user_id._id,
    };
    // if()
    dispatch(
      editMessengerAction({
        id: messengerDetail.data._id,
        data: data,
      })
    );
    setValue("");
  };
  const handlerCreateMsg = () => {
    const arrayMsg = [{ content_user: value }];
    const data = {
      messenger: arrayMsg,
      countAdminSee: 1,
      user_id: userDetail.data._id,
    };
    // if()
    dispatch(
      createMessengerAction({
        data: data,
      })
    );
    setValue("");
  };
  return (
    <>
      <Style.HeaderDesktop>
        <div className="top-bar">
          <div className="container">
            <img src={logo} width="70" />
            <div>
              {userDetail.data.name ? (
                <>
                  <Style.Chat>
                    {ShowMsg ? (
                      <Card
                        title={
                          <div style={{display:"flex",justifyContent:"space-between"}}>
                            <Space size={"small"}>
                              <div>
                                <Badge color="#87d068" />
                                <Avatar icon={<Icon.UserOutlined />} />
                                <span>{userDetail.data.name}</span>
                              </div>
                            </Space>
                            <div>
                              <Icon.MinusOutlined
                                // style={{ marginLeft: "110px" }}
                                onClick={() => {
                                  setShowMsg(false);
                                }}
                              />
                            </div>
                          </div>
                        }
                        style={{ width: 300, height: 400 }}
                      >
                        <div>
                          {!messengerDetail.data.messenger ? (
                            <Style.ChatList>
                              <div className="showMsg"></div>
                              <Style.ChatBox>
                                <div className="chat-box-container">
                                  <TextArea
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="nhập tin nhắn..."
                                    autoSize={{ minRows: 1, maxRows: 3 }}
                                  />
                                  <Icon.SendOutlined
                                    className="icon"
                                    onClick={() => {
                                      handlerCreateMsg();
                                    }}
                                  />
                                </div>
                              </Style.ChatBox>
                            </Style.ChatList>
                          ) : (
                            <>
                              <Style.ChatList>
                                <div className="showMsg">
                                  {GetListMsgItem(
                                    messengerDetail?.data?.messenger
                                  )}
                                </div>
                                <Style.ChatBox>
                                  <div className="chat-box-container">
                                    <TextArea
                                      value={value}
                                      onChange={(e) => setValue(e.target.value)}
                                      placeholder="nhập tin nhắn..."
                                      autoSize={{ minRows: 1, maxRows: 3 }}
                                    />
                                    <Icon.SendOutlined
                                      className="icon"
                                      onClick={() => {
                                        handlerSendMsg();
                                      }}
                                    />
                                  </div>
                                </Style.ChatBox>
                              </Style.ChatList>
                            </>
                          )}
                        </div>
                      </Card>
                    ) : (
                      <div
                        onClick={() => {
                          setShowMsg(true);
                          if (messengerDetail.data.countUserSee > 0) {
                            dispatch(
                              editMessengerAction({
                                id: messengerDetail.data._id,
                                data: {
                                  ...messengerDetail.data,
                                  countUserSee: 0,
                                },
                              })
                            );
                          }
                        }}
                      >
                        <Badge
                          size={"large"}
                          count={messengerDetail.data?.countUserSee}
                        >
                          <img src={chat} alt="" width="70px" />
                        </Badge>
                      </div>
                    )}
                  </Style.Chat>
                  <Dropdown overlay={renderUserDropdown()} trigger={["click"]}>
                    <Style.Account avatar={userDetail.data.avatar}>
                      <Avatar icon={<Icon.UserOutlined />} />
                      {userDetail.data.name}
                    </Style.Account>
                  </Dropdown>
                </>
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
    </>
  );
}
export default Header;

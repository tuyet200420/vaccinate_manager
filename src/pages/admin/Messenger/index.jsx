import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Space, Badge, Empty, Avatar, Button, Input } from "antd";
import * as Icon from "@ant-design/icons";
import history from "../../../utils/history";
import moment from "moment";

import {
  getMessengerDetailAction,
  getMessengerListAction,
  editMessengerAction,
} from "../../../redux/actions";

import * as Style from "./styles";
function MessengerPage({ location, match }) {
  const { TextArea } = Input;
  const [value, setValue] = useState("");
  const messengerId = match.params.id;
  const { messengerList, messengerDetail } = useSelector(
    (state) => state.messengerReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMessengerListAction());
  }, []);
  useEffect(() => {
    dispatch(
      getMessengerDetailAction({
        id: messengerId,
      })
    );
  }, []);
  useEffect(() => {
    dispatch(
      getMessengerDetailAction({
        id: messengerId,
      })
    );
  }, [messengerId]);
  const GetListMessenger = messengerList.data.map((item, index) => {
    return (
      <>
        <Style.ItemMsg
          className="msg-item"
          active={location.pathname === `/admin/messengers/${item._id}`}
          onClick={() => {
            if (item.countAdminSee > 0) {
              dispatch(
                editMessengerAction({
                  id: item._id,
                  data: {
                    ...item,
                    countAdminSee: 0,
                  },
                })
              );
            }

            history.push(`/admin/messengers/${item._id}`);
          }}
        >
          <Space size={"small"}>
            <Badge color={item.countAdminSee > 0 ? "green" : "gray"} />
            <Avatar icon={<Icon.UserOutlined />} />
            <span span={12}>{item.user_id.name}</span>
          </Space>
        </Style.ItemMsg>
      </>
    );
  });
  const handlerSendMsg = () => {
    const arrayMsg = [
      ...messengerDetail.data.messenger,
      { content_admin: value },
    ];
    const data = {
      ...messengerDetail.data,
      messenger: arrayMsg,
      countUserSee: messengerDetail.data.countUserSee + 1,
      user_id: messengerDetail.data.user_id._id,
    };
    dispatch(
      editMessengerAction({
        id: messengerId,
        data: data,
      })
    );
    setValue("");
  };
  const GetListMsgItem = (ListItem) => {
    return ListItem.map((item, index) => {
      return (
        <>
          {item.content_user ? (
            <Style.ChatItem>
              <Space size={"small"}>
                <Avatar icon={<Icon.UserOutlined />} />
                <span className="user" span={12}>
                  {item.content_user}
                </span>
              </Space>
            </Style.ChatItem>
          ) : (
            ""
          )}
          {item.content_admin ? (
            <Style.ChatItem>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <span className="admin">{item.content_admin}</span>
              </div>
            </Style.ChatItem>
          ) : (
            ""
          )}
        </>
      );
    });
  };

  return (
    <>
      <Row>
        <Col span={6}>
          <Style.ListMsg>
            <div className="msg-box">{GetListMessenger}</div>
          </Style.ListMsg>
        </Col>
        <Col span={18}>
          <div>
            {!messengerDetail.data.messenger ? (
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 400,
                }}
                description={
                  <span>
                    Customize <a href="#API">Description</a>
                  </span>
                }
              >
                <Button type="primary">Create Now</Button>
              </Empty>
            ) : (
              <>
                <Style.ChatList>
                  <div className="showMsg">
                    {GetListMsgItem(messengerDetail?.data?.messenger)}
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
        </Col>
      </Row>
    </>
  );
}
export default MessengerPage;

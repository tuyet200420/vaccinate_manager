import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Space, Popconfirm } from "antd";
import moment from "moment";

import * as Icon from "@ant-design/icons";
import ModifyUserModal from "./components/ModifyUserModal";

import {
  getUserListAction,
  deleteUserAction,
  createUserAction,
  editUserAction,
} from "../../../redux/actions";

import * as Style from "./styles";

function UserPage(props) {
  const [isShowModifyModal, setIsShowModifyModal] = useState("");
  const [modifyData, setModifyData] = useState({});

  const { userList } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListAction());
  }, []);


  function handleSearchUser(value) {
    dispatch(
      getUserListAction({
        searchKey: value,
      })
    );
  }

  function handleSubmitForm(values) {
    console.log(values)
    dispatch(
      editUserAction({
        id: modifyData._id,
        data: {
          ...values
        },
      })
    );
    setIsShowModifyModal("");
  }
  const tableColumn = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      align: "center",
      key: "password",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      align: "center",
      key: "role",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      align: "center",
      key: "createdAt",
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ngày sửa",
      dataIndex: "updatedAt",
      align: "center",
      key: "updatedAt",
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            <Button
              icon={<Icon.FormOutlined />}
              type="primary"
              ghost
              onClick={() => {
                setIsShowModifyModal("edit");
                setModifyData({...record});
              }}
            >
              Phân quyền
            </Button>
          </Space>
        );
      },
    },
  ];

  const tableData = userList.data.map((userItem, userIndex) => {
    return {
      key: userIndex,
      ...userItem,
    };
  });

  return (
    <div>
      <Style.CustomSpaceBox>
        <Style.Title>Quản lý Tài Khoản</Style.Title>
        <Style.CustomSpace>
          <Style.Search>
            <Input
              placeholder="Tìm kiếm..."
              suffix={<Icon.SearchOutlined />}
              onChange={(e) => handleSearchUser(e.target.value)}
            />
          </Style.Search>
          {/* <Button
            type="primary"
            onClick={() => {
              setIsShowModifyModal("create");
              setModifyData({ vaccine_id: "", quantity: 0 });
            }}
          >
            Thêm mới
          </Button> */}
        </Style.CustomSpace>
      </Style.CustomSpaceBox>
      <Style.CustomTable
        scroll={{ x: "1000px" }}
        size="small"
        columns={tableColumn}
        dataSource={tableData}
        loading={userList.load}
      />

      <ModifyUserModal
        isShowModifyModal={isShowModifyModal}
        setIsShowModifyModal={setIsShowModifyModal}
        handleSubmitForm={handleSubmitForm}
        modifyData={modifyData}
      />
    </div>
  );
}

export default UserPage;

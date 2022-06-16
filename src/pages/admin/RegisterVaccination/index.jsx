import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Space, Popconfirm } from "antd";
import moment from "moment";

import * as Icon from "@ant-design/icons";
import ModifyRegisterVaccinationModal from "./components/ModifyRegisterVaccinationModal";

import {
  getRegisterVaccinationListAction,
  editRegisterVaccinationAction,
  getStorageDetailAction,
} from "../../../redux/actions";

import * as Style from "./styles";

const COLORSTATUS = {
  CHODUYET: {
    Bg_color: "#45f522",
    color: "white",
  },
  CHOTIEM: {
    Bg_color: "#1150d9",
    color: "white",
  },
  DATIEM: {
    Bg_color: "#d91111",
    color: "white",
  },
  HUY: {
    Bg_color: "#5c5a5a",
    color: "white",
  },
};

function RegisterVaccinationPage(props) {
  const [isShowModifyModal, setIsShowModifyModal] = useState("");
  const [modifyData, setModifyData] = useState({});

  const { registerVaccinationList } = useSelector(
    (state) => state.registerVaccinationReducer
  );
  const { storageDetail } = useSelector((state) => state.storageReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRegisterVaccinationListAction());
  }, []);

  function handleSearch(value) {
    dispatch(
      getRegisterVaccinationListAction({
        searchKey: value,
      })
    );
  }

  function handleSubmitForm(values) {
    console.log(values);
    dispatch(
      editRegisterVaccinationAction({
        id: modifyData._id,
        data: {
          ...values,
        },
      })
    );
    setIsShowModifyModal("");
  }
  const tableColumn = [
    {
      title: "Mã số trẻ",
      dataIndex: "code_number",
      key: "code_number",
      align: "center",
    },
    {
      title: "Tên Trẻ",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      align: "center",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
      align: "center",
    },
    {
      title: "Người dám hộ",
      dataIndex: "guardian",
      align: "center",
      key: "guardian",
    },
    {
      title: "Quan hệ",
      dataIndex: "relationship_guardian",
      align: "center",
      key: "relationship_guardian",
    },
    {
      title: "SDT Liên hệ",
      dataIndex: "phone_number",
      key: "phone_number",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      align: "center",
      key: "address",
    },
    {
      title: "Ngày mong muốn",
      dataIndex: "target_date",
      align: "center",
      key: "target_date"
    },
    {
      title: "Vắc xin đăng ký",
      dataIndex: "vaccine_id",
      align: "center",
      key: "vaccine_id",
      render: (value) => value && value.name,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      key: "status",
      render: (value) => (
        <>
          <span
            style={{
              background:
                value == "Chờ duyệt"
                  ? COLORSTATUS.CHODUYET.Bg_color
                  : value == "Chờ tiêm"
                  ? COLORSTATUS.CHOTIEM.Bg_color
                  :value == "Hủy"?COLORSTATUS.HUY.Bg_color: COLORSTATUS.DATIEM.Bg_color,
              color: "white",
              borderRadius: 10,
              padding: "1px 4px",
              minWidth: "80px",
              display: "inline-block",
            }}
          >
            {value}
          </span>
        </>
      ),
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
      align: "center",
      render: (_, record) => {
        return (
          <Space>
            <Button
              icon={<Icon.FormOutlined />}
              type="primary"
              disabled={record.status == "Hủy"}
              ghost
              onClick={() => {
                setIsShowModifyModal("edit");
                dispatch(
                  getStorageDetailAction({
                    id: record.vaccine_id._id,
                  })
                );
                setModifyData({ ...record });
              }}
            >
              Cập nhật trạng thái
            </Button>
          </Space>
        );
      },
    },
  ];

  const tableData = registerVaccinationList.data.map((Item, Index) => {
    return {
      key: Index,
      ...Item,
    };
  });

  return (
    <div>
      <Style.CustomSpaceBox>
        <Style.Title>Quản lý Đăng Ký Tiêm</Style.Title>
        <Style.CustomSpace>
          <Style.Search>
            <Input
              placeholder="Tìm kiếm..."
              suffix={<Icon.SearchOutlined />}
              onChange={(e) => handleSearch(e.target.value)}
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
        scroll={{ x: "1900px" }}
        size="small"
        columns={tableColumn}
        dataSource={tableData}
        loading={registerVaccinationList.load}
      />

      <ModifyRegisterVaccinationModal
        isShowModifyModal={isShowModifyModal}
        setIsShowModifyModal={setIsShowModifyModal}
        handleSubmitForm={handleSubmitForm}
        modifyData={modifyData}
        storageDetail={storageDetail}
      />
    </div>
  );
}

export default RegisterVaccinationPage;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Space, Popconfirm } from "antd";
import banner from "../../../assets/images/banner.jpg";
import moment from "moment";

import * as Icon from "@ant-design/icons";
import {
  getRegisterVaccinationListAction,
  getPatientVaccinationListAction,
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
};

function HistoryVaccinationPage(props) {
  const { registerVaccinationList } = useSelector(
    (state) => state.registerVaccinationReducer
  );
  const { patientVaccinationList } = useSelector(
    (state) => state.patientVaccinationReducer
  );
  const { userDetail } = useSelector((state) => state.userReducer);
  console.log(
    "🚀 ~ file: index.jsx ~ line 37 ~ HistoryVaccinationPage ~ storageDetail",
    userDetail
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getRegisterVaccinationListAction({
        userId: userDetail.data._id,
      })
    );
    // dispatch(getPatientVaccinationListAction());
  }, []);

  function handleSearchPatient(value) {
    value?
      dispatch(
        getPatientVaccinationListAction({
          s: value,
        })
      ):
      dispatch(
        getPatientVaccinationListAction({
          s: "0000000000000000000000000000000",
        })
      )
    
  }
  const tableColumn2 = [
    {
      title: "",
      dataIndex: "code_number",
      align: "center",
      key: "code_number",
    },
    {
      title: "Tên trẻ",
      width: 150,
      align: "center",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      align: "center",
      width: 80,
      key: "gender",
    },
    {
      title: "Ngày sinh",
      align: "center",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Người dám hộ",
      align: "center",
      dataIndex: "guardian",
      key: "guardian",
    },
    {
      title: "SDT liên hệ",
      align: "center",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Địa chỉ",
      align: "center",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Vắc xin",
      dataIndex: "vaccine_id",
      align: "center",
      key: "vaccine_id",
      render: (value) => value && value.name,
    },
    {
      title: "Trạng thái",
      align: "center",
      dataIndex: "status",
      key: "status",
      render: (value) => (
        <>
          <span
            style={{
              background:
                value == "Chưa tiêm"
                  ? COLORSTATUS.CHUATIEM.Bg_color
                  : COLORSTATUS.DATIEM.Bg_color,
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
  ];
  const tableData2 = patientVaccinationList.data.map(
    (patientVaccinationItem, patientVaccinationIndex) => {
      return {
        key: patientVaccinationIndex,
        ...patientVaccinationItem,
      };
    }
  );

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
                  : COLORSTATUS.DATIEM.Bg_color,
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
      title: "Ngày đăng ký",
      dataIndex: "createdAt",
      align: "center",
      key: "createdAt",
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
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
      <Style.Banner img={banner}>
        <div>
          <h1>LỊCH SỬ TIÊM VẮC XIN</h1>
        </div>
      </Style.Banner>
      <Style.Container>
        <div style={{ paddingBottom: "40px" }}>
          <Style.CustomTable
            // scroll={{ x: "1500px" }}
            size="middle"
            columns={tableColumn}
            dataSource={tableData}
            loading={registerVaccinationList.load}
          />
        </div>
        <div>
          <h2>Tra cứu thông tin</h2>
          <Style.Search>
            <Input
              size="large"
              placeholder="Nhập tên/ số điện thoại"
              suffix={<Icon.SearchOutlined />}
              onChange={(e) => handleSearchPatient(e.target.value)}
            />
          </Style.Search>
          {
            patientVaccinationList.data.length?(
              <Style.CustomTable
              // scroll={{ x: 1500 }}
              size="middle"
              columns={tableColumn2}
              dataSource={tableData2}
              loading={patientVaccinationList.load}
            />
            ):""
          }
          
        </div>
      </Style.Container>
    </div>
  );
}

export default HistoryVaccinationPage;

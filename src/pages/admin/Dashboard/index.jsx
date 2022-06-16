import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Select, Popconfirm } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import moment from "moment";

import * as Icon from "@ant-design/icons";
import {
  getStorageDetailAction,
  getVaccineListAction,
  getPatientVaccinationListAction,
} from "../../../redux/actions";

import * as Style from "./styles";

const COLORSTATUS = {
  CHUATIEM: {
    Bg_color: "#f5222d",
    color: "white",
  },
  DATIEM: {
    Bg_color: "#a0d911",
    color: "white",
  },
};

function DashboardPage() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { Option } = Select;
  const { patientVaccinationList } = useSelector(
    (state) => state.patientVaccinationReducer
  );
  const { storageDetail } = useSelector((state) => state.storageReducer);
  const { vaccineList } = useSelector((state) => state.vaccineReducer);
  const [dataChart, setDataChart] = useState([100, 100, 100]);
  const [dataChart2, setDataChart2] = useState([100, 100]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVaccineListAction());
    dispatch(getPatientVaccinationListAction());
    dispatch(
      getStorageDetailAction({
        id: "62680914fd7aa75e1faa5672",
      })
    );
    dispatch(
      getPatientVaccinationListAction({
        filter: "62680914fd7aa75e1faa5672",
      })
    );
  }, []);
  useEffect(() => {
    setDataChart([
      storageDetail.data.quantity_import,
      storageDetail.data.quantity_sold,
      storageDetail.data.quantity,
    ]);
  }, [storageDetail]);

  useEffect(() => {
    setDataChart2([GetCountDone, GetCountNotDone]);
  }, [patientVaccinationList.data]);

  const tableColumn = [
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
    {
      title: "Ngày sửa",
      dataIndex: "updatedAt",
      align: "center",
      key: "updatedAt",
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
    },
  ];

  const tableData = patientVaccinationList.data.map(
    (patientVaccinationItem, patientVaccinationIndex) => {
      return {
        key: patientVaccinationIndex,
        ...patientVaccinationItem,
      };
    }
  );
  const GetCountDone = patientVaccinationList.data.reduce(
    (sum, item, index) => {
      var j = 0;
      if(item.status == "Chưa tiêm"){j = 0}  else {j= 1}
      return sum +j
    },
    0
  );

  const GetCountNotDone = patientVaccinationList.data.reduce(
    (sum, item, index) => {
      var i = 0;
      if(item.status == "Chưa tiêm"){i =  1}  else {i= 0}
      return sum +i;
    },
    0
  );

  const optionVaccineList = vaccineList.data.map(
    (vaccineItem, vaccineIndex) => {
      return (
        <>
          <Option key={vaccineIndex} value={vaccineItem._id}>
            {vaccineItem.name}
          </Option>
        </>
      );
    }
  );

  const data = {
    labels: ["Đã Nhập", "Đã Tiêm", "Tồn kho"],
    datasets: [
      {
        label: "Vắc Xin",
        data: [...dataChart],
        backgroundColor: [
          "rgba(252, 7, 60, 0.2)",
          "rgba(8, 156, 255, 0.2)",
          "rgba(8, 255, 41, 0.2)",
        ],
        borderColor: ["#f7063a", "#0397fa", "#03fa2c"],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: ["Đã Tiêm", "Chưa tiêm"],
    datasets: [
      {
        label: "Vắc Xin",
        data: [...dataChart2],
        backgroundColor: [
          "#a0d9113d",
          "#f7063a44",
        ],
        borderColor: ["#4af706", "#fa2003"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div>
        <span style={{ marginBottom: "20px" }}>Chọn vắc xin:</span>
        <Select
          style={{ width: 200, marginBottom: 10 }}
          size="small"
          defaultValue={"62680914fd7aa75e1faa5672"}
          onChange={(value) => {
            dispatch(
              getStorageDetailAction({
                id: value,
              })
            );
            dispatch(
              getPatientVaccinationListAction({
                filter: value,
              })
            );
          }}
        >
          {optionVaccineList}
        </Select>
        <Row>
          <Col span={12}>
            <Style.ChartBox>
              <Pie data={data} />;
            </Style.ChartBox>
          </Col>
          <Col span={12}>
            <Style.ChartBox>
              <Pie data={data2} />;
            </Style.ChartBox>
          </Col>
        </Row>
      </div>
      <Style.CustomTable
        scroll={{ x: 1500 }}
        size="small"
        columns={tableColumn}
        dataSource={tableData}
        loading={patientVaccinationList.load}
      />
    </>
  );
}
export default DashboardPage;

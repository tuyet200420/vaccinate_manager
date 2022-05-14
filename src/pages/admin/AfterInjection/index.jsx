import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Space, Select, Popconfirm } from "antd";
import moment from "moment";

import * as Icon from "@ant-design/icons";
import ModifyAfterInjectionModal from "./components/ModifyAfterInjectionModal";

import {
  getPatientVaccinationListAction,
  getVaccineListAction,
  editPatientVaccinationAction,
} from "../../../redux/actions";

import * as Style from "./styles";

function AfterInjectionPage(props) {
  const { Option } = Select;
  const [isShowModifyModal, setIsShowModifyModal] = useState("");
  const [modifyData, setModifyData] = useState({});

  const { patientVaccinationList } = useSelector(
    (state) => state.patientVaccinationReducer
  );
  const { vaccineList } = useSelector((state) => state.vaccineReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVaccineListAction());
    dispatch(getPatientVaccinationListAction({
      status:"Đã tiêm"
    }));
  }, []);

  function handleSubmitForm(values) {
      dispatch(
        editPatientVaccinationAction({
          id: modifyData._id,
          data: values,
        })
      );
    setIsShowModifyModal("");
  }

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
      title: "Vắc xin",
      dataIndex: "vaccine_id",
      align: "center",
      key: "vaccine_id",
      render: (value) => value && value.name,
    },
    {
      title: "Ho",
      dataIndex: "cough",
      align: "center",
      key: "cough",
      render: (value) => (
        <>
          <span
            style={{
              color: "#f5222d"
            }}
          >
            {value == 1 ? "X":""}
          </span>
        </>
      ),
    },
    {
      title: "Nóng Lạnh",
      dataIndex: "fever",
      align: "center",
      key: "fever",
      render: (value) => (
        <>
          <span
            style={{
              color: "#f5222d"
            }}
          >
            {value == 1 ? "X":""}
          </span>
        </>
      ),
    },
    {
      title: "Ói mửa",
      dataIndex: "spew",
      align: "center",
      key: "spew",
      render: (value) => (
        <>
          <span
            style={{
              color: "#f5222d"
            }}
          >
            {value == 1 ? "X":""}
          </span>
        </>
      ),
    },
    {
      title: "Khó thở",
      dataIndex: "breath_heavily",
      align: "center",
      key: "breath_heavily",
      render: (value) => (
        <>
          <span
            style={{
              color: "#f5222d"
            }}
          >
            {value == 1 ? "X":""}
          </span>
        </>
      ),
    },
    {
      title: "Co giật",
      dataIndex: "convulsions",
      align: "center",
      key: "convulsions",
      render: (value) => (
        <>
          <span
            style={{
              color: "#f5222d"
            }}
          >
            {value == 1 ? "X":""}
          </span>
        </>
      ),
    },
    {
      title: "Triệu chứng khác",
      dataIndex: "note",
      align: "center",
      key: "note"
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
              icon={<Icon.EditOutlined />}
              type="primary"
              ghost
              onClick={() => {
                setIsShowModifyModal("edit");
                setModifyData({
                  ...record,
                  vaccine_id: record.vaccine_id._id
                });
              }}
            ></Button>
          </Space>
        );
      },
    },
  ];
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
  const tableData = patientVaccinationList.data.map(
    (patientVaccinationItem, patientVaccinationIndex) => {
      return {
        key: patientVaccinationIndex,
        ...patientVaccinationItem,
      };
    }
  );

  return (
    <div>
      <Style.Title>Quản lý Thông tin sau tiêm</Style.Title>
      <div style={{ marginBottom: "10px", textAlign: "right" }}>
      </div>
      <span style={{ marginRight: "10px" }}>Chọn vắc xin:</span>
      <Select
        style={{ width: 400, marginBottom: 10 }}
        size="small"
        onChange={(value) =>
          dispatch(
            getPatientVaccinationListAction({
              filter: value,
              status: "Đã tiêm"
            })
          )
        }
      >
        {optionVaccineList}
      </Select>

      <Style.CustomTable
        scroll={{ x: 1500 }}
        size="small"
        columns={tableColumn}
        dataSource={tableData}
        loading={patientVaccinationList.load}
      />

      <ModifyAfterInjectionModal
        isShowModifyModal={isShowModifyModal}
        setIsShowModifyModal={setIsShowModifyModal}
        handleSubmitForm={handleSubmitForm}
        modifyData={modifyData}
      />
    </div>
  );
}

export default AfterInjectionPage;

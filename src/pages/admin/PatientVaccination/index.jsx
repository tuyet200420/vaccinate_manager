import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Space, Select, Popconfirm } from "antd";
import * as XLSX from "xlsx";
import moment from "moment";

import * as Icon from "@ant-design/icons";
import ModifyPatientVaccinationModal from "./components/ModifyPatientVaccinationModal";
import ModifyStatusPVModal from "./components/ModifyStatusPVModal";

import {
  getPatientVaccinationListAction,
  getVaccineListAction,
  createPatientVaccinationAction,
  editPatientVaccinationAction,
  deletePatientVaccinationAction,
  getStorageDetailAction,
  getStorageListAction,
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

function PatientVaccinationPage(props) {
  const { Option } = Select;
  const [isShowModifyModal, setIsShowModifyModal] = useState("");
  const [isShowModifyStatusModal, setIsShowModifyStatusModal] = useState("");
  const [modifyData, setModifyData] = useState({});

  const { patientVaccinationList } = useSelector(
    (state) => state.patientVaccinationReducer
  );
  const { vaccineList } = useSelector((state) => state.vaccineReducer);
  const { storageDetail } = useSelector(
    (state) => state.storageReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStorageListAction());
    dispatch(getVaccineListAction());
    dispatch(getPatientVaccinationListAction());
  }, []);

  function handleSubmitForm(values) {
    if (isShowModifyModal === "create") {
      dispatch(
        createPatientVaccinationAction({
          data: values,
        })
      );
    } else {
      dispatch(
        editPatientVaccinationAction({
          id: modifyData._id,
          data: values,
        })
      );
    }
    setIsShowModifyModal("");
    setIsShowModifyStatusModal("");
  }
  const handleExport = () => {
    var wb = XLSX.utils.book_new();
    var vs = XLSX.utils.json_to_sheet(DataExport);
    XLSX.utils.book_append_sheet(wb, vs, "MySheet1");
    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const tableColumn = [
    {
      title: "",
      dataIndex: "code_number",
      align: "center",
      key: "code_number",
    },
    {
      title: "T??n tr???",
      width: 150,
      align: "center",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Gi???i t??nh",
      dataIndex: "gender",
      align: "center",
      width: 80,
      key: "gender",
    },
    {
      title: "Ng??y sinh",
      align: "center",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Ng?????i d??m h???",
      align: "center",
      dataIndex: "guardian",
      key: "guardian",
    },
    {
      title: "SDT li??n h???",
      align: "center",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "?????a ch???",
      align: "center",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "V???c xin",
      dataIndex: "vaccine_id",
      align: "center",
      key: "vaccine_id",
      render: (value) => value && value.name,
    },
    {
      title: "Tr???ng th??i",
      align: "center",
      dataIndex: "status",
      key: "status",
      render: (value) => (
        <>
          <span
            style={{
              background:
                value == "Ch??a ti??m"
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
      title: "Ng??y t???o",
      dataIndex: "createdAt",
      align: "center",
      key: "createdAt",
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ng??y s???a",
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
              onClick={() => {
                setIsShowModifyStatusModal("True");
                dispatch(
                  getStorageDetailAction({
                    id: record.vaccine_id._id,
                  })
                );
                setModifyData({
                  ...record,
                  vaccine_id: record.vaccine_id._id,
                });
              }}
            ></Button>
            <Button
              icon={<Icon.EditOutlined />}
              type="primary"
              ghost
              onClick={() => {
                setIsShowModifyModal("edit");
                setModifyData({
                  ...record,
                  vaccine_id: record.vaccine_id._id,
                });
              }}
            ></Button>
            <Popconfirm
              title="B???n c?? ch???c ch???n mu???n x??a kh??ng?"
              onConfirm={() =>
                dispatch(deletePatientVaccinationAction({ id: record._id }))
              }
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<Icon.DeleteOutlined />}></Button>
            </Popconfirm>
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
  const DataExport = patientVaccinationList.data.map(
    (patientVaccinationItem, patientVaccinationIndex) => {
      return {
        "M?? s??? tr???": patientVaccinationItem.code_number,
        "T??n tr???": patientVaccinationItem.name,
        "Ng??y sinh": patientVaccinationItem.birthday,
        "Gi???i t??nh": patientVaccinationItem.gender,
        "?????a ch???": patientVaccinationItem.address,
        "SDT li??n h???": patientVaccinationItem.phone_number,
        "Ng?????i d??m h???": patientVaccinationItem.guardian,
        "T??nh tr???ng": patientVaccinationItem.status,
      };
    }
  );

  console.log(
    "???? ~ file: index.jsx ~ line 256 ~ patientVaccinationIndex",
    DataExport
  );
  return (
    <div>
      <Style.Title>Qu???n l?? K??? Danh S??ch Ti??m Ch???ng</Style.Title>
      <div style={{ marginBottom: "10px", textAlign: "right" }}>
        <Button
          type="primary"
          onClick={() => {
            setIsShowModifyModal("create");
            setModifyData({
              vaccine_id: "",
              code_number: "",
              name: "",
              address: "",
              gender: "",
              guardian: "", //ng d??m h???
              phone_number: "",
              birthday: moment().format("DD/MM/YYYY"),
              price: 0,
            });
          }}
        >
          Th??m m???i
        </Button>
      </div>
      <span style={{ marginRight: "10px" }}>Ch???n v???c xin:</span>
      <Select
        style={{ width: 400, marginBottom: 10 }}
        size="middle"
        onChange={(value) =>
          dispatch(
            getPatientVaccinationListAction({
              filter: value,
            })
          )
        }
      >
        {optionVaccineList}
      </Select>
      <Button
        type="primary"
        onClick={() => dispatch(getPatientVaccinationListAction())}
      >
        Hi???n th??? t???t c???
      </Button>
      <Button type="primary" ghost onClick={() => handleExport()}>
        Xu???t File EXCEL
      </Button>

      <Style.CustomTable
        scroll={{ x: 1500 }}
        size="small"
        columns={tableColumn}
        dataSource={tableData}
        loading={patientVaccinationList.load}
      />

      <ModifyPatientVaccinationModal
        isShowModifyModal={isShowModifyModal}
        setIsShowModifyModal={setIsShowModifyModal}
        handleSubmitForm={handleSubmitForm}
        modifyData={modifyData}
      />
      <ModifyStatusPVModal
        isShowModifyStatusModal={isShowModifyStatusModal}
        setIsShowModifyStatusModal={setIsShowModifyStatusModal}
        handleSubmitForm={handleSubmitForm}
        modifyData={modifyData}
        storageDetail={storageDetail}
      />
    </div>
  );
}

export default PatientVaccinationPage;

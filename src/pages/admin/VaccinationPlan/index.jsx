import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Space, Popconfirm } from "antd";
import moment from "moment";

import * as Icon from "@ant-design/icons";
import ModifyVaccinationPlanModal from "./components/ModifyVaccinationPlanModal";

// import ModifyCategoryModal from "./components/ModifyCategoryModal";

import {
  getVaccinationPlanListAction,
  createVaccinationPlanAction,
  editVaccinationPlanAction,
  deleteVaccinationPlanAction
} from "../../../redux/actions";

import * as Style from "./styles";

function VaccinationPlanPage(props) {
  const [searchKey, setSearchKey] = useState("");
  const [isShowModifyModal, setIsShowModifyModal] = useState("");
  const [modifyData, setModifyData] = useState({});

  const { vaccinationPlanList } = useSelector((state) => state.vaccinationPlanReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVaccinationPlanListAction());
  }, []);

  // function handleSearchCategory(value) {
  //   setSearchKey(value);
  //   dispatch(
  //     getStorageListAction()
  //   );
  // }
  function handleSubmitForm(values) {
    if (isShowModifyModal === "create") {
      dispatch(
        createVaccinationPlanAction({
          data: values,
        })
      );
    } else {
      dispatch(
        editVaccinationPlanAction({
          id: modifyData._id,
          data: values,
        })
      );
    }
    setIsShowModifyModal("");
  }
  
  const tableColumn = [
    {
      title: "Tên vắc xin",
      dataIndex: "vaccine_id",
      key: "vaccine_id",
      render: (value) => {
        return value?.name;
      },
    },
    {
      title: "Ngày tiêm",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Giờ Tiêm",
      dataIndex: "time",
      key: "time",
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
                setModifyData({
                  ...record,
                  vaccine_id:record.vaccine_id._id
                });
              }}
            >
              Sửa
            </Button>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa không?"
              onConfirm={() =>
                dispatch(deleteVaccinationPlanAction({ id: record._id }))
              }
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<Icon.DeleteOutlined />}>
                Xóa
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const tableData = vaccinationPlanList.data.map((vaccinationPlanItem, vaccinationPlanIndex) => {
    return {
      key: vaccinationPlanIndex,
      ...vaccinationPlanItem,
    };
  });

  return (
    <div>
      <Style.CustomSpaceBox>
        <Style.Title>Quản lý Kế Hoạch Tiêm Chủng</Style.Title>
        <Style.CustomSpace>
          <Style.Search>
            <Input
              placeholder="Tìm kiếm..."
              suffix={<Icon.SearchOutlined />}
              // onChange={(e) => handleSearchCategory(e.target.value)}
            />
          </Style.Search>
          <Button
            type="primary"
            onClick={() => {
              setIsShowModifyModal("create");
              setModifyData({ vaccine_id:"",date:moment().format("DD/MM/YYYY"),time:moment().format("HH:mm:ss") });
            }}
          >
            Thêm mới
          </Button>
        </Style.CustomSpace>
      </Style.CustomSpaceBox>
      <Style.CustomTable
        scroll={{ x: "1000px" }}
        size="small"
        columns={tableColumn}
        dataSource={tableData}
        loading={vaccinationPlanList.load}
      />

      <ModifyVaccinationPlanModal
        isShowModifyModal={isShowModifyModal}
        setIsShowModifyModal={setIsShowModifyModal}
        handleSubmitForm={handleSubmitForm}
        modifyData={modifyData}
      />
    </div>
  );
}

export default VaccinationPlanPage;

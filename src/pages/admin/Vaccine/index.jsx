import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Button, Space, Popconfirm, List, Input } from "antd";
import * as Icon from "@ant-design/icons";
import history from "../../../utils/history";
import moment from "moment";

import { 
  getVaccineListAction,
  deleteVaccineAction
 } from "../../../redux/actions";

import * as Style from "./styles";

function VaccinePage(props) {
  const { vaccineList } = useSelector((state) => state.vaccineReducer);
  const [searchKey, setSearchKey] = useState("");

  // const [isShowUpdateModal, setIsShowUpdateModal] = useState("");
  // const [quantityData, setQuantityData] = useState({});

  const tableColumn = [
    {
      dataIndex: "image",
      key: "image",
      width: 100,
      align: "center",
      render: (value) => (
        <Style.ShowImage
          src={value}
        ></Style.ShowImage>
      ),
    },
    {
      title: "Tên sản phẩm",
      width: 200,
      dataIndex: "name",
      key: "name",
      align: "center",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Nước sản xuất",
      dataIndex: "origin",
      key: "origin",
      width: 150,
      align: "center",
    },
    {
      title: "Độ tuổi sử dụng",
      dataIndex: "age",
      key: "age",
      align: "center",
      width: 150,
      render: (value) => value && `${value.min_age} - ${value.max_age} `,
    },
    {
      title: "Liều lượng",
      dataIndex: "dosage",
      key: "dosage",
      align: "center",
      width: 150,
    },
    {
      title: "Chỉ Định",
      dataIndex: "specify",
      key: "specify",
      align: "center",
      width: 400,
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
      dataIndex: "action",
      align: "center",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            <Button
              icon={<Icon.EditOutlined />}
              type="primary"
              ghost
              onClick={() => {
                // setIsShowUpdateModal(true);
                // setQuantityData(record);
              }}
            ></Button>
            <Button
              icon={<Icon.FormOutlined />}
              type="primary"
              ghost
              onClick={() => {
                // {
                //   dispatch(setProductSelectActionAdmin(record));
                // }
                // console.log(record);
                history.push(`/admin/vaccines/edit/${record._id}`);
              }}
            ></Button>
            <Popconfirm
              title="Are you sure to delete this product?"
              onConfirm={
                () => dispatch(deleteVaccineAction({ id: record._id }))
              }
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<Icon.DeleteOutlined />} danger></Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const tableData = vaccineList.data.map((vaccineItem, vaccineIndex) => {
    return {
      key: vaccineIndex,
      ...vaccineItem,
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVaccineListAction());
  }, []);

  function handleSearchVaccine(value) {
    setSearchKey(value);
    dispatch(
      getVaccineListAction({
        searchKey: value,
      })
    );
  }
  return (
    <div>
      <Style.CustomSpaceBox>
        <Style.Title>Quản lý Vắc Xin</Style.Title>
        <Style.CustomSpace>
          <Style.Search>
            <Input
              style={{}}
              placeholder="Tìm kiếm..."
              suffix={<Icon.SearchOutlined />}
              onChange={(e) => handleSearchVaccine(e.target.value)}
            />
          </Style.Search>
          <Style.CustomButton
            type="primary"
            onClick={() => history.push("/admin/vaccines/create")}
          >
            Thêm mới
          </Style.CustomButton>
        </Style.CustomSpace>
      </Style.CustomSpaceBox>
      <Style.CustomTable
        scroll={{ x: 1700 }}
        columns={tableColumn}
        size="small"
        dataSource={tableData}
        loading={vaccineList.load}
      />

      {/* <UpdateQuantityModel
        isShowUpdateModal={isShowUpdateModal}
        setIsShowUpdateModal={setIsShowUpdateModal}
        handleSubmitForm={handleSubmitForm}
        quantityData={quantityData}
      /> */}
    </div>
  );
}
export default VaccinePage;

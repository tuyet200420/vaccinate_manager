import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Button, Input, Space, Popconfirm } from "antd";
import moment from "moment";

import * as Icon from "@ant-design/icons";

// import ModifyCategoryModal from "./components/ModifyCategoryModal";

import {
  getStorageListAction,
  deleteStorageAction
} from "../../../redux/actions";

import * as Style from "./styles";

function StoragePage(props) {
  const [searchKey, setSearchKey] = useState("");
  const [isShowModifyModal, setIsShowModifyModal] = useState("");
  // const [modifyCategoryData, setModifyCategoryData] = useState({});

  const { storageList } = useSelector((state) => state.storageReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStorageListAction());
  }, []);

  // function handleSearchCategory(value) {
  //   setSearchKey(value);
  //   dispatch(
  //     getStorageListAction()
  //   );
  // }
  // function handleSubmitForm(values) {
  //   if (isShowModifyModal === "create") {
  //     dispatch(
  //       createCategoryAction({
  //         data: values,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       editCategoryAction({
  //         id: modifyCategoryData.id,
  //         data: values,
  //       })
  //     );
  //   }
  //   setIsShowModifyModal("");
  // }
  // function totalQuantityProduct(productData) {
  //   return productData.reduce(
  //     (totalProduct, productItem) =>
  //       productItem.quantity
  //         ? totalProduct + productItem.quantity
  //         : totalProduct,
  //     0
  //   );
  // }
  // function totalSoldProduct(productData) {
  //   return productData.reduce(
  //     (totalProduct, productItem) =>
  //       productItem.sold ? totalProduct + productItem.sold : totalProduct,
  //     0
  //   );
  // }
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
      title: "Tổng số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Đã nhập",
      dataIndex: "quantity_import",
      key: "quantity_import",
    },
    {
      title: "Đã Tiêm",
      dataIndex: "quantity_sold",
      key: "quantity_sold",
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
                // setIsShowModifyModal("edit");
                // setModifyCategoryData(record);
              }}
            >
              Thêm số lượng
            </Button>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa không?"
              onConfirm={() =>
                dispatch(deleteStorageAction({ id: record._id }))
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

  const tableData = storageList.data.map((storageItem, storageIndex) => {
    return {
      key: storageIndex,
      ...storageItem,
    };
  });

  return (
    <div>
      <Style.CustomSpaceBox>
        <Style.Title>Quản lý Kho Vắc Xin</Style.Title>
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
            // onClick={() => {
            //   setIsShowModifyModal("create");
            //   setModifyCategoryData({ name: "", price: 0 });
            // }}
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
        loading={storageList.load}
      />

      {/* <ModifyCategoryModal
        isShowModifyModal={isShowModifyModal}
        setIsShowModifyModal={setIsShowModifyModal}
        handleSubmitForm={handleSubmitForm}
        modifyCategoryData={modifyCategoryData}
      /> */}
    </div>
  );
}

export default StoragePage;

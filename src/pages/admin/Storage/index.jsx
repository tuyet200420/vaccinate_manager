import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Button, Input, Space, Popconfirm } from "antd";
import moment from "moment";

import * as Icon from "@ant-design/icons";

import ModifyStorageModal from "./components/ModifyStorageModal";

import {
  getStorageListAction,
  deleteStorageAction,
  createStorageAction,
  editStorageAction,
  getStorageDetailAction
} from "../../../redux/actions";

import * as Style from "./styles";

function StoragePage(props) {
  const [searchKey, setSearchKey] = useState("");
  const [isShowModifyModal, setIsShowModifyModal] = useState("");
  const [modifyStorageData, setModifyStorageData] = useState({});


  const { storageList,storageDetail} = useSelector((state) => state.storageReducer);

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
  function handleSubmitForm(values) {
    if (isShowModifyModal === "create") {
      dispatch(
        createStorageAction({
          data: {
            vaccine_id: values.vaccine_id,
            quantity:values.add_quantity,
            quantity_import: values.add_quantity
          },
        })
      );
    } else {
      dispatch(
        editStorageAction({
          id: modifyStorageData._id,
          data: {
            vaccine_id: values.vaccine_id,
            quantity: values.add_quantity + modifyStorageData.quantity ,
            quantity_import: values.add_quantity + modifyStorageData.quantity_import,
            quantity_sold : modifyStorageData.quantity_sold
          },
        })
      );
    }
    setIsShowModifyModal("");
  }
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
      title: "T??n v???c xin",
      dataIndex: "vaccine_id",
      key: "vaccine_id",
      render: (value) => {
        return value?.name;
      },
    },
    {
      title: "T???ng s??? l?????ng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Nh???p",
      dataIndex: "quantity_import",
      key: "quantity_import",
    },
    {
      title: "???? Ti??m",
      dataIndex: "quantity_sold",
      key: "quantity_sold",
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
      render: (_, record) => {
        return (
          <Space>
            <Button
              icon={<Icon.FormOutlined />}
              type="primary"
              ghost
              onClick={() => {
                setIsShowModifyModal("edit");
                setModifyStorageData({
                  ...record,
                  vaccine_id:record.vaccine_id._id
                });
              }}
            >
              Th??m s??? l?????ng
            </Button>
            <Popconfirm
              title="B???n c?? ch???c ch???n mu???n x??a kh??ng?"
              onConfirm={() =>
                dispatch(deleteStorageAction({ id: record._id }))
              }
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<Icon.DeleteOutlined />}>
                X??a
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
        <Style.Title>Qu???n l?? Kho V???c Xin</Style.Title>
        <Style.CustomSpace>
          <Style.Search>
            <Input
              placeholder="T??m ki???m..."
              suffix={<Icon.SearchOutlined />}
              // onChange={(e) => handleSearchCategory(e.target.value)}
            />
          </Style.Search>
          <Button
            type="primary"
            onClick={() => {
              setIsShowModifyModal("create");
              setModifyStorageData({ vaccine_id: "", quantity: 0 });
            }}
          >
            Th??m m???i
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

      <ModifyStorageModal
        isShowModifyModal={isShowModifyModal}
        setIsShowModifyModal={setIsShowModifyModal}
        handleSubmitForm={handleSubmitForm}
        modifyStorageData={modifyStorageData}
      />
    </div>
  );
}

export default StoragePage;

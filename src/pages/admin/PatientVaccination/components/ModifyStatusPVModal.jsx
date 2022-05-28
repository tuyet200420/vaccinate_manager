import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Select, Button } from "antd";

import {
  editStorageAction,
} from "../../../../redux/actions";

function ModifyStatusPVModal({
  isShowModifyStatusModal,
  setIsShowModifyStatusModal,
  handleSubmitForm,
  modifyData,
  storageDetail
}) {

  const { Option } = Select;
  const [modifyForm] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isShowModifyStatusModal) {
      modifyForm.resetFields();
    }
  }, [isShowModifyStatusModal]);

  console.log(storageDetail)
  

  // console.log(storageDetail);

  return (
    <Modal
      title="Trạng Thái"
      visible={!!isShowModifyStatusModal}
      onCancel={() => setIsShowModifyStatusModal("")}
      footer={[
        <Button key="back" onClick={() => setIsShowModifyStatusModal("")}>
          Hủy
        </Button>,
        <Button key="back" type="primary" onClick={() => modifyForm.submit()}>
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={modifyForm}
        name="modify-form"
        initialValues={modifyData}
        onFinish={(values) => {
          if (values.status == "Đã tiêm"){
            dispatch(
              editStorageAction({
                id: storageDetail.data._id,
                data: {
                  vaccine_id: storageDetail.data.vaccine_id._id,
                  quantity: storageDetail.data.quantity - 1 ,
                  quantity_import: storageDetail.data.quantity_import,
                  quantity_sold : storageDetail.data.quantity_sold + 1
                },
              })
            );
          }
          else{
            dispatch(
              editStorageAction({
                id: storageDetail.data._id,
                data: {
                  vaccine_id: storageDetail.data.vaccine_id._id,
                  quantity: storageDetail.data.quantity + 1 ,
                  quantity_import: storageDetail.data.quantity_import,
                  quantity_sold : storageDetail.data.quantity_sold - 1
                },
              })
            );
          }

          handleSubmitForm({
            ...modifyData,
            status: values.status,
          });
        }}
      >
        <Form.Item
          name="status"
          rules={[{ required: true, message: "Bạn chưa chọn trạng thái" }]}
        >
          <Select placeholder="Chọn trạng thái">
            <Option value="Chưa tiêm">Chưa tiêm</Option>
            <Option value="Đã tiêm">Đã tiêm</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModifyStatusPVModal;

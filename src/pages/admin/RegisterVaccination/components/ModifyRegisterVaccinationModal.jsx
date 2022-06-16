import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Select, Button, Input } from "antd";

import { editStorageAction } from "../../../../redux/actions";

function ModifyRegisterVaccinationModal({
  isShowModifyModal,
  setIsShowModifyModal,
  handleSubmitForm,
  modifyData,
  storageDetail
}) {
  const { Option } = Select;
  const [modifyForm] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isShowModifyModal) {
      modifyForm.resetFields();
    }
  }, [isShowModifyModal]);

  return (
    <Modal
      title={"Thay đổi quyền"}
      visible={!!isShowModifyModal}
      onCancel={() => setIsShowModifyModal("")}
      footer={[
        <Button key="back" onClick={() => setIsShowModifyModal("")}>
          Hủy
        </Button>,
        <Button key="back" type="primary" onClick={() => modifyForm.submit()}>
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={modifyForm}
        name="modify-RegisterVaccination"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={modifyData}
        onFinish={(values) => {
          if (values.status == "Đã tiêm") {
            dispatch(
              editStorageAction({
                id: storageDetail.data._id,
                data: {
                  vaccine_id: storageDetail.data.vaccine_id._id,
                  quantity: storageDetail.data.quantity - 1,
                  quantity_import: storageDetail.data.quantity_import,
                  quantity_sold: storageDetail.data.quantity_sold + 1,
                },
              })
            );
          }
          handleSubmitForm({
            ...modifyData,
            ...values,
          });
        }}
      >
        <Form.Item label="Tên:" name="name" disabled>
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="Trạng Thái: "
          name="status"
          rules={[{ required: true, message: "Bạn chưa chọn trạng thái" }]}
        >
          <Select placeholder="select your status">
            <Option value="Chờ duyệt">Chờ duyệt</Option>
            <Option value="Chờ tiêm">Chờ tiêm</Option>
            <Option value="Đã tiêm">Đã tiêm</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModifyRegisterVaccinationModal;

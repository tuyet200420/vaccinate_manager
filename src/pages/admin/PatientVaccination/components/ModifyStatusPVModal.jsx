import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  Form,
  Select,
  Button
} from "antd";

function ModifyStatusPVModal({
  isShowModifyStatusModal,
  setIsShowModifyStatusModal,
  handleSubmitForm,
  modifyData,
}) {
  const { Option } = Select;
  const [modifyForm] = Form.useForm();

  useEffect(() => {
    if (isShowModifyStatusModal) {
      modifyForm.resetFields();
    }
  }, [isShowModifyStatusModal]);


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
        onFinish={(values) =>{
          handleSubmitForm({
            ...modifyData,
            status:values.status
          })
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

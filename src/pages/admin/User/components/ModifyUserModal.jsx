import { useEffect } from "react";
import { Modal, Form, Select, Button, Input } from "antd";

function ModifyUserModal({
  isShowModifyModal,
  setIsShowModifyModal,
  handleSubmitForm,
  modifyData,
}) {
  const { Option } = Select;
  const [modifyForm] = Form.useForm();

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
        name="modify-user"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={modifyData}
        onFinish={
          (values) => handleSubmitForm({
            ...modifyData,
            ...values
          })
        }
      >
        <Form.Item label="Tên:" name="name" disabled>
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="Quyền: "
          name="role"
          rules={[{ required: true, message: "Bạn chưa chọn quyền" }]}
        >
          <Select placeholder="select your role">
            <Option value="User">User</Option>
            <Option value="Admin">Admin</Option>
            <Option value="NV Y Tế">Nhân viên y tế</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModifyUserModal;

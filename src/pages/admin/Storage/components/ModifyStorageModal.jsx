import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, InputNumber, Select, Button } from "antd";

import { getVaccineListAction } from "../../../../redux/actions";

function ModifyStorageModal({
  isShowModifyModal,
  setIsShowModifyModal,
  handleSubmitForm,
  modifyStorageData
}) {
  const { Option } = Select;
  const [modifyStorageForm] = Form.useForm();
  const { vaccineList } = useSelector((state) => state.vaccineReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVaccineListAction());
  }, []);

  useEffect(() => {
    if (isShowModifyModal) {
      modifyStorageForm.resetFields();
    }
  }, [isShowModifyModal]);

  function renderOptionVaccine() {
    return vaccineList.data.map((vaccineItem, vaccineIndex) => {
      return <Option value={vaccineItem._id}>{vaccineItem.name}</Option>;
    });
  }

  return (
    <Modal
      title={isShowModifyModal === "create" ? "Thêm mới" : "Thêm số lượng"}
      visible={!!isShowModifyModal}
      onCancel={() => setIsShowModifyModal("")}
      footer={[
        <Button key="back" onClick={() => setIsShowModifyModal("")}>
          Hủy
        </Button>,
        <Button
          key="back"
          type="primary"
          onClick={() => modifyStorageForm.submit()}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={modifyStorageForm}
        name="modify-storage"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={modifyStorageData}
        onFinish={(values) => handleSubmitForm(values)}
      >
        <Form.Item
          label="Tên Vắc xin"
          name="vaccine_id"
          rules={[{ required: true, message: "Bạn chưa chọn Tên Vắc xin" }]}
        >
          <Select 
          disabled={isShowModifyModal === "edit" ? true : false}
          >{renderOptionVaccine()}</Select>
        </Form.Item>
        <Form.Item
          label="Số lượng: "
          name="add_quantity"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <InputNumber defaultValue={0} />

        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModifyStorageModal;

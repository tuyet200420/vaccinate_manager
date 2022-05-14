import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Modal,
  Form,
  DatePicker,
  TimePicker,
  Select,
  Button,
  InputNumber,
} from "antd";
import moment from "moment";

import { getVaccineListAction } from "../../../../redux/actions";

function ModifyPatientVaccinationModal({
  isShowModifyModal,
  setIsShowModifyModal,
  handleSubmitForm,
  modifyData,
}) {
  const { Option } = Select;
  const [modifyForm] = Form.useForm();
  const { vaccineList } = useSelector((state) => state.vaccineReducer);

  const dateFormat = "YYYY/MM/DD";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVaccineListAction());
  }, []);

  useEffect(() => {
    if (isShowModifyModal) {
      modifyForm.resetFields();
    }
  }, [isShowModifyModal]);

  function renderOptionVaccine() {
    return vaccineList.data.map((vaccineItem, vaccineIndex) => {
      return <Option value={vaccineItem._id}>{vaccineItem.name}</Option>;
    });
  }

  return (
    <Modal
      title={isShowModifyModal === "create" ? "Thêm mới" : "Chỉnh sửa"}
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
        name="modify-form"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={modifyData}
        onFinish={(values) =>{
          const  {dateNew, ...value}= values;
          console.log(value)
          handleSubmitForm({
            ...value,
            birthday:modifyData.birthday
          })
        }}
      >
        <Form.Item
          label="Tên Vắc xin"
          name="vaccine_id"
          rules={[{ required: true, message: "Bạn chưa chọn Tên Vắc xin" }]}
        >
          <Select >
            {renderOptionVaccine()}
          </Select>
        </Form.Item>
        <Form.Item
          label="Mã số trẻ: "
          name="code_number"
          rules={[{ required: true, message: "Bạn chưa nhập mã trẻ" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Họ tên trẻ: "
          name="name"
          rules={[{ required: true, message: "Bạn chưa nhập Tên" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giới tính: "
          name="gender"
          rules={[{ required: true, message: "Bạn chưa chọn giới tính" }]}
        >
          <Select placeholder="select your gender">
            <Option value="Nam">Nam</Option>
            <Option value="Nữ">Nữ</Option>
            <Option value="Khác">Khác</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Ngày sinh: " name="dateNew">
          <DatePicker
            defaultValue={moment(modifyData.birthday, dateFormat)}
            format={dateFormat}
            onChange={(date, dateString) => {
              modifyData.birthday = dateString;
            }}
          />
        </Form.Item>
        <Form.Item
          label="Địa chỉ: "
          name="address"
          rules={[{ required: true, message: "Bạn chưa nhập Địa chỉ" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Người dám hộ: "
          name="guardian"
          rules={[{ required: true, message: "Bạn chưa nhập tên người dám hộ" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="SDT NDH: "
          name="phone_number"
          rules={[{ required: true, message: "Bạn chưa nhập số điện thoại" }]}
        >
          <InputNumber defaultValue={parseInt(modifyData.phone_number)}/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModifyPatientVaccinationModal;

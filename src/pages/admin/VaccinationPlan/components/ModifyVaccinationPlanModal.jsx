import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, DatePicker,TimePicker, Select, Button } from "antd";
import moment from "moment";

import { getVaccineListAction } from "../../../../redux/actions";

function ModifyVaccinationPlanModal({
  isShowModifyModal,
  setIsShowModifyModal,
  handleSubmitForm,
  modifyData
}) {
  const { Option } = Select;
  const [modifyForm] = Form.useForm();
  const { vaccineList } = useSelector((state) => state.vaccineReducer);

  const dateFormat = 'YYYY/MM/DD';
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
        <Button
          key="back"
          type="primary"
          onClick={() => modifyForm.submit()}
        >
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
        onFinish={(values) => handleSubmitForm({
          ...modifyData,
          vaccine_id: values.vaccine_id
        })}
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
          label="Ngày tiêm: "
          name="dateNew"
        >
          <DatePicker
            defaultValue={moment(modifyData.date, dateFormat)} 
            format={dateFormat} 
            onChange={(date,dateString)=>{
              modifyData.date = dateString
            }}
            />
        </Form.Item>
        <Form.Item
          label="Giờ tiêm: "
          name="timeNew"
        >
          <TimePicker 
            defaultValue={moment(modifyData.time, 'HH:mm:ss')} 
            onChange={(time,timeString)=>{
              modifyData.time = timeString
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModifyVaccinationPlanModal;

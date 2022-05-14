import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Modal,
  Form,
  DatePicker,
  Radio,
  Select,
  Button,
  InputNumber,
} from "antd";
import moment from "moment";

import { getVaccineListAction } from "../../../../redux/actions";

function ModifyAfterInjectionModal({
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
      title="Triệu chứng sau tiêm"
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
          label="Mã số trẻ: "
          name="code_number"
          rules={[{ required: true, message: "Bạn chưa nhập mã trẻ" }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Họ tên trẻ: "
          name="name"
          rules={[{ required: true, message: "Bạn chưa nhập Tên" }]}
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item name="cough" label="Ho">
        <Radio.Group>
          <Radio value={1}>Có</Radio>
          <Radio value={0}>Không</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="fever" label="Nóng lạnh">
        <Radio.Group>
          <Radio value={1}>Có</Radio>
          <Radio value={0}>Không</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="spew" label="Ói mửa">
        <Radio.Group>
          <Radio value={1}>Có</Radio>
          <Radio value={0}>Không</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="breath_heavily" label="Khó thở">
        <Radio.Group>
          <Radio value={1}>Có</Radio>
          <Radio value={0}>Không</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="convulsions" label="Co giật">
        <Radio.Group>
          <Radio value={1}>Có</Radio>
          <Radio value={0}>Không</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="note" label="Khác">
        <Input.TextArea />
      </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModifyAfterInjectionModal;

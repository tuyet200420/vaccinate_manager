import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import SunEditor from "suneditor-react";
import {
  Form,
  Row,
  Space,
  Input,
  Button,
  InputNumber,
  Col,
  Upload,
  Select,
} from "antd";
import * as Icon from "@ant-design/icons";
import "suneditor/dist/css/suneditor.min.css";

import {
  getVaccineDetailAction,
  createVaccineAction,
  editVaccineAction,
} from "../../../redux/actions";

import history from "../../../utils/history";
import * as Style from "./styles";

const ORIGIN = [
  {
    name: "Bỉ",
  },
  {
    name: "Mĩ",
  },
  {
    name: "Việt Nam",
  },
  {
    name: "Nhật Bản",
  },
  {
    name: "Hàn Quốc",
  },
  {
    name: "Pháp",
  },
  {
    name: "Cu Ba",
  },
  {
    name: "Canada",
  },
  {
    name: "Ấn Độ",
  },
  {
    name: "Hà Lan",
  },
];

function ModifyVaccine({ action, match }) {
  const { Option } = Select;
  const vaccineId = match.params?.id;
  const [vaccineForm] = Form.useForm();

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const dispatch = useDispatch();
  const { vaccineDetail } = useSelector((state) => state.vaccineReducer);
  console.log(vaccineDetail);

  useEffect(() => {
    if (vaccineId) {
      dispatch(getVaccineDetailAction({ id: vaccineId }));
    }
  }, [vaccineId]);
  useEffect(
    () => {
      vaccineForm.resetFields();
    },
    [vaccineDetail.data],
    [vaccineId]
  );

  function renderOptionOrigin() {
    return ORIGIN.map((originItem, originIndex) => {
      return <Option value={originItem.name}>{originItem.name}</Option>;
    });
  }

  const uploadImage = (options) => {
    const { onSuccess, onError, file } = options;

    const fmData = new FormData();

    fmData.append("image", file);

    axios
      .post(
        "http://localhost:3001/uploadfile",

        fmData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((data) => {
        onSuccess("Ok");
        vaccineForm.setFieldsValue({
          image: `http://localhost:3001/img/${data.data.filename}`,
        });
        // console.log();
      })
      .catch((error) => {
        const errorMSG = new Error("Some error");
        onError({ errorMSG });
      });
  };

  function submitFromVaccine() {
    const values = vaccineForm.getFieldsValue();
    const { min_age, max_age, ...valueNew } = values;
    // const valueNewm = {
    //   ...valueNew,
    //   age: {
    //     min_age:min_age,
    //     max_age:max_age,
    //   },
    // };
    // console.log(valueNewm)
    vaccineId
      ? dispatch(
          editVaccineAction({
            id: vaccineId,
            data: {
              ...valueNew,
              age: {
                min_age: min_age,
                max_age: max_age,
              },
            },
          })
        )
      : dispatch(
          createVaccineAction({
            data: {
              ...valueNew,
              age: {
                min_age: min_age,
                max_age: max_age,
              },
            },
          })
        );
    history.push("/admin/vaccines");
  }

  return (
    <>
      <Style.Container>
        <Style.CustomSpaceBox>
          <Style.Title>{vaccineId ? "Sửa" : "Thêm"} Sản Phẩm</Style.Title>
          <Space>
            <Button type="default" onClick={() => history.goBack()}>
              Hủy
            </Button>
            <Button type="primary" onClick={() => submitFromVaccine()}>
              Lưu
            </Button>
          </Space>
        </Style.CustomSpaceBox>
        <Row>
          <Col xl={{ span: 20 }}>
            <Form
              layout="vertical"
              form={vaccineForm}
              className="form"
              name="basic"
              labelCol={{ span: 4 }}
              initialValues={vaccineId ? vaccineDetail.data : {}}
              onFinish={submitFromVaccine}
            >
              <Form.Item
                name="image"
                label="Hình ảnh"
                valuePropName="image"
                rules={[{ required: true, message: "bạn chưa chọn ảnh!" }]}
                getValueFromEvent={normFile}
              >
                <Upload
                  maxCount={1}
                  name="image"
                  listType="picture"
                  customRequest={uploadImage}
                  defaultFileList={[
                    {
                      uid: "-1",
                      name: "image",
                      status: "done",
                      url: vaccineForm.getFieldValue("image"),
                      thumbUrl: vaccineForm.getFieldValue("image"),
                    },
                  ]}
                >
                  <Button icon={<Icon.UploadOutlined />}>
                    Click to upload
                  </Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label="Tên Vắc Xin"
                name="name"
                rules={[
                  { required: true, message: "bạn chưa nhập tên vắc xin!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Liều lượng"
                name="dosage"
                rules={[
                  { required: true, message: "bạn chưa nhập liều lượng!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Nơi sản xuất"
                name="origin"
                rules={[
                  { required: true, message: "Bạn chưa chọn nơi sản xuất" },
                ]}
              >
                <Select>{renderOptionOrigin()}</Select>
              </Form.Item>
              <Form.Item
                label="Chỉ định"
                name="specify"
                rules={[{ required: true, message: "bạn chưa nhập Chỉ định!" }]}
              >
                <Input.TextArea rows={3} />
              </Form.Item>
              <Row>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    label="Tuổi nhỏ nhất"
                    name="min_age"
                    rules={[
                      { required: true, message: "bạn chưa độ tuổi nhỏ nhất!" },
                    ]}
                  >
                    <InputNumber
                      defaultValue={
                        vaccineId
                          ? parseInt(vaccineDetail?.data?.age?.min_age)
                          : "0"
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Tuổi lớn nhất"
                    labelCol={{ span: 24 }}
                    name="max_age"
                    rules={[
                      { required: true, message: "bạn chưa độ tuổi lớn nhất!" },
                    ]}
                  >
                    <InputNumber
                      defaultValue={
                        vaccineId
                          ? parseInt(vaccineDetail?.data?.age?.max_age)
                          : "0"
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Mô tả"
                name="description"
                rules={[{ required: true, message: "Bạn chưa nhập mô tả!" }]}
              >
                <SunEditor
                  setOptions={{
                    height: 300,
                    font: [
                      "Poppins",
                      "Segoe UI",
                      "Arial",
                      "tohoma",
                      "Courier New,Courier",
                    ],
                    buttonList: [
                      ["font", "formatBlock", "fontSize"],
                      [
                        "bold",
                        "underline",
                        "italic",
                        "strike",
                        "subscript",
                        "superscript",
                      ],
                      [
                        "fontColor",
                        "hiliteColor",
                        "outdent",
                        "indent",
                        "align",
                        "list",
                        "table",
                      ],
                      ["link", "image"],
                    ],
                    defaultStyle: `font-family: 'poppins', 'Aria', sans-serif; font-size: 14px;`,
                  }}
                  defaultValue={
                    vaccineId ? vaccineDetail?.data?.description : ""
                  }
                  onChange={(value) =>
                    vaccineForm.setFieldsValue({ description: value })
                  }
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Style.Container>
    </>
  );
}
export default ModifyVaccine;

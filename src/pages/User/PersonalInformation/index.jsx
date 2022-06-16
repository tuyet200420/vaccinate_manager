import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import ImgCrop from "antd-img-crop";
import {
  DatePicker,
  Form,
  Select,
  notification,
  Button,
  Input,
  Col,
  Row,
  Upload,
} from "antd";
import banner from "../../../assets/images/banner.jpg";
import axios from "axios";
import user from "../../../assets/images/user.png";
import moment from "moment";

import * as Icon from "@ant-design/icons";

import { editUserAction } from "../../../redux/actions";

import * as Style from "./styles";

function PersonalInformationPage(props) {
  const { userDetail } = useSelector((state) => state.userReducer);
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dateFormat = "YYYY/MM/DD";
  const [birthday, setBirthday] = useState();
  const [userForm] = Form.useForm();

  const [location, setLocation] = useState({
    cities: [],
    districts: [],
    wards: [],
  });
  const [locationSelect, setLocationSelect] = useState({
    city: "",
    district: "",
    ward: "",
  });
  useEffect(() => {
    const getLocation = async () => {
      setLoading(true);
      const wards = await axios.get(
        "https://location-api-vn.herokuapp.com/wards"
      );
      const districts = await axios.get(
        "https://location-api-vn.herokuapp.com/districts"
      );
      const cities = await axios.get(
        "https://location-api-vn.herokuapp.com/cities"
      );
      setLocation({
        wards: wards.data,
        districts: districts.data,
        cities: cities.data,
      });
      setLoading(false);
    };
    getLocation();
  }, []);

  const handleChageCity = (value) => {
    setLocationSelect({
      ...locationSelect,
      city: value,
    });
  };
  const handleChageDistrict = (value) => {
    setLocationSelect({
      ...locationSelect,
      district: value,
    });
  };
  const handleChageWard = (value) => {
    setLocationSelect({
      ...locationSelect,
      ward: value,
    });
  };
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const handleSubmitForm = (value) => {
    dispatch(
      editUserAction({
        id: userDetail.data._id,
        data: {
          ...value,
        },
      })
    );
    notification.success({
      message: "Cập nhật thành công!",
    });
  };
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        <Style.Banner img={banner}>
          <div>
            <h1>CHỈNH SỬA THÔNG TIN CÁ NHÂN</h1>
          </div>
        </Style.Banner>
        <Style.Container>
          <div>
            <img src={user} alt="" width="300px" />
            
          </div>
          <div className="form-box">
            <Form
              form={userForm}
              name="modify-user"
              layout="vertical"
              initialValues={userDetail.data}
              onFinish={(values) => {
                const { dateNew, dateTarget, ...value } = values;
                if (userDetail.data._id) {
                  handleSubmitForm({
                    ...value,
                    _id: userDetail.data._id,
                    birthday: birthday,
                    address:
                      value.address +
                      " - " +
                      location.wards.find((ward) => ward.code === value.ward)
                        .name +
                      " - "+
                      location.districts.find(
                        (district) => district.code === value.district
                      ).name +
                      " - "+
                      location.cities.find((city) => city.code === value.city)
                        .name,
                  });
                }
              }}
            >
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item
                    label="Tên:"
                    name="name"
                    rules={[{ required: true, message: "Bạn chưa nhập tên" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Số điện thoại:" name="phone_number">
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item
                    label="Giới tính: "
                    name="gender"
                    rules={[
                      { required: true, message: "Bạn chưa chọn giới tính" },
                    ]}
                  >
                    <Select placeholder="select your gender">
                      <Option value="Nam">Nam</Option>
                      <Option value="Nữ">Nữ</Option>
                      <Option value="Khác">Khác</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Ngày sinh: "
                    name="dateNew"
                    Style={{ width: "100%" }}
                  >
                    <DatePicker
                      defaultValue={moment(
                        userDetail.data.birthday,
                        dateFormat
                      )}
                      style={{ width: "100%" }}
                      format={dateFormat}
                      onChange={(date, dateString) => {
                        setBirthday(dateString);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={12}>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item label="Tỉnh-Thành phố" name="city">
                    <Select
                      placeholder="Chọn tỉnh thành phố"
                      onChange={handleChageCity}
                      allowClear
                    >
                      {location.cities.map((city, cityIndex) => {
                        return (
                          <Select.Option key={cityIndex} value={city.code}>
                            {city.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item label="Quận-Huyện" name="district">
                    <Select
                      placeholder="Chọn quận huyện"
                      onChange={handleChageDistrict}
                      allowClear
                    >
                      {location.districts
                        .filter(
                          (district, districtIndex) =>
                            district.parentcode === locationSelect.city
                        )
                        .map((districtItem, districtIndex) => {
                          return (
                            <Select.Option
                              key={districtIndex}
                              value={districtItem.code}
                            >
                              {districtItem.name}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item label="Phường-Xã" name="ward">
                    <Select
                      placeholder="Chọn phường xã"
                      onChange={handleChageWard}
                      allowClear
                    >
                      {location.wards
                        .filter(
                          (ward, wardIndex) =>
                            ward.parentcode === locationSelect.district
                        )
                        .map((wardItem, wardIndex) => {
                          return (
                            <Select.Option
                              key={wardIndex}
                              value={wardItem.code}
                            >
                              {wardItem.name}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={24}>
                  <Form.Item
                    label="Địa chỉ cụ thể"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập địa chỉ cụ thể!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <Button
                type="primary"
                htmlType="button"
                size="large"
                style={{
                  fontSize: "18px",
                  borderRadius: 8,
                  background: "#1f28af",
                }}
                onClick={() => {
                  userForm.submit();
                }}
              >
                Cập nhật thông tin
              </Button>
            </div>
          </div>
        </Style.Container>
      </div>
    );
  }
}

export default PersonalInformationPage;

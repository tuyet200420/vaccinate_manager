import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Input,
  Row,
  Form,
  DatePicker,
  Col,
  Select,
  Space,
  Button,
  InputNumber,
} from "antd";
import moment from "moment";
import history from "../../../utils/history";

import banner from "../../../assets/images/banner.jpg";
import xetnghiem from "../../../assets/images/xetnghiem.jpg";

import * as Icon from "@ant-design/icons";

import {
  getVaccinationPlanListAction,
  getVaccineListAction,
  createRegisterVaccinationAction,
} from "../../../redux/actions";
import * as Style from "./styles";

function RegisterVaccinePage(props) {
  const { Option } = Select;
  const [registerForm] = Form.useForm();
  const { vaccineList } = useSelector((state) => state.vaccineReducer);
  const [loading, setLoading] = useState(false);
  const [targetDate, setTargetDate] = useState();
  const [birthday, setBirthday] = useState();
  const [location, setLocation] = useState({
    cities: [],
    districts: [],
    wards: [],
  });
  const { userDetail } = useSelector((state) => state.userReducer);
  const [locationSelect, setLocationSelect] = useState({
    city: "",
    district: "",
    ward: "",
  });
  const dispatch = useDispatch();
  const dateFormat = "YYYY/MM/DD";

  useEffect(() => {
    dispatch(getVaccinationPlanListAction());
    dispatch(getVaccineListAction());
  }, []);
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

  function renderOptionVaccine() {
    return vaccineList.data.map((vaccineItem, vaccineIndex) => {
      return <Option value={vaccineItem._id}>{vaccineItem.name}</Option>;
    });
  }
  function handleSubmitForm(data) {
    dispatch(createRegisterVaccinationAction({ data: data }));
  }

  return (
    <div>
      <Style.Banner img={banner}>
        <div>
          <h1>ĐĂNG KÝ TIÊM VẮC XIN</h1>
        </div>
      </Style.Banner>
      <Row>
        <Col span={18}>
          <Style.ContainerForm>
            <Form
              form={registerForm}
              name="modify-form"
              layout="vertical"
              size="large"
              onFinish={(values) => {
                const { dateNew, dateTarget, ...value } = values;
                if (userDetail.data._id) {
                  handleSubmitForm({
                    ...value,
                    user_id: userDetail.data._id,
                    birthday: birthday,
                    target_date: targetDate,
                    address:
                      value.address +
                      " - " +
                      location.wards.find((ward) => ward.code === value.ward)
                        .name +
                      " - " +
                      location.districts.find(
                        (district) => district.code === value.district
                      ).name +
                      " - " +
                      location.cities.find((city) => city.code === value.city)
                        .name,
                  });
                } else {
                  history.push({
                    pathname: "/login",
                    state: {
                      prevPath: history.location.pathname,
                    },
                  });
                }
              }}
            >
              <div className="title">
                <h2>Thông tin người tiêm</h2>
              </div>
              <Row>
                <Col span={12}>
                  <Form.Item label="Mã số trẻ (Nếu có): " name="code_number">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Họ tên trẻ: "
                    name="name"
                    rules={[{ required: true, message: "Bạn chưa nhập Tên" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Giới tính: "
                    name="gender"
                    rules={[
                      { required: true, message: "Bạn chưa chọn giới tính" },
                    ]}
                  >
                    <Select placeholder="Chọn giới tính">
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
                    rules={[
                      { required: true, message: "Bạn chưa nhập ngày sinh" },
                    ]}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      format={dateFormat}
                      onChange={(date, dateString) => {
                        setBirthday(dateString);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item
                    label="Tỉnh-Thành phố"
                    name="city"
                   
                  >
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
                  <Form.Item
                    label="Quận-Huyện"
                    name="district"
                    
                  >
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
                  <Form.Item
                    label="Phường-Xã"
                    name="ward"
                    
                  >
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
              <h2>Thông tin liên hệ</h2>
              <Form.Item
                label="Họ và tên người dám hộ: "
                name="guardian"
                rules={[
                  { required: true, message: "Bạn chưa nhập tên người dám hộ" },
                ]}
              >
                <Input />
              </Form.Item>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Mối liên hệ với người tiêm: "
                    name="relationship_guardian"
                  >
                    <Select placeholder="Chọn mối liên hệ">
                      <Option value="mẹ">mẹ</Option>
                      <Option value="cha">cha</Option>
                      <Option value="anh">anh</Option>
                      <Option value="chị">chị</Option>
                      <Option value="họ hàng">họ hàng</Option>
                      <Option value="Khác">Khác</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="SDT NDH: "
                    name="phone_number"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập số điện thoại",
                      },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <h2>Thông tin dịch vụ</h2>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Tên Vắc xin"
                    name="vaccine_id"
                    rules={[
                      { required: true, message: "Bạn chưa chọn Tên Vắc xin" },
                    ]}
                  >
                    <Select>{renderOptionVaccine()}</Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Ngày mong muốn tiêm: "
                    name="dateTarget"
                    Style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa chọn ngày mong muốn",
                      },
                    ]}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      format={dateFormat}
                      onChange={(date, dateString) => {
                        setTargetDate(dateString);
                      }}
                    />
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
                  // console.log("ok")
                  registerForm.submit();
                }}
              >
                Hoàn thành đăng ký
              </Button>
            </div>
          </Style.ContainerForm>
        </Col>
        <Col span={6}>
          <Style.BgDatlich>
            <Row>
              <Col span={24}>
                <div className="bg_title">Đăng Ký Thông tin tiêm chủng</div>
              </Col>
              <Col span={24}>
                <div className="bg_title">Tra cứu lịch sử tiêm chủng</div>
              </Col>
              <Col span={24}>
                <div className="bg_title">Câu hỏi thường gặp</div>
              </Col>
            </Row>
            <div className="nano">
              <Row>
                <Col span={24}>
                  <Space>
                    <img src={xetnghiem} alt="" width="100px" height="100px" />
                    <div>
                      <p>Sùi mào gà nguy hiểm như thế nào?</p>
                      <p>
                        Thưa bác sĩ, bệnh sùi mào gà gây ra hậu quả gì? Em đang
                        mang thai, mắc sùi mào gà thì có ảnh hưởng như thế nào
                        đến sức khỏe thai nhi? Mong bác sĩ giải…
                      </p>
                    </div>
                  </Space>
                </Col>
                <Col span={24}>
                  <Space>
                    <img src={xetnghiem} alt="" width="100px" height="100px" />
                    <div>
                      <p>Sùi mào gà nguy hiểm như thế nào?</p>
                      <p>
                        Thưa bác sĩ, bệnh sùi mào gà gây ra hậu quả gì? Em đang
                        mang thai, mắc sùi mào gà thì có ảnh hưởng như thế nào
                        đến sức khỏe thai nhi? Mong bác sĩ giải…
                      </p>
                    </div>
                  </Space>
                </Col>
                <Col span={24}>
                  <Space>
                    <img src={xetnghiem} alt="" width="100px" height="100px" />
                    <div>
                      <p>Sùi mào gà nguy hiểm như thế nào?</p>
                      <p>
                        Thưa bác sĩ, bệnh sùi mào gà gây ra hậu quả gì? Em đang
                        mang thai, mắc sùi mào gà thì có ảnh hưởng như thế nào
                        đến sức khỏe thai nhi? Mong bác sĩ giải…
                      </p>
                    </div>
                  </Space>
                </Col>
                <Col span={24}>
                  <Space>
                    <img src={xetnghiem} alt="" width="100px" height="100px" />
                    <div>
                      <p>Sùi mào gà nguy hiểm như thế nào?</p>
                      <p>
                        Thưa bác sĩ, bệnh sùi mào gà gây ra hậu quả gì? Em đang
                        mang thai, mắc sùi mào gà thì có ảnh hưởng như thế nào
                        đến sức khỏe thai nhi? Mong bác sĩ giải…
                      </p>
                    </div>
                  </Space>
                </Col>
                <Col span={24}>
                  <Space>
                    <img src={xetnghiem} alt="" width="100px" height="100px" />
                    <div>
                      <p>Sùi mào gà nguy hiểm như thế nào?</p>
                      <p>
                        Thưa bác sĩ, bệnh sùi mào gà gây ra hậu quả gì? Em đang
                        mang thai, mắc sùi mào gà thì có ảnh hưởng như thế nào
                        đến sức khỏe thai nhi? Mong bác sĩ giải…
                      </p>
                    </div>
                  </Space>
                </Col>
                <Col span={24}>
                  <Space>
                    <img src={xetnghiem} alt="" width="100px" height="100px" />
                    <div>
                      <p>Sùi mào gà nguy hiểm như thế nào?</p>
                      <p>
                        Thưa bác sĩ, bệnh sùi mào gà gây ra hậu quả gì? Em đang
                        mang thai, mắc sùi mào gà thì có ảnh hưởng như thế nào
                        đến sức khỏe thai nhi? Mong bác sĩ giải…
                      </p>
                    </div>
                  </Space>
                </Col>
              </Row>
            </div>
          </Style.BgDatlich>
        </Col>
      </Row>
    </div>
  );
}

export default RegisterVaccinePage;

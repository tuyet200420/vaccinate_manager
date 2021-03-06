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
          <h1>????NG K?? TI??M V???C XIN</h1>
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
                <h2>Th??ng tin ng?????i ti??m</h2>
              </div>
              <Row>
                <Col span={12}>
                  <Form.Item label="M?? s??? tr??? (N???u c??): " name="code_number">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="H??? t??n tr???: "
                    name="name"
                    rules={[{ required: true, message: "B???n ch??a nh???p T??n" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Gi???i t??nh: "
                    name="gender"
                    rules={[
                      { required: true, message: "B???n ch??a ch???n gi???i t??nh" },
                    ]}
                  >
                    <Select placeholder="Ch???n gi???i t??nh">
                      <Option value="Nam">Nam</Option>
                      <Option value="N???">N???</Option>
                      <Option value="Kh??c">Kh??c</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Ng??y sinh: "
                    name="dateNew"
                    Style={{ width: "100%" }}
                    rules={[
                      { required: true, message: "B???n ch??a nh???p ng??y sinh" },
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
                    label="T???nh-Th??nh ph???"
                    name="city"
                   
                  >
                    <Select
                      placeholder="Ch???n t???nh th??nh ph???"
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
                    label="Qu???n-Huy???n"
                    name="district"
                    
                  >
                    <Select
                      placeholder="Ch???n qu???n huy???n"
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
                    label="Ph?????ng-X??"
                    name="ward"
                    
                  >
                    <Select
                      placeholder="Ch???n ph?????ng x??"
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
                    label="?????a ch??? c??? th???"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Vui l??ng nh???p ?????a ch??? c??? th???!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <h2>Th??ng tin li??n h???</h2>
              <Form.Item
                label="H??? v?? t??n ng?????i d??m h???: "
                name="guardian"
                rules={[
                  { required: true, message: "B???n ch??a nh???p t??n ng?????i d??m h???" },
                ]}
              >
                <Input />
              </Form.Item>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label="M???i li??n h??? v???i ng?????i ti??m: "
                    name="relationship_guardian"
                  >
                    <Select placeholder="Ch???n m???i li??n h???">
                      <Option value="m???">m???</Option>
                      <Option value="cha">cha</Option>
                      <Option value="anh">anh</Option>
                      <Option value="ch???">ch???</Option>
                      <Option value="h??? h??ng">h??? h??ng</Option>
                      <Option value="Kh??c">Kh??c</Option>
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
                        message: "B???n ch??a nh???p s??? ??i???n tho???i",
                      },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <h2>Th??ng tin d???ch v???</h2>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label="T??n V???c xin"
                    name="vaccine_id"
                    rules={[
                      { required: true, message: "B???n ch??a ch???n T??n V???c xin" },
                    ]}
                  >
                    <Select>{renderOptionVaccine()}</Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Ng??y mong mu???n ti??m: "
                    name="dateTarget"
                    Style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "B???n ch??a ch???n ng??y mong mu???n",
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
                Ho??n th??nh ????ng k??
              </Button>
            </div>
          </Style.ContainerForm>
        </Col>
        <Col span={6}>
          <Style.BgDatlich>
            <Row>
              <Col span={24}>
                <div className="bg_title">????ng K?? Th??ng tin ti??m ch???ng</div>
              </Col>
              <Col span={24}>
                <div className="bg_title">Tra c???u l???ch s??? ti??m ch???ng</div>
              </Col>
              <Col span={24}>
                <div className="bg_title">C??u h???i th?????ng g???p</div>
              </Col>
            </Row>
            <div className="nano">
              <Row>
                <Col span={24}>
                  <Space>
                    <img src={xetnghiem} alt="" width="100px" height="100px" />
                    <div>
                      <p>S??i m??o g?? nguy hi???m nh?? th??? n??o?</p>
                      <p>
                        Th??a b??c s??, b???nh s??i m??o g?? g??y ra h???u qu??? g??? Em ??ang
                        mang thai, m???c s??i m??o g?? th?? c?? ???nh h?????ng nh?? th??? n??o
                        ?????n s???c kh???e thai nhi? Mong b??c s?? gi???i???
                      </p>
                    </div>
                  </Space>
                </Col>
                <Col span={24}>
                  <Space>
                    <img src={xetnghiem} alt="" width="100px" height="100px" />
                    <div>
                      <p>S??i m??o g?? nguy hi???m nh?? th??? n??o?</p>
                      <p>
                        Th??a b??c s??, b???nh s??i m??o g?? g??y ra h???u qu??? g??? Em ??ang
                        mang thai, m???c s??i m??o g?? th?? c?? ???nh h?????ng nh?? th??? n??o
                        ?????n s???c kh???e thai nhi? Mong b??c s?? gi???i???
                      </p>
                    </div>
                  </Space>
                </Col>
                <Col span={24}>
                  <Space>
                    <img src={xetnghiem} alt="" width="100px" height="100px" />
                    <div>
                      <p>S??i m??o g?? nguy hi???m nh?? th??? n??o?</p>
                      <p>
                        Th??a b??c s??, b???nh s??i m??o g?? g??y ra h???u qu??? g??? Em ??ang
                        mang thai, m???c s??i m??o g?? th?? c?? ???nh h?????ng nh?? th??? n??o
                        ?????n s???c kh???e thai nhi? Mong b??c s?? gi???i???
                      </p>
                    </div>
                  </Space>
                </Col>
                <Col span={24}>
                  <Space>
                    <img src={xetnghiem} alt="" width="100px" height="100px" />
                    <div>
                      <p>S??i m??o g?? nguy hi???m nh?? th??? n??o?</p>
                      <p>
                        Th??a b??c s??, b???nh s??i m??o g?? g??y ra h???u qu??? g??? Em ??ang
                        mang thai, m???c s??i m??o g?? th?? c?? ???nh h?????ng nh?? th??? n??o
                        ?????n s???c kh???e thai nhi? Mong b??c s?? gi???i???
                      </p>
                    </div>
                  </Space>
                </Col>
                <Col span={24}>
                  <Space>
                    <img src={xetnghiem} alt="" width="100px" height="100px" />
                    <div>
                      <p>S??i m??o g?? nguy hi???m nh?? th??? n??o?</p>
                      <p>
                        Th??a b??c s??, b???nh s??i m??o g?? g??y ra h???u qu??? g??? Em ??ang
                        mang thai, m???c s??i m??o g?? th?? c?? ???nh h?????ng nh?? th??? n??o
                        ?????n s???c kh???e thai nhi? Mong b??c s?? gi???i???
                      </p>
                    </div>
                  </Space>
                </Col>
                <Col span={24}>
                  <Space>
                    <img src={xetnghiem} alt="" width="100px" height="100px" />
                    <div>
                      <p>S??i m??o g?? nguy hi???m nh?? th??? n??o?</p>
                      <p>
                        Th??a b??c s??, b???nh s??i m??o g?? g??y ra h???u qu??? g??? Em ??ang
                        mang thai, m???c s??i m??o g?? th?? c?? ???nh h?????ng nh?? th??? n??o
                        ?????n s???c kh???e thai nhi? Mong b??c s?? gi???i???
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

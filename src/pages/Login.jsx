import { Form, Input, Button } from "antd";
import * as Style from "./styles";
import logo from "../assets/images/logo3.png";

import { useSelector, useDispatch } from "react-redux";

import { loginAction } from "../redux/actions";
function LoginPage({ history }) {
  console.log("🚀 ~ file: Login.jsx ~ line 9 ~ LoginPage ~ history", history)
  const dispatch = useDispatch();
  const prevPath = history.location.state?.prevPath;
  const [FormLogin] = Form.useForm();

  function handleSubmitForm(values) {
    dispatch(
      loginAction({
        data: values,
        prevPath,
      })
    );
  }

  return (
    <>
      <Style.LoginContainer>
        <div className="img-box">
          <img src={logo} alt="" width="100px" />
        </div>
        <Form
          form={FormLogin}
          size="large"
          name="basic"
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 15 }}
          onFinish={(values) => handleSubmitForm(values)}
          autoComplete="off"
        >
          <Form.Item
            label="Số điện thoại: "
            name="phone_number"
            rules={[
              { required: true, message: "Please input your Số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
        <div className="button-submit">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            onClick={() => FormLogin.submit()}
          >
            Đăng Nhập
          </Button>
        </div>
        <div
          style={{ textAlign: "center", marginTop: "30px", fontSize: "20px" }}
        >
          <Button type="link" style={{ fontSize: "20px", color: "yellow" }}>
            Quên mật khẩu
          </Button>
          or
          <Button
            style={{ fontSize: "20px", color: "yellow" }}
            type="link"
            onClick={() => {
              history.push("/register");
            }}
          >
            Đăng ký
          </Button>
        </div>
      </Style.LoginContainer>
    </>
  );
}
export default LoginPage;

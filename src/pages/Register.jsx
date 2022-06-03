import { Form, Input, Button } from "antd";
import * as Style from "./styles";
import logo from "../assets/images/logo3.png";

import { useSelector, useDispatch } from "react-redux";

import { createUserAction } from "../redux/actions";
function RegisterPage({ history }) {
  const dispatch = useDispatch();
  const prevPath = history.location.state?.prevPath;
  const [FormRegister] = Form.useForm();

  function handleSubmitForm(values) {
    dispatch(
      createUserAction({
        data: values
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
          form={FormRegister}
          size="large"
          name="basic"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
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
        name="password"
        label="Mật khẩu"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name=""
        label="Nhập lại mật khẩu"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

        </Form>
        <div className="button-submit">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            onClick={() => FormRegister.submit()}
          >
            Đăng Ký
          </Button>
        </div>
        
      </Style.LoginContainer>
    </>
  );
}
export default RegisterPage;

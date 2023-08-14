
import { Form, Input, Button, Radio } from "antd";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { message } from "antd";

const RegistrationForm = () => {

    //提交表单
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const navigate = useNavigate();
    const data = {
        username: values.username,
        password: values.password,
        cPassword: values.confirmPassword,
        nname: values.nname,
        ggender: values.gender,
        role: 1
      };
    console.log(data);
    
    axios.post('http://47.102.117.173:5000/user/register', data
        ).then(function (response) {
            message.success("注册成功^_^，跳转登录页");
            console.log(response);
            navigate('/');
        }).catch(function (error) {
            message.error("注册失败-_-");
            console.log(error);

        });
  };

  //获取验证码
  const handleGetCode = () => {
    // 执行获取验证码的操作
    console.log("获取验证码");
  };

  return (
    <Form
      name="registration"
      onFinish={onFinish}
      labelCol={{ span: 16}}
      wrapperCol={{ span: 32 }}
    >
      <Form.Item
        label="手机号"
        name="phone"
        rules={[
          { required: true, message: "请输入手机号" },
          { pattern: /^1[3456789]\d{9}$/, message: "请输入有效的手机号" },
        ]}
      >
        <Input 
          style={{ width: 424 }} 
          addonAfter={
          <Button type="primary" onClick={handleGetCode}>
           获取验证码
          </Button>
          }/>
      </Form.Item>

      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input style={{ width: 300 }} />
      </Form.Item>

      <Form.Item
        label="昵称"
        name="nname"
        rules={[{ required: true, message: "请输入昵称" }]}
      >
        <Input style={{ width: 300 }} />
      </Form.Item>

      <Form.Item
        label="性别"
        name="gender"
        rules={[{ required: true, message: "请选择性别" }]}
        >
        <Radio.Group>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
        </Radio.Group>
      </Form.Item>


      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password style={{ width: 300 }} />
      </Form.Item>

      <Form.Item
        label="确认密码"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "请再次输入密码" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次输入的密码不一致"));
            },
          }),
        ]}
      >
        <Input.Password style={{ width: 300 }} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;

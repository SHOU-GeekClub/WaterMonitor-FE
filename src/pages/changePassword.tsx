
import { Form, Input, Button } from "antd";



export default function ChangePassword(){

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
        const data = {
            password: values.password,
            cPassword: values.confirmPassword,
          };
        console.log(data);

      };

    return (
      <Form
        name="registration"
        onFinish={onFinish}
        labelCol={{ span: 16}}
        wrapperCol={{ span: 32 }}
      >

      <Form.Item
        label="新密码"
        name="newPassword"
        dependencies={["password"]}
        rules={[ { required: true, message: "请输入新密码" } ]}
      >
        <Input.Password style={{ width: 300 }} />
      </Form.Item>

      <Form.Item
        label="确认新密码"
        name="confirmNewPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "请再次输入新密码" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
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
          确认
        </Button>
      </Form.Item>
    </Form>
    );
}
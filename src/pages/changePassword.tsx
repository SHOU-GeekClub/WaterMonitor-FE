
import { Form, Input, Button, message } from "antd";
import axios from "axios";

export default function ChangePassword(){

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
        var storage=window.localStorage;
        const headers = {
          'Application-Token': storage.getItem("body"),
          'Content-Type': 'application/json',
        };

        const data = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            newPasswordAgain: values.newPasswordAgain,
          };
        console.log(data,headers);

        //发送请求
        axios.post('http://47.102.117.173:5000/user/UserChangePassword',data,{headers})
        .then(response => {
          console.log(response.data);
          message.success("修改密码成功");
        })
        .catch(error => {
          console.error(error);
          console.log(error);
        });

      };

    return (
      <Form
        name="registration"
        onFinish={onFinish}
        labelCol={{ span: 16}}
        wrapperCol={{ span: 32 }}
      >

      <Form.Item
        label="原密码"
        name="oldPassword"
        dependencies={["password"]}
        rules={[ { required: true, message: "请输入原密码" } ]}
      >
        <Input.Password style={{ width: 300 }} />
      </Form.Item>

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
        name="newPasswordAgain"
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
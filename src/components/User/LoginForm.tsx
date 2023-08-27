import { UserLoginParams } from "../../Api/UserApi";
import { Input } from "antd";
import { ProForm } from "@ant-design/pro-components";

interface IProps {
  onSubmit?: (data: UserLoginParams) => any;
}
export function UserLoginForm(props: IProps) {
  const [form] = ProForm.useForm<UserLoginParams>();
  return (
    <ProForm<UserLoginParams> form={form} onFinish={props.onSubmit}>
      <ProForm.Item label="用户名" name="username">
        <Input placeholder="请输入用户名" />
      </ProForm.Item>
      <ProForm.Item label="密码" name="password">
        <Input placeholder="请输入密码" />
      </ProForm.Item>
    </ProForm>
  );
}

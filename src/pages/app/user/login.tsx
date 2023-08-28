import {UserApi} from "../../../Api/UserApi";
import {ConfirmAsync} from "../../../utils/ConfirmAsync";
import {notification} from "antd";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {UserLoginForm} from "../../../components/User/LoginForm";
import {ProCard} from "@ant-design/pro-components";

import "./login.less";

export function UserLoginPage() {
    const navigate = useNavigate();
    return (
        <div className={"LoginPage"}>
            <ProCard className={"LoginCard"} title={"登录"}>
                <UserLoginForm
                    onSubmit={async (data) => {
                        await ConfirmAsync({
                            title: "确认",
                            content: "您是否确认要提交此表单？",
                            maskClosable: true,
                        });
                        try {
                            const response = await UserApi.login({
                                username: data.username,
                                password: data.password,
                            });
                            notification.success({
                                message: "登录成功",
                            });
                            localStorage.setItem("token", response.body);
                            navigate("/app");
                        } catch (e) {
                            const axiosError = e as AxiosError<{ message: string }>;
                            notification.error({
                                message: "登录失败",
                                description: axiosError?.response?.data?.message,
                            });
                        }
                    }}
                />
            </ProCard>
        </div>
    );
}

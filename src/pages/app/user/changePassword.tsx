import {PageContainer, ProForm, ProFormText} from "@ant-design/pro-components";
import React from "react";
import {Button, Card, message} from "antd";
import styles from "./changePwd.module.scss";
import {UserApi} from "../../../Api/UserApi"

const UserChangePasswordPage: React.FC = () => {
    const onFinish = async (values: any) => {
        UserApi.handleChangePwd({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            newPasswordAgain: values.newPasswordAgain
        }).then((res)=>{
            message.info("修改成功！！")
        }).catch(()=>{
            message.error("网络繁忙，请稍后重试")
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <PageContainer>
            <Card
                title="修改密码"
                className={styles.cardContainer}
                hoverable
            >
                <ProForm
                    name="passwordForm"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="horizontal"
                    initialValues={{
                        oldPassword: '',
                        newPassword: '',
                        newPasswordAgain: '',
                    }}
                >
                    <ProFormText
                        name="oldPassword"
                        label="旧密码"
                        rules={[{required: true, message: '请输入旧密码'}]}
                    />

                    <ProFormText.Password
                        name="newPassword"
                        label="新密码"
                        rules={[
                            {required: true, message: '请输入新密码'},
                            {min: 1, message: '新密码长度不能少于1个字符'},
                        ]}
                    />

                    <ProFormText.Password
                        name="newPasswordAgain"
                        label="确认新密码"
                        dependencies={['newPassword']}
                        rules={[
                            {required: true, message: '请确认新密码'},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('新密码与新密码不一致!'));
                                },
                            }),
                        ]}
                    />
                </ProForm>
            </Card>
        </PageContainer>
    );
};

export default UserChangePasswordPage;

import React from "react";
import {LoginForm, PageContainer, ProFormSelect, ProFormText} from "@ant-design/pro-components";
import {useForm} from "antd/es/form/Form";
import {LockOutlined, MobileOutlined, UserOutlined} from "@ant-design/icons";
import styles from "./index.module.scss"
import {Button, Card, message, Modal} from "antd";
import {UserApi} from "../../../../Api/UserApi";

const Index: React.FC = () => {

    const [form] = useForm();

    const handleRegisterClick=async()=>{
        try {
            const values = await form.validateFields();
            Modal.confirm({
                title: '确认注册',
                content: '确定要注册吗？',
                okText: '确认',
                cancelText: '取消',
                style:{top: 10},
                onOk: () => {
                    console.log('表单数据：', values);
                    UserApi.handleRegister({
                        username : values.username,
                        password :values.password,
                        cPassword: values.cPassword,
                        nname : values.nname,
                        ggender : values.ggender,
                        role :values.role
                    }).then((res: any) => {
                        message.info("注册成功！！")
                    })
                },
            });
        } catch (error) {
            message.error('请检查后重试');
        }
    }

    return (
        <PageContainer>
            <Card className={styles.cardContainer} hoverable>
                <LoginForm
                    className={styles.formContainer}
                    form={form}
                    title="欢迎注册"
                    submitter={{
                        render: (_, dom) => dom.pop(),
                    }}
                >
                    {/* username */}
                    <ProFormText
                        name="username"
                        placeholder="用户名"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined/>
                        }
                        }
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}
                    />
                    {/* pwd */}
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined/>,
                        }}
                        placeholder="密码"
                        rules={[
                            {
                                required: true,
                                message: '密码为必填项',
                            },
                        ]}
                    />
                    {/* cPwd 校验密码*/}
                    <ProFormText.Password
                        name="cPassword"
                        dependencies={['password']}
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined/>,
                        }}
                        placeholder="确认密码"
                        rules={[
                            {
                                required: true,
                                message: '必须确认你的密码',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject(new Error('您输入的两个密码不匹配'));
                                    }
                                },
                            }),
                        ]}
                    />
                    {/* name */}
                    <ProFormText
                        name="nname"
                        placeholder="姓名"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined/>
                        }
                        }
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}
                    />
                    {/*ggender 性别*/}
                    <ProFormSelect
                        name="ggender"
                        fieldProps={{
                            size: 'large',
                        }}
                        placeholder="性别"
                        rules={[
                            {
                                required: true,
                                message: '必须选择性别',
                            },
                        ]}
                        options={[
                            {value: '1', label: '男'},
                            {value: '2', label: '女'},
                        ]}
                    />
                    {/* role 职务*/}
                    <ProFormSelect
                        name="role"
                        fieldProps={{
                            size: 'large',
                        }}
                        placeholder="职务"
                        rules={[
                            {
                                required: true,
                                message: '必须选择职务',
                            },
                        ]}
                        options={[
                            {value: '1', label: '管理员'},
                            {value: '2', label: '生产队长'},
                            {value: '3', label: '养殖人员'},
                        ]}
                    />
                    <Button onClick={handleRegisterClick} type="primary" style={{position: "relative", left: "130px"}}>注册</Button>
                </LoginForm>
            </Card>
        </PageContainer>
    )
}

export default Index
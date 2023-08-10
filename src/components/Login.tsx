import React, {useState} from 'react';
import axios from 'axios';
import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import {message, Space, Tabs} from 'antd';
import {CSSProperties} from 'react';
import {useNavigate} from 'react-router-dom';

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
    marginInlineStart: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

const LoginPage: React.FC = () => {
    const [loginType, setLoginType] = useState<LoginType>('phone');
    const navigate = useNavigate();

    function handleLogin(values) {
        console.log('登录表单数据:', values.username, " ", values.password);
        console.log('登录表单数据2:', values.mobile, " ", values.captcha);
        // console.log(values);
        axios.post('http://47.102.117.173:5000/user/login', {
            username: values.username,
            password: values.password
        }).then(function (response) {
            message.success("登录成功^_^");
            navigate('/home');
            if(!window.localStorage){
                alert("浏览器不支持localstorage");
            }else{
                var storage=window.localStorage;
                console.log(JSON.stringify(response.data));
                storage.setItem("body",JSON.stringify(response.data));
            }
        }).catch(function (error) {
            message.error("登录失败-_-");
            //登录成功
            navigate('/home');
        });
    }

    return (
        <ProConfigProvider hashed={false}>
            <div style={{backgroundColor: 'white'}}>
                <LoginForm
                    onFinish={handleLogin}
                    logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                    title="Hello"
                    subTitle="github"
                    actions={
                        <Space>
                            其他登录方式
                            <AlipayCircleOutlined style={iconStyles}/>
                            <TaobaoCircleOutlined style={iconStyles}/>
                            <WeiboCircleOutlined style={iconStyles}/>
                        </Space>
                    }
                >
                    <Tabs centered activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
                        <Tabs.TabPane key={'account'} tab={'账号密码登录'}/>
                        <Tabs.TabPane key={'phone'} tab={'手机号登录'}/>
                    </Tabs>
                    {loginType === 'account' && (
                        <>
                            <ProFormText
                                name="username"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={'prefixIcon'}/>,
                                }}
                                placeholder={'用户名: admin or user'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'}/>,
                                }}
                                placeholder={'密码: ant.design'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                ]}
                            />
                        </>
                    )}
                    {loginType === 'phone' && (
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <MobileOutlined className={'prefixIcon'}/>,
                                }}
                                name="mobile"
                                placeholder={'手机号'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入手机号！',
                                    },
                                    {
                                        pattern: /^1\d{10}$/,
                                        message: '手机号格式错误！',
                                    },
                                ]}
                            />
                            <ProFormCaptcha
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'}/>,
                                }}
                                captchaProps={{
                                    size: 'large',
                                }}
                                name="captcha"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码！',
                                    },
                                ]}
                                onGetCaptcha={async () => {
                                    message.success('获取验证码成功！验证码为：1234');
                                }}
                                captchaTextRender={(timing, count) => (timing ? `${count} 获取验证码` : '获取验证码')}
                            />
                        </>
                    )}


                    <div style={{marginBlockEnd: 24}}>
                        <ProFormCheckbox noStyle name="autoLogin" initialValue={true}>
                            自动登录
                        </ProFormCheckbox>
                        <a style={{float: 'right'}}>忘记密码</a>
                    </div>
                </LoginForm>
            </div>
            <div>
                <button onClick={() => {
                    navigate('/regist')
                }}>
                    注册
                </button>
            </div>
        </ProConfigProvider>
    );
};

export default LoginPage;


import React, {useState} from 'react';
import {message} from 'antd';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    Navigate
} from 'react-router-dom';

//这个useNavigate()不能用吧，这个不是React函数组件，不能用hooks
export const handleLogin = (values) => {

    if (values.mobile === '17878787878' && values.captcha === '123') {
        message.success('登录成功！');
        // 处理登录逻辑，例如发送登录请求
        console.log('测试成功');
        const navigate = useNavigate();
        navigate('/home');
        return true;
        // console.log('登录表单数据:', values);
        // 跳转到登录逻辑
        // ...
    }


    return new Promise((resolve, reject) => {
        // 处理登录逻辑，例如发送登录请求
        // console.log('登录表单数据:', values);
        // 模拟登录成功

        resolve(true);
        // 模拟登录失败
        // reject(false);
    });

};
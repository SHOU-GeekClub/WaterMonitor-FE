import { Routes, Route, Link } from "react-router-dom";
import ChangePassword from "./changePassword";
import "./home.css"

export default function Home(){

    return (
        <div className="container">

            <div className="menu">
            {/* 菜单栏内容 */}
                <Link to="/home">主页</Link><br></br>
                <Link to="/home/changePassword">修改密码</Link>
            </div>
            <div className="page-content">
                {/* 页面内容 */}
                <Routes>
                    <Route path="changePassword" element={<ChangePassword />} />
                </Routes>
            </div>
        </div>
    );
}
import type { ProSettings } from "@ant-design/pro-components";
import { PageContainer, ProLayout, ProCard } from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import { defaultProps } from "./routes";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { UserChangePasswordPage } from "./user/changePassword";
import { UserSearchPage } from "./user/search";
import { UserApi } from "../../Api/UserApi";
import { notification } from "antd";
export function LayoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const settings: ProSettings | undefined = {
    layout: "mix",
    splitMenus: true,
  };

  const [pathname, setPathname] = useState(location.pathname);

  async function checkToken() {
    try {
      const token = await UserApi.checkToken();
      // 没有报错说明认证成功,不需要任何操作.
    } catch (e) {
      notification.error({
        message: "鉴权失败",
      });
      navigate("/login");
    }
  }
  useEffect(() => {
    // 每当路由变化, 检查是否已登录
    checkToken();
  }, [location]);

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <ProLayout
          token={{
            header: {
              heightLayoutHeader: 64,
            },
          }}
          logo={null}
          title={"WaterMonitor-FE"}
          bgLayoutImgList={[
            {
              src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
              left: 85,
              bottom: 100,
              height: "303px",
            },
            {
              src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
              bottom: -68,
              right: -45,
              height: "303px",
            },
            {
              src: "https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png",
              bottom: 0,
              left: 0,
              width: "331px",
            },
          ]}
          {...defaultProps}
          location={{
            pathname,
          }}
          menu={{
            type: "group",
          }}

          menuItemRender={(item, dom) => {
            return (
              <div
                onClick={() => {
                  item.path && navigate(item.path);
                  item.path && setPathname(item.path);
                }}
              >
                {dom}
              </div>
            );
          }}
          {...settings}
        >
          <Routes>
            <Route
              path={"/app"}
              element={<Navigate to={"/app/user/search"} />}
            />
            <Route
              path={"/app/user/changePassword"}
              element={<UserChangePasswordPage />}
            />
            <Route path={"/app/user/search"} element={<UserSearchPage />} />
          </Routes>
        </ProLayout>
      </div>
    </>
  );
}

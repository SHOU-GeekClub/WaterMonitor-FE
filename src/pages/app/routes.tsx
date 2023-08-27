import { CrownFilled } from "@ant-design/icons";
import React from "react";

const route = {
  path: "/",
  routes: [
    {
      path: "/app",
      name: "管理系统",
      icon: <CrownFilled />,
      routes: [
        {
          path: "/app/user",
          name: "用户管理",
          icon: <CrownFilled />,
          routes: [
            {
              path: "/app/user/changePassword",
              name: "修改密码",
              icon: <CrownFilled />,
            },
            {
              path: "/app/user/search",
              name: "用户管理",
              icon: <CrownFilled />,
            },
            {
              path: "/app/user/create",
              name: "创建用户",
              icon: <CrownFilled />,
            },
          ],
        },
        {
          path: "/app/sensor",
          name: "传感器管理",
          icon: <CrownFilled />,
          routes: [
            {
              path: "/app/sensor/create",
              name: "新建传感器",
              icon: <CrownFilled />,
            },
          ],
        },
      ],
    },
  ],
};
export const defaultProps = {
  route: route,
  location: {
    pathname: "/",
  },
};

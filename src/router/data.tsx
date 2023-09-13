import { MailOutlined } from "@ant-design/icons";
import { AntdItemTypeWithRouter } from "./types";

import { lazy } from "react";

const BusinessManage = lazy(
  () =>
    import(
      /* webpackChunkName: "BusinessManage" */ "@/pages/Manage/BusinessManage/indexBusinessManage"
    )
);
const Setting = lazy(
  () =>
    import(
      /* webpackChunkName: "Setting" */ "@/pages/Manage/Setting/indexSetting"
    )
);

// 路由菜单配置
export const routerConfig: AntdItemTypeWithRouter[] = [
  {
    label: "一级菜单1",
    icon: <MailOutlined />,
    key: "menu-1",
    path: "menu-1",
    children: [
      {
        type: "group",
        label: "副标题",
        key: "menu-1-1",
        path: "menu-1-1",
        children: [
          {
            label: "二级菜单",
            key: "menu-1-1-1",
            path: "menu-1-1-1",
            element: <BusinessManage />,
          },
        ],
      },
      {
        label: "不带副标题菜单",
        key: "menu-2",
        path: "menu-2",
        element: <Setting />,
      },
    ],
  },
];

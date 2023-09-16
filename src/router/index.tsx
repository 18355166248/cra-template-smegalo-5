import XLayout from "@/pages/Layout";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import { AntdItemTypeWithRouter } from "./types";
import { isArray, pick } from "lodash-es";
import { routerConfig } from "./data";
import { isDev } from "@/utils/env";
import { basePathUrl } from "@/constants/common.const";

// 过滤路由配置中的菜单属性
function gerRouterParams(list: AntdItemTypeWithRouter[]) {
  return list.map((item: any) => {
    if (isArray(item?.children)) {
      item.children = gerRouterParams(item?.children);
    }
    return pick(item, "label", "key", "element", "path", "children");
  });
}
const routerParams = gerRouterParams(routerConfig);

// 测试环境自动拼接重定向到basename
if (isDev) {
  window.history.pushState(null, "", basePathUrl);
}

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <XLayout />,
      children: [...routerParams, { path: "*", element: <NotFound /> }],
    },
  ],
  {
    basename: basePathUrl,
  }
);

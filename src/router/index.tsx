import XLayout from "@/pages/Layout";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import { AntdItemTypeWithRouter } from "./types";
import { isArray, pick } from "lodash-es";
import { routerConfig } from "./data";

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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <XLayout />,
    children: [...routerParams, { path: "*", element: <NotFound /> }],
  },
]);

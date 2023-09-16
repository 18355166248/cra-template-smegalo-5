import { AntdItemTypeWithRouter } from "@/router/types";
import { MenuProps } from "antd";
import { omit, pick } from "lodash-es";

export interface MENU_INTERFACE {
  childList: MENU_INTERFACE[];
  createdAt: string;
  menuIcon: any;
  menuId: number;
  menuLevel: number;
  menuLink: string;
  menuName: string;
  menuOrder: string;
  menuUrl: string;
  parentMenuId: any;
  parentMenuName: any;
  productCode: string;
  status: number;
  updatedAt: string;
}

interface PRO_LAYOUT_MENU {
  path: string;
  name?: string;
  routes?: PRO_LAYOUT_MENU[];
}

export function formatProLayoutMenu(menu: MENU_INTERFACE[]):
  | {
      route: { path: string; routes: PRO_LAYOUT_MENU[] };
      location: { pathname: string };
    }
  | {} {
  if (!menu) return {};
  return {
    route: {
      path: "/",
      routes: getProLayoutMenu(menu),
    },
    location: {
      pathname: "/",
    },
  };
}

function getProLayoutMenu(
  menu: MENU_INTERFACE[]
): PRO_LAYOUT_MENU[] | undefined {
  if (!Array.isArray(menu)) return undefined;

  return menu.map((item: MENU_INTERFACE) => ({
    name: item.menuName,
    path: item.menuUrl,
    routes: item.childList && getProLayoutMenu(item.childList),
  }));
}

type MenuItem = Required<MenuProps>["items"][number];

interface GetItemProps {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: GetItemProps[];
  type?: "group";
}

export function getItem(
  list: AntdItemTypeWithRouter[],
  parentPath?: string
): MenuItem[] {
  return list.map((item: any) => {
    const v = { ...item }; // 防止影响源数据
    v.path = (parentPath || "") + "/" + v.path;
    v.key = v.path;

    if (Array.isArray(item.children)) {
      v.children = getItem(item.children, v.path);
    }

    return omit(v, "element") as MenuItem;
  });
}

export function getOpenKeys(list: AntdItemTypeWithRouter[]): string[] {
  let keys: string[] = [];
  list.forEach((item: any) => {
    keys.push(item.key);
    if (Array.isArray(item.children)) {
      keys = keys.concat(getOpenKeys(item.children));
    }
  });
  return keys;
}

// 获取第一个菜单地址
export function getFirstMenuUrl(list: AntdItemTypeWithRouter[]) {
  let firstMenuUrl = "";
  dfs(list);
  return firstMenuUrl;

  function dfs(list: AntdItemTypeWithRouter[], parentPath?: string) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i] as any;
      const v = { ...item }; // 防止影响源数据
      v.path = (parentPath || "") + "/" + v.path;

      if (v.element && !firstMenuUrl) {
        firstMenuUrl = v.path;
        break;
      } else if (Array.isArray(item.children)) {
        dfs(item.children, v.path);
      }
    }
  }
}

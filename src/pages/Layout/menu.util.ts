import { MenuProps } from "antd";

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
export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as unknown as MenuItem;
}

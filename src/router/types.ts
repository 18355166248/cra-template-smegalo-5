import { MenuDividerType, MenuItemType } from "antd/lib/menu/hooks/useItems";
import { NonIndexRouteObject } from "react-router-dom";
import type {
  MenuItemGroupType as RcMenuItemGroupType,
  SubMenuType as RcSubMenuType,
} from "rc-menu/lib/interface";

type RouteObject = Omit<NonIndexRouteObject, "children"> & {
  children?: AntdItemTypeWithRouter[];
};

export interface SubMenuType extends Omit<RcSubMenuType, "children"> {
  icon?: React.ReactNode;
  theme?: "dark" | "light";
  children: AntdItemTypeWithRouter[];
}
export interface MenuItemGroupType
  extends Omit<RcMenuItemGroupType, "children"> {
  children?: AntdItemTypeWithRouter[];
  key?: React.Key;
  path?: string; // 补充
}

export type AntdItemTypeWithRouter =
  | MenuItemType
  | RouteObject
  | SubMenuType
  | MenuItemGroupType
  | MenuDividerType
  | null;

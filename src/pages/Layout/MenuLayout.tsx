import React, { FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuProps } from "antd";
import { getItem, getOpenKeys } from "./menu.util";
import { routerConfig } from "@/router/data";
import { MenuInfo } from "rc-menu/lib/interface";

type SelectKeys = [string];

interface Props {
  app?: any;
}

const items: MenuProps["items"] = getItem(routerConfig);

// 默认展开菜单
const defaultOpenKeys = getOpenKeys(items);

const MenuLayout: FC<Props> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectKeys: SelectKeys = useMemo<SelectKeys>(() => {
    return [location.pathname];
  }, [location.pathname]);

  function onClickMenu(info: MenuInfo) {
    navigate(info.key);
  }

  return (
    <Menu
      defaultOpenKeys={defaultOpenKeys}
      items={items}
      selectedKeys={selectKeys}
      mode="inline"
      onClick={onClickMenu}
      theme="dark"
    ></Menu>
  );
};

export default MenuLayout;

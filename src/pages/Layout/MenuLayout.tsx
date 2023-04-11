import React, { FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuProps } from "antd";
import { getItem } from "./menu.util";

type SelectKeys = [string];

interface Props {
  app?: any;
}

const items: MenuProps["items"] = [getItem("测试", "/key")];

const MenuLayout: FC<Props> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectKeys: SelectKeys = useMemo<SelectKeys>(() => {
    return [location.pathname];
  }, [location.pathname]);

  return (
    <div className="h-full" style={{ width: 120 }}>
      <Menu items={items} selectedKeys={selectKeys}></Menu>
    </div>
  );
};

export default MenuLayout;

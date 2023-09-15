import { Button, Dropdown } from "antd";
import "./style/index.scoped.scss";
import Logo from "./Logo";
import type { MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Button type="text">测试</Button>,
  },
];

const Header = () => {
  return (
    <div className="flex justify-between items-center h50 header">
      <div className="left">
        <Logo />
      </div>
      <div className="right pr-6">
        <Dropdown menu={{ items }}>
          <span
            onClick={(e) => e.preventDefault()}
            className="flex items-center cursor-pointer"
          >
            用户名
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;

import React, { FC } from "react";
import "./style/index.scoped.scss";

interface Props {}

const Logo: FC<Props> = () => {
  return (
    <div className="logo flex justify-center items-center">
      <h2 className="mb-0 text-lg">项目名称</h2>
    </div>
  );
};

export default Logo;

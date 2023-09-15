import React, { Result, Button } from "antd";

function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="很抱歉, 页面不小心迷路了"
      extra={
        <Button type="primary" href="/">
          返回首页
        </Button>
      }
    />
  );
}

export default NotFound;

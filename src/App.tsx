import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useEffect } from "react";
import { basePathUrl } from "./constants/common.const";

export function Fallback() {
  return <p>加载中...</p>;
}

function App() {
  console.log("6899755555"); // 生产打包会自动删除

  useEffect(() => {
    if (window.location.pathname === "/" && basePathUrl) {
      window.location.href = basePathUrl;
    }
  }, []);

  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
}

export default App;

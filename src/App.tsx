import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export function Fallback() {
  return <p>加载中...</p>;
}

function App() {
  console.log("6899755555"); // 生产打包会自动删除
  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
}

export default App;

import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Suspense } from "react";

export function Fallback() {
  return <p>加载中...</p>;
}

console.log("6899755555"); // 生产打包会自动删除

function App() {
  console.log("6899755555"); // 生产打包会自动删除
  return (
    <Suspense>
      <RouterProvider router={router} fallbackElement={<Fallback />} />
    </Suspense>
  );
}

export default App;

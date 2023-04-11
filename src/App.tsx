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
    <div className="App ml-10">
      <header className="mt-20 text-pink-600 font-extrabold text-4xl tracking-tight">
        CRA-TEMPLATE-SMEGALO
      </header>
      <div className="mt-10 text-blue-400 font-extrabold text-xl tracking-tight">
        <div>使用框架</div>
        <div className="mb-2">
          <a
            href="https://github.com/facebook/create-react-app"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            create-react-app@5
          </a>
        </div>
        <div className="mb-2">
          <a
            href="https://github.com/dilanx/craco"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            @craco/craco@7
          </a>
        </div>
        <div className="mb-2">
          <a
            href="https://tailwindcss.com/docs/installation/using-postcss"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            tailwindcss@3
          </a>
        </div>
        <div className="mb-2">
          <a
            href="https://github.com/webpack/webpack"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            webpack@5
          </a>
        </div>
      </div>

      <Suspense>
        <RouterProvider router={router} fallbackElement={<Fallback />} />
      </Suspense>
    </div>
  );
}

export default App;

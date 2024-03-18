import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export function Fallback() {
  return <p>加载中...</p>;
}

function App() {
  return (
    <div className="App ml-5">
      <header className="my-5 text-pink-600 font-extrabold text-xl tracking-tight">
        CRA-TEMPLATE-SMEGALO
      </header>
      <div className="text-blue-400 font-extrabold text-l tracking-tight">
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

      <RouterProvider router={router} fallbackElement={<Fallback />} />
    </div>
  );
}

export default App;

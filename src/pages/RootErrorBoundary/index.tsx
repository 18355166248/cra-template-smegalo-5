import { useRouteError } from "react-router-dom";

export function RootErrorBoundary() {
  let error = useRouteError() as Error;
  return (
    <div>
      <h1>发生了一些错误 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = "/")}>刷新当前页面</button>
    </div>
  );
}

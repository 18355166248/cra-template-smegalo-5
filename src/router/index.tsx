import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import NotFound from "@/pages/NotFound";
import { RootErrorBoundary } from "@/pages/RootErrorBoundary";
import Test from "@/pages/Test";
import { createBrowserRouter, Outlet } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "",
        element: <Outlet />,
        errorElement: <RootErrorBoundary />,
        children: [
          {
            path: "/test",
            element: <Test />,
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

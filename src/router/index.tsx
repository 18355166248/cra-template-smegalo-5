import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import NotFound from "@/pages/NotFound";
import { RootErrorBoundary } from "@/pages/RootErrorBoundary";
import { lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

const Test = lazy(() => import(/* webpackChunkName: "test" */ "@/pages/Test"));

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

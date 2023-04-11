import XLayout from "@/pages/Layout";
import NotFound from "@/pages/NotFound";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Test1 = lazy(
  () => import(/* webpackChunkName: "test" */ "@/pages/Test1")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <XLayout />,
    children: [
      {
        path: "/test1",
        element: <Test1 />,
        children: [],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

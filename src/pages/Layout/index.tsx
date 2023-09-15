import React, { FC } from "react";
import "./style/index.scoped.scss";
import MenuLayout from "./MenuLayout";
import Header from "./Header";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

const XLayout: FC = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header />
      <div className="main flex overflow-hidden flex-1">
        <div className="flex flex-col flex-none h-full w200 menu overflow-auto">
          <MenuLayout />
        </div>
        <div className="flex flex-grow flex-col overflow-hidden">
          <div className="flex-grow h-full overflow-y-scroll">
            <div className="bg-white min-h-full p-4">
              <ErrorBoundary>
                <Suspense>
                  <Outlet />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XLayout;

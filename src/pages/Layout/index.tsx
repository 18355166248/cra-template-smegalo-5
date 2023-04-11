import React, { FC } from "react";
import "./style/index.scoped.scss";
import MenuLayout from "./MenuLayout";
import Header from "./Header";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Outlet } from "react-router-dom";

const XLayout: FC = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header />
      <div className="main flex overflow-hidden flex-1">
        <div className="flex flex-col flex-none h-full w120 menu">
          <MenuLayout />
        </div>
        <div className="flex flex-grow flex-col overflow-hidden">
          <div className="flex-grow h-full overflow-y-scroll">
            <div className="bg-white min-h-full">
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XLayout;

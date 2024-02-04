import { FC, useEffect } from "react";
import "./style/index.scoped.scss";
import MenuLayout from "./MenuLayout";
import Header from "./Header";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import { getFirstMenuUrl } from "./menu.util";
import { routerConfig } from "@/router/data";

const XLayout: FC = () => {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      const firstMenuUrl = getFirstMenuUrl(routerConfig);
      firstMenuUrl && navigate(firstMenuUrl, { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header />
      <div className="main flex overflow-hidden flex-1">
        <div className="flex flex-col flex-none h-full w200 menu overflow-auto">
          <MenuLayout />
        </div>
        <div className="flex flex-grow flex-col overflow-hidden">
          <div className="flex-grow h-full overflow-y-scroll">
            <div className="bg-white min-h-full p-4 box-border">
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

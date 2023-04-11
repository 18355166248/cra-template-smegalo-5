import { Link, Outlet, useResolvedPath, useMatch } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      className={`mr-3 text-lg ${
        match ? "underline text-orange-500" : ""
      } underline-offset-4`}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}

const Layout = () => {
  return (
    <div className="mt-10">
      <nav className="mb-2">
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/Test">Test</CustomLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;

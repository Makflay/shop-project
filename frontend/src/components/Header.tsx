import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { navConfig } from "../config/navigation";
import type { NavItem } from "../config/navigation";

const Header = () => {
  const { user, logout } = useAuth();
  const role = user?.role || "guest";
  const location = useLocation();

  const hiddenOnPages = ["/login", "/register"];
  if (hiddenOnPages.includes(location.pathname)) {
    return null;
  }

  return (
    <header>
      <nav>
        {navConfig[role].map((item: NavItem) => (
          <Link key={item.to} to={item.to}>
            {item.label}
          </Link>
        ))}
        <span>Welcome, {role === "guest" ? "Guest" : user?.name}</span>
        {role !== "guest" && <button onClick={logout}>Logout</button>}
      </nav>
    </header>
  );
};

export default Header;

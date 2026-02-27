import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const hiddenOnPages = ["/login", "/register"];
  if (hiddenOnPages.includes(location.pathname)) {
    return null;
  }

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <>
          <span>Welcome, {!user ? "Guest" : user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      </nav>
    </header>
  );
};

export default Header;

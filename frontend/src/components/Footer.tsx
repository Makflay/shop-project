import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const hiddenOnPages = ["/login", "/register"];

  if (hiddenOnPages.includes(location.pathname)) {
    return null;
  }

  return (
    <footer>
      <p>&copy; 2024 My Shop. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

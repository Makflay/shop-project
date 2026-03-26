import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { StyledFooter } from "./footer-styles";

const Footer = () => {
  const location = useLocation();
  const hiddenOnPages = ["/login", "/register"];

  if (hiddenOnPages.includes(location.pathname)) {
    return null;
  }

  return (
    <StyledFooter component="footer">
      <Typography variant="body2">
        &copy; 2026 My Shop. All rights reserved.
      </Typography>
    </StyledFooter>
  );
};

export default Footer;

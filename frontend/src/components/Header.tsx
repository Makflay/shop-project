import { Link as RouterLink, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  StyledAppBar,
  StyledToolbar,
  NavStack,
  UserBox,
} from "./header-styles";
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
    <StyledAppBar>
      <StyledToolbar>
        <UserBox>
          <Typography variant="body1" color="inherit">
            Welcome, {role === "guest" ? "Guest" : user?.name}
          </Typography>
          {role !== "guest" && (
            <Button color="inherit" variant="outlined" onClick={logout}>
              Logout
            </Button>
          )}
        </UserBox>
        <NavStack direction="row" spacing={2}>
          {navConfig[role].map((i: NavItem) => (
            <Button key={i.to} color="inherit" component={RouterLink} to={i.to}>
              {i.label}
            </Button>
          ))}
        </NavStack>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;

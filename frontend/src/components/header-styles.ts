import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.drawer + 1,
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}));

export const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const NavStack = styled(Stack)(({ theme }) => ({
  marginLeft: "auto",
  gap: theme.spacing(2),
}));

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const Container = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

export const AuthCard = styled(Box)(({ theme }) => ({
  width: 380,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const FormBox = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const LinksBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

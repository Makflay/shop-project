import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 900,
  margin: "0 auto",
}));

export const StatCard = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export const ActionBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: "flex",
  justifyContent: "flex-start",
}));

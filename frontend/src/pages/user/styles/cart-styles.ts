import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 800,
  margin: "0 auto",
}));

export const CartItemCard = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const ItemInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
}));

export const QuantityBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "center",
}));

export const TotalBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: "flex",
  justifyContent: "flex-end",
}));

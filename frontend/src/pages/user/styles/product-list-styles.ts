import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const FilterBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  gap: theme.spacing(2),
}));

export const ProductGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const ProductCard = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  height: "100%",
}));

export const ActionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: theme.spacing(1),
}));

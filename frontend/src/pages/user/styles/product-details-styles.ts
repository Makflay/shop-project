import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "center",
}));

export const ProductCard = styled(Box)(({ theme }) => ({
  maxWidth: 600,
  width: "100%",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const InfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export const LinksBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

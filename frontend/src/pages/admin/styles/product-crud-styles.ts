import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const FormBox = styled("form")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

export const FilterBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const TableWrapper = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
}));

export const ActionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  justifyContent: "flex-end",
}));

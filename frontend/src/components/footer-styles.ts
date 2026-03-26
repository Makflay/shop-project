import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import type { BoxProps } from "@mui/material/Box";

export const StyledFooter = styled(Box)<BoxProps>(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  py: theme.spacing(2),
  textAlign: "center",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  zIndex: theme.zIndex.drawer + 1,
}));

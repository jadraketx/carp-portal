import { Card, Typography } from "@mui/material";
import { styled } from "@Utils/theme";

export const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  gridColumn: "span 2",
  padding: 24,
  height: 288,
  borderRadius: 16,
});

export const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: 8,
}));

import { Button, Card, Typography } from "@mui/material";
import { styled } from "@Utils/theme";

export const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  padding: 24,
  height: 288,
  borderRadius: 16,
});

export const Top = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
});

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: "8px 24px",
  color: theme.palette.primary.main,
  textTransform: "none",
  border: `1px solid ${theme.palette.grey[700]}`,
  borderRadius: 100,
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const ParticipantsRow = styled("div", {
  shouldForwardProp: (prop) => prop !== "isFirst",
})<{ isFirst?: boolean }>(({ isFirst, theme }) => ({
  borderBottom: isFirst ? `1px solid ${theme.palette.grey[500]}` : "none",
  paddingBottom: isFirst ? 10 : 0,
  marginBottom: isFirst ? 4 : 0,
  display: "grid",
  gridTemplateColumns: "80px 1fr",
  gap: 8,
  alignItems: "end",
}));

export const StyledNumber = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "status",
})<{ status?: string }>(({ status, theme }) => {
  let color;
  if (status === "Deployed") {
    color = theme.palette.status.green;
  } else if (status === "Registered") {
    color = theme.palette.status.yellow;
  } else if (status === "Unregistered") {
    color = theme.palette.status.purple;
  } else if (status === "NeedsRedeployment") {
    color = theme.palette.status.red;
  } else {
    color = theme.palette.primary.main;
  }
  return {
    color,
  };
});

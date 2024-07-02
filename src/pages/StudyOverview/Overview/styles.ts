import { styled } from "@Utils/theme";

const StyledContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: 48,
});

export default StyledContainer;

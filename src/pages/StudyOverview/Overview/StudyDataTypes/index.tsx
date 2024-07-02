import { StyledCard, StyledDescription, StyledTitle } from "./styles";

const StudyDataTypes = () => {
  return (
    <StyledCard elevation={2}>
      <StyledTitle variant="h2">Data types</StyledTitle>
      <StyledDescription variant="h6">
        See an overview of the collected data in the last 2 weeks.
      </StyledDescription>
    </StyledCard>
  );
};

export default StudyDataTypes;

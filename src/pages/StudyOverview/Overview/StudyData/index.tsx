import { StyledCard, StyledDescription, StyledTitle } from "./styles";

const StudyData = () => {
  return (
    <StyledCard elevation={2}>
      <StyledTitle variant="h2">Study Data</StyledTitle>
      <StyledDescription variant="h6">
        See an overview of the collected and expected data in percentages, in
        the last 2 weeks.
      </StyledDescription>
    </StyledCard>
  );
};

export default StudyData;

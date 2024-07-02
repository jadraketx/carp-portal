import DeviceDeploymentStatus from "./DeviceDeploymentStatus";
import InactiveParticipants from "./InactiveParticipants";
import Participants from "./Participants";
import Status from "./Status";
import StyledContainer from "./styles";

const Overview = () => {
  return (
    <StyledContainer>
      <Status />
      <Participants />
      {/* <StudyDataTypes /> */}
      <InactiveParticipants />
      <DeviceDeploymentStatus />
      {/* <StudyData /> */}
    </StyledContainer>
  );
};

export default Overview;

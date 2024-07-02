import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import { useStudyDetails } from "@Utils/queries/studies";
import { Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  Description,
  Path,
  PathContainer,
  StudyHeaderContainer,
} from "./styles";

type Props = {
  description: string;
  path: string[];
};

const StudyHeader = ({ description, path }: Props) => {
  const { id: studyId } = useParams();
  const { data: studyDetails, isLoading, error } = useStudyDetails(studyId);

  if (error) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading study details"
        error={error}
      />
    );
  }

  return (
    <StudyHeaderContainer>
      <PathContainer>
        {isLoading ? (
          <Skeleton height="32px" width="220px" animation="wave" />
        ) : (
          <Path variant="h2">{studyDetails.name}</Path>
        )}
        <Path variant="h2">&gt;</Path>
        <Path variant="h2" section>
          {path[0]}
        </Path>
        {path.length > 1 && (
          <>
            <Path variant="h2" section>
              &gt;
            </Path>
            <Path variant="h2" section>
              {path[1]}
            </Path>
          </>
        )}
      </PathContainer>
      <Description variant="h5">{description}</Description>
    </StudyHeaderContainer>
  );
};

export default StudyHeader;

import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import GeneratedAccountLabel from "@Components/GeneratedAccountLabel";
import { useParticipantGroupsAccountsAndStatus } from "@Utils/queries/participants";
import { formatDateTime } from "@Utils/utility";
import { ParticipantData } from "@carp-dk/client";
import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSkeleton from "../LoadingSkeleton";
import {
  HeaderTableCell,
  HeaderText,
  SecondaryCellText,
  StyledCard,
  StyledDescription,
  StyledTableCell,
  StyledTableRow,
  StyledTitle,
} from "./styles";

const InactiveParticipants = () => {
  const { id: studyId } = useParams();
  const navigate = useNavigate();
  const {
    data: deploymentsAccountAndStatus,
    isLoading: isDeploymentsAccountAndStatusLoading,
    error: deploymentsAccountAndStatusError,
  } = useParticipantGroupsAccountsAndStatus(studyId);
  const [inactiveParticipants, setInactiveParticipants] = useState<
    (ParticipantData & { deploymentId: string })[]
  >([]);
  const [lastDataUploads, setLastDataUploads] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (
      deploymentsAccountAndStatus?.groups !== undefined &&
      deploymentsAccountAndStatus?.groups.length !== 0
    ) {
      const participants = deploymentsAccountAndStatus.groups
        .map((g) => {
          const participantsWithDate = g.participants.filter(
            (p) => p.dateOfLastDataUpload,
          );
          return participantsWithDate.map((p) => ({
            ...p,
            deploymentId: g.participantGroupId,
          }));
        })
        .flat()
        .sort(
          (a, b) =>
            new Date(b.dateOfLastDataUpload.value$kotlinx_datetime).getTime() -
            new Date(a.dateOfLastDataUpload.value$kotlinx_datetime).getTime(),
        );
      const uniqueParticipants = [...new Set(participants)].filter(
        (p) =>
          new Date(p.dateOfLastDataUpload.value$kotlinx_datetime).getTime() <=
          new Date().getTime() - 2 * 7 * 24 * 60 * 60 * 1000,
      );
      setInactiveParticipants(uniqueParticipants);
    }
  }, [deploymentsAccountAndStatus]);

  useMemo(() => {
    inactiveParticipants.forEach((p) => {
      const lastDataUpload = p.dateOfLastDataUpload
        ? formatDateTime(
            p.dateOfLastDataUpload.value$kotlinx_datetime.toString(),
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            },
          )
        : "";
      setLastDataUploads((prevData) => ({
        ...prevData,
        [p.participantId]: lastDataUpload,
      }));
    });
  }, [inactiveParticipants]);

  if (isDeploymentsAccountAndStatusLoading) {
    return <LoadingSkeleton />;
  }

  if (deploymentsAccountAndStatusError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading participant deployments"
        error={deploymentsAccountAndStatusError}
      />
    );
  }

  return (
    <StyledCard elevation={2}>
      <StyledTitle variant="h2">Inactive Participants</StyledTitle>
      <StyledDescription variant="h6">
        The following participants have not uploaded any data in the last 2
        weeks. Select the participant for further information or to send a
        reminder.
      </StyledDescription>
      <TableContainer sx={{ paddingLeft: "4px", paddingRight: "16px" }}>
        <Table
          style={{ tableLayout: "fixed" }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <StyledTableRow>
              <HeaderTableCell>
                <HeaderText variant="h5">Name</HeaderText>
              </HeaderTableCell>
              <HeaderTableCell>
                <HeaderText variant="h5">Email</HeaderText>
              </HeaderTableCell>
              <HeaderTableCell>
                <HeaderText variant="h5">Last Data</HeaderText>
              </HeaderTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {inactiveParticipants.map((participant) => (
              <StyledTableRow
                onClick={() =>
                  navigate(
                    `/studies/${studyId}/participants/deployments/${participant.deploymentId}/participants/${participant.participantId}`,
                  )
                }
                key={participant.participantId}
              >
                <StyledTableCell>
                  <SecondaryCellText variant="h5" noWrap>
                    {`${participant.firstName ?? ""} ${
                      participant.lastName ?? ""
                    }`}
                  </SecondaryCellText>
                </StyledTableCell>
                <StyledTableCell>
                  <SecondaryCellText variant="h5" noWrap>
                    {participant.email ?? <GeneratedAccountLabel />}
                  </SecondaryCellText>
                </StyledTableCell>
                <StyledTableCell>
                  <SecondaryCellText variant="h5">
                    {lastDataUploads[participant.participantId]}
                  </SecondaryCellText>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledCard>
  );
};

export default InactiveParticipants;

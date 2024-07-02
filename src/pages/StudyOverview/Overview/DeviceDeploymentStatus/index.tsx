import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import GeneratedAccountLabel from "@Components/GeneratedAccountLabel";
import { useParticipantGroupsAccountsAndStatus } from "@Utils/queries/participants";
import { DeviceStatus, ParticipantData } from "@carp-dk/client";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSkeleton from "../LoadingSkeleton";
import {
  HeaderTableCell,
  HeaderText,
  SecondaryCellText,
  StatusContainer,
  StyledCard,
  StyledDescription,
  StyledStatusDot,
  StyledTableCell,
  StyledTableRow,
  StyledTitle,
} from "./styles";

const DeviceDeploymentStatus = () => {
  const { id: studyId } = useParams();
  const navigate = useNavigate();
  const {
    data: deploymentsAccountAndStatus,
    isLoading: isDeploymentsAccountAndStatusLoading,
    error: deploymentsAccountAndStatusError,
  } = useParticipantGroupsAccountsAndStatus(studyId);
  const [devicesNeededForRedeployment, setDevicesNeededForRedeployment] =
    useState<
      {
        device: DeviceStatus;
        type: string;
        deploymentId: string;
        participant: ParticipantData;
      }[]
    >([]);

  useEffect(() => {
    if (
      deploymentsAccountAndStatus?.groups !== undefined &&
      deploymentsAccountAndStatus?.groups.length !== 0
    ) {
      const devicesForRedeployment = deploymentsAccountAndStatus.groups
        .map((g) => {
          const devices = g.deploymentStatus.deviceStatusList.filter(
            (dl) =>
              // eslint-disable-next-line no-underscore-dangle
              dl.__type.split(".").pop() === "NeedsRedeployment" &&
              dl.device.isPrimaryDevice,
          );
          const devicesWithParticipant = devices.map((d) => {
            const { participantId } =
              g.deploymentStatus.participantStatusList.find((psl) =>
                psl.assignedPrimaryDeviceRoleNames.includes(d.device.roleName),
              );
            const participant = g.participants.find(
              (p) => p.participantId === participantId,
            );
            return {
              device: d,
              // eslint-disable-next-line no-underscore-dangle
              type: d.__type.split(".").pop(),
              deploymentId: g.participantGroupId,
              participant,
            };
          });
          return devicesWithParticipant;
        })
        .flat();
      setDevicesNeededForRedeployment(devicesForRedeployment);
    }
  }, [deploymentsAccountAndStatus]);

  if (isDeploymentsAccountAndStatusLoading) {
    return <LoadingSkeleton />;
  }

  if (deploymentsAccountAndStatusError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading participants"
        error={deploymentsAccountAndStatusError}
      />
    );
  }

  return (
    <StyledCard elevation={2}>
      <StyledTitle variant="h2">Device deployment status</StyledTitle>
      <StyledDescription variant="h6">
        List of primary devices the ones that are not successfully deployed.
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
                <HeaderText variant="h5">Device Role</HeaderText>
              </HeaderTableCell>
              <HeaderTableCell>
                <HeaderText variant="h5">Device Status</HeaderText>
              </HeaderTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {devicesNeededForRedeployment.map(
              ({ device, type, deploymentId, participant }) => (
                <StyledTableRow
                  onClick={() =>
                    navigate(
                      `/studies/${studyId}/participants/deployments/${deploymentId}/participants/${participant.participantId}`,
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
                    <SecondaryCellText variant="h5" noWrap>
                      {device.device.roleName}
                    </SecondaryCellText>
                  </StyledTableCell>
                  <StyledTableCell>
                    <StatusContainer>
                      <StyledStatusDot status={type} />
                      <Typography variant="h6" noWrap>
                        {type}
                      </Typography>
                    </StatusContainer>
                  </StyledTableCell>
                </StyledTableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledCard>
  );
};

export default DeviceDeploymentStatus;

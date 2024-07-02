import { useSetParticipantData } from "@Utils/queries/participants";
import EditIcon from "@mui/icons-material/Edit";
import { TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import {
  EditButton,
  InputContainer,
  Left,
  Right,
  StyledCard,
  StyledDescription,
  StyledDivider,
  StyledFormControl,
  Title,
  Top,
} from "./styles";

const validationSchema = yup.object({
  fullName: yup.string(),
  sex: yup.string(),
  phoneNumber: yup.string(),
  address: yup.string(),
});

const ParticipantData = () => {
  const [editing, setEditing] = useState(false);
  const { deploymentId } = useParams();
  // TODO: Fetch participant data
  // const { data: participantData, isLoading: participantDataLoading } =
  //   useParticipantData(groupId);
  const setParticipantData = useSetParticipantData(deploymentId);
  const participantDataFormik = useFormik({
    initialValues: {
      fullName: "Jakob Bardram",
      sex: "",
      phoneNumber: "34 02 19 43",
      address: "Ørsteds Pl. 345C, 2800 Kongens Lyngby",
    },
    validationSchema,
    onSubmit: async (values) => {
      // TODO: Set participant data
      // setParticipantData.mutate()
      setEditing(false);
    },
  });

  const handleBlur = (e) => {
    const { relatedTarget } = e;

    // Check if the next focused element is an input field
    const isNextInputField =
      relatedTarget && relatedTarget.tagName.toLowerCase() === "input";

    if (!isNextInputField) {
      participantDataFormik.handleBlur(e);
      participantDataFormik.handleSubmit();
    }
  };

  // TODO: Add loading skeleton
  return (
    <StyledCard elevation={2}>
      <Top>
        <Left>
          <Title variant="h3">Participant Data</Title>
          <StyledDescription variant="h5">
            After editing data, all the changes will be autosaved.
          </StyledDescription>
        </Left>
        <Right>
          <StyledDivider />
          <EditButton onClick={() => setEditing(true)}>
            <Typography variant="h6">Edit Data</Typography>
            <EditIcon fontSize="small" />
          </EditButton>
        </Right>
      </Top>
      <StyledFormControl onBlur={handleBlur}>
        {/* TODO: Show inputs for required data */}
        <InputContainer>
          <Typography variant="h4">Full name</Typography>
          {editing ? (
            <TextField
              type="text"
              name="fullName"
              value={participantDataFormik.values.fullName}
              onChange={participantDataFormik.handleChange}
            />
          ) : (
            <Typography variant="h4">
              {participantDataFormik.values.fullName}
            </Typography>
          )}
        </InputContainer>
        <InputContainer>
          <Typography variant="h4">Phone number</Typography>
          {editing ? (
            <TextField
              type="text"
              name="phoneNumber"
              error={!!participantDataFormik.errors.phoneNumber}
              value={participantDataFormik.values.phoneNumber}
              onChange={participantDataFormik.handleChange}
              helperText={
                participantDataFormik.touched.phoneNumber &&
                participantDataFormik.errors.phoneNumber
              }
            />
          ) : (
            <Typography variant="h4">
              {participantDataFormik.values.phoneNumber}
            </Typography>
          )}
        </InputContainer>
        <InputContainer>
          <Typography variant="h4">Sex</Typography>
          {editing ? (
            <TextField
              type="text"
              name="sex"
              onChange={participantDataFormik.handleChange}
              value={participantDataFormik.values.sex}
            />
          ) : (
            <Typography variant="h4">
              {participantDataFormik.values.sex}
            </Typography>
          )}
        </InputContainer>
        <InputContainer>
          <Typography variant="h4">Address</Typography>
          {editing ? (
            <TextField
              type="text"
              name="address"
              error={!!participantDataFormik.errors.address}
              value={participantDataFormik.values.address}
              onChange={participantDataFormik.handleChange}
              helperText={
                participantDataFormik.touched.address &&
                participantDataFormik.errors.address
              }
            />
          ) : (
            <Typography variant="h4">
              {participantDataFormik.values.address}
            </Typography>
          )}
        </InputContainer>
      </StyledFormControl>
    </StyledCard>
  );
};

export default ParticipantData;

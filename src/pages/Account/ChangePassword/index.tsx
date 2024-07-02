// import { TextField, Typography } from '@mui/material';
// import { useChangePassword } from '@Utils/queries/auth';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import {
//   InputContainer,
//   StyledCard,
//   StyledFormControl,
//   StyledHeader,
//   SubmitButton,
// } from './styles';

// const passwordValidationSchema = yup.object({
//   oldPassword: yup.string().required('Password is required'),
//   newPassword: yup
//     .string()
//     .min(8, 'Password must be at least 8 characters')
//     .required('Password is required'),
// });

// const ChangePassword = () => {
//   const changePassword = useChangePassword();
//   const passwordFormik = useFormik({
//     initialValues: {
//       oldPassword: '',
//       newPassword: '',
//     },
//     validationSchema: passwordValidationSchema,
//     onSubmit: (values) => {
//       changePassword.mutate(values);
//     },
//   });
//   return (
//     <StyledCard elevation={2}>
//       <StyledHeader variant="h2">Change password</StyledHeader>
//       <StyledFormControl>
//         <InputContainer>
//           <Typography variant="h4">Current password</Typography>
//           <TextField
//             type="password"
//             name="oldPassword"
//             error={!!passwordFormik.errors.oldPassword}
//             value={passwordFormik.values.oldPassword}
//             onChange={passwordFormik.handleChange}
//             helperText={
//               passwordFormik.touched.oldPassword &&
//               passwordFormik.errors.oldPassword
//             }
//           />
//         </InputContainer>
//         <InputContainer>
//           <Typography variant="h4">New password</Typography>
//           <TextField
//             type="password"
//             name="newPassword"
//             error={!!passwordFormik.errors.newPassword}
//             value={passwordFormik.values.newPassword}
//             onChange={passwordFormik.handleChange}
//             helperText={
//               passwordFormik.touched.newPassword &&
//               passwordFormik.errors.newPassword
//             }
//           />
//         </InputContainer>
//         <SubmitButton
//           disabled={!passwordFormik.dirty}
//           variant="contained"
//           sx={{ elevation: 0 }}
//           onClick={() => passwordFormik.handleSubmit()}
//         >
//           Change password
//         </SubmitButton>
//       </StyledFormControl>
//     </StyledCard>
//   );
// };

// // const ChangePasswordSkeleton = () => {
// //   return (
// //     <StyledCard elevation={2}>
// //       <StyledHeader variant='h2'>Change password</StyledHeader>
// //       <StyledFormControl>
// //         <InputContainer>
// //           <Typography variant='h4'><Skeleton width={100} animation="wave"/></Typography>
// //           <Skeleton variant='rounded' width={375} height={56} animation="wave"/>
// //         </InputContainer>
// //         <InputContainer>
// //           <Typography variant='h4'><Skeleton width={100} animation="wave"/></Typography>
// //           <Skeleton variant='rounded' width={375} height={56} animation="wave"/>
// //         </InputContainer>
// //         <SubmitButton disabled variant="contained" sx={{ elevation: 0 }}>Change password</SubmitButton>
// //       </StyledFormControl>
// //     </StyledCard>);
// // };

// export default ChangePassword;

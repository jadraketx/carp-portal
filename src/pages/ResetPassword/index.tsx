// import AuthActionButton from '@Components/Buttons/AuthActionButton';
// import CarpInput from '@Components/CarpInput';
// import PublicPageLayout from '@Components/Layout/PublicPageLayout';
// import AuthPageLayout from '@Components/Layout/PublicPageLayout/AuthPageLayout';
// import { AuthInfoText } from '@Components/Layout/PublicPageLayout/AuthPageLayout/styles';
// import { NewPassword } from '@carp-dk/client';
// import { useResetPassword } from '@Utils/queries/auth';
// import { useFormik } from 'formik';
// import { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import * as yup from 'yup';

// const validationSchema = yup.object({
//   password: yup
//     .string()
//     .min(8, 'Password has to be at least 8 characters long')
//     .required('Password is required'),
//   confirmPassword: yup
//     .string()
//     .min(8, 'Password has to be at least 8 characters long')
//     .required('Password is required')
//     .oneOf([yup.ref('password'), null], 'Passwords must match'),
// });

// const ResetPassword = () => {
//   const [urlParams] = useSearchParams();
//   const resetPassword = useResetPassword();
//   const [token] = useState(decodeURI(urlParams.get('token') ?? ''));

//   const formik = useFormik({
//     initialValues: {
//       password: '',
//       confirmPassword: '',
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       const newPassword: NewPassword = {
//         password: values.password,
//         token,
//       };
//       resetPassword.mutate(newPassword);
//     },
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (resetPassword.isSuccess) {
//       navigate('/');
//       formik.resetForm();
//     }
//   }, [resetPassword.isSuccess]);

//   return (
//     <PublicPageLayout>
//       <AuthPageLayout title="Reset password">
//         <AuthInfoText variant="h4_web">
//           You requested a password reset. Please enter your new password.
//         </AuthInfoText>
//         <form onSubmit={formik.handleSubmit}>
//           <CarpInput
//             name="password"
//             label="Password"
//             type="password"
//             formikConfig={formik}
//             autoComplete="new-password"
//             variant="outlined"
//           />
//           <CarpInput
//             name="confirmPassword"
//             label="Confirm Password"
//             type="password"
//             formikConfig={formik}
//             autoComplete="new-password"
//             variant="outlined"
//           />
//           <AuthActionButton text="Submit" loading={resetPassword.isLoading} />
//         </form>
//       </AuthPageLayout>
//     </PublicPageLayout>
//   );
// };

// export default ResetPassword;

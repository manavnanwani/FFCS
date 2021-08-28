import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import axios from 'axios';
import { API_SERVICE } from '../../../config/API';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    firstName: '',
    lastName: '',
    regNo: '',
    password: ''
  });

  const handleChange = (e) => {
    setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value });
  };

  const register = async () => {
    await axios
      .post(`${API_SERVICE}/student`, {
        name: `${studentInfo.firstName} ${studentInfo.lastName}`,
        regNo: studentInfo.regNo,
        password: studentInfo.password
      })
      .then((res) => {
        sessionStorage.setItem('name', res.data.name);
        sessionStorage.setItem('regNo', res.data.regNo);
        sessionStorage.setItem('studentId', res.data.id);
        navigate('/dashboard', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              value={studentInfo.firstName}
              name="firstName"
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Last name"
              value={studentInfo.lastName}
              name="lastName"
              onChange={handleChange}
            />
          </Stack>

          <TextField
            fullWidth
            type="text"
            label="Registration Number"
            value={studentInfo.regNo}
            name="regNo"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            value={studentInfo.password}
            name="password"
            onChange={handleChange}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={register}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

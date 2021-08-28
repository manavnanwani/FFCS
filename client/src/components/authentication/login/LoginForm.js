import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import axios from 'axios';
import { API_SERVICE } from '../../../config/API';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [regNo, setRegNo] = useState('');

  const login = async () => {
    await axios
      .get(`${API_SERVICE}/student/${regNo}`)
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

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            type="test"
            label="Registration Number"
            value={regNo}
            onChange={(e) => {
              setRegNo(e.target.value);
            }}
          />

          {/* <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          /> */}
        </Stack>

        <LoadingButton
          sx={{ mt: 4 }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={login}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { ImageLogo } from "../../src/layout/header/Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import AuthLayout from "../../src/authLayout/index";

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Grid container sx={{height:'100%',minHeight:'100vh'}}>
        <Grid
          item
          md={6}
          xs={12}
          display="flex"
          flexDirection="column"
          gap={3}
          alignItems="center"
          justifyContent="center"
        >
          <ImageLogo>
            <Image
              src="/assets/images/consortiaLogo.svg"
              width={390}
              height={89}
              alt="Logo"
            />
          </ImageLogo>
          <Typography variant="h3">Hello! Welcome Back</Typography>
          <Typography variant="h4">Login to your account</Typography>

          <Formik
            initialValues={{
              email: "",
              password: "",
              remember: true,
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              console.log(values);
              setSubmitting(false);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Email should be a valid email")
                .required("Email is Required"),
              password: Yup.string().required("Password is required"),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
              } = props;
              return (
                <form onSubmit={handleSubmit} style={{width: '70%'}} >
                  {console.log(values)}
                  <Box display="flex" flexDirection="column" rowGap={5} sx={{width:'100%'}}>
                    <Box width='100%'>
                      <InputLabel shrink htmlFor="email-input">
                        Enter your Email:
                      </InputLabel>
                      <TextField
                      fullWidth
                        sx={{
                          "& legend": { display: "none" },
                          "& fieldset": {
                            top: 0,
                            borderRadius: "24px",
                          },
                        }}
                        id="email-input"
                        error={errors.email && touched.email}
                        label=""
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.email && touched.email && errors.email
                        }
                      />
                    </Box>

                    <Box>
                      <InputLabel shrink htmlFor="password-input">
                        Password:
                      </InputLabel>
                      <TextField
                      fullWidth
                        sx={{
                          height: "50px",
                          "& legend": { display: "none" },
                          "& fieldset": {
                            top: 0,
                            borderRadius: "24px",
                          },
                        }}
                        id="password-input"
                        label=""
                        name="password"
                        error={errors.password && touched.password}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.password && touched.password && errors.password
                        }
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff opacity={0.8} />
                              ) : (
                                <Visibility opacity={0.8} />
                              )}
                            </IconButton>
                          ),
                        }}
                      />
                    </Box>
                    <Box display="flex" flexDirection="column">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <FormControlLabel
                          name="remember"
                          onChange={handleChange}
                          control={
                            <Checkbox
                              checked={values.remember}
                              sx={{
                                color: "#3DB8D1",
                                "&.Mui-checked": {
                                  color: "#3DB8D1",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography variant="body2">Remember Me</Typography>
                          }
                        />
                        <Button variant="text">
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#AC61D7",
                              textTransform: "none",
                              textDecoration: "underline",
                            }}
                          >
                            Forgot Password
                          </Typography>
                        </Button>
                      </Box>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        sx={{
                          background:
                            "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                          borderRadius: "24px",
                          width: { xs: "90%", md: "100%" },
                        }}
                      >
                        Login
                      </Button>
                    </Box>
                  </Box>
                </form>
              );
            }}
          </Formik>
        </Grid>
        <Grid item xs={6} display='flex' alignItems='center' justifyContent='center'>
          <Card sx={{ background: "inherit", width: "80%", margin: 'auto' }} elevation={0} >
            <CardMedia
              title="Laptop"
              image="/assets/images/loginLaptopImage.png"
              component="img"
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
Login.getLayout = function (page) {
  return <AuthLayout>{page}</AuthLayout>;
};

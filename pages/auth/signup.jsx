import Image from "next/image";
import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthLayout from "../../src/authLayout/index";
import TextAndDoubleButtons from "../../src/components/modals/textAndDoubleButtons/TextAndDoubleButtons";
import CustomInputField from "../../src/components/common/CustomInputField";
import { publicAxios } from "../../src/api";
import toast, { Toaster } from "react-hot-toast";
import DialogTextInput from "../../src/components/modals/dialogTextInput/DialogTextInput";
import countries from "../../src/listOfCountriesAndStates.json";
import { useRouter } from "next/router";
import { useTitle } from "../../src/utils/Title";
import { useAuthContext } from "../../src/context/AuthContext";
import { ImageLogo } from "../../src/layout/header/Header";
import {
  AUTH_REGISTER,
  EDIT_USER_PROFILE,
} from "../../src/constants/endpoints";

const practitionerOptions = [
  { value: "agent/broker", label: "Real Estate Agent/Broker" },
  { value: "loan officer", label: "Loan Officer / Lender" },
  { value: "title/escrow", label: "Title / Settlement" },
  { value: "mortgage broker", label: "Mortgage Broker" },
  { value: "appraiser", label: "Appraiser" },
];

export const listOfCountries = countries.countries.map((item) => ({
  value: item.country,
  label: item.country,
}));

const inputFields = [
  { name: "email", label: "Email Address", placeholder: "mail@example.com" },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "+12345678900",
    inputType: "phone",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Minimum of 8 characters",
    sensitive: true,
    onCutCopyPaste: (e) => e.preventDefault(),
  },
  {
    name: "confirm_password",
    label: "Confirm Password",
    placeholder: "Confirm Password",
    sensitive: true,
    onCutCopyPaste: (e) => e.preventDefault(),
  },
];

const secondFormInputFields = [
  {
    name: "practitioner",
    label: "Practitioner",
    placeholder: "Select Category",
    options: practitionerOptions,
    select: true,
  },
  {
    name: "companyName",
    label: "Business Name",
    placeholder: "Enter your Business Name",
  },
  {
    name: "country",
    label: "Country",
    placeholder: "Select Country",
    select: true,
    options: listOfCountries,
  },
  {
    name: "state",
    label: "State / Province",
    placeholder: "Select State",
  },
];

const SignUp = () => {
  const belowSm = useMediaQuery((theme) =>
    theme.breakpoints.between("xs", "sm")
  );

  useTitle("Signup");
  const {
    showSecondForm,
    setShowSecondForm,
    choosePractitionerOpen,
    setChoosePractitionerOpen,
  } = useAuthContext();
  const [isPractitioner, setIsPractitioner] = useState(false);
  const [emailVerificationOpen, setEmailVerificationOpen] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const { push } = useRouter();

  const signup = async ({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirm_password,
  }) => {
    if (phoneNumber.length > 1) {
      try {
        const res = await publicAxios.post(`${AUTH_REGISTER}`, {
          firstName,
          lastName,
          email: email.toLowerCase(),
          phoneNumber: `+${phoneNumber}`,
          password,
          confirm_password,
          role: isPractitioner ? "Practitioner" : "Consumer",
        });
        toast.success("Welcome to Consortia! Please verify your email");
        setEmail(email);
        setEmailVerificationOpen(true);
        console.log(res);
      } catch (error) {
        if (Array.isArray(error?.data?.message)) {
          toast.error(error?.data?.message?.error?.[0]);
        } else {
          if (typeof error?.data?.message === "string") {
            toast.error(error?.data?.message);
          } else {
            toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
          }
        }
      }
    } else {
      toast.error("Please enter valid phone number");
    }
  };
  const completeDetails = async ({
    practitioner,
    license,
    country,
    state,
    companyName,
  }) => {
    debugger;
    try {
      const res = await publicAxios.patch(
        `${EDIT_USER_PROFILE}/${
          JSON.parse(localStorage.getItem("profile_info"))?.user?.id
        }`,
        {
          create_profile: true,
          practitionerType: practitioner,
          state: state,
          country: country,
          ...(license?.length > 1 && { licenseNumber: license }),
          companyName: companyName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      const old_profile_info = JSON.parse(localStorage.getItem("profile_info"));
      const new_profile_info = {
        ...old_profile_info,
        user: {
          ...old_profile_info.user,
          practitionerType: practitioner,
          state: state,
          country: country,
          ...(license?.length > 1 && { licenseNumber: license }),
          companyName: companyName,
        },
      };
      localStorage.setItem("profile_info", JSON.stringify(new_profile_info));
      toast.success("Details Added Successfully");
      setTimeout(() => push("/dashboard/landing"), 2500);
    } catch (error) {
      if (Array.isArray(error?.data?.message)) {
        toast.error(error?.data?.message?.error?.[0]);
      } else {
        if (typeof error?.data?.message === "string") {
          toast.error(error?.data?.message);
        } else {
          toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
        }
      }
    }
  };
  return (
    <>
      <TextAndDoubleButtons
        open={choosePractitionerOpen}
        setIsPractitioner={setIsPractitioner}
        title="This Account is for?"
        text="Please select your category if you are a practitioner then select practitioner otherwise select consumer."
        btnText1="consumer"
        btnText2="practitioner"
        setOpen={setChoosePractitionerOpen}
        height="350px"
      />
      <DialogTextInput
        open={emailVerificationOpen}
        setOpen={setEmailVerificationOpen}
        title="Verification Code"
        text="Verification code has been sent to your email"
        btnText="Send Request"
        inputTypeCode
        placeholder="Enter Code"
        email={email}
        isPractitioner={isPractitioner}
      />
      <Grid container sx={{ height: "100%", minHeight: "100vh" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: " url(/assets/images/signupbackground.jpg) no-repeat",
            backgroundSize: "100% 100%",
            display: { xs: "none", md: "flex" },
            // width:"100%"
          }}
        >
          <Box
            height="100%"
            paddingY={5}
            sx={{
              background: "rgba(24, 10, 91, 0.8)",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box sx={{ ":hover": { cursor: "pointer" } }}>
              <Image
                onClick={() => push("/")}
                src="/assets/images/consortiaLogo.svg"
                width={320}
                height={178}
                alt="Logo"
              />
            </Box>
          </Box>
        </Grid>
        {belowSm && (
          <ImageLogo
            sx={{
              ":hover": { cursor: "pointer" },
              padding: { xs: "24px 0px 32px 0px", md: "0px" },
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
            onClick={() => push("/")}
          >
            <Image
              src="/assets/images/consortiaLogo.svg"
              width={belowSm ? 104 : 217}
              height={belowSm ? 54 : 125}
              alt="Logo"
            />
          </ImageLogo>
        )}
        {!showSecondForm ? (
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "start", sm: "center" },
              justifyContent: { xs: "start", sm: "center" },
            }}
            rowGap={3}
          >
            {/* <ImageLogo
            sx={{ ":hover": { cursor: "pointer" }, padding:{xs:"24px 0px 32px 0px", md: "0px"}}}
            onClick={() => push("/")}
          >
            <Image
              src="/assets/images/consortiaLogo.svg"
              width={belowSm ? 104 : 217}
              height={belowSm ? 54 : 125}
              alt="Logo"
            />
          </ImageLogo> */}
            <Typography variant="h3" sx={{paddingLeft:{xs:'24px',sm:'0px'}}}>User Registration</Typography>
            <Formik
              initialValues={{
                isPractitioner: isPractitioner,
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                password: "",
                confirm_password: "",
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                await signup(values);
                setSubmitting(false);
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string()
                  .required("First Name is required")
                  .matches(
                    /^[A-Za-z]+$/,
                    "First Name can only contain alphabets"
                  ),
                lastName: Yup.string()
                  .required("Last Name is required")
                  .matches(
                    /^[A-Za-z]+$/,
                    "Last Name can only contain alphabets"
                  ),
                email: Yup.string()
                  .email("Email should be a valid email")
                  .required("Email is required"),
                phoneNumber: Yup.string().required("Phone number is required"),
                // .matches(
                //   /^\+([0-9]){11,12}$/gm,
                //   "Please enter a valid phone number"
                // ),
                password: Yup.string()
                  .required("Password is required")
                  .min(8, "Password should have a minimum of 8 characters")
                  .matches(
                    /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
                    "Must contain atleast one lowercase, one uppercase, a number, and a symbol"
                  ),
                confirm_password: Yup.string()
                  .required("Confirm Password is required")
                  .oneOf([Yup.ref("password"), null], "Password must match"),
              })}
            >
              {(props) => {
                const { isSubmitting, handleSubmit, setFieldValue } = props;
                return (
                  <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    style={{ width: { md: "80%", xs: "100%" } }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      boxSizing="border-box"
                      // width="80%"
                      sx={{width: { md: "80%", xs: "85%" } }}
                      margin="auto"
                      // paddingX={2}
                      rowGap={3}
                    >
                      <Box>
                        <InputLabel shrink htmlFor="firstName">
                          Name
                        </InputLabel>
                        <Box
                          display="flex"
                          alignItems="start"
                          columnGap={3}
                          justifyContent="space-between"
                        >
                          <CustomInputField
                            name="firstName"
                            placeholder="First Name"
                          />
                          <CustomInputField
                            name="lastName"
                            placeholder="Last Name"
                          />
                        </Box>
                      </Box>

                      {inputFields.map(
                        ({
                          name,
                          label,
                          placeholder,
                          sensitive,
                          inputType,
                          onCutCopyPaste,
                        }) => (
                          <CustomInputField
                            key={name}
                            name={name}
                            label={label}
                            placeholder={placeholder}
                            sensitive={sensitive}
                            onCutHandler={onCutCopyPaste}
                            onCopyHandler={onCutCopyPaste}
                            onPasteHandler={onCutCopyPaste}
                            inputType={inputType}
                            setFieldValue={setFieldValue}
                          />
                        )
                      )}

                      <Box display="flex" flexDirection="column" mt={4}>
                        {isPractitioner ? (
                          <Button
                            variant="gradient"
                            size="large"
                            type="submit"
                            disabled={isSubmitting}
                            sx={{
                              fontSize: "20px",
                              fontWeight: 600,
                            }}
                          >
                            Next
                          </Button>
                        ) : (
                          <Button
                            variant="gradient"
                            size="large"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Create Account
                          </Button>
                        )}
                        <Typography variant="body2" textAlign="center">
                          Already have an account?
                          <Button
                            variant="text"
                            onClick={() => push("login")}
                            sx={{
                              textDecoration: "underline",
                              textTransform: "none",
                              fontSize: "16px",
                            }}
                          >
                            Login
                          </Button>
                        </Typography>
                      </Box>
                    </Box>
                  </form>
                );
              }}
            </Formik>
            <Box></Box>
          </Grid>
        ) : (
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            rowGap={3}
            justifyContent="center"
          >
            <Typography variant="h3">Practitioner Details</Typography>
            <Formik
              initialValues={{
                isPractitioner: isPractitioner,
                practitioner: "",
                companyName: "",
                country: "",
                state: "",
                license: "",
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                await completeDetails(values);
                setSubmitting(false);
              }}
              validationSchema={Yup.object().shape({
                practitioner: Yup.string().required(
                  "Practitioner type is required"
                ),
                companyName: Yup.string().required("Business Name is required"),
                country: Yup.string().required("Country is required"),
                state: Yup.string().required("Province / State is required"),
                license: Yup.string().when(["practitioner", "country"], {
                  is: (practitioner, country) =>
                    (practitioner == "agent/broker" ||
                      practitioner == "loan officer") &&
                    country == "United States",
                  then: Yup.string().required("This field is required"),
                  otherwise: Yup.string().optional(),
                }),
              })}
            >
              {(props) => {
                const { isSubmitting, handleSubmit, values } = props;
                return (
                  <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    style={{ width: "80%" }}
                    // style={{ width: {md:"80%",xs:"100%"} }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      boxSizing="border-box"
                      // width="80%"
                      margin="auto"
                      // paddingX={2}
                      rowGap={3}
                      sx={{ width: { md: "80%", xs: "100%" } }}
                    >
                      {secondFormInputFields.map(
                        ({ name, label, placeholder, select, options }) => (
                          <CustomInputField
                            key={name}
                            name={name}
                            label={label}
                            placeholder={placeholder}
                            select={select}
                            options={options}
                          />
                        )
                      )}
                      <CustomInputField
                        name={"license"}
                        label={
                          values.practitioner == "loan officer"
                            ? "NMLS"
                            : values.practitioner == "title/escrow"
                            ? "Title Number"
                            : "License Number"
                        }
                        placeholder={"EF12345678910"}
                      />
                      <Box display="flex" flexDirection="column">
                        <Button
                          variant="gradient"
                          size="large"
                          type="submit"
                          disabled={isSubmitting}
                          sx={{
                            fontSize: "20px",
                            fontWeight: 600,
                          }}
                        >
                          Complete Details
                        </Button>
                      </Box>
                    </Box>
                  </form>
                );
              }}
            </Formik>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default SignUp;

SignUp.getLayout = function (page) {
  return <AuthLayout>{page}</AuthLayout>;
};

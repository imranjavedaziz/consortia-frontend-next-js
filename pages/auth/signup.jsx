import Image from "next/image";
import React, { useState } from "react";
import { Box, Button, Grid, InputLabel, Typography } from "@mui/material";
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTitle } from "../../src/utils/Title";

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
    placeholder: "Enter your phone number",
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
  useTitle("Signup");

  const [open, setOpen] = useState(true);
  const [isPractitioner, setIsPractitioner] = useState(false);
  const [emailVerificationOpen, setEmailVerificationOpen] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [showSecondForm, setShowSecondForm] = useState(false);
  const { push } = useRouter();

  const signup = async ({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  }) => {
    try {
      const res = await publicAxios.post("auth/register", {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        role: isPractitioner ? "practitioner" : "user",
      });
      toast.success("Welcome to Consortia! Please verify your email");
      setEmail(email);
      setEmailVerificationOpen(true);
    } catch (error) {
      if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else {
        toast.error(error?.data?.err?.msg);
      }
    }
  };
  const completeDetails = async ({
    practitioner,
    license,
    country,
    state,
    companyName,
  }) => {
    try {
      const res = await publicAxios.put(
        "user/update",
        {
          practitionerType: practitioner,
          state: state,
          country: country,
          ...(license.length > 1 && { licenseNumber: license }),
          companyName: companyName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      toast.success("Details Added Successfully");
      setTimeout(() => push("/"), 2500);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };
  return (
    <>
      <TextAndDoubleButtons
        open={open}
        setIsPractitioner={setIsPractitioner}
        title="This Account is for?"
        text="Please select your category if you are a practitioner then select practitioner otherwise select consumer."
        btnText1="consumer"
        btnText2="practitioner"
        setOpen={setOpen}
        height="333px"
      />
      <DialogTextInput
        open={emailVerificationOpen}
        setOpen={setEmailVerificationOpen}
        title="Verification Code"
        text="Verification code has been sent to your email"
        btnText="Submit"
        inputTypeCode
        placeholder="Enter your verification code"
        email={email}
        isPractitioner={isPractitioner}
        showSecondForm={showSecondForm}
        setShowSecondForm={setShowSecondForm}
      />
      <Grid container sx={{ height: "100%", minHeight: "100vh" }}>
        <Grid
          item
          xs={6}
          sx={{
            background: " url(/assets/images/signupbackground.png) no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Box
            height="100%"
            paddingY={5}
            sx={{
              background: "rgba(24, 10, 91, 0.8)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ ":hover": { cursor: "pointer" } }}>
              <Image
                onClick={() => push("/")}
                src="/assets/images/consortiaLogo.svg"
                width={390}
                height={89}
                alt="Logo"
              />
            </Box>
          </Box>
        </Grid>
        {!showSecondForm ? (
          <Grid
            item
            xs={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            rowGap={3}
            justifyContent="center"
          >
            <Typography variant="h3">User Registration</Typography>
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
                  .email("Email Should be a valid email")
                  .required("Email is required"),
                phoneNumber: Yup.string().required("Phone number is required"),
                password: Yup.string()
                  .required("Password is required")
                  .min(8, "Password should have a minimum of 8 characters")
                  .matches(
                    /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
                    "Must contain atleast one lowercase, one uppercase, a number, and a symbol"
                  ),
                confirm_password: Yup.string()
                  .required("Confirm Password is required")
                  .oneOf([Yup.ref("password"), null], "Passwords must match"),
              })}
            >
              {(props) => {
                const { isSubmitting, handleSubmit } = props;
                return (
                  <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    style={{ width: "80%" }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      boxSizing="border-box"
                      width="80%"
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
                          />
                        )
                      )}

                      {/* <Box
                        sx={{
                          // background: false
                          //   ? "rgba(255,0,0,0.7)"
                          //   : "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                          display: "flex",
                          justifyContent: "center",
                          position: "relative",
                          borderRadius: "24px",
                          "&:after": {
                            position: "absolute",
                            top: -4,
                            left: -4,
                            right: -4,
                            bottom: -4,
                            background: "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                            content: '""',
                            zIndex: -1,
                            borderRadius: '24px'
                          },
                          "& .react-tel-input ": {
                            "& .form-control": {
                              display: "block !important",
                              boxSizing: "border-box !important",
                              marginTop: "0 !important",
                              paddingLeft: ["30px", "42px !important"],
                              height: "43px",
                              borderRadius: "30px !important",
                              border: "none",
                              background: "rgba(29, 6, 104, 0.7)",
                              width:'100%',
                              color: "#fff",
                              outline: "0",
                            },
                            "& .flag-dropdown": {
                              outline: "0",
                              position: "absolute",
                              top: "0",
                              bottom: "0",
                              color: "black",
                              padding: "0",
                              background: "transparent",
                              border: "none",
                              borderRadius: "30px 0 0 30px",
                              "& :hover":{
                                backgroundColor:'none'
                              }
                            },
                          },
                        }}
                      >
                        <PhoneInput
                          required={true}
                          name="phone"
                          country={"gb"}
                          enableSearch={true}
                          value={phoneNo}
                          countryCodeEditable={false}
                          jumpCursorToEnd={true}
                          // disableCountryCode={true}
                          onChange={(phone) => {
                            setPhoneNo(phone);
                          }}

                          // isValid={(value, country) => {
                          //   if (value.match(/12345/)) {
                          //     return "Invalid value: " + value + ", " + country.name;
                          //   } else if (value.match(/1234/)) {
                          //     return false;
                          //   } else {
                          //     return true;
                          //   }
                          // }}
                          // inputProps={{
                          //   name: "phone",
                          //   required: true,
                          //   // value: `${phoneNo == "" ? "" : `+${phoneNo}`}`,
                          //   autoComplete: "off",
                          //   pattern: ".{12,}",
                          // }}
                        />
                      </Box> */}

                      <Box display="flex" flexDirection="column" mt={4}>
                        {isPractitioner ? (
                          <Button
                            variant="gradient"
                            size="large"
                            type="submit"
                            disabled={isSubmitting}
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
            xs={6}
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
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      boxSizing="border-box"
                      width="80%"
                      margin="auto"
                      // paddingX={2}
                      rowGap={3}
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

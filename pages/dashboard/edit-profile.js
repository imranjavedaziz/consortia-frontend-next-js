import NftsLayout from "../../src/nftsLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { publicAxios } from "../../src/api";

import toast, { Toaster } from "react-hot-toast";
import { listOfCountries } from "../auth/signup";
import CustomInputField from "../../src/components/common/CustomInputField";
import VerifyCodeForProfileUpdate from "../../src/components/modals/verifyCodeForProfileUpdate/VerifyCodeForProfileUpdate";
import { useTitle } from "../../src/utils/Title";

const practitionerOptions = [
  { value: "agent/broker", label: "Real Estate Agent/Broker" },
  { value: "loan officer", label: "Loan Officer / Lender" },
  { value: "title/escrow", label: "Title / Settlement" },
  { value: "mortgage broker", label: "Mortgage Broker" },
  { value: "appraiser", label: "Appraiser" },
];

const inputFields = [
  { name: "email", label: "Email Address", placeholder: "mail@example.com", 
  disabled: true,
},
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    disabled: true,

  },
  {
    name: "practitionerType",
    label: "Practitioner",
    placeholder: "Select Category",
    options: practitionerOptions,
    select: true,
    disabled: true,
  },
  {
    name: "licenseNumber",
    label: "License Number",
    placeholder: "License Number",
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
    disabled: true,
    options: listOfCountries,
  },
  {
    name: "state",
    label: "State / Province",
    disabled: true,

    placeholder: "Select State",
  },
];

const consumerInputField = [
  { name: "email", label: "Email Address", placeholder: "mail@example.com" },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter your phone number",
  },
];

const EditProfile = () => {
  useTitle("Edit Profile");
  const isMobile = useMediaQuery("(max-width:600px)");

  const [userData, setUserData] = useState({});
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const [refetchData, setRefetchData] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    const profile_info = JSON.parse(localStorage.getItem("profile_info"));
    setProfileInfo(profile_info);
  }, []);

  const fetchUpdatedData = () => {
    setRefetchData((prev) => !prev);
  };

  const getUserData = async () => {
    try {
      const res = await publicAxios.get("user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setUserData(res?.data?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [refetchData]);

  const updateUserData = async (values) => {
    const originalKeys = Object.keys(values);
    const valuesToSend = {};
    originalKeys.forEach((item) => {
      if (values[item] !== userData[item]) {
        valuesToSend[item] = values[item];
      }
    });
    if (Object.keys(valuesToSend).length > 0) {
      setUpdatedUserData(valuesToSend);
      try {
        const res = await publicAxios.put("user/update", valuesToSend, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        toast.success(res?.data?.message);
        setOpenVerificationModal(true);
      } catch (error) {
        if (error?.data?.message) {
          toast.error(error?.data?.message);
        } else {
          toast.error(error?.data?.err?.msg);
        }
      }
    } else {
      toast.error("No changes detected");
    }
  };
  return (
    <Box marginY={{ xs: 0, md: 5 }}>
      <Typography variant="h3" marginY={{ md: 5 }}>
        Settings
      </Typography>
      <Box
        sx={{
          background:
            "linear-gradient(253.4deg, #B731FF 16.47%, #1D2CDF 95.2%)",
          padding: "1px",
          borderRadius: "24px",
          boxShadow: 2,
        }}
      >
        <Box
          display="flex"
          paddingY={{ xs: 1, md: 4 }}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            background:
              "linear-gradient(94.09deg, #12134D 3.97%, #10053C 51.03%, #12134D 95.99%)",
            borderRadius: "24px",
          }}
        >
          <Box>
            <Typography variant="h3">Profile Details</Typography>
          </Box>
          {profileInfo?.user?.role === "Practitioner"
            ? Object.keys(userData).length > 0 && (
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                    practitionerType: userData.practitionerType,
                    companyName: userData.companyName,
                    country: userData.country,
                    state: userData.state,
                    licenseNumber: userData.licenseNumber,
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await updateUserData(values);
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
                    phoneNumber: Yup.string()
                      .required("Phone number is required")
                      .matches(
                        /^\+([0-9]){11,12}$/gm,
                        "Please enter a valid phone number"
                      ),
                    practitionerType: Yup.string().required(
                      "Practitioner type is required"
                    ),
                    companyName: Yup.string().required(
                      "Business Name is required"
                    ),
                    country: Yup.string().required("Country is required"),
                    state: Yup.string().required(
                      "Province / State is required"
                    ),
                    licenseNumber: Yup.string().when(
                      ["practitionerType", "country"],
                      {
                        is: (practitionerType, country) =>
                          (practitionerType == "agent/broker" ||
                            practitionerType == "loan officer") &&
                          country == "United States",
                        then: Yup.string().required("This field is required"),
                        otherwise: Yup.string().optional(),
                      }
                    ),
                  })}
                >
                  {(props) => {
                    const {
                      isSubmitting,
                      handleSubmit,
                      initialValues,
                      resetForm,
                    } = props;
                    return (
                      <form
                        onSubmit={handleSubmit}
                        autoComplete="off"
                        style={{
                          width: isMobile ? "100%" : "80%",
                          maxWidth: "800px",
                        }}
                      >
                        <Box
                          display="flex"
                          flexDirection="column"
                          boxSizing="border-box"
                          width={{ xs: "90%", sm: "80%" }}
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
                              disabled,
                              select,
                              options,
                            }) => (
                              <CustomInputField
                                options={options}
                                select={select}
                                disabled={disabled}
                                key={name}
                                name={name}
                                label={label}
                                placeholder={placeholder}
                                sensitive={sensitive}
                              />
                            )
                          )}

                          <Box display="flex" flexDirection="column">
                            <Button
                              variant="gradient"
                              size="large"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Save Settings
                            </Button>
                          </Box>
                        </Box>
                        <VerifyCodeForProfileUpdate
                          open={openVerificationModal}
                          setOpen={setOpenVerificationModal}
                          title="Verification Code"
                          text="Verification code has been sent to your email"
                          btnText="Submit"
                          placeholder="Enter your verification code"
                          updatedUserData={updatedUserData}
                          fetchUpdatedData={fetchUpdatedData}
                          inputTypeCode
                        />
                      </form>
                    );
                  }}
                </Formik>
              )
            : Object.keys(userData).length > 0 && (
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await updateUserData(values);
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
                    phoneNumber: Yup.string()
                      .required("Phone number is required")
                      .matches(
                        /^\+([0-9]){11,12}$/gm,
                        "Please enter a valid phone number"
                      ),
                  })}
                >
                  {(props) => {
                    const {
                      isSubmitting,
                      handleSubmit,
                      initialValues,
                      resetForm,
                    } = props;
                    return (
                      <form
                        onSubmit={handleSubmit}
                        autoComplete="off"
                        style={{ width: "80%", maxWidth: "800px" }}
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
                          {consumerInputField.map(
                            ({
                              name,
                              label,
                              placeholder,
                              sensitive,
                              disabled,
                              select,
                              options,
                            }) => (
                              <CustomInputField
                                options={options}
                                select={select}
                                disabled={disabled}
                                key={name}
                                name={name}
                                label={label}
                                placeholder={placeholder}
                                sensitive={sensitive}
                              />
                            )
                          )}

                          <Box display="flex" flexDirection="column">
                            <Button
                              variant="gradient"
                              size="large"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Save Settings
                            </Button>
                          </Box>
                        </Box>
                        <VerifyCodeForProfileUpdate
                          open={openVerificationModal}
                          setOpen={setOpenVerificationModal}
                          title="Verification Code"
                          text="Verification code has been sent to your email"
                          btnText="Submit"
                          placeholder="Enter your verification code"
                          updatedUserData={updatedUserData}
                          fetchUpdatedData={fetchUpdatedData}
                          inputTypeCode
                        />
                      </form>
                    );
                  }}
                </Formik>
              )}
        </Box>
      </Box>

      <Toaster position="top-center" reverseOrder={false} />
    </Box>
  );
};

export default EditProfile;
EditProfile.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};

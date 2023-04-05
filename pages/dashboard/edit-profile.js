import NftsLayout from "../../src/nftsLayout";
import { FieldArray, Formik } from "formik";
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
import {
  EDIT_USER_PROFILE,
  GET_PROFILE_BY_USERID,
} from "../../src/constants/endpoints";
import {
  getCountriesList,
  getStateAgainstCountry,
} from "../../src/utils/countriesAndStatesApi/getCountryAndStateList";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const practitionerOptions = [
  { value: "agent/broker", label: "Real Estate Agent/Broker" },
  { value: "loan officer", label: "Loan Officer / Lender" },
  { value: "title/escrow", label: "Title / Settlement" },
  { value: "mortgage broker", label: "Mortgage Broker" },
  { value: "appraiser", label: "Appraiser" },
];

const consumerInputField = [
  {
    name: "email",
    label: "Email Address",
    placeholder: "mail@example.com",
    disabled: true,
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    disabled: true,
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
  const [countriesList, setCountries] = useState([]);
  const [statesAgainstCountry, setStatesAgainstCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [handleFormInitialization, setHandleFormInitialization] =
    useState(true);

  useEffect(() => {
    const profile_info = JSON.parse(localStorage.getItem("profile_info"));
    setProfileInfo(profile_info);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const getCountryList = await getCountriesList();
      setCountries(getCountryList);
    };
    getData();
  }, []);
  useEffect(() => {
    if (selectedCountry || userData?.country) {
      getStates();
    }
  }, [selectedCountry]);

  const getStates = async () => {
    setStatesAgainstCountry([]);
    const resStates = await getStateAgainstCountry(
      selectedCountry ? selectedCountry : userData?.country
    );
    setStatesAgainstCountry(resStates);
  };

  const fetchUpdatedData = () => {
    // console.log("refatched");
    setRefetchData(!refetchData);
  };

  const inputFields = [
    {
      name: "email",
      label: "Email Address",
      placeholder: "mail@example.com",
      // disabled: true,
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      // disabled: true,
    },
    {
      name: "practitionerType",
      label: "Practitioner",
      placeholder: "Select Category",
      options: practitionerOptions,
      select: true,
      // disabled: true,
    },
    // {
    //   name: "licenseNumber",
    //   label: "License Number",
    //   placeholder: "License Number",
    // },
    {
      name: "bio",
      label: "Bio",
      placeholder: "Enter your Bio",
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
      // disabled: true,
      options: countriesList,
    },
    // {
    //   name: "state",
    //   label: "State / Province",
    //   // disabled: true,
    //   placeholder: "Select State",
    //   select: true,
    //   // disabled: true,
    //   options: statesAgainstCountry,
    // },
  ];
  const inCaseStateNotExistInputFieldsData = inputFields.concat([
    {
      name: "other_state",
      label: "Other State",
      placeholder: "Select State",
    },
  ]);

  const getUserData = async () => {
    try {
      const res = await publicAxios.get(
        `${GET_PROFILE_BY_USERID}?user_id=${
          JSON.parse(localStorage.getItem("profile_info"))?.user?.id
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setUserData(res?.data?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("getData");
    getUserData();
  }, [refetchData]);

  const updateUserData = async (values) => {
    // debugger;
    setHandleFormInitialization((prev) => !prev);
    const originalKeys = Object.keys(values);
    const valuesToSend = {};
    const updatedData = [];
    for (let i = 0; i < values.states.length; i++) {
      for (let j = 0; j < userData?.states.length; j++) {
        if (values.states[i].id == userData.states[j].id) {
          if (
            values.states[i].state !== userData.states[j].state ||
            values.states[i].licenseNumber !== userData.states[j].licenseNumber
          ) {
            if (
              values.states[i].state == "Other" &&
              values.states[i].other_state != userData.states[j].state
            ) {
              updatedData.push(values.states[i]);
            } else if (
              (values.states[i].other_state != userData.states[j].state &&
                values.states[i].state !== userData.states[j].state) ||
              values.states[i].licenseNumber !==
                userData.states[j].licenseNumber
            ) {
              updatedData.push(values.states[i]);
            }
            // else if (
            //   values.states[i].other_state == userData.states[j].state &&
            //   values.states[i].licenseNumber == userData.states[j].licenseNumber
            // ) {
            //   updatedData.push(values.states[i]);
            // }
          }
        }
      }
      if (values.states[i]?.id == undefined) {
        updatedData.push(values.states[i]);
      }
    }

    originalKeys.forEach((item) => {
      if (values[item] !== userData[item]) {
        if (item == "licenseNumber" && values[item] == "") {
          valuesToSend[item] = null;
        } else {
          // debugger;
          // const updatedData = values.states.filter(
          //   (item) =>
          //     !userData?.states.some(
          //       (data) =>
          //         data.state.includes(item.state) &&
          //         data.licenseNumber.includes(item.licenseNumber)
          //     )
          // );
          // console.log("updatedData", updatedData);

          // console.log("updatedData", updatedData);

          if (
            item == "states" &&
            updatedData.some((item) => item.state == "Other")
          ) {
            // console.log("valuesToSend", valuesToSend);
            const changeData = updatedData.map((item) => {
              if (item.other_state) {
                return {
                  state: item.other_state,
                  licenseNumber: item.licenseNumber,
                  ...(item?.id && { id: item?.id }),
                };
              } else {
                return {
                  state: item.state,
                  licenseNumber: item.licenseNumber,
                  ...(item?.id && { id: item?.id }),
                };
              }
            });
            valuesToSend[item] = changeData;
            // console.log("changeData", changeData);
          } else {
            // console.log("not other");
            if (
              item == "states" &&
              updatedData.some((item) => item.state != "Other")
            ) {
              const changeData = updatedData.map((item) => {
                return {
                  state: item.state,
                  licenseNumber: item.licenseNumber,
                  ...(item?.id && { id: item?.id }),
                };
              });
              // console.log("changeData", changeData);
              valuesToSend[item] = changeData;
            } else {
              // console.log("ddd", values[item]);
              if (updatedData.length == 0) {
                valuesToSend[item] = values[item];
                delete valuesToSend.states;
              } else {
                valuesToSend[item] = values[item];
              }
            }
          }
        }
      }
    });
    // console.log("iiii", valuesToSend);
    if (Object.keys(valuesToSend).length > 0) {
      debugger;
      setUpdatedUserData(valuesToSend);
      if (
        ((valuesToSend.practitionerType || values.practitionerType) ==
          "agent/broker" ||
          (valuesToSend.practitionerType || values.practitionerType) ==
            "loan officer") &&
        (valuesToSend.country || values.country) == "united states" &&
        valuesToSend?.states?.some(
          (item) =>
            item.licenseNumber == "" ||
            item.licenseNumber == undefined ||
            item.licenseNumber == null
        )
      ) {
        toast.error("Lisence number is required");
      } else {
        try {
          const { other_state, ...data } = valuesToSend;
          const res = await publicAxios.patch(
            `${EDIT_USER_PROFILE}/${
              JSON.parse(localStorage.getItem("profile_info"))?.user?.id
            }`,
            {
              ...data,
              edit_profile: true,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          );
          toast.success(res?.data?.message);
          setOpenVerificationModal(true);
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
      }
    } else {
      toast.error("No changes detected");
    }
  };
  // console.log("statesAgainstCountry", statesAgainstCountry);
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
          {/* {console.log("handleFormInitialization", handleFormInitialization)} */}
          {profileInfo?.user?.role === "Practitioner"
            ? Object.keys(userData).length > 0 && (
                <Formik
                  enableReinitialize={handleFormInitialization}
                  initialValues={{
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                    practitionerType: userData.practitionerType,
                    bio: userData.bio,
                    companyName: userData.companyName,
                    country: selectedCountry || userData.country.toLowerCase(),
                    // state: statesAgainstCountry?.some(
                    //   (item) => item.value == userData.state.toLowerCase()
                    // )
                    //   ? userData.state && userData.state.toLowerCase()
                    //   : selectedCountry != userData.country
                    //   ? ""
                    //   : "Other",
                    // licenseNumber: userData.licenseNumber ?? "",
                    // other_state: statesAgainstCountry?.some(
                    //   (item) => item.value == userData.state.toLowerCase()
                    // )
                    //   ? ""
                    //   : userData.state.toLowerCase(),
                    states: (selectedCountry != userData.country
                      ? [{ state: "", licenseNumber: "", other_state: "" }]
                      : userData.states
                    )?.map((item) => {
                      return {
                        state:
                          selectedCountry != userData.country
                            ? ""
                            : statesAgainstCountry?.find((data) =>
                                data.value.includes(item.state.toLowerCase())
                              )?.value
                            ? statesAgainstCountry.find((data) =>
                                data.value.includes(item.state.toLowerCase())
                              )?.value
                            : selectedCountry != userData.country
                            ? ""
                            : "Other",
                        licenseNumber:
                          selectedCountry != userData.country
                            ? ""
                            : item.licenseNumber ?? "",
                        other_state: statesAgainstCountry?.find((data) =>
                          data.value.includes(item.state.toLowerCase())
                        )?.value
                          ? ""
                          : item.state,
                        id: item.id,
                      };
                    }),
                    // states: [
                    //   {
                    //     state: "",
                    //     licenseNumber: "",
                    //     other_state: "",
                    //   },
                    // ],
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
                    phoneNumber: Yup.string().required(
                      "Phone number is required"
                    ),
                    // .matches(
                    //   /^\+([0-9]){11,12}$/gm,
                    //   "Please enter a valid phone number"
                    // ),
                    practitionerType: Yup.string().required(
                      "Practitioner type is required"
                    ),
                    companyName: Yup.string().required(
                      "Business Name is required"
                    ),
                    bio: Yup.string()
                      .max(1000, "Bio should be less than 1000 characters")
                      .required("Bio is required"),
                    country: Yup.string().required("Country is required"),

                    // other_state: Yup.string().when(["state"], {
                    //   is: (state) => {
                    //     return state == "Other";
                    //   },
                    //   then: Yup.string().required("State is required"),
                    //   // .min(1, "Entity Name is required"),
                    //   otherwise: Yup.string().optional(),
                    // }),
                    states: Yup.array().of(
                      Yup.object().shape({
                        state: Yup.string().required(
                          "Province / State is required"
                        ),
                        licenseNumber: Yup.string().optional(
                          "License Number is required"
                        ),
                        other_state: Yup.string().when(["state"], {
                          is: (state) => {
                            return state == "Other";
                          },
                          then: Yup.string().required("State is required"),
                          otherwise: Yup.string().optional(),
                        }),
                      })
                    ),
                    // licenseNumber: Yup.string().when(
                    //   ["practitionerType", "country"],
                    //   {
                    //     is: (practitionerType, country) =>
                    //       (practitionerType == "agent/broker" ||
                    //         practitionerType == "loan officer") &&
                    //       country == "United States",
                    //     then: Yup.string().required("This field is required"),
                    //     otherwise: Yup.string().optional(),
                    //   }
                    // ),
                  })}
                >
                  {(props) => {
                    const {
                      isSubmitting,
                      handleSubmit,
                      initialValues,
                      resetForm,
                      values,
                    } = props;
                    if (values.country) {
                      setSelectedCountry(values.country);
                    }
                    values?.states?.map((item) => {
                      if (item?.state != "Other" && item?.id) {
                        item.other_state = "";
                      }
                    });

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
                          sx={{
                            "& textarea::-webkit-scrollbar": {
                              display: "none",
                            },
                          }}
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
                                {...(name == "bio" && {
                                  rows: 3,
                                  maxRows: 10,
                                  multiline: true,
                                })}
                              />
                            )
                          )}

                          <FieldArray name="states">
                            {({ insert, remove, push }) => (
                              <>
                                {values?.states?.length > 0 &&
                                  values?.states?.map((statesData, index) => (
                                    <>
                                      {/* {console.log(
                                        "!userData?.states?.find(",
                                        userData?.states?.find(
                                          (remData) =>
                                            remData?.id == statesData?.id
                                        )?.id,
                                        userData,
                                        statesData?.id
                                      )} */}
                                      <Box
                                        display="flex"
                                        alignItems="end"
                                        // columnGap={2}
                                        justifyContent="space-between"
                                        key={index}
                                      >
                                        <Box>
                                          <InputLabel
                                            shrink
                                            htmlFor="licenseNumber"
                                          >
                                            License Number {index + 1}
                                          </InputLabel>
                                          <CustomInputField
                                            name={`states.${index}.licenseNumber`}
                                            placeholder="License Number"
                                          />
                                        </Box>
                                        <Box>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "center",
                                            }}
                                          >
                                            <InputLabel shrink htmlFor="state">
                                              State / Province
                                            </InputLabel>
                                            {!userData?.states?.find(
                                              (remData) =>
                                                remData?.id == statesData?.id
                                            )?.id && (
                                              <Box sx={{ height: "100%" }}>
                                                {/* <Button
                                              variant="outlined"
                                              startIcon={<RemoveIcon />}
                                              sx={{ height: "100%" }}
                                              onClick={() => remove(index)}
                                            ></Button> */}
                                                <DeleteIcon
                                                  onClick={() => remove(index)}
                                                />
                                              </Box>
                                            )}
                                          </Box>

                                          <CustomInputField
                                            name={`states.${index}.state`}
                                            placeholder="State"
                                            options={statesAgainstCountry}
                                            select={true}
                                            // width="100%"
                                          />
                                        </Box>
                                      </Box>
                                      {statesData?.state == "Other" && (
                                        <Box>
                                          <InputLabel
                                            shrink
                                            htmlFor="other_state"
                                          >
                                            Other State
                                          </InputLabel>
                                          <CustomInputField
                                            name={`states.${index}.other_state`}
                                            placeholder="State"

                                            // width="100%"
                                          />
                                        </Box>
                                      )}
                                    </>
                                  ))}
                                <Box
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "end",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: "40%",
                                      display: "flex",
                                      justifyContent: "end",
                                    }}
                                  >
                                    {/* <Button
                                      variant="gradient"
                                      size="large"
                                      onClick={() => push()}
                                    >
                                      Add License Number
                                    </Button> */}
                                    <AddCircleOutlineIcon
                                      onClick={() => push()}
                                      sx={{ fontSize: 40, cursor: "pointer" }}
                                    />
                                  </Box>
                                </Box>
                              </>
                            )}
                          </FieldArray>

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
                          endPoint="verify_edit_profile"
                          editProfileKey={true}
                          profileUpdate={true}
                          fetchUpdatedData={fetchUpdatedData}
                          setHandleFormInitialization={
                            setHandleFormInitialization
                          }
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
                    phoneNumber: Yup.string().required(
                      "Phone number is required"
                    ),
                    // .matches(
                    //   /^\+([0-9]){11,12}$/gm,
                    //   "Please enter a valid phone number"
                    // ),
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
                          profileUpdate={true}
                          editProfileKey={true}
                          endPoint="verify_edit_profile"
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

export async function getServerSideProps(context) {
  const { access, profile_info = JSON.stringify({}) } = context.req.cookies;
  let profileInfoData = JSON.parse(profile_info);
  if (
    (profileInfoData?.user?.role == "Practitioner" &&
      profileInfoData?.user?.practitionerType &&
      access) ||
    (profileInfoData?.user?.role == "Consumer" && access)
  ) {
    return { props: { access } };
  } else {
    return { redirect: { destination: "/auth/login", permanent: false } };
  }
  // if (!access) {
  //   return { redirect: { destination: "/auth/login", permanent: false } };
  // }

  // return { props: { access } };
}

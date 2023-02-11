import {
  Box,
  Typography,
  styled,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomInputField from "../../src/components/common/CustomInputField";
import NftsLayout from "../../src/nftsLayout";
import * as Yup from "yup";
import { Formik } from "formik";
import CustomFileUpload from "../../src/components/common/CustomFileUpload";
import { publicAxios } from "../../src/api";
import toast from "react-hot-toast";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  GET_PROFILE_BY_USERID,
  MINT_PRACTITIONER_NFT,
} from "../../src/constants/endpoints";
import { useTitle } from "../../src/utils/Title";
import GoogleMapAutoComplete from "../../src/components/googleMapSearch/GoogleMapAutoComplete.jsx";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { useAuthContext } from "../../src/context/AuthContext";
import CreditCardInput from "../../src/components/CreditCardInput";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";


const GradientMintPropertyNfts = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.border.default,
  borderRadius: "24px",
  padding: "1px",
  marginTop: "40px",
  marginBottom: "120px",
}));
const MintPropertyNfts = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.background.default,
  borderRadius: "24px",
  [theme.breakpoints.up("lg")]: {
    padding: "40px 281px",
  },
  [theme.breakpoints.between("xs", "lg")]: {
    padding: "40px 12%",
  },
}));
const GradiantTextField = styled(TextField)(({}) => ({
  "& .MuiInput-root": {
    padding: "0 20px",
  },
  "& input::placeholder": {
    fontSize: "16px",
    fontWeight: 400,
  },
}));

const MintNFTS = () => {
  const { push } = useRouter();
  const {
    isCreditCardModalOpen,
    setIsCreditCardModalOpen,
    handleCreditCardModalClose,
    setSuccessData,
  } = useAuthContext();

  useTitle("Mint NFTs");
  const [latLngPlusCode, setLatLngPlusCode] = useState({});
  const [profileInfo, setProfileInfo] = useState({});
  const [headShot, setHeadshot] = useState("");
  const [uploadingHeadshot, setUploadingHeadshot] = useState(false);
  const [licenseTypeValue, setLicenseTypeValue] = useState("");
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({});
  const [date, setDate] = useState(null);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData = JSON.parse(localStorage.getItem("profile_info"));
      setProfileInfo(localData);
      setHeadshot(localData?.user?.headshot);
      setLicenseTypeValue(localData?.user?.practitionerType);
    }
    getUserData();
  }, []);
  const handleChange = (event) => {
    setLicenseTypeValue(event.target.value);
  };

  const itemsFunction = (setFieldValue) => {
    const propertyNftsForm = [
      {
        name: "name",
        label: "Name:",
        placeholder: "Enter Your Name",
        disabled: true,
      },
      {
        name: "email",
        label: "Email:",
        placeholder: "Enter Your Email",
        disabled: true,
      },
      {
        // name: "address",
        // label: "Address:",
        // placeholder: "Enter Your Address",
        component: (
          <GoogleMapAutoComplete
            name="address"
            setFieldValue={setFieldValue}
            setLatLngPlusCode={setLatLngPlusCode}
            latLngPlusCode={latLngPlusCode}
          />
        ),
      },
    ];
    return propertyNftsForm;
  };

  const radioBoxList = [
    { value: "agent/broker", label: "Real Estate Agent/Broker" },
    { value: "loan officer", label: "Loan Officer / Lender" },
    { value: "title/escrow", label: "Title / Settlement" },
    { value: "mortgage broker", label: "Mortgage Broker" },
    { value: "appraiser", label: "Appraiser" },
  ];
  const mintPractitionarNfts = async ({
    name,
    email,
    address,
    bio,
    // image,
    // licenseType,
    state,
    licenseNumber,
  }) => {
    try {
      if (false) {
        toast.error("Please upload profile");
      } else {
        if (userData?.stripe_user_block) {
          toast.error("User has been blocked");
        } else {
          const res = await publicAxios.post(
            "create_practitioner_nft",
            {
              name,
              email,
              address,
              image: headShot,
              bio,
              agentId: JSON.parse(localStorage.getItem("profile_info"))?.user
                ?.id,
              licenseType: licenseTypeValue,
              licenseNumber,
            licenseSince: dayjs(date).unix(),
            state,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          );
          setData({
            name,
            email,
            address,
            image: headShot,
            bio,
            id: res?.data?.data?.id,
            agentId: JSON.parse(localStorage.getItem("profile_info"))?.user?.id,
            licenseType: licenseTypeValue,
            licenseNumber,
            licenseSince: dayjs(date).unix(),
            state,
          });
          // toast.success(res?.data?.message);

          setSuccessData(
            "Congratulations! Your identity is being verified, once it is done your Practitioner NFT will be minted."
          );

          setIsCreditCardModalOpen(true);
        }

        // setVerifyModalOpen(false);
      }
    } catch (error) {
      console.log("error", error);
      if (typeof error?.data?.message == "string") {
        if (error?.data?.message.includes(":")) {
          toast.error(error?.data?.message?.split(":")[1]);
        } else {
          toast.error(error?.data?.message);
        }
      } else {
        if (Array.isArray(error?.data?.message)) {
          toast.error(error?.data?.message?.error?.[0]);
        } else {
          toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
        }
      }
    }
  };
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
      // console.log("resddd", res);
      if (res?.data?.data?.user?.stripe_user_block) {
        toast.error("User has been blocked");
      }
      setUserData(res?.data?.data?.user);
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
      <Box>
        <Box>
          <Typography variant="h3">Mint Practitioner NFT</Typography>
        </Box>
        <GradientMintPropertyNfts>
          <MintPropertyNfts>
            <Box>
              <Typography variant="h4" fontWeight={600}>
                Step One: Practitioner Information
              </Typography>
            </Box>
            <Box>
              <Formik
                initialValues={{
                  name:
                    profileInfo &&
                    profileInfo?.user?.firstName +
                      ` ${profileInfo?.user?.lastName}`,
                  email: profileInfo && profileInfo?.user?.email,
                  address: "",
                  // image: "",
                  bio: profileInfo?.user?.bio,
                  state:"",
                  // licenseSince: "",
                  licenseNumber: "",
                }}
                enableReinitialize={true}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  await mintPractitionarNfts(values);
                  setSubmitting(false);
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required("Name is required"),
                  email: Yup.string().required("Email is required"),
                  address: Yup.string().required("Address is required"),
                  // image: Yup.string().required("image is required"),
                  bio: Yup.string().required("Bio is required"),
                  state: Yup.string().required("State is required"),
                  // licenseSince: Yup.string().required(
                  //   "License Date is required"
                  // ),
                  licenseNumber: Yup.string().required(
                    "License Number is required"
                  ),
                })}
              >
                {(props) => {
                  const { isSubmitting, handleSubmit, setFieldValue } = props;
                  return (
                    <form
                      onSubmit={handleSubmit}
                      autoComplete="off"
                      // style={{ width: "80%" }}
                    >
                      <Box>
                        {itemsFunction(setFieldValue).map(
                          (
                            {
                              name,
                              label,
                              placeholder,
                              select,
                              options,
                              multiline,
                              disabled,
                              maxRows,
                              component,
                            },
                            i
                          ) => (
                            <Box pt={3} key={name + i}>
                              {component ? (
                                component
                              ) : (
                                <CustomInputField
                                  key={name}
                                  name={name}
                                  label={label}
                                  placeholder={placeholder}
                                  select={select}
                                  options={options}
                                  rows={maxRows}
                                  multiline={multiline}
                                  disabled={disabled}
                                />
                              )}
                            </Box>
                          )
                        )}
                        <Box pt={3}>
                          <Box>
                            <Typography variant="body1">
                              Upload a Profile Photo:
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              pt={1}
                              pb={1}
                              sx={{
                                color: "#FAFBFC",
                                opacity: 0.5,
                              }}
                            >
                              File types supported: JPG, PNG, Max size: 1 MB
                            </Typography>
                          </Box>
                          <CustomFileUpload
                            uploadingToS3={uploadingHeadshot}
                            setUploadingToS3={setUploadingHeadshot}
                            s3Url={headShot}
                            setS3Url={setHeadshot}
                            borderRadius="24px"
                            width="100%"
                            // componentFor="Practitioner"
                            practitioner={true}
                          />
                        </Box>
                        <Box
                          pt={3}
                          sx={{
                            "& textarea": {
                              fontSize: "13px",
                            },
                            "& textarea::-webkit-scrollbar": {
                              // display: "none",
                              // overflow: "hidden",
                              display: "none",
                            },
                          }}
                        >
                          <CustomInputField
                            name="bio"
                            label="Bio:"
                            placeholder="Enter Your Bio"
                            disabled={true}
                            // select={select}
                            // options={options}
                            rows={3}
                            multiline={true}
                          />
                        </Box>
                        <Box pt={3}>
                          <Typography variant="body1">License Type:</Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                            }}
                          >
                            {radioBoxList.map((item, i) => {
                              return (
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                  key={item.name + i}
                                >
                                  <FormControl>
                                    <RadioGroup
                                      aria-labelledby="demo-controlled-radio-buttons-group"
                                      name="controlled-radio-buttons-group"
                                      value={licenseTypeValue}
                                      onChange={handleChange}
                                    >
                                      <FormControlLabel
                                        value={item.value}
                                        control={
                                          <Radio
                                            color="success"
                                            size="small"
                                            checked={
                                              item.value === licenseTypeValue
                                            }
                                            disabled={
                                              item.value !== licenseTypeValue
                                            }
                                          />
                                        }
                                        label={
                                          <Typography variant="subtitle1">
                                            {item.label}
                                          </Typography>
                                        }
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                </Box>
                              );
                            })}
                          </Box>
                        </Box>
                        <Box pt={3}>
                          <CustomInputField
                            name="state"
                            label="State:"
                            placeholder="Enter Your State"
                          />
                        </Box>
                        
                        <Box pt={3}>
                  <InputLabel shrink>License Since Date:</InputLabel>
                  <div
                    style={{
                      background:
                        "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "24px",
                      alignItems: "center",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label=""
                        InputProps={{
                          disableUnderline: true,
                        }}
                        disableFuture
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                        renderInput={(params) => (
                          <GradiantTextField
                            variant="standard"
                            sx={{
                              "& input::placeholder": {
                                fontSize: "12px",
                                fontWeight: 400,
                              },
                              "& input":{
                              fontSize:'12px',
                              padding:'10px 0px'
                            }}}
                            placeholder="mm/dd/yyyy"
                            onKeyDown={(e) => e.preventDefault()}
                            fullWidth
                            style={{
                              background: "rgba(29, 6, 104, 1)",
                              margin: "2px 2px 2px 2px",
                              borderRadius: "24px",
                            }}
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </Box>


                        <Box pt={3}>
                          <CustomInputField
                            name="licenseNumber"
                            label="License Number:"
                            placeholder="Enter Your License Number"
                          />
                        </Box>

                        <Box display="flex" pt={7}>
                          <LoadingButton
                            loading={isSubmitting}
                            variant="gradient"
                            size="large"
                            type="submit"
                            disabled={uploadingHeadshot}
                            sx={{
                              fontSize: "20px",
                              fontWeight: 600,
                            }}
                          >
                            Mint
                          </LoadingButton>
                        </Box>
                      </Box>
                    </form>
                  );
                }}
              </Formik>
            </Box>
          </MintPropertyNfts>
        </GradientMintPropertyNfts>
      </Box>
      <CreditCardInput isPractitionerNFT={true} mintNFTData={data} />
    </>
  );
};

export default MintNFTS;
MintNFTS.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};

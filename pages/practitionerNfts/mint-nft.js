import {
  Box,
  Typography,
  styled,
  Button,
  Radio,
  Checkbox,
  Grid,
  TextField,
  Autocomplete,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomInputField from "../../src/components/common/CustomInputField";
import NftsLayout from "../../src/nftsLayout";
import * as Yup from "yup";
import { Formik } from "formik";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import CustomFileUpload from "../../src/components/common/CustomFileUpload";
import { publicAxios } from "../../src/api";
import toast from "react-hot-toast";
import { MINT_PRACTITIONER_NFT } from "../../src/constants/endpoints";
import { useTitle } from "../../src/utils/Title";
import GoogleMapAutoComplete from "../../src/components/googleMapSearch/GoogleMapAutoComplete.jsx";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { useAuthContext } from "../../src/context/AuthContext";
import CreditCardInput from "../../src/components/CreditCardInput";

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
const CheckboxStyled = styled(Box)(({ theme }) => ({
  // '& .MuiCheckbox-root':{
  // color:'red'
  // },
  // '& .Mui-checked':{
  // color:"red"
  // }
}));

const MintNFTS = () => {
  const { push } = useRouter();
  const {
    isCreditCardModalOpen,
    setIsCreditCardModalOpen,
    handleCreditCardModalClose,
  } = useAuthContext();

  useTitle("Mint NFTs");
  const [latLngPlusCode, setLatLngPlusCode] = useState({});
  const [profileInfo, setProfileInfo] = useState();
  const [headShot, setHeadshot] = useState("");
  const [licenseTypeValue, setLicenseTypeValue] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData = JSON.parse(localStorage.getItem("profile_info"));
      setProfileInfo(localData);
      setLicenseTypeValue(localData?.user?.practitionerType);
    }
  }, []);
  const handleChange = (event) => {
    setLicenseTypeValue(event.target.value);
  };

  const agentsList = [
    { value: "agent-1", label: "Agent 1" },
    { value: "agent-2", label: "Agent 2" },
    { value: "no-agent", label: "No Agent" },
  ];
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
  // const radioBoxList = [
  //   { label: "Realter", name: "realter" },
  //   { label: "Loan Officer", name: "loan-officer" },
  //   { label: "Title/Escrow", name: "titel-escrow" },
  //   { label: "Appraiser", name: "appraiser" },
  // ];
  const mintPractitionarNfts = async ({
    name,
    email,
    address,
    bio,
    // image,
    // licenseType,
    licenseNumber,
  }) => {
    if (headShot.length == 0) {
      toast.error("Please upload profile");
    } else {
      setData({
        name,
        email,
        address,
        image: headShot,
        bio,
        agentId: JSON.parse(localStorage.getItem("profile_info"))?.user?.id,
        licenseType: licenseTypeValue,
        licenseNumber,
      });
      setIsCreditCardModalOpen(true);
      // try {
      //   const res = await publicAxios.post(
      //     `${MINT_PRACTITIONER_NFT}`,
      //     {
      //       name,
      //       email,
      //       address,
      //       image: headShot,
      //       bio,
      //       agentId: JSON.parse(localStorage.getItem("profile_info"))?.user?.id,

      //       // role: profileInfo.user.role ? "practitioner" : "consumer",
      //       licenseType: licenseTypeValue,
      //       licenseNumber,
      //     },
      //     {
      //       headers: {
      //         Authorization: `Bearer ${localStorage.getItem("access")}`,
      //       },
      //     }
      //   );
      //   toast.success("practitionar nft is minted successfully");
      //   push("/nftWallet/NftWallet");
      // } catch (error) {
      //   if (Array.isArray(error?.data?.message)) {
      //     toast.error(error?.data?.message?.error?.[0]);
      //   } else {
      //     toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
      //   }
      // }
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
                Mint Practitioner NFTs
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
                            s3Url={headShot}
                            setS3Url={setHeadshot}
                            borderRadius="24px"
                            width="100%"
                            // componentFor="Practitioner"
                            practitioner={true}
                          />
                        </Box>
                        <Box pt={3}>
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
                            name="licenseNumber"
                            label="License Number:"
                            placeholder="Enter Your License Number"
                            // disabled={true}
                            // select={select}
                            // options={options}
                            // rows={maxRows}
                            // multiline={multiline}
                          />
                        </Box>
                        <Box display="flex" pt={7}>
                          <LoadingButton
                            loading={isSubmitting}
                            variant="gradient"
                            size="large"
                            type="submit"
                            disabled={headShot.length < 1}
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

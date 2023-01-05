import {
  Box,
  Typography,
  styled,
  Button,
  Radio,
  Checkbox,
  Grid,
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
import { NFT_PRACTITIONER } from "../../src/constants/endpoints";

const GradientMintPropertyNfts = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.border.default,
  borderRadius: "24px",
  padding: "1px",
  marginTop: "40px",
}));
const MintPropertyNfts = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.background.default,
  borderRadius: "24px",
  padding: "40px 281px",
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
  const [profileInfo, setProfileInfo] = useState();
  const [headShot, setHeadshot] = useState("");
  const [licenseTypeValue,setLicenseTypeValue] = useState('')

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData = JSON.parse(localStorage.getItem("profile_info"));
      setProfileInfo(localData);
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
  const propertyNftsForm = [
    {
      name: "name",
      label: "Name:",
      placeholder: "Enter Your Name",
    },
    {
      name: "email",
      label: "Email:",
      placeholder: "Enter Your Email",
    },
    {
      name: "address",
      label: "Address:",
      placeholder: "Enter Your Address",
    },
  ];

  const radioBoxList = [
    { label: "Realter", name: "realter" },
    { label: "Loan Officer", name: "loan-officer" },
    { label: "Title/Escrow", name: "titel-escrow" },
    { label: "Appraiser", name: "appraiser" },
  ];
  const mintPractitionarNfts = async ({
    name,
    email,
    address,
    bio,
    licenseType,
    licenseNumber,
  }) => {
    try {
      const res = await publicAxios.post(
        `${NFT_PRACTITIONER}`,
        {
          name,
          email,
          address,
          image: headShot,
          bio,
          // role: profileInfo.user.role ? "practitioner" : "consumer",
          licenseType:licenseTypeValue,
          licenseNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      toast.success("practitionar nft is minted successfully");
      // setEmail(email);
      // setEmailVerificationOpen(true);
    } catch (error) {
      if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else {
        toast.error(error?.data?.err?.msg);
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
                Mint Practitioner NFTs
              </Typography>
            </Box>
            <Box>
              <Formik
                initialValues={{
                  name: "",
                  email: profileInfo?.user?.email,
                  address: "",
                  bio: "",
                  licenseNumber: profileInfo?.user?.licenseNumber,
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  console.log("values", values);
                  setSubmitting(true);
                  await mintPractitionarNfts(values);
                  setSubmitting(false);
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required("Name is required"),
                  email: Yup.string().required("Email is required"),
                  address: Yup.string().required("Address is required"),
                  bio: Yup.string().required("Bio is required"),
                  licenseNumber: Yup.string().required(
                    "License Number is required"
                  ),
                })}
              >
                {(props) => {
                  const { isSubmitting, handleSubmit } = props;
                  return (
                    <form
                      onSubmit={handleSubmit}
                      autoComplete="off"
                      // style={{ width: "80%" }}
                    >
                      <Box>
                        {propertyNftsForm.map(
                          ({
                            name,
                            label,
                            placeholder,
                            select,
                            options,
                            multiline,
                            maxRows,
                          }) => (
                            <Box pt={3}>
                              <CustomInputField
                                key={name}
                                name={name}
                                label={label}
                                placeholder={placeholder}
                                select={select}
                                options={options}
                                rows={maxRows}
                                multiline={multiline}
                              />
                            </Box>
                          )
                        )}
                        <Box pt={3}>
                          <Box>
                            <Typography variant="body1">
                              Upload a photo of the house:
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="secondary.gray"
                              pt={1}
                              pb={1}
                            >
                              File types supported: JPG, PNG, GIF, SVG, Max
                              size: 5 MB
                            </Typography>
                          </Box>
                          <CustomFileUpload
                            s3Url={headShot}
                            setS3Url={setHeadshot}
                            borderRadius="24px"
                            width="100%"
                          />
                        </Box>
                        <Box pt={3}>
                          <CustomInputField
                            name="bio"
                            label="Bio:"
                            placeholder="Enter Your Bio"
                            // select={select}
                            // options={options}
                            // rows={maxRows}
                            // multiline={multiline}
                          />
                        </Box>
                        <Box pt={3}>
                          <Typography variant="body1">License Type:</Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
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
                                        value={item.name}
                                        control={
                                          <Radio color="success" size="small" />
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
                            // select={select}
                            // options={options}
                            // rows={maxRows}
                            // multiline={multiline}
                          />
                        </Box>
                        <Box display="flex" pt={7}>
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
                            Mint
                          </Button>
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
    </>
  );
};

export default MintNFTS;
MintNFTS.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};

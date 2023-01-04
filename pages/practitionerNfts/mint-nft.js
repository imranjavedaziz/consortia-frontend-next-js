import {
  Box,
  Typography,
  styled,
  Button,
  Radio,
  Checkbox,
  Grid,
} from "@mui/material";
import React from "react";
import CustomInputField from "../../src/components/common/CustomInputField";
import NftsLayout from "../../src/nftsLayout";
import * as Yup from "yup";
import { Formik } from "formik";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import CustomFileUpload from "../../src/components/common/CustomFileUpload";

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
    // {
    //   name: "bio",
    //   label: "Bio:",
    //   placeholder: "Enter Text Here",
    // },
  ];

  const radioBoxList = [
    { label: "Realter", name: "realter" },
    { label: "Loan Officer", name: "loan-officer" },
    { label: "Title/Escrow", name: "titel-escrow" },
    { label: "Appraiser", name: "appraiser" },
  ];

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
                  email: "",
                  address: "",
                  bio: "",
                  price: "",
                  description: "",
                  documents: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  console.log("values", values);
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required("Name is required"),
                  email: Yup.string().required("Email is required"),
                  address: Yup.string().required("Address is required"),
                  bio: Yup.string().required("Bio is required"),
                  price: Yup.string().required("Price is required"),
                  description: Yup.string().required("Description is required"),
                  licenseNumber: Yup.string().required(
                    "License number is required"
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
                            console.log(
                              "multiline,maxRows",
                              multiline,
                              maxRows
                            ),
                            (
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
                          )
                        )}
                        <Box pt={3}>
                          <Box>  
                            <Typography variant="body1">
                            Upload a photo of the house:
                            </Typography>
                            <Typography variant="subtitle1" color="secondary.gray" pt={1} pb={1}>
                            File types supported: JPG, PNG, GIF, SVG, Max size: 5 MB
                            </Typography>
                          </Box>
                          <CustomFileUpload
                          borderRadius='24px'
                          width='100%'
                           
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
                                  key={item.name+i}
                                >
                                  <Radio  color='success' size="small" />
                                  <Typography variant='subtitle1'>{item.label}</Typography>
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

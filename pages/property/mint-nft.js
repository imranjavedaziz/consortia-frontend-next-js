import { Box, Typography, styled, Button, Checkbox, Grid } from "@mui/material";
import React from "react";
import CustomInputField from "../../src/components/common/CustomInputField";
import NftsLayout from "../../src/nftsLayout";
import * as Yup from "yup";
import { Formik } from "formik";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { useTitle } from "../../src/utils/Title";
import GoogleMapAutoComplete from "../../src/components/googleMapSearch/GoogleMapAutoComplete";

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
  useTitle("Mint NFTs");

  const agentsList = [
    { value: "agent-1", label: "Agent 1" },
    { value: "agent-2", label: "Agent 2" },
    { value: "no-agent", label: "No Agent" },
  ];


 
  const itemsFunction = (setFieldValue) => {
    const propertyNftsForm = [
      {
        name: "agent",
        label: "Select agent:",
        placeholder: "Select your agent",
        options: agentsList,
        select: true,
      },
      // {
      //   name: "title",
      //   label: "Title:",
      //   placeholder: "Enter your Title",
      // },
      {
        name: "price",
        label: "Price:",
        placeholder: "Enter your Price",
      },
      // {
      //   name: "description",
      //   label: "Description:",
      //   placeholder: "Enter Text Here",
      //   multiline: true,
      //   maxRows: 4,
      // },
      {
        // name: "address",
        // label: "Address:",
        // placeholder: "Enter Your Address",
        component:<GoogleMapAutoComplete setFieldValue={setFieldValue}/>
      },
      {
        name: "documents",
        label: "Select Documents Categories:",
        placeholder: "Select",
        options: agentsList,
        select: true,
      },
    ];
    return propertyNftsForm
  }

  const checkBoxList = [
    { label: "Deed", name: "deed" },
    { label: "Lien", name: "Lien" },
    { label: "Photo", name: "photo" },
    { label: "AWM", name: "AWM" },
    { label: "Appraisal ", name: "appraisal " },
    { label: "MLS Data ", name: "MLS Data " },
    { label: "Floor Plan", name: "floor-plan" },
    { label: "Assessor Data", name: "assessor-data" },
    { label: "Lease Agreement ", name: "lease-agreement " },
    { label: "Sellers Disclosure", name: "Sellers Disclosure" },
    { label: "Preliminary Title Report", name: "Preliminary Title Report" },
    { label: "Inspection Report ", name: "Inspection Report " },
    { label: "Title Insurance Policy", name: "Title Insurance Policy" },
    { label: "Settlement Statement ", name: "Settlement Statement" },
    { label: "Land Use/Planning Report  ", name: "Land Use/Planning Report  " },
  ];

  return (
    <>
      <Box>
        <Box>
          <Typography variant="h3">Mint Property NFT</Typography>
        </Box>
        <GradientMintPropertyNfts>
          <MintPropertyNfts>
            <Box>
              <Typography variant="h4" fontWeight={600}>
                Mint Property NFTs
              </Typography>
            </Box>
            <Box>
              <Formik
                initialValues={{
                  agent: "",
                  title: "",
                  price: "",
                  description: "",
                  address: "",
                  documents: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  console.log("values", values);
                }}
                validationSchema={Yup.object().shape({
                  agent: Yup.string().required("Agent is required"),
                  title: Yup.string().required("title is required"),
                  price: Yup.string().required("Price is required"),
                  description: Yup.string().required("Description is required"),
                  address: Yup.string().required("Address is required"),
                  documents: Yup.string().required("Documents is required"),
                })}
              >
                {(props) => {
                  const { isSubmitting, handleSubmit,setFieldValue } = props;
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
                              maxRows,
                              component
                            },
                            i
                          ) => (
                            <Box pt={3} key={name + i}>
                              {component ? component : <CustomInputField
                                key={name}
                                name={name}
                                label={label}
                                placeholder={placeholder}
                                select={select}
                                options={options}
                                rows={maxRows}
                                multiline={multiline}
                              />}
                              
                            </Box>
                          )
                        )}
                        <Box pt={3}>
                          <Typography variant="body1">
                            Upload each documents to a specific category:
                          </Typography>
                        </Box>
                        <Grid container>
                          {checkBoxList.map((item, i) => {
                            return (
                              <>
                                <Grid
                                  item
                                  xs={6}
                                  sx={{ display: "flex", alignItems: "center" }}
                                  key={item.name + i}
                                >
                                  <Checkbox />{" "}
                                  <Typography>{item.label}</Typography>
                                </Grid>
                              </>
                            );
                          })}
                        </Grid>
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

import {
  Box,
  Typography,
  styled,
  Button,
  Checkbox,
  Grid,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import CustomInputField from "../../src/components/common/CustomInputField";
import NftsLayout from "../../src/nftsLayout";
import * as Yup from "yup";
import { Formik } from "formik";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { useTitle } from "../../src/utils/Title";
import GoogleMapAutoComplete from "../../src/components/googleMapSearch/GoogleMapAutoComplete";
import CustomFileUpload from "../../src/components/common/CustomFileUpload";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { publicAxios } from "../../src/api";
import { useRouter } from "next/router";

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
  const { push } = useRouter();

  useTitle("Mint NFTs");
  const [housePhoto, setHousePhoto] = useState("");
  const [categoryDocument, setCategoryDocument] = useState("");
  const [latLngPlusCode, setLatLngPlusCode] = useState({});
  console.log("latLngPlusCode", latLngPlusCode);

  const propertyList = [
    { value: "building", label: "Building" },
    { value: "other", label: "Other" },
    // { value: "no-agent", label: "No Agent" },
  ];

  const itemsFunction = (setFieldValue) => {
    const propertyNftsForm = [
      {
        name: "propertyType",
        label: "Select property category:",
        placeholder: "Select your property",
        options: propertyList,
        select: true,
      },
      // {
      //   name: "title",
      //   label: "Title:",
      //   placeholder: "Enter your Title",
      // },
      // {
      //   name: "price",
      //   label: "Price:",
      //   placeholder: "Enter your Price",
      // },
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
        component: (
          <GoogleMapAutoComplete
            name="address"
            setFieldValue={setFieldValue}
            setLatLngPlusCode={setLatLngPlusCode}
            latLngPlusCode={latLngPlusCode}
          />
        ),
      },

      // {
      //   name: "documents",
      //   label: "Select Documents Categories:",
      //   placeholder: "Select",
      //   options: agentsList,
      //   select: true,
      // },
    ];
    return propertyNftsForm;
  };

  const documentOptions = [
    { value: "deed", label: "Deed" },
    { value: "settlement", label: "Settlement Statement" },
  ];

  const handleSubmit = async (values, resetForm) => {
    if (housePhoto.length < 1) {
      toast.error("Please upload the photo of house");
      return;
    }

    if (categoryDocument.length < 1) {
      toast.error("Please upload the photo of category document");
      return;
    }
    // console.log('`${latLngPlusCode.plusCode}@f${values.floorNo}_apt${values.apartmentNo}`', `${latLngPlusCode.plusCode}`)
    // setLatLngPlusCode({
    //   ...latLngPlusCode,
    //   plusCode:`${latLngPlusCode.plusCode}@f${values.floorNo}_apt${values.apartmentNo}`
    // })
    // console.log(values);
    try {
      const res = await publicAxios.post(
        "nft/mint",
        {
          title: values.propertyType === "building"
          ? latLngPlusCode.plusCode
          : `${latLngPlusCode.plusCode}@f${values.floorNo}_apt${values.apartmentNo}`,
          price: 10,
          image: housePhoto,
          description: "description",
          address:values.address,
          document: categoryDocument,
          docCategory: values.category,
          agentId: JSON.parse(localStorage.getItem("profile_info"))?.user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      toast.success("NFT minted successfully");

      resetForm();
      push("/nftWallet/NftWallet");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

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
                  propertyType: "",
                  agent: "",
                  price: "",
                  apartmentNo: "",
                  floorNo: "",
                  address: "",
                  category: "",
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  handleSubmit(values, resetForm);
                }}
                validationSchema={Yup.object().shape({
                  // agent: Yup.string().required("Agent is required"),
                  // price: Yup.string().required("Price is required"),
                  propertyType: Yup.string().required(
                    "Property Type is required"
                  ),
                  floorNo: Yup.string().when(["propertyType"], {
                    is: (propertyType) => propertyType == "building",
                    then: Yup.string().required("This field is required"),
                    otherwise: Yup.string().optional(),
                  }),
                  apartmentNo: Yup.string().when(["propertyType"], {
                    is: (propertyType) => propertyType == "building",
                    then: Yup.string().required("This field is required"),
                    otherwise: Yup.string().optional(),
                  }),
                  address: Yup.string().required("Address is required"),
                  category: Yup.string().required(
                    "Please choose a document category"
                  ),
                })}
              >
                {(props) => {
                  const { isSubmitting, handleSubmit, setFieldValue, values } =
                    props;
                  // console.log("values", values);
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
                                />
                              )}
                            </Box>
                          )
                        )}
                        {values.propertyType === "building" && (
                          <>
                            <Box
                              display="flex"
                              flexDirection="column"
                              rowGap={3}
                              pt={3}
                            >
                              <Box>
                                <CustomInputField
                                  name="floorNo"
                                  label="Floor No:"
                                  placeholder="Enter floor no"
                                  select={false}
                                />
                              </Box>
                            </Box>
                            <Box
                              display="flex"
                              flexDirection="column"
                              rowGap={3}
                              pt={3}
                            >
                              <Box>
                                <CustomInputField
                                  name="apartmentNo"
                                  label="Apartment No:"
                                  placeholder="Enter apartment no"
                                  select={false}
                                />
                              </Box>
                            </Box>
                          </>
                        )}

                        <Box
                          display="flex"
                          flexDirection="column"
                          rowGap={3}
                          pt={3}
                        >
                          <Box>
                            <InputLabel shrink>
                              Upload a photo of the house:
                            </InputLabel>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                color: "#FAFBFC",
                                opacity: 0.5,
                                marginBottom: 1,
                              }}
                            >
                              Files types supported: JPG, PNG, GIF, SVG, Max
                              Size: 5MB
                            </Typography>
                            <CustomFileUpload
                              s3Url={housePhoto}
                              setS3Url={setHousePhoto}
                              borderRadius="24px"
                              width="100%"
                            />
                          </Box>
                          <CustomInputField
                            name="category"
                            label="Select Document Categories:"
                            select
                            options={documentOptions}
                          />
                          {values.category.length > 1 && (
                            <Box>
                              <InputLabel shrink>
                                {values.category == "deed"
                                  ? "Upload a photo of the deed:"
                                  : "Upload a photo of the Settlement Statement"}
                              </InputLabel>
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  color: "#FAFBFC",
                                  opacity: 0.5,
                                  marginBottom: 1,
                                }}
                              >
                                Files types supported: JPG, PNG, GIF, SVG, Max
                                Size: 5MB
                              </Typography>
                              <CustomFileUpload
                                s3Url={categoryDocument}
                                setS3Url={setCategoryDocument}
                                borderRadius="24px"
                                width="100%"
                              />
                            </Box>
                          )}

                          <Box display="flex" pt={4}>
                            <LoadingButton
                              variant="gradient"
                              size="large"
                              type="submit"
                              disabled={
                                !(
                                  housePhoto.length > 1 &&
                                  categoryDocument.length > 1
                                )
                              }
                              sx={{
                                fontSize: "20px",
                                fontWeight: 600,
                              }}
                            >
                              Mint
                            </LoadingButton>
                          </Box>
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

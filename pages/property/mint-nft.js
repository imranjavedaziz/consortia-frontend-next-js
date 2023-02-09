import {
  Box,
  Typography,
  styled,
  Button,
  Checkbox,
  Grid,
  InputLabel,
  Dialog,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { MINT_PROPERTY_NFT } from "../../src/constants/endpoints";
import CreditCardInput from "../../src/components/CreditCardInput";
import { useAuthContext } from "../../src/context/AuthContext";
// import { getSubLocationsFromLocation } from "../../src/utils/getSubLocationsFromLocation";

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
  [theme.breakpoints.up("lg")]: {
    padding: "40px 281px",
  },
  [theme.breakpoints.between("xs", "lg")]: {
    padding: "40px 12%",
  },
}));

const MintNFTS = () => {
  const { push } = useRouter();
  const {
    isCreditCardModalOpen,
    setIsCreditCardModalOpen,
    handleCreditCardModalClose,
    setSuccessData
  } = useAuthContext();
  useTitle("Mint NFTs");
  const [housePhoto, setHousePhoto] = useState("");
  const [categoryDocument, setCategoryDocument] = useState("");
  const [entityDocument, setEntityDocument] = useState("");
  const [latLngPlusCode, setLatLngPlusCode] = useState({});
  const [isSubmitting, setisSubmitting] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [uploadingHousePhoto, setUploadingHousePhoto] = useState(false);
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [uploadingEntity, setUploadingEntity] = useState(false);
  const [propertyCategoryOptions, setPropertyCategoryOptions] = useState([
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ]);

  const getVerifiedCompanies = async () => {
    try {
      const response = await publicAxios.get("verify_company_list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      const verifiedCompanies = response?.data?.data?.map((company) => {
        return { value: company.id, label: company.companyName };
      });
      setPropertyCategoryOptions((initalCompanies) => [
        ...[
          { value: true, label: "Yes" },
          { value: false, label: "No" },
        ],
        ...verifiedCompanies,
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVerifiedCompanies();
    // return () =>
    //   setPropertyCategoryOptions(
    //     { value: true, label: "Yes" },
    //     { value: false, label: "No" }
    //   );
  }, []);

  const itemsFunction = (setFieldValue, propertyStatus) => {
    if (propertyStatus === true) {
      const propertyNftsForm = [
        {
          name: "name",
          label: "Name:",
          sublabel: "Exact Legal name on Government ID:",
          placeholder: "Enter the exact name",
        },
        {
          name: "property_category",
          label: "Property",
          sublabel: "Is this property in a trust, LLC, or business entity?",
          placeholder: "Select Category",
          options: propertyCategoryOptions,
          select: true,
        },
        {
          name: "entity",
          label: "Entity name:",
          sublabel: "Exact name of trust, LLC, or business entity",
          placeholder: "Enter the entity name",
        },
        {
          component: (
            <>
              <InputLabel shrink>
                Upload a legal document for entity:
              </InputLabel>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#FAFBFC",
                  opacity: 0.5,
                  marginBottom: 1,
                }}
              >
                Files types supported: JPG, PNG, PDF, Max Size: 1MB
              </Typography>
              <CustomFileUpload
                allowPdf={true}
                uploadingToS3={uploadingEntity}
                setUploadingToS3={setUploadingEntity}
                s3Url={entityDocument}
                setS3Url={setEntityDocument}
                borderRadius="24px"
                width="100%"
                privateBucket={true}
              />
            </>
          ),
        },
        {
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
    } else {
      const propertyNftsForm = [
        {
          name: "name",
          label: "Name:",
          sublabel: "Exact Legal name on Government ID",
          placeholder: "Enter the exact name",
        },
        {
          name: "property_category",
          label: "Property Category",
          sublabel: "Is this property in a trust, LLC, or business entity?",
          placeholder: "Select Category",
          options: propertyCategoryOptions,
          select: true,
        },
        {
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
    }
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

    try {
      setisSubmitting(true);
      const res = await publicAxios.post(
        "create_property_nft",
        {
          name: values.name,
          title: values.apartmentNo
            ? `${latLngPlusCode.plusCode}@${values.apartmentNo}`
            : latLngPlusCode.plusCode,
          ...(values.property_category == true && {
            companyName: values.entity,
            company_document:
              "https://consortialockablecontent.s3.amazonaws.com/Company_Operating_Agreement_Tresa.pdf",
          }),
          ...(typeof values.property_category == "number" && {
            company_id: values.property_category,
          }),
          price: 10,
          image: housePhoto,
          description: "description",
          address: values.address.replace(", USA", ""),
          document:
            "https://consortialockablecontent.s3.amazonaws.com/Alton_Deeds.pdf",
          docCategory: values.category,
          agentId: JSON.parse(localStorage.getItem("profile_info"))?.user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setData({
        stripe_identity_status: res?.data?.data?.stripe_identity_status,
        id: res?.data?.data?.id,
        name: values.name,
        title: values.apartmentNo
          ? `${latLngPlusCode.plusCode}@${values.apartmentNo}`
          : latLngPlusCode.plusCode,
        ...(values.property_category == true && {
          companyName: values.entity,
          company_document:
            "https://consortialockablecontent.s3.amazonaws.com/Company_Operating_Agreement_Tresa.pdf",
        }),
        ...(typeof values.property_category == "number" && {
          company_id: values.property_category,
        }),
        price: 10,
        image: housePhoto,
        description: "description",
        address: values.address.replace(", USA", ""),
        document:
          "https://consortialockablecontent.s3.amazonaws.com/Alton_Deeds.pdf",
        docCategory: values.category,
        agentId: JSON.parse(localStorage.getItem("profile_info"))?.user?.id,
      });
      setSuccessData("THANK YOU FOR YOUR ORDER. YOUR PROPERTY NFT WILL BE MINTED AS SOON AS THE VERIFICATION PROCESS IS COMPLETE, FOR YOUR SECURITY THE IDENTIFICATION PROCESS MAY TAKE UP TO THREE DAYS")
      setisSubmitting(false);
      setIsCreditCardModalOpen(true);
    } catch (error) {
      setisSubmitting(false);
      console.log(error);
      if (typeof error?.data?.message == "string") {
        toast.error(error?.data?.message);
      } else {
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
                Step One: Property Information
              </Typography>
            </Box>
            <Box>
              <Formik
                initialValues={{
                  name: "",
                  property_category: false,
                  entity: "",
                  agent: "",
                  price: "",
                  apartmentNo: "",
                  address: "",
                  category: "",
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  handleSubmit(values, resetForm);
                }}
                validationSchema={Yup.object().shape({
                  apartmentNo: Yup.string().optional(),
                  address: Yup.string().required("Address is required"),
                  category: Yup.string().required(
                    "Please choose a document category"
                  ),
                  property_category: Yup.string().required(
                    "Please choose a property category"
                  ),
                  name: Yup.string().required("Please enter a name"),
                  entity: Yup.string().when(["property_category"], {
                    is: (property_category) => {
                      console.log("validation", property_category == "true");
                      return property_category == "true";
                    },
                    then: Yup.string().required("Entity Name is required"),
                    // .min(1, "Entity Name is required"),
                    otherwise: Yup.string().optional(),
                  }),
                })}
              >
                {(props) => {
                  const { handleSubmit, setFieldValue, values } = props;
                  console.log(
                    "test",
                    values.property_category == true,
                    typeof values.property_category
                  );
                  return (
                    <form
                      onSubmit={handleSubmit}
                      autoComplete="off"
                      // style={{ width: "80%" }}
                    >
                      <Box>
                        {itemsFunction(
                          setFieldValue,
                          values.property_category
                        ).map(
                          (
                            {
                              name,
                              label,
                              sublabel,
                              placeholder,
                              select,
                              options,
                              multiline,
                              maxRows,
                              component,
                            },
                            i
                          ) => (
                            <Box pt={3} key={name}>
                              {component ? (
                                component
                              ) : (
                                <CustomInputField
                                  key={name}
                                  name={name}
                                  sublabel={sublabel}
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
                        {/* {values.propertyType === "building" && ( */}
                        <>
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
                        {/* // )} */}

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
                              Files types supported: JPG, PNG Max Size: 1MB
                            </Typography>
                            <CustomFileUpload
                              // isUploading = {}
                              uploadingToS3={uploadingHousePhoto}
                              setUploadingToS3={setUploadingHousePhoto}
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
                                  ? "Upload a copy of the deed:"
                                  : "Upload a copy of the Settlement Statement"}
                              </InputLabel>
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  color: "#FAFBFC",
                                  opacity: 0.5,
                                  marginBottom: 1,
                                }}
                              >
                                Files types supported: JPG, PNG, PDF, Max Size:
                                1MB
                              </Typography>
                              <CustomFileUpload
                                allowPdf={true}
                                uploadingToS3={uploadingDocument}
                                setUploadingToS3={setUploadingDocument}
                                s3Url={categoryDocument}
                                setS3Url={setCategoryDocument}
                                borderRadius="24px"
                                width="100%"
                                privateBucket={true}
                              />
                            </Box>
                          )}

                          <Box display="flex" pt={4}>
                            <LoadingButton
                              variant="gradient"
                              size="large"
                              type="submit"
                              loading={isSubmitting}
                              disabled={
                                !(
                                  housePhoto.length > 1 &&
                                  categoryDocument.length > 1 &&
                                  !uploadingDocument &&
                                  !uploadingHousePhoto
                                )
                              }
                              sx={{
                                fontSize: "20px",
                                fontWeight: 600,
                              }}
                            >
                              Verify Document
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
      <Dialog
        open={verifyModalOpen}
        // TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "secondary.purpleGray",
            borderRadius: "24px",
            width: "400px",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={3}
        >
          <Typography variant="h5">Verifying your document</Typography>
          <CircularProgress size={70} />
        </Box>
      </Dialog>
      <CreditCardInput mintNFTData={data} />
    </>
  );
};

export default MintNFTS;
MintNFTS.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};

import React, { useState } from "react";
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
  InputLabel,
} from "@mui/material";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useField } from "formik";

export const GradiantAutocomplete = styled(Autocomplete)(({}) => ({
  // paddingRight: "20px",
  margin: "2px",
  backgroundColor: "rgba(29, 6, 104, 0.7)",
  borderRadius: "24px",
  // opacity:1,
  "& .MuiOutlinedInput-root": {
    padding: "0px !important",
    backgroundColor: "rgba(29, 6, 104, 0.7)",
  borderRadius: "24px",

  },
  "& fieldset": {
    border: "none",
  },
  // "& .mui-style-1ea6b94-MuiAutocomplete-root .MuiOutlinedInput-root":{
  //     padding:'0px !important',
  // },
  "& input": {
    fontSize: "13px",
    padding: "10px 16px !important",
    fontWeight: 500,
  },

  "& .MuiInput-root": {
    paddingLeft: "20px",
    "& input": {
      fontSize: "13px",
      padding: "10px 0px",
      fontWeight: 500,
    },

    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
    },
  },
  "& input::placeholder": {
    fontSize: "12px",
    fontWeight: 400,
    fontFamily: "Poppins, sans-serif",
  },
  "& textarea::placeholder": {
    fontSize: "12px",
    fontWeight: 400,
    fontFamily: "Poppins, sans-serif",
  },
}));

const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

export default function GoogleMapAutoComplete(props) {
  const [value, setValue] = useState("");
  const [field, meta] = useField(props);
  console.log('googleMapApiKey', googleMapApiKey)
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    usePlacesService({
      apiKey: googleMapApiKey,
    });
//   console.log("placePredictions", placePredictions);
//   console.log("isPlacePredictionsLoading", isPlacePredictionsLoading);

  return (
    <>
     <InputLabel shrink >
          Address:
        </InputLabel>
      <div
        style={{
          background: meta.error.address
            ? "rgba(255,0,0,0.7)"
            : "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
          display: "flex",
          justifyContent: "center",
          borderRadius: "24px",
          alignItems: "center",
        }}
      >
        <GradiantAutocomplete
          sx={{ width: "100%", border: "none" }}
          freeSolo
          // id="free-solo-2-demo"
          disableClearable
          name='address'
          onChange={(e,value)=>{
              props.setFieldValue('address',value)
          }}
          options={placePredictions.map((option) => option.description)}
          error={meta.touched && Boolean(meta.error)}
        //   {...field}
        //   {...props}
          renderOption={(props, option) => (
            <>
              <Box  {...props} sx={{margin:'10px',paddingLeft:'20px'}}>
                <Typography variant="body2">{option}</Typography>
              </Box>
            </>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              // label="Search input"
              placeholder="Search address"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              onChange={(evt) => {
                getPlacePredictions({ input: evt.target.value });
                props.setFieldValue('address',evt.target.value)
                // setValue(evt.target.value);
              }}
            />
          )}
        />
        
      </div>
      {meta.touched && Boolean(meta.error.address) && (
        <Typography
          variant="body2"
          sx={{ marginLeft: "20px", marginY: "5px", color: "red" }}
        >
          {meta.error.address}
        </Typography>
      )}
    </>
  );
}

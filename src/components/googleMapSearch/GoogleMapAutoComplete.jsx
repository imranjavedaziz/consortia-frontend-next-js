import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  styled,
  TextField,
  Autocomplete,
  InputLabel,
} from "@mui/material";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useField } from "formik";
var OpenLocationCode = require("open-location-code").OpenLocationCode;

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

export default function GoogleMapAutoComplete(props) {
  const ref = useRef(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [open, setOpen] = React.useState(false);
  const [adrString, setAdrString] = useState("");

  const [field, meta] = useField(props);
  const [htmlText, setHtmlText] = useState({});
  var openLocationCode = new OpenLocationCode();
  // var options = {
  //   types: ['(cities)'],
  //   componentRestrictions: {country: "us"}
  //  };
  const {
    placesService,
    placesAutocompleteService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
    autocompleteRef,
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  React.useEffect(() => {
    // fetch place details for the first element in placePredictions array
    if (placePredictions.length)
      placesService?.getDetails(
        {
          placeId: placePredictions.find(
            (item) => item.description === selectedValue
          )?.place_id,
        },
        (placeDetails) => {
          setAdrString(placeDetails?.adr_address);
          // console.log("placeDetails", placeDetails?.adr_address);
          console.log("placeDetails", placeDetails?.place_id);
          return props.setLatLngPlusCode({
            lat: placeDetails?.geometry?.location?.lat(),
            lng: placeDetails?.geometry?.location?.lng(),
            plusCode: openLocationCode?.encode(
              placeDetails?.geometry?.location?.lat(),
              placeDetails?.geometry?.location?.lng()
            ),
            place_id: placeDetails?.place_id,
            // detailedAddress: placeDetails?.adr_address,
          });
        }
      );
  }, [selectedValue]);
  // console.log('latLngPlusCode', latLngPlusCode)
  return (
    <>
      <InputLabel shrink>Address:</InputLabel>
      <div
        style={{
          background: Boolean(meta.touched && meta.error)
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
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          name="address"
          onChange={(e, value) => {
            props.setFieldValue("address", value);
            setSelectedValue(value);
          }}
          options={placePredictions.map((option) => option.description)}
          error={meta.touched && Boolean(meta.error)}
          //   {...field}
          //   {...props}
          renderOption={(props, option) => (
            <>
              <Box {...props} sx={{ margin: "10px", paddingLeft: "20px" }}>
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
                props.setFieldValue("address", evt.target.value);
                setSelectedValue(evt.target.value);
              }}
            />
          )}
        />
      </div>
      {meta.touched && Boolean(meta.error) && (
        <Typography
          variant="body2"
          sx={{ marginLeft: "20px", marginY: "5px", color: "red" }}
        >
          {meta.touched && meta.error}
        </Typography>
      )}
    </>
  );
}

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
import Geocode from "react-geocode";

export const GradiantAutocomplete = styled(Autocomplete)(({ theme }) => ({
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
    fontFamily: theme.typography.fontFamily,
  },
  "& textarea::placeholder": {
    fontSize: "12px",
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily,
  },
}));

export default function GoogleMapAutoComplete(props) {
  const [selectedValue, setSelectedValue] = useState("");
  const [open, setOpen] = React.useState(true);
  const [adrString, setAdrString] = useState("");
  const [reset, setReset] = useState(false);
  const [field, meta] = useField(props);
  var openLocationCode = new OpenLocationCode();
  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  // var options = {
  //   types: ['(cities)'],
  //   componentRestrictions: {country: "us"}
  //  };
  const { placesService, placePredictions, getPlacePredictions } =
    usePlacesService({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

  // console.log('penLocationCode?.encode'
  //               // placeDetails?.geometry?.location?.lat(),
  //               // placeDetails?.geometry?.location?.lng()
  //             , openLocationCode?.encode(
  //               38.8936126,
  //               -90.1715018
  //             ),)
  // console.log('placePredictions', placePredictions)
  // console.log('selectedValue', selectedValue)
  React.useEffect(() => {
    // debugger
    // fetch place details for the first element in placePredictions array
    if (
      placePredictions.find((item) => item.description == selectedValue)
        ?.place_id == undefined
    ) {
      // debugger
      if (selectedValue) {
        Geocode.fromAddress(selectedValue).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            return props.setLatLngPlusCode({
              lat: lat,
              lng: lng,
              plusCode: openLocationCode?.encode(lat, lng),
              // place_id: placeDetails?.place_id,
              // detailedAddress: placeDetails?.adr_address,
            });
          },
          (error) => {
            console.error(error);
          }
        );
      }
    } else {
      if (placePredictions?.length >= 1)
        placesService?.getDetails(
          {
            placeId: placePredictions.find(
              (item) => item.description == selectedValue
            )?.place_id,
          },
          (placeDetails) => {
            setAdrString(placeDetails?.adr_address);
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
    }
  }, [selectedValue, reset]);
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
          // id="open-on-focus"
          disableClearable
          disabled={props.disabled}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          value={props.initialValue}
          openOnFocus={true}
          name="address"
          onChange={(e, value) => {
            props.setFieldValue("address", value);
            setReset((prev) => !prev);
            setSelectedValue(value);
          }}
          options={placePredictions?.map((option) => option?.description)}
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

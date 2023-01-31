import {
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useField } from "formik";
import React, { useState } from "react";
import { styled } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const GradiantTextField = styled(TextField)(({}) => ({
  paddingRight: "20px",

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
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
}));

const CustomInputField = ({
  label,
  sublabel,
  options,
  sensitive,
  placeholder,
  onCutHandler,
  onCopyHandler,
  onPasteHandler,
  inputType,
  setFieldValue,
  ...props
}) => {
  const [field, meta] = useField(props);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box>
      {label && (
        <InputLabel shrink htmlFor={props.name}>
          {label}
        </InputLabel>
      )}
      {sublabel && (
        <Typography
          variant="subtitle1"
          sx={{
            color: "#FAFBFC",
            opacity: 0.5,
            marginBottom: 1,
          }}
        >
          {sublabel}
        </Typography>
      )}
      {inputType == "phone" ? (
        <Box
          sx={{
            background: "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
            borderRadius: "24px",
            padding: "2px 2px 2px 2px",
          }}
        >
          <Box
            sx={{
              background: "rgba(29, 6, 104, 1)",
              borderRadius: "24px",
              "& .react-tel-input": {
                // "& .form-control ": {
                "& :hover": {
                  // background: "rgba(29, 6, 104, 1)",
                },
                "& .selected-flag open ": {
                  background: "none",
                  ":hover": {
                    background: "transparent !important",
                  },
                  ":before": {
                    borderColor: "transparent !important",
                    boxShadow: "transparent !important",
                  },
                },
                "& .selected-flag": {
                  background: "none",
                },
                "& .selected-flag.open": {
                  ":hover": {
                    background: "transparent !important",
                  },
                  ":before": {
                    borderColor: "none",
                    boxShadow: "none",
                  },
                },
                "& .flag-dropdown.open": {
                  background: "transparent",
                  "& .selected-flag": {
                    background: "none",
                  },
                },
                "& .country-list": {
                  "& .search": {
                    background: "rgba(29, 6, 104, 1)",
                  },
                  "& :hover": {
                    background: "rgba(29, 6, 104, 1)",
                  },
                  "& .country.highlight": {
                    backgroundColor: "transparent",
                  },
                },
                // }
              },
            }}
          >
            <PhoneInput
              country={"us"}
              enableSearch={true}
              // name={props.name}
              // value={this.state.phone}
              onChange={(phone) => setFieldValue("phoneNumber", phone)}
              // {...field}
              // {...props}
              buttonStyle={{
                backgroundColor: "rgba(29, 6, 104, 1)",
                color: "#fff",
                border: "none",
                borderRadius: "24px",
                paddingLeft: "10px",
                ":hover": {
                  background: "transparent",
                },
              }}
              inputStyle={{
                backgroundColor: "rgba(29, 6, 104, 1)",
                color: "#fff",
                width: "100%",
                border: "none",
                borderRadius: "24px",
              }}
              dropdownStyle={{
                backgroundColor: "rgba(29, 6, 104, 1)",
                color: "#fff",
                // border: "none",
                // borderRadius: "24px",
              }}
              searchStyle={{
                backgroundColor: "rgba(29, 6, 104, 1)",
                color: "#fff",
                // border: "none",
                // borderRadius: "24px",
              }}
            />
          </Box>
        </Box>
      ) : (
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
          <GradiantTextField
            id={props.name}
            fullWidth
            variant="standard"
            type={sensitive ? (showPassword ? "text" : "password") : "text"}
            placeholder={placeholder}
            onCut={onCutHandler}
            onCopy={onCopyHandler}
            onPaste={onPasteHandler}
            inputProps={{
              ...(props.name == "phoneNumber" && { maxLength: 13 }),
            }}
            InputProps={{
              disableUnderline: true,
              ...(sensitive && {
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff opacity={0.8} />
                    ) : (
                      <Visibility opacity={0.8} />
                    )}
                  </IconButton>
                ),
              }),
            }}
            error={meta.touched && Boolean(meta.error)}
            {...field}
            {...props}
            style={{
              background: Boolean(meta.touched && meta.error)
                ? "rgba(29, 6, 104, 1)"
                : "rgba(29, 6, 104, 1)",
              margin: "2px 2px 2px 2px",
              borderRadius: "24px",
            }}
          >
            {props.select &&
              options &&
              options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Typography variant="body2">{option.label}</Typography>
                </MenuItem>
              ))}
          </GradiantTextField>
        </div>
      )}

      {meta.touched && Boolean(meta.error) && (
        <Typography
          variant="body2"
          sx={{ marginLeft: "20px", marginY: "5px", color: "red" }}
        >
          {meta.touched && meta.error}
        </Typography>
      )}
    </Box>
  );
};

export default CustomInputField;

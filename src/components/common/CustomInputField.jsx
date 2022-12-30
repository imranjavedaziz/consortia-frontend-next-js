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

const GradiantTextField = styled(TextField)(({}) => ({
  paddingRight: "20px",

  "& .MuiInput-root": {
    paddingLeft: "20px",
    "& input":{
      fontSize:'13px',
      padding:'10px 0px',
      fontWeight:500
    },
   
    "& .MuiSelect-select":{
      display: "flex",
      alignItems: "center",
    },
  },
  "& input::placeholder": {
    fontSize: "16px",
    fontWeight: 400,
  },
}));

const CustomInputField = ({
  label,
  options,
  sensitive,
  placeholder,
  onCutHandler,
  onCopyHandler,
  onPasteHandler,
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

      <div
        style={{
          background: Boolean(meta.touched && meta.error)
            ? "rgba(255,0,0,0.7)"
            : "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
          display: "flex",
          justifyContent: "center",
          borderRadius: "24px",
          alignItems:'center'
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
              <Typography variant='body2'>{option.label}</Typography>  
              </MenuItem>
            ))}
        </GradiantTextField>
      </div>
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

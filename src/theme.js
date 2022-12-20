import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
  },
});

export const darkTheme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "gradient", size: "small" },
          style: {
            textTransform: "none",
            background: "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
            borderRadius: "8px",
            width: "80px",
          },
        },
        {
          props: { variant: "gradient", size: "large" },
          style: {
            textTransform: "none",
            background: "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
            borderRadius: "24px",
            width: "100%",
          },
        },
      ],
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `url(/assets/images/mainBackgound.svg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        },
      },
    },
  },

  typography: {
    fontFamily: "Roboto",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,

    h2: {
      fontWeight: 600,
      fontSize: "48px",
      lineHeight: "75px",
      letterSpacing: "0.04em",
      color: "#fff",
    },

    h3: {
      fontWeight: 600,
      fontSize: "40px",
      lineHeight: "44px",
      letterSpacing: "0.04em",
    },

    h4: {
      fontWeight: 400,
      fontSize: "32px",
      lineHeight: "45px",
      color: "#fff",
    },

    h5: {
      fontWeight: 500,
      fontSize: "24px",
      lineHeight: "30px",
      color: "#fff",
    },
    h6: {
      fontWeight: 600,
      fontSize: "18px",
      lineHeight: "28px",
      color: "#fff",
    },

    body1: {
      fontWeight: 400,
      fontSize: "20px",
      lineHeight: "30px",
      color: "#fff",
    },
    body2: {
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "16px",
      color: "#fff",
    },
  },

  palette: {
    mode: "dark",
    background: {
      default:
        "linear-gradient(94.09deg, #12134D 3.97%, #10053C 51.03%, #12134D 95.99%)",
    },
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
  },
});

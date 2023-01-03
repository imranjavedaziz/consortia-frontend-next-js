import { createTheme } from "@mui/material/styles";

const theme = createTheme();
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
      purpleBlue: "#6720FF",
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
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "25px !important",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#313770",
          borderRadius: "8px",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          maxHeight: "300px !important",
          border: "1px solid rgba(255, 255, 255, 0.3) !important",
        },
      },
    },
  },

  typography: {
    fontFamily: "Poppins, sans-serif",
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
      fontFamily: "Graphik, sans-serif",
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
      lineHeight: "30px",
      color: "#fff",
      [theme.breakpoints.up("sm")]: {
        fontSize: "13px !important",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "20px !important",
      },
    },
    body2: {
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "16px",
      color: "#fff",
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "18px",
      color: "#fff",
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "17px",
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
      purpleGray: "#313770",
      yellow: "#FAE94D",
      darkGray: "#454470",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 2000,
      fk: 2560,
    },
  },
});

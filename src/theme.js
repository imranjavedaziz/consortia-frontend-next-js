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
          [theme.breakpoints.up("lg")]: {
            fontSize: "25px !important",
          },
          [theme.breakpoints.between("sm", "lg")]: {
            fontSize: "20px !important",
          },
          [theme.breakpoints.down("sm")]: {
            fontSize: "12px !important",
          },
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
      lineHeight: "75px",
      letterSpacing: "0.04em",
      color: "#fff",
      [theme.breakpoints.up("lg")]: {
        fontSize: "48px",
        fontWeight: 600,
      },
      [theme.breakpoints.between("sm", "xl")]: {
        fontSize: "24px",
        fontWeight: 600,
        lineHeight: "160%",
      },
      [theme.breakpoints.between("xs", "sm")]: {
        fontSize: "20px",
        fontWeight: 600,
        lineHeight: "160%",
      },
    },

    h3: {
      fontFamily: "Graphik, sans-serif",
      lineHeight: "44px",
      letterSpacing: "0.04em",
      [theme.breakpoints.up("lg")]: {
        fontSize: "40px !important",
        fontWeight: 600,
      },
      [theme.breakpoints.between("sm", "lg")]: {
        fontSize: "20px",
        fontWeight: 500,
      },
      [theme.breakpoints.between("xs", "sm")]: {
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: "18px",
      },
    },

    h4: {
      [theme.breakpoints.up("md")]: {
        fontSize: "40px !important",
        fontWeight: 600,
      },
      [theme.breakpoints.between("sm", "md")]: {
        fontSize: "20px",
        fontWeight: 400,
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
        fontWeight: 400,
      },
      color: "#fff",
    },

    h5: {
      lineHeight: "30px",
      color: "#fff",
      [theme.breakpoints.up("lg")]: {
        fontWeight: 600,
        fontSize: "24px",
      },
      [theme.breakpoints.between("xs", "lg")]: {
        fontWeight: 500,
        fontSize: "12px",
      },
    },
    h6: {
      fontWeight: 600,
      lineHeight: "28px",
      color: "#fff",
      [theme.breakpoints.up("lg")]: {
        fontSize: "18px",
      },
      [theme.breakpoints.between("sm", "lg")]: {
        fontSize: "12px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
      },
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
      [theme.breakpoints.between("xs", "sm")]: {
        fontSize: "8px",
        fontWeight: 400,
        lineHeight: "12px",
      },
    },
    body2: {
      fontWeight: 400,
      lineHeight: "16px",
      color: "#fff",
      [theme.breakpoints.up("lg")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.between("sm", "lg")]: {
        fontSize: "8px",
      },
      [theme.breakpoints.between("xs", "sm")]: {
        fontSize: "8px",
        fontWeight: 500,
        lineHeight: "160%",
      },
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "18px",
      color: "#fff",
      [theme.breakpoints.down("sm")]: {
        fontSize: "8px",
        fontWeight: 300,
      },
    },
    subtitle2: {
      lineHeight: "22px",
      color: "#fff",
      [theme.breakpoints.up("lg")]: {
        fontSize: "16px",
        fontWeight: 400,
      },
      [theme.breakpoints.between("sm", "lg")]: {
        fontSize: "8px",
        fontWeight: 500,
      },
      [theme.breakpoints.between("xs", "sm")]: {
        fontSize: "7px",
        fontWeight: 500,
        lineHeight: "6px",
      },
    },
  },

  palette: {
    mode: "dark",
    background: {
      default:
        "linear-gradient(94.09deg, #12134D 3.97%, #10053C 51.03%, #12134D 95.99%)",
    },
    border: {
      default: " linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
    },
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
      purpleGray: "#313770",
      yellow: "#FAE94D",
      darkGray: "#454470",
      gray: "#FAFBFC",
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

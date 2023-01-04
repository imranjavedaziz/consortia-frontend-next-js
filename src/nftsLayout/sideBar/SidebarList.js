import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Collapse,
  IconButton,
  ListItem,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import styled from "@emotion/styled";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import sidebarLogo from "../../../public/assets/icons/sidebarLogo.svg";
import CloseIcon from "@mui/icons-material/Close";
import { practitionarPages, consumerPages } from "../../utils/dashboardPages";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const StyledListItem = styled(ListItem)({
  paddingRight: "0px",
  "& .MuiTypography-root": {},
  "& .MuiListItemButton-root": {
    // borderRadius: "10px",
    color: "#616161",
  },
  "& .Mui-selected": {
    background:
      "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%) !important",
    color: "rgba(59,130,246,.5) !important",
    borderLeft: "3px solid #FFFFFF",
    paddingTop: "14px",
    paddingBottom: "14px",
    // position: "relative",
    // marginRight: "6px",
    // height: "100%",
    // zIndex: "99",
    // "&::after": {
    //   content: "''",
    //   position: "absolute",
    //   borderRight: "1px solid",
    //   borderColor: 'red',
    //   width: "0",
    //   height: "100%",
    //   zIndex: "1",
    //   top: 0,
    //   right: "0px",
    // },

    // fontWeight: "900 !important",
  },
  "& .MuiListItemIcon-root": {
    minWidth: "0px",
  },
  "& .MuiListItemText-root": {
    paddingLeft: "10px",
  },
});

export default function SidebarList({ setopenForMobile }) {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const isLaptop = useMediaQuery("(min-width:1000px)");
  const profile_info = JSON.parse(localStorage.getItem("profile_info"));

  const { route, push } = useRouter();
  console.log("route", route);

  const handleListItemClick = (page) => {
    setSelectedIndex(page?.id);
    push(page.path);
    !isLaptop && setopenForMobile(false);
  };
  const [parent, setParent] = React.useState(-1);

  const handleClick = (id) => {
    if (id === parent) {
      setParent(-1);
    } else {
      setParent(id);
    }
  };
  React.useEffect(() => {
    // debugger
    const profileInfo = JSON.parse(localStorage.getItem("profile_info"));
    if (profileInfo?.user?.role === "practitioner") {
      if (route.includes("property")) {
        setParent(2);
      } else if (route.includes("practitionerNfts")) {
        setParent(3);
      } else if (route.includes("credits")) {
        setParent(4);
      } else if (route.includes("community")) {
        setParent(-1);
      } else if (route.includes("dashboard")) {
        setParent(1);
      }
    } else {
      if (route.includes("dashboard")) {
        setParent(1);
      } else if (route.includes("credits")) {
        setParent(3);
      } else if (route.includes("property")) {
        setParent(2);
      } else if (route.includes("community")) {
        setParent(-1);
      }
    }
  }, [route]);
  console.log("parent", parent);
  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: isLaptop ? "center" : "space-around",
          alignItems: "center",
          py: 3,
        }}
      >
        <Link href="/">
          <Image src={sidebarLogo} height={34} width={"100%"} />
        </Link>
        {!isLaptop && (
          <IconButton color="primary" onClick={() => setopenForMobile(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <List component="nav" aria-label="main mailbox folders">
        {(profile_info?.user?.role === "practitioner"
          ? practitionarPages
          : consumerPages
        ).map((item, index) =>
          !item.nested ? (
            <>
             {console.log(
                "route == item?.path",
                route,
                item,
                route == item?.path
              )}
               <StyledListItem key={index} sx={{ paddingLeft: "0px" }}>
              <ListItemButton
                disableRipple
                selected={route == item?.path}
                onClick={() => handleListItemClick(item, item?.id)}
              >
                <ListItemIcon>
                  <Image src={item?.icon} height={22} width={22} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2">{item.title}</Typography>
                  }
                />
              </ListItemButton>
            </StyledListItem>
            </>
           
          ) : (
            <>
              <StyledListItem key={index} sx={{ paddingLeft: "0px" }}>
                <ListItemButton
                  disableRipple
                  selected={route == item?.path}
                  onClick={() => handleClick(item?.id)}
                  key={index}
                >
                  <ListItemIcon>
                    <Image src={item?.icon} height={22} width={22} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2">{item.title}</Typography>
                    }
                  />
                  {parent == item?.id ? (
                    <ExpandLess />
                  ) : (
                    <KeyboardArrowRightIcon />
                  )}
                </ListItemButton>
              </StyledListItem>
              <Collapse in={parent == item.id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((subPage, ind) => (
                    <StyledListItem key={ind}>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        selected={`${route}/` == subPage.path}
                        onClick={() => handleListItemClick(subPage)}
                      >
                        <ListItemIcon>
                          <Image src={subPage?.icon} height={22} width={22} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">
                              {subPage.title}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </StyledListItem>
                  ))}
                </List>
              </Collapse>
            </>
          )
        )}
        {/* <StyledListItem>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
          </ListItemButton>
        </StyledListItem> */}
      </List>
    </Box>
  );
}

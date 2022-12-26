import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Collapse, IconButton, ListItem, SvgIcon, Typography, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import sidebarLogo from "../../../public/assets/icons/sidebarLogo.svg";
import CloseIcon from '@mui/icons-material/Close';
import { pages } from "../../utils/dashboardPages";
import Image from "next/image";
import { useRouter } from "next/router";

const StyledListItem = styled(ListItem)({
  "& .MuiTypography-root": {},
  "& .MuiListItemButton-root": {
    borderRadius: "10px",
    color: "#616161",
  },
  "& .Mui-selected": {
    background:
      "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%) !important",
    color: "rgba(59,130,246,.5) !important",
    // fontWeight: "900 !important",
  },
});

export default function SidebarList({setopenForMobile}) {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const isLaptop = useMediaQuery("(min-width:1000px)");

  const { route, push } = useRouter();

  const handleListItemClick = (page) => {
    setSelectedIndex(page?.id);
    push(page.path);
   !isLaptop && setopenForMobile(false)

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

    if (route.includes("-nft")) {
      setParent(1);
    } else if (route.includes("practitioner")) {
      setParent(2);
    } else if (route.includes("credits")){
      setParent(3);
    }
    else  if (route.includes("community")){
        setParent(-1);
      }
  }, [route]);
  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <Box sx={{ display: "flex", justifyContent:isLaptop?  "center":"space-around",alignItems:"center", py: 3 }}>
        <Image src={sidebarLogo} height={34} width={"100%"} />
       {!isLaptop && <IconButton  color="primary" onClick={()=>setopenForMobile(false)} >
            <CloseIcon />
          </IconButton>}
      </Box>

      <List component="nav" aria-label="main mailbox folders">
        {pages.map((item, index) =>
          !item.nested ? (
            <StyledListItem key={index}>
              <ListItemButton
              disableRipple
                selected={selectedIndex == item?.id}
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
          ) : (
            <>
              <ListItemButton disableRipple onClick={() => handleClick(item?.id)} key={index}>
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

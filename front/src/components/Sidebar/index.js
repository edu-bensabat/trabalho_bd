import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import EuroSymbolOutlinedIcon from "@mui/icons-material/EuroSymbolOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        marginBottom: "15px",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          height: "100%",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#009879 !important",
        },
        "& .pro-menu-item.active": {
          color: "#009879 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Typography variant="h5" color={colors.grey[100]}></Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "0%"}>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Companies Count"
              to="/CompaniesCountTable"
              icon={<BusinessOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Night Launched Rockets"
              to="/NightLaunchedRocketsTable"
              icon={<DarkModeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Average Cost"
              to="/AverageCostTable"
              icon={<EuroSymbolOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Completed Missions"
              to="/MissionsCompletedTable"
              icon={<TaskAltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Countries Presents"
              to="/CountriesPresentsCompaniesTable"
              icon={<PublicOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Rockets In Activity"
              to="/RocketsInActivityTable"
              icon={<RocketLaunchOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

import React, { useState } from "react";
import {
  BottomNavigation as BottomNavigationBar,
  BottomNavigationAction,
  Paper
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { RouteType } from "@/client/routes";

interface BottomNavigationProps {
  routes: RouteType[];
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  routes
}) => {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  return (
    <Paper
      elevation={4}
      sx={{
        width: "100%",
        height: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <BottomNavigationBar
        showLabels
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        sx={{
          width: "100%",
          height: "100%",
          overflowX: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 4,
          backgroundColor: "transparent",
        }}
      >
        {routes
          .filter((route) => route.sidebar)
          .map(({ name, route, icon }, index) => (
            <BottomNavigationAction
              key={index}
              label={name}
              value={route}
              icon={icon} // Assumes icon is passed as a JSX element
              component={NavLink}
              to={route!}
              sx={{
                width: 80,
                whiteSpace: "nowrap"
              }}
            />
          ))}
      </BottomNavigationBar>
    </Paper>
  );
};

export default BottomNavigation;




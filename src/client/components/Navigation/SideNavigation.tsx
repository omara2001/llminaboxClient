import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText, Box ,Typography } from "@mui/material";
import { RouteType } from "@/client/routes";

interface SideNavigationProps {
  routes: RouteType[];
}

export const SideNavigation: React.FC<SideNavigationProps> = ({ routes }) => {
  const location = useLocation();
// Find the active route
const activeRoute = routes.find((route) => location.pathname === route.route);

// Generate breadcrumbs
const breadcrumbs =
  activeRoute && activeRoute.name !== "Dashboard"
    ? `Dashboard > ${activeRoute.name}`
    : "Dashboard";
  return (
    <Box
      component="nav"
      sx={{
        background: "inherit", // Inherit background from parent
        color: "white",
        width: { xs: "80px", md: "250px" }, // Responsive width
        flexShrink: 0,
        height: "100%", // Full height to match the viewport
        overflow: "hidden", // Prevent overflow that causes horizontal scroll
        boxSizing: "border-box", // Include padding/border in width
        padding: "10px",
      }}
    >
      {/* Breadcrumbs */}
      <Typography
        variant="h6"
        sx={{
          color: "#DFDFDF",
          fontSize: "14px",
          marginBottom: "10px",
          textAlign: "left",
        }}
      >
        {breadcrumbs}
      </Typography>

      {/* Navigation List */}
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          padding: "0",
        }}
      >
        {routes
          .filter((route) => route.sidebar)
          .map(({ name, route, icon }, index) => {
            const isActive = location.pathname === route;

            return (
              <NavLink
                key={index}
                to={route}
                style={{ textDecoration: "none" }}
              >
                <ListItem
                  sx={{
                    backgroundColor: name === "Create AI Assistant"
                      ? "rgba(255, 255, 255, 0.2)"
                      : isActive
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                    border: name === "Create AI Assistant" ? "1px solid white" : "none",
                    "&:hover":{ backgroundColor: "rgb(245, 184, 27)" },
                    "&:active": { backgroundColor: "rgba(245, 184, 27, 0.8)" },
                    color: "white",
                    borderRadius: name === "Create AI Assistant" ? "20px" : "12px",
                    margin: name === "Create AI Assistant" ? "15px 0" : "1px 0", 
                    padding: "1px", 
                    textAlign: name === "Create AI Assistant" ? "center" : "left",
                    transition: "all 0.3s ease",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                      minWidth: "30px",
                      "@media (min-width: 768px)": {
                        minWidth: "40px",
                      },
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={name}
                    sx={{
                      display: { xs: "none", md: "block" },
                      marginLeft: name === "Create AI Assistant" ? "0" : "10px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  />
                </ListItem>

              </NavLink>
            );
          })}
      </List>
    </Box>
  );
};

export default SideNavigation;

import React from "react";
import { Routes } from "react-router-dom";
import { RouteType } from "@/client/routes";
import { Grid } from "@mui/material";

interface MainContentProps {
  routes: RouteType[];
  getRoutes: (allRoutes: RouteType[]) => JSX.Element[];
}

const MainContent: React.FC<MainContentProps> = ({ routes, getRoutes }) => {
  return (
    <Grid
      item
      xs={12}
      style={{ padding: "1rem" }}
    >
      <Routes>{getRoutes(routes)}</Routes>
    </Grid>
  );
};

export default MainContent;

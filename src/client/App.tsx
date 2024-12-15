import React, { useEffect, useState } from "react";
import { useLocation,Route } from "react-router-dom";
import { Box, Paper, CssBaseline, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppContext } from "@/client/context";
import { routes, RouteType} from "@/client/routes";
import Header from "@/client/components/Header";
import MainContent from "@/client/components/Main";
import Footer from "@/client/components/Footer";
import { SideNavigation, BottomNavigation } from "@/client/components/Navigation";

import "@fontsource/roboto";

export default function App() {
  const [appData] = useAppContext();
  const { pathname } = useLocation();
  const [isDrawerOpen, setDrawerOpen] = useState(false); // State for Drawer toggle

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Determine the current route and if the sidebar should be shown
  const currentRoute = routes.find((route) => route.route === pathname);
  const showSidebar = currentRoute?.showSidebar !== false;
  // Check if the current page is the pricing page
  const isPricingPage = pathname === "/pricing";


  const getRoutes = (allRoutes: RouteType[]): JSX.Element[] =>
    allRoutes.map((route) => (
      <Route
        key={route.name}
        path={route.route}
        element={route.component}
      />
    ));

  return (
    <>
      {/* CssBaseline resets default styles */}
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
          margin: 0,
          padding: 0,
          overflowX: "hidden",
          background: "linear-gradient(to bottom, #44A0FF 0%, #085CB3 19%, #040068 63%)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Header */}
        <Box sx={{ flexShrink: 0, zIndex: 10 }}>
          <Header />
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            flexGrow: 1,
            height: "100%",
          }}
        >
          {/* Conditionally Render Sidebar */}
          {showSidebar && !isPricingPage && (
            <>
              {/* Sidebar for large screens */}
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  width: appData?.sidenav?.mini ? "80px" : "250px",
                  flexShrink: 0,
                  height: "auto",
                }}
              >
                <SideNavigation routes={routes} />
              </Box>

              {/* Drawer for small screens */}
              <IconButton
                sx={{
                  display: { xs: "block", md: "none" },
                  position: "absolute",
                  left: 10,
                  top: 10,
                  color: "white",
                }}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                open={isDrawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{
                  "& .MuiDrawer-paper": {
                    width: "250px",
                    background: "linear-gradient(to bottom, #44A0FF, #085CB3)",
                    color: "white",
                  },
                }}
              >
                <SideNavigation routes={routes} />
              </Drawer>
            </>
          )}

          {/* Main Content */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: { xs: "100%", sm: "100%", md: "100%"},
              margin: "0 auto",
              padding: { xs: "10px 5px", sm: "5px" },
            }}
          >
            <Paper
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", sm: "90%", md: "1050px" }, 
                backgroundColor: "white",
                borderRadius: "18px",
                padding: { xs: "10px", sm: "5px" , md: "10px"},
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                minHeight: "auto",
                marginTop: { xs: "10px", sm: "20px", md: "30px" },
                marginRight: showSidebar ? "auto" : "auto",// Dynamic margin
                marginLeft:  showSidebar ? "none" : "auto", // Dynamic margin
              }}
            >
              <MainContent routes={routes} getRoutes={getRoutes} />
            </Paper>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            flexShrink: 1,
            width: "100%",
            marginBottom: "auto",
          }}
        >
          <Footer />
        </Box>

        {/* Bottom Navigation */}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 999,
            display: { xs: "block", md: "none" },
            padding: "3px",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <BottomNavigation routes={routes} />
        </Box>
      </Box>
    </>
  );
}








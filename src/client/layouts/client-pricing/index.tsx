import React from "react";
import {
  Grid,
  Typography,
  Box,
  Container,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import logo from "../../assets/images/Created AI Assistants.png";

const Pricing = () => {
  const redirectToCheckout = async (billingCycle: "monthly" | "annual") => {
    try {
      const response = await fetch("/pay/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ billingCycle }),
      });
      const data = await response.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Failed to proceed to checkout, please try again later.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred, please try again later");
    }
  };

  return (
    <Box p={3}>
      <Container maxWidth="lg">
        {/* Page Title */}
        <Box textAlign="center" mb={2}>
        <Box display="flex" alignItems="center" justifyContent="center" mb="2"> 
        <img
          src={logo as string}
          alt="AI Assistants Logo"
          style={{
            width: "40px",
            height: "40px",
            marginRight: "10px",
            
          }}
        />
          <Typography variant="h4" component="h1" gutterBottom
          sx={{fontSize: 24,fontFamily: "Ubuntu",fontWeight: "medium"}}
          >
          Select you AI Assistant Plan
          </Typography>
          </Box>
          <Typography variant="body1" color="textSecondary"
          sx={{fontSize: 16,fontFamily: "Ubuntu",fontWeight: "regular"}}
          >
            Unlock the AI assistant experience tailored to your needs
          </Typography>
        </Box>

        {/* Pricing Cards */}
        <Grid 
  container 
  spacing={{ xs: 2, sm: 4, md: 2 , lg: 8 }} // Adjust spacing dynamically
  justifyContent="center"
  wrap="wrap" // Ensure items wrap on small screens
>
          {/* Monthly Plan */}
          <Grid item xs={14} sm={8} md={4} lg={4}>
            <Card>
              <CardContent sx={{ backgroundColor: "#F5B81B" }}>
                <Box textAlign="center">
                  <StarIcon fontSize="medium" sx={{ color: "white" }} />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#FFFFFF",fontSize:20,fontFamily:"Ubuntu",fontWeight:"bold"}}
                  >
                    Monthly Plan
                  </Typography>
                  <Typography 
                  variant="h6" 
                  color="textPrimary"
                  sx={{fontSize: 20,fontFamily: "Ubuntu",fontWeight: "bold"}}
                         >
                    $89.99/month
                  </Typography>

                  <Typography variant="body2" color="#000000" paragraph
                  sx={{fontSize: 12,fontFamily: "Ubuntu",fontWeight: "Light"}}
                  >
                    Unlock Premium Features
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: "#FFFFFF" }} />
                <Box mt={4} textAlign="left">
                  <ul style={{ color: "#1B1B1B", listStyle: "none" }}>
                    <li>✔️ Feature A</li>
                    <li>✔️ Feature B</li>
                    <li>✔️ Feature C</li>
                  </ul>
                </Box>
                <Box textAlign="center">
                  <Button
                    variant="contained"
                    sx={{
                      mt: 4,
                      width: "170px",
                      backgroundColor: "#0085EF",
                      color: "#FFFFFF",
                      borderRadius:"8px",
                      fontSize: 14,
                      fontFamily: "Ubuntu",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#0074CC" },
                    }}
                    onClick={() => redirectToCheckout("monthly")}
                  >
                    Choose Plan
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Annual Plan */}
          <Grid item xs={14} sm={8} md={4} lg={4}>
            <Card>
              <CardContent sx={{ backgroundColor: "#50B1FF" }}>
                <Box textAlign="center">
                  <CalendarMonthIcon fontSize="medium" sx={{ color: "white" }} />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#FFFFFF",fontSize:20,fontFamily:"Ubuntu",fontWeight:"bold"}}
                  >
                    Annual Plan
                  </Typography>
                  <Typography variant="h6" color="textPrimary"
                  sx={{fontSize: 20,fontFamily: "Ubuntu",fontWeight: "bold"}}
                  >
                    $999.99/year
                  </Typography>
                  <Typography variant="body2" color="#000000" paragraph
                  sx={{fontSize: 12,fontFamily: "Ubuntu",fontWeight: "Light"}}
                  >
                    Benefit From Our Annual Plan Discount
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: "#FFFFFF" }} />
                <Box mt={4} textAlign="left">
                  <ul style={{ color: "#1B1B1B", listStyle: "none" }}>
                    <li>✔️ Feature A</li>
                    <li>✔️ Feature B</li>
                    <li>✔️ Feature C</li>
                  </ul>
                </Box>
                <Box textAlign="center">
                  <Button
                    variant="contained"
                    sx={{
                      mt: 4,
                      width: "170px",
                      backgroundColor: "#0085EF",
                      color: "#FFFFFF",
                      borderRadius:"8px",
                      fontSize: 14,
                      fontFamily: "Ubuntu",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#0074CC" },
                    }}
                    onClick={() => redirectToCheckout("annual")}
                  >
                    Choose Plan
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Enterprise Plan */}
          <Grid item xs={14} sm={8} md={4} lg={4}>
            <Card>
              <CardContent sx={{ backgroundColor: "#F169DF" }}>
                <Box textAlign="center">
                  <AccessTimeIcon fontSize="medium" sx={{ color: "white" }} />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#FFFFFF",fontSize:20,fontFamily:"Ubuntu",fontWeight:"bold"}}
                  >
                    Enterprise Plan
                  </Typography>
                  <Typography variant="h6" color="textPrimary"
                  sx={{fontSize: 20,fontFamily: "Ubuntu",fontWeight: "bold"}}
                  >
                    Contact Us For Pricing
                  </Typography>
                  <Typography variant="body2" color="#000000" paragraph
                  sx={{fontSize: 12,fontFamily: "Ubuntu",fontWeight: "Light"}}
                  >
                    Unlock Your Dedicated AI Solution
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: "#FFFFFF" }} />
                <Box mt={4} textAlign="left">
                  <ul style={{ color: "#1B1B1B", listStyle: "none" }}>
                    <li>✔️ Feature A</li>
                    <li>✔️ Feature B</li>
                    <li>✔️ Feature C</li>
                  </ul>
                </Box>
                <Box textAlign="center">
                  <Button
                    variant="contained"
                    sx={{
                      mt: 4,
                      width: "170px",
                      backgroundColor: "#0085EF",
                      color: "#FFFFFF",
                      borderRadius:"8px",
                      fontSize: 14,
                      fontFamily: "Ubuntu",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#0074CC" },
                    }}
                    onClick={() =>
                      (window.location.href = "https://criticalfutureglobal.com/")
                    }
                  >
                    Contact Us
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing;


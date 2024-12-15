import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SignUp() {
  return (
    <Box
      mb={6}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Box
        width="100%"
        maxWidth="500px"
        mx="auto"
        px={1}
      >
        <Card sx={{ padding: 4, boxShadow: 3 }}>
          {/* Header */}
          <Box
            textAlign="center"
            mb={3}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
            >
              Create Your Account
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Fill in your details to create an account.
            </Typography>
          </Box>

          {/* Form Fields */}
          <Box
            component="form"
            role="form"
          >
            <Box mb={2}>
              <TextField
                type="text"
                label="Full Name"
                variant="outlined"
                fullWidth
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                type="email"
                label="Email Address"
                variant="outlined"
                fullWidth
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                required
              />
            </Box>

            {/* Terms and Conditions */}
            <Box
              display="flex"
              alignItems="center"
              mt={2}
            >
              <Checkbox color="primary" />
              <Typography
                variant="body2"
                color="textSecondary"
              >
                I agree to the{" "}
                <Link
                  to="#"
                  style={{ textDecoration: "none", color: "#007bff" }}
                >
                  Terms and Conditions
                </Link>
              </Typography>
            </Box>

            {/* Submit Button */}
            <Box
              mt={4}
              mb={2}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Sign Up
              </Button>
            </Box>

            {/* Redirect to Sign In */}
            <Box
              textAlign="center"
              mt={3}
            >
              <Typography variant="body2">
                Already have an account?{" "}
                <Link
                  to="/authentication/sign-in"
                  style={{
                    textDecoration: "none",
                    color: "#007bff",
                    fontWeight: "bold"
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

export default SignUp;

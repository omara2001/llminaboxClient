import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SignIn() {
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
              Sign In to Your Account
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Enter your email and password to sign in.
            </Typography>
          </Box>

          {/* Form Fields */}
          <Box
            component="form"
            role="form"
          >
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

            {/* Remember Me */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                display="flex"
                alignItems="center"
              >
                <Checkbox color="primary" />
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  Remember me
                </Typography>
              </Box>
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
                Sign In
              </Button>
            </Box>

            {/* Redirect to Sign Up */}
            <Box
              textAlign="center"
              mt={3}
            >
              <Typography variant="body2">
                Don&apos;t have an account?{" "}
                <Link
                  to="/authentication/sign-up"
                  style={{
                    textDecoration: "none",
                    color: "#007bff",
                    fontWeight: "bold"
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

export default SignIn;

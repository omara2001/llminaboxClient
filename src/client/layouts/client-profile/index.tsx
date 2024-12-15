import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Paper,
  Button
} from "@mui/material";

export default function Profile() {
  // State for profile information
  const [name, setName] = useState("Jane Doe");
  const [companyName, setCompanyName] = useState("ChatBot Corp");
  const [email, setEmail] = useState("janedoe@chatbotcorp.com");
  const [phone, setPhone] = useState("+123456789");
  const [industry, setIndustry] = useState("Customer Service");
  const [numAssistants] = useState(5);
  const [avatar, setAvatar] = useState("https://via.placeholder.com/80");
  const [open, setOpen] = useState(false);

  // Helper function to calculate profile completion
  function calculateProfileCompletion() {
    const fields = [name, companyName, email, phone, industry];
    const completedFields = fields.filter((field) => field !== "").length;
    return (completedFields / fields.length) * 100;
  }

  const profileCompletion = calculateProfileCompletion();

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
  };

  return (
    <>
      <Box p={3}>
        <Grid
          container
          spacing={3}
        >
          {/* Left Column - Profile Summary */}
          <Grid
            item
            xs={12}
            md={4}
          >
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  textAlign="center"
                >
                  <Avatar
                    alt={name}
                    src={avatar}
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                  >
                    {name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    {companyName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    {email}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    {phone}
                  </Typography>
                  <Button
                    color="primary"
                    onClick={handleEditProfile}
                    sx={{ mt: 2 }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Additional Info */}
          <Grid
            item
            xs={12}
            md={8}
          >
            <Paper
              elevation={3}
              sx={{ p: 3, mb: 3 }}
            >
              <Typography
                variant="h6"
                gutterBottom
              >
                Profile Completion
              </Typography>
              <LinearProgress
                variant="determinate"
                value={profileCompletion}
                sx={{ mb: 2 }}
              />
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {profileCompletion}% completed
              </Typography>
            </Paper>

            <Paper
              elevation={3}
              sx={{ p: 3, mb: 3 }}
            >
              <Typography
                variant="h6"
                gutterBottom
              >
                Business Information
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                Industry: {industry}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                Number of Assistants Created: {numAssistants}
              </Typography>
              <Button
                color="primary"
                onClick={() => alert("Manage Assistants Feature Coming Soon!")}
                sx={{ mt: 2 }}
              >
                Manage Assistants
              </Button>
            </Paper>

            <Paper
              elevation={3}
              sx={{ p: 3 }}
            >
              <Typography
                variant="h6"
                gutterBottom
              >
                Subscription & Plan Details
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                Current Plan: Premium
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                Next Billing Date: November 10, 2024
              </Typography>
              <Button
                color="success"
                onClick={() => alert("Upgrade Plan Feature Coming Soon!")}
                sx={{ mt: 2 }}
              >
                Upgrade Plan
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Edit Profile Dialog */}
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <Box
              mb={2}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap={4}
            >
              <Avatar
                alt={name}
                src={avatar}
                sx={{ width: 100, height: 100 }}
              />
              <Button
                component="label"
                color="primary"
                variant="contained"
              >
                Upload Avatar
                <input
                  accept="image/*"
                  type="file"
                  hidden
                  onChange={handleAvatarUpload}
                />
              </Button>
            </Box>

            <Box mb={2}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              color="success"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
import React from "react";

import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import FaceIcon from "@mui/icons-material/Face";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CodeIcon from "@mui/icons-material/Code";
import SdCardOutlinedIcon from '@mui/icons-material/SdCardOutlined';
import PsychologyIcon from "@mui/icons-material/Psychology";
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import ErrorIcon from "@mui/icons-material/Error";

import Dashboard from "@/client/layouts/client-dashboard";
import Pricing from "@/client/layouts/client-pricing";
import Profile from "@/client/layouts/client-profile";
import SignIn from "@/client/layouts/auth-signin";
import SignUp from "@/client/layouts/auth-signup";
import Logout from "@/client/layouts/auth-logout";

import AIBrain from "@/client/layouts/ai-brain";
import CreateAI from "@/client/layouts/ai-create";
import AICapabilities from "@/client/layouts/ai-capabilities";
import AIVoice from "@/client/layouts/ai-voice";
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import AIFace from "@/client/layouts/ai-face";
import AILayout from "@/client/layouts/ai-layout";
import AIDemos from "@/client/layouts/ai-demo";
import AICodeSnippets from "@/client/layouts/ai-code-snippet";
import AIMemory from "@/client/layouts/ai-memory";

export interface RouteType {
  name: string;
  route: string;
  component: JSX.Element;
  icon: JSX.Element;
  sidebar?: boolean;
  showSidebar?: boolean; // Add this optional property
}

export const routes: RouteType[] = [
  {
    name: "Root",
    route: "/",
    component: <Dashboard />,
    icon: <HomeIcon fontSize="small" />,
    sidebar: false
  },
  {
    name: "Dashboard",
    route: "/dashboard",
    component: <Dashboard />,
    icon: <DashboardIcon fontSize="small" />,
    sidebar: false,
    showSidebar:true,
  },
  {
    name: "Profile",
    route: "/profile",
    component: <Profile />,
    icon: <PersonIcon fontSize="small" />,
    sidebar: false
  },
  {
    name: "Pricing",
    route: "/pricing",
    component: <Pricing />,
    icon: <ReceiptLongIcon fontSize="small" />,
    sidebar: false,
    showSidebar:false,

  },
  {
    name: "Sign Up",
    route: "/auth/sign-up",
    component: <SignUp />,
    icon: <AssignmentIcon fontSize="small" />,
    sidebar: false
  },
  {
    name: "Sign In",
    route: "/auth/sign-in",
    component: <SignIn />,
    icon: <LoginIcon fontSize="small" />,
    sidebar: false
  },
  {
    name: "Logout",
    route: "/auth/logout",
    component: <Logout />,
    icon: <ExitToAppIcon fontSize="small" />,
    sidebar: false
  },
  {
    name: "Create AI Assistant",
    route: "/ai-create",
    component: <CreateAI />,
    icon: <AddCircleOutlineRoundedIcon fontSize="small" />,
    sidebar: true
  },
  {
    name: "AI Agents",
    route: "/",
    component: <AIBrain />,
    icon: <WorkspacesOutlinedIcon fontSize="medium" />,
    sidebar: true
  },
  {
    name: "AI Capabilities",
    route: "/ai-capabilities",
    component: <AICapabilities />,
    icon: <PsychologyIcon fontSize="small" />,
    sidebar: true
  },
  {
    name: "AI Face",
    route: "/ai-face",
    component: <AIFace />,
    icon: <FaceIcon fontSize="small" />,
    sidebar: true
  },
  {
    name: "AI Voice",
    route: "/ai-voice",
    component: <AIVoice />,
    icon: <KeyboardVoiceOutlinedIcon fontSize="small" />,
    sidebar: true,
    showSidebar:true,
  },
  {
    name: "AI Layout",
    route: "/ai-layout",
    component: <AILayout />,
    icon: <DashboardOutlinedIcon fontSize="small" />,
    sidebar: true
  },
  {
    name: "AI Demos",
    route: "/ai-demos",
    component: <AIDemos />,
    icon: <PlayCircleOutlineIcon fontSize="small" />,
    sidebar: true
  },
  {
    name: "AI Code Snippets",
    route: "/ai-code-snippets",
    component: <AICodeSnippets />,
    icon: <CodeIcon fontSize="small" />,
    sidebar: true
  },
  {
    name: "AI Memory",
    route: "/ai-memory",
    component: <AIMemory />,
    icon: <SdCardOutlinedIcon fontSize="small" />,
    sidebar: true
  },
  {
    name: "AI Brain",
    route: "/ai-brain",
    component: <AIBrain />,
    icon: <ShowerOutlinedIcon fontSize="medium" />,
    sidebar: true
  },
  {
    name: "Email Management",
    route: "/",
    component: <AIBrain />,
    icon: <EmailOutlinedIcon fontSize="medium" />,
    sidebar: true
  },
  {
    name: "Created AI Assistants",
    route: "/",
    component: <AIBrain />,
    icon: <SmartToyOutlinedIcon fontSize="medium" />,
    sidebar: true
  },
  {
    name: "Wildcard",
    route: "*",
    component: <Dashboard />,
    icon: <ErrorIcon fontSize="small" />,
    sidebar: false
  }
];

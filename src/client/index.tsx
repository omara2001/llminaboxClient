import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContextProvider } from "@/client/context";
import App from "@/client/App";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <AppContextProvider>
      <Router>
        <App />
      </Router>
    </AppContextProvider>
  );
}

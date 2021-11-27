import React from "react";
import { AppFooter } from "./components/AppFooter";
import { AppHeader } from "./components/AppHeader";
import { LoginSignup } from "./pages/LoginSignup";

export function App() {
  return (
    <div className="app main-layout">
      <AppHeader />
      <LoginSignup />
      <AppFooter />
    </div>
  );
}

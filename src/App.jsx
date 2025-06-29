import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import PageGameLevel from "./pages/PageGameLevel";
import PageLevelSelection from "./pages/PageLevelSelection";
import PageBonusLevelsList from "./pages/PageBonusLevelsList";
import PageBonusLevel from "./pages/PageBonusLevel";
import PageCommunityLevelsList from "./pages/PageCommunityLevelsList";
import PageCommunityLevel from "./pages/PageCommunityLevel";
import PageLevelBuilder from "./pages/PageLevelBuilder";
import PageProfile from "./pages/PageProfile";
import PageNotFound from "./pages/PageNotFound";
import ThemeSwitcher from "./components/ThemeSwitcher";
import UserIdentificationDialog from "./components/UserIdentificationDialog";
import { hasUserProfile } from "./utils/localStorage";
import "./App.css";
import "./i18n";

const App = () => {
  const [showUserIdentificationDialog, setShowUserIdentificationDialog] = useState(false);

  useEffect(() => {
    // Check if user profile exists, if not show the dialog
    if (!hasUserProfile()) {
      setShowUserIdentificationDialog(true);
    }
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Router>
          <Routes>
            <Route path="/" element={<PageLevelSelection />} />
            <Route path="/level/:id" element={<PageGameLevel />} />
            <Route path="/bonus-levels" element={<PageBonusLevelsList />} />
            <Route path="/bonus-level/:id" element={<PageBonusLevel />} />
            <Route
              path="/community-levels"
              element={<PageCommunityLevelsList />}
            />
            <Route
              path="/community-level/:id"
              element={<PageCommunityLevel />}
            />
            <Route path="/level-builder" element={<PageLevelBuilder />} />
            <Route path="/profile" element={<PageProfile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <ThemeSwitcher />
        <UserIdentificationDialog 
          open={showUserIdentificationDialog} 
          onOpenChange={setShowUserIdentificationDialog} 
        />
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
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
import PageSettings from "./pages/PageSettings";
import PageNotificationTest from "./pages/PageNotificationTest";
import PageNotFound from "./pages/PageNotFound";
import InstallBanner from "./components/InstallBanner";
import UserIdentificationDialog from "./components/UserIdentificationDialog";
import { hasUserProfile } from "./utils/localStorage";
import { initializeStreakData } from "./utils/streak";
import { initializeNotifications } from "./utils/notifications";
import "./App.css";
import "./i18n";

const App = () => {
  const [showUserIdentificationDialog, setShowUserIdentificationDialog] = useState(false);

  useEffect(() => {
    // Check if user profile exists, if not show the dialog
    if (!hasUserProfile()) {
      setShowUserIdentificationDialog(true);
    }

    // Initialize streak data (with historical calculation if needed) and notifications
    const initializeApp = async () => {
      try {
        const streakData = await initializeStreakData();
        if (streakData.notificationsEnabled) {
          initializeNotifications(true);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        // Fall back to regular streak initialization if historical calculation fails
        const { getStreakData } = await import("./utils/streak");
        const fallbackStreakData = getStreakData();
        if (fallbackStreakData.notificationsEnabled) {
          initializeNotifications(true);
        }
      }
    };

    initializeApp();
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
            <Route path="/settings" element={<PageSettings />} />
            {/* Test notifications page - development only */}
            {import.meta.env.DEV && (
              <Route path="/test-notifications" element={<PageNotificationTest />} />
            )}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <InstallBanner />
        <UserIdentificationDialog 
          open={showUserIdentificationDialog} 
          onOpenChange={setShowUserIdentificationDialog} 
        />
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
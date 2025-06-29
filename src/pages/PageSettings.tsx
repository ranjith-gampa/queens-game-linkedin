import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import RootLayout from "@/layouts/RootLayout";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { resetCompletedLevels } from "@/utils/localStorage";
import { useState } from "react";

const PageSettings = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetProgress = () => {
    if (showResetConfirm) {
      resetCompletedLevels();
      setShowResetConfirm(false);
      // Optionally show a success message
      alert(t("PROGRESS_RESET_SUCCESS") || "Progress has been reset successfully!");
    } else {
      setShowResetConfirm(true);
    }
  };

  const themeOptions = [
    { name: "light", icon: Sun, label: t("THEME.LIGHT") },
    { name: "dark", icon: Moon, label: t("THEME.DARK") },
  ];

  return (
    <RootLayout>
      <PageTitle title={t("SETTINGS")} />
      <div className="container mx-auto max-w-2xl p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">{t("SETTINGS")}</h1>
        
        <div className="space-y-8">
          {/* Theme Settings */}
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">{t("THEME.TITLE") || "Theme"}</h2>
            <p className="text-muted-foreground mb-4">
              {t("THEME.DESCRIPTION") || "Choose your preferred theme for the application"}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {themeOptions.map(({ name, icon: Icon, label }) => (
                <button
                  key={name}
                  onClick={() => setTheme(name)}
                  className={`flex items-center justify-center p-4 rounded-lg border-2 transition-colors ${
                    theme === name
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <Icon size={24} className="mr-3" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Progress Reset */}
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">{t("RESET_PROGRESS") || "Reset Progress"}</h2>
            <p className="text-muted-foreground mb-4">
              {t("RESET_PROGRESS_DESCRIPTION") || "This will reset all your completed levels and progress. This action cannot be undone."}
            </p>
            <Button
              onClick={handleResetProgress}
              variant={showResetConfirm ? "destructive" : "outline"}
              className="w-full sm:w-auto"
            >
              {showResetConfirm 
                ? t("CONFIRM_RESET") || "Click again to confirm reset"
                : t("RESET_ALL_PROGRESS") || "Reset All Progress"
              }
            </Button>
            {showResetConfirm && (
              <Button
                onClick={() => setShowResetConfirm(false)}
                variant="ghost"
                className="ml-2"
              >
                {t("CANCEL")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default PageSettings;

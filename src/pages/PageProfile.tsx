import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getUserProfile, setUserProfile } from "@/utils/localStorage";
import { Button } from "@/components/ui/button";
import RootLayout from "@/layouts/RootLayout";
import { UserProfile } from "@/utils/types";
import { insertOrUpdateUser } from "@/utils/database";
import { isMobile, isMac } from "@/utils/platform";

const AVATARS = [
  "👩", "👨", "👱‍♀️", "👱", "👩‍🦰", "👨‍🦰", "👩‍🦱", "👨‍🦱", 
  "👩‍🦳", "👨‍🦳", "👩‍🦲", "👨‍🦲", "🧔", "👵", "👴", "👲",
  "🧑", "👶", "🧒", "🧓", "🧑‍🦰", "🧑‍🦱", "🧑‍🦳", "🧑‍🦲"
];

const PageProfile = () => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const userProfile = getUserProfile();
    if (userProfile) {
      setProfile(userProfile);
      setUsername(userProfile.username);
      setAvatar(userProfile.avatar);
    }
  }, []);

  const handleSave = async () => {
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    setIsSaving(true);
    const updatedProfile: UserProfile = {
      userId: profile?.userId || "",
      username: username.trim(),
      avatar: avatar
    };

    try {
      // Update the user in the database
      await insertOrUpdateUser(
        updatedProfile.userId,
        updatedProfile.username,
        updatedProfile.avatar
      );
      
      // Update local storage
      setUserProfile(updatedProfile);
      setProfile(updatedProfile);
      setError("");
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(t("Failed to update profile. Please try again."));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <RootLayout>
      <div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">{t("Profile")}</h1>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              {t("Username")}
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (e.target.value.trim()) setError("");
              }}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder={t("Enter your username")}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t("Choose an Avatar")}
            </label>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-muted text-4xl">
                  {avatar}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value || "👤")}
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-2xl"
                    placeholder="😀"
                    onFocus={(e) => {
                      e.target.select();
                      if (!isMobile() && isMac()) {
                        // Show mac emoji picker shortcut hint
                        e.target.blur();
                        e.target.focus();
                      }
                    }}
                    onClick={() => {
                      if (!isMobile() && !isMac()) {
                        // For Windows, use Windows + . shortcut
                        window.alert(t("Press Windows + . to open emoji picker"));
                      }
                    }}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {isMobile() 
                      ? t("Tap to use emoji keyboard")
                      : isMac()
                        ? t("Press Cmd + Ctrl + Space for emoji picker")
                        : t("Press Windows + . for emoji picker")
                    }
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium">
                  {t("Or choose from preset avatars")}
                </label>
                <div className="mt-2 grid grid-cols-6 gap-2 p-2 border rounded-lg max-h-48 overflow-y-auto">
                  {AVATARS.map((avatarOption, index) => (
                    <button
                      key={index}
                      onClick={() => setAvatar(avatarOption)}
                      className={`flex items-center justify-center h-10 w-10 rounded-full text-2xl transition-all hover:bg-muted/80 ${
                        avatar === avatarOption ? 'bg-muted ring-2 ring-primary' : 'hover:scale-110'
                      }`}
                    >
                      {avatarOption}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleSave} 
            className="w-full" 
            disabled={isSaving}
          >
            {isSaving ? t("Saving...") : t("Save Changes")}
          </Button>
        </div>
      </div>
    </RootLayout>
  );
};

export default PageProfile;
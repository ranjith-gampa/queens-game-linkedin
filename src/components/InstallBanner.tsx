import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { isMobile, isMac } from "@/utils/platform";

const INSTALL_BANNER_DISMISSED_KEY = "installBannerDismissedAt";
const DISMISS_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const InstallBanner = () => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Check if already installed as PWA
    const isPWA = window.matchMedia('(display-mode: standalone)').matches;
    if (isPWA) return;

    // Check if running in a browser that potentially supports PWA
    const isChrome = /chrome/i.test(navigator.userAgent) && !(/edg/i.test(navigator.userAgent));
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    const isSupported = isMobile() || 
                       (isMac() && isSafari) || // Safari on macOS
                       isChrome; // Chrome on any desktop platform
    if (!isSupported) return;
    
    // Check if the banner should be shown based on last dismissal time
    const lastDismissedAt = localStorage.getItem(INSTALL_BANNER_DISMISSED_KEY);
    if (lastDismissedAt) {
      const timeSinceDismissal = Date.now() - parseInt(lastDismissedAt);
      if (timeSinceDismissal < DISMISS_DURATION) {
        return;
      }
    }

    // Show banner for Safari on macOS (doesn't fire beforeinstallprompt)
    if (isMac() && isSafari) {
      setShowBanner(true);
      return;
    }

    // Listen for beforeinstallprompt event for Chrome and other supported browsers
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Store the event for later use
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  const handleInstall = async () => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isChrome = /chrome/i.test(navigator.userAgent) && !(/edg/i.test(navigator.userAgent));

    // For Safari on macOS, show instructions since we can't programmatically trigger install
    if (isMac() && isSafari) {
      alert(t("INSTALL_APP_SAFARI_MAC_INSTRUCTIONS"));
      handleDismiss();
      return;
    }

    // For Chrome without an install prompt (might be because user dismissed it before)
    if (isChrome && !deferredPrompt) {
      alert(t("INSTALL_APP_CHROME_INSTRUCTIONS"));
      handleDismiss();
      return;
    }

    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowBanner(false);
        setDeferredPrompt(null);
      }
    } catch (error) {
      console.error('Error installing app:', error);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem(INSTALL_BANNER_DISMISSED_KEY, Date.now().toString());
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-primary text-primary-foreground shadow-lg transition-opacity duration-300">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium">{t("INSTALL_APP_PROMPT")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleInstall} variant="secondary" size="sm">
            {t("INSTALL_APP")}
          </Button>
          <Button onClick={handleDismiss} variant="ghost" size="sm" className="text-primary-foreground">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstallBanner;

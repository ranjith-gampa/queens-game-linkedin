import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface RetryCooldownDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timeLeft: number;
  onTimerComplete?: () => void;
}

const RetryCooldownDialog = ({
  open,
  onOpenChange,
  timeLeft,
  onTimerComplete,
}: RetryCooldownDialogProps) => {
  const { t } = useTranslation();
  const [startTime, setStartTime] = useState(Date.now());
  const [remainingTime, setRemainingTime] = useState(timeLeft);

  // Reset start time and remaining time when dialog opens
  useEffect(() => {
    if (open) {
      setStartTime(Date.now());
      setRemainingTime(timeLeft);
    }
  }, [open, timeLeft]);

  useEffect(() => {
    if (open && remainingTime > 0) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = Math.max(0, timeLeft - elapsed);
        setRemainingTime(remaining);
        
        // Auto close when timer reaches 0
        if (remaining === 0) {
          onOpenChange(false);
          onTimerComplete?.();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [open, timeLeft, startTime, onOpenChange]);

  return (
    <Dialog 
      open={open} 
      onOpenChange={remainingTime > 0 ? () => {} : onOpenChange}
    >
      <DialogContent 
        className="sm:max-w-[425px] bg-background" 
        onEscapeKeyDown={(e) => remainingTime > 0 && e.preventDefault()} 
        onPointerDownOutside={(e) => remainingTime > 0 && e.preventDefault()}
        hideClose={remainingTime > 0}
      >
        <DialogHeader>
          <DialogTitle className="mb-2">{t("RETRY_COOLDOWN")}</DialogTitle>
          <DialogDescription>
            {t("RETRY_COOLDOWN_DESCRIPTION")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center py-4">
          <div className="text-2xl font-bold">
            {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
          </div>
        </div>
        <div className="flex justify-center">
          <Link to="/" className="flex w-full">
            <button
              onClick={() => onOpenChange(false)}
              className="min-w-36 rounded border px-3 py-1 w-full border-slate-500 text-xl"
            >
              {t("HOME")}
            </button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RetryCooldownDialog;

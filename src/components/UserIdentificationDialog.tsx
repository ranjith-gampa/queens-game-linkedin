import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { 
  Dialog,
  DialogContent, 
  DialogHeader,
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "./ui/dialog";
import { Button } from "./ui/button";
import { setUserProfile } from "../utils/localStorage";
import { UserProfile } from "../utils/types";

// Array of avatar options (simple emoji faces)
const AVATARS = [
  "👩", "👨", "👱‍♀️", "👱", "👩‍🦰", "👨‍🦰", "👩‍🦱", "👨‍🦱", 
  "👩‍🦳", "👨‍🦳", "👩‍🦲", "👨‍🦲", "🧔", "👵", "👴", "👲",
  "👳‍♀️", "👳", "🧕", "👮‍♀️", "👮", "👷‍♀️", "👷", "💂‍♀️",
  "💂", "🕵️‍♀️", "🕵️", "👩‍⚕️", "👨‍⚕️", "👩‍🌾", "👨‍🌾", "👩‍🍳"
];

interface UserIdentificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserIdentificationDialog = ({
  open,
  onOpenChange
}: UserIdentificationDialogProps) => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [error, setError] = useState("");

  // Generate a random avatar when component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * AVATARS.length);
    setAvatar(AVATARS[randomIndex]);
  }, []);

  const handleRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * AVATARS.length);
    setAvatar(AVATARS[randomIndex]);
  };

  const handleSave = () => {
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    const userProfile: UserProfile = {
      userId: uuidv4(), // Generate a random UUID for the user
      username: username.trim(),
      avatar: avatar
    };

    setUserProfile(userProfile);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to Queens Game!</DialogTitle>
          <DialogDescription>
            Please create a profile to track your game progress and completion times.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
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
              placeholder="Enter your username"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Choose an Avatar
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-muted text-4xl">
                {avatar}
              </div>
              <Button onClick={handleRandomAvatar} variant="secondary">
                Get Random Avatar
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>
            Save Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserIdentificationDialog;
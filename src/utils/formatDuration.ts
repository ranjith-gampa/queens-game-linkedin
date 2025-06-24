import { intervalToDuration } from "date-fns";

/**
 * Formats seconds into a human-readable duration string
 * Exported both as default and named export for backward compatibility
 */
const formatDuration = (seconds: number) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  const zeroPad = (num: number) => String(num).padStart(2, "0");

  if (duration.days) {
    return "> 1 day";
  }

  if (duration.hours) {
    return `${duration.hours}:${zeroPad(duration.minutes || 0)}:${zeroPad(
      duration.seconds || 0
    )}`;
  } else {
    return `${duration.minutes || 0}:${zeroPad(duration.seconds || 0)}`;
  }
};

// Make available as both default export and named export for compatibility
export { formatDuration };
export default formatDuration;
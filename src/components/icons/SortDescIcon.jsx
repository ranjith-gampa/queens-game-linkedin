import React from "react";

const SortDescIcon = ({ size = "24" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 6V16.175L7.4 12.575L6 14L12 20L18 14L16.6 12.575L13 16.175V6H11Z" />
    </svg>
  );
};

export default SortDescIcon;

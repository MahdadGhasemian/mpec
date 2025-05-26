
import React from "react";
import clsx from "clsx";
import { LoadingSpinnerProps } from "@/lib/store/types";

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  message,
  visible = true,
}) => {
  if (!visible) return null;

  const sizeClasses = {
    small: "h-4 w-4 border-2",
    medium: "h-8 w-8 border-4",
    large: "h-12 w-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <div
        className={clsx(
          "animate-spin rounded-full border-blue-500 border-t-transparent",
          sizeClasses[size]
        )}
      />
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );
};

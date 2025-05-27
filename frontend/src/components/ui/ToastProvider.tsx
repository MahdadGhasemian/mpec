import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: "z-50",
        style: {
          background: "var(--surface)",
          color: "var(--foreground)",
          borderRadius: "0.5rem",
          padding: "1rem",
        },
        success: {
          className: "bg-green-500/10 dark:bg-green-500/20",
          style: {
            color: "#10b981",
          },
        },
        error: {
          className: "bg-red-500/10 dark:bg-red-500/20",
          style: {
            color: "#ef4444",
          },
        },
      }}
    />
  );
}

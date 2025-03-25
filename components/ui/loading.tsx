import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  size = "md",
  text,
  className,
  fullScreen = false,
}: LoadingSpinnerProps) {
  // Size mappings for the spinner
  const spinnerSize = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  // Size mappings for text
  const textSize = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  const spinner = (
    <div
      className={cn(
        "border-t-2 border-b-2 border-rose-600 rounded-full animate-spin",
        spinnerSize[size]
      )}
    />
  );

  // Just the spinner if no text is provided and not fullScreen
  if (!text && !fullScreen) {
    return <div className={cn("flex items-center justify-center", className)}>{spinner}</div>;
  }

  // Spinner with text in a container
  const content = (
    <div className="flex flex-col items-center space-y-4">
      {spinner}
      {text && <div className={cn(`font-medium text-earth-800`, textSize[size])}>{text}</div>}
    </div>
  );

  // Full screen version with gradient background
  if (fullScreen) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
        {content}
      </div>
    );
  }

  // Container version
  return <div className={cn("flex items-center justify-center", className)}>{content}</div>;
}

// Specialized loading screens for common use cases
export function FullPageLoading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
      <div className="flex flex-col items-center space-y-4">
        <div className="border-t-2 border-b-2 border-rose-600 rounded-full animate-spin h-12 w-12" />
        {text && <div className="font-medium text-earth-800 text-2xl">{text}</div>}
      </div>
    </div>
  );
}

export function LoadingOverlay({
  text = "Please wait",
  title = "Loading...",
}: {
  text?: string;
  title?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center">
        <div className="w-16 h-16 mb-4 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-t-rose-600 border-earth-200 rounded-full animate-spin"></div>
        </div>
        <h3 className="text-xl font-medium text-earth-800">{title}</h3>
        <p className="text-sm text-earth-600 mt-2">{text}</p>
      </div>
    </div>
  );
}

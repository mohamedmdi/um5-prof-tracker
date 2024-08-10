import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  classNameParent?: string;
  type?: string;
  click?: () => void;
  show?: boolean;
  icon?: React.ReactNode;
}

const InputButton = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, classNameParent, type, show, click, icon, ...props }, ref) => {
    return (
      <div className={cn(classNameParent, "relative")}>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {show && (
          <button
            onClick={click}
            className="absolute inset-y-0 right-2 flex items-center"
          >
            {icon}
          </button>
        )}
      </div>
    );
  }
);
InputButton.displayName = "InputButton";

export { InputButton };

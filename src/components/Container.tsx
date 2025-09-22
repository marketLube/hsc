import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function Container({ 
  children, 
  className, 
  as: Component = "div" 
}: ContainerProps) {
  return (
    <Component 
      className={cn(
        "mx-auto max-w-[1200px] px-4 md:px-6",
        className
      )}
    >
      {children}
    </Component>
  );
}

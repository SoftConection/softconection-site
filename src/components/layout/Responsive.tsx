/**
 * Componente Container Responsivo
 * Garante consistência de espaçamento e layout em todos os breakpoints
 */

import React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  fullHeight = false,
}) => {
  return (
    <div
      className={cn(
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        fullHeight && "min-h-screen",
        className
      )}
    >
      {children}
    </div>
  );
};

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className, id }) => {
  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-20 lg:py-28",
        className
      )}
    >
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </section>
  );
};

interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const ResponsiveGrid: React.FC<GridProps> = ({
  children,
  cols = 3,
  gap = "md",
  className,
}) => {
  const colsMap = {
    1: "grid-cols-1",
    2: "md:grid-cols-2 lg:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  const gapMap = {
    sm: "gap-3 md:gap-4",
    md: "gap-4 md:gap-6",
    lg: "gap-6 md:gap-8",
    xl: "gap-8 md:gap-12",
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1",
        colsMap[cols],
        gapMap[gap],
        className
      )}
    >
      {children}
    </div>
  );
};

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col";
  alignItems?: "start" | "center" | "end" | "stretch";
  justifyContent?: "start" | "center" | "between" | "around" | "evenly";
  gap?: "sm" | "md" | "lg" | "xl";
  responsive?: boolean;
}

export const Flex: React.FC<FlexProps> = ({
  direction = "row",
  alignItems = "center",
  justifyContent = "start",
  gap = "md",
  responsive = false,
  className,
  children,
  ...props
}) => {
  const directionMap = {
    row: responsive ? "flex-col md:flex-row" : "flex-row",
    col: "flex-col",
  };

  const alignMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  const justifyMap = {
    start: "justify-start",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const gapMap = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  };

  return (
    <div
      className={cn(
        "flex",
        directionMap[direction],
        alignMap[alignItems],
        justifyMap[justifyContent],
        gapMap[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

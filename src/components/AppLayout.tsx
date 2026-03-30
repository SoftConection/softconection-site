import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, title }) => {
  return (
    <DashboardLayout title={title} showTechBackground>
      {children}
    </DashboardLayout>
  );
};

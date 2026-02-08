import React from "react";
import { Sidebar, Header, MainLayout } from "@/components/layout";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Header />
      <MainLayout>{children}</MainLayout>
    </>
  );
};

import { SidebarWrapper } from "@/components/paidtool/component/Sidebar";
import React from "react";

export default function idToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}

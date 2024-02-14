"use client";
import React, { useState } from "react";

import { AlertCircle, ChevronRight, LayoutDashboard, User } from "lucide-react";



import { Nav } from "@/components/ui/nav";
import { Button } from "@/components/ui/button";
import useWindowWidth from "@/lib/window-width";

interface Props {}

const SideNavbar = ({}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button 
            variant={"secondary"} 
            className="rounded-full p-2"
            onClick={toggleSidebar}
            >
              <ChevronRight />
            </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Teams",
            href: "/teams",
            icon: User,
            variant: "ghost",
          },
          {
            title: "Sent",
            href: "/x",
            icon: AlertCircle,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
};

export default SideNavbar;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Bell } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-200 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white">
            <Sidebar close={() => setOpen(false)} />
          </div>

          <div
            className="flex-1 bg-black/50"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      {/* Main Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar toggle={() => setOpen(true)} />

        {/* Header */}
        <div className="hidden bg-white px-4 py-4 border-b md:flex justify-between items-center">
          <div>
            <h3 className="text-[16px] font-semibold">Good Afternoon Asif</h3>
            <p className="text-[14px]">13 June, 2026</p>
          </div>

          <div className="flex gap-4 items-center">
            <Bell />
            <h3>|</h3>

            <div>
              <h3 className="font-semibold">Asif Riaj</h3>
              <p className="text-end text-sm">HR</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="/mel-user.png" alt="shadcn" />
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheckIcon />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCardIcon />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BellIcon />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOutIcon />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full p-4 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

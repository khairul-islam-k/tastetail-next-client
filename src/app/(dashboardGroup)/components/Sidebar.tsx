"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Users,
  Calendar,
  Plane,
  CreditCard,
  Settings,
  Heart,
  Ticket,
  Handshake,
  LifeBuoy,   // 🆕 For user support
  Headphones, // 🆕 For admin support management
  MessageCircle,
  PlaneIcon,

} from "lucide-react";

interface TSidebarProps {
  close?: () => void;
}

export default function Sidebar({ close } : TSidebarProps) {

  const menuItems = [
  // Admin & Moderator
  {
    name: "Dashboard",
    icon: Home,
    href: "/dashboard/admin",
    roles: ["admin", "moderator"],
  },
  {
    name: "All Tours",
    icon: PlaneIcon,
    href: "/dashboard/admin/all",
    roles: ["admin", "moderator"],
  },
  {
    name: "Bookings",
    icon: Calendar,
    href: "/dashboard/moderator/bookings",
    roles: ["admin", "moderator"],
  },
  {
    name: "Payments",
    icon: CreditCard,
    href: "/dashboard/payments",
    roles: ["admin", "moderator"],
  },

  // Admin Only
  {
    name: "Add Tour",
    icon: Plane,
    href: "/dashboard/admin/add/tours",
    roles: ["admin"],
  },
  {
    name: "Discounts",
    icon: Ticket,
    href: "/dashboard/admin/discounts",
    roles: ["admin"],
  },
  {
    name: "Users Management",
    icon: Users,
    href: "/dashboard/admin/users",
    roles: ["admin"],
  },
  {
    name: "My Bookings",
    icon: Calendar,
    href: "/dashboard/user/bookings",
    roles: ["admin", "moderator", "user"],
  },
  {
    name: "Profile",
    icon: Users,
    href: "/dashboard/user/profile",
    roles: ["admin", "moderator", "user"],
  },
  {
    name: "Wishlist",
    icon: Heart,
    href: "/dashboard/user/wishlist",
    roles: ["admin", "moderator", "user"],
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    roles: ["admin", "moderator", "user"],
  },
  {
    name: "Communication",
    icon: MessageCircle,
    href: "/dashboard/user/communication",
    roles: ["admin", "moderator", "user"],
  },

  // 🆕 Admin Support Management
  { name: "Support Management", icon: Headphones, href: "/dashboard/admin/support", roles: ["admin", "moderator", "user"] },

  // ✅ User Features
  { name: "Travel Buddy", icon: Handshake, href: "/dashboard/user/travel-buddy", roles: ["admin", "moderator", "user"] },

  // 🆕 Add Support for all roles
  { name: "Support", icon: LifeBuoy, href: "/dashboard/support", roles: ["admin", "moderator", "user"] }
];

const filteredMenu = menuItems.filter((item) =>
    item.roles.includes("admin")
  );

  return (
    <div className="h-full w-64 bg-white shadow px-4 pb-4 overflow-auto">
      <div className="h-20 flex justify-center items-center">
        <h3 className="text-2xl font-bold">Taste<span className="text-amber-500">Trail</span></h3>
      </div>

      <nav className="space-y-2">
        {filteredMenu.map((item) => {
          const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={close}
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          }


        )}
      </nav>
    </div>
  );
}

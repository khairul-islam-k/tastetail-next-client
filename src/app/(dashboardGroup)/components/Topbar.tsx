import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TSidebarProps {
  toggle?: () => void;
}

export default function Topbar({ toggle }: TSidebarProps) {
  return (
    <div className="bg-white shadow flex justify-between items-center py-2 px-4 md:hidden">
      <div>
        <h3 className="text-[16px] font-medium">Good Afternoon Asif</h3>
        <p className="text-[14px]">12 June, 2026</p>
      </div>

      <div className="flex items-center gap-2">
        <Bell />
        <h3>|</h3>
        <div>
          <h3 className="text-[16px] font-medium">Asif Riaj</h3>
          <p className="text-[14px]">Hr</p>
        </div>


        <div>
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
        {/* <Image src="/github-logo.jpeg" width={30} height={30} alt="profile" 
        className='rounded-full' /> */}
        <button onClick={toggle}>
          <Menu size={24} />
        </button>
      </div>
    </div>
  );
}

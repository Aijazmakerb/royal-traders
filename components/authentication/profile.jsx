import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu"

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

import { UserIcon, ChevronDown, Sparkles, BadgeCheck, CreditCard, Bell, LogOut } from "lucide-react"
import { useSidebar } from "../ui/sidebar"

export default function ProfileDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center border rounded-lg py-2 px-3 text-sm font-medium gap-2">
                    <UserIcon className="w-4 h-4" />
                    {"Mohd Aijaz"} {/* Display selected status */}
                    <ChevronDown className="w-4 h-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 flex justify-center rounded-lg items-center">
                            <AvatarImage src={"/avatars/shadcn.jpg"} />
                            <AvatarFallback className="rounded-lg">AJ</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{"aijaz"}</span>
                            <span className="truncate text-xs">{"aijaz@example.com"}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Sparkles />
                        Upgrade to Pro
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <BadgeCheck />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CreditCard />
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Bell />
                        Notifications
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
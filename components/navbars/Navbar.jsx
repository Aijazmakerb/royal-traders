import { DropdownMenu, DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import ProfileDropdown from "../authentication/profile";
import BrandPill from "../layout/BrandPill";
import { DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import CurrentDateTime from "../utils/dateAndTime";

export default function Navbar() {
    const [shopStatus, setShopStatus] = useState("Open")
    return (
        <header className="flex h-16 justify-between shrink-0 items-center border-b px-4">
            <div className="flex gap-3 items-center">
                <BrandPill />
                <Separator className="h-4" orientation="vertical" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center border rounded-lg py-2 px-3 text-sm font-medium gap-2">
                            {shopStatus}
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-32">
                        <DropdownMenuItem onClick={() => setShopStatus("Open")}>
                            Open
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShopStatus("Close")}>
                            Close
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex gap-3 items-center">
                <CurrentDateTime />
                <Separator orientation="vertical" className="h-4" />
                <ProfileDropdown />
            </div>

        </header>
    )
}
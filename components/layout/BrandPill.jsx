import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Container from "./container";

export default function BrandPill() {
    return (
        <Container>
            <Avatar className="w-5 h-5">
                <AvatarImage src="https://github.com/shadcn.png" alt="Royal Traders" />
                <AvatarFallback>RT</AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm">Royal Traders</span>
        </Container>
    )
}
import { SidebarProvider, SidebarInset } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import Navbar from "../navbars/Navbar";

export default function Layout(props) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Navbar />
                {props.children}
            </SidebarInset>
        </SidebarProvider>
    );
}
"use client"

import * as React from "react"
import {
    LayoutDashboard,
    Package,
    Settings,
    ShoppingCart,
    Star,
    User,
    Home,
    MessageCircle,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

// Menu items.
const items = [
    {
        title: "View Site",
        url: "/",
        icon: Home,
    },
    {
        title: "Overview",
        url: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Packages",
        url: "/admin/packages",
        icon: Package,
    },
    {
        title: "Orders",
        url: "/admin/orders",
        icon: ShoppingCart,
    },
    {
        title: "Messages",
        url: "/admin/messages",
        icon: MessageCircle,
    },
    {
        title: "Reviews",
        url: "/admin/reviews",
        icon: Star,
    },
]

export function AdminSidebar({ ...props }) {
    const [unreadCount, setUnreadCount] = React.useState(0);

    React.useEffect(() => {
        const fetchUnread = async () => {
            try {
                const response = await fetch('/api/stats');
                if (response.ok) {
                    const data = await response.json();
                    setUnreadCount(data.unreadMessages || 0);
                }
            } catch (error) {
                console.error('Error fetching unread count:', error);
            }
        };
        fetchUnread();
        const interval = setInterval(fetchUnread, 30000);
        return () => clearInterval(interval);
    }, []);
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <User className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Admin Panel</span>
                                    <span className="truncate text-xs">CanvaPro</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <a href={item.url} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </div>
                                            {item.title === 'Messages' && unreadCount > 0 && (
                                                <Badge className="bg-red-500/20 text-red-400 text-xs px-1.5 py-0.5">
                                                    {unreadCount}
                                                </Badge>
                                            )}
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Settings">
                            <a href="#">
                                <Settings />
                                <span>Settings</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

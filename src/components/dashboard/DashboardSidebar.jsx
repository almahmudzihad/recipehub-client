
import { getUserSession } from "@/lib/api/session";
import { LayoutSideContentLeft, Bell, Briefcase, Envelope, Gear, House, Magnifier, Person, Bookmark, FileText, CreditCard, Receipt,  LayoutCells, BookOpen, CirclePlus,
  Heart,
   } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Building, Users } from "lucide-react";
import Link from "next/link";

export async function DashboardSidebar() {
    const user = await getUserSession();
    console.log(user);
    

    const userNavLinks = [
        { icon: LayoutCells, href: "/dashboard/user", label: "Overview" },
        { icon: BookOpen, href: "/dashboard/user/my-recipes", label: "My Recipes " },
        { icon: CirclePlus, href: "/dashboard/user/add-recipe", label: "Add Recepe" },
        
        { icon: Heart, href: "/dashboard/user/favorites", label: "My Favorites" },
        { icon: Receipt, href: "/dashboard/user/purchased-recipes", label: "My Purchased Recipes" },
        { icon: Person, href: "/dashboard/user/profile", label: "My Profile" },
        
    ]

    const adminNavLinks = [
        { icon: House, href: "/dashboard/seeker", label: "Dashboard ff" },
        { icon: Magnifier, href: "/dashboard/seeker/jobs", label: "Jobs" },
        { icon: Bookmark, href: "/dashboard/seeker/saved-jobs", label: "Saved Jobs" },
        { icon: FileText, href: "/dashboard/seeker/applications", label: "Applications" },
        { icon: CreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ];

    const navItems = user?.role === "user" ? userNavLinks : adminNavLinks;

    


    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                href={item.href}
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
                {navContent}
            </aside>
            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContentLeft />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}

import { getUserSession } from "@/lib/api/session";
import { LayoutSideContentLeft, Bell,  Person,  FileText, CreditCard, Receipt,  LayoutCells, BookOpen, CirclePlus,
  Heart, LayoutList } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Building, Users } from "lucide-react";
import Link from "next/link";

export async function DashboardSidebar() {
    const user = await getUserSession();
    const isPremium = user?.isPremium;
    

    const userNavLinks = [
        { icon: LayoutCells, href: "/dashboard/user", label: "Overview" },
        { icon: BookOpen, href: "/dashboard/user/my-recipes", label: "My Recipes " },
        { icon: CirclePlus, href: "/dashboard/user/add-recipe", label: "Add Recepe" },
        
        { icon: Heart, href: "/dashboard/user/favorites", label: "My Favorites" },
        { icon: Receipt, href: "/dashboard/user/purchased-recipes", label: "My Purchased Recipes" },
        { icon: Person, href: "/dashboard/user/profile", label: "My Profile", premium: true },
        
    ];
    const adminNavLinks = [
        { icon: LayoutCells, href: "/dashboard/admin", label: "Overview" },
        { icon: LayoutList , href: "/dashboard/admin/users", label: "Manage Users" },
        { icon: FileText , href: "/dashboard/admin/recipes", label: "Manage Recipes" },
        { icon: Bell, href: "/dashboard/admin/reports", label: "Receipt Reports" },
        { icon: CreditCard, href: "/dashboard/admin/transactions", label: "Transactions" },
    ];

    const navItems = user?.role === "admin" ?   adminNavLinks : userNavLinks ;

    


    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
          key={item.href}
          href={item.href}
          className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-slate-800 transition"
        >
          <div className="flex items-center gap-3">
            <item.icon className="size-5 text-muted" />
            <span>{item.label}</span>
          </div>

          {/* 👑 Premium badge */}
          {item.premium && isPremium && (
            <span className="text-[10px] px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
              PRO
            </span>
          )}
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
"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { sidebarNavigation, type NavItem } from "@/lib/navigation-data"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface MobileMenuProps {
  currentPath?: string
}

export function MobileMenu({ currentPath = "" }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(["Overview"])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasChildren = item.items && item.items.length > 0
    const isActive = currentPath === item.href
    const isExpanded = expandedSections.includes(item.title)

    if (hasChildren) {
      return (
        <div key={item.title}>
          <button
            onClick={() => toggleSection(item.title)}
            className="flex items-center justify-between w-full py-2 text-left font-medium hover:text-foreground"
          >
            {item.title}
            <ChevronRight className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")} />
          </button>

          {isExpanded && (
            <div className="ml-3 mt-1 space-y-1 border-l pl-3">
              {item.items?.map((child) => renderNavItem(child, level + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={item.href}
        href={item.href || "#"}
        onClick={() => setOpen(false)}
        className={cn(
          "block py-2 transition-colors",
          isActive ? "text-primary font-medium bg-primary/5 -ml-3 pl-3" : "text-muted-foreground hover:text-foreground",
        )}
      >
        {item.title}
      </Link>
    )
  }

  return (
    <>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)}>
        <Menu className="h-5 w-5" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="border-b p-4">
            <SheetTitle>Documentation</SheetTitle>
          </SheetHeader>

          <nav className="overflow-y-auto p-4 text-sm h-[calc(100vh-80px)]">
            <div className="space-y-3">{sidebarNavigation.map((item) => renderNavItem(item))}</div>

            {/* SET UP YAGOUTPAY Section */}
            <div className="border-t mt-6 pt-6 space-y-2">
              <h3 className="text-sm font-semibold text-foreground mb-3">SET UP YAGOUTPAY</h3>
              <div className="space-y-2">
                <a
                  href="https://yagoutpay.com/merchant-portal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronRight className="h-3 w-3" />
                  Create an account
                </a>
                <a
                  href="https://dashboard.yagoutpay.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronRight className="h-3 w-3" />
                  Migrate to YagoutPay
                </a>
              </div>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}

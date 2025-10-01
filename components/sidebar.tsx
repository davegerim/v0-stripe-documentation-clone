"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { sidebarNavigation, type NavItem } from "@/lib/navigation-data";

interface SidebarProps {
  currentPath?: string;
}

export function Sidebar({ currentPath = "" }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "PAYMENT METHODS",
    "Flutter Integration",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasChildren = item.items && item.items.length > 0;
    const isActive = currentPath === item.href;
    const isExpanded = expandedSections.includes(item.title);

    if (hasChildren) {
      return (
        <div key={item.title}>
          <button
            onClick={() => toggleSection(item.title)}
            className="flex items-center justify-between w-full py-1.5 text-left font-medium hover:text-foreground"
          >
            {item.title}
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "rotate-90"
              )}
            />
          </button>

          {isExpanded && (
            <div className="ml-3 mt-1 space-y-1 border-l pl-3">
              {item.items?.map((child) => renderNavItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href || "#"}
        className={cn(
          "block py-1.5 transition-colors",
          isActive
            ? "text-primary font-medium bg-primary/5 -ml-3 pl-3"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {item.title}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "hidden md:block sticky top-[112px] h-[calc(100vh-112px)] border-r bg-background transition-all duration-300",
        isExpanded ? "w-64" : "w-12"
      )}
    >
      <div className="flex flex-col h-full">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center h-10 border-b hover:bg-muted/50"
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {isExpanded ? (
          <nav className="flex-1 overflow-y-auto p-4 text-sm">
            <div className="space-y-3">
              {sidebarNavigation.map((item) => renderNavItem(item))}
            </div>
          </nav>
        ) : (
          <nav className="flex-1 overflow-y-auto p-2 text-sm">
            <div className="space-y-2">
              {sidebarNavigation.map((item) => (
                <div
                  key={item.title}
                  className="flex justify-center group relative"
                >
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="w-8 h-8 rounded bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <span className="text-xs font-bold text-muted-foreground">
                      {item.title.charAt(0)}
                    </span>
                  </button>
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </nav>
        )}

        {isExpanded && (
          <div className="border-t p-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>🇺🇸</span>
              <span>United States</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>🌐</span>
              <span>English (United States)</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

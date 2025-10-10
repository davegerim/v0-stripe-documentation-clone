"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { sidebarNavigation, type NavItem } from "@/lib/navigation-data";

interface SidebarProps {
  currentPath?: string;
}

export function Sidebar({ currentPath = "" }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Determine which sections should be expanded based on current path
  const getInitialExpandedSections = () => {
    const sections = ["PAYMENT METHODS"];
    
    if (currentPath.startsWith("/flutter")) {
      sections.push("Flutter Integration");
    } else if (currentPath.startsWith("/react-native")) {
      sections.push("React Native Integration");
    } else if (currentPath.startsWith("/javascript")) {
      sections.push("JavaScript Integration");
    } else if (currentPath.startsWith("/laravel")) {
      sections.push("Laravel Integration");
    } else if (currentPath.startsWith("/nodejs")) {
      sections.push("Node.js Integration");
    } else if (currentPath.startsWith("/java")) {
      sections.push("Java Integration");
    } else if (currentPath.startsWith("/wordpress")) {
      sections.push("WordPress Integration");
    } else if (currentPath.startsWith("/woocommerce")) {
      sections.push("WooCommerce Integration");
    } else {
      // Default to Flutter if no specific framework is detected
      sections.push("Flutter Integration");
    }
    
    return sections;
  };
  
  const [expandedSections, setExpandedSections] = useState<string[]>(getInitialExpandedSections());

  // Update expanded sections when currentPath changes
  useEffect(() => {
    setExpandedSections(getInitialExpandedSections());
  }, [currentPath]);

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

        {/* SET UP YAGOUTPAY Section */}
        {isExpanded && (
          <div className="border-t p-4 space-y-2">
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
        )}

      </div>
    </aside>
  );
}

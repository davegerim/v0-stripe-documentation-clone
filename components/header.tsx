"use client";

import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/lib/navigation-data";
import { cn } from "@/lib/utils";
import { SearchDialog } from "@/components/search-dialog";
import { MobileMenu } from "@/components/mobile-menu";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-6 gap-3 md:gap-6">
          <MobileMenu currentPath={pathname} />

          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">YagoutPay</span>
            <span className="text-xl font-bold text-primary">DOCS</span>
          </Link>

          <div className="flex-1 flex items-center gap-2 md:gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search"
                className="pl-9 pr-12 bg-muted/50 border-border cursor-pointer text-sm md:text-base"
                onClick={() => setSearchOpen(true)}
                readOnly
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                /
              </kbd>
            </div>
          </div>

        </div>

        <nav className="border-t">
          <div className="flex items-center justify-center px-4 md:px-6 h-12 gap-2 md:gap-3 text-xs md:text-sm flex-wrap">
            {mainNavigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              
              // Check if any sub-items are active
              const hasActiveSubItem = item.items?.some(subItem => 
                pathname === subItem.href || pathname.startsWith(subItem.href + "/")
              );
              
              if (item.items) {
                // Render dropdown for items with sub-items
                return (
                  <DropdownMenu key={item.title}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "pb-3 pt-3 transition-colors whitespace-nowrap px-2 flex items-center gap-1 hover:bg-accent hover:text-accent-foreground",
                          isActive || hasActiveSubItem
                            ? "text-primary font-medium border-b-2 border-primary"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.title}
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {item.items.map((subItem) => {
                        const isExternalLink = subItem.href?.startsWith('http');
                        
                        if (isExternalLink) {
                          return (
                            <DropdownMenuItem 
                              key={subItem.href} 
                              onClick={() => window.open(subItem.href, '_blank')}
                              className="cursor-pointer"
                            >
                              {subItem.title}
                            </DropdownMenuItem>
                          );
                        }
                        
                        return (
                          <DropdownMenuItem key={subItem.href} asChild>
                            <Link
                              href={subItem.href}
                              className={cn(
                                "w-full cursor-pointer",
                                pathname === subItem.href || pathname.startsWith(subItem.href + "/")
                                  ? "text-primary font-medium"
                                  : ""
                              )}
                            >
                              {subItem.title}
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              } else {
                // Render regular link for items without sub-items
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "pb-3 pt-3 transition-colors whitespace-nowrap px-2",
                      isActive
                        ? "text-primary font-medium border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                );
              }
            })}
          </div>
        </nav>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

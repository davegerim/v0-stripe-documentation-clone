"use client"

import { Play } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getPageContent } from "@/lib/page-content"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface RightSidebarProps {
  slug: string
}

export function RightSidebar({ slug }: RightSidebarProps) {
  const content = getPageContent(slug)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll("h2[id]")
      let currentSection = ""

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect()
        if (rect.top <= 100) {
          currentSection = heading.id
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      })
    }
  }

  return (
    <aside className="hidden xl:block sticky top-[112px] h-[calc(100vh-112px)] w-80 border-l bg-background overflow-y-auto p-6">
      <Card className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-6 mb-8 border-0">
        <div className="flex items-center justify-center mb-3">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <Play className="h-6 w-6 fill-white" />
          </div>
        </div>
        <p className="text-center text-sm font-medium">Watch the video guide</p>
      </Card>

      {content.sections.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">ON THIS PAGE</h3>
          <nav className="space-y-2 text-sm">
            {content.sections.map((section) => {
              const sectionId = section.id
              const isActive = activeSection === sectionId

              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(sectionId)}
                  className={cn(
                    "block text-left w-full transition-colors",
                    isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground pl-3",
                  )}
                >
                  {section.title}
                </button>
              )
            })}
          </nav>
        </div>
      )}
    </aside>
  )
}

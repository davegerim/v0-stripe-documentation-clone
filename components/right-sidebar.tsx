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

      {/* Video Guides Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">VIDEO GUIDES</h3>
        
        {/* Video 1: Laravel, JavaScript, React Native */}
        <div className="space-y-2">
          <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg p-3 cursor-pointer hover:from-purple-700 hover:to-purple-500 transition-all duration-200" onClick={() => window.open('https://screenrec.com/share/2rGmVsbHAu', '_blank')}>
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <p className="text-white text-xs text-center font-medium">Laravel, JavaScript, React Native</p>
          </div>
        </div>

        {/* Video 2: Java, Node.js, WooCommerce, WordPress Plugin */}
        <div className="space-y-2">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg p-3 cursor-pointer hover:from-blue-700 hover:to-blue-500 transition-all duration-200" onClick={() => window.open('https://screenrec.com/share/vaDzYCkp9T', '_blank')}>
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <p className="text-white text-xs text-center font-medium">Java, Node.js, WooCommerce, WordPress</p>
          </div>
        </div>

        {/* Video 3: Flutter */}
        <div className="space-y-2">
          <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-lg p-3 cursor-pointer hover:from-green-700 hover:to-green-500 transition-all duration-200" onClick={() => window.open('https://screenrec.com/share/EAyh4n7Zuc', '_blank')}>
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <p className="text-white text-xs text-center font-medium">Flutter</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

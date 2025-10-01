"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Tab {
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: number
}

export function Tabs({ tabs, defaultTab = 0 }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <div className="my-6">
      <div className="flex gap-1 border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors relative",
              activeTab === index ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
            {activeTab === index && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab].content}</div>
    </div>
  )
}

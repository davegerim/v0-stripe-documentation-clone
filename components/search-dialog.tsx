"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, FileText, ArrowRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { searchDocumentation, type SearchResult } from "@/lib/search"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchDocumentation(query)
      setResults(searchResults)
      setSelectedIndex(0)
    } else {
      setResults([])
    }
  }, [query])

  const handleSelect = useCallback(
    (result: SearchResult) => {
      router.push(result.href)
      onOpenChange(false)
      setQuery("")
    },
    [router, onOpenChange],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault()
        handleSelect(results[selectedIndex])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, results, selectedIndex, handleSelect])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="flex items-center border-b px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground mr-3" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
            autoFocus
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {results.length === 0 && query.trim() && (
            <div className="p-8 text-center text-muted-foreground">
              <p>No results found for "{query}"</p>
            </div>
          )}

          {results.length === 0 && !query.trim() && (
            <div className="p-8 text-center text-muted-foreground">
              <p className="mb-4">Search for documentation, guides, and API references</p>
              <div className="text-sm space-y-2">
                <p className="font-medium text-foreground">Popular searches:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => setQuery("payment intents")}
                    className="px-3 py-1 bg-muted rounded-full hover:bg-muted/80 transition-colors"
                  >
                    Payment Intents
                  </button>
                  <button
                    onClick={() => setQuery("checkout")}
                    className="px-3 py-1 bg-muted rounded-full hover:bg-muted/80 transition-colors"
                  >
                    Checkout
                  </button>
                  <button
                    onClick={() => setQuery("subscriptions")}
                    className="px-3 py-1 bg-muted rounded-full hover:bg-muted/80 transition-colors"
                  >
                    Subscriptions
                  </button>
                </div>
              </div>
            </div>
          )}

          {results.map((result, index) => (
            <button
              key={result.href}
              onClick={() => handleSelect(result)}
              className={`w-full text-left px-4 py-3 border-b hover:bg-muted/50 transition-colors ${
                index === selectedIndex ? "bg-muted/50" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium mb-1">{result.title}</div>
                  <div className="text-sm text-muted-foreground line-clamp-2">{result.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">{result.breadcrumb}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>

        <div className="border-t px-4 py-2 text-xs text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">↓</kbd>
              <span className="ml-1">to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">↵</kbd>
              <span className="ml-1">to select</span>
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">esc</kbd>
            <span className="ml-1">to close</span>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

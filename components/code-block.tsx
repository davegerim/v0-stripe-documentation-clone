"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export function CodeBlock({ code, language = "javascript", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-6">
      {filename && (
        <div className="bg-slate-800 text-slate-300 px-4 py-2 text-sm font-mono rounded-t-lg border-b border-slate-700">
          {filename}
        </div>
      )}
      <div className={`bg-slate-900 text-slate-50 ${filename ? "rounded-b-lg" : "rounded-lg"} overflow-hidden`}>
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
          <pre className="p-6 overflow-x-auto">
            <code className="text-sm font-mono">{code}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

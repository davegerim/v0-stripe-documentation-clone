import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { RightSidebar } from "@/components/right-sidebar"

// This will handle all documentation pages
export default function DocPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join("/")

  // You can add logic here to fetch content based on slug
  // For now, we'll render the layout

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar currentPath={`/${slug}`} />
        <MainContent slug={slug} />
        <RightSidebar slug={slug} />
      </div>
    </div>
  )
}

// Generate static params for known routes
export function generateStaticParams() {
  return [
    { slug: ["get-started"] },
    { slug: ["payments"] },
    { slug: ["payments", "accept-a-payment"] },
    { slug: ["payments", "checkout"] },
    { slug: ["checkout", "quickstart"] },
    { slug: ["no-code", "payment-links"] },
    { slug: ["api"] },
    { slug: ["billing"] },
    { slug: ["terminal"] },
    { slug: ["connect"] },
    { slug: ["radar"] },
    { slug: ["identity"] },
    { slug: ["climate"] },
    { slug: ["atlas"] },
    { slug: ["crypto"] },
  ]
}

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { MainContent } from "@/components/main-content";
import { RightSidebar } from "@/components/right-sidebar";

// This will handle all documentation pages
export default function DocPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join("/");

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
  );
}

// Generate static params for known routes
export function generateStaticParams() {
  return [
    { slug: ["get-started"] },
    { slug: ["flutter"] },
    { slug: ["flutter", "installation"] },
    { slug: ["flutter", "configuration"] },
    { slug: ["flutter", "hosted-payments"] },
    { slug: ["flutter", "api-integration"] },
    { slug: ["flutter", "payment-links"] },
    { slug: ["flutter", "test-credentials"] },
    { slug: ["flutter", "first-payment"] },
    { slug: ["flutter", "testing"] },
    { slug: ["react-native"] },
    { slug: ["react-native", "installation"] },
    { slug: ["react-native", "configuration"] },
    { slug: ["react-native", "hosted-payments"] },
    { slug: ["react-native", "api-integration"] },
    { slug: ["react-native", "payment-links"] },
    { slug: ["react-native", "webview-integration"] },
    { slug: ["react-native", "first-payment"] },
    { slug: ["react-native", "testing"] },
    { slug: ["javascript"] },
    { slug: ["javascript", "installation"] },
    { slug: ["javascript", "configuration"] },
    { slug: ["javascript", "direct-payment"] },
    { slug: ["javascript", "payment-links"] },
    { slug: ["javascript", "payment-widgets"] },
    { slug: ["javascript", "security"] },
    { slug: ["javascript", "first-payment"] },
    { slug: ["javascript", "testing"] },
    { slug: ["payment-methods"] },
    { slug: ["api"] },
    { slug: ["testing"] },
    { slug: ["support"] },
  ];
}

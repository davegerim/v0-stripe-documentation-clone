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
    { slug: ["essentials"] },
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
    { slug: ["laravel"] },
    { slug: ["laravel", "installation"] },
    { slug: ["laravel", "configuration"] },
    { slug: ["laravel", "hosted-payments"] },
    { slug: ["laravel", "api-integration"] },
    { slug: ["laravel", "payment-widget"] },
    { slug: ["laravel", "first-payment"] },
    { slug: ["laravel", "testing"] },
    { slug: ["nodejs"] },
    { slug: ["nodejs", "installation"] },
    { slug: ["nodejs", "configuration"] },
    { slug: ["nodejs", "hosted-payments"] },
    { slug: ["nodejs", "api-integration"] },
    { slug: ["nodejs", "payment-links"] },
    { slug: ["nodejs", "first-payment"] },
    { slug: ["nodejs", "testing"] },
    { slug: ["java"] },
    { slug: ["java", "installation"] },
    { slug: ["java", "configuration"] },
    { slug: ["java", "hosted-payments"] },
    { slug: ["java", "api-integration"] },
    { slug: ["java", "payment-links"] },
    { slug: ["java", "first-payment"] },
    { slug: ["java", "testing"] },
    { slug: ["wordpress"] },
    { slug: ["wordpress", "installation"] },
    { slug: ["wordpress", "configuration"] },
    { slug: ["wordpress", "hosted-payments"] },
    { slug: ["wordpress", "api-integration"] },
    { slug: ["wordpress", "static-forms"] },
    { slug: ["wordpress", "first-payment"] },
    { slug: ["wordpress", "testing"] },
    { slug: ["woocommerce"] },
    { slug: ["woocommerce", "installation"] },
    { slug: ["woocommerce", "configuration"] },
    { slug: ["woocommerce", "payment-gateway"] },
    { slug: ["woocommerce", "order-management"] },
    { slug: ["woocommerce", "webhook-support"] },
    { slug: ["woocommerce", "first-payment"] },
    { slug: ["woocommerce", "testing"] },
    { slug: ["payment-methods"] },
    { slug: ["api"] },
    { slug: ["testing"] },
    { slug: ["support"] },
  ];
}

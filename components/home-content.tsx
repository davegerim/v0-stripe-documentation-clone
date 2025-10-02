import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { homePageNavigation } from "@/lib/navigation-data";
import { ArrowRight } from "lucide-react";

export function HomeContent() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            YagoutPay Documentation
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl">
            Complete integration guides for YagoutPay payment processing across
            Flutter, React Native, and JavaScript.
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-12">
            <Button size="lg" asChild className="text-sm md:text-base">
              <Link href="/flutter/installation">
                Get started with Flutter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-sm md:text-base bg-transparent"
            >
              <Link href="/javascript/installation">
                JavaScript Integration
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-sm md:text-base bg-transparent"
            >
              <Link href="/flutter/hosted-payments">View payment methods</Link>
            </Button>
          </div>

          {/* Test Credentials Section */}
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="p-4 md:p-6">
              <p className="text-sm text-muted-foreground mb-4">
                <Link
                  href="/flutter/test-credentials"
                  className="text-primary hover:underline"
                >
                  View test credentials
                </Link>{" "}
                and{" "}
                <Link
                  href="/flutter/testing"
                  className="text-primary hover:underline"
                >
                  testing guide
                </Link>{" "}
                for YagoutPay integration.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1 w-full">
                  <div className="text-xs text-muted-foreground mb-2">
                    Test Merchant ID
                  </div>
                  <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                    202508080001
                  </code>
                </div>
                <Button variant="link" asChild>
                  <Link href="/flutter/test-credentials">Test credentials</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Start Sections */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 max-w-7xl">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {homePageNavigation.map((section) => (
              <div key={section.title}>
                <h2 className="text-base md:text-lg font-semibold mb-4">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.items?.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href || "#"}
                        className="text-primary hover:underline flex items-start gap-2"
                      >
                        <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span className="text-sm md:text-base">
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Try it out Section */}
      <section className="border-b border-border bg-muted/20">
        <div className="container mx-auto px-6 py-16 max-w-7xl">
          <h2 className="text-3xl font-bold mb-8">Try it out</h2>
          <div className="grid md:grid-cols-5 gap-4 mb-6">
            {[
              "Hosted Payment",
              "API Integration",
              "Payment Links",
              "Static Links",
              "WebView Integration",
            ].map((action) => (
              <Button
                key={action}
                variant="outline"
                className="justify-start bg-transparent"
              >
                {action}
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            <Link
              href="/flutter/installation"
              className="text-primary hover:underline"
            >
              Get started
            </Link>{" "}
            with YagoutPay Flutter integration.
          </p>
        </div>
      </section>

      {/* Browse by Integration Method */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-16 max-w-7xl">
          <h2 className="text-3xl font-bold mb-8">Integration Methods</h2>

          <div className="space-y-12">
            {/* Flutter Integration */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">
                Flutter Integration
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Hosted Payments",
                    desc: "Redirect to YagoutPay payment page",
                    href: "/flutter/hosted-payments",
                  },
                  {
                    title: "API Integration",
                    desc: "Direct API payment processing",
                    href: "/flutter/api-integration",
                  },
                  {
                    title: "Payment Links",
                    desc: "Generate shareable payment URLs",
                    href: "/flutter/payment-links",
                  },
                  {
                    title: "Static Links",
                    desc: "QR code and recurring payments",
                    href: "/flutter/static-links",
                  },
                  {
                    title: "WebView Integration",
                    desc: "In-app payment processing",
                    href: "/flutter/webview-integration",
                  },
                  {
                    title: "Success/Failure Handling",
                    desc: "Payment result management",
                    href: "/flutter/success-failure",
                  },
                ].map((product) => (
                  <Link key={product.href} href={product.href}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle className="text-base">
                          {product.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {product.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* JavaScript Integration */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">
                JavaScript Integration
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Direct Payment Integration",
                    desc: "Process payments directly in your app",
                    href: "/javascript/direct-payment",
                  },
                  {
                    title: "Payment Link Generation",
                    desc: "Generate shareable payment URLs",
                    href: "/javascript/payment-links",
                  },
                  {
                    title: "Payment Widget Integration",
                    desc: "Use pre-built payment widgets",
                    href: "/javascript/payment-widgets",
                  },
                  {
                    title: "Security & Encryption",
                    desc: "Secure payment data handling",
                    href: "/javascript/security",
                  },
                ].map((product) => (
                  <Link key={product.href} href={product.href}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle className="text-base">
                          {product.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {product.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Laravel Integration */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">
                Laravel Integration
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Hosted Payments",
                    desc: "Redirect to YagoutPay payment page",
                    href: "/laravel/hosted-payments",
                  },
                  {
                    title: "API Integration",
                    desc: "Direct API payment processing",
                    href: "/laravel/api-integration",
                  },
                  {
                    title: "Payment Widget",
                    desc: "Static links and QR code generation",
                    href: "/laravel/payment-widget",
                  },
                ].map((product) => (
                  <Link key={product.href} href={product.href}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle className="text-base">
                          {product.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {product.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Node.js Integration */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">
                Node.js Integration
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Hosted Payments",
                    desc: "Redirect to YagoutPay payment page",
                    href: "/nodejs/hosted-payments",
                  },
                  {
                    title: "API Integration",
                    desc: "Direct API payment processing",
                    href: "/nodejs/api-integration",
                  },
                  {
                    title: "Payment Links",
                    desc: "Dynamic and static payment links",
                    href: "/nodejs/payment-links",
                  },
                ].map((product) => (
                  <Link key={product.href} href={product.href}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle className="text-base">
                          {product.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {product.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Java Integration */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">
                Java Integration
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Hosted Payments",
                    desc: "Redirect to YagoutPay payment page",
                    href: "/java/hosted-payments",
                  },
                  {
                    title: "API Integration",
                    desc: "Direct API payment processing",
                    href: "/java/api-integration",
                  },
                  {
                    title: "Payment Links",
                    desc: "Static link API integration",
                    href: "/java/payment-links",
                  },
                ].map((product) => (
                  <Link key={product.href} href={product.href}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle className="text-base">
                          {product.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {product.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* WordPress Integration */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">
                WordPress Integration
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Hosted Payments",
                    desc: "Redirect to YagoutPay payment page",
                    href: "/wordpress/hosted-payments",
                  },
                  {
                    title: "API Integration",
                    desc: "Direct API payment processing",
                    href: "/wordpress/api-integration",
                  },
                  {
                    title: "Static Forms",
                    desc: "Custom payment forms with full control",
                    href: "/wordpress/static-forms",
                  },
                ].map((product) => (
                  <Link key={product.href} href={product.href}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle className="text-base">
                          {product.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {product.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* WooCommerce Integration */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">
                WooCommerce Integration
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Payment Gateway",
                    desc: "Native WooCommerce payment gateway",
                    href: "/woocommerce/payment-gateway",
                  },
                  {
                    title: "Order Management",
                    desc: "Automatic order status updates",
                    href: "/woocommerce/order-management",
                  },
                  {
                    title: "Webhook Support",
                    desc: "Real-time payment notifications",
                    href: "/woocommerce/webhook-support",
                  },
                ].map((product) => (
                  <Link key={product.href} href={product.href}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle className="text-base">
                          {product.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {product.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Code Examples */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">
                Code Examples
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Complete Implementation",
                    desc: "Full Flutter integration example",
                    href: "/flutter/complete-implementation",
                  },
                  {
                    title: "Configuration",
                    desc: "Setup and configuration guide",
                    href: "/flutter/configuration",
                  },
                  {
                    title: "WebView Examples",
                    desc: "WebView integration examples",
                    href: "/flutter/webview-examples",
                  },
                  {
                    title: "Success Screens",
                    desc: "Payment success UI components",
                    href: "/flutter/success-screens",
                  },
                  {
                    title: "Error Handling",
                    desc: "Error handling and debugging",
                    href: "/flutter/error-examples",
                  },
                ].map((product) => (
                  <Link key={product.href} href={product.href}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle className="text-base">
                          {product.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {product.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Testing & Support */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">
                Testing & Support
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Test Credentials",
                    desc: "UAT environment setup",
                    href: "/flutter/test-credentials",
                  },
                  {
                    title: "Debugging",
                    desc: "Debug and troubleshoot issues",
                    href: "/flutter/debugging",
                  },
                  {
                    title: "Common Issues",
                    desc: "Frequently asked questions",
                    href: "/flutter/common-issues",
                  },
                ].map((product) => (
                  <Link key={product.href} href={product.href}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle className="text-base">
                          {product.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {product.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
            <Link href="/support" className="hover:text-foreground">
              Need help? Contact Support.
            </Link>
            <Link
              href="/flutter/installation"
              className="hover:text-foreground"
            >
              Get started with Flutter.
            </Link>
            <Link
              href="/flutter/test-credentials"
              className="hover:text-foreground"
            >
              View test credentials.
            </Link>
            <Link href="/api" className="hover:text-foreground">
              API Documentation.
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { homePageNavigation } from "@/lib/navigation-data"
import { ArrowRight } from "lucide-react"

export function HomeContent() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Documentation</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl">
            Explore our guides and examples to integrate Stripe.
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-12">
            <Button size="lg" asChild className="text-sm md:text-base">
              <Link href="/payments">
                Get started with payments
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-sm md:text-base bg-transparent">
              <Link href="/api">Explore all products</Link>
            </Button>
          </div>

          {/* Test API Keys Section */}
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="p-4 md:p-6">
              <p className="text-sm text-muted-foreground mb-4">
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>{" "}
                or{" "}
                <Link href="/register" className="text-primary hover:underline">
                  create an account
                </Link>{" "}
                to load your test API keys.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1 w-full">
                  <div className="text-xs text-muted-foreground mb-2">Test card</div>
                  <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">4242 4242 4242 4242</code>
                </div>
                <Button variant="link" asChild>
                  <Link href="/testing">Test cards</Link>
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
                <h2 className="text-base md:text-lg font-semibold mb-4">{section.title}</h2>
                <ul className="space-y-3">
                  {section.items?.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href || "#"} className="text-primary hover:underline flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span className="text-sm md:text-base">{item.title}</span>
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
            {["Start a payment", "Sell a product", "Issue coupons", "Get your balance", "Manage taxes"].map(
              (action) => (
                <Button key={action} variant="outline" className="justify-start bg-transparent">
                  {action}
                </Button>
              ),
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>{" "}
            to edit real requests.
          </p>
        </div>
      </section>

      {/* Browse by Product */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-16 max-w-7xl">
          <h2 className="text-3xl font-bold mb-8">Browse by product</h2>

          <div className="space-y-12">
            {/* Payments */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">Payments</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { title: "Payments", desc: "Online payments", href: "/payments" },
                  { title: "Terminal", desc: "In-person and omnichannel payments", href: "/terminal" },
                  { title: "Connect", desc: "Payments for platforms", href: "/connect" },
                  { title: "Radar", desc: "Fraud and risk management", href: "/radar" },
                  { title: "Climate", desc: "Carbon removal", href: "/climate" },
                  { title: "Identity", desc: "Online identity verification", href: "/identity" },
                  {
                    title: "Financial Connections",
                    desc: "Connect users' financial accounts",
                    href: "/financial-connections",
                  },
                  { title: "Crypto", desc: "Accept, onramp, or pay out in crypto", href: "/crypto" },
                ].map((product) => (
                  <Link key={product.href} href={product.href}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle className="text-base">{product.title}</CardTitle>
                        <CardDescription className="text-sm">{product.desc}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Revenue */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">Revenue</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { title: "Billing", desc: "Subscriptions and recurring payments", href: "/billing" },
                  { title: "Tax", desc: "Sales tax and VAT automation", href: "/tax" },
                  { title: "Revenue Recognition", desc: "Accounting automation", href: "/revenue-recognition" },
                  { title: "Sigma", desc: "Custom reports", href: "/sigma" },
                  { title: "Data Pipeline", desc: "Data warehouse sync", href: "/data-pipeline" },
                  { title: "Atlas", desc: "Startup incorporation", href: "/atlas" },
                ].map((product) => (
                  <Link key={product.href} href={product.href}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle className="text-base">{product.title}</CardTitle>
                        <CardDescription className="text-sm">{product.desc}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Money management */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">Money management</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { title: "Issuing", desc: "Card creation", href: "/issuing" },
                  {
                    title: "Financial Accounts for platforms",
                    desc: "Building blocks for financial services",
                    href: "/treasury",
                  },
                  { title: "Capital", desc: "Business financing", href: "/capital" },
                ].map((product) => (
                  <Link key={product.href} href={product.href}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle className="text-base">{product.title}</CardTitle>
                        <CardDescription className="text-sm">{product.desc}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Prebuilt components */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">Prebuilt components</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { title: "Payment Links", desc: "No-code payments", href: "/payment-links" },
                  { title: "Checkout", desc: "Prebuilt, Stripe-hosted checkout page", href: "/checkout" },
                  { title: "Elements", desc: "Secure frontend UI components", href: "/elements" },
                ].map((product) => (
                  <Link key={product.href} href={product.href}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle className="text-base">{product.title}</CardTitle>
                        <CardDescription className="text-sm">{product.desc}</CardDescription>
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
            <Link href="/early-access" className="hover:text-foreground">
              Join our early access program.
            </Link>
            <Link href="/changelog" className="hover:text-foreground">
              Check out our changelog.
            </Link>
            <Link href="/contact-sales" className="hover:text-foreground">
              Questions? Contact Sales.
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

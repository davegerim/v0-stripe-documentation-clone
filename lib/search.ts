export interface SearchResult {
  title: string
  description: string
  href: string
  breadcrumb: string
  content: string
}

const searchableContent: SearchResult[] = [
  {
    title: "Create Payment Links",
    description: "Quickly accept payments for goods, services, subscriptions, tips, or donations.",
    href: "/no-code/payment-links",
    breadcrumb: "Get started > Use Stripe without code",
    content: "payment links no-code accept payments goods services subscriptions tips donations",
  },
  {
    title: "Get started with Stripe",
    description: "Learn how to integrate Stripe into your application.",
    href: "/get-started",
    breadcrumb: "Get started",
    content: "get started integrate stripe application no-code checkout custom integration test",
  },
  {
    title: "Payments",
    description: "Use Stripe to start accepting payments.",
    href: "/payments",
    breadcrumb: "Payments",
    content: "payments accept online in-person subscriptions invoicing payment methods",
  },
  {
    title: "Accept a payment",
    description: "Securely accept payments online.",
    href: "/payments/accept-a-payment",
    breadcrumb: "Payments > About Stripe payments",
    content: "accept payment online secure checkout payment intents api integration",
  },
  {
    title: "Stripe Checkout",
    description: "Use a prebuilt, Stripe-hosted checkout page to accept payments.",
    href: "/payments/checkout",
    breadcrumb: "Payments",
    content: "checkout prebuilt hosted payment page one-time subscriptions trials coupons",
  },
  {
    title: "Checkout Quickstart",
    description: "Accept a payment with Checkout in 10 minutes.",
    href: "/checkout/quickstart",
    breadcrumb: "Payments > Checkout",
    content: "checkout quickstart tutorial guide install create session test integration",
  },
  {
    title: "Stripe API Reference",
    description: "Complete reference documentation for the Stripe API.",
    href: "/api",
    breadcrumb: "API Reference",
    content: "api reference documentation rest authentication payment intents customers charges",
  },
  {
    title: "Billing",
    description: "Set up subscriptions and recurring payments.",
    href: "/billing",
    breadcrumb: "Billing",
    content: "billing subscriptions recurring payments invoicing usage-based pricing models",
  },
  {
    title: "Terminal",
    description: "Accept in-person payments with Stripe Terminal.",
    href: "/terminal",
    breadcrumb: "Terminal",
    content: "terminal in-person point-of-sale pos card readers hardware integration",
  },
  {
    title: "Connect",
    description: "Build a platform or marketplace with Stripe Connect.",
    href: "/connect",
    breadcrumb: "Connect",
    content: "connect platform marketplace onboarding payouts account types standard express custom",
  },
  {
    title: "Payment Intents",
    description: "A Payment Intent guides you through collecting a payment from your customer.",
    href: "/api/payment-intents",
    breadcrumb: "API Reference > Core Resources",
    content: "payment intents api create confirm capture payment methods",
  },
  {
    title: "Customers",
    description: "Customer objects allow you to perform recurring charges.",
    href: "/api/customers",
    breadcrumb: "API Reference > Core Resources",
    content: "customers api create update delete recurring charges payment methods",
  },
  {
    title: "Subscriptions",
    description: "Create and manage subscriptions for recurring billing.",
    href: "/billing/subscriptions",
    breadcrumb: "Billing",
    content: "subscriptions recurring billing saas membership trials pricing plans",
  },
  {
    title: "Payment Methods",
    description: "Learn about payment methods your integration can support.",
    href: "/payments/payment-methods",
    breadcrumb: "Payments",
    content: "payment methods cards wallets bank transfers bnpl buy now pay later",
  },
  {
    title: "Radar",
    description: "Fraud and risk management for your business.",
    href: "/radar",
    breadcrumb: "Radar",
    content: "radar fraud detection risk management machine learning rules",
  },
  {
    title: "Identity",
    description: "Online identity verification for your platform.",
    href: "/identity",
    breadcrumb: "Identity",
    content: "identity verification kyc know your customer document upload",
  },
  {
    title: "Climate",
    description: "Remove carbon from the atmosphere with Stripe Climate.",
    href: "/climate",
    breadcrumb: "Climate",
    content: "climate carbon removal sustainability environmental impact",
  },
  {
    title: "Atlas",
    description: "Incorporate your company with Stripe Atlas.",
    href: "/atlas",
    breadcrumb: "Atlas",
    content: "atlas incorporate company startup delaware llc c-corp",
  },
  {
    title: "Crypto",
    description: "Accept, onramp, or pay out in cryptocurrency.",
    href: "/crypto",
    breadcrumb: "Crypto",
    content: "crypto cryptocurrency bitcoin ethereum onramp offramp payments",
  },
]

export function searchDocumentation(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase().trim()

  if (!lowerQuery) return []

  const results = searchableContent
    .map((item) => {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery)
      const descriptionMatch = item.description.toLowerCase().includes(lowerQuery)
      const contentMatch = item.content.toLowerCase().includes(lowerQuery)

      let score = 0
      if (titleMatch) score += 10
      if (descriptionMatch) score += 5
      if (contentMatch) score += 1

      return { ...item, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)

  return results
}

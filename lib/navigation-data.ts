export interface NavItem {
  title: string
  href?: string
  items?: NavItem[]
}

export const mainNavigation = [
  { title: "Get started", href: "/get-started" },
  { title: "Payments", href: "/payments" },
  { title: "Revenue", href: "/revenue" },
  { title: "Platforms and marketplaces", href: "/connect" },
  { title: "Money management", href: "/money-management" },
  { title: "Developer resources", href: "/development" },
]

export const sidebarNavigation: NavItem[] = [
  {
    title: "Overview",
    href: "/get-started",
  },
  {
    title: "See all products",
    href: "/products",
  },
  {
    title: "START BUILDING",
    items: [
      {
        title: "Start developing",
        items: [
          { title: "Set up your development environment", href: "/get-started/development-environment" },
          { title: "Send your first API request", href: "/get-started/first-api-request" },
          { title: "Build and test new features", href: "/get-started/build-test-features" },
          { title: "Go-live checklist", href: "/get-started/go-live-checklist" },
        ],
      },
      {
        title: "About the APIs",
        items: [
          { title: "Overview", href: "/get-started/about-apis" },
          { title: "Build with an LLM", href: "/get-started/build-with-llm" },
        ],
      },
      { title: "Build with an LLM", href: "/get-started/build-with-llm" },
      { title: "Use Stripe without code", href: "/get-started/stripe-without-code" },
    ],
  },
  {
    title: "SET UP STRIPE",
    items: [
      { title: "Create an account", href: "/get-started/create-account" },
      { title: "Migrate to Stripe", href: "/get-started/migrate-to-stripe" },
    ],
  },
  {
    title: "Payments analytics",
    href: "/payments/analytics",
  },
  {
    title: "Online payments",
    items: [
      { title: "Overview", href: "/payments/online-payments" },
      { title: "Find your use case", href: "/payments/use-cases" },
      { title: "Use Managed Payments", href: "/payments/managed-payments" },
    ],
  },
  {
    title: "Use Payment Links",
    items: [
      { title: "Overview", href: "/no-code/payment-links" },
      { title: "Create a Payment Link", href: "/no-code/payment-links/create" },
      { title: "Customize Payment Links", href: "/no-code/payment-links/customize" },
    ],
  },
  {
    title: "Use a prebuilt checkout page",
    items: [
      { title: "Overview", href: "/payments/checkout" },
      { title: "Quickstart", href: "/checkout/quickstart" },
      { title: "Customize Checkout", href: "/checkout/customize" },
    ],
  },
  {
    title: "Build a custom integration with Elements",
    items: [
      { title: "Overview", href: "/payments/elements" },
      { title: "Payment Element", href: "/payments/payment-element" },
      { title: "Express Checkout Element", href: "/payments/express-checkout-element" },
    ],
  },
  {
    title: "Build an in-app integration",
    items: [
      { title: "iOS", href: "/payments/accept-a-payment?platform=ios" },
      { title: "Android", href: "/payments/accept-a-payment?platform=android" },
      { title: "React Native", href: "/payments/accept-a-payment?platform=react-native" },
    ],
  },
  {
    title: "Payment methods",
    items: [
      { title: "Overview", href: "/payments/payment-methods" },
      { title: "Cards", href: "/payments/cards" },
      { title: "Bank debits", href: "/payments/bank-debits" },
      { title: "Bank transfers", href: "/payments/bank-transfers" },
      { title: "Buy now, pay later", href: "/payments/bnpl" },
      { title: "Wallets", href: "/payments/wallets" },
    ],
  },
  {
    title: "Add payment methods",
    href: "/payments/payment-methods/overview",
  },
  {
    title: "Manage payment methods",
    href: "/payments/payment-methods/manage",
  },
  {
    title: "Faster checkout with Link",
    href: "/payments/link",
  },
  {
    title: "Payment interfaces",
    items: [
      { title: "Payment Links", href: "/payment-links" },
      { title: "Checkout", href: "/payments/checkout" },
      { title: "Web Elements", href: "/payments/elements" },
      { title: "In-app Payments", href: "/payments/mobile" },
    ],
  },
  {
    title: "Payment scenarios",
    items: [
      { title: "Handle multiple currencies", href: "/payments/currencies" },
      { title: "Custom payment flows", href: "/payments/custom-flows" },
      { title: "Flexible acquiring", href: "/payments/acquiring" },
      { title: "Orchestration", href: "/payments/orchestration" },
    ],
  },
  {
    title: "In-person payments",
    items: [{ title: "Terminal", href: "/terminal" }],
  },
  {
    title: "Beyond payments",
    items: [
      { title: "Incorporate your company", href: "/atlas" },
      { title: "Crypto", href: "/crypto" },
      { title: "Agentic commerce", href: "/agentic-commerce" },
      { title: "Financial Connections", href: "/financial-connections" },
      { title: "Climate", href: "/climate" },
    ],
  },
  {
    title: "Understand fraud",
    items: [
      { title: "Radar fraud protection", href: "/radar" },
      { title: "Manage disputes", href: "/disputes" },
      { title: "Verify identities", href: "/identity" },
    ],
  },
]

export const homePageNavigation: NavItem[] = [
  {
    title: "No-code",
    items: [
      { title: "Sell and get paid online", href: "/no-code/payment-links" },
      { title: "Invoice clients and customers", href: "/no-code/invoices" },
      { title: "Set up recurring payments", href: "/no-code/subscriptions" },
    ],
  },
  {
    title: "Stripe-hosted",
    items: [
      { title: "Use a prebuilt checkout page", href: "/payments/checkout" },
      { title: "Set up the customer portal", href: "/no-code/customer-portal" },
    ],
  },
  {
    title: "For developers",
    items: [
      { title: "API reference", href: "/api" },
      { title: "Development quickstart", href: "/get-started/development-environment" },
      { title: "Browse our sample projects", href: "/samples" },
    ],
  },
]

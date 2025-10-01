export interface PageContent {
  title: string
  description: string
  breadcrumbs: { label: string; href?: string }[]
  html: string
  sections?: { id: string; title: string }[]
}

const pageContents: Record<string, PageContent> = {
  "get-started/development-environment": {
    title: "Set up your development environment",
    description: "Get familiar with the Stripe CLI and our server-side SDKs.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Start developing", href: "/get-started/start-developing" },
      { label: "Set up your development environment" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Stripe's server-side SDKs and command-line interface (CLI) allow you to interact with Stripe's REST APIs. Start with the Stripe CLI to streamline your development environment and make API calls.</p>
      </div>
      
      <div class="flex items-start gap-3 mb-8">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Use the SDKs to avoid writing boilerplate code. To start sending requests from your environment, choose a language to follow a quickstart guide.</p>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NOT A DEVELOPER?</h3>
        <p class="text-sm text-blue-800">Check out our <a href="/no-code" class="text-blue-600 hover:underline">no-code docs</a>, use a <a href="/prebuilt" class="text-blue-600 hover:underline">prebuilt solution from our partner directory</a>, or <a href="/experts" class="text-blue-600 hover:underline">hire a Stripe-certified expert</a>.</p>
      </div>

      <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold mb-2">Chrome extensions</h3>
        <p class="text-sm text-gray-700 mb-3">We recommend you build your payment integration with Stripe (such as <a href="/elements" class="text-blue-600 hover:underline">Elements</a> or <a href="/checkout" class="text-blue-600 hover:underline">Checkout</a>) on your own website. Then, set up your Chrome extension to send users to this payment page when they're ready to complete a purchase.</p>
        <p class="text-sm text-gray-700">This method is more secure and easier to maintain than trying to handle payments directly within the extension.</p>
      </div>
    `,
    sections: [
      { id: "what-you-learn", title: "What you learn" },
      { id: "install", title: "Install" },
      { id: "authenticate", title: "Authenticate" },
      { id: "confirm-setup", title: "Confirm setup" },
      { id: "install-sdk", title: "Install the Ruby server-side SDK" },
      { id: "run-first-request", title: "Run your first SDK request" },
    ],
  },
  "get-started/first-api-request": {
    title: "Send your first API request",
    description: "Learn how to make your first API call to Stripe.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Start developing", href: "/get-started/start-developing" },
      { label: "Send your first API request" },
    ],
    html: `
      <p class="leading-relaxed mb-6">After setting up your development environment, you're ready to make your first API request to Stripe. This guide walks you through creating a customer and retrieving their information.</p>
      
      <h2 id="create-customer" class="text-2xl font-bold mt-12 mb-4">Create a customer</h2>
      <p class="leading-relaxed mb-4">Create a customer object to represent a buyer in your system:</p>
    `,
    sections: [
      { id: "create-customer", title: "Create a customer" },
      { id: "retrieve-customer", title: "Retrieve a customer" },
      { id: "list-customers", title: "List all customers" },
      { id: "next-steps", title: "Next steps" },
    ],
  },
  "get-started/build-test-features": {
    title: "Build and test new features",
    description: "Learn best practices for building and testing Stripe integrations.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Start developing", href: "/get-started/start-developing" },
      { label: "Build and test new features" },
    ],
    html: `
      <p class="leading-relaxed mb-6">Stripe provides tools and best practices to help you build robust integrations. Learn how to use test mode, webhooks, and the Stripe CLI to develop with confidence.</p>
      
      <h2 id="test-mode" class="text-2xl font-bold mt-12 mb-4">Use test mode</h2>
      <p class="leading-relaxed mb-4">Test mode lets you simulate API requests without moving real money. Use test API keys and test card numbers to verify your integration works correctly.</p>
      
      <h2 id="test-cards" class="text-2xl font-bold mt-12 mb-4">Test card numbers</h2>
      <p class="leading-relaxed mb-4">Use these test card numbers to simulate different scenarios:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><code class="bg-muted px-2 py-1 rounded text-sm font-mono">4242 4242 4242 4242</code> - Successful payment</li>
        <li><code class="bg-muted px-2 py-1 rounded text-sm font-mono">4000 0000 0000 0002</code> - Card declined</li>
        <li><code class="bg-muted px-2 py-1 rounded text-sm font-mono">4000 0000 0000 9995</code> - Insufficient funds</li>
      </ul>
    `,
    sections: [
      { id: "test-mode", title: "Use test mode" },
      { id: "test-cards", title: "Test card numbers" },
      { id: "webhooks", title: "Test webhooks" },
      { id: "stripe-cli", title: "Use the Stripe CLI" },
    ],
  },
  "get-started/go-live-checklist": {
    title: "Go-live checklist",
    description: "Prepare your Stripe integration for production.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Start developing", href: "/get-started/start-developing" },
      { label: "Go-live checklist" },
    ],
    html: `
      <p class="leading-relaxed mb-6">Before going live with your Stripe integration, review this checklist to ensure you've covered all the essentials for a smooth launch.</p>
      
      <h2 id="account-setup" class="text-2xl font-bold mt-12 mb-4">Account setup</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Activate your Stripe account</li>
        <li>Complete your business profile</li>
        <li>Add your bank account for payouts</li>
        <li>Set up two-factor authentication</li>
      </ul>
      
      <h2 id="integration-checklist" class="text-2xl font-bold mt-12 mb-4">Integration checklist</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Switch from test to live API keys</li>
        <li>Set up webhook endpoints in production</li>
        <li>Test your integration with real cards</li>
        <li>Implement error handling</li>
        <li>Add logging and monitoring</li>
      </ul>
    `,
    sections: [
      { id: "account-setup", title: "Account setup" },
      { id: "integration-checklist", title: "Integration checklist" },
      { id: "security", title: "Security best practices" },
      { id: "compliance", title: "Compliance requirements" },
    ],
  },
  "get-started/about-apis": {
    title: "About the APIs",
    description: "Learn about Stripe's API architecture and design principles.",
    breadcrumbs: [{ label: "Get started", href: "/get-started" }, { label: "About the APIs" }],
    html: `
      <p class="leading-relaxed mb-6">Stripe's APIs are organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.</p>
      
      <h2 id="base-url" class="text-2xl font-bold mt-12 mb-4">Base URL</h2>
      <p class="leading-relaxed mb-4">All API requests should be made to:</p>
      <code class="block bg-muted px-4 py-3 rounded text-sm font-mono mb-6">https://api.stripe.com</code>
      
      <h2 id="authentication" class="text-2xl font-bold mt-12 mb-4">Authentication</h2>
      <p class="leading-relaxed mb-4">Authenticate your API requests by providing your API key in the request. You can manage your API keys in the Dashboard.</p>
    `,
    sections: [
      { id: "base-url", title: "Base URL" },
      { id: "authentication", title: "Authentication" },
      { id: "errors", title: "Errors" },
      { id: "versioning", title: "Versioning" },
      { id: "rate-limits", title: "Rate limits" },
    ],
  },
  "get-started/build-with-llm": {
    title: "Build with an LLM",
    description: "Use AI assistants to help build your Stripe integration.",
    breadcrumbs: [{ label: "Get started", href: "/get-started" }, { label: "Build with an LLM" }],
    html: `
      <p class="leading-relaxed mb-6">Large Language Models (LLMs) like ChatGPT can help you build Stripe integrations faster. Learn how to effectively use AI assistants with Stripe's documentation.</p>
      
      <h2 id="getting-started" class="text-2xl font-bold mt-12 mb-4">Getting started</h2>
      <p class="leading-relaxed mb-4">When working with an LLM, provide context about your use case and the Stripe products you're using. The more specific you are, the better the assistance you'll receive.</p>
      
      <h2 id="best-practices" class="text-2xl font-bold mt-12 mb-4">Best practices</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Always verify generated code against official documentation</li>
        <li>Test thoroughly in test mode before going live</li>
        <li>Use the "Copy for LLM" button on documentation pages</li>
        <li>Ask for explanations of complex concepts</li>
      </ul>
    `,
    sections: [
      { id: "getting-started", title: "Getting started" },
      { id: "best-practices", title: "Best practices" },
      { id: "examples", title: "Example prompts" },
      { id: "limitations", title: "Limitations" },
    ],
  },
  "get-started/stripe-without-code": {
    title: "Use Stripe without code",
    description: "Accept payments without writing any code using no-code solutions.",
    breadcrumbs: [{ label: "Get started", href: "/get-started" }, { label: "Use Stripe without code" }],
    html: `
      <p class="leading-relaxed mb-6">You don't need to be a developer to use Stripe. Our no-code solutions let you accept payments, send invoices, and manage subscriptions without writing a single line of code.</p>
      
      <h2 id="payment-links" class="text-2xl font-bold mt-12 mb-4">Payment Links</h2>
      <p class="leading-relaxed mb-4">Create a payment link in minutes and share it with your customers via email, social media, or your website.</p>
      
      <h2 id="invoicing" class="text-2xl font-bold mt-12 mb-4">Invoicing</h2>
      <p class="leading-relaxed mb-4">Send professional invoices to your customers and get paid faster with automatic payment reminders.</p>
    `,
    sections: [
      { id: "payment-links", title: "Payment Links" },
      { id: "invoicing", title: "Invoicing" },
      { id: "subscriptions", title: "Subscriptions" },
      { id: "customer-portal", title: "Customer portal" },
    ],
  },
  "get-started/create-account": {
    title: "Create an account",
    description: "Sign up for Stripe and start accepting payments.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Set up Stripe", href: "/get-started/setup" },
      { label: "Create an account" },
    ],
    html: `
      <p class="leading-relaxed mb-6">Creating a Stripe account is quick and free. You can start accepting test payments immediately and activate your account when you're ready to go live.</p>
      
      <h2 id="sign-up" class="text-2xl font-bold mt-12 mb-4">Sign up</h2>
      <p class="leading-relaxed mb-4">Visit <a href="https://dashboard.stripe.com/register" class="text-blue-600 hover:underline">stripe.com/register</a> to create your account. You'll need to provide:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Email address</li>
        <li>Password</li>
        <li>Country of operation</li>
      </ul>
      
      <h2 id="activate" class="text-2xl font-bold mt-12 mb-4">Activate your account</h2>
      <p class="leading-relaxed mb-4">To accept live payments, you'll need to activate your account by providing additional business information.</p>
    `,
    sections: [
      { id: "sign-up", title: "Sign up" },
      { id: "activate", title: "Activate your account" },
      { id: "verify-identity", title: "Verify your identity" },
      { id: "add-bank-account", title: "Add a bank account" },
    ],
  },
  "get-started/migrate-to-stripe": {
    title: "Migrate to Stripe",
    description: "Move your existing payment infrastructure to Stripe.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Set up Stripe", href: "/get-started/setup" },
      { label: "Migrate to Stripe" },
    ],
    html: `
      <p class="leading-relaxed mb-6">Migrating to Stripe from another payment provider is straightforward. We provide tools and guidance to help you move your customers, subscriptions, and payment data.</p>
      
      <h2 id="planning" class="text-2xl font-bold mt-12 mb-4">Planning your migration</h2>
      <p class="leading-relaxed mb-4">Before you begin, consider:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>What data needs to be migrated</li>
        <li>How to minimize disruption to customers</li>
        <li>Testing requirements</li>
        <li>Timeline and rollout strategy</li>
      </ul>
      
      <h2 id="migrate-customers" class="text-2xl font-bold mt-12 mb-4">Migrate customers</h2>
      <p class="leading-relaxed mb-4">Use the Stripe API to import your existing customer data, including payment methods and subscription information.</p>
    `,
    sections: [
      { id: "planning", title: "Planning your migration" },
      { id: "migrate-customers", title: "Migrate customers" },
      { id: "migrate-subscriptions", title: "Migrate subscriptions" },
      { id: "testing", title: "Testing" },
      { id: "go-live", title: "Go live" },
    ],
  },
}

export function getPageContent(slug: string): PageContent {
  return (
    pageContents[slug] || {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist.",
      breadcrumbs: [],
      html: "<p>This page could not be found.</p>",
      sections: [],
    }
  )
}

export function getAllPageSlugs(): string[] {
  return Object.keys(pageContents)
}

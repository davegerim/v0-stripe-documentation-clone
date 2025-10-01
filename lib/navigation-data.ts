export interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
}

export const mainNavigation = [
  { title: "Get started", href: "/get-started" },
  { title: "Flutter Integration", href: "/flutter" },
  { title: "React Native Integration", href: "/react-native" },
  { title: "JavaScript Integration", href: "/javascript" },
  { title: "Payment Methods", href: "/payment-methods" },
  { title: "API Reference", href: "/api" },
  { title: "Testing", href: "/testing" },
  { title: "Support", href: "/support" },
];

export const sidebarNavigation: NavItem[] = [
  {
    title: "Overview",
    href: "/get-started",
  },
  {
    title: "QUICK START",
    items: [
      {
        title: "Flutter Getting Started",
        items: [
          { title: "Installation", href: "/flutter/installation" },
          { title: "Configuration", href: "/flutter/configuration" },
          { title: "First Payment", href: "/flutter/first-payment" },
          { title: "Testing", href: "/flutter/testing" },
        ],
      },
      {
        title: "React Native Getting Started",
        items: [
          { title: "Installation", href: "/react-native/installation" },
          { title: "Configuration", href: "/react-native/configuration" },
          { title: "First Payment", href: "/react-native/first-payment" },
          { title: "Testing", href: "/react-native/testing" },
        ],
      },
      {
        title: "JavaScript Getting Started",
        items: [
          { title: "Installation", href: "/javascript/installation" },
          { title: "Configuration", href: "/javascript/configuration" },
          { title: "First Payment", href: "/javascript/first-payment" },
          { title: "Testing", href: "/javascript/testing" },
        ],
      },
      {
        title: "Integration Methods",
        items: [
          { title: "Hosted Payments", href: "/flutter/hosted-payments" },
          { title: "API Integration", href: "/flutter/api-integration" },
          { title: "Payment Links", href: "/flutter/payment-links" },
          { title: "Static Links", href: "/flutter/static-links" },
        ],
      },
    ],
  },
  {
    title: "PAYMENT METHODS",
    items: [
      {
        title: "Flutter Integration",
        items: [
          { title: "Hosted Payments", href: "/flutter/hosted-payments" },
          { title: "API Integration", href: "/flutter/api-integration" },
          { title: "Payment Links", href: "/flutter/payment-links" },
          {
            title: "WebView Integration",
            href: "/flutter/webview-integration",
          },
        ],
      },
      {
        title: "React Native Integration",
        items: [
          { title: "Hosted Payments", href: "/react-native/hosted-payments" },
          { title: "API Integration", href: "/react-native/api-integration" },
          { title: "Payment Links", href: "/react-native/payment-links" },
          {
            title: "WebView Integration",
            href: "/react-native/webview-integration",
          },
        ],
      },
      {
        title: "JavaScript Integration",
        items: [
          {
            title: "Direct Payment Integration",
            href: "/javascript/direct-payment",
          },
          {
            title: "Payment Link Generation",
            href: "/javascript/payment-links",
          },
          {
            title: "Payment Widget Integration",
            href: "/javascript/payment-widgets",
          },
          { title: "Security & Encryption", href: "/javascript/security" },
        ],
      },
    ],
  },
  {
    title: "CODE EXAMPLES",
    items: [
      {
        title: "Flutter Examples",
        items: [
          {
            title: "Complete Implementation",
            href: "/flutter/complete-implementation",
          },
          {
            title: "Configuration Examples",
            href: "/flutter/configuration-examples",
          },
          { title: "WebView Examples", href: "/flutter/webview-examples" },
          { title: "Success Screens", href: "/flutter/success-screens" },
        ],
      },
      {
        title: "React Native Examples",
        items: [
          {
            title: "Complete Implementation",
            href: "/react-native/complete-implementation",
          },
          {
            title: "Configuration Examples",
            href: "/react-native/configuration-examples",
          },
          { title: "WebView Examples", href: "/react-native/webview-examples" },
          { title: "Success Screens", href: "/react-native/success-screens" },
        ],
      },
      {
        title: "JavaScript Examples",
        items: [
          {
            title: "Complete Implementation",
            href: "/javascript/complete-implementation",
          },
          {
            title: "Configuration Examples",
            href: "/javascript/configuration-examples",
          },
          { title: "Payment Widgets", href: "/javascript/payment-widgets" },
          { title: "Error Handling", href: "/javascript/error-handling" },
        ],
      },
    ],
  },
  {
    title: "TESTING",
    items: [
      { title: "Test Credentials", href: "/flutter/test-credentials" },
      { title: "Test URLs", href: "/flutter/test-urls" },
      { title: "Debugging", href: "/flutter/debugging" },
      { title: "Common Issues", href: "/flutter/common-issues" },
    ],
  },
  {
    title: "TROUBLESHOOTING",
    items: [
      { title: "Error Codes", href: "/flutter/error-codes" },
      { title: "Debugging Tips", href: "/flutter/debugging-tips" },
      { title: "Performance", href: "/flutter/performance" },
      { title: "Security", href: "/flutter/security" },
    ],
  },
  {
    title: "API REFERENCE",
    items: [
      { title: "Authentication", href: "/api/authentication" },
      { title: "Endpoints", href: "/api/endpoints" },
      { title: "Webhooks", href: "/api/webhooks" },
      { title: "SDK Reference", href: "/api/sdk-reference" },
    ],
  },
];

export const homePageNavigation: NavItem[] = [
  {
    title: "Quick Start",
    items: [
      { title: "Flutter Integration", href: "/flutter/installation" },
      { title: "React Native Integration", href: "/react-native/installation" },
      { title: "JavaScript Integration", href: "/javascript/installation" },
      { title: "Configuration", href: "/flutter/configuration" },
    ],
  },
  {
    title: "Payment Methods",
    items: [
      { title: "Hosted Payments", href: "/flutter/hosted-payments" },
      { title: "API Integration", href: "/flutter/api-integration" },
      { title: "Payment Links", href: "/flutter/payment-links" },
    ],
  },
  {
    title: "For Developers",
    items: [
      { title: "API Reference", href: "/api" },
      { title: "Code Examples", href: "/flutter/complete-implementation" },
      { title: "Testing Guide", href: "/flutter/testing" },
    ],
  },
];

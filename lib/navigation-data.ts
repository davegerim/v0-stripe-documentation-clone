export interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
}

export const mainNavigation = [
  { 
    title: "SDK", 
    items: [
      { title: "Java SDK", href: "https://drive.google.com/file/d/1NPBYr_oGrucyf2U2G32bxL752BVglnep/view?usp=drive_link" },
      { title: "JavaScript SDK", href: "https://drive.google.com/file/d/1f0VV_wJqQIGLLyjRf5M6LSzXZdhn9_f4/view?usp=drive_link" },
      { title: "Laravel SDK", href: "https://drive.google.com/file/d/1BMz-_h7Q8Ra-X2uQs2hzIcTv7YLLkjmG/view?usp=drive_link" },
      { title: "WooCommerce & WordPress SDK", href: "https://drive.google.com/file/d/1-7D7w3KQkoB3iJXd6RZciaAfyNFzwiYd/view?usp=drive_link" },
      { title: "Node.js SDK", href: "https://drive.google.com/file/d/1-rY9RzayIvDWyBiW1juyvHd8W37Z4dp6/view?usp=drive_link" },
      { title: "Flutter SDK", href: "https://drive.google.com/file/d/11AgQN-DiHTUDj378k5-Gc0Exe7Fg_rCl/view?usp=drive_link" },
      { title: "React Native SDK", href: "https://drive.google.com/file/d/1IYNtflStl0o-W1cDlwXK_7ZyyHHM0dCZ/view?usp=drive_link" }
    ]
  },
  { title: "Essentials", href: "/essentials" },
  { title: "Get started", href: "/get-started" },
  { 
    title: "Mobile", 
    items: [
      { title: "Flutter Integration", href: "/flutter" },
      { title: "React Native Integration", href: "/react-native" }
    ]
  },
  { 
    title: "Web", 
    items: [
      { title: "JavaScript Integration", href: "/javascript" },
      { title: "Laravel Integration", href: "/laravel" },
      { title: "Node.js Integration", href: "/nodejs" },
      { title: "Java Integration", href: "/java" }
    ]
  },
  { 
    title: "WordPress", 
    items: [
      { title: "WordPress Integration", href: "/wordpress" },
      { title: "WooCommerce Integration", href: "/woocommerce" }
    ]
  },
];

export const sidebarNavigation: NavItem[] = [
  {
    title: "Essentials",
    href: "/essentials",
  },
  {
    title: "Overview",
    href: "/get-started",
  },
  {
    title: "QUICK START",
    items: [
      { title: "Integration Methods", href: "/integration-methods" },
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
        title: "Laravel Getting Started",
        items: [
          { title: "Installation", href: "/laravel/installation" },
          { title: "Configuration", href: "/laravel/configuration" },
          { title: "First Payment", href: "/laravel/first-payment" },
          { title: "Testing", href: "/laravel/testing" },
        ],
      },
      {
        title: "Node.js Getting Started",
        items: [
          { title: "Installation", href: "/nodejs/installation" },
          { title: "Configuration", href: "/nodejs/configuration" },
          { title: "First Payment", href: "/nodejs/first-payment" },
          { title: "Testing", href: "/nodejs/testing" },
        ],
      },
      {
        title: "Java Getting Started",
        items: [
          { title: "Installation", href: "/java/installation" },
          { title: "Configuration", href: "/java/configuration" },
          { title: "First Payment", href: "/java/first-payment" },
          { title: "Testing", href: "/java/testing" },
        ],
      },
      {
        title: "WordPress Getting Started",
        items: [
          { title: "Installation", href: "/wordpress/installation" },
          { title: "Configuration", href: "/wordpress/configuration" },
          { title: "First Payment", href: "/wordpress/first-payment" },
          { title: "Testing", href: "/wordpress/testing" },
        ],
      },
      {
        title: "WooCommerce Getting Started",
        items: [
          { title: "Installation", href: "/woocommerce/installation" },
          { title: "Configuration", href: "/woocommerce/configuration" },
          { title: "First Payment", href: "/woocommerce/first-payment" },
          { title: "Testing", href: "/woocommerce/testing" },
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
        ],
      },
      {
        title: "React Native Integration",
        items: [
          { title: "Hosted Payments", href: "/react-native/hosted-payments" },
          { title: "API Integration", href: "/react-native/api-integration" },
          { title: "Payment Links", href: "/react-native/payment-links" },
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
      {
        title: "Laravel Integration",
        items: [
          { title: "Hosted Payments", href: "/laravel/hosted-payments" },
          { title: "API Integration", href: "/laravel/api-integration" },
          { title: "Payment Widget", href: "/laravel/payment-widget" },
        ],
      },
      {
        title: "Node.js Integration",
        items: [
          { title: "Hosted Payments", href: "/nodejs/hosted-payments" },
          { title: "API Integration", href: "/nodejs/api-integration" },
          { title: "Payment Links", href: "/nodejs/payment-links" },
        ],
      },
      {
        title: "Java Integration",
        items: [
          { title: "Hosted Payments", href: "/java/hosted-payments" },
          { title: "API Integration", href: "/java/api-integration" },
          { title: "Payment Links", href: "/java/payment-links" },
        ],
      },
      {
        title: "WordPress Integration",
        items: [
          { title: "Hosted Payments", href: "/wordpress/hosted-payments" },
          { title: "API Integration", href: "/wordpress/api-integration" },
          { title: "Static Forms", href: "/wordpress/static-forms" },
        ],
      },
      {
        title: "WooCommerce Integration",
        items: [
          { title: "Payment Gateway", href: "/woocommerce/payment-gateway" },
          { title: "Order Management", href: "/woocommerce/order-management" },
          { title: "Webhook Support", href: "/woocommerce/webhook-support" },
        ],
      },
    ],
  },
  {
    title: "TESTING",
    items: [
      { title: "Test Credentials", href: "/flutter/test-credentials" },
      { title: "Common Issues", href: "/testing/common-issues" },
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
      { title: "Code Examples", href: "/flutter/complete-implementation" },
      { title: "Testing Guide", href: "/flutter/testing" },
    ],
  },
];

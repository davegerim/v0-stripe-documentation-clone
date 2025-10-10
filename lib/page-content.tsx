export interface PageContent {
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  html: string;
  sections?: { id: string; title: string }[];
}

const pageContents: Record<string, PageContent> = {
  "essentials": {
    title: "Universal Essentials",
    description: "Core elements that remain consistent across all frameworks and integration methods.",
    breadcrumbs: [
      { label: "Essentials" },
    ],
    html: `
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div class="flex items-start gap-3">
          <svg class="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
          <div>
            <h3 class="font-semibold text-blue-900 mb-2">Universal Constants</h3>
            <p class="text-sm text-blue-800">These elements never change regardless of which framework or integration method you choose. Understanding these fundamentals will make implementing any framework much easier.</p>
          </div>
        </div>
      </div>

      <h2 id="encryption-parameters" class="text-2xl font-bold mt-12 mb-4">Environment</h2>
      <p class="leading-relaxed mb-4">YagoutPay operates two environments: Test and Production. Credentials are shared upon registration.</p>
      
      <h3 class="text-lg font-semibold mt-8 mb-3">Example Environment Configuration with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Universal Constants (Never Change)
const MERCHANT_ID = '202504290002';   // MERCHANT_ID Shared by yagout team up on registry.
const ENCRYPTION_KEY = 'neTdYIKd87JEj4C6ZoYjaeBiCoeOr40ZKBEI8EU/8lo='; 
// Base64 encoded Shared by yagout team up on registry.
const IV = '0123456789abcdef'; // Fixed 16-byte IV</code></pre>
      </div>

      <h2 id="encryption-algorithm" class="text-2xl font-bold mt-12 mb-4">Encryption & Decryption Logic</h2>
      <p class="leading-relaxed mb-4">YagoutPay uses AES-256-CBC encryption with a shared merchant key and a static IV. The encryption algorithm is consistent across all platforms:</p>
      
      <h3 class="text-lg font-semibold mt-8 mb-3">Sample JavaScript (Browser) for encryption and decryption:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// JavaScript (Browser - Web Crypto API) - SAME for all frameworks

// Encryption function
async function encryptPaymentData(data) {
  const keyBytes = base64ToUint8Array(ENCRYPTION_KEY);
  const ivBytes = new TextEncoder().encode(IV);
  const cryptoKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-CBC' }, false, ['encrypt']);
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv: ivBytes }, cryptoKey, new TextEncoder().encode(JSON.stringify(data)));
  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

// Decryption function
async function decryptPaymentData(encryptedData) {
  const keyBytes = base64ToUint8Array(ENCRYPTION_KEY);
  const ivBytes = new TextEncoder().encode(IV);
  const cryptoKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-CBC' }, false, ['decrypt']);
  const encryptedBytes = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: ivBytes }, cryptoKey, encryptedBytes);
  return JSON.parse(new TextDecoder().decode(decrypted));
}</code></pre>
      </div>

      <h3 class="text-lg font-semibold mt-8 mb-3">Sample JavaScript (Node.js) for encryption and decryption:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// JavaScript (Node.js - crypto module) - SAME for all frameworks

// Encryption function
function encryptAesCbcBase64(obj) {
  const key = Buffer.from(ENCRYPTION_KEY, 'base64');
  const iv = Buffer.from(IV, 'utf8');
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  cipher.setAutoPadding(true);
  return Buffer.concat([cipher.update(Buffer.from(JSON.stringify(obj), 'utf8')), cipher.final()]).toString('base64');
}

// Decryption function
function decryptAesCbcBase64(encryptedData) {
  const key = Buffer.from(ENCRYPTION_KEY, 'base64');
  const iv = Buffer.from(IV, 'utf8');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  decipher.setAutoPadding(true);
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedData, 'base64')), decipher.final()]);
  return JSON.parse(decrypted.toString('utf8'));
}</code></pre>
      </div>

      <h2 id="customer-information" class="text-2xl font-bold mt-12 mb-4">Customer Information</h2>
      <p class="leading-relaxed mb-4">These fields are mandatory in all integration methods:</p>
      
      <h3 class="text-lg font-semibold mt-8 mb-3">Example Customer Data Structure with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Customer Information (Always Required)
{
  customerName: "Customer Name",     // or first_name + last_name
  emailId: "customer@example.com",   // or customer_email
  mobileNumber: "0965680964",        // or mobile_no
  dial_code: "+251"                  // Always +251 for Ethiopia
}</code></pre>
      </div>

      <h2 id="transaction-details" class="text-2xl font-bold mt-12 mb-4">Transaction Details</h2>
      <p class="leading-relaxed mb-4">These transaction parameters are consistent across all frameworks:</p>
      
      <h3 class="text-lg font-semibold mt-8 mb-3">Example Transaction Data Structure with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Transaction Details (Always Required)
{
  meId: "202508080001",              // Always the same merchant ID
  orderNo: "UNIQUE_ORDER_ID",        // Must be unique each time
  amount: "1.00",                    // Always string format
  country: "ETH",                    // Always Ethiopia
  currency: "ETB",                   // Always Ethiopian Birr
  transactionType: "SALE"            // Always SALE for payments
}</code></pre>
      </div>

      <h2 id="payment-gateway-details" class="text-2xl font-bold mt-12 mb-4">Payment Gateway Details</h2>
      <p class="leading-relaxed mb-4">These gateway settings never change across integration methods:</p>
      
      <h3 class="text-lg font-semibold mt-8 mb-3">Example Payment Gateway Configuration with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Payment Gateway Details (Always Required)
{
  pg_Id: "67ee846571e740418d688c3f", // Fixed payment gateway ID
  paymode: "WA",                     // Always WA
  scheme_Id: "7",                    // Always 7
  wallet_type: "telebirr"            // or "cbe", "awash"
}</code></pre>
      </div>

      <h2 id="url-structure" class="text-2xl font-bold mt-12 mb-4">URL Structure</h2>
      <p class="leading-relaxed mb-4">Base URLs follow the same pattern, only environment changes:</p>
      
      <h3 class="text-lg font-semibold mt-8 mb-3">Example URL Configuration with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Base URLs (Only Environment Changes)
// UAT (Testing) - Same pattern for all frameworks
const UAT_BASE = 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0';

// Production - Same pattern for all frameworks  
const PROD_BASE = 'https://checkout.yagoutpay.com/ms-transaction-core-1-0';

// Framework-specific endpoints (only the path changes)
const ENDPOINTS = {
  hosted: '/apiRedirection/apiIntegration',      // Stage 1
  direct: '/apiRedirection/apiIntegration',       // Stage 2  
  paymentLink: '/sdk/paymentByLinkResponse',     // Stage 3
  staticLink: '/sdk/staticQRPaymentResponse'     // Stage 3
};</code></pre>
      </div>

      <h2 id="request-headers" class="text-2xl font-bold mt-12 mb-4">Request Headers</h2>
      <p class="leading-relaxed mb-4">Header patterns are consistent across all integration methods:</p>
      
      <h3 class="text-lg font-semibold mt-8 mb-3">Example Request Headers Configuration with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Common Headers (Consistent Pattern)
const COMMON_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json, text/plain'
};

// Framework-specific headers
const FRAMEWORK_HEADERS = {
  hosted: {},                                    // Stage 1: Form submission
  direct: {},                                    // Stage 2: No special headers
  paymentLink: { 'me_id': MERCHANT_ID },        // Stage 3: me_id header
  staticLink: { 'me_id': MERCHANT_ID }          // Stage 3: me_id header
};</code></pre>
      </div>

      <h2 id="response-handling" class="text-2xl font-bold mt-12 mb-4">Response Handling</h2>
      <p class="leading-relaxed mb-4">All frameworks can return these response types:</p>
      
      <h3 class="text-lg font-semibold mt-8 mb-3">Example Response Data Structure with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Response Patterns (Always the Same)
const RESPONSE_TYPES = {
  success: {
    status: 'Success',
    payment_link: 'https://...',  // For payment links
    transactionId: 'TXN_123'
  },
  failure: {
    status: 'Declined',
    statusMessage: 'Order Id already exists'
  },
  encrypted: {
    response: 'BASE64_ENCRYPTED_DATA'  // Needs decryption
  }
};</code></pre>
      </div>

      <h2 id="error-handling" class="text-2xl font-bold mt-12 mb-4">Error Handling</h2>
      <p class="leading-relaxed mb-4">These error patterns appear in all frameworks:</p>
      
      <h3 class="text-lg font-semibold mt-8 mb-3">Example Error Handling Configuration with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Universal Error Patterns
const COMMON_ERRORS = {
  'Order Id already exists': 'Generate unique order_id',
  'Invalid Request Body': 'Check encryption parameters',
  'Unexpected token': 'Handle both JSON and plain-text responses',
  'INTERNAL_SERVER_ERROR': 'Check headers and body format'
};</code></pre>
      </div>

      <h2 id="validation-rules" class="text-2xl font-bold mt-12 mb-4">Validation Rules</h2>
      <p class="leading-relaxed mb-4">These validation rules apply to all frameworks:</p>
      
      <h3 class="text-lg font-semibold mt-8 mb-3">Example Validation Rules Configuration with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Field Requirements (Never Change)
const VALIDATION_RULES = {
  order_id: 'Must be unique, string format',
  amount: 'Must be string, minimum 1.00',
  mobile_no: 'Required, string format',
  country: 'Always "ETH"',
  currency: 'Always "ETB"',
  dial_code: 'Always "+251"',
  expiry_date: 'YYYY-MM-DD format for payment links'
};</code></pre>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-green-900 mb-2">What Changes Between Frameworks</h3>
        <p class="text-sm text-green-800 mb-4">Only these elements change:</p>
        <ul class="text-sm text-green-800 list-disc pl-6 space-y-1">
          <li>API Endpoint URL (different paths)</li>
          <li>Request Body Structure (different wrapper formats)</li>
          <li>Response Processing (different success indicators)</li>
          <li>User Interface (different forms/pages)</li>
        </ul>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">Everything Else Stays Identical</h3>
        <ul class="text-sm text-blue-800 list-disc pl-6 space-y-1">
          <li>✅ Encryption algorithm (AES-256-CBC)</li>
          <li>✅ Key and IV values</li>
          <li>✅ Customer data structure</li>
          <li>✅ Transaction details</li>
          <li>✅ Error handling patterns</li>
          <li>✅ Validation rules</li>
          <li>✅ Base URL structure</li>
        </ul>
        <p class="text-sm text-blue-800 mt-4">This is why once you understand the encryption and core data structure for one framework, implementing other frameworks becomes much easier - you're just changing the API endpoint and request wrapper, but the core payment data and encryption remain exactly the same!</p>
      </div>
    `,
    sections: [
      { id: "encryption-parameters", title: "Environment" },
      { id: "encryption-algorithm", title: "Encryption & Decryption Logic" },
      { id: "customer-information", title: "Customer Information" },
      { id: "transaction-details", title: "Transaction Details" },
      { id: "payment-gateway-details", title: "Payment Gateway Details" },
      { id: "url-structure", title: "URL Structure" },
      { id: "request-headers", title: "Request Headers" },
      { id: "response-handling", title: "Response Handling" },
      { id: "error-handling", title: "Error Handling" },
      { id: "validation-rules", title: "Validation Rules" },
    ],
  },
  "flutter/installation": {
    title: "Flutter Installation",
    description:
      "Install YagoutPay Flutter SDK and set up your development environment.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Flutter Integration", href: "/flutter" },
      { label: "Installation" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay provides multiple payment integration methods for Flutter applications, offering both hosted and seamless payment experiences. This guide covers the complete setup process.</p>
      </div>
      
      <div class="flex items-start gap-3 mb-8">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Follow this step-by-step guide to integrate YagoutPay payments into your Flutter application with minimal setup.</p>
      </div>

      <h2 id="prerequisites" class="text-2xl font-bold mt-12 mb-4">Prerequisites</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Flutter SDK 3.0.0 or higher</li>
        <li>Dart SDK 3.0.0 or higher</li>
        <li>YagoutPay merchant account</li>
        <li>Valid API credentials</li>
      </ul>

      <h2 id="add-dependencies" class="text-2xl font-bold mt-12 mb-4">Add Dependencies</h2>
      <p class="leading-relaxed mb-4">Add the following dependencies to your <code class="bg-muted px-2 py-1 rounded text-sm font-mono">pubspec.yaml</code>:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0
  webview_flutter: ^4.4.2
  provider: ^6.1.1
  crypto: ^3.0.3</code></pre>
      </div>

      <h2 id="install-dependencies" class="text-2xl font-bold mt-12 mb-4">Install Dependencies</h2>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>flutter pub get</code></pre>
      </div>

      <h2 id="import-packages" class="text-2xl font-bold mt-12 mb-4">Import Required Packages</h2>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>import 'package:http/http.dart' as http;
import 'package:webview_flutter/webview_flutter.dart';
import 'package:provider/provider.dart';
import 'package:crypto/crypto.dart';
import 'dart:convert';
import 'dart:math';</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After installation, proceed to <a href="/flutter/configuration" class="text-blue-600 hover:underline">Configuration</a> to set up your YagoutPay credentials and start processing payments.</p>
      </div>
    `,
    sections: [
      { id: "prerequisites", title: "Prerequisites" },
      { id: "add-dependencies", title: "Add Dependencies" },
      { id: "install-dependencies", title: "Install Dependencies" },
      { id: "import-packages", title: "Import Packages" },
    ],
  },
  "flutter/configuration": {
    title: "Configuration",
    description:
      "Set up YagoutPay configuration and credentials for your Flutter app.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Flutter Integration", href: "/flutter" },
      { label: "Configuration" },
    ],
    html: `
      <p class="leading-relaxed mb-6">Configure your YagoutPay integration with the proper credentials and environment settings. This guide covers both UAT and production configurations.</p>
      
      <h2 id="create-config-file" class="text-2xl font-bold mt-12 mb-4">Create Configuration File</h2>
      <p class="leading-relaxed mb-4">Create <code class="bg-muted px-2 py-1 rounded text-sm font-mono">lib/config/yagoutpay_config.dart</code>:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>class YagoutPayConfig {
  // Environment Toggle
  static const bool useUat = true; // Set to false for production
  
  // UAT URLs
  static const String hostedUatUrl = 
      'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/paymentRedirection/checksumGatewayPage';
  static const String apiUatUrl = 
      'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration';
  
  // Test Credentials (UAT)
  static const String aggregatorId = 'yagout';
  static const String hostedMerchantId = '202508080001';
  static const String hostedKey = 'IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=';
  static const String apiMerchantId = '202508080001';
  static const String apiKey = 'IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=';
  
  // Payment Gateway Details
  static const String pgId = '67ee846571e740418d688c3f';
  static const String paymode = 'WA';
  static const String schemeId = '7';
  static const String walletType = 'telebirr';
  
  // Dynamic URLs based on environment
  static String get hostedUrl => useUat ? hostedUatUrl : hostedProductionUrl;
  static String get apiUrl => useUat ? apiUatUrl : apiProductionUrl;
}</code></pre>
      </div>

      <h2 id="environment-setup" class="text-2xl font-bold mt-12 mb-4">Environment Setup</h2>
      <p class="leading-relaxed mb-4">Configure your environment settings:</p>
      
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h3 class="font-semibold text-yellow-900 mb-2">IMPORTANT</h3>
        <p class="text-sm text-yellow-800">Always use UAT environment for testing. Switch to production only when ready to go live.</p>
      </div>

      <h2 id="test-credentials" class="text-2xl font-bold mt-12 mb-4">Test Credentials</h2>
      <p class="leading-relaxed mb-4">Use these credentials for development and testing:</p>
      
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <ul class="space-y-2 text-sm">
          <li><strong>Merchant ID:</strong> 202508080001</li>
          <li><strong>API Key:</strong> IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=</li>
          <li><strong>Aggregator ID:</strong> yagout</li>
          <li><strong>Payment Gateway ID:</strong> 67ee846571e740418d688c3f</li>
        </ul>
      </div>
    `,
    sections: [
      { id: "create-config-file", title: "Create Configuration File" },
      { id: "environment-setup", title: "Environment Setup" },
      { id: "test-credentials", title: "Test Credentials" },
    ],
  },
  "flutter/hosted-payments": {
    title: "Flutter Hosted Payments",
    description: "Hosted payment integration with YagoutPay in Flutter applications using WebView for seamless payment processing.",
    breadcrumbs: [
      { label: "Flutter Integration", href: "/flutter" },
      { label: "Payment Methods", href: "/payment-methods" },
      { label: "Hosted Payments" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Hosted payments redirect customers to YagoutPay's secure payment page using WebView integration. This method provides a seamless checkout experience with minimal integration effort and automatic success/failure detection.</p>
      </div>

      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">Hosted payments use YagoutPay's secure payment page to process transactions. The process involves encrypting payment data, generating an HTML form, and redirecting users to YagoutPay's hosted payment page using WebView.</p>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-4">Hosted Payment Flow</h3>
        <ol class="text-sm text-blue-800 list-decimal pl-6 space-y-2">
          <li><strong>Data Collection:</strong> Collect payment data from customer form</li>
          <li><strong>Data Structure:</strong> Build complete payment structure with all required fields</li>
          <li><strong>Encryption:</strong> Encrypt payment data using AES-256-CBC with manual padding</li>
          <li><strong>Hash Generation:</strong> Generate SHA-512 hash for security</li>
          <li><strong>Form Generation:</strong> Create HTML form with encrypted data</li>
          <li><strong>WebView Integration:</strong> Display form in WebView for automatic submission</li>
          <li><strong>Result Handling:</strong> Handle success/failure callbacks</li>
        </ol>
      </div>

      <h2 id="encryption-service" class="text-2xl font-bold mt-12 mb-4">Encryption Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle AES-256-CBC encryption with manual padding for hosted payments:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Hosted Encryption Service with Flutter:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// yagoutpay_hosted_encryption_service.dart
import 'dart:convert';
import 'dart:typed_data';
import 'package:crypto/crypto.dart';
import 'package:encrypt/encrypt.dart';

class YagoutPayHostedEncryptionService {
  final String merchantId;
  final String encryptionKey;
  final String iv = '0123456789abcdef'; // Fixed 16-byte IV
  
  YagoutPayHostedEncryptionService({
    required this.merchantId,
    required this.encryptionKey,
  });
  
  // AES-256-CBC Encryption for Hosted Payments with Manual Padding
  String encrypt(String text) {
    try {
      final key = Key.fromBase64(encryptionKey);
      final ivBytes = IV.fromUtf8(iv);
      
      // Manual padding for hosted payments
      final size = 16;
      final pad = size - (text.length % size);
      final padtext = text + String.fromCharCode(pad).repeat(pad);
      
      final encrypter = Encrypter(AES(key, mode: AESMode.cbc, padding: null));
      final encrypted = encrypter.encrypt(padtext, iv: ivBytes);
      return encrypted.base64;
    } catch (e) {
      throw Exception('Encryption failed: $e');
    }
  }
  
  // AES-256-CBC Decryption for Response Handling
  String decrypt(String encryptedData) {
    try {
      final key = Key.fromBase64(encryptionKey);
      final ivBytes = IV.fromUtf8(iv);
      final encrypter = Encrypter(AES(key, mode: AESMode.cbc, padding: null));
      
      final encrypted = Encrypted.fromBase64(encryptedData);
      final decrypted = encrypter.decrypt(encrypted, iv: ivBytes);
      
      // Remove padding
      final pad = decrypted.codeUnitAt(decrypted.length - 1);
      if (pad > decrypted.length) {
        throw Exception('Invalid padding');
      }
      
      return decrypted.substring(0, decrypted.length - pad);
    } catch (e) {
      throw Exception('Decryption failed: $e');
    }
  }
  
  // Generate SHA-512 Hash for Hosted Payments
  String generateHash(String data, String saltKey) {
    final bytes = utf8.encode(data + saltKey);
    final digest = sha512.convert(bytes);
    return digest.toString();
  }
}</code></pre>
      </div>

      <h2 id="hosted-payment-service" class="text-2xl font-bold mt-12 mb-4">Hosted Payment Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle hosted payment processing:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Hosted Payment Service with Flutter:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// yagoutpay_hosted_service.dart
import 'dart:convert';
import 'yagoutpay_hosted_encryption_service.dart';

class YagoutPayHostedService {
  final YagoutPayHostedEncryptionService encryptionService;
  final String merchantId;
  final String gatewayUrl;
  final String saltKey;
  
  YagoutPayHostedService({
    required this.merchantId,
    required String encryptionKey,
    required this.gatewayUrl,
    required this.saltKey,
  }) : encryptionService = YagoutPayHostedEncryptionService(
         merchantId: merchantId,
         encryptionKey: encryptionKey,
       );
  
  // Build Complete Hosted Payment Data Structure
  Map<String, dynamic> buildHostedPaymentData({
    required String orderNo,
    required String amount,
    required String email,
    required String mobile,
    required String successUrl,
    required String failureUrl,
    String? customerName,
    String? billAddress,
    String? billCity,
    String? billState,
    String? billCountry,
    String? billZip,
    String? shipAddress,
    String? shipCity,
    String? shipState,
    String? shipCountry,
    String? shipZip,
  }) {
    return {
      'txn_details': {
        'ag_id': 'yagout',
        'me_id': merchantId,
        'order_no': orderNo,
        'amount': amount,
        'country': 'ETH',
        'currency': 'ETB',
        'txn_type': 'SALE',
        'success_url': successUrl,
        'failure_url': failureUrl,
        'channel': 'MOBILE',
      },
      'pg_details': {
        'pg_id': '',
        'paymode': '',
        'scheme_id': '',
        'wallet_type': 'telebirr',
      },
      'card_details': {
        'card_no': '',
        'exp_month': '',
        'exp_year': '',
        'cvv': '',
      },
      'cust_details': {
        'card_name': '',
        'cust_name': customerName ?? '',
        'customer_email': email,
        'mobile_no': mobile,
        'unique_id': '',
        'is_logged_in': 'Y',
      },
      'bill_details': {
        'bill_addres': billAddress ?? 'N/A',
        'bill_city': billCity ?? 'Addis Ababa',
        'bill_state': billState ?? 'Addis Ababa',
        'bill_country': billCountry ?? 'ET',
        'bill_zip': billZip ?? '1000',
      },
      'ship_details': {
        'ship_address': shipAddress ?? 'N/A',
        'ship_city': shipCity ?? 'Addis Ababa',
        'ship_state': shipState ?? 'Addis Ababa',
        'ship_country': shipCountry ?? 'ET',
        'ship_zip': shipZip ?? '1000',
        'ship_days': '1',
        'address_count': '1',
      },
      'item_details': {
        'item_count': '1',
        'item_value': amount,
        'item_category': 'Payment',
      },
      'upi_details': {
        'udf_1': '',
        'udf_2': '',
        'udf_3': '',
        'udf_4': '',
        'udf_5': '',
      },
    };
  }
  
  // Generate Hosted Payment HTML Form
  Future<Map<String, dynamic>> generateHostedPayment({
    required String orderNo,
    required String amount,
    required String email,
    required String mobile,
    required String successUrl,
    required String failureUrl,
    String? customerName,
    String? billAddress,
    String? billCity,
    String? billState,
    String? billCountry,
    String? billZip,
    String? shipAddress,
    String? shipCity,
    String? shipState,
    String? shipCountry,
    String? shipZip,
  }) async {
    try {
      // Step 1: Build payment data structure
      final paymentData = buildHostedPaymentData(
        orderNo: orderNo,
        amount: amount,
        email: email,
        mobile: mobile,
        successUrl: successUrl,
        failureUrl: failureUrl,
        customerName: customerName,
        billAddress: billAddress,
        billCity: billCity,
        billState: billState,
        billCountry: billCountry,
        billZip: billZip,
        shipAddress: shipAddress,
        shipCity: shipCity,
        shipState: shipState,
        shipCountry: shipCountry,
        shipZip: shipZip,
      );
      
      // Step 2: Build pipe-separated string for encryption
      final txnDetails = [
        paymentData['txn_details']['ag_id'],
        paymentData['txn_details']['me_id'],
        paymentData['txn_details']['order_no'],
        paymentData['txn_details']['amount'],
        paymentData['txn_details']['country'],
        paymentData['txn_details']['currency'],
        paymentData['txn_details']['txn_type'],
        paymentData['txn_details']['success_url'],
        paymentData['txn_details']['failure_url'],
        paymentData['txn_details']['channel'],
      ].join('|');
      
      final pgDetails = [
        paymentData['pg_details']['pg_id'],
        paymentData['pg_details']['paymode'],
        paymentData['pg_details']['scheme_id'],
        paymentData['pg_details']['wallet_type'],
      ].join('|');
      
      final cardDetails = [
        paymentData['card_details']['card_no'],
        paymentData['card_details']['exp_month'],
        paymentData['card_details']['exp_year'],
        paymentData['card_details']['cvv'],
      ].join('|');
      
      final custDetails = [
        paymentData['cust_details']['card_name'],
        paymentData['cust_details']['cust_name'],
        paymentData['cust_details']['customer_email'],
        paymentData['cust_details']['mobile_no'],
        paymentData['cust_details']['unique_id'],
        paymentData['cust_details']['is_logged_in'],
      ].join('|');
      
      final billDetails = [
        paymentData['bill_details']['bill_addres'],
        paymentData['bill_details']['bill_city'],
        paymentData['bill_details']['bill_state'],
        paymentData['bill_details']['bill_country'],
        paymentData['bill_details']['bill_zip'],
      ].join('|');
      
      final shipDetails = [
        paymentData['ship_details']['ship_address'],
        paymentData['ship_details']['ship_city'],
        paymentData['ship_details']['ship_state'],
        paymentData['ship_details']['ship_country'],
        paymentData['ship_details']['ship_zip'],
        paymentData['ship_details']['ship_days'],
        paymentData['ship_details']['address_count'],
      ].join('|');
      
      final itemDetails = [
        paymentData['item_details']['item_count'],
        paymentData['item_details']['item_value'],
        paymentData['item_details']['item_category'],
      ].join('|');
      
      final upiDetails = [
        paymentData['upi_details']['udf_1'],
        paymentData['upi_details']['udf_2'],
        paymentData['upi_details']['udf_3'],
        paymentData['upi_details']['udf_4'],
        paymentData['upi_details']['udf_5'],
      ].join('|');
      
      // Step 3: Combine all sections with tildes
      final allValues = [
        txnDetails,
        pgDetails,
        cardDetails,
        custDetails,
        billDetails,
        shipDetails,
        itemDetails,
        upiDetails,
      ].join('~');
      
      // Step 4: Encrypt the combined string
      final encryptedData = encryptionService.encrypt(allValues);
      
      // Step 5: Generate SHA-512 hash
      final hash = encryptionService.generateHash(allValues, saltKey);
      
      // Step 6: Generate HTML form
      final html = generateHtmlForm(encryptedData, hash);
      
      return {
        'success': true,
        'html': html,
        'orderId': orderNo,
        'encryptedData': encryptedData,
        'hash': hash,
      };
    } catch (e) {
      return {
        'success': false,
        'error': 'Hosted payment generation failed: $e',
      };
    }
  }
  
  // Generate HTML Form for Auto-Submission
  String generateHtmlForm(String encryptedData, String hash) {
    return '''
    <!DOCTYPE html>
    <html>
      <head>
        <title>Redirecting to YagoutPay...</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            padding: 50px; 
            background-color: #f5f5f5;
          }
          .loading { 
            color: #666; 
            margin-top: 20px; 
          }
        </style>
      </head>
      <body onload="document.forms[0].submit()">
        <h2>Redirecting to YagoutPay...</h2>
        <p class="loading">Please wait while we redirect you to the secure payment page.</p>
        <form action="$gatewayUrl" method="POST" enctype="application/x-www-form-urlencoded">
          <input name="me_id" value="$merchantId" type="hidden">
          <input name="merchant_request" value="$encryptedData" type="hidden">
          <input name="hash" value="$hash" type="hidden">
        </form>
      </body>
    </html>
    ''';
  }
}</code></pre>
      </div>

      <h2 id="webview-integration" class="text-2xl font-bold mt-12 mb-4">WebView Integration</h2>
      <p class="leading-relaxed mb-4">Create a WebView screen to handle hosted payment processing:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example WebView Screen with Flutter:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// yagoutpay_webview_screen.dart
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'yagoutpay_hosted_service.dart';

class YagoutPayWebViewScreen extends StatefulWidget {
  final String orderNo;
  final String amount;
  final String email;
  final String mobile;
  final String successUrl;
  final String failureUrl;
  final String? customerName;
  final String? billAddress;
  final String? billCity;
  final String? billState;
  final String? billCountry;
  final String? billZip;
  
  const YagoutPayWebViewScreen({
    Key? key,
    required this.orderNo,
    required this.amount,
    required this.email,
    required this.mobile,
    required this.successUrl,
    required this.failureUrl,
    this.customerName,
    this.billAddress,
    this.billCity,
    this.billState,
    this.billCountry,
    this.billZip,
  }) : super(key: key);
  
  @override
  _YagoutPayWebViewScreenState createState() => _YagoutPayWebViewScreenState();
}

class _YagoutPayWebViewScreenState extends State<YagoutPayWebViewScreen> {
  late WebViewController _controller;
  bool _isLoading = true;
  String? _error;
  
  @override
  void initState() {
    super.initState();
    _initializeWebView();
  }
  
  void _initializeWebView() async {
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (String url) {
            setState(() {
              _isLoading = true;
            });
          },
          onPageFinished: (String url) {
            setState(() {
              _isLoading = false;
            });
          },
          onNavigationRequest: (NavigationRequest request) {
            // Handle success/failure URLs
            if (request.url.contains('success') || request.url.contains('failure')) {
              _handlePaymentResult(request.url);
              return NavigationDecision.prevent;
            }
            return NavigationDecision.navigate;
          },
        ),
      );
    
    await _loadPaymentForm();
  }
  
  Future<void> _loadPaymentForm() async {
    try {
      final hostedService = YagoutPayHostedService(
        merchantId: 'YOUR_MERCHANT_ID',
        encryptionKey: 'YOUR_ENCRYPTION_KEY',
        gatewayUrl: 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/paymentRedirection/checksumGatewayPage',
        saltKey: 'YOUR_SALT_KEY',
      );
      
      final result = await hostedService.generateHostedPayment(
        orderNo: widget.orderNo,
        amount: widget.amount,
        email: widget.email,
        mobile: widget.mobile,
        successUrl: widget.successUrl,
        failureUrl: widget.failureUrl,
        customerName: widget.customerName,
        billAddress: widget.billAddress,
        billCity: widget.billCity,
        billState: widget.billState,
        billCountry: widget.billCountry,
        billZip: widget.billZip,
      );
      
      if (result['success']) {
        await _controller.loadHtmlString(result['html']);
      } else {
        setState(() {
          _error = result['error'];
        });
      }
    } catch (e) {
      setState(() {
        _error = 'Failed to load payment form: $e';
      });
    }
  }
  
  void _handlePaymentResult(String url) {
    if (url.contains('success')) {
      Navigator.of(context).pop({'success': true, 'url': url});
    } else if (url.contains('failure')) {
      Navigator.of(context).pop({'success': false, 'url': url});
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('YagoutPay Payment'),
        backgroundColor: Colors.blue,
        leading: IconButton(
          icon: Icon(Icons.close),
          onPressed: () => Navigator.of(context).pop({'success': false, 'cancelled': true}),
        ),
      ),
      body: _error != null
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.error, color: Colors.red, size: 64),
                  SizedBox(height: 16),
                  Text(
                    'Payment Error',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text(
                    _error!,
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.red),
                  ),
                  SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () => Navigator.of(context).pop({'success': false, 'error': _error}),
                    child: Text('Close'),
                  ),
                ],
              ),
            )
          : Stack(
              children: [
                WebViewWidget(controller: _controller),
                if (_isLoading)
                  Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CircularProgressIndicator(),
                        SizedBox(height: 16),
                        Text('Loading payment page...'),
                      ],
                    ),
                  ),
              ],
            ),
    );
  }
}</code></pre>
      </div>

      <h2 id="payment-controller" class="text-2xl font-bold mt-12 mb-4">Payment Controller</h2>
      <p class="leading-relaxed mb-4">Create a controller to handle hosted payment flow:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Hosted Payment Controller with Flutter:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// hosted_payment_controller.dart
import 'package:flutter/material.dart';
import 'yagoutpay_hosted_service.dart';
import 'yagoutpay_webview_screen.dart';

class HostedPaymentController extends ChangeNotifier {
  final YagoutPayHostedService hostedService;
  bool _isLoading = false;
  String? _error;
  
  HostedPaymentController({
    required String merchantId,
    required String encryptionKey,
    required String gatewayUrl,
    required String saltKey,
  }) : hostedService = YagoutPayHostedService(
         merchantId: merchantId,
         encryptionKey: encryptionKey,
         gatewayUrl: gatewayUrl,
         saltKey: saltKey,
       );
  
  bool get isLoading => _isLoading;
  String? get error => _error;
  
  // Process Hosted Payment
  Future<Map<String, dynamic>> processHostedPayment({
    required String orderNo,
    required String amount,
    required String email,
    required String mobile,
    required String successUrl,
    required String failureUrl,
    String? customerName,
    String? billAddress,
    String? billCity,
    String? billState,
    String? billCountry,
    String? billZip,
    String? shipAddress,
    String? shipCity,
    String? shipState,
    String? shipCountry,
    String? shipZip,
  }) async {
    try {
      _setLoading(true);
      _clearError();
      
      // Validate payment data
      final validation = _validatePaymentData(
        amount: amount,
        email: email,
        mobile: mobile,
        orderNo: orderNo,
      );
      
      if (!validation['isValid']) {
        _setError('Validation failed: \${validation['errors']}');
        return {'success': false, 'error': _error};
      }
      
      // Generate hosted payment
      final result = await hostedService.generateHostedPayment(
        orderNo: orderNo,
        amount: amount,
        email: email,
        mobile: mobile,
        successUrl: successUrl,
        failureUrl: failureUrl,
        customerName: customerName,
        billAddress: billAddress,
        billCity: billCity,
        billState: billState,
        billCountry: billCountry,
        billZip: billZip,
        shipAddress: shipAddress,
        shipCity: shipCity,
        shipState: shipState,
        shipCountry: shipCountry,
        shipZip: shipZip,
      );
      
      if (result['success']) {
        _clearError();
        return {
          'success': true,
          'html': result['html'],
          'orderId': result['orderId'],
        };
      } else {
        _setError(result['error']);
        return {'success': false, 'error': result['error']};
      }
    } catch (e) {
      _setError('Hosted payment processing failed: $e');
      return {'success': false, 'error': _error};
    } finally {
      _setLoading(false);
    }
  }
  
  // Validate Payment Data
  Map<String, dynamic> _validatePaymentData({
    required String amount,
    required String email,
    required String mobile,
    required String orderNo,
  }) {
    final errors = <String, String>{};
    bool isValid = true;
    
    if (amount.isEmpty || double.tryParse(amount) == null || double.parse(amount) <= 0) {
      errors['amount'] = 'Amount is required and must be greater than 0';
      isValid = false;
    }
    
    if (email.isEmpty || !RegExp(r'^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$').hasMatch(email)) {
      errors['email'] = 'Valid email is required';
      isValid = false;
    }
    
    if (mobile.isEmpty) {
      errors['mobile'] = 'Mobile number is required';
      isValid = false;
    }
    
    if (orderNo.isEmpty) {
      errors['orderNo'] = 'Order number is required';
      isValid = false;
    }
    
    return {
      'isValid': isValid,
      'errors': errors,
    };
  }
  
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }
  
  void _setError(String error) {
    _error = error;
    notifyListeners();
  }
  
  void _clearError() {
    _error = null;
    notifyListeners();
  }
}</code></pre>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-green-900 mb-4">Key Implementation Points</h3>
        <ul class="text-sm text-green-800 list-disc pl-6 space-y-2">
          <li><strong>Encryption:</strong> Use AES-256-CBC with manual padding for hosted payments</li>
          <li><strong>Hash Generation:</strong> Generate SHA-512 hash for security validation</li>
          <li><strong>Form Submission:</strong> Auto-submit HTML form to YagoutPay gateway</li>
          <li><strong>WebView Integration:</strong> Use WebView to display payment page</li>
          <li><strong>URL Handling:</strong> Monitor navigation for success/failure URLs</li>
          <li><strong>Error Handling:</strong> Implement proper error handling for network issues</li>
        </ul>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After implementing hosted payments, explore <a href="/flutter/payment-links" class="text-blue-600 hover:underline">Payment Links</a> for generating shareable payment URLs.</p>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "encryption-service", title: "Encryption Service" },
      { id: "hosted-payment-service", title: "Hosted Payment Service" },
      { id: "webview-integration", title: "WebView Integration" },
      { id: "payment-controller", title: "Payment Controller" },
    ],
  },
  "flutter/api-integration": {
    title: "Flutter API Integration",
    description: "Direct API integration with YagoutPay in Flutter applications with complete implementation details.",
    breadcrumbs: [
      { label: "Flutter Integration", href: "/flutter" },
      { label: "Payment Methods", href: "/payment-methods" },
      { label: "API Integration" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Direct API integration processes payments without redirecting users to external pages. All payment processing happens within your Flutter application using YagoutPay's API with AES-256-CBC encryption.</p>
      </div>

      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">Direct API integration uses YagoutPay's API to process payments directly in your Flutter application. The process involves encrypting payment data, making API calls, and handling encrypted responses.</p>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-4">Direct API Payment Flow</h3>
        <ol class="text-sm text-blue-800 list-decimal pl-6 space-y-2">
          <li><strong>Data Collection:</strong> Collect payment data from customer form</li>
          <li><strong>Data Structure:</strong> Build complete payment structure with all required fields</li>
          <li><strong>Encryption:</strong> Encrypt payment data using AES-256-CBC</li>
          <li><strong>API Call:</strong> Send encrypted data to YagoutPay API endpoint</li>
          <li><strong>Response Handling:</strong> Decrypt and process YagoutPay response</li>
          <li><strong>Result Processing:</strong> Handle success/failure and update UI</li>
        </ol>
      </div>

      <h2 id="encryption-service" class="text-2xl font-bold mt-12 mb-4">Encryption Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle AES-256-CBC encryption for direct payments:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Encryption Service with Flutter:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// yagoutpay_encryption_service.dart
import 'dart:convert';
import 'dart:typed_data';
import 'package:crypto/crypto.dart';
import 'package:encrypt/encrypt.dart';

class YagoutPayEncryptionService {
  final String merchantId;
  final String encryptionKey;
  final String iv = '0123456789abcdef'; // Fixed 16-byte IV
  
  YagoutPayEncryptionService({
    required this.merchantId,
    required this.encryptionKey,
  });
  
  // AES-256-CBC Encryption for Direct Payments
  String encrypt(String data) {
    try {
      final key = Key.fromBase64(encryptionKey);
      final ivBytes = IV.fromUtf8(iv);
      final encrypter = Encrypter(AES(key, mode: AESMode.cbc));
      
      final encrypted = encrypter.encrypt(data, iv: ivBytes);
      return encrypted.base64;
    } catch (e) {
      throw Exception('Encryption failed: $e');
    }
  }
  
  // AES-256-CBC Decryption for Response Handling
  String decrypt(String encryptedData) {
    try {
      final key = Key.fromBase64(encryptionKey);
      final ivBytes = IV.fromUtf8(iv);
      final encrypter = Encrypter(AES(key, mode: AESMode.cbc));
      
      final encrypted = Encrypted.fromBase64(encryptedData);
      final decrypted = encrypter.decrypt(encrypted, iv: ivBytes);
      return decrypted;
    } catch (e) {
      throw Exception('Decryption failed: $e');
    }
  }
}</code></pre>
      </div>

      <h2 id="payment-service" class="text-2xl font-bold mt-12 mb-4">Direct Payment Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle direct payment processing:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Direct Payment Service with Flutter:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// yagoutpay_direct_service.dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class YagoutPayDirectService {
  final YagoutPayEncryptionService encryptionService;
  final String merchantId;
  final String apiUrl;
  
  YagoutPayDirectService({
    required this.merchantId,
    required String encryptionKey,
    required this.apiUrl,
  }) : encryptionService = YagoutPayEncryptionService(
         merchantId: merchantId,
         encryptionKey: encryptionKey,
       );
  
  // Build Complete Payment Data Structure
  Map<String, dynamic> buildPaymentData({
    required String orderNo,
    required String amount,
    required String email,
    required String mobile,
    String? customerName,
    String? billAddress,
    String? billCity,
    String? billState,
    String? billCountry,
    String? billZip,
  }) {
    return {
      'card_details': {
        'card_number': '',
        'expiry_month': '',
        'expiry_year': '',
        'cvv': '',
      },
      'other_details': {
        'order_no': orderNo,
        'amount': amount,
        'currency': 'ETB',
        'country': 'ETH',
      },
      'ship_details': {
        'ship_name': customerName ?? '',
        'ship_address': billAddress ?? 'N/A',
        'ship_city': billCity ?? 'Addis Ababa',
        'ship_state': billState ?? 'Addis Ababa',
        'ship_country': billCountry ?? 'ET',
        'ship_zip': billZip ?? '1000',
      },
      'txn_details': {
        'txn_type': 'SALE',
        'txn_sub_type': 'PAYMENT',
      },
      'item_details': [
        {
          'item_name': 'Payment',
          'item_amount': amount,
          'item_quantity': '1',
        }
      ],
      'cust_details': {
        'customer_name': customerName ?? '',
        'customer_email': email,
        'customer_mobile': mobile,
      },
      'pg_details': {
        'pg_id': '67ee846571e740418d688c3f',
        'paymode': 'WA',
        'scheme_id': '7',
        'wallet_type': 'telebirr',
      },
      'bill_details': {
        'bill_name': customerName ?? '',
        'bill_address': billAddress ?? 'N/A',
        'bill_city': billCity ?? 'Addis Ababa',
        'bill_state': billState ?? 'Addis Ababa',
        'bill_country': billCountry ?? 'ET',
        'bill_zip': billZip ?? '1000',
      },
    };
  }
  
  // Process Direct Payment
  Future<Map<String, dynamic>> processPayment({
    required String orderNo,
    required String amount,
    required String email,
    required String mobile,
    String? customerName,
    String? billAddress,
    String? billCity,
    String? billState,
    String? billCountry,
    String? billZip,
  }) async {
    try {
      // Step 1: Build payment data structure
      final paymentData = buildPaymentData(
        orderNo: orderNo,
        amount: amount,
        email: email,
        mobile: mobile,
        customerName: customerName,
        billAddress: billAddress,
        billCity: billCity,
        billState: billState,
        billCountry: billCountry,
        billZip: billZip,
      );
      
      // Step 2: Encrypt payment data
      final encryptedData = encryptionService.encrypt(jsonEncode(paymentData));
      
      // Step 3: Prepare API request
      final requestData = {
        'merchantId': merchantId,
        'merchantRequest': encryptedData,
      };
      
      // Step 4: Make API call
      final response = await callYagoutPayAPI(requestData);
      
      // Step 5: Handle response
      if (response['status'] == 'Success') {
        return {
          'success': true,
          'transactionId': response['transactionId'],
          'message': 'Payment processed successfully',
        };
      } else {
        return {
          'success': false,
          'error': response['statusMessage'] ?? 'Payment failed',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'error': 'Payment processing failed: $e',
      };
    }
  }
  
  // Call YagoutPay API
  Future<Map<String, dynamic>> callYagoutPayAPI(Map<String, dynamic> request) async {
    final response = await http.post(
      Uri.parse(apiUrl),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: jsonEncode(request),
    );
    
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('API call failed with status code: \${response.statusCode}');
    }
  }
  
  // Validate Payment Data
  Map<String, dynamic> validatePaymentData({
    required String amount,
    required String email,
    required String mobile,
    required String orderNo,
  }) {
    final errors = <String, String>{};
    bool isValid = true;
    
    if (amount.isEmpty || double.tryParse(amount) == null || double.parse(amount) <= 0) {
      errors['amount'] = 'Amount is required and must be greater than 0';
      isValid = false;
    }
    
    if (email.isEmpty || !RegExp(r'^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$').hasMatch(email)) {
      errors['email'] = 'Valid email is required';
      isValid = false;
    }
    
    if (mobile.isEmpty) {
      errors['mobile'] = 'Mobile number is required';
      isValid = false;
    }
    
    if (orderNo.isEmpty) {
      errors['orderNo'] = 'Order number is required';
      isValid = false;
    }
    
    return {
      'isValid': isValid,
      'errors': errors,
    };
  }
}</code></pre>
      </div>

      <h2 id="payment-controller" class="text-2xl font-bold mt-12 mb-4">Payment Controller</h2>
      <p class="leading-relaxed mb-4">Create a controller to handle payment flow in your Flutter app:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Payment Controller with Flutter:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// payment_controller.dart
import 'package:flutter/material.dart';
import 'yagoutpay_direct_service.dart';

class PaymentController extends ChangeNotifier {
  final YagoutPayDirectService paymentService;
  bool _isLoading = false;
  String? _error;
  
  PaymentController({
    required String merchantId,
    required String encryptionKey,
    required String apiUrl,
  }) : paymentService = YagoutPayDirectService(
         merchantId: merchantId,
         encryptionKey: encryptionKey,
         apiUrl: apiUrl,
       );
  
  bool get isLoading => _isLoading;
  String? get error => _error;
  
  // Process Payment
  Future<bool> processPayment({
    required String orderNo,
    required String amount,
    required String email,
    required String mobile,
    String? customerName,
    String? billAddress,
    String? billCity,
    String? billState,
    String? billCountry,
    String? billZip,
  }) async {
    try {
      _setLoading(true);
      _clearError();
      
      // Validate payment data
      final validation = paymentService.validatePaymentData(
        amount: amount,
        email: email,
        mobile: mobile,
        orderNo: orderNo,
      );
      
      if (!validation['isValid']) {
        _setError('Validation failed: \${validation['errors']}');
        return false;
      }
      
      // Process payment
      final result = await paymentService.processPayment(
        orderNo: orderNo,
        amount: amount,
        email: email,
        mobile: mobile,
        customerName: customerName,
        billAddress: billAddress,
        billCity: billCity,
        billState: billState,
        billCountry: billCountry,
        billZip: billZip,
      );
      
      if (result['success']) {
        _clearError();
        return true;
      } else {
        _setError(result['error']);
        return false;
      }
    } catch (e) {
      _setError('Payment processing failed: $e');
      return false;
    } finally {
      _setLoading(false);
    }
  }
  
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }
  
  void _setError(String error) {
    _error = error;
    notifyListeners();
  }
  
  void _clearError() {
    _error = null;
    notifyListeners();
  }
}</code></pre>
      </div>

      <h2 id="frontend-integration" class="text-2xl font-bold mt-12 mb-4">Frontend Integration</h2>
      <p class="leading-relaxed mb-4">Create a complete payment form with Flutter integration:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Payment Form with Flutter:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// payment_form.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'payment_controller.dart';

class PaymentForm extends StatefulWidget {
  @override
  _PaymentFormState createState() => _PaymentFormState();
}

class _PaymentFormState extends State<PaymentForm> {
  final _formKey = GlobalKey<FormState>();
  final _orderNoController = TextEditingController();
  final _amountController = TextEditingController();
  final _emailController = TextEditingController();
  final _mobileController = TextEditingController();
  final _customerNameController = TextEditingController();
  final _billAddressController = TextEditingController();
  final _billCityController = TextEditingController();
  final _billStateController = TextEditingController();
  final _billCountryController = TextEditingController();
  final _billZipController = TextEditingController();
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('YagoutPay Payment'),
        backgroundColor: Colors.blue,
      ),
      body: Consumer<PaymentController>(
        builder: (context, paymentController, child) {
          return Padding(
            padding: EdgeInsets.all(16.0),
            child: Form(
              key: _formKey,
              child: ListView(
                children: [
                  TextFormField(
                    controller: _orderNoController,
                    decoration: InputDecoration(
                      labelText: 'Order Number *',
                      border: OutlineInputBorder(),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Order number is required';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    controller: _amountController,
                    decoration: InputDecoration(
                      labelText: 'Amount (ETB) *',
                      border: OutlineInputBorder(),
                    ),
                    keyboardType: TextInputType.number,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Amount is required';
                      }
                      if (double.tryParse(value) == null || double.parse(value) <= 0) {
                        return 'Amount must be greater than 0';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    controller: _emailController,
                    decoration: InputDecoration(
                      labelText: 'Email *',
                      border: OutlineInputBorder(),
                    ),
                    keyboardType: TextInputType.emailAddress,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Email is required';
                      }
                      if (!RegExp(r'^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$').hasMatch(value)) {
                        return 'Valid email is required';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    controller: _mobileController,
                    decoration: InputDecoration(
                      labelText: 'Mobile Number *',
                      border: OutlineInputBorder(),
                    ),
                    keyboardType: TextInputType.phone,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Mobile number is required';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    controller: _customerNameController,
                    decoration: InputDecoration(
                      labelText: 'Customer Name',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    controller: _billAddressController,
                    decoration: InputDecoration(
                      labelText: 'Billing Address',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    controller: _billCityController,
                    decoration: InputDecoration(
                      labelText: 'Billing City',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    controller: _billStateController,
                    decoration: InputDecoration(
                      labelText: 'Billing State',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    controller: _billCountryController,
                    decoration: InputDecoration(
                      labelText: 'Billing Country',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    controller: _billZipController,
                    decoration: InputDecoration(
                      labelText: 'Billing Zip Code',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  SizedBox(height: 24),
                  if (paymentController.error != null)
                    Container(
                      padding: EdgeInsets.all(12),
                      margin: EdgeInsets.only(bottom: 16),
                      decoration: BoxDecoration(
                        color: Colors.red.shade50,
                        border: Border.all(color: Colors.red.shade200),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        paymentController.error!,
                        style: TextStyle(color: Colors.red.shade700),
                      ),
                    ),
                  ElevatedButton(
                    onPressed: paymentController.isLoading ? null : _processPayment,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                      padding: EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: paymentController.isLoading
                        ? CircularProgressIndicator(color: Colors.white)
                        : Text('Process Payment'),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
  
  Future<void> _processPayment() async {
    if (_formKey.currentState!.validate()) {
      final paymentController = Provider.of<PaymentController>(context, listen: false);
      
      final success = await paymentController.processPayment(
        orderNo: _orderNoController.text,
        amount: _amountController.text,
        email: _emailController.text,
        mobile: _mobileController.text,
        customerName: _customerNameController.text,
        billAddress: _billAddressController.text,
        billCity: _billCityController.text,
        billState: _billStateController.text,
        billCountry: _billCountryController.text,
        billZip: _billZipController.text,
      );
      
      if (success) {
        _showSuccessDialog();
      } else {
        _showErrorDialog();
      }
    }
  }
  
  void _showSuccessDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Payment Successful'),
        content: Text('Your payment has been processed successfully.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('OK'),
          ),
        ],
      ),
    );
  }
  
  void _showErrorDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Payment Failed'),
        content: Text('Your payment could not be processed. Please try again.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('OK'),
          ),
        ],
      ),
    );
  }
}</code></pre>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-green-900 mb-4">Key Implementation Points</h3>
        <ul class="text-sm text-green-800 list-disc pl-6 space-y-2">
          <li><strong>Encryption:</strong> All payment data must be encrypted using AES-256-CBC</li>
          <li><strong>API Endpoint:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">/apiRedirection/apiIntegration</code></li>
          <li><strong>Headers Required:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">Content-Type: application/json</code></li>
          <li><strong>Response Handling:</strong> All responses need to be processed for success/failure</li>
          <li><strong>Error Handling:</strong> Implement proper error handling for network and API errors</li>
          <li><strong>Validation:</strong> Validate all required fields before processing</li>
        </ul>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After implementing API integration, explore <a href="/flutter/hosted-payments" class="text-blue-600 hover:underline">Hosted Payments</a> for WebView-based payment processing.</p>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "encryption-service", title: "Encryption Service" },
      { id: "payment-service", title: "Direct Payment Service" },
      { id: "payment-controller", title: "Payment Controller" },
      { id: "frontend-integration", title: "Frontend Integration" },
    ],
  },
  "flutter/payment-links": {
    title: "Payment Links",
    description: "Generate shareable payment links for your Flutter app.",
    breadcrumbs: [
      { label: "Flutter Integration", href: "/flutter" },
      { label: "Payment Methods", href: "/payment-methods" },
      { label: "Payment Links" },
    ],
    html: `
      <p class="leading-relaxed mb-6">Payment links allow you to generate shareable payment URLs that customers can use to complete payments via SMS, email, or WhatsApp.</p>
      
      <h2 id="features" class="text-2xl font-bold mt-12 mb-4">Features</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>✅ Shareable payment URLs</li>
        <li>✅ SMS/Email integration</li>
        <li>✅ WhatsApp sharing</li>
        <li>✅ Expiry date support</li>
      </ul>

      <h2 id="implementation" class="text-2xl font-bold mt-12 mb-4">Implementation</h2>
      <p class="leading-relaxed mb-4">Create payment links with the following service:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>static Future&lt;Map&lt;String, dynamic&gt;&gt; createPaymentLink({
  required String reqUserId,
  required String amount,
  required String customerEmail,
  required String mobileNo,
  required String expiryDate,
  required String orderId,
  required String firstName,
  required String lastName,
  required String product,
  required String dialCode,
  required String failureUrl,
  required String successUrl,
  String country = 'ETH',
  String currency = 'ETB',
  List&lt;String&gt; mediaType = const ['API'],
}) async {
  final meId = YagoutPayConfig.apiMerchantId;
  final key = YagoutPayConfig.apiKey;
  
  // Build payload
  final payload = {
    'req_user_id': reqUserId,
    'me_id': meId,
    'amount': amount,
    'customer_email': customerEmail,
    'mobile_no': mobileNo,
    'expiry_date': expiryDate,
    'media_type': mediaType,
    'order_id': orderId,
    'first_name': firstName,
    'last_name': lastName,
    'product': product,
    'dial_code': dialCode,
    'failure_url': failureUrl,
    'success_url': successUrl,
    'country': country,
    'currency': currency,
  };
  
  // Encrypt payload
  final plainStr = jsonEncode(payload);
  final encrypted = AesUtil.encryptToBase64(plainStr, key);
  
  // Make API request
  final response = await http.post(
    Uri.parse(YagoutPayConfig.paymentLinkUrl),
    headers: {
      'Content-Type': 'application/json',
      'me_id': meId,
    },
    body: jsonEncode({'request': encrypted}),
  );
  
  // Process response
  final responseData = json.decode(response.body);
  
  return {
    'status': responseData['status'] ?? 'ERROR',
    'message': responseData['statusMessage'] ?? 'Unknown error',
    'order_id': orderId,
    'response': responseData,
  };
}</code></pre>
      </div>

      <h2 id="usage" class="text-2xl font-bold mt-12 mb-4">Usage in Flutter</h2>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Create payment link
Future&lt;void&gt; _createPaymentLink() async {
  final result = await YagoutPayService.createPaymentLink(
    reqUserId: 'user123',
    amount: '100.00',
    customerEmail: 'customer@example.com',
    mobileNo: '+251912345678',
    expiryDate: '2025-12-31',
    orderId: 'ORDER-123',
    firstName: 'John',
    lastName: 'Doe',
    product: 'Premium Subscription',
    dialCode: '+251',
    failureUrl: 'https://yourapp.com/failure',
    successUrl: 'https://yourapp.com/success',
  );
  
  if (result['status'] == 'SUCCESS') {
    // Share payment link
    _sharePaymentLink(result['payment_link']);
  }
}</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">Learn about <a href="/flutter/static-links" class="text-blue-600 hover:underline">Static Links</a> for QR code generation and recurring payments.</p>
      </div>
    `,
    sections: [
      { id: "features", title: "Features" },
      { id: "implementation", title: "Implementation" },
      { id: "usage", title: "Usage in Flutter" },
    ],
  },
  "flutter/test-credentials": {
    title: "Test Credentials",
    description: "YagoutPay test credentials and UAT environment setup.",
    breadcrumbs: [
      { label: "Flutter Integration", href: "/flutter" },
      { label: "Testing", href: "/testing" },
      { label: "Test Credentials" },
    ],
    html: `
      <p class="leading-relaxed mb-6">Use these test credentials to develop and test your YagoutPay Flutter integration without processing real payments.</p>
      
      <h2 id="uat-credentials" class="text-2xl font-bold mt-12 mb-4">UAT Test Credentials</h2>
      <p class="leading-relaxed mb-4">Use these credentials for development and testing:</p>
      
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <h3 class="font-semibold mb-4">Merchant Configuration</h3>
        <ul class="space-y-2 text-sm">
          <li><strong>Aggregator ID:</strong> <code class="bg-muted px-2 py-1 rounded">yagout</code></li>
          <li><strong>Merchant ID:</strong> <code class="bg-muted px-2 py-1 rounded">202508080001</code></li>
          <li><strong>API Key:</strong> <code class="bg-muted px-2 py-1 rounded">IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=</code></li>
          <li><strong>Payment Gateway ID:</strong> <code class="bg-muted px-2 py-1 rounded">67ee846571e740418d688c3f</code></li>
        </ul>
      </div>

      <h2 id="uat-urls" class="text-2xl font-bold mt-12 mb-4">UAT URLs</h2>
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <h3 class="font-semibold mb-4">API Endpoints</h3>
        <ul class="space-y-2 text-sm">
          <li><strong>Hosted Payment:</strong> <code class="bg-muted px-2 py-1 rounded">https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/paymentRedirection/checksumGatewayPage</code></li>
          <li><strong>API Integration:</strong> <code class="bg-muted px-2 py-1 rounded">https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration</code></li>
          <li><strong>Payment Links:</strong> <code class="bg-muted px-2 py-1 rounded">https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/paymentByLinkResponse</code></li>
          <li><strong>Static Links:</strong> <code class="bg-muted px-2 py-1 rounded">https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/staticQRPaymentResponse</code></li>
        </ul>
      </div>

      <h2 id="test-parameters" class="text-2xl font-bold mt-12 mb-4">Test Parameters</h2>
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <h3 class="font-semibold mb-4">Payment Gateway Details</h3>
        <ul class="space-y-2 text-sm">
          <li><strong>Pay Mode:</strong> <code class="bg-muted px-2 py-1 rounded">WA</code></li>
          <li><strong>Scheme ID:</strong> <code class="bg-muted px-2 py-1 rounded">7</code></li>
          <li><strong>Wallet Type:</strong> <code class="bg-muted px-2 py-1 rounded">telebirr</code></li>
          <li><strong>Currency:</strong> <code class="bg-muted px-2 py-1 rounded">ETB</code></li>
          <li><strong>Country:</strong> <code class="bg-muted px-2 py-1 rounded">ETH</code></li>
        </ul>
      </div>

      <h2 id="test-urls" class="text-2xl font-bold mt-12 mb-4">Test URLs</h2>
      <p class="leading-relaxed mb-4">Use these URLs for testing success and failure scenarios:</p>
      
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <ul class="space-y-2 text-sm">
          <li><strong>Success URL:</strong> <code class="bg-muted px-2 py-1 rounded">https://httpbin.org/status/200</code></li>
          <li><strong>Failure URL:</strong> <code class="bg-muted px-2 py-1 rounded">https://httpbin.org/status/400</code></li>
        </ul>
      </div>

      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-yellow-900 mb-2">IMPORTANT</h3>
        <p class="text-sm text-yellow-800">These are test credentials only. Never use them in production. Switch to production credentials when going live.</p>
      </div>
    `,
    sections: [
      { id: "uat-credentials", title: "UAT Test Credentials" },
      { id: "uat-urls", title: "UAT URLs" },
      { id: "test-parameters", title: "Test Parameters" },
      { id: "test-urls", title: "Test URLs" },
    ],
  },
  "get-started": {
    title: "Welcome to YagoutPay Documentation",
    description: "Your complete guide to integrating YagoutPay payment processing across multiple platforms and frameworks.",
    breadcrumbs: [{ label: "Get Started" }],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Welcome to the comprehensive YagoutPay documentation. This guide covers everything you need to integrate secure payment processing across multiple platforms and frameworks.</p>
      </div>

      <h2 id="what-youll-find" class="text-2xl font-bold mt-12 mb-4">What You'll Find Here</h2>
      <p class="mb-6">Our documentation is organized to help you quickly find what you need, whether you're just getting started or looking for advanced implementation details.</p>

      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 class="font-semibold text-blue-900 mb-2">🚀 Quick Start Guides</h3>
          <p class="text-sm text-blue-800 mb-3">Get up and running quickly with step-by-step installation and configuration guides for each platform.</p>
          <ul class="text-sm text-blue-800 space-y-1">
            <li>• Flutter Integration</li>
            <li>• React Native Integration</li>
            <li>• JavaScript Integration</li>
            <li>• Laravel Integration</li>
            <li>• Node.js Integration</li>
            <li>• Java Integration</li>
            <li>• WordPress Integration</li>
            <li>• WooCommerce Integration</li>
          </ul>
        </div>

        <div class="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 class="font-semibold text-green-900 mb-2">💳 Payment Methods</h3>
          <p class="text-sm text-green-800 mb-3">Choose the right integration approach for your needs with detailed guides for each payment method.</p>
          <ul class="text-sm text-green-800 space-y-1">
            <li>• Hosted Checkout - Quick and secure</li>
            <li>• Direct API Integration - Full control</li>
            <li>• Payment Links - Easy sharing</li>
            <li>• Static Links - QR codes and recurring</li>
          </ul>
        </div>

        <div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 class="font-semibold text-purple-900 mb-2">🔧 Implementation Details</h3>
          <p class="text-sm text-purple-800 mb-3">Deep dive into technical implementation with code examples, encryption details, and security best practices.</p>
          <ul class="text-sm text-purple-800 space-y-1">
            <li>• AES-256-CBC Encryption</li>
            <li>• API Authentication</li>
            <li>• Webhook Handling</li>
            <li>• Error Handling</li>
            <li>• Testing & Debugging</li>
          </ul>
        </div>

        <div class="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 class="font-semibold text-orange-900 mb-2">📚 Resources & Support</h3>
          <p class="text-sm text-orange-800 mb-3">Everything you need to succeed with YagoutPay integration and get help when you need it.</p>
          <ul class="text-sm text-orange-800 space-y-1">
            <li>• Video Tutorials</li>
            <li>• SDK Downloads</li>
            <li>• Test Credentials</li>
            <li>• Common Issues & Solutions</li>
            <li>• Support Resources</li>
          </ul>
        </div>
      </div>

      <h2 id="getting-started" class="text-2xl font-bold mt-12 mb-4">Getting Started</h2>
      <p class="mb-6">Ready to integrate YagoutPay? Here's how to get started:</p>
      
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-gray-900 mb-4">Step 1: Choose Your Platform</h3>
        <p class="text-sm text-gray-700 mb-4">Select the integration method that best fits your application:</p>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="text-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <h4 class="font-medium text-gray-900 mb-1">Mobile Apps</h4>
            <p class="text-xs text-gray-600">Flutter, React Native</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h4 class="font-medium text-gray-900 mb-1">Web Applications</h4>
            <p class="text-xs text-gray-600">JavaScript, Laravel, Node.js, Java</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <h4 class="font-medium text-gray-900 mb-1">CMS & E-commerce</h4>
            <p class="text-xs text-gray-600">WordPress, WooCommerce</p>
          </div>
        </div>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">Step 2: Choose Integration Method</h3>
        <p class="text-sm text-blue-800 mb-4">Decide how you want to integrate payments:</p>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-medium text-blue-900 mb-2">🏪 Hosted Checkout</h4>
            <p class="text-sm text-blue-800">Quick setup, PCI compliant, redirects to YagoutPay's secure payment page.</p>
          </div>
          <div>
            <h4 class="font-medium text-blue-900 mb-2">⚡ Direct API</h4>
            <p class="text-sm text-blue-800">Full control, seamless UX, process payments directly in your app.</p>
          </div>
          <div>
            <h4 class="font-medium text-blue-900 mb-2">🔗 Payment Links</h4>
            <p class="text-sm text-blue-800">Easy sharing, generate shareable URLs for invoices and payments.</p>
          </div>
          <div>
            <h4 class="font-medium text-blue-900 mb-2">📱 Static Links</h4>
            <p class="text-sm text-blue-800">QR codes, recurring payments, perfect for mobile and offline scenarios.</p>
          </div>
        </div>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 class="font-semibold text-green-900 mb-2">Step 3: Get Your Credentials</h3>
        <p class="text-sm text-green-800 mb-3">You'll need your YagoutPay credentials to get started:</p>
        <ul class="text-sm text-green-800 space-y-1">
          <li>• <strong>Merchant ID:</strong> Your unique merchant identifier</li>
          <li>• <strong>Encryption Key:</strong> For secure data transmission</li>
          <li>• <strong>API URLs:</strong> Test and production endpoints</li>
        </ul>
        <p class="text-sm text-green-800 mt-3">
          <a href="https://yagoutpay.com/merchant-portal/" target="_blank" rel="noopener noreferrer" class="text-green-600 hover:text-green-800 font-medium">
            Get your credentials from the YagoutPay Merchant Portal →
          </a>
        </p>
      </div>

      <h2 id="next-steps" class="text-2xl font-bold mt-12 mb-4">Next Steps</h2>
      <p class="mb-6">Ready to dive in? Here are some recommended starting points:</p>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold text-gray-900 mb-2">📖 Start with Integration Methods</h3>
          <p class="text-sm text-gray-600 mb-3">Understand the different ways to integrate YagoutPay and choose the best approach for your needs.</p>
          <a href="/integration-methods" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Explore Integration Methods →</a>
        </div>
        
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold text-gray-900 mb-2">🎥 Watch Video Tutorials</h3>
          <p class="text-sm text-gray-600 mb-3">See YagoutPay integration in action with our comprehensive video guides.</p>
          <p class="text-sm text-gray-500">Check the video guides in the right sidebar →</p>
        </div>
        
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold text-gray-900 mb-2">💻 Download SDKs</h3>
          <p class="text-sm text-gray-600 mb-3">Get the latest SDKs and code examples for your preferred platform.</p>
          <p class="text-sm text-gray-500">Use the SDK dropdown in the top navigation →</p>
        </div>
        
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold text-gray-900 mb-2">🧪 Test Your Integration</h3>
          <p class="text-sm text-gray-600 mb-3">Use our test credentials and sandbox environment to verify your integration.</p>
          <a href="/flutter/test-credentials" class="text-blue-600 hover:text-blue-800 text-sm font-medium">View Test Credentials →</a>
        </div>
      </div>
    `,
    sections: [
      { id: "what-youll-find", title: "What You'll Find Here" },
      { id: "getting-started", title: "Getting Started" },
      { id: "next-steps", title: "Next Steps" },
    ],
  },
  flutter: {
    title: "Flutter Integration",
    description: "Complete YagoutPay Flutter integration guide with comprehensive implementation details for mobile payment processing.",
    breadcrumbs: [{ label: "Flutter Integration" }],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Complete guide to integrating YagoutPay payments in your Flutter applications with comprehensive implementation details, encryption services, and multiple payment methods for seamless mobile payment processing.</p>
      </div>
      
      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">YagoutPay provides comprehensive Flutter integration with multiple payment methods, AES-256-CBC encryption, WebView integration, and seamless user experience for mobile applications.</p>
      
      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-green-900 mb-4">Flutter Integration Features</h3>
        <ul class="text-sm text-green-800 list-disc pl-6 space-y-2">
          <li><strong>Multiple Payment Methods:</strong> Hosted payments, direct API, and payment links</li>
          <li><strong>WebView Integration:</strong> Seamless hosted payment experience</li>
          <li><strong>AES-256-CBC Encryption:</strong> Secure payment data transmission</li>
          <li><strong>Cross-Platform:</strong> Works on both iOS and Android</li>
          <li><strong>Real-time Processing:</strong> Direct API integration for instant payments</li>
          <li><strong>Payment Links:</strong> Generate shareable payment URLs</li>
        </ul>
      </div>
      
      <h2 id="getting-started" class="text-2xl font-bold mt-12 mb-4">Getting Started</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><a href="/flutter/installation" class="text-primary hover:underline">Install dependencies</a></li>
        <li><a href="/flutter/configuration" class="text-primary hover:underline">Configure credentials</a></li>
        <li><a href="/flutter/hosted-payments" class="text-primary hover:underline">Choose integration method</a></li>
        <li><a href="/flutter/first-payment" class="text-primary hover:underline">Process first payment</a></li>
      </ol>

      <h2 id="integration-methods" class="text-2xl font-bold mt-12 mb-4">Integration Methods</h2>
      <div class="grid md:grid-cols-3 gap-6 mb-6">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Hosted Payments</h3>
          <p class="text-sm text-gray-700 mb-3">Redirect customers to YagoutPay's secure payment page using WebView integration.</p>
          <a href="/flutter/hosted-payments" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">API Integration</h3>
          <p class="text-sm text-gray-700 mb-3">Process payments directly in your app with custom payment forms and real-time processing.</p>
          <a href="/flutter/api-integration" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Payment Links</h3>
          <p class="text-sm text-gray-700 mb-3">Generate shareable payment URLs for SMS, email, or WhatsApp payments.</p>
          <a href="/flutter/payment-links" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">Quick Start</h3>
        <p class="text-sm text-blue-800">Ready to get started? <a href="/flutter/installation" class="text-blue-600 hover:underline">Install the dependencies</a> and have payments working in your Flutter app in minutes!</p>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "getting-started", title: "Getting Started" },
      { id: "integration-methods", title: "Integration Methods" },
    ],
  },
  api: {
    title: "API Reference",
    description: "YagoutPay API documentation and reference.",
    breadcrumbs: [{ label: "API Reference" }],
    html: `
      <p class="leading-relaxed mb-6">Complete API reference for YagoutPay integration.</p>
      
      <h2 id="authentication" class="text-2xl font-bold mt-12 mb-4">Authentication</h2>
      <p class="leading-relaxed mb-4">All API requests require authentication using your API key.</p>
      
      <h2 id="endpoints" class="text-2xl font-bold mt-12 mb-4">Endpoints</h2>
      <p class="leading-relaxed mb-4">Available API endpoints for payment processing.</p>
    `,
    sections: [
      { id: "authentication", title: "Authentication" },
      { id: "endpoints", title: "Endpoints" },
    ],
  },
  testing: {
    title: "Testing",
    description: "Testing guide for YagoutPay integration.",
    breadcrumbs: [{ label: "Testing" }],
    html: `
      <p class="leading-relaxed mb-6">Comprehensive testing guide for your YagoutPay integration.</p>
      
      <h2 id="test-environment" class="text-2xl font-bold mt-12 mb-4">Test Environment</h2>
      <p class="leading-relaxed mb-4">Use the UAT environment for development and testing.</p>
      
      <h2 id="test-credentials" class="text-2xl font-bold mt-12 mb-4">Test Credentials</h2>
      <p class="leading-relaxed mb-4">View test credentials and configuration details.</p>
    `,
    sections: [
      { id: "test-environment", title: "Test Environment" },
      { id: "test-credentials", title: "Test Credentials" },
    ],
  },
  support: {
    title: "Support",
    description: "Get help with YagoutPay integration.",
    breadcrumbs: [{ label: "Support" }],
    html: `
      <p class="leading-relaxed mb-6">Get help and support for your YagoutPay integration.</p>
      
      <h2 id="contact-support" class="text-2xl font-bold mt-12 mb-4">Contact Support</h2>
      <p class="leading-relaxed mb-4">Reach out to our support team for assistance.</p>
      
      <h2 id="documentation" class="text-2xl font-bold mt-12 mb-4">Documentation</h2>
      <p class="leading-relaxed mb-4">Comprehensive documentation and guides.</p>
    `,
    sections: [
      { id: "contact-support", title: "Contact Support" },
      { id: "documentation", title: "Documentation" },
    ],
  },
  "react-native": {
    title: "React Native Integration",
    description: "Complete YagoutPay React Native integration guide.",
    breadcrumbs: [{ label: "React Native Integration" }],
    html: `
      <p class="leading-relaxed mb-6">Complete guide to integrating YagoutPay payments in your React Native applications with support for hosted payments, API integration, and payment links.</p>
      
      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">YagoutPay provides comprehensive React Native integration with multiple payment methods and seamless user experience using WebView and direct API calls.</p>
      
      <h2 id="getting-started" class="text-2xl font-bold mt-12 mb-4">Getting Started</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><a href="/react-native/installation" class="text-primary hover:underline">Install dependencies</a></li>
        <li><a href="/react-native/configuration" class="text-primary hover:underline">Configure credentials</a></li>
        <li><a href="/react-native/hosted-payments" class="text-primary hover:underline">Choose integration method</a></li>
      </ol>

      <h2 id="integration-methods" class="text-2xl font-bold mt-12 mb-4">Integration Methods</h2>
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Hosted Payments</h3>
          <p class="text-sm text-gray-700 mb-3">Redirect customers to YagoutPay's secure payment page using WebView.</p>
          <a href="/react-native/hosted-payments" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">API Integration</h3>
          <p class="text-sm text-gray-700 mb-3">Process payments directly through API calls.</p>
          <a href="/react-native/api-integration" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Payment Links</h3>
          <p class="text-sm text-gray-700 mb-3">Generate shareable payment URLs.</p>
          <a href="/react-native/payment-links" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">WebView Integration</h3>
          <p class="text-sm text-gray-700 mb-3">Handle payment flows within your app.</p>
          <a href="/react-native/webview-integration" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "getting-started", title: "Getting Started" },
      { id: "integration-methods", title: "Integration Methods" },
    ],
  },
  "react-native/installation": {
    title: "React Native Installation",
    description:
      "Install YagoutPay React Native SDK and set up your development environment.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "React Native Integration", href: "/react-native" },
      { label: "Installation" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay React Native SDK provides seamless payment integration for React Native applications with support for hosted payments, API integration, and payment links.</p>
      </div>
      
      <div class="flex items-start gap-3 mb-8">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Follow this step-by-step guide to integrate YagoutPay payments into your React Native application with minimal setup.</p>
      </div>

      <h2 id="prerequisites" class="text-2xl font-bold mt-12 mb-4">Prerequisites</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>React Native 0.60 or higher</li>
        <li>Node.js 14 or higher</li>
        <li>YagoutPay merchant account</li>
        <li>Valid API credentials</li>
      </ul>

      <h2 id="install-sdk" class="text-2xl font-bold mt-12 mb-4">Install YagoutPay SDK</h2>
      <p class="leading-relaxed mb-4">Install the YagoutPay React Native SDK using npm or yarn:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># Using npm
npm install yagoutpay-sdk

# Using yarn
yarn add yagoutpay-sdk

# For React Native WebView integration
npm install react-native-webview</code></pre>
      </div>

      <h2 id="ios-setup" class="text-2xl font-bold mt-12 mb-4">iOS Setup</h2>
      <p class="leading-relaxed mb-4">For iOS, you need to add permissions to your Info.plist:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;key&gt;NSAppTransportSecurity&lt;/key&gt;
&lt;dict&gt;
    &lt;key&gt;NSAllowsArbitraryLoads&lt;/key&gt;
    &lt;true/&gt;
&lt;/dict&gt;</code></pre>
      </div>

      <h2 id="android-setup" class="text-2xl font-bold mt-12 mb-4">Android Setup</h2>
      <p class="leading-relaxed mb-4">For Android, add internet permission to your AndroidManifest.xml:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;uses-permission android:name="android.permission.INTERNET" /&gt;</code></pre>
      </div>

      <h2 id="import-sdk" class="text-2xl font-bold mt-12 mb-4">Import SDK</h2>
      <p class="leading-relaxed mb-4">Import the YagoutPay SDK in your React Native component:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>import { YagoutPay, YagoutPayWebView } from 'yagoutpay-sdk';
import { WebView } from 'react-native-webview';</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After installation, proceed to <a href="/react-native/configuration" class="text-blue-600 hover:underline">Configuration</a> to set up your YagoutPay credentials and start processing payments.</p>
      </div>
    `,
    sections: [
      { id: "prerequisites", title: "Prerequisites" },
      { id: "install-sdk", title: "Install SDK" },
      { id: "ios-setup", title: "iOS Setup" },
      { id: "android-setup", title: "Android Setup" },
      { id: "import-sdk", title: "Import SDK" },
    ],
  },
  "react-native/configuration": {
    title: "React Native Configuration",
    description:
      "Set up YagoutPay configuration and credentials for your React Native app.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "React Native Integration", href: "/react-native" },
      { label: "Configuration" },
    ],
    html: `
      <p class="leading-relaxed mb-6">Configure your YagoutPay React Native integration with the proper credentials and environment settings. This guide covers both UAT and production configurations.</p>
      
      <h2 id="create-config" class="text-2xl font-bold mt-12 mb-4">Create Configuration File</h2>
      <p class="leading-relaxed mb-4">Create <code class="bg-muted px-2 py-1 rounded text-sm font-mono">src/config/YagoutPayConfig.js</code>:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>export const YagoutPayConfig = {
  // Environment Toggle
  useUat: true, // Set to false for production
  
  // UAT URLs
  hostedUatUrl: 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/paymentRedirection/checksumGatewayPage',
  apiUatUrl: 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration',
  paymentLinkUatUrl: 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/paymentByLinkResponse',
  staticLinkUatUrl: 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/staticQRPaymentResponse',
  
  // Test Credentials (UAT)
  aggregatorId: 'yagout',
  hostedMerchantId: '202508080001',
  hostedKey: 'IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=',
  apiMerchantId: '202508080001',
  apiKey: 'IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=',
  
  // Payment Gateway Details
  pgId: '67ee846571e740418d688c3f',
  paymode: 'WA',
  schemeId: '7',
  walletType: 'telebirr',
  
  // Default Values
  defaultCurrency: 'ETB',
  defaultCountry: 'ETH',
  defaultChannel: 'MOBILE',
  defaultTransactionType: 'SALE',
  
  // Dynamic URLs based on environment
  get hostedUrl() {
    return this.useUat ? this.hostedUatUrl : this.hostedProductionUrl;
  },
  get apiUrl() {
    return this.useUat ? this.apiUatUrl : this.apiProductionUrl;
  },
};</code></pre>
      </div>

      <h2 id="initialize-sdk" class="text-2xl font-bold mt-12 mb-4">Initialize SDK</h2>
      <p class="leading-relaxed mb-4">Initialize the YagoutPay SDK in your app:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>import { YagoutPay } from 'yagoutpay-sdk';
import { YagoutPayConfig } from './config/YagoutPayConfig';

// Initialize YagoutPay
const yagoutPay = new YagoutPay({
  merchantId: YagoutPayConfig.apiMerchantId,
  encryptionKey: YagoutPayConfig.apiKey,
  environment: YagoutPayConfig.useUat ? 'test' : 'production'
});</code></pre>
      </div>

      <h2 id="test-credentials" class="text-2xl font-bold mt-12 mb-4">Test Credentials</h2>
      <p class="leading-relaxed mb-4">Use these credentials for development and testing:</p>
      
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <ul class="space-y-2 text-sm">
          <li><strong>Merchant ID:</strong> 202508080001</li>
          <li><strong>API Key:</strong> IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=</li>
          <li><strong>Aggregator ID:</strong> yagout</li>
          <li><strong>Payment Gateway ID:</strong> 67ee846571e740418d688c3f</li>
        </ul>
      </div>

      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-yellow-900 mb-2">IMPORTANT</h3>
        <p class="text-sm text-yellow-800">Always use UAT environment for testing. Switch to production only when ready to go live.</p>
      </div>
    `,
    sections: [
      { id: "create-config", title: "Create Configuration File" },
      { id: "initialize-sdk", title: "Initialize SDK" },
      { id: "test-credentials", title: "Test Credentials" },
    ],
  },
  "react-native/hosted-payments": {
    title: "React Native Hosted Payments",
    description:
      "Integrate YagoutPay hosted payment processing in your React Native app.",
    breadcrumbs: [
      { label: "React Native Integration", href: "/react-native" },
      { label: "Payment Methods", href: "/payment-methods" },
      { label: "Hosted Payments" },
    ],
    html: `
      <p class="leading-relaxed mb-6">Hosted payments redirect customers to YagoutPay's secure payment page using WebView, providing a seamless checkout experience with minimal integration effort.</p>
      
      <h2 id="features" class="text-2xl font-bold mt-12 mb-4">Features</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>✅ Secure WebView-based payment flow</li>
        <li>✅ Automatic form submission with encrypted data</li>
        <li>✅ URL monitoring for payment completion</li>
        <li>✅ Minimal PCI compliance requirements</li>
        <li>✅ Support for multiple payment methods</li>
      </ul>

      <h2 id="implementation" class="text-2xl font-bold mt-12 mb-4">Implementation</h2>
      <p class="leading-relaxed mb-4">Create your hosted payment service:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>import { YagoutPay } from 'yagoutpay-sdk';
import { YagoutPayConfig } from '../config/YagoutPayConfig';

class YagoutPayService {
  static async payViaHosted({
    orderNo,
    amount,
    successUrl,
    failureUrl,
    email,
    mobile,
    customerName,
    country = 'ETH',
    currency = 'ETB',
    channel = 'MOBILE',
    transactionType = 'SALE',
  }) {
    // Generate unique order ID
    const uniqueOrderNo = this.generateUniqueOrderId(orderNo);
    
    // Build payment data sections
    const txnDetails = [
      YagoutPayConfig.aggregatorId,
      YagoutPayConfig.hostedMerchantId,
      uniqueOrderNo,
      amount,
      country,
      currency,
      transactionType,
      successUrl,
      failureUrl,
      channel,
    ].join('|');
    
    // Build other sections
    const custDetails = [customerName || '', email, mobile, '', 'Y'].join('|');
    const pgDetails = [YagoutPayConfig.pgId, YagoutPayConfig.paymode, YagoutPayConfig.schemeId, YagoutPayConfig.walletType].join('|');
    
    // Combine all sections
    const allValues = [txnDetails, pgDetails, custDetails].join('~');
    
    // Encrypt data
    const paddedData = this.padForZeroPadding(allValues);
    const merchantRequest = this.encryptToBase64(paddedData, YagoutPayConfig.hostedKey);
    const hash = this.generateHash(paddedData, YagoutPayConfig.hostedKey);
    
    // Generate HTML form
    const html = \`
    <!DOCTYPE html>
    <html>
      <body onload="document.forms[0].submit()">
        <form action="\${YagoutPayConfig.hostedUrl}" method="POST">
          <input type="hidden" name="merchantId" value="\${YagoutPayConfig.hostedMerchantId}">
          <input type="hidden" name="merchantRequest" value="\${merchantRequest}">
          <input type="hidden" name="hash" value="\${hash}">
        </form>
      </body>
    </html>
    \`;
    
    return {
      status: 'SUCCESS',
      html: html,
      orderId: uniqueOrderNo,
    };
  }
}</code></pre>
      </div>

      <h2 id="webview-integration" class="text-2xl font-bold mt-12 mb-4">WebView Integration</h2>
      <p class="leading-relaxed mb-4">Create a WebView component to handle the payment flow:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { YagoutPayService } from '../services/YagoutPayService';

const YagoutPayWebViewScreen = ({ navigation, route }) => {
  const [showWebView, setShowWebView] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  const processHostedPayment = async () => {
    try {
      const result = await YagoutPayService.payViaHosted({
        orderNo: 'ORDER-123',
        amount: '100.00',
        successUrl: 'https://yourapp.com/success',
        failureUrl: 'https://yourapp.com/failure',
        email: 'customer@example.com',
        mobile: '+251912345678',
        customerName: 'John Doe',
      });
      
      if (result.status === 'SUCCESS') {
        setHtmlContent(result.html);
        setShowWebView(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Payment initialization failed');
    }
  };

  const handleNavigationStateChange = (navState) => {
    const { url } = navState;
    
    // Check for success URL
    if (url.includes('success') || url.includes('payment_success')) {
      setShowWebView(false);
      navigation.navigate('PaymentSuccess', { orderId: 'ORDER-123' });
    }
    
    // Check for failure URL
    if (url.includes('failure') || url.includes('payment_failed')) {
      setShowWebView(false);
      navigation.navigate('PaymentFailure', { orderId: 'ORDER-123' });
    }
  };

  return (
    <View style={styles.container}>
      {showWebView ? (
        <WebView
          source={{ html: htmlContent }}
          onNavigationStateChange={handleNavigationStateChange}
          style={styles.webview}
        />
      ) : (
        <View style={styles.content}>
          {/* Your payment UI */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default YagoutPayWebViewScreen;</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">Learn about <a href="/react-native/api-integration" class="text-blue-600 hover:underline">API Integration</a> for direct payment processing without WebView.</p>
      </div>
    `,
    sections: [
      { id: "features", title: "Features" },
      { id: "implementation", title: "Implementation" },
      { id: "webview-integration", title: "WebView Integration" },
    ],
  },
  "react-native/api-integration": {
    title: "React Native API Integration",
    description:
      "Direct API integration for seamless payment processing in your React Native app.",
    breadcrumbs: [
      { label: "React Native Integration", href: "/react-native" },
      { label: "Payment Methods", href: "/payment-methods" },
      { label: "API Integration" },
    ],
    html: `
      <p class="leading-relaxed mb-6">API integration allows you to process payments directly through YagoutPay's API without redirecting customers to external pages. Perfect for TeleBirr wallet payments and seamless user experiences.</p>
      
      <h2 id="features" class="text-2xl font-bold mt-12 mb-4">Features</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>✅ Direct API calls without WebView</li>
        <li>✅ TeleBirr wallet integration</li>
        <li>✅ Real-time payment processing</li>
        <li>✅ Encrypted request/response handling</li>
        <li>✅ Immediate payment confirmation</li>
      </ul>

      <h2 id="implementation" class="text-2xl font-bold mt-12 mb-4">Implementation</h2>
      <p class="leading-relaxed mb-4">Create your API integration service:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>import { YagoutPayConfig } from '../config/YagoutPayConfig';

class YagoutPayAPIService {
  static async payViaApi({
    orderNo,
    amount,
    successUrl,
    failureUrl,
    email,
    mobile,
    customerName,
    country = 'ETH',
    currency = 'ETB',
    channel = 'API',
    transactionType = 'SALE',
  }) {
    const meId = YagoutPayConfig.apiMerchantId;
    const key = YagoutPayConfig.apiKey;
    
    // Build API payload
    const plain = {
      card_details: {
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        cardName: ''
      },
      txn_details: {
        agId: YagoutPayConfig.aggregatorId,
        meId: meId,
        orderNo: orderNo,
        amount: amount,
        country: country,
        currency: currency,
        transactionType: transactionType,
        sucessUrl: successUrl, // Note: YagoutPay uses 'sucessUrl' (sic)
        failureUrl: failureUrl,
        channel: channel,
      },
      cust_details: {
        customerName: customerName || '',
        emailId: email,
        mobileNumber: mobile,
        uniqueId: '',
        isLoggedIn: 'Y'
      },
      pg_details: {
        pg_Id: YagoutPayConfig.pgId,
        paymode: YagoutPayConfig.paymode,
        scheme_Id: YagoutPayConfig.schemeId,
        wallet_type: YagoutPayConfig.walletType,
      },
    };
    
    // Encrypt payload
    const plainStr = JSON.stringify(plain);
    const encrypted = this.encryptToBase64(plainStr, key);
    
    // Make API request
    const response = await fetch(YagoutPayConfig.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        merchantId: meId,
        merchantRequest: encrypted,
      }),
    });
    
    // Process response
    const responseData = await response.json();
    const status = responseData.status || '';
    const statusMessage = responseData.statusMessage || '';
    
    return {
      status: status,
      statusMessage: statusMessage,
      response: responseData,
    };
  }
}</code></pre>
      </div>

      <h2 id="usage" class="text-2xl font-bold mt-12 mb-4">Usage in React Native</h2>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { YagoutPayAPIService } from '../services/YagoutPayAPIService';

const PaymentScreen = () => {
  const [loading, setLoading] = useState(false);

  const processApiPayment = async () => {
    setLoading(true);
    try {
      const result = await YagoutPayAPIService.payViaApi({
        orderNo: 'ORDER-123',
        amount: '100.00',
        successUrl: 'https://yourapp.com/success',
        failureUrl: 'https://yourapp.com/failure',
        email: 'customer@example.com',
        mobile: '+251912345678',
        customerName: 'John Doe',
      });
      
      if (result.status === 'Success') {
        Alert.alert('Success', 'Payment completed successfully!');
      } else {
        Alert.alert('Error', result.statusMessage || 'Payment failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={processApiPayment}
        disabled={loading}
        style={{
          backgroundColor: '#007AFF',
          padding: 15,
          borderRadius: 8,
          minWidth: 200,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {loading ? 'Processing...' : 'Pay with TeleBirr'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">Learn about <a href="/react-native/payment-links" class="text-blue-600 hover:underline">Payment Links</a> for generating shareable payment URLs.</p>
      </div>
    `,
    sections: [
      { id: "features", title: "Features" },
      { id: "implementation", title: "Implementation" },
      { id: "usage", title: "Usage in React Native" },
    ],
  },
  "react-native/payment-links": {
    title: "React Native Payment Links",
    description: "Generate shareable payment links for your React Native app.",
    breadcrumbs: [
      { label: "React Native Integration", href: "/react-native" },
      { label: "Payment Methods", href: "/payment-methods" },
      { label: "Payment Links" },
    ],
    html: `
      <p class="leading-relaxed mb-6">Payment Link integration allows you to create shareable payment links for dynamic transactions. Perfect for invoicing, e-commerce, and payment collection scenarios.</p>
      
      <h2 id="features" class="text-2xl font-bold mt-12 mb-4">Features</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>✅ Dynamic payment link generation</li>
        <li>✅ Shareable payment URLs</li>
        <li>✅ Expiry date management</li>
        <li>✅ Multiple media type support</li>
        <li>✅ QR code generation for static links</li>
      </ul>

      <h2 id="implementation" class="text-2xl font-bold mt-12 mb-4">Implementation</h2>
      <p class="leading-relaxed mb-4">Create payment links with the following service:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>class YagoutPayLinkService {
  static async createPaymentLink({
    reqUserId,
    amount,
    customerEmail,
    mobileNo,
    expiryDate,
    orderId,
    firstName,
    lastName,
    product,
    dialCode,
    failureUrl,
    successUrl,
    country = 'ETH',
    currency = 'ETB',
    mediaType = ['API'],
  }) {
    const meId = YagoutPayConfig.apiMerchantId;
    const key = YagoutPayConfig.apiKey;
    
    // Build payload
    const payload = {
      req_user_id: reqUserId,
      me_id: meId,
      amount: amount,
      customer_email: customerEmail,
      mobile_no: mobileNo,
      expiry_date: expiryDate,
      media_type: mediaType,
      order_id: orderId,
      first_name: firstName,
      last_name: lastName,
      product: product,
      dial_code: dialCode,
      failure_url: failureUrl,
      success_url: successUrl,
      country: country,
      currency: currency,
    };
    
    // Encrypt payload
    const plainStr = JSON.stringify(payload);
    const encrypted = this.encryptToBase64(plainStr, key);
    
    // Make API request
    const response = await fetch(YagoutPayConfig.paymentLinkUatUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'me_id': meId,
      },
      body: JSON.stringify({ request: encrypted }),
    });
    
    // Process response
    const responseData = await response.json();
    
    return {
      status: responseData.status || 'ERROR',
      message: responseData.statusMessage || 'Unknown error',
      order_id: orderId,
      response: responseData,
    };
  }
}</code></pre>
      </div>

      <h2 id="usage" class="text-2xl font-bold mt-12 mb-4">Usage in React Native</h2>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Share } from 'react-native';
import { YagoutPayLinkService } from '../services/YagoutPayLinkService';

const PaymentLinkScreen = () => {
  const [loading, setLoading] = useState(false);

  const createPaymentLink = async () => {
    setLoading(true);
    try {
      const result = await YagoutPayLinkService.createPaymentLink({
        reqUserId: 'user123',
        amount: '500.00',
        customerEmail: 'customer@example.com',
        mobileNo: '0965680964',
        expiryDate: '2025-12-31',
        orderId: 'ORDER_001',
        firstName: 'John',
        lastName: 'Doe',
        product: 'Premium Subscription',
        dialCode: '+251',
        failureUrl: 'https://yourapp.com/failure',
        successUrl: 'https://yourapp.com/success',
      });
      
      if (result.status === 'Success') {
        // Share the payment link
        await Share.share({
          message: \`Payment link: \${result.payment_link}\`,
          url: result.payment_link,
        });
      } else {
        Alert.alert('Error', result.message || 'Failed to create payment link');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create payment link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={createPaymentLink}
        disabled={loading}
        style={{
          backgroundColor: '#007AFF',
          padding: 15,
          borderRadius: 8,
          minWidth: 200,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {loading ? 'Creating...' : 'Create Payment Link'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentLinkScreen;</code></pre>
      </div>

      <h2 id="static-links" class="text-2xl font-bold mt-12 mb-4">Static Links for QR Codes</h2>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Create static link for QR code
const createStaticLink = async () => {
  const result = await YagoutPayLinkService.createStaticLink({
    reqUserId: 'user123',
    amount: '500.00',
    customerEmail: 'customer@example.com',
    mobileNo: '0965680964',
    expiryDate: '2025-12-31',
    orderId: 'STATIC_001',
    firstName: 'John',
    lastName: 'Doe',
    product: 'Premium Subscription',
    dialCode: '+251',
    failureUrl: 'https://yourapp.com/failure',
    successUrl: 'https://yourapp.com/success',
  });
  
  if (result.status === 'Success') {
    console.log('Static link created:', result.payment_link);
    // Generate QR code from the link
  }
};</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">Learn about <a href="/react-native/webview-integration" class="text-blue-600 hover:underline">WebView Integration</a> for handling payment flows in your app.</p>
      </div>
    `,
    sections: [
      { id: "features", title: "Features" },
      { id: "implementation", title: "Implementation" },
      { id: "usage", title: "Usage in React Native" },
      { id: "static-links", title: "Static Links for QR Codes" },
    ],
  },
  javascript: {
    title: "JavaScript Integration",
    description: "Complete YagoutPay JavaScript integration guide.",
    breadcrumbs: [{ label: "JavaScript Integration" }],
    html: `
      <p class="leading-relaxed mb-6">Complete guide to integrating YagoutPay payments in your JavaScript applications with support for direct payment integration, payment link generation, and payment widget integration.</p>
      
      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">YagoutPay provides comprehensive JavaScript integration with multiple payment methods and seamless user experience for web applications.</p>
      
      <h2 id="getting-started" class="text-2xl font-bold mt-12 mb-4">Getting Started</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><a href="/javascript/installation" class="text-primary hover:underline">Install YagoutPay SDK</a></li>
        <li><a href="/javascript/configuration" class="text-primary hover:underline">Configure credentials</a></li>
        <li><a href="/javascript/direct-payment" class="text-primary hover:underline">Choose integration method</a></li>
      </ol>

      <h2 id="integration-methods" class="text-2xl font-bold mt-12 mb-4">Integration Methods</h2>
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Direct Payment Integration</h3>
          <p class="text-sm text-gray-700 mb-3">Process payments directly in your JavaScript application.</p>
          <a href="/javascript/direct-payment" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Payment Link Generation</h3>
          <p class="text-sm text-gray-700 mb-3">Generate shareable payment URLs.</p>
          <a href="/javascript/payment-links" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Payment Widget Integration</h3>
          <p class="text-sm text-gray-700 mb-3">Use pre-built payment widgets.</p>
          <a href="/javascript/payment-widgets" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Security & Encryption</h3>
          <p class="text-sm text-gray-700 mb-3">Secure payment data handling.</p>
          <a href="/javascript/security" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "getting-started", title: "Getting Started" },
      { id: "integration-methods", title: "Integration Methods" },
    ],
  },
  "javascript/installation": {
    title: "JavaScript Installation",
    description:
      "Install YagoutPay JavaScript SDK and set up your development environment.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "JavaScript Integration", href: "/javascript" },
      { label: "Installation" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay JavaScript SDK provides seamless payment integration for web applications with support for direct payments, payment links, and secure data handling.</p>
      </div>
      
      <div class="flex items-start gap-3 mb-8">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Follow this step-by-step guide to integrate YagoutPay payments into your JavaScript application with minimal setup.</p>
      </div>

      <h2 id="prerequisites" class="text-2xl font-bold mt-12 mb-4">Prerequisites</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Node.js 14 or higher</li>
        <li>Modern web browser with ES6+ support</li>
        <li>YagoutPay merchant account</li>
        <li>Valid API credentials</li>
      </ul>

      <h2 id="install-sdk" class="text-2xl font-bold mt-12 mb-4">Install YagoutPay SDK</h2>
      <p class="leading-relaxed mb-4">Install the YagoutPay JavaScript SDK using npm or yarn:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># Using npm
npm install yagoutpay-sdk

# Using yarn
yarn add yagoutpay-sdk

# For browser usage
npm install yagoutpay-sdk-browser</code></pre>
      </div>

      <h2 id="browser-setup" class="text-2xl font-bold mt-12 mb-4">Browser Setup</h2>
      <p class="leading-relaxed mb-4">For browser usage, include the SDK via CDN or build it into your project:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;!-- Via CDN --&gt;
&lt;script src="https://cdn.yagoutpay.com/sdk/yagoutpay-sdk.min.js"&gt;&lt;/script&gt;

&lt;!-- Or import in your JavaScript --&gt;
import { YagoutPay } from 'yagoutpay-sdk';</code></pre>
      </div>

      <h2 id="import-sdk" class="text-2xl font-bold mt-12 mb-4">Import SDK</h2>
      <p class="leading-relaxed mb-4">Import the YagoutPay SDK in your JavaScript application:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// ES6 modules
import { YagoutPay } from 'yagoutpay-sdk';

// CommonJS
const { YagoutPay } = require('yagoutpay-sdk');

// Browser global
const yagoutPay = new YagoutPay({...});</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After installation, proceed to <a href="/javascript/configuration" class="text-blue-600 hover:underline">Configuration</a> to set up your YagoutPay credentials and start processing payments.</p>
      </div>
    `,
    sections: [
      { id: "prerequisites", title: "Prerequisites" },
      { id: "install-sdk", title: "Install SDK" },
      { id: "browser-setup", title: "Browser Setup" },
      { id: "import-sdk", title: "Import SDK" },
    ],
  },
  "javascript/configuration": {
    title: "JavaScript Configuration",
    description:
      "Set up YagoutPay configuration and credentials for your JavaScript application.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "JavaScript Integration", href: "/javascript" },
      { label: "Configuration" },
    ],
    html: `
      <p class="leading-relaxed mb-6">Configure your YagoutPay JavaScript integration with the proper credentials and environment settings. This guide covers both UAT and production configurations.</p>
      
      <h2 id="create-config" class="text-2xl font-bold mt-12 mb-4">Create Configuration File</h2>
      <p class="leading-relaxed mb-4">Create <code class="bg-muted px-2 py-1 rounded text-sm font-mono">src/config/yagoutpayConfig.js</code>:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>export const YagoutPayConfig = {
  // Environment Toggle
  useUat: true, // Set to false for production
  
  // UAT URLs
  hostedUatUrl: 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/paymentRedirection/checksumGatewayPage',
  apiUatUrl: 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration',
  paymentLinkUatUrl: 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/paymentByLinkResponse',
  staticLinkUatUrl: 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/staticQRPaymentResponse',
  
  // Test Credentials (UAT)
  aggregatorId: 'yagout',
  hostedMerchantId: '202508080001',
  hostedKey: 'IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=',
  apiMerchantId: '202508080001',
  apiKey: 'IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=',
  
  // Payment Gateway Details
  pgId: '67ee846571e740418d688c3f',
  paymode: 'WA',
  schemeId: '7',
  walletType: 'telebirr',
  
  // Default Values
  defaultCurrency: 'ETB',
  defaultCountry: 'ETH',
  defaultChannel: 'WEB',
  defaultTransactionType: 'SALE',
  
  // Dynamic URLs based on environment
  get hostedUrl() {
    return this.useUat ? this.hostedUatUrl : this.hostedProductionUrl;
  },
  get apiUrl() {
    return this.useUat ? this.apiUatUrl : this.apiProductionUrl;
  },
};</code></pre>
      </div>

      <h2 id="initialize-sdk" class="text-2xl font-bold mt-12 mb-4">Initialize SDK</h2>
      <p class="leading-relaxed mb-4">Initialize the YagoutPay SDK in your application:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>import { YagoutPay } from 'yagoutpay-sdk';
import { YagoutPayConfig } from './config/yagoutpayConfig';

// Initialize YagoutPay
const yagoutPay = new YagoutPay({
  merchantId: YagoutPayConfig.apiMerchantId,
  encryptionKey: YagoutPayConfig.apiKey,
  environment: YagoutPayConfig.useUat ? 'test' : 'production'
});

// Or initialize with custom options
const yagoutPay = new YagoutPay({
  merchantId: 'YOUR_MERCHANT_ID',
  encryptionKey: 'YOUR_ENCRYPTION_KEY',
  environment: YagoutPayEnvironment.sandbox, // or .production
});</code></pre>
      </div>

      <h2 id="test-credentials" class="text-2xl font-bold mt-12 mb-4">Test Credentials</h2>
      <p class="leading-relaxed mb-4">Use these credentials for development and testing:</p>
      
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <ul class="space-y-2 text-sm">
          <li><strong>Merchant ID:</strong> 202508080001</li>
          <li><strong>API Key:</strong> IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=</li>
          <li><strong>Aggregator ID:</strong> yagout</li>
          <li><strong>Payment Gateway ID:</strong> 67ee846571e740418d688c3f</li>
        </ul>
      </div>

      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-yellow-900 mb-2">IMPORTANT</h3>
        <p class="text-sm text-yellow-800">Always use UAT environment for testing. Switch to production only when ready to go live.</p>
      </div>
    `,
    sections: [
      { id: "create-config", title: "Create Configuration File" },
      { id: "initialize-sdk", title: "Initialize SDK" },
      { id: "test-credentials", title: "Test Credentials" },
    ],
  },
  "javascript/direct-payment": {
    title: "Direct Payment Integration",
    description: "Process payments directly in your JavaScript application with complete API integration.",
    breadcrumbs: [
      { label: "JavaScript Integration", href: "/javascript" },
      { label: "Payment Methods", href: "/payment-methods" },
      { label: "Direct Payment Integration" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Direct payment integration allows you to process payments directly within your JavaScript application using YagoutPay's API. This provides a seamless user experience without redirecting customers to external pages.</p>
      </div>

      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">Direct payment integration uses YagoutPay's API to process payments directly in your application. The process involves encrypting payment data, making API calls, and handling encrypted responses.</p>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-4">Direct Payment Flow</h3>
        <ol class="text-sm text-blue-800 list-decimal pl-6 space-y-2">
          <li><strong>Data Collection:</strong> Collect payment data from customer form</li>
          <li><strong>Data Structure:</strong> Build complete payment structure with all required fields</li>
          <li><strong>Encryption:</strong> Encrypt payment data using AES-256-CBC</li>
          <li><strong>API Call:</strong> Send encrypted data to YagoutPay API endpoint</li>
          <li><strong>Response Handling:</strong> Decrypt and process YagoutPay response</li>
          <li><strong>Result Processing:</strong> Handle success/failure and update UI</li>
        </ol>
      </div>

      <h2 id="encryption-service" class="text-2xl font-bold mt-12 mb-4">Encryption Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle AES-256-CBC encryption for direct payments:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Encryption Service with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/services/YagoutPayEncryptionService.js
class YagoutPayEncryptionService {
  constructor(merchantId, encryptionKey) {
    this.merchantId = merchantId;
    this.encryptionKey = encryptionKey;
    this.iv = '0123456789abcdef'; // Fixed 16-byte IV
  }

  // Convert base64 to Uint8Array
  base64ToUint8Array(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  // AES-256-CBC Encryption for Direct Payments
  async encrypt(data) {
    try {
      const keyBytes = this.base64ToUint8Array(this.encryptionKey);
      const ivBytes = new TextEncoder().encode(this.iv);
      
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyBytes,
        { name: 'AES-CBC' },
        false,
        ['encrypt']
      );
      
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-CBC', iv: ivBytes },
        cryptoKey,
        new TextEncoder().encode(JSON.stringify(data))
      );
      
      return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Encryption failed');
    }
  }

  // AES-256-CBC Decryption for Response Handling
  async decrypt(encryptedData) {
    try {
      const keyBytes = this.base64ToUint8Array(this.encryptionKey);
      const ivBytes = new TextEncoder().encode(this.iv);
      
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyBytes,
        { name: 'AES-CBC' },
        false,
        ['decrypt']
      );
      
      const encryptedBytes = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-CBC', iv: ivBytes },
        cryptoKey,
        encryptedBytes
      );
      
      return JSON.parse(new TextDecoder().decode(decrypted));
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Decryption failed');
    }
  }
}

export default YagoutPayEncryptionService;</code></pre>
      </div>

      <h2 id="payment-service" class="text-2xl font-bold mt-12 mb-4">Direct Payment Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle direct payment processing:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Direct Payment Service with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/services/YagoutPayDirectService.js
import YagoutPayEncryptionService from './YagoutPayEncryptionService';

class YagoutPayDirectService {
  constructor(merchantId, encryptionKey, apiUrl) {
    this.merchantId = merchantId;
    this.apiUrl = apiUrl;
    this.encryptionService = new YagoutPayEncryptionService(merchantId, encryptionKey);
  }

  // Build Complete Payment Data Structure
  buildPaymentData(orderData) {
    return {
      card_details: {
        card_number: '',
        expiry_month: '',
        expiry_year: '',
        cvv: ''
      },
      other_details: {
        order_no: orderData.order_no,
        amount: orderData.amount,
        currency: 'ETB',
        country: 'ETH'
      },
      ship_details: {
        ship_name: orderData.customer_name,
        ship_address: orderData.bill_address || 'N/A',
        ship_city: orderData.bill_city || 'Addis Ababa',
        ship_state: orderData.bill_state || 'Addis Ababa',
        ship_country: orderData.bill_country || 'ET',
        ship_zip: orderData.bill_zip || '1000'
      },
      txn_details: {
        txn_type: 'SALE',
        txn_sub_type: 'PAYMENT'
      },
      item_details: [
        {
          item_name: 'Payment',
          item_amount: orderData.amount,
          item_quantity: '1'
        }
      ],
      cust_details: {
        customer_name: orderData.customer_name,
        customer_email: orderData.email_id,
        customer_mobile: orderData.mobile_no
      },
      pg_details: {
        pg_id: '67ee846571e740418d688c3f',
        paymode: 'WA',
        scheme_id: '7',
        wallet_type: orderData.wallet_type || 'telebirr'
      },
      bill_details: {
        bill_name: orderData.customer_name,
        bill_address: orderData.bill_address || 'N/A',
        bill_city: orderData.bill_city || 'Addis Ababa',
        bill_state: orderData.bill_state || 'Addis Ababa',
        bill_country: orderData.bill_country || 'ET',
        bill_zip: orderData.bill_zip || '1000'
      }
    };
  }

  // Process Direct Payment
  async processPayment(orderData) {
    try {
      // Step 1: Build payment data structure
      const paymentData = this.buildPaymentData(orderData);
      
      // Step 2: Encrypt payment data
      const encryptedData = await this.encryptionService.encrypt(paymentData);
      
      // Step 3: Prepare API request
      const requestData = {
        merchantId: this.merchantId,
        merchantRequest: encryptedData
      };
      
      // Step 4: Make API call
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const result = await response.json();
      
      // Step 5: Handle response
      if (result.status === 'Success') {
        return {
          success: true,
          transactionId: result.transactionId,
          message: 'Payment processed successfully'
        };
      } else {
        return {
          success: false,
          error: result.statusMessage || 'Payment failed'
        };
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error: 'Payment processing failed: ' + error.message
      };
    }
  }

  // Validate Payment Data
  validatePaymentData(data) {
    const errors = [];
    
    if (!data.amount || data.amount <= 0) {
      errors.push('Amount is required and must be greater than 0');
    }
    
    if (!data.customer_name || data.customer_name.trim() === '') {
      errors.push('Customer name is required');
    }
    
    if (!data.email_id || !this.isValidEmail(data.email_id)) {
      errors.push('Valid email is required');
    }
    
    if (!data.mobile_no || data.mobile_no.trim() === '') {
      errors.push('Mobile number is required');
    }
    
    if (!data.order_no || data.order_no.trim() === '') {
      errors.push('Order number is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  // Email validation helper
  isValidEmail(email) {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
  }
}

export default YagoutPayDirectService;</code></pre>
      </div>

      <h2 id="configuration" class="text-2xl font-bold mt-12 mb-4">Configuration</h2>
      <p class="leading-relaxed mb-4">Set up your YagoutPay direct payment configuration:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Configuration with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/config/yagoutpayConfig.js
export const YagoutPayConfig = {
  // Environment Toggle
  useUat: true, // Set to false for production
  
  // UAT Configuration
  uat: {
    merchantId: '202504290002',
    encryptionKey: 'neTdYIKd87JEj4C6ZoYjaeBiCoeOr40ZKBEI8EU/8lo=',
    apiUrl: 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration'
  },
  
  // Production Configuration
  production: {
    merchantId: 'YOUR_PRODUCTION_MERCHANT_ID',
    encryptionKey: 'YOUR_PRODUCTION_ENCRYPTION_KEY',
    apiUrl: 'https://checkout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration'
  },
  
  // Get current configuration
  get current() {
    return this.useUat ? this.uat : this.production;
  },
  
  // Payment Gateway Details (Never Change)
  pgDetails: {
    pgId: '67ee846571e740418d688c3f',
    paymode: 'WA',
    schemeId: '7'
  },
  
  // Default Values
  defaults: {
    currency: 'ETB',
    country: 'ETH',
    walletType: 'telebirr'
  }
};</code></pre>
      </div>

      <h2 id="payment-controller" class="text-2xl font-bold mt-12 mb-4">Payment Controller</h2>
      <p class="leading-relaxed mb-4">Create a controller to handle payment requests:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Payment Controller with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/controllers/PaymentController.js
import YagoutPayDirectService from '../services/YagoutPayDirectService';
import { YagoutPayConfig } from '../config/yagoutpayConfig';

class PaymentController {
  constructor() {
    const config = YagoutPayConfig.current;
    this.paymentService = new YagoutPayDirectService(
      config.merchantId,
      config.encryptionKey,
      config.apiUrl
    );
  }

  // Process Payment
  async processPayment(paymentData) {
    try {
      // Validate payment data
      const validation = this.paymentService.validatePaymentData(paymentData);
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Validation failed',
          details: validation.errors
        };
      }

      // Process payment
      const result = await this.paymentService.processPayment(paymentData);
      
      if (result.success) {
        // Log successful payment
        console.log('Payment successful:', result.transactionId);
        
        // Update UI or redirect
        this.handlePaymentSuccess(result);
      } else {
        // Log failed payment
        console.error('Payment failed:', result.error);
        
        // Show error to user
        this.handlePaymentFailure(result);
      }
      
      return result;
    } catch (error) {
      console.error('Payment controller error:', error);
      return {
        success: false,
        error: 'Payment processing failed: ' + error.message
      };
    }
  }

  // Handle successful payment
  handlePaymentSuccess(result) {
    // Update UI
    this.showSuccessMessage('Payment successful! Transaction ID: ' + result.transactionId);
    
    // Redirect or update page
    // window.location.href = '/success?transaction=' + result.transactionId;
  }

  // Handle failed payment
  handlePaymentFailure(result) {
    // Show error message
    this.showErrorMessage('Payment failed: ' + result.error);
  }

  // Show success message
  showSuccessMessage(message) {
    // Implement your success message display
    alert(message); // Replace with your UI implementation
  }

  // Show error message
  showErrorMessage(message) {
    // Implement your error message display
    alert(message); // Replace with your UI implementation
  }
}

export default PaymentController;</code></pre>
      </div>

      <h2 id="frontend-integration" class="text-2xl font-bold mt-12 mb-4">Frontend Integration</h2>
      <p class="leading-relaxed mb-4">Create a complete payment form with JavaScript integration:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Payment Form with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;!-- HTML Payment Form --&gt;
&lt;div id="payment-form" class="payment-container"&gt;
  &lt;h2&gt;Complete Payment&lt;/h2&gt;
  
  &lt;form id="yagout-payment-form"&gt;
    &lt;div class="form-group"&gt;
      &lt;label for="amount"&gt;Amount (ETB) *&lt;/label&gt;
      &lt;input type="number" id="amount" name="amount" step="0.01" min="0.01" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
      &lt;label for="customer_name"&gt;Customer Name *&lt;/label&gt;
      &lt;input type="text" id="customer_name" name="customer_name" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
      &lt;label for="email_id"&gt;Email *&lt;/label&gt;
      &lt;input type="email" id="email_id" name="email_id" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
      &lt;label for="mobile_no"&gt;Mobile Number *&lt;/label&gt;
      &lt;input type="tel" id="mobile_no" name="mobile_no" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
      &lt;label for="wallet_type"&gt;Payment Method *&lt;/label&gt;
      &lt;select id="wallet_type" name="wallet_type" required&gt;
        &lt;option value="telebirr"&gt;Telebirr&lt;/option&gt;
        &lt;option value="cbe"&gt;CBE&lt;/option&gt;
        &lt;option value="awash"&gt;Awash Bank&lt;/option&gt;
      &lt;/select&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
      &lt;label for="bill_address"&gt;Billing Address&lt;/label&gt;
      &lt;input type="text" id="bill_address" name="bill_address"&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
      &lt;label for="bill_city"&gt;Billing City&lt;/label&gt;
      &lt;input type="text" id="bill_city" name="bill_city"&gt;
    &lt;/div&gt;
    
    &lt;button type="submit" id="pay-button" class="pay-button"&gt;
      &lt;span id="button-text"&gt;Pay Now&lt;/span&gt;
      &lt;span id="button-loading" style="display: none;"&gt;Processing...&lt;/span&gt;
    &lt;/button&gt;
  &lt;/form&gt;
  
  &lt;div id="payment-result" style="display: none;"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
      </div>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example JavaScript Integration with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;script type="module"&gt;
import PaymentController from './controllers/PaymentController.js';

// Initialize payment controller
const paymentController = new PaymentController();

// Handle form submission
document.getElementById('yagout-payment-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Show loading state
  showLoading(true);
  
  try {
    // Collect form data
    const formData = new FormData(e.target);
    const paymentData = {
      order_no: 'ORDER_' + Date.now(),
      amount: formData.get('amount'),
      customer_name: formData.get('customer_name'),
      email_id: formData.get('email_id'),
      mobile_no: formData.get('mobile_no'),
      wallet_type: formData.get('wallet_type'),
      bill_address: formData.get('bill_address') || 'N/A',
      bill_city: formData.get('bill_city') || 'Addis Ababa',
      bill_state: 'Addis Ababa',
      bill_country: 'ET',
      bill_zip: '1000'
    };
    
    // Process payment
    const result = await paymentController.processPayment(paymentData);
    
    if (result.success) {
      showPaymentResult('success', 'Payment successful! Transaction ID: ' + result.transactionId);
    } else {
      showPaymentResult('error', 'Payment failed: ' + result.error);
    }
  } catch (error) {
    console.error('Payment error:', error);
    showPaymentResult('error', 'Payment processing failed: ' + error.message);
  } finally {
    // Hide loading state
    showLoading(false);
  }
});

// Show loading state
function showLoading(show) {
  const button = document.getElementById('pay-button');
  const buttonText = document.getElementById('button-text');
  const buttonLoading = document.getElementById('button-loading');
  
  if (show) {
    button.disabled = true;
    buttonText.style.display = 'none';
    buttonLoading.style.display = 'inline';
  } else {
    button.disabled = false;
    buttonText.style.display = 'inline';
    buttonLoading.style.display = 'none';
  }
}

// Show payment result
function showPaymentResult(type, message) {
  const resultDiv = document.getElementById('payment-result');
  resultDiv.style.display = 'block';
  resultDiv.className = type === 'success' ? 'success-message' : 'error-message';
  resultDiv.textContent = message;
  
  // Scroll to result
  resultDiv.scrollIntoView({ behavior: 'smooth' });
}
&lt;/script&gt;</code></pre>
      </div>

      <h2 id="error-handling" class="text-2xl font-bold mt-12 mb-4">Error Handling</h2>
      <p class="leading-relaxed mb-4">Handle common YagoutPay errors and validation:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Error Handling with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/utils/ErrorHandler.js
class YagoutPayErrorHandler {
  static handleError(error) {
    const errorMessages = {
      'Order Id already exists': 'This order has already been processed. Please use a different order number.',
      'Invalid Request Body': 'Payment data is invalid. Please check your information.',
      'Unexpected token': 'Invalid response from payment server. Please try again.',
      'INTERNAL_SERVER_ERROR': 'Payment server error. Please try again later.',
      'Encryption failed': 'Payment encryption failed. Please try again.',
      'Decryption failed': 'Payment response could not be processed. Please try again.',
      'Network error': 'Unable to connect to payment server. Please check your internet connection.'
    };
    
    // Check for specific error messages
    for (const [key, message] of Object.entries(errorMessages)) {
      if (error.message.includes(key)) {
        return {
          userMessage: message,
          technicalError: error.message,
          shouldRetry: this.shouldRetryError(key)
        };
      }
    }
    
    // Default error handling
    return {
      userMessage: 'Payment processing failed. Please try again.',
      technicalError: error.message,
      shouldRetry: false
    };
  }
  
  static shouldRetryError(errorType) {
    const retryableErrors = [
      'Network error',
      'INTERNAL_SERVER_ERROR',
      'Unexpected token'
    ];
    
    return retryableErrors.includes(errorType);
  }
  
  static async retryPayment(paymentFunction, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await paymentFunction();
      } catch (error) {
        const errorInfo = this.handleError(error);
        
        if (attempt === maxRetries || !errorInfo.shouldRetry) {
          throw error;
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }
}

export default YagoutPayErrorHandler;</code></pre>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-green-900 mb-4">Key Implementation Points</h3>
        <ul class="text-sm text-green-800 list-disc pl-6 space-y-2">
          <li><strong>Encryption:</strong> All payment data must be encrypted using AES-256-CBC</li>
          <li><strong>API Endpoint:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">/apiRedirection/apiIntegration</code></li>
          <li><strong>Headers Required:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">Content-Type: application/json</code></li>
          <li><strong>Response Handling:</strong> All responses need to be processed for success/failure</li>
          <li><strong>Error Handling:</strong> Implement proper error handling for network and API errors</li>
          <li><strong>Validation:</strong> Validate all required fields before processing</li>
        </ul>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">Learn about <a href="/javascript/payment-links" class="text-blue-600 hover:underline">Payment Link Generation</a> for creating shareable payment URLs.</p>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "encryption-service", title: "Encryption Service" },
      { id: "payment-service", title: "Direct Payment Service" },
      { id: "configuration", title: "Configuration" },
      { id: "payment-controller", title: "Payment Controller" },
      { id: "frontend-integration", title: "Frontend Integration" },
      { id: "error-handling", title: "Error Handling" },
    ],
  },
  "javascript/payment-links": {
    title: "Payment Link Generation",
    description:
      "Generate shareable payment links for your JavaScript application.",
    breadcrumbs: [
      { label: "JavaScript Integration", href: "/javascript" },
      { label: "Payment Methods", href: "/payment-methods" },
      { label: "Payment Link Generation" },
    ],
    html: `
      <p class="leading-relaxed mb-6">Payment link generation allows you to create shareable payment URLs that customers can use to complete payments via SMS, email, or WhatsApp.</p>
      
      <h2 id="features" class="text-2xl font-bold mt-12 mb-4">Features</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>✅ Generate shareable payment URLs</li>
        <li>✅ SMS/Email integration</li>
        <li>✅ WhatsApp sharing</li>
        <li>✅ Expiry date support</li>
        <li>✅ Product description support</li>
      </ul>

      <h2 id="implementation" class="text-2xl font-bold mt-12 mb-4">Implementation</h2>
      <p class="leading-relaxed mb-4">Create payment links with the following service:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>class YagoutPayLinkService {
  static async generatePaymentLink({
    reqUserId,
    amount,
    customerEmail,
    mobileNo,
    expiryDate,
    orderId,
    firstName,
    lastName,
    product,
    dialCode,
    failureUrl,
    successUrl,
    country = 'ETH',
    currency = 'ETB',
    mediaType = ['API'],
  }) {
    try {
      // Create payment link request
      const linkRequest = {
        reqUserId: reqUserId,
        amount: amount,
        customerEmail: customerEmail,
        mobileNo: mobileNo,
        expiryDate: expiryDate,
        orderId: orderId,
        firstName: firstName,
        lastName: lastName,
        product: product,
        dialCode: dialCode,
        failureUrl: failureUrl,
        successUrl: successUrl,
        country: country,
        currency: currency,
        mediaType: mediaType,
      };

      // Generate payment link
      const linkResult = await YagoutPay.generatePaymentLink(linkRequest);
      
      if (linkResult.isSuccess) {
        console.log('Payment link:', linkResult.paymentUrl);
        return {
          success: true,
          paymentUrl: linkResult.paymentUrl,
          orderId: orderId
        };
      } else {
        console.log('Link generation failed:', linkResult.errorMessage);
        return {
          success: false,
          error: linkResult.errorMessage
        };
      }
    } catch (error) {
      console.error('Link generation error:', error);
      return {
        success: false,
        error: 'Link generation failed'
      };
    }
  }
}</code></pre>
      </div>

      <h2 id="usage" class="text-2xl font-bold mt-12 mb-4">Usage in JavaScript</h2>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Create payment link
async function createPaymentLink() {
  const result = await YagoutPayLinkService.generatePaymentLink({
    reqUserId: 'user123',
    amount: 150.00,
    customerEmail: 'customer@example.com',
    mobileNo: '+251987654321',
    expiryDate: '2025-12-31',
    orderId: 'LINK_ORDER_' + Date.now(),
    firstName: 'Jane',
    lastName: 'Smith',
    product: 'Premium Subscription',
    dialCode: '+251',
    failureUrl: 'https://yourapp.com/failure',
    successUrl: 'https://yourapp.com/success',
  });
  
  if (result.success) {
    // Share the link with customer
    await sharePaymentLink(result.paymentUrl);
    console.log('Payment link created:', result.paymentUrl);
  } else {
    console.error('Link creation failed:', result.error);
  }
}

// Share payment link
async function sharePaymentLink(paymentUrl) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Payment Link',
        text: 'Please complete your payment',
        url: paymentUrl,
      });
    } catch (err) {
      console.log('Error sharing:', err);
    }
  } else {
    // Fallback: copy to clipboard
    await navigator.clipboard.writeText(paymentUrl);
    alert('Payment link copied to clipboard!');
  }
}</code></pre>
      </div>

      <h2 id="link-management" class="text-2xl font-bold mt-12 mb-4">Link Management</h2>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Check link status
async function checkLinkStatus(linkId) {
  const status = await YagoutPay.checkLinkStatus(linkId);
  return status;
}

// Cancel payment link
async function cancelPaymentLink(linkId) {
  const result = await YagoutPay.cancelPaymentLink(linkId);
  return result;
}</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">Learn about <a href="/javascript/payment-widgets" class="text-blue-600 hover:underline">Payment Widget Integration</a> for using pre-built payment components.</p>
      </div>
    `,
    sections: [
      { id: "features", title: "Features" },
      { id: "implementation", title: "Implementation" },
      { id: "usage", title: "Usage in JavaScript" },
      { id: "link-management", title: "Link Management" },
    ],
  },
  "javascript/payment-widgets": {
    title: "Payment Widget Integration",
    description:
      "Use pre-built payment widgets in your JavaScript application.",
    breadcrumbs: [
      { label: "JavaScript Integration", href: "/javascript" },
      { label: "Payment Methods", href: "/payment-methods" },
      { label: "Payment Widget Integration" },
    ],
    html: `
      <p class="leading-relaxed mb-6">Payment widgets provide pre-built payment components that you can easily integrate into your web application, reducing development time and ensuring consistent user experience.</p>
      
      <h2 id="features" class="text-2xl font-bold mt-12 mb-4">Features</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>✅ Pre-built payment forms</li>
        <li>✅ Responsive design</li>
        <li>✅ Multiple payment methods</li>
        <li>✅ Built-in validation</li>
        <li>✅ Customizable styling</li>
      </ul>

      <h2 id="basic-widget" class="text-2xl font-bold mt-12 mb-4">Basic Payment Widget</h2>
      <p class="leading-relaxed mb-4">Use the basic payment widget for simple integration:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;!-- HTML --&gt;
&lt;div id="yagoutpay-widget"&gt;&lt;/div&gt;

&lt;!-- JavaScript --&gt;
import { YagoutPayWidget } from 'yagoutpay-sdk';

const widget = new YagoutPayWidget({
  container: '#yagoutpay-widget',
  amount: 200.00,
  currency: 'ETB',
  onPaymentSuccess: (result) => {
    console.log('Payment successful:', result.transactionId);
    // Handle success
  },
  onPaymentFailure: (error) => {
    console.log('Payment failed:', error);
    // Handle failure
  },
  supportedMethods: [
    'telebirr',
    'cbe',
    'awash',
  ],
});

widget.render();</code></pre>
      </div>

      <h2 id="custom-widget" class="text-2xl font-bold mt-12 mb-4">Custom Payment Widget</h2>
      <p class="leading-relaxed mb-4">Create a custom payment widget with your own styling:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>class CustomPaymentWidget {
  constructor(options) {
    this.amount = options.amount;
    this.currency = options.currency;
    this.onSuccess = options.onPaymentSuccess;
    this.onFailure = options.onPaymentFailure;
    this.supportedMethods = options.supportedMethods || ['telebirr', 'cbe', 'awash'];
  }

  render(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = \`
      &lt;div class="payment-widget"&gt;
        &lt;h3&gt;Complete Payment&lt;/h3&gt;
        &lt;div class="amount"&gt;Amount: \${this.amount} \${this.currency}&lt;/div&gt;
        &lt;div class="payment-methods"&gt;
          \${this.supportedMethods.map(method => \`
            &lt;button class="payment-method" data-method="\${method}"&gt;
              \${this.getMethodDisplayName(method)}
            &lt;/button&gt;
          \`).join('')}
        &lt;/div&gt;
        &lt;div class="customer-details"&gt;
          &lt;input type="text" id="customer-name" placeholder="Customer Name" required&gt;
          &lt;input type="email" id="customer-email" placeholder="Email" required&gt;
          &lt;input type="tel" id="customer-mobile" placeholder="Mobile Number" required&gt;
        &lt;/div&gt;
        &lt;button id="pay-button"&gt;Pay Now&lt;/button&gt;
      &lt;/div&gt;
    \`;
    
    this.attachEventListeners(containerId);
  }

  getMethodDisplayName(method) {
    const names = {
      'telebirr': 'Telebirr',
      'cbe': 'CBE',
      'awash': 'Awash Bank'
    };
    return names[method] || method;
  }

  attachEventListeners(containerId) {
    const container = document.getElementById(containerId);
    const payButton = container.querySelector('#pay-button');
    
    payButton.addEventListener('click', () => {
      this.processPayment();
    });
  }

  async processPayment() {
    const customerName = document.getElementById('customer-name').value;
    const customerEmail = document.getElementById('customer-email').value;
    const customerMobile = document.getElementById('customer-mobile').value;
    const selectedMethod = document.querySelector('.payment-method.active')?.dataset.method;
    
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }

    try {
      const result = await YagoutPayService.processPayment({
        amount: this.amount,
        orderId: 'ORDER_' + Date.now(),
        customerName: customerName,
        email: customerEmail,
        mobileNumber: customerMobile,
        paymentMethod: selectedMethod,
        successUrl: 'https://yourapp.com/success',
        failureUrl: 'https://yourapp.com/failure',
      });

      if (result.success) {
        this.onSuccess(result);
      } else {
        this.onFailure(result.error);
      }
    } catch (error) {
      this.onFailure('Payment processing failed');
    }
  }
}

// Usage
const customWidget = new CustomPaymentWidget({
  amount: 100.00,
  currency: 'ETB',
  onPaymentSuccess: (result) => {
    alert('Payment successful! Transaction ID: ' + result.transactionId);
  },
  onPaymentFailure: (error) => {
    alert('Payment failed: ' + error);
  },
});

customWidget.render('payment-widget-container');</code></pre>
      </div>

      <h2 id="styling" class="text-2xl font-bold mt-12 mb-4">Custom Styling</h2>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>/* CSS for custom payment widget */
.payment-widget {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}

.payment-widget h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.amount {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #007AFF;
}

.payment-methods {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.payment-method {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
  cursor: pointer;
  transition: all 0.3s;
}

.payment-method:hover {
  background: #e9e9e9;
}

.payment-method.active {
  background: #007AFF;
  color: white;
  border-color: #007AFF;
}

.customer-details {
  margin-bottom: 20px;
}

.customer-details input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

#pay-button {
  width: 100%;
  padding: 15px;
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

#pay-button:hover {
  background: #0056CC;
}</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">Learn about <a href="/javascript/security" class="text-blue-600 hover:underline">Security & Encryption</a> to ensure secure payment data handling.</p>
      </div>
    `,
    sections: [
      { id: "features", title: "Features" },
      { id: "basic-widget", title: "Basic Payment Widget" },
      { id: "custom-widget", title: "Custom Payment Widget" },
      { id: "styling", title: "Custom Styling" },
    ],
  },
  "javascript/security": {
    title: "Security & Encryption",
    description:
      "Secure payment data handling and encryption in your JavaScript application.",
    breadcrumbs: [
      { label: "JavaScript Integration", href: "/javascript" },
      { label: "Payment Methods", href: "/payment-methods" },
      { label: "Security & Encryption" },
    ],
    html: `
      <p class="leading-relaxed mb-6">YagoutPay JavaScript SDK automatically handles encryption using AES-256-CBC to ensure all payment data is secure during transmission.</p>
      
      <h2 id="automatic-encryption" class="text-2xl font-bold mt-12 mb-4">Automatic Encryption</h2>
      <p class="leading-relaxed mb-4">The YagoutPay SDK automatically encrypts all payment data before transmission:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Encryption is handled automatically
// No manual encryption required
const payment = {
  amount: 100.00,
  currency: 'ETB',
  orderId: 'ORDER_123',
  customerName: 'John Doe',
  email: 'john@example.com',
  mobileNumber: '+251911234567',
  paymentMethod: 'telebirr',
};

// Data is encrypted before transmission
const result = await YagoutPay.processPayment(payment);</code></pre>
      </div>

      <h2 id="security-features" class="text-2xl font-bold mt-12 mb-4">Security Features</h2>
      <div class="grid md:grid-cols-2 gap-4 mb-6">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">AES-256-CBC Encryption</h3>
          <p class="text-sm text-gray-700">All payment data encrypted before transmission</p>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">SSL/TLS Communication</h3>
          <p class="text-sm text-gray-700">Secure API communication</p>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">No Sensitive Data Storage</h3>
          <p class="text-sm text-gray-700">Payment data not stored locally</p>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">Token-based Authentication</h3>
          <p class="text-sm text-gray-700">Secure merchant authentication</p>
        </div>
      </div>

      <h2 id="environment-setup" class="text-2xl font-bold mt-12 mb-4">Environment Setup</h2>
      <p class="leading-relaxed mb-4">Configure different environments for testing and production:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Sandbox environment (for testing)
const yagoutPay = new YagoutPay({
  merchantId: '202508080001',
  encryptionKey: 'YOUR_SANDBOX_KEY',
  environment: 'sandbox', // or 'test'
});

// Production environment
const yagoutPay = new YagoutPay({
  merchantId: 'YOUR_PRODUCTION_MERCHANT_ID',
  encryptionKey: 'YOUR_PRODUCTION_KEY',
  environment: 'production',
});

// API Endpoints
const endpoints = {
  sandbox: 'https://uatcheckout.yagoutpay.com',
  production: 'https://checkout.yagoutpay.com'
};</code></pre>
      </div>

      <h2 id="best-practices" class="text-2xl font-bold mt-12 mb-4">Security Best Practices</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Never store encryption keys in client-side code</li>
        <li>Use environment variables for sensitive data</li>
        <li>Implement proper error handling</li>
        <li>Log payment events for auditing</li>
        <li>Use HTTPS for all API communications</li>
        <li>Validate all input data</li>
        <li>Implement rate limiting</li>
        <li>Regular security audits</li>
      </ul>

      <h2 id="error-handling" class="text-2xl font-bold mt-12 mb-4">Error Handling</h2>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>try {
  const result = await YagoutPay.processPayment(paymentRequest);
  
  switch (result.status) {
    case 'success':
      // Handle successful payment
      console.log('Payment successful:', result.transactionId);
      break;
    case 'failed':
      // Handle failed payment
      console.error('Payment failed:', result.errorMessage);
      break;
    case 'cancelled':
      // Handle cancelled payment
      console.log('Payment cancelled');
      break;
    case 'pending':
      // Handle pending payment
      console.log('Payment pending');
      break;
  }
} catch (error) {
  if (error instanceof YagoutPayException) {
    // Handle YagoutPay specific errors
    console.error('YagoutPay Error:', error.message);
  } else {
    // Handle general errors
    console.error('General Error:', error);
  }
}</code></pre>
      </div>

      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-yellow-900 mb-2">IMPORTANT</h3>
        <p class="text-sm text-yellow-800">Always use HTTPS in production and never expose your encryption keys in client-side code. Store sensitive configuration on your backend server.</p>
      </div>
    `,
    sections: [
      { id: "automatic-encryption", title: "Automatic Encryption" },
      { id: "security-features", title: "Security Features" },
      { id: "environment-setup", title: "Environment Setup" },
      { id: "best-practices", title: "Security Best Practices" },
      { id: "error-handling", title: "Error Handling" },
    ],
  },
  "get-started/stripe-without-code": {
    title: "Use Stripe without code",
    description:
      "Accept payments without writing any code using no-code solutions.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Use Stripe without code" },
    ],
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
  "payment-methods": {
    title: "Payment Methods",
    description:
      "Overview of all supported payment methods and integration options.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Payment Methods" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay supports a wide range of payment methods to help you accept payments from customers around the world.</p>
      </div>

      <h2 id="supported-methods" class="text-2xl font-bold mt-12 mb-4">Supported Payment Methods</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">💳 Credit/Debit Cards</h3>
          <p class="text-sm text-gray-700">Visa, Mastercard, American Express, and more</p>
        </div>
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">🏦 Bank Transfers</h3>
          <p class="text-sm text-gray-700">Direct bank transfers and ACH payments</p>
        </div>
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">📱 Mobile Money</h3>
          <p class="text-sm text-gray-700">M-Pesa, MTN Mobile Money, and other mobile payment services</p>
        </div>
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">🌐 Digital Wallets</h3>
          <p class="text-sm text-gray-700">PayPal, Apple Pay, Google Pay, and more</p>
        </div>
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">💰 Cryptocurrency</h3>
          <p class="text-sm text-gray-700">Bitcoin, Ethereum, and other major cryptocurrencies</p>
        </div>
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">🏪 Buy Now, Pay Later</h3>
          <p class="text-sm text-gray-700">Installment payment options and financing</p>
        </div>
      </div>

      <h2 id="integration-options" class="text-2xl font-bold mt-12 mb-4">Integration Options</h2>
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Hosted Payments</h3>
          <p class="text-sm text-gray-700 mb-4">Redirect customers to YagoutPay's secure payment page. No PCI compliance required.</p>
          <a href="/flutter/hosted-payments" class="text-blue-600 hover:underline text-sm">Learn more →</a>
        </div>
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">API Integration</h3>
          <p class="text-sm text-gray-700 mb-4">Build custom payment experiences using our REST API and SDKs.</p>
          <a href="/flutter/api-integration" class="text-blue-600 hover:underline text-sm">Learn more →</a>
        </div>
      </div>
    `,
    sections: [
      { id: "supported-methods", title: "Supported Payment Methods" },
      { id: "integration-options", title: "Integration Options" },
    ],
  },
  "flutter/first-payment": {
    title: "First Payment",
    description: "Create your first payment with YagoutPay Flutter SDK.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Flutter Integration", href: "/flutter" },
      { label: "First Payment" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Learn how to create your first payment using the YagoutPay Flutter SDK with a simple hosted payment integration.</p>
      </div>

      <h2 id="prerequisites" class="text-2xl font-bold mt-12 mb-4">Prerequisites</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Flutter SDK installed and configured</li>
        <li>YagoutPay Flutter SDK added to your project</li>
        <li>Valid API credentials from your YagoutPay dashboard</li>
      </ul>

      <h2 id="create-payment" class="text-2xl font-bold mt-12 mb-4">Create Your First Payment</h2>
      <p class="leading-relaxed mb-4">Here's a simple example to create a payment:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>import 'package:yagoutpay_flutter/yagoutpay_flutter.dart';

class PaymentService {
  static Future&lt;PaymentResult&gt; createPayment({
    required String amount,
    required String currency,
    required String description,
  }) async {
    try {
      final payment = await YagoutPay.createPayment(
        amount: amount,
        currency: currency,
        description: description,
        successUrl: 'https://yourapp.com/success',
        cancelUrl: 'https://yourapp.com/cancel',
      );
      
      return PaymentResult.success(payment);
    } catch (e) {
      return PaymentResult.error(e.toString());
    }
  }
}</code></pre>
      </div>

      <h2 id="handle-result" class="text-2xl font-bold mt-12 mb-4">Handle Payment Result</h2>
      <p class="leading-relaxed mb-4">Handle the payment result in your UI:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>ElevatedButton(
  onPressed: () async {
    final result = await PaymentService.createPayment(
      amount: '1000', // Amount in cents
      currency: 'USD',
      description: 'Test Payment',
    );
    
    if (result.isSuccess) {
      // Payment created successfully
      print('Payment ID: \${result.payment?.id}');
    } else {
      // Handle error
      print('Error: \${result.error}');
    }
  },
  child: Text('Create Payment'),
)</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After creating your first payment, explore <a href="/flutter/hosted-payments" class="text-blue-600 hover:underline">Hosted Payments</a> for more advanced integration options.</p>
      </div>
    `,
    sections: [
      { id: "prerequisites", title: "Prerequisites" },
      { id: "create-payment", title: "Create Your First Payment" },
      { id: "handle-result", title: "Handle Payment Result" },
    ],
  },
  "flutter/testing": {
    title: "Testing",
    description:
      "Test your YagoutPay Flutter integration with test credentials.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Flutter Integration", href: "/flutter" },
      { label: "Testing" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Test your YagoutPay Flutter integration using our test environment and test credentials.</p>
      </div>

      <h2 id="test-environment" class="text-2xl font-bold mt-12 mb-4">Test Environment</h2>
      <p class="leading-relaxed mb-4">Use our test environment to safely test your integration:</p>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Configure for test environment
YagoutPay.configure(
  apiKey: 'yp_test_...',
  environment: YagoutPayEnvironment.test,
);</code></pre>
      </div>

      <h2 id="test-credentials" class="text-2xl font-bold mt-12 mb-4">Test Credentials</h2>
      <div class="space-y-4 mb-8">
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">Test Card Numbers</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 4242 4242 4242 4242 - Successful payment</li>
            <li>• 4000 0000 0000 0002 - Declined payment</li>
            <li>• 4000 0000 0000 9995 - Insufficient funds</li>
          </ul>
        </div>
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">Test Mobile Money</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 254700000000 - M-Pesa test number</li>
            <li>• 256700000000 - MTN Mobile Money test number</li>
          </ul>
        </div>
      </div>

      <h2 id="test-payment" class="text-2xl font-bold mt-12 mb-4">Test Payment Flow</h2>
      <p class="leading-relaxed mb-4">Create a test payment to verify your integration:</p>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>final result = await YagoutPay.createPayment(
  amount: '1000', // $10.00
  currency: 'USD',
  description: 'Test Payment',
  testMode: true, // Enable test mode
);</code></pre>
      </div>
    `,
    sections: [
      { id: "test-environment", title: "Test Environment" },
      { id: "test-credentials", title: "Test Credentials" },
      { id: "test-payment", title: "Test Payment Flow" },
    ],
  },
  "react-native/first-payment": {
    title: "First Payment",
    description: "Create your first payment with YagoutPay React Native SDK.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "React Native Integration", href: "/react-native" },
      { label: "First Payment" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Learn how to create your first payment using the YagoutPay React Native SDK with a simple hosted payment integration.</p>
      </div>

      <h2 id="prerequisites" class="text-2xl font-bold mt-12 mb-4">Prerequisites</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>React Native development environment set up</li>
        <li>YagoutPay React Native SDK installed</li>
        <li>Valid API credentials from your YagoutPay dashboard</li>
      </ul>

      <h2 id="create-payment" class="text-2xl font-bold mt-12 mb-4">Create Your First Payment</h2>
      <p class="leading-relaxed mb-4">Here's a simple example to create a payment:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>import { YagoutPay } from 'yagoutpay-react-native';

const createPayment = async () => {
  try {
    const payment = await YagoutPay.createPayment({
      amount: 1000, // Amount in cents
      currency: 'USD',
      description: 'Test Payment',
      successUrl: 'https://yourapp.com/success',
      cancelUrl: 'https://yourapp.com/cancel',
    });
    
    console.log('Payment created:', payment.id);
  } catch (error) {
    console.error('Payment failed:', error);
  }
};</code></pre>
      </div>

      <h2 id="handle-result" class="text-2xl font-bold mt-12 mb-4">Handle Payment Result</h2>
      <p class="leading-relaxed mb-4">Handle the payment result in your component:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';

const PaymentButton = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const result = await createPayment();
      // Handle success
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    &lt;TouchableOpacity onPress={handlePayment} disabled={loading}&gt;
      &lt;Text&gt;{loading ? 'Processing...' : 'Create Payment'}&lt;/Text&gt;
    &lt;/TouchableOpacity&gt;
  );
};</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After creating your first payment, explore <a href="/react-native/hosted-payments" class="text-blue-600 hover:underline">Hosted Payments</a> for more advanced integration options.</p>
      </div>
    `,
    sections: [
      { id: "prerequisites", title: "Prerequisites" },
      { id: "create-payment", title: "Create Your First Payment" },
      { id: "handle-result", title: "Handle Payment Result" },
    ],
  },
  "react-native/testing": {
    title: "Testing",
    description:
      "Test your YagoutPay React Native integration with test credentials.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "React Native Integration", href: "/react-native" },
      { label: "Testing" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Test your YagoutPay React Native integration using our test environment and test credentials.</p>
      </div>

      <h2 id="test-environment" class="text-2xl font-bold mt-12 mb-4">Test Environment</h2>
      <p class="leading-relaxed mb-4">Configure your app for testing:</p>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>import { YagoutPay } from 'yagoutpay-react-native';

// Configure for test environment
YagoutPay.configure({
  apiKey: 'yp_test_...',
  environment: 'test',
});</code></pre>
      </div>

      <h2 id="test-credentials" class="text-2xl font-bold mt-12 mb-4">Test Credentials</h2>
      <div class="space-y-4 mb-8">
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">Test Card Numbers</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 4242 4242 4242 4242 - Successful payment</li>
            <li>• 4000 0000 0000 0002 - Declined payment</li>
            <li>• 4000 0000 0000 9995 - Insufficient funds</li>
          </ul>
        </div>
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">Test Mobile Money</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 254700000000 - M-Pesa test number</li>
            <li>• 256700000000 - MTN Mobile Money test number</li>
          </ul>
        </div>
      </div>

      <h2 id="test-payment" class="text-2xl font-bold mt-12 mb-4">Test Payment Flow</h2>
      <p class="leading-relaxed mb-4">Create a test payment to verify your integration:</p>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>const result = await YagoutPay.createPayment({
  amount: 1000, // $10.00
  currency: 'USD',
  description: 'Test Payment',
  testMode: true, // Enable test mode
});</code></pre>
      </div>
    `,
    sections: [
      { id: "test-environment", title: "Test Environment" },
      { id: "test-credentials", title: "Test Credentials" },
      { id: "test-payment", title: "Test Payment Flow" },
    ],
  },
  "javascript/first-payment": {
    title: "First Payment",
    description: "Create your first payment with YagoutPay JavaScript SDK.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "JavaScript Integration", href: "/javascript" },
      { label: "First Payment" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Learn how to create your first payment using the YagoutPay JavaScript SDK with a simple direct payment integration.</p>
      </div>

      <h2 id="prerequisites" class="text-2xl font-bold mt-12 mb-4">Prerequisites</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Web development environment set up</li>
        <li>YagoutPay JavaScript SDK included in your project</li>
        <li>Valid API credentials from your YagoutPay dashboard</li>
      </ul>

      <h2 id="create-payment" class="text-2xl font-bold mt-12 mb-4">Create Your First Payment</h2>
      <p class="leading-relaxed mb-4">Here's a simple example to create a payment:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;script src="https://js.yagoutpay.com/v1/yagoutpay.js"&gt;&lt;/script&gt;
&lt;script&gt;
  // Initialize YagoutPay
  const yagoutpay = new YagoutPay('yp_test_...');

  // Create payment
  async function createPayment() {
    try {
      const payment = await yagoutpay.payments.create({
        amount: 1000, // Amount in cents
        currency: 'USD',
        description: 'Test Payment',
        success_url: 'https://yourapp.com/success',
        cancel_url: 'https://yourapp.com/cancel',
      });
      
      console.log('Payment created:', payment.id);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  }
&lt;/script&gt;</code></pre>
      </div>

      <h2 id="handle-result" class="text-2xl font-bold mt-12 mb-4">Handle Payment Result</h2>
      <p class="leading-relaxed mb-4">Handle the payment result in your HTML:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;button onclick="createPayment()"&gt;Create Payment&lt;/button&gt;

&lt;script&gt;
  async function createPayment() {
    try {
      const result = await yagoutpay.payments.create({
        amount: 1000,
        currency: 'USD',
        description: 'Test Payment',
      });
      
      if (result.success) {
        // Redirect to payment page
        window.location.href = result.payment_url;
      } else {
        alert('Payment creation failed: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
&lt;/script&gt;</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After creating your first payment, explore <a href="/javascript/direct-payment" class="text-blue-600 hover:underline">Direct Payment</a> for more advanced integration options.</p>
      </div>
    `,
    sections: [
      { id: "prerequisites", title: "Prerequisites" },
      { id: "create-payment", title: "Create Your First Payment" },
      { id: "handle-result", title: "Handle Payment Result" },
    ],
  },
  "javascript/testing": {
    title: "Testing",
    description:
      "Test your YagoutPay JavaScript integration with test credentials.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "JavaScript Integration", href: "/javascript" },
      { label: "Testing" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Test your YagoutPay JavaScript integration using our test environment and test credentials.</p>
      </div>

      <h2 id="test-environment" class="text-2xl font-bold mt-12 mb-4">Test Environment</h2>
      <p class="leading-relaxed mb-4">Configure your JavaScript SDK for testing:</p>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;script src="https://js-test.yagoutpay.com/v1/yagoutpay.js"&gt;&lt;/script&gt;
&lt;script&gt;
  // Initialize with test API key
  const yagoutpay = new YagoutPay('yp_test_...');
&lt;/script&gt;</code></pre>
      </div>

      <h2 id="test-credentials" class="text-2xl font-bold mt-12 mb-4">Test Credentials</h2>
      <div class="space-y-4 mb-8">
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">Test Card Numbers</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 4242 4242 4242 4242 - Successful payment</li>
            <li>• 4000 0000 0000 0002 - Declined payment</li>
            <li>• 4000 0000 0000 9995 - Insufficient funds</li>
          </ul>
        </div>
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">Test Mobile Money</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 254700000000 - M-Pesa test number</li>
            <li>• 256700000000 - MTN Mobile Money test number</li>
          </ul>
        </div>
      </div>

      <h2 id="test-payment" class="text-2xl font-bold mt-12 mb-4">Test Payment Flow</h2>
      <p class="leading-relaxed mb-4">Create a test payment to verify your integration:</p>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>const result = await yagoutpay.payments.create({
  amount: 1000, // $10.00
  currency: 'USD',
  description: 'Test Payment',
  test_mode: true, // Enable test mode
});</code></pre>
      </div>
    `,
    sections: [
      { id: "test-environment", title: "Test Environment" },
      { id: "test-credentials", title: "Test Credentials" },
      { id: "test-payment", title: "Test Payment Flow" },
    ],
  },
  "laravel": {
    title: "Laravel Integration",
    description: "Complete YagoutPay Laravel integration guide.",
    breadcrumbs: [{ label: "Laravel Integration" }],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay provides comprehensive Laravel integration with multiple payment methods including hosted payments, direct API integration, and payment widgets for seamless payment processing in your Laravel applications.</p>
      </div>
      
      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">YagoutPay Laravel integration offers flexible payment solutions with AES-256-CBC encryption, comprehensive error handling, and support for both hosted and direct payment methods.</p>
      
      <h2 id="getting-started" class="text-2xl font-bold mt-12 mb-4">Getting Started</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><a href="/laravel/installation" class="text-primary hover:underline">Install YagoutPay Laravel Package</a></li>
        <li><a href="/laravel/configuration" class="text-primary hover:underline">Configure credentials</a></li>
        <li><a href="/laravel/hosted-payments" class="text-primary hover:underline">Choose integration method</a></li>
      </ol>

      <h2 id="integration-methods" class="text-2xl font-bold mt-12 mb-4">Integration Methods</h2>
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Hosted Payments</h3>
          <p class="text-sm text-gray-700 mb-3">Redirect customers to YagoutPay's secure payment page. No PCI compliance required.</p>
          <a href="/laravel/hosted-payments" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">API Integration</h3>
          <p class="text-sm text-gray-700 mb-3">Direct API payment processing with AES-256-CBC encryption.</p>
          <a href="/laravel/api-integration" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Payment Widget</h3>
          <p class="text-sm text-gray-700 mb-3">Generate static payment links and QR codes.</p>
          <a href="/laravel/payment-widget" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "getting-started", title: "Getting Started" },
      { id: "integration-methods", title: "Integration Methods" },
    ],
  },
  "laravel/installation": {
    title: "Laravel Installation",
    description: "Install YagoutPay Laravel package and set up your development environment.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Laravel Integration", href: "/laravel" },
      { label: "Installation" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay provides comprehensive Laravel integration with multiple payment methods. This guide covers the complete setup process for Laravel applications.</p>
      </div>
      
      <div class="flex items-start gap-3 mb-8">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Follow this step-by-step guide to integrate YagoutPay payments into your Laravel application with minimal setup.</p>
      </div>

      <h2 id="prerequisites" class="text-2xl font-bold mt-12 mb-4">Prerequisites</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Laravel 8.0 or higher</li>
        <li>PHP 8.0 or higher</li>
        <li>Composer</li>
        <li>YagoutPay merchant account</li>
        <li>Valid API credentials</li>
      </ul>

      <h2 id="install-packages" class="text-2xl font-bold mt-12 mb-4">Install Required Packages</h2>
      <p class="leading-relaxed mb-4">Install the required PHP packages using Composer:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># Required packages for YagoutPay integration
composer require guzzlehttp/guzzle
composer require laravel/sanctum

# For payment widget (QR code generation)
composer require simplesoftwareio/simple-qrcode

# For image processing (optional)
composer require intervention/image</code></pre>
      </div>

      <h2 id="environment-config" class="text-2xl font-bold mt-12 mb-4">Environment Configuration</h2>
      <p class="leading-relaxed mb-4">Add the following configuration to your <code class="bg-muted px-2 py-1 rounded text-sm font-mono">.env</code> file:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># YagoutPay Configuration
YAGOUT_MERCHANT_ID=your_merchant_id
YAGOUT_ENCRYPTION_KEY=your_base64_encoded_key
YAGOUT_API_URL=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration

# For Payment Widget
YAGOUT_STATIC_LINK_API=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/staticQRPaymentResponse
YAGOUT_PAYMENT_LINK_API=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/paymentByLinkResponse
YAGOUT_STATIC_ME_ID=202508080001</code></pre>
      </div>

      <h2 id="create-service" class="text-2xl font-bold mt-12 mb-4">Create YagoutPay Service</h2>
      <p class="leading-relaxed mb-4">Create the core YagoutPay service class:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// app/Services/YagoutPayService.php
&lt;?php

namespace App\\Services;

use GuzzleHttp\\Client;
use Illuminate\\Support\\Facades\\Log;

class YagoutPayService
{
    private $client;
    private $merchantId;
    private $encryptionKey;
    private $apiUrl;

    public function __construct()
    {
        $this->client = new Client();
        $this->merchantId = config('yagoutpay.merchant_id');
        $this->encryptionKey = config('yagoutpay.encryption_key');
        $this->apiUrl = config('yagoutpay.api_url');
    }

    public function processPayment($paymentData)
    {
        try {
            $encryptedData = $this->encryptPaymentData($paymentData);
            
            $response = $this->client->post($this->apiUrl, [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'me_id' => $this->merchantId,
                ],
                'json' => [
                    'request' => $encryptedData
                ]
            ]);

            return json_decode($response->getBody(), true);
        } catch (\\Exception $e) {
            Log::error('YagoutPay Payment Error: ' . $e->getMessage());
            throw $e;
        }
    }

    private function encryptPaymentData($data)
    {
        $jsonData = json_encode($data);
        $key = base64_decode($this->encryptionKey);
        $iv = '0123456789abcdef'; // 16-byte IV
        
        $encrypted = openssl_encrypt($jsonData, 'AES-256-CBC', $key, 0, $iv);
        return base64_encode($encrypted);
    }
}</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After installation, proceed to <a href="/laravel/configuration" class="text-blue-600 hover:underline">Configuration</a> to set up your YagoutPay credentials and start processing payments.</p>
      </div>
    `,
    sections: [
      { id: "prerequisites", title: "Prerequisites" },
      { id: "install-packages", title: "Install Packages" },
      { id: "environment-config", title: "Environment Configuration" },
      { id: "create-service", title: "Create YagoutPay Service" },
    ],
  },
  "laravel/hosted-payments": {
    title: "Laravel Hosted Payments",
    description: "Implement hosted payments in Laravel applications with YagoutPay using form submission method.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Laravel Integration", href: "/laravel" },
      { label: "Hosted Payments" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Hosted payments redirect customers to YagoutPay's secure payment page using HTML form submission. This method requires minimal PCI compliance and provides a streamlined setup.</p>
      </div>

      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">Hosted payments use HTML form submission to redirect customers to YagoutPay's secure payment page. The process involves encrypting payment data and submitting it via form POST method to YagoutPay's gateway.</p>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-4">Hosted Payment Flow</h3>
        <ol class="text-sm text-blue-800 list-decimal pl-6 space-y-2">
          <li><strong>Data Collection:</strong> Collect payment data from customer form</li>
          <li><strong>Data Structure:</strong> Build complete payment structure with all required sections</li>
          <li><strong>Encryption:</strong> Encrypt payment data using AES-256-CBC</li>
          <li><strong>Form Submission:</strong> Submit encrypted data via HTML form POST to YagoutPay</li>
          <li><strong>Payment Processing:</strong> Customer completes payment on YagoutPay's secure page</li>
          <li><strong>Response Handling:</strong> YagoutPay redirects back to your success/failure URLs</li>
        </ol>
      </div>

      <h2 id="encryption-service" class="text-2xl font-bold mt-12 mb-4">Encryption Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle AES-256-CBC encryption for hosted payments:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Encryption Service with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// app/Services/YagoutPayEncryptionService.php
&lt;?php

namespace App\\Services;

class YagoutPayEncryptionService
{
    private $merchantId;
    private $encryptionKey;
    private $iv;

    public function __construct()
    {
        $this->merchantId = config('yagoutpay.merchant_id');
        $this->encryptionKey = config('yagoutpay.encryption_key');
        $this->iv = '0123456789abcdef'; // Fixed 16-byte IV
    }

    // AES-256-CBC Encryption for Hosted Payments
    public function encrypt($text, $key, $type)
    {
        $iv = "0123456789abcdef";
        $size = 16;
        $pad = $size - (strlen($text) % $size);
        $padtext = $text . str_repeat(chr($pad), $pad);
        
        $crypt = openssl_encrypt(
            $padtext, 
            "AES-256-CBC", 
            base64_decode($key), 
            OPENSSL_RAW_DATA | OPENSSL_ZERO_PADDING, 
            $iv
        );
        
        return base64_encode($crypt);
    }

    // AES-256-CBC Decryption for Response Handling
    public function decrypt($crypt, $key, $type)
    {
        $iv = "0123456789abcdef";
        $crypt = base64_decode($crypt);
        
        $padtext = openssl_decrypt(
            $crypt, 
            "AES-256-CBC", 
            base64_decode($key), 
            OPENSSL_RAW_DATA | OPENSSL_ZERO_PADDING, 
            $iv
        );
        
        $pad = ord($padtext[strlen($padtext) - 1]);
        
        if ($pad > strlen($padtext)) {
            return false;
        }
        
        if (strspn($padtext, $padtext[strlen($padtext) - 1], strlen($padtext) - $pad) != $pad) {
            $text = "Error";
        }
        
        $text = substr($padtext, 0, -1 * $pad);
        return $text;
    }
}</code></pre>
      </div>

      <h2 id="payment-service" class="text-2xl font-bold mt-12 mb-4">Hosted Payment Service</h2>
      <p class="leading-relaxed mb-4">Create a service to build payment data structure and handle form submission:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Hosted Payment Service with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// app/Services/YagoutPayHostedService.php
&lt;?php

namespace App\\Services;

use Illuminate\\Support\\Facades\\Log;

class YagoutPayHostedService
{
    private $encryptionService;
    private $merchantId;
    private $encryptionKey;
    private $gatewayUrl;

    public function __construct(YagoutPayEncryptionService $encryptionService)
    {
        $this->encryptionService = $encryptionService;
        $this->merchantId = config('yagoutpay.merchant_id');
        $this->encryptionKey = config('yagoutpay.encryption_key');
        $this->gatewayUrl = config('yagoutpay.gateway_url');
    }

    // Build Complete Payment Data Structure
    public function buildPaymentData($orderData)
    {
        // Txn_Details (Required Parameters)
        $txnDetails = implode('|', [
            'yagout',                                    // ag_id
            $this->merchantId,                           // me_id
            $orderData['order_no'],                      // order_no
            $orderData['amount'],                        // amount
            'ETH',                                       // country
            'ETB',                                       // currency
            'SALE',                                      // txn_type
            $orderData['success_url'],                   // success_url
            $orderData['failure_url'],                   // failure_url
            'WEB'                                        // channel
        ]);

        // PG_Details (Blank for Hosted Payments)
        $pgDetails = implode('|', ['', '', '', $orderData['wallet_type'] ?? 'telebirr']);

        // Card_Details (Blank for Hosted Payments)
        $cardDetails = implode('|', ['', '', '', '']);

        // Cust_Details (Customer Information)
        $custDetails = implode('|', [
            '',                                          // card_name (blank)
            $orderData['customer_name'],                 // cust_name
            $orderData['email_id'],                      // email_id
            $orderData['mobile_no'],                     // mobile_no
            $orderData['unique_id'] ?? '',               // unique_id
            $orderData['is_logged_in'] ?? 'N'            // is_logged_in
        ]);

        // Bill_Details (Billing Information)
        $billDetails = implode('|', [
            $orderData['bill_address'] ?? 'N/A',         // bill_address
            $orderData['bill_city'] ?? 'Addis Ababa',    // bill_city
            $orderData['bill_state'] ?? 'Addis Ababa',   // bill_state
            $orderData['bill_country'] ?? 'ET',          // bill_country
            $orderData['bill_zip'] ?? '1000'             // bill_zip
        ]);

        // Ship_Details (Shipping Information)
        $shipDetails = implode('|', [
            $orderData['ship_address'] ?? '',             // ship_address
            $orderData['ship_city'] ?? '',               // ship_city
            $orderData['ship_state'] ?? '',              // ship_state
            $orderData['ship_country'] ?? '',             // ship_country
            $orderData['ship_zip'] ?? '',                // ship_zip
            $orderData['ship_days'] ?? '',                // ship_days
            $orderData['address_count'] ?? ''             // address_count
        ]);

        // Item_Details (Item Information)
        $itemDetails = implode('|', [
            $orderData['item_count'] ?? '1',              // item_count
            $orderData['item_value'] ?? $orderData['amount'], // item_value
            $orderData['item_category'] ?? ''             // item_category
        ]);

        // UPI_Details (Additional Information)
        $upiDetails = implode('|', [
            $orderData['udf_1'] ?? '',                    // udf_1
            $orderData['udf_2'] ?? '',                    // udf_2
            $orderData['udf_3'] ?? '',                    // udf_3
            $orderData['udf_4'] ?? '',                    // udf_4
            $orderData['udf_5'] ?? ''                     // udf_5
        ]);

        // Other_Details (Additional Transaction Info)
        $otherDetails = implode('|', [
            $orderData['order_no'],                       // order_no
            $orderData['amount'],                         // amount
            'ETB',                                        // currency
            'ETH'                                         // country
        ]);

        // Combine all sections with ~ separator
        $allValues = implode('~', [
            $txnDetails,
            $pgDetails,
            $cardDetails,
            $custDetails,
            $billDetails,
            $shipDetails,
            $itemDetails,
            $upiDetails,
            $otherDetails
        ]);

        return $allValues;
    }

    // Generate Hash for Security
    public function generateHash($merchantRequest)
    {
        $salt = config('yagoutpay.salt_key');
        $hashString = $this->merchantId . '|' . $merchantRequest . '|' . $salt;
        return hash('sha512', $hashString);
    }

    // Prepare Hosted Payment Data
    public function prepareHostedPayment($orderData)
    {
        try {
            // Build payment data structure
            $paymentData = $this->buildPaymentData($orderData);
            
            // Encrypt the payment data
            $encryptedData = $this->encryptionService->encrypt($paymentData, $this->encryptionKey, 256);
            
            // Generate hash for security
            $hash = $this->generateHash($encryptedData);
            
            return [
                'me_id' => $this->merchantId,
                'merchant_request' => $encryptedData,
                'hash' => $hash,
                'gateway_url' => $this->gatewayUrl
            ];
        } catch (\\Exception $e) {
            Log::error('Hosted Payment Preparation Error: ' . $e->getMessage());
            throw $e;
        }
    }
}</code></pre>
      </div>

      <h2 id="payment-controller" class="text-2xl font-bold mt-12 mb-4">Payment Controller</h2>
      <p class="leading-relaxed mb-4">Create a controller to handle hosted payment initiation and callbacks:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Payment Controller with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// app/Http/Controllers/HostedPaymentController.php
&lt;?php

namespace App\\Http\\Controllers;

use App\\Services\\YagoutPayHostedService;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\Response;

class HostedPaymentController extends Controller
{
    protected $hostedService;

    public function __construct(YagoutPayHostedService $hostedService)
    {
        $this->hostedService = $hostedService;
    }

    // Initiate Hosted Payment
    public function initiatePayment(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'email_id' => 'required|email',
            'mobile_no' => 'required|string',
            'customer_name' => 'required|string',
            'order_no' => 'required|string|unique:orders,order_no'
        ]);

        $orderData = [
            'order_no' => $request->order_no,
            'amount' => number_format($request->amount, 2, '.', ''),
            'email_id' => $request->email_id,
            'mobile_no' => $request->mobile_no,
            'customer_name' => $request->customer_name,
            'bill_address' => $request->bill_address ?? 'N/A',
            'bill_city' => $request->bill_city ?? 'Addis Ababa',
            'bill_state' => $request->bill_state ?? 'Addis Ababa',
            'bill_country' => $request->bill_country ?? 'ET',
            'bill_zip' => $request->bill_zip ?? '1000',
            'wallet_type' => $request->wallet_type ?? 'telebirr',
            'success_url' => route('payment.success'),
            'failure_url' => route('payment.failure'),
            'unique_id' => $request->unique_id ?? '',
            'is_logged_in' => auth()->check() ? 'Y' : 'N',
            'ship_address' => $request->ship_address ?? '',
            'ship_city' => $request->ship_city ?? '',
            'ship_state' => $request->ship_state ?? '',
            'ship_country' => $request->ship_country ?? '',
            'ship_zip' => $request->ship_zip ?? '',
            'ship_days' => $request->ship_days ?? '',
            'address_count' => $request->address_count ?? '',
            'item_count' => $request->item_count ?? '1',
            'item_value' => $request->item_value ?? $request->amount,
            'item_category' => $request->item_category ?? '',
            'udf_1' => $request->udf_1 ?? '',
            'udf_2' => $request->udf_2 ?? '',
            'udf_3' => $request->udf_3 ?? '',
            'udf_4' => $request->udf_4 ?? '',
            'udf_5' => $request->udf_5 ?? ''
        ];

        try {
            // Prepare hosted payment data
            $paymentData = $this->hostedService->prepareHostedPayment($orderData);
            
            // Return view with payment form
            return view('payment.hosted-form', compact('paymentData'));
        } catch (\\Exception $e) {
            return back()->with('error', 'Payment initiation failed: ' . $e->getMessage());
        }
    }

    // Handle Payment Success Callback
    public function handleSuccess(Request $request)
    {
        $orderNo = $request->input('order_no');
        $status = $request->input('status');
        $transactionId = $request->input('transaction_id');
        
        // Update order status in database
        // Send confirmation email
        // Log successful transaction
        
        return view('payment.success', compact('orderNo', 'status', 'transactionId'));
    }

    // Handle Payment Failure Callback
    public function handleFailure(Request $request)
    {
        $orderNo = $request->input('order_no');
        $status = $request->input('status');
        $errorMessage = $request->input('error_message');
        
        // Log failed transaction
        // Update order status
        
        return view('payment.failure', compact('orderNo', 'status', 'errorMessage'));
    }
}</code></pre>
      </div>

      <h2 id="hosted-form-view" class="text-2xl font-bold mt-12 mb-4">Hosted Payment Form View</h2>
      <p class="leading-relaxed mb-4">Create a Blade template for the hosted payment form:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Hosted Form View with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;!-- resources/views/payment/hosted-form.blade.php --&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Redirecting to Payment Gateway...&lt;/title&gt;
    &lt;meta name="csrf-token" content="{{ csrf_token() }}"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class="text-center"&gt;
        &lt;h2&gt;Redirecting to Payment Gateway...&lt;/h2&gt;
        &lt;p&gt;Please wait while we redirect you to the secure payment page.&lt;/p&gt;
    &lt;/div&gt;

    &lt;!-- Auto-submit form to YagoutPay Gateway --&gt;
    &lt;form name="paymentForm" method="POST" enctype="application/x-www-form-urlencoded" 
          action="{{ $paymentData['gateway_url'] }}" style="display: none;"&gt;
        &lt;input name="me_id" value="{{ $paymentData['me_id'] }}" type="hidden"&gt;
        &lt;input name="merchant_request" value="{{ $paymentData['merchant_request'] }}" type="hidden"&gt;
        &lt;input name="hash" value="{{ $paymentData['hash'] }}" type="hidden"&gt;
        &lt;input type="submit" name="submit" value="Pay Now"&gt;
    &lt;/form&gt;

    &lt;script&gt;
        // Auto-submit form after page load
        document.addEventListener('DOMContentLoaded', function() {
            document.forms['paymentForm'].submit();
        });
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>

      <h2 id="configuration" class="text-2xl font-bold mt-12 mb-4">Configuration</h2>
      <p class="leading-relaxed mb-4">Set up your YagoutPay hosted payment configuration:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Configuration with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// config/yagoutpay.php
&lt;?php

return [
    'merchant_id' => env('YAGOUT_MERCHANT_ID'),
    'encryption_key' => env('YAGOUT_ENCRYPTION_KEY'),
    'salt_key' => env('YAGOUT_SALT_KEY'),
    'gateway_url' => env('YAGOUT_GATEWAY_URL', 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/paymentRedirection/checksumGatewayPage'),
];</code></pre>
      </div>

      <h3 class="text-lg font-semibold mt-8 mb-3">Environment Variables with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># .env file
YAGOUT_MERCHANT_ID=202504290002
YAGOUT_ENCRYPTION_KEY=neTdYIKd87JEj4C6ZoYjaeBiCoeOr40ZKBEI8EU/8lo=
YAGOUT_SALT_KEY=your_salt_key
YAGOUT_GATEWAY_URL=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/paymentRedirection/checksumGatewayPage</code></pre>
      </div>

      <h2 id="routes" class="text-2xl font-bold mt-12 mb-4">Routes</h2>
      <p class="leading-relaxed mb-4">Add routes for hosted payment processing:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Web Routes with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// routes/web.php
Route::post('/payment/hosted/initiate', [HostedPaymentController::class, 'initiatePayment'])->name('payment.hosted.initiate');
Route::get('/payment/success', [HostedPaymentController::class, 'handleSuccess'])->name('payment.success');
Route::get('/payment/failure', [HostedPaymentController::class, 'handleFailure'])->name('payment.failure');</code></pre>
      </div>

      <h2 id="frontend-form" class="text-2xl font-bold mt-12 mb-4">Frontend Payment Form</h2>
      <p class="leading-relaxed mb-4">Create a payment form in your Blade template:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Payment Form with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;!-- resources/views/payment/form.blade.php --&gt;
&lt;form action="{{ route('payment.hosted.initiate') }}" method="POST"&gt;
    @csrf
    &lt;div class="form-group"&gt;
        &lt;label for="amount"&gt;Amount (ETB)&lt;/label&gt;
        &lt;input type="number" name="amount" id="amount" step="0.01" min="0.01" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="email_id"&gt;Email&lt;/label&gt;
        &lt;input type="email" name="email_id" id="email_id" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="mobile_no"&gt;Mobile Number&lt;/label&gt;
        &lt;input type="text" name="mobile_no" id="mobile_no" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="customer_name"&gt;Customer Name&lt;/label&gt;
        &lt;input type="text" name="customer_name" id="customer_name" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="wallet_type"&gt;Wallet Type&lt;/label&gt;
        &lt;select name="wallet_type" id="wallet_type"&gt;
            &lt;option value="telebirr"&gt;Telebirr&lt;/option&gt;
            &lt;option value="cbe"&gt;CBE&lt;/option&gt;
            &lt;option value="awash"&gt;Awash&lt;/option&gt;
        &lt;/select&gt;
    &lt;/div&gt;
    
    &lt;input type="hidden" name="order_no" value="{{ uniqid('ORDER_') }}"&gt;
    
    &lt;button type="submit" class="btn btn-primary"&gt;Pay Now&lt;/button&gt;
&lt;/form&gt;</code></pre>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-green-900 mb-4">Important Notes</h3>
        <ul class="text-sm text-green-800 list-disc pl-6 space-y-2">
          <li><strong>Form Submission Only:</strong> Only HTML form submission with POST method is supported</li>
          <li><strong>No REST API:</strong> Sending payment requests using REST API calls is not supported</li>
          <li><strong>Domain Registration:</strong> Transactions are only permitted through registered merchant domains</li>
          <li><strong>Localhost Restriction:</strong> If "localhost" or local IP is not permitted, you'll get "Invalid Referral URL" error</li>
          <li><strong>Encryption Required:</strong> All payment data must be encrypted using AES-256-CBC before submission</li>
        </ul>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">Learn about <a href="/laravel/payment-widget" class="text-blue-600 hover:underline">Payment Widget</a> for generating static payment links and QR codes.</p>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "encryption-service", title: "Encryption Service" },
      { id: "payment-service", title: "Hosted Payment Service" },
      { id: "payment-controller", title: "Payment Controller" },
      { id: "hosted-form-view", title: "Hosted Payment Form View" },
      { id: "configuration", title: "Configuration" },
      { id: "routes", title: "Routes" },
      { id: "frontend-form", title: "Frontend Payment Form" },
    ],
  },
  "laravel/api-integration": {
    title: "Laravel API Integration",
    description: "Direct API integration with YagoutPay in Laravel applications.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Laravel Integration", href: "/laravel" },
      { label: "API Integration" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Direct API integration allows you to process payments directly in your Laravel application using YagoutPay's API with AES-256-CBC encryption for secure payment data transmission.</p>
      </div>

      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">Direct API integration provides complete control over the payment flow while maintaining security through encryption. This method is ideal for applications that need custom payment experiences.</p>

      <h2 id="payment-service" class="text-2xl font-bold mt-12 mb-4">Complete Payment Service</h2>
      <p class="leading-relaxed mb-4">Create a comprehensive YagoutPay service with detailed encryption and API processing:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example YagoutPay Service with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// app/Services/YagoutPayService.php
&lt;?php

namespace App\\Services;

use GuzzleHttp\\Client;
use Illuminate\\Support\\Facades\\Log;

class YagoutPayService
{
    private $client;
    private $merchantId;
    private $encryptionKey;
    private $apiUrl;
    private $iv;

    public function __construct()
    {
        $this->client = new Client();
        $this->merchantId = config('yagoutpay.merchant_id');
        $this->encryptionKey = config('yagoutpay.encryption_key');
        $this->apiUrl = config('yagoutpay.api_url');
        $this->iv = '0123456789abcdef'; // Fixed 16-byte IV
    }

    // Step 1: Build Payment Data Structure
    public function buildPaymentData($orderData)
    {
        return [
            'card_details' => [
                'card_number' => '',
                'expiry_month' => '',
                'expiry_year' => '',
                'cvv' => ''
            ],
            'other_details' => [
                'order_no' => $orderData['order_no'],
                'amount' => $orderData['amount'],
                'currency' => 'ETB',
                'country' => 'ETH'
            ],
            'ship_details' => [
                'ship_name' => $orderData['customer_name'],
                'ship_address' => $orderData['bill_address'] ?? 'N/A',
                'ship_city' => $orderData['bill_city'] ?? 'Addis Ababa',
                'ship_state' => $orderData['bill_state'] ?? 'Addis Ababa',
                'ship_country' => $orderData['bill_country'] ?? 'ET',
                'ship_zip' => $orderData['bill_zip'] ?? '1000'
            ],
            'txn_details' => [
                'txn_type' => 'SALE',
                'txn_sub_type' => 'PAYMENT'
            ],
            'item_details' => [
                [
                    'item_name' => 'Payment',
                    'item_amount' => $orderData['amount'],
                    'item_quantity' => '1'
                ]
            ],
            'cust_details' => [
                'customer_name' => $orderData['customer_name'],
                'customer_email' => $orderData['email_id'],
                'customer_mobile' => $orderData['mobile_no']
            ],
            'pg_details' => [
                'pg_id' => '67ee846571e740418d688c3f',
                'paymode' => 'WA',
                'scheme_id' => '7',
                'wallet_type' => $orderData['wallet_type'] ?? 'telebirr'
            ],
            'bill_details' => [
                'bill_name' => $orderData['customer_name'],
                'bill_address' => $orderData['bill_address'] ?? 'N/A',
                'bill_city' => $orderData['bill_city'] ?? 'Addis Ababa',
                'bill_state' => $orderData['bill_state'] ?? 'Addis Ababa',
                'bill_country' => $orderData['bill_country'] ?? 'ET',
                'bill_zip' => $orderData['bill_zip'] ?? '1000'
            ]
        ];
    }

    // Step 2: Encrypt Payment Data
    public function encryptData($data)
    {
        $jsonString = json_encode($data);           // Convert to JSON
        $algorithm = 'AES-256-CBC';                 // Encryption algorithm
        
        $encrypted = openssl_encrypt(
            $jsonString,                            // Data to encrypt
            $algorithm,                            // AES-256-CBC
            base64_decode($this->encryptionKey),    // Decode base64 key
            OPENSSL_RAW_DATA,                      // Raw data flag
            $this->iv                              // Fixed IV: '0123456789abcdef'
        );
        
        return base64_encode($encrypted);          // Return base64 encoded result
    }

    // Step 3: Initiate Payment (Build + Encrypt)
    public function initiatePayment($orderData)
    {
        $paymentData = $this->buildPaymentData($orderData);  // Build structure
        $encryptedData = $this->encryptData($paymentData);   // Encrypt data
        
        return [
            'merchantId' => $this->merchantId,
            'merchantRequest' => $encryptedData
        ];
    }

    public function validatePayment($response)
    {
        return isset($response['status']) && $response['status'] === 'Success';
    }
}</code></pre>
      </div>

      <h2 id="payment-controller" class="text-2xl font-bold mt-12 mb-4">Complete Payment Controller</h2>
      <p class="leading-relaxed mb-4">Create a comprehensive payment controller with the complete payment flow:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Checkout Controller with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// app/Http/Controllers/frontend/CheckoutController.php
&lt;?php

namespace App\\Http\\Controllers\\frontend;

use App\\Services\\YagoutPayService;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Support\\Facades\\Http;
use Illuminate\\Support\\Facades\\Auth;

class CheckoutController extends Controller
{
    protected $yagoutPayService;

    public function __construct(YagoutPayService $yagoutPayService)
    {
        $this->yagoutPayService = $yagoutPayService;
    }

    // Complete Payment Flow
    public function processYagoutPayment(Request $request): JsonResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'email_id' => 'required|email',
            'mobile_no' => 'required|string',
            'customer_name' => 'required|string'
        ]);

        $total = $request->amount;

        // Step 1: Data Preparation
        $orderData = [
            'order_no' => 'LARAVEL_ORDER_' . time() . '_' . Auth::id(),
            'amount' => (string)$total,
            'email_id' => $request->email_id,
            'mobile_no' => $request->mobile_no,
            'customer_name' => $request->customer_name,
            'bill_address' => $request->bill_address ?? 'N/A',
            'bill_city' => $request->bill_city ?? 'Addis Ababa',
            'bill_state' => $request->bill_state ?? 'Addis Ababa',
            'bill_country' => $request->bill_country ?? 'ET',
            'bill_zip' => $request->bill_zip ?? '1000',
            'wallet_type' => $request->wallet_type ?? 'telebirr'
        ];

        try {
            // Step 2: Get encrypted data (Build + Encrypt)
            $encryptedData = $this->yagoutPayService->initiatePayment($orderData);

            // Step 3: Call YagoutPay API directly
            $response = Http::withOptions(config('yagoutpay.http_options'))
                ->post(config('yagoutpay.api_url'), [
                    'merchantId' => $encryptedData['merchantId'],
                    'merchantRequest' => $encryptedData['merchantRequest']
                ]);

            $result = $response->json();

            // Step 4: Response Handling
            if (isset($result['status']) && $result['status'] === 'Success') {
                // Payment successful - create order
                $order = $this->createOrderAfterPayment($request, $total, $orderData['order_no']);
                
                return response()->json([
                    'success' => true,
                    'message' => 'Payment processed successfully',
                    'order_id' => $order->id,
                    'transaction_id' => $result['transactionId'] ?? null,
                    'data' => $result
                ]);
            } else {
                // Payment failed
                return response()->json([
                    'success' => false,
                    'message' => $result['message'] ?? 'Payment failed',
                    'error_code' => $result['errorCode'] ?? null
                ], 400);
            }
        } catch (\\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Payment processing failed: ' . $e->getMessage()
            ], 500);
        }
    }

    private function createOrderAfterPayment($request, $total, $orderNo)
    {
        // Create order record in database
        // Update inventory
        // Send confirmation email
        // etc.
    }
}</code></pre>
      </div>

      <h2 id="configuration" class="text-2xl font-bold mt-12 mb-4">Configuration</h2>
      <p class="leading-relaxed mb-4">Set up your YagoutPay configuration:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Configuration with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// config/yagoutpay.php
&lt;?php

return [
    'merchant_id' => env('YAGOUT_MERCHANT_ID'),
    'encryption_key' => env('YAGOUT_ENCRYPTION_KEY'),
    'api_url' => env('YAGOUT_API_URL', 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration'),
    'http_options' => [
        'verify' => env('YAGOUT_SSL_VERIFY', false),
        'timeout' => env('YAGOUT_TIMEOUT', 30),
        'headers' => [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ],
    ],
];</code></pre>
      </div>

      <h3 class="text-lg font-semibold mt-8 mb-3">Environment Variables with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># .env file
YAGOUT_MERCHANT_ID=your_merchant_id
YAGOUT_ENCRYPTION_KEY=your_base64_encoded_key
YAGOUT_API_URL=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration
YAGOUT_SSL_VERIFY=false
YAGOUT_TIMEOUT=30</code></pre>
      </div>

      <h2 id="api-routes" class="text-2xl font-bold mt-12 mb-4">Routes</h2>
      <p class="leading-relaxed mb-4">Add routes for payment processing:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Web Routes with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// routes/web.php
Route::post('/checkout/yagout-payment', [CheckoutController::class, 'processYagoutPayment'])->name('checkout.yagout.payment');</code></pre>
      </div>

      <h3 class="text-lg font-semibold mt-8 mb-3">API Routes with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// routes/api.php
Route::post('/payment/process', [PaymentController::class, 'processPayment']);
Route::get('/payment/status/{order_no}', [PaymentController::class, 'getPaymentStatus']);</code></pre>
      </div>

      <h2 id="complete-flow" class="text-2xl font-bold mt-12 mb-4">Complete Payment Flow</h2>
      <p class="leading-relaxed mb-4">Here's the step-by-step process of how the payment integration works:</p>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-4">Payment Flow Steps</h3>
        <ol class="text-sm text-blue-800 list-decimal pl-6 space-y-2">
          <li><strong>Data Preparation:</strong> Collect payment data from form (amount, customer info, etc.)</li>
          <li><strong>Data Structure Building:</strong> Build complete payment structure with all required fields</li>
          <li><strong>Encryption:</strong> Encrypt payment data using AES-256-CBC with your encryption key</li>
          <li><strong>API Call:</strong> Send encrypted data to YagoutPay API endpoint</li>
          <li><strong>Response Handling:</strong> Process YagoutPay response and handle success/failure</li>
        </ol>
      </div>

      <h3 class="text-lg font-semibold mt-8 mb-3">Key Integration Points:</h3>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Encryption Location:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">YagoutPayService::encryptData()</code></li>
        <li><strong>API Call Location:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">CheckoutController::processYagoutPayment()</code></li>
        <li><strong>Data Structure:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">YagoutPayService::buildPaymentData()</code></li>
        <li><strong>Configuration:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">config/yagoutpay.php</code></li>
      </ul>

      <h2 id="frontend-integration" class="text-2xl font-bold mt-12 mb-4">Frontend Integration</h2>
      <p class="leading-relaxed mb-4">Create a JavaScript integration for seamless payment processing:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Frontend JavaScript with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;script&gt;
async function processPayment(formData) {
    try {
        const response = await fetch('/checkout/yagout-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        if (result.success) {
            // Handle successful payment
            showSuccessMessage('Payment processed successfully!');
            // Redirect or update UI
        } else {
            // Handle payment failure
            showErrorMessage(result.message);
        }
    } catch (error) {
        showErrorMessage('Payment processing failed. Please try again.');
    }
}
&lt;/script&gt;</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">Learn about <a href="/laravel/payment-widget" class="text-blue-600 hover:underline">Payment Widget</a> for generating static payment links and QR codes.</p>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "payment-service", title: "Complete Payment Service" },
      { id: "payment-controller", title: "Complete Payment Controller" },
      { id: "configuration", title: "Configuration" },
      { id: "api-routes", title: "Routes" },
      { id: "complete-flow", title: "Complete Payment Flow" },
      { id: "frontend-integration", title: "Frontend Integration" },
    ],
  },
  "laravel/payment-widget": {
    title: "Laravel Payment Widget",
    description: "Generate static payment links and QR codes with YagoutPay in Laravel.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Laravel Integration", href: "/laravel" },
      { label: "Payment Widget" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Payment widgets allow you to generate static payment links and QR codes for easy payment collection. Perfect for invoices, subscriptions, and one-time payments.</p>
      </div>

      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">Payment widgets provide a simple way to create shareable payment links and QR codes that customers can use to make payments without going through your application's checkout process.</p>

      <h2 id="static-link-service" class="text-2xl font-bold mt-12 mb-4">Static Link Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle static payment links and QR code generation:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// app/Services/StaticLinkService.php
&lt;?php

namespace App\\Services;

use GuzzleHttp\\Client;
use SimpleSoftwareIO\\QrCode\\QrCode;
use Illuminate\\Support\\Facades\\Log;

class StaticLinkService
{
    private $client;
    private $merchantId;
    private $encryptionKey;
    private $staticLinkApi;
    private $paymentLinkApi;

    public function __construct()
    {
        $this->client = new Client();
        $this->merchantId = config('yagoutpay.static_me_id');
        $this->encryptionKey = config('yagoutpay.encryption_key');
        $this->staticLinkApi = config('yagoutpay.static_link_api');
        $this->paymentLinkApi = config('yagoutpay.payment_link_api');
    }

    public function createPaymentLink($payload)
    {
        try {
            $encryptedData = $this->encryptPayload($payload);
            
            $response = $this->client->post($this->paymentLinkApi, [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'me_id' => $this->merchantId,
                ],
                'json' => [
                    'request' => $encryptedData
                ]
            ]);

            return json_decode($response->getBody(), true);
        } catch (\\Exception $e) {
            Log::error('Static Link Creation Error: ' . $e->getMessage());
            throw $e;
        }
    }

    public function createQRCode($payload)
    {
        try {
            $encryptedData = $this->encryptPayload($payload);
            
            $response = $this->client->post($this->staticLinkApi, [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'me_id' => $this->merchantId,
                ],
                'json' => [
                    'request' => $encryptedData
                ]
            ]);

            $result = json_decode($response->getBody(), true);
            
            if ($result['status'] === 'Success') {
                // Generate QR code
                $qrCode = QrCode::size(200)->generate($result['payment_link']);
                $result['qr_code'] = $qrCode;
            }

            return $result;
        } catch (\\Exception $e) {
            Log::error('QR Code Creation Error: ' . $e->getMessage());
            throw $e;
        }
    }

    private function encryptPayload($data)
    {
        $jsonData = json_encode($data);
        $key = base64_decode($this->encryptionKey);
        $iv = '0123456789abcdef'; // 16-byte IV
        
        $encrypted = openssl_encrypt($jsonData, 'AES-256-CBC', $key, 0, $iv);
        return base64_encode($encrypted);
    }
}</code></pre>
      </div>

      <h2 id="static-link-controller" class="text-2xl font-bold mt-12 mb-4">Static Link Controller</h2>
      <p class="leading-relaxed mb-4">Create a controller to handle static link generation:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// app/Http/Controllers/StaticLinkController.php
&lt;?php

namespace App\\Http\\Controllers;

use App\\Services\\StaticLinkService;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;

class StaticLinkController extends Controller
{
    protected $staticLinkService;

    public function __construct(StaticLinkService $staticLinkService)
    {
        $this->staticLinkService = $staticLinkService;
    }

    public function createLink(Request $request): JsonResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'customer_email' => 'nullable|email',
            'mobile_no' => 'required|string',
            'order_id' => 'required|string',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'product' => 'required|string',
            'expiry_date' => 'required|date|after:today'
        ]);

        $payload = [
            'req_user_id' => 'yagou381',
            'me_id' => config('yagoutpay.static_me_id'),
            'amount' => $request->amount,
            'customer_email' => $request->customer_email ?? '',
            'mobile_no' => $request->mobile_no,
            'expiry_date' => $request->expiry_date,
            'media_type' => ['API'],
            'order_id' => $request->order_id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'product' => $request->product,
            'dial_code' => $request->dial_code ?? '+251',
            'failure_url' => $request->failure_url ?? url('/payment/failure'),
            'success_url' => $request->success_url ?? url('/payment/success'),
            'country' => $request->country ?? 'ETH',
            'currency' => $request->currency ?? 'ETB'
        ];

        try {
            $result = $this->staticLinkService->createPaymentLink($payload);
            
            return response()->json([
                'success' => true,
                'data' => $result
            ]);
        } catch (\\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create payment link: ' . $e->getMessage()
            ], 500);
        }
    }

    public function createQR(Request $request): JsonResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'mobile_no' => 'required|string',
            'order_id' => 'required|string',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'product' => 'required|string',
            'expiry_date' => 'required|date|after:today'
        ]);

        $payload = [
            'req_user_id' => 'yagou381',
            'me_id' => config('yagoutpay.static_me_id'),
            'amount' => $request->amount,
            'customer_email' => $request->customer_email ?? '',
            'mobile_no' => $request->mobile_no,
            'expiry_date' => $request->expiry_date,
            'media_type' => ['API'],
            'order_id' => $request->order_id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'product' => $request->product,
            'dial_code' => $request->dial_code ?? '+251',
            'failure_url' => $request->failure_url ?? url('/payment/failure'),
            'success_url' => $request->success_url ?? url('/payment/success'),
            'country' => $request->country ?? 'ETH',
            'currency' => $request->currency ?? 'ETB'
        ];

        try {
            $result = $this->staticLinkService->createQRCode($payload);
            
            return response()->json([
                'success' => true,
                'data' => $result
            ]);
        } catch (\\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create QR code: ' . $e->getMessage()
            ], 500);
        }
    }
}</code></pre>
      </div>

      <h2 id="routes" class="text-2xl font-bold mt-12 mb-4">Routes</h2>
      <p class="leading-relaxed mb-4">Add routes for static link and QR code generation:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// routes/api.php
Route::post('/static-links/create', [StaticLinkController::class, 'createLink']);
Route::post('/static-links/qr', [StaticLinkController::class, 'createQR']);</code></pre>
      </div>

      <h2 id="frontend-usage" class="text-2xl font-bold mt-12 mb-4">Frontend Usage</h2>
      <p class="leading-relaxed mb-4">Example of how to use the static link service in your frontend:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;script&gt;
async function createPaymentLink() {
    const payload = {
        amount: '500',
        mobile_no: '0965680964',
        order_id: 'ORDER_STATIC_001',
        first_name: 'John',
        last_name: 'Doe',
        product: 'Premium Subscription',
        expiry_date: '2025-12-31'
    };

    try {
        const response = await fetch('/api/static-links/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        
        if (result.success) {
            // Display payment link
            document.getElementById('payment-link').innerHTML = 
                '&lt;a href="' + result.data.payment_link + '" target="_blank"&gt;' + 
                result.data.payment_link + '&lt;/a&gt;';
        }
    } catch (error) {
        console.error('Error creating payment link:', error);
    }
}

async function createQRCode() {
    const payload = {
        amount: '500',
        mobile_no: '0965680964',
        order_id: 'ORDER_QR_001',
        first_name: 'John',
        last_name: 'Doe',
        product: 'Premium Subscription',
        expiry_date: '2025-12-31'
    };

    try {
        const response = await fetch('/api/static-links/qr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        
        if (result.success) {
            // Display QR code
            document.getElementById('qr-code').innerHTML = result.data.qr_code;
        }
    } catch (error) {
        console.error('Error creating QR code:', error);
    }
}
&lt;/script&gt;</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">COMPLETE INTEGRATION</h3>
        <p class="text-sm text-blue-800">You now have a complete Laravel integration with YagoutPay! Explore <a href="/laravel" class="text-blue-600 hover:underline">all Laravel integration methods</a> to choose the best approach for your application.</p>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "static-link-service", title: "Static Link Service" },
      { id: "static-link-controller", title: "Static Link Controller" },
      { id: "routes", title: "Routes" },
      { id: "frontend-usage", title: "Frontend Usage" },
    ],
  },
  "laravel/configuration": {
    title: "Laravel Configuration",
    description: "Configure YagoutPay credentials and settings for your Laravel application.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Laravel Integration", href: "/laravel" },
      { label: "Configuration" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Configure your YagoutPay integration with the proper credentials and environment settings. This guide covers both UAT and production configurations.</p>
      </div>
      
      <h2 id="create-config-file" class="text-2xl font-bold mt-12 mb-4">Create Configuration File</h2>
      <p class="leading-relaxed mb-4">Create <code class="bg-muted px-2 py-1 rounded text-sm font-mono">config/yagoutpay.php</code>:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;?php

return [
    'merchant_id' => env('YAGOUT_MERCHANT_ID'),
    'encryption_key' => env('YAGOUT_ENCRYPTION_KEY'),
    'api_url' => env('YAGOUT_API_URL', 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration'),
    'static_link_api' => env('YAGOUT_STATIC_LINK_API', 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/staticQRPaymentResponse'),
    'payment_link_api' => env('YAGOUT_PAYMENT_LINK_API', 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/paymentByLinkResponse'),
    'static_me_id' => env('YAGOUT_STATIC_ME_ID', '202508080001'),
    'environment' => env('YAGOUT_ENVIRONMENT', 'uat'), // 'uat' or 'production'
];</code></pre>
      </div>

      <h2 id="environment-variables" class="text-2xl font-bold mt-12 mb-4">Environment Variables</h2>
      <p class="leading-relaxed mb-4">Add the following to your <code class="bg-muted px-2 py-1 rounded text-sm font-mono">.env</code> file:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># YagoutPay Configuration
YAGOUT_MERCHANT_ID=your_merchant_id_here
YAGOUT_ENCRYPTION_KEY=your_base64_encoded_key_here
YAGOUT_API_URL=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration
YAGOUT_STATIC_LINK_API=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/staticQRPaymentResponse
YAGOUT_PAYMENT_LINK_API=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/paymentByLinkResponse
YAGOUT_STATIC_ME_ID=202508080001
YAGOUT_ENVIRONMENT=uat</code></pre>
      </div>

      <h2 id="service-provider" class="text-2xl font-bold mt-12 mb-4">Register Service Provider</h2>
      <p class="leading-relaxed mb-4">Add the YagoutPay service to your service container in <code class="bg-muted px-2 py-1 rounded text-sm font-mono">app/Providers/AppServiceProvider.php</code>:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// app/Providers/AppServiceProvider.php
public function register()
{
    $this->app->singleton(YagoutPayService::class, function ($app) {
        return new YagoutPayService();
    });
    
    $this->app->singleton(StaticLinkService::class, function ($app) {
        return new StaticLinkService();
    });
}</code></pre>
      </div>

      <h2 id="production-config" class="text-2xl font-bold mt-12 mb-4">Production Configuration</h2>
      <p class="leading-relaxed mb-4">For production, update your environment variables:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># Production Configuration
YAGOUT_MERCHANT_ID=your_production_merchant_id
YAGOUT_ENCRYPTION_KEY=your_production_encryption_key
YAGOUT_API_URL=https://checkout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration
YAGOUT_ENVIRONMENT=production</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After configuration, proceed to <a href="/laravel/first-payment" class="text-blue-600 hover:underline">First Payment</a> to process your first payment with YagoutPay.</p>
      </div>
    `,
    sections: [
      { id: "create-config-file", title: "Create Configuration File" },
      { id: "environment-variables", title: "Environment Variables" },
      { id: "service-provider", title: "Register Service Provider" },
      { id: "production-config", title: "Production Configuration" },
    ],
  },
  "laravel/first-payment": {
    title: "Laravel First Payment",
    description: "Process your first payment with YagoutPay in Laravel.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Laravel Integration", href: "/laravel" },
      { label: "First Payment" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Process your first payment with YagoutPay in Laravel. This guide shows you how to create a simple payment form and handle the payment flow.</p>
      </div>

      <h2 id="create-payment-form" class="text-2xl font-bold mt-12 mb-4">Create Payment Form</h2>
      <p class="leading-relaxed mb-4">Create a simple payment form in your Laravel application:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;!-- resources/views/payment/form.blade.php --&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;YagoutPay Test Payment&lt;/title&gt;
    &lt;meta name="csrf-token" content="{{ csrf_token() }}"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Test Payment with YagoutPay&lt;/h1&gt;
    
    &lt;form id="payment-form"&gt;
        @csrf
        &lt;div&gt;
            &lt;label for="amount"&gt;Amount (ETB):&lt;/label&gt;
            &lt;input type="number" id="amount" name="amount" step="0.01" min="0.01" value="100.00" required&gt;
        &lt;/div&gt;
        
        &lt;div&gt;
            &lt;label for="email"&gt;Email:&lt;/label&gt;
            &lt;input type="email" id="email" name="email" value="test@example.com" required&gt;
        &lt;/div&gt;
        
        &lt;div&gt;
            &lt;label for="mobile_no"&gt;Mobile Number:&lt;/label&gt;
            &lt;input type="text" id="mobile_no" name="mobile_no" value="0965680964" required&gt;
        &lt;/div&gt;
        
        &lt;div&gt;
            &lt;label for="customer_name"&gt;Customer Name:&lt;/label&gt;
            &lt;input type="text" id="customer_name" name="customer_name" value="Test Customer" required&gt;
        &lt;/div&gt;
        
        &lt;button type="submit"&gt;Pay Now&lt;/button&gt;
    &lt;/form&gt;
    
    &lt;div id="result"&gt;&lt;/div&gt;
    
    &lt;script&gt;
    document.getElementById('payment-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            amount: document.getElementById('amount').value,
            email: document.getElementById('email').value,
            mobile_no: document.getElementById('mobile_no').value,
            customer_name: document.getElementById('customer_name').value,
            order_no: 'TEST_' + Date.now()
        };
        
        try {
            const response = await fetch('/api/payment/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            document.getElementById('result').innerHTML = '&lt;pre&gt;' + JSON.stringify(result, null, 2) + '&lt;/pre&gt;';
        } catch (error) {
            document.getElementById('result').innerHTML = 'Error: ' + error.message;
        }
    });
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>

      <h2 id="test-payment" class="text-2xl font-bold mt-12 mb-4">Test Payment</h2>
      <p class="leading-relaxed mb-4">Use the following test credentials:</p>

      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h3 class="font-semibold text-yellow-900 mb-2">Test Credentials</h3>
        <ul class="text-sm text-yellow-800 space-y-1">
          <li><strong>Merchant ID:</strong> 202508080001</li>
          <li><strong>Test Amount:</strong> 100.00 ETB</li>
          <li><strong>Test Mobile:</strong> 0965680964</li>
          <li><strong>Test Email:</strong> test@example.com</li>
        </ul>
      </div>

      <h2 id="success-handling" class="text-2xl font-bold mt-12 mb-4">Success Handling</h2>
      <p class="leading-relaxed mb-4">Handle successful payments in your application:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// app/Http/Controllers/PaymentController.php
public function handleSuccess(Request $request)
{
    $orderNo = $request->input('order_no');
    
    // Update order status
    // Send confirmation email
    // Log successful payment
    
    return view('payment.success', compact('orderNo'));
}

public function handleFailure(Request $request)
{
    $orderNo = $request->input('order_no');
    
    // Log failed payment
    // Send failure notification
    
    return view('payment.failure', compact('orderNo'));
}</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After your first payment, explore <a href="/laravel/hosted-payments" class="text-blue-600 hover:underline">Hosted Payments</a> and <a href="/laravel/api-integration" class="text-blue-600 hover:underline">API Integration</a> for more advanced features.</p>
      </div>
    `,
    sections: [
      { id: "create-payment-form", title: "Create Payment Form" },
      { id: "test-payment", title: "Test Payment" },
      { id: "success-handling", title: "Success Handling" },
    ],
  },
  "laravel/testing": {
    title: "Laravel Testing",
    description: "Test your YagoutPay Laravel integration with comprehensive testing strategies.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Laravel Integration", href: "/laravel" },
      { label: "Testing" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Comprehensive testing guide for your YagoutPay Laravel integration. Learn how to test payments, handle errors, and ensure your integration works correctly.</p>
      </div>

      <h2 id="test-environment" class="text-2xl font-bold mt-12 mb-4">Test Environment Setup</h2>
      <p class="leading-relaxed mb-4">Configure your Laravel application for testing with YagoutPay:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// config/yagoutpay.php
return [
    'merchant_id' => env('YAGOUT_MERCHANT_ID', '202508080001'),
    'encryption_key' => env('YAGOUT_ENCRYPTION_KEY', 'your_test_key'),
    'api_url' => env('YAGOUT_API_URL', 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration'),
    'environment' => env('YAGOUT_ENVIRONMENT', 'uat'),
    'test_mode' => env('YAGOUT_TEST_MODE', true),
];</code></pre>
      </div>

      <h2 id="unit-tests" class="text-2xl font-bold mt-12 mb-4">Unit Tests</h2>
      <p class="leading-relaxed mb-4">Create unit tests for your YagoutPay service:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// tests/Unit/YagoutPayServiceTest.php
&lt;?php

namespace Tests\\Unit;

use Tests\\TestCase;
use App\\Services\\YagoutPayService;
use GuzzleHttp\\Client;
use GuzzleHttp\\Psr7\\Response;

class YagoutPayServiceTest extends TestCase
{
    public function test_payment_processing()
    {
        $mockClient = $this->createMock(Client::class);
        $mockResponse = new Response(200, [], json_encode([
            'status' => 'Success',
            'message' => 'Payment processed successfully'
        ]));
        
        $mockClient->method('post')->willReturn($mockResponse);
        
        $service = new YagoutPayService();
        $service->setClient($mockClient);
        
        $paymentData = [
            'order_no' => 'TEST_001',
            'amount' => '100.00',
            'email_id' => 'test@example.com',
            'mobile_no' => '0965680964',
            'customer_name' => 'Test Customer'
        ];
        
        $result = $service->processPayment($paymentData);
        
        $this->assertEquals('Success', $result['status']);
    }
    
    public function test_encryption()
    {
        $service = new YagoutPayService();
        $data = ['test' => 'data'];
        
        $encrypted = $service->encryptPaymentData($data);
        $this->assertNotEmpty($encrypted);
    }
}</code></pre>
      </div>

      <h2 id="integration-tests" class="text-2xl font-bold mt-12 mb-4">Integration Tests</h2>
      <p class="leading-relaxed mb-4">Test the complete payment flow:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// tests/Feature/PaymentTest.php
&lt;?php

namespace Tests\\Feature;

use Tests\\TestCase;
use Illuminate\\Foundation\\Testing\\RefreshDatabase;

class PaymentTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_payment_api_endpoint()
    {
        $paymentData = [
            'amount' => 100.00,
            'email' => 'test@example.com',
            'mobile_no' => '0965680964',
            'customer_name' => 'Test Customer',
            'order_no' => 'TEST_' . time()
        ];
        
        $response = $this->postJson('/api/payment/process', $paymentData);
        
        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'message',
                    'data'
                ]);
    }
    
    public function test_payment_validation()
    {
        $response = $this->postJson('/api/payment/process', []);
        
        $response->assertStatus(422)
                ->assertJsonValidationErrors(['amount', 'email', 'mobile_no', 'customer_name']);
    }
}</code></pre>
      </div>

      <h2 id="test-credentials" class="text-2xl font-bold mt-12 mb-4">Test Credentials</h2>
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h3 class="font-semibold text-yellow-900 mb-2">UAT Test Credentials</h3>
        <ul class="text-sm text-yellow-800 space-y-1">
          <li><strong>Merchant ID:</strong> 202508080001</li>
          <li><strong>Test Amounts:</strong> 100.00, 500.00, 1000.00 ETB</li>
          <li><strong>Test Mobile Numbers:</strong> 0965680964, 0912345678</li>
          <li><strong>Test Emails:</strong> test@example.com, customer@test.com</li>
        </ul>
      </div>

      <h2 id="error-testing" class="text-2xl font-bold mt-12 mb-4">Error Testing</h2>
      <p class="leading-relaxed mb-4">Test error scenarios and edge cases:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>public function test_invalid_amount()
{
    $response = $this->postJson('/api/payment/process', [
        'amount' => -100,
        'email' => 'test@example.com',
        'mobile_no' => '0965680964',
        'customer_name' => 'Test Customer',
        'order_no' => 'TEST_001'
    ]);
    
    $response->assertStatus(422)
            ->assertJsonValidationErrors(['amount']);
}

public function test_network_error_handling()
{
    // Mock network failure
    $this->mock(Client::class, function ($mock) {
        $mock->shouldReceive('post')
             ->andThrow(new \\GuzzleHttp\\Exception\\ConnectException('Connection failed', new \\GuzzleHttp\\Psr7\\Request('POST', 'test')));
    });
    
    $response = $this->postJson('/api/payment/process', [
        'amount' => 100.00,
        'email' => 'test@example.com',
        'mobile_no' => '0965680964',
        'customer_name' => 'Test Customer',
        'order_no' => 'TEST_001'
    ]);
    
    $response->assertStatus(500);
}</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">TESTING COMPLETE</h3>
        <p class="text-sm text-blue-800">Your YagoutPay Laravel integration is now fully tested! Explore <a href="/laravel" class="text-blue-600 hover:underline">all Laravel integration methods</a> for production deployment.</p>
      </div>
    `,
    sections: [
      { id: "test-environment", title: "Test Environment Setup" },
      { id: "unit-tests", title: "Unit Tests" },
      { id: "integration-tests", title: "Integration Tests" },
      { id: "test-credentials", title: "Test Credentials" },
      { id: "error-testing", title: "Error Testing" },
    ],
  },
  "nodejs": {
    title: "Node.js Integration",
    description: "Complete YagoutPay Node.js integration guide.",
    breadcrumbs: [{ label: "Node.js Integration" }],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay provides comprehensive Node.js integration with multiple payment methods including hosted payments, direct API integration, and payment links for seamless payment processing in your Node.js applications.</p>
      </div>
      
      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">YagoutPay Node.js integration offers flexible payment solutions with AES-256-CBC encryption, comprehensive error handling, and support for both hosted and direct payment methods.</p>
      
      <h2 id="getting-started" class="text-2xl font-bold mt-12 mb-4">Getting Started</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><a href="/nodejs/installation" class="text-primary hover:underline">Install YagoutPay Node.js Package</a></li>
        <li><a href="/nodejs/configuration" class="text-primary hover:underline">Configure credentials</a></li>
        <li><a href="/nodejs/hosted-payments" class="text-primary hover:underline">Choose integration method</a></li>
      </ol>

      <h2 id="integration-methods" class="text-2xl font-bold mt-12 mb-4">Integration Methods</h2>
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Hosted Payments</h3>
          <p class="text-sm text-gray-700 mb-3">Redirect customers to YagoutPay's secure payment page. No PCI compliance required.</p>
          <a href="/nodejs/hosted-payments" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">API Integration</h3>
          <p class="text-sm text-gray-700 mb-3">Direct API payment processing with AES-256-CBC encryption.</p>
          <a href="/nodejs/api-integration" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Payment Links</h3>
          <p class="text-sm text-gray-700 mb-3">Generate dynamic and static payment links with QR codes.</p>
          <a href="/nodejs/payment-links" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "getting-started", title: "Getting Started" },
      { id: "integration-methods", title: "Integration Methods" },
    ],
  },
  "nodejs/installation": {
    title: "Node.js Installation",
    description: "Install YagoutPay Node.js package and set up your development environment.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Node.js Integration", href: "/nodejs" },
      { label: "Installation" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay provides comprehensive Node.js integration with multiple payment methods. This guide covers the complete setup process for Node.js applications.</p>
      </div>
      
      <div class="flex items-start gap-3 mb-8">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Follow this step-by-step guide to integrate YagoutPay payments into your Node.js application with minimal setup.</p>
      </div>

      <h2 id="prerequisites" class="text-2xl font-bold mt-12 mb-4">Prerequisites</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Node.js 16.0 or higher</li>
        <li>npm or yarn package manager</li>
        <li>TypeScript (optional but recommended)</li>
        <li>YagoutPay merchant account</li>
        <li>Valid API credentials</li>
      </ul>

      <h2 id="install-packages" class="text-2xl font-bold mt-12 mb-4">Install Required Packages</h2>
      <p class="leading-relaxed mb-4">Install the required npm packages for YagoutPay integration:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># Required packages for YagoutPay integration
npm install axios crypto

# For TypeScript projects (optional)
npm install -D @types/node typescript

# For Express.js applications
npm install express cors dotenv

# For validation (optional)
npm install class-validator class-transformer</code></pre>
      </div>

      <h2 id="environment-config" class="text-2xl font-bold mt-12 mb-4">Environment Configuration</h2>
      <p class="leading-relaxed mb-4">Create a <code class="bg-muted px-2 py-1 rounded text-sm font-mono">.env</code> file in your project root:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># YagoutPay Configuration
YAGOUT_MERCHANT_ID=202508080001
YAGOUT_ENCRYPTION_KEY=IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=
YAGOUT_API_URL=https://uatcheckout.yagoutpay.com

# For Payment Links
YAGOUT_PAYMENT_LINK_API=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/paymentByLinkResponse
YAGOUT_STATIC_LINK_API=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/staticQRPaymentResponse</code></pre>
      </div>

      <h2 id="create-crypto-util" class="text-2xl font-bold mt-12 mb-4">Create Crypto Utility</h2>
      <p class="leading-relaxed mb-4">Create a crypto utility class for encryption and decryption:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/utils/crypto.util.ts
import * as crypto from 'crypto';

export class CryptoUtil {
  aes256CbcEncryptToBase64(plaintext: string, key: string): string {
    const keyBuffer = Buffer.from(key, 'base64');
    const iv = Buffer.from('0123456789abcdef', 'utf8');
    const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);
    cipher.setAutoPadding(true);
    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    return encrypted.toString('base64');
  }

  aes256CbcDecryptFromBase64(encryptedData: string, key: string): string {
    const keyBuffer = Buffer.from(key, 'base64');
    const iv = Buffer.from('0123456789abcdef', 'utf8');
    const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);
    decipher.setAutoPadding(true);
    const decrypted = Buffer.concat([decipher.update(encryptedData, 'base64'), decipher.final()]);
    return decrypted.toString('utf8');
  }
}</code></pre>
      </div>

      <h2 id="create-payment-dto" class="text-2xl font-bold mt-12 mb-4">Create Payment DTO</h2>
      <p class="leading-relaxed mb-4">Create data transfer objects for payment requests:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/payments/dto/payment.dto.ts
export class PaymentDto {
  amount: string;
  customer_name: string;
  email_id: string;
  mobile_no: string;
  order_no: string;
  bill_address?: string;
  bill_city?: string;
  bill_state?: string;
  bill_country?: string;
  bill_zip?: string;
  wallet_type?: string;
  pg_id?: string;
  paymode?: string;
  scheme_id?: string;
}

export class PaymentLinkDto {
  amount: string;
  customer_email: string;
  mobile_no: string;
  expiry_date: string;
  first_name: string;
  last_name: string;
  product: string;
  failure_url?: string;
  success_url?: string;
}</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After installation, proceed to <a href="/nodejs/configuration" class="text-blue-600 hover:underline">Configuration</a> to set up your YagoutPay credentials and start processing payments.</p>
      </div>
    `,
    sections: [
      { id: "prerequisites", title: "Prerequisites" },
      { id: "install-packages", title: "Install Packages" },
      { id: "environment-config", title: "Environment Configuration" },
      { id: "create-crypto-util", title: "Create Crypto Utility" },
      { id: "create-payment-dto", title: "Create Payment DTO" },
    ],
  },
  "nodejs/configuration": {
    title: "Node.js Configuration",
    description: "Configure YagoutPay credentials and settings for your Node.js application.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Node.js Integration", href: "/nodejs" },
      { label: "Configuration" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Configure your YagoutPay integration with the proper credentials and environment settings. This guide covers both UAT and production configurations.</p>
      </div>
      
      <h2 id="environment-variables" class="text-2xl font-bold mt-12 mb-4">Environment Variables</h2>
      <p class="leading-relaxed mb-4">Add the following configuration to your <code class="bg-muted px-2 py-1 rounded text-sm font-mono">.env</code> file:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># YagoutPay Configuration
YAGOUT_MERCHANT_ID=202508080001
YAGOUT_ENCRYPTION_KEY=IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=
YAGOUT_API_URL=https://uatcheckout.yagoutpay.com

# For Payment Links
YAGOUT_PAYMENT_LINK_API=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/paymentByLinkResponse
YAGOUT_STATIC_LINK_API=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/staticQRPaymentResponse

# Application Configuration
PORT=3000
NODE_ENV=development</code></pre>
      </div>

      <h2 id="create-config-service" class="text-2xl font-bold mt-12 mb-4">Create Configuration Service</h2>
      <p class="leading-relaxed mb-4">Create a configuration service to manage your YagoutPay settings:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/config/yagoutpay.config.ts
import dotenv from 'dotenv';

dotenv.config();

export const yagoutPayConfig = {
  merchantId: process.env.YAGOUT_MERCHANT_ID || '202508080001',
  encryptionKey: process.env.YAGOUT_ENCRYPTION_KEY || '',
  apiUrl: process.env.YAGOUT_API_URL || 'https://uatcheckout.yagoutpay.com',
  paymentLinkApi: process.env.YAGOUT_PAYMENT_LINK_API || 
    'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/paymentByLinkResponse',
  staticLinkApi: process.env.YAGOUT_STATIC_LINK_API || 
    'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/staticQRPaymentResponse',
  environment: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production'
};

export default yagoutPayConfig;</code></pre>
      </div>

      <h2 id="create-payment-service" class="text-2xl font-bold mt-12 mb-4">Create Payment Service</h2>
      <p class="leading-relaxed mb-4">Create the core YagoutPay service class:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/services/yagoutpay.service.ts
import axios from 'axios';
import { CryptoUtil } from '../utils/crypto.util';
import { yagoutPayConfig } from '../config/yagoutpay.config';
import { PaymentDto, PaymentLinkDto } from '../dto/payment.dto';

export class YagoutPayService {
  private cryptoUtil: CryptoUtil;
  private merchantId: string;
  private encryptionKey: string;
  private apiUrl: string;

  constructor() {
    this.cryptoUtil = new CryptoUtil();
    this.merchantId = yagoutPayConfig.merchantId;
    this.encryptionKey = yagoutPayConfig.encryptionKey;
    this.apiUrl = yagoutPayConfig.apiUrl;
  }

  async initiatePayment(dto: PaymentDto) {
    const paymentData = {
      order_no: dto.order_no,
      amount: dto.amount,
      customer_name: dto.customer_name,
      email_id: dto.email_id,
      mobile_no: dto.mobile_no,
      bill_address: dto.bill_address || 'N/A',
      bill_city: dto.bill_city || 'Addis Ababa',
      bill_state: dto.bill_state || 'Addis Ababa',
      bill_country: dto.bill_country || 'ET',
      bill_zip: dto.bill_zip || '1000',
      wallet_type: dto.wallet_type || 'telebirr',
      pg_id: dto.pg_id || '67ee846571e740418d688c3f',
      paymode: dto.paymode || 'WA',
      scheme_id: dto.scheme_id || '7'
    };

    const encryptedData = this.cryptoUtil.aes256CbcEncryptToBase64(
      JSON.stringify(paymentData),
      this.encryptionKey
    );

    return {
      merchantId: this.merchantId,
      merchantRequest: encryptedData,
      redirectUrl: \`\${this.apiUrl}/checkout\`
    };
  }

  private generateOrderId(): string {
    return \`ORDER_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
  }
}</code></pre>
      </div>

      <h2 id="production-config" class="text-2xl font-bold mt-12 mb-4">Production Configuration</h2>
      <p class="leading-relaxed mb-4">For production, update your environment variables:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># Production Configuration
YAGOUT_MERCHANT_ID=your_production_merchant_id
YAGOUT_ENCRYPTION_KEY=your_production_encryption_key
YAGOUT_API_URL=https://checkout.yagoutpay.com
NODE_ENV=production</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After configuration, proceed to <a href="/nodejs/first-payment" class="text-blue-600 hover:underline">First Payment</a> to process your first payment with YagoutPay.</p>
      </div>
    `,
    sections: [
      { id: "environment-variables", title: "Environment Variables" },
      { id: "create-config-service", title: "Create Configuration Service" },
      { id: "create-payment-service", title: "Create Payment Service" },
      { id: "production-config", title: "Production Configuration" },
    ],
  },
  "nodejs/first-payment": {
    title: "Node.js First Payment",
    description: "Process your first payment with YagoutPay in Node.js.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Node.js Integration", href: "/nodejs" },
      { label: "First Payment" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Process your first payment with YagoutPay in Node.js. This guide shows you how to create a simple payment form and handle the payment flow.</p>
      </div>

      <h2 id="create-express-app" class="text-2xl font-bold mt-12 mb-4">Create Express Application</h2>
      <p class="leading-relaxed mb-4">Create a simple Express.js application with payment endpoints:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { YagoutPayService } from './services/yagoutpay.service';
import { PaymentDto } from './dto/payment.dto';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize YagoutPay service
const yagoutPayService = new YagoutPayService();

// Payment endpoint
app.post('/api/payments/initiate', async (req, res) => {
  try {
    const paymentDto: PaymentDto = req.body;
    const result = await yagoutPayService.initiatePayment(paymentDto);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});</code></pre>
      </div>

      <h2 id="create-frontend" class="text-2xl font-bold mt-12 mb-4">Create Frontend Form</h2>
      <p class="leading-relaxed mb-4">Create a simple HTML form for testing payments:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;!-- public/index.html --&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;YagoutPay Test Payment&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Test Payment with YagoutPay&lt;/h1&gt;
    
    &lt;form id="payment-form"&gt;
        &lt;div&gt;
            &lt;label for="amount"&gt;Amount (ETB):&lt;/label&gt;
            &lt;input type="number" id="amount" name="amount" step="0.01" min="0.01" value="100.00" required&gt;
        &lt;/div&gt;
        
        &lt;div&gt;
            &lt;label for="customer_name"&gt;Customer Name:&lt;/label&gt;
            &lt;input type="text" id="customer_name" name="customer_name" value="Test Customer" required&gt;
        &lt;/div&gt;
        
        &lt;div&gt;
            &lt;label for="email_id"&gt;Email:&lt;/label&gt;
            &lt;input type="email" id="email_id" name="email_id" value="test@example.com" required&gt;
        &lt;/div&gt;
        
        &lt;div&gt;
            &lt;label for="mobile_no"&gt;Mobile Number:&lt;/label&gt;
            &lt;input type="text" id="mobile_no" name="mobile_no" value="0965680964" required&gt;
        &lt;/div&gt;
        
        &lt;button type="submit"&gt;Pay Now&lt;/button&gt;
    &lt;/form&gt;
    
    &lt;div id="result"&gt;&lt;/div&gt;
    
    &lt;script&gt;
    document.getElementById('payment-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            amount: document.getElementById('amount').value,
            customer_name: document.getElementById('customer_name').value,
            email_id: document.getElementById('email_id').value,
            mobile_no: document.getElementById('mobile_no').value,
            order_no: 'TEST_' + Date.now()
        };
        
        try {
            const response = await fetch('/api/payments/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            document.getElementById('result').innerHTML = '&lt;pre&gt;' + JSON.stringify(result, null, 2) + '&lt;/pre&gt;';
        } catch (error) {
            document.getElementById('result').innerHTML = 'Error: ' + error.message;
        }
    });
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>

      <h2 id="test-payment" class="text-2xl font-bold mt-12 mb-4">Test Payment</h2>
      <p class="leading-relaxed mb-4">Use the following test credentials:</p>

      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h3 class="font-semibold text-yellow-900 mb-2">Test Credentials</h3>
        <ul class="text-sm text-yellow-800 space-y-1">
          <li><strong>Merchant ID:</strong> 202508080001</li>
          <li><strong>Test Amount:</strong> 100.00 ETB</li>
          <li><strong>Test Mobile:</strong> 0965680964</li>
          <li><strong>Test Email:</strong> test@example.com</li>
        </ul>
      </div>

      <h2 id="run-application" class="text-2xl font-bold mt-12 mb-4">Run Application</h2>
      <p class="leading-relaxed mb-4">Start your Node.js application:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># Install dependencies
npm install

# Start the application
npm start

# Or with nodemon for development
npx nodemon src/app.ts</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After your first payment, explore <a href="/nodejs/hosted-payments" class="text-blue-600 hover:underline">Hosted Payments</a> and <a href="/nodejs/api-integration" class="text-blue-600 hover:underline">API Integration</a> for more advanced features.</p>
      </div>
    `,
    sections: [
      { id: "create-express-app", title: "Create Express Application" },
      { id: "create-frontend", title: "Create Frontend Form" },
      { id: "test-payment", title: "Test Payment" },
      { id: "run-application", title: "Run Application" },
    ],
  },
  "nodejs/testing": {
    title: "Node.js Testing",
    description: "Test your YagoutPay Node.js integration with comprehensive testing strategies.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Node.js Integration", href: "/nodejs" },
      { label: "Testing" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Comprehensive testing guide for your YagoutPay Node.js integration. Learn how to test payments, handle errors, and ensure your integration works correctly.</p>
      </div>

      <h2 id="test-environment" class="text-2xl font-bold mt-12 mb-4">Test Environment Setup</h2>
      <p class="leading-relaxed mb-4">Configure your Node.js application for testing with YagoutPay:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># .env.test
YAGOUT_MERCHANT_ID=202508080001
YAGOUT_ENCRYPTION_KEY=IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=
YAGOUT_API_URL=https://uatcheckout.yagoutpay.com
NODE_ENV=test</code></pre>
      </div>

      <h2 id="unit-tests" class="text-2xl font-bold mt-12 mb-4">Unit Tests</h2>
      <p class="leading-relaxed mb-4">Create unit tests for your YagoutPay service:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// tests/yagoutpay.service.test.ts
import { YagoutPayService } from '../src/services/yagoutpay.service';
import { PaymentDto } from '../src/dto/payment.dto';

describe('YagoutPayService', () => {
  let service: YagoutPayService;

  beforeEach(() => {
    service = new YagoutPayService();
  });

  describe('initiatePayment', () => {
    it('should create payment request with encrypted data', async () => {
      const paymentDto: PaymentDto = {
        amount: '100.00',
        customer_name: 'Test Customer',
        email_id: 'test@example.com',
        mobile_no: '0965680964',
        order_no: 'TEST_001'
      };

      const result = await service.initiatePayment(paymentDto);

      expect(result).toHaveProperty('merchantId');
      expect(result).toHaveProperty('merchantRequest');
      expect(result).toHaveProperty('redirectUrl');
      expect(result.merchantRequest).toBeDefined();
    });
  });

  describe('encryption', () => {
    it('should encrypt and decrypt data correctly', () => {
      const testData = { test: 'data' };
      const encrypted = service['cryptoUtil'].aes256CbcEncryptToBase64(
        JSON.stringify(testData),
        'test-key'
      );
      
      expect(encrypted).toBeDefined();
      expect(typeof encrypted).toBe('string');
    });
  });
});</code></pre>
      </div>

      <h2 id="integration-tests" class="text-2xl font-bold mt-12 mb-4">Integration Tests</h2>
      <p class="leading-relaxed mb-4">Test the complete payment flow:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// tests/payment.integration.test.ts
import request from 'supertest';
import app from '../src/app';

describe('Payment Integration', () => {
  it('should initiate payment successfully', async () => {
    const paymentData = {
      amount: '100.00',
      customer_name: 'Test Customer',
      email_id: 'test@example.com',
      mobile_no: '0965680964',
      order_no: 'TEST_' + Date.now()
    };

    const response = await request(app)
      .post('/api/payments/initiate')
      .send(paymentData)
      .expect(200);

    expect(response.body).toHaveProperty('merchantId');
    expect(response.body).toHaveProperty('merchantRequest');
    expect(response.body).toHaveProperty('redirectUrl');
  });

  it('should handle invalid payment data', async () => {
    const invalidData = {
      amount: '',
      customer_name: '',
      email_id: 'invalid-email',
      mobile_no: '',
      order_no: ''
    };

    const response = await request(app)
      .post('/api/payments/initiate')
      .send(invalidData)
      .expect(500);

    expect(response.body).toHaveProperty('error');
  });
});</code></pre>
      </div>

      <h2 id="test-credentials" class="text-2xl font-bold mt-12 mb-4">Test Credentials</h2>
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h3 class="font-semibold text-yellow-900 mb-2">UAT Test Credentials</h3>
        <ul class="text-sm text-yellow-800 space-y-1">
          <li><strong>Merchant ID:</strong> 202508080001</li>
          <li><strong>Test Amounts:</strong> 100.00, 500.00, 1000.00 ETB</li>
          <li><strong>Test Mobile Numbers:</strong> 0965680964, 0912345678</li>
          <li><strong>Test Emails:</strong> test@example.com, customer@test.com</li>
        </ul>
      </div>

      <h2 id="error-testing" class="text-2xl font-bold mt-12 mb-4">Error Testing</h2>
      <p class="leading-relaxed mb-4">Test error scenarios and edge cases:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>describe('Error Handling', () => {
  it('should handle network errors gracefully', async () => {
    // Mock network failure
    jest.spyOn(axios, 'post').mockRejectedValue(new Error('Network Error'));

    const paymentData = {
      amount: '100.00',
      customer_name: 'Test Customer',
      email_id: 'test@example.com',
      mobile_no: '0965680964',
      order_no: 'TEST_001'
    };

    const response = await request(app)
      .post('/api/payments/initiate')
      .send(paymentData)
      .expect(500);

    expect(response.body.error).toContain('Network Error');
  });

  it('should validate required fields', async () => {
    const incompleteData = {
      amount: '100.00'
      // Missing required fields
    };

    const response = await request(app)
      .post('/api/payments/initiate')
      .send(incompleteData)
      .expect(500);

    expect(response.body.error).toBeDefined();
  });
});</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">TESTING COMPLETE</h3>
        <p class="text-sm text-blue-800">Your YagoutPay Node.js integration is now fully tested! Explore <a href="/nodejs" class="text-blue-600 hover:underline">all Node.js integration methods</a> for production deployment.</p>
      </div>
    `,
    sections: [
      { id: "test-environment", title: "Test Environment Setup" },
      { id: "unit-tests", title: "Unit Tests" },
      { id: "integration-tests", title: "Integration Tests" },
      { id: "test-credentials", title: "Test Credentials" },
      { id: "error-testing", title: "Error Testing" },
    ],
  },
  "nodejs/hosted-payments": {
    title: "Node.js Hosted Payments",
    description: "Implement hosted payments with YagoutPay in Node.js applications with complete implementation details.",
    breadcrumbs: [
      { label: "Node.js Integration", href: "/nodejs" },
      { label: "Hosted Payments" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Hosted payments redirect customers to YagoutPay's secure payment page. This method requires no PCI compliance and provides a seamless payment experience with complete data encryption and form submission.</p>
      </div>

      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">Hosted payments redirect customers to YagoutPay's secure payment page where they can complete their payment. The process involves encrypting payment data, generating a security hash, and submitting a form to YagoutPay.</p>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-4">Hosted Payment Flow</h3>
        <ol class="text-sm text-blue-800 list-decimal pl-6 space-y-2">
          <li><strong>Data Collection:</strong> Collect payment data from customer form</li>
          <li><strong>Data Structure:</strong> Build complete payment structure with all required fields</li>
          <li><strong>Encryption:</strong> Encrypt payment data using AES-256-CBC with padding</li>
          <li><strong>Hash Generation:</strong> Generate SHA-512 security hash</li>
          <li><strong>Form Submission:</strong> Auto-submit form to YagoutPay hosted page</li>
          <li><strong>Payment Processing:</strong> Customer completes payment on YagoutPay page</li>
          <li><strong>Callback Handling:</strong> Handle success/failure callbacks from YagoutPay</li>
        </ol>
      </div>

      <h2 id="encryption-service" class="text-2xl font-bold mt-12 mb-4">Encryption Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle AES-256-CBC encryption for hosted payments:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Encryption Service with Node.js:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/services/yagoutpay-hosted-encryption.service.ts
import crypto from 'crypto';

export class YagoutPayHostedEncryptionService {
  private merchantId: string;
  private encryptionKey: string;
  private iv: string;

  constructor(merchantId: string, encryptionKey: string) {
    this.merchantId = merchantId;
    this.encryptionKey = encryptionKey;
    this.iv = '0123456789abcdef'; // Fixed 16-byte IV
  }

  // AES-256-CBC Encryption for Hosted Payments with Padding
  encrypt(text: string): string {
    try {
      const key = Buffer.from(this.encryptionKey, 'base64');
      const iv = Buffer.from(this.iv, 'utf8');
      
      // Manual padding for hosted payments
      const size = 16;
      const pad = size - (text.length % size);
      const padtext = text + String.fromCharCode(pad).repeat(pad);
      
      const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
      cipher.setAutoPadding(false); // Manual padding
      
      const encrypted = Buffer.concat([
        cipher.update(padtext, 'utf8'),
        cipher.final()
      ]);
      
      return encrypted.toString('base64');
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Encryption failed');
    }
  }

  // AES-256-CBC Decryption for Response Handling
  decrypt(encryptedData: string): string {
    try {
      const key = Buffer.from(this.encryptionKey, 'base64');
      const iv = Buffer.from(this.iv, 'utf8');
      
      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
      decipher.setAutoPadding(false); // Manual padding
      
      const decrypted = Buffer.concat([
        decipher.update(Buffer.from(encryptedData, 'base64')),
        decipher.final()
      ]);
      
      const decryptedText = decrypted.toString('utf8');
      
      // Remove padding
      const pad = decryptedText.charCodeAt(decryptedText.length - 1);
      if (pad > decryptedText.length) {
        throw new Error('Invalid padding');
      }
      
      return decryptedText.slice(0, -pad);
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Decryption failed');
    }
  }
}</code></pre>
      </div>

      <h2 id="hosted-payment-service" class="text-2xl font-bold mt-12 mb-4">Hosted Payment Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle hosted payment processing:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Hosted Payment Service with Node.js:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/services/yagoutpay-hosted.service.ts
import crypto from 'crypto';
import { YagoutPayHostedEncryptionService } from './yagoutpay-hosted-encryption.service';

export interface HostedPaymentData {
  order_no: string;
  amount: string;
  customer_name: string;
  email_id: string;
  mobile_no: string;
  bill_address?: string;
  bill_city?: string;
  bill_state?: string;
  bill_country?: string;
  bill_zip?: string;
  success_url: string;
  failure_url: string;
}

export class YagoutPayHostedService {
  private encryptionService: YagoutPayHostedEncryptionService;
  private merchantId: string;
  private saltKey: string;
  private gatewayUrl: string;

  constructor(merchantId: string, encryptionKey: string, saltKey: string, gatewayUrl: string) {
    this.merchantId = merchantId;
    this.saltKey = saltKey;
    this.gatewayUrl = gatewayUrl;
    this.encryptionService = new YagoutPayHostedEncryptionService(merchantId, encryptionKey);
  }

  // Build Complete Payment Data Structure
  buildPaymentData(orderData: HostedPaymentData) {
    return {
      txn_details: {
        ag_id: 'yagout',
        me_id: this.merchantId,
        order_no: orderData.order_no,
        amount: orderData.amount,
        country: 'ETH',
        currency: 'ETB',
        txn_type: 'SALE',
        success_url: orderData.success_url,
        failure_url: orderData.failure_url,
        channel: 'WEB'
      },
      pg_details: {
        pg_id: '',
        paymode: '',
        scheme_id: '',
        wallet_type: ''
      },
      card_details: {
        card_number: '',
        expiry_month: '',
        expiry_year: '',
        cvv: ''
      },
      cust_details: {
        card_name: '',
        cust_name: orderData.customer_name,
        customer_email: orderData.email_id,
        customer_mobile: orderData.mobile_no,
        customer_id: '',
        is_logged_in: 'Y'
      },
      bill_details: {
        bill_address: orderData.bill_address || 'N/A',
        bill_city: orderData.bill_city || 'Addis Ababa',
        bill_state: orderData.bill_state || 'Addis Ababa',
        bill_country: orderData.bill_country || 'ET',
        bill_zip: orderData.bill_zip || '1000'
      },
      ship_details: {
        ship_address: orderData.bill_address || 'N/A',
        ship_city: orderData.bill_city || 'Addis Ababa',
        ship_state: orderData.bill_state || 'Addis Ababa',
        ship_country: orderData.bill_country || 'ET',
        ship_zip: orderData.bill_zip || '1000',
        ship_days: '1',
        address_count: '1'
      },
      item_details: {
        item_count: '1',
        item_value: orderData.amount,
        item_category: 'Payment'
      },
      upi_details: {
        udf_1: '',
        udf_2: '',
        udf_3: '',
        udf_4: '',
        udf_5: ''
      },
      other_details: {
        order_no: orderData.order_no,
        amount: orderData.amount,
        currency: 'ETB',
        country: 'ETH'
      }
    };
  }

  // Generate SHA-512 Security Hash
  generateHash(paymentData: any): string {
    const allValues = [
      paymentData.txn_details,
      paymentData.pg_details,
      paymentData.card_details,
      paymentData.cust_details,
      paymentData.bill_details,
      paymentData.ship_details,
      paymentData.item_details,
      paymentData.upi_details,
      paymentData.other_details
    ].map(section => Object.values(section).join('|')).join('~');

    return crypto.createHash('sha512').update(allValues + this.saltKey).digest('base64');
  }

  // Process Hosted Payment
  async processHostedPayment(orderData: HostedPaymentData) {
    try {
      // Step 1: Build payment data structure
      const paymentData = this.buildPaymentData(orderData);
      
      // Step 2: Encrypt payment data
      const allValues = [
        paymentData.txn_details,
        paymentData.pg_details,
        paymentData.card_details,
        paymentData.cust_details,
        paymentData.bill_details,
        paymentData.ship_details,
        paymentData.item_details,
        paymentData.upi_details,
        paymentData.other_details
      ].map(section => Object.values(section).join('|')).join('~');

      const encryptedData = this.encryptionService.encrypt(allValues);
      
      // Step 3: Generate security hash
      const hash = this.generateHash(paymentData);
      
      // Step 4: Prepare hosted payment data
      const hostedPaymentData = {
        me_id: this.merchantId,
        merchant_request: encryptedData,
        hash: hash,
        gateway_url: this.gatewayUrl
      };
      
      return {
        success: true,
        hostedPaymentData: hostedPaymentData,
        redirectUrl: this.gatewayUrl
      };
    } catch (error) {
      console.error('Hosted payment processing error:', error);
      return {
        success: false,
        error: 'Hosted payment processing failed: ' + (error as Error).message
      };
    }
  }

  // Validate Payment Data
  validatePaymentData(data: HostedPaymentData) {
    const errors: string[] = [];
    
    if (!data.amount || parseFloat(data.amount) <= 0) {
      errors.push('Amount is required and must be greater than 0');
    }
    
    if (!data.customer_name || data.customer_name.trim() === '') {
      errors.push('Customer name is required');
    }
    
    if (!data.email_id || !this.isValidEmail(data.email_id)) {
      errors.push('Valid email is required');
    }
    
    if (!data.mobile_no || data.mobile_no.trim() === '') {
      errors.push('Mobile number is required');
    }
    
    if (!data.order_no || data.order_no.trim() === '') {
      errors.push('Order number is required');
    }
    
    if (!data.success_url || data.success_url.trim() === '') {
      errors.push('Success URL is required');
    }
    
    if (!data.failure_url || data.failure_url.trim() === '') {
      errors.push('Failure URL is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  // Email validation helper
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
  }
}</code></pre>
      </div>

      <h2 id="hosted-payment-controller" class="text-2xl font-bold mt-12 mb-4">Hosted Payment Controller</h2>
      <p class="leading-relaxed mb-4">Create a controller to handle hosted payment requests:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Hosted Payment Controller with Node.js:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/controllers/hosted-payment.controller.ts
import { Request, Response } from 'express';
import { YagoutPayHostedService, HostedPaymentData } from '../services/yagoutpay-hosted.service';
import { yagoutPayConfig } from '../config/yagoutpay.config';

export class HostedPaymentController {
  private hostedPaymentService: YagoutPayHostedService;

  constructor() {
    const config = yagoutPayConfig.current;
    this.hostedPaymentService = new YagoutPayHostedService(
      config.merchantId,
      config.encryptionKey,
      config.saltKey,
      config.gatewayUrl
    );
  }

  // Initiate Hosted Payment
  async initiateHostedPayment(req: Request, res: Response) {
    try {
      const paymentData: HostedPaymentData = req.body;
      
      // Validate payment data
      const validation = this.hostedPaymentService.validatePaymentData(paymentData);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.errors
        });
      }

      // Process hosted payment
      const result = await this.hostedPaymentService.processHostedPayment(paymentData);
      
      if (result.success) {
        // Log successful payment initiation
        console.log('Hosted payment initiated:', result.hostedPaymentData.me_id);
        
        res.json({
          success: true,
          hostedPaymentData: result.hostedPaymentData,
          redirectUrl: result.redirectUrl
        });
      } else {
        // Log failed payment initiation
        console.error('Hosted payment failed:', result.error);
        
        res.status(400).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      console.error('Hosted payment controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Hosted payment processing failed: ' + (error as Error).message
      });
    }
  }

  // Handle Payment Success Callback
  async handlePaymentSuccess(req: Request, res: Response) {
    try {
      const { status, order_no, transaction_id, amount } = req.body;
      
      if (status === 'SUCCESS') {
        // Log successful payment
        console.log('Payment successful:', { order_no, transaction_id, amount });
        
        // Update your database, send confirmation email, etc.
        // await this.updateOrderStatus(order_no, 'SUCCESS', transaction_id);
        
        res.json({ 
          success: true, 
          message: 'Payment successful',
          order_no,
          transaction_id,
          amount
        });
      } else {
        // Log failed payment
        console.log('Payment failed:', { order_no, status });
        
        res.json({ 
          success: false, 
          message: 'Payment failed',
          order_no,
          status
        });
      }
    } catch (error) {
      console.error('Payment success callback error:', error);
      res.status(500).json({ 
        success: false,
        error: (error as Error).message 
      });
    }
  }

  // Handle Payment Failure Callback
  async handlePaymentFailure(req: Request, res: Response) {
    try {
      const { status, order_no, error_message } = req.body;
      
      // Log failed payment
      console.log('Payment failed:', { order_no, status, error_message });
      
      // Update your database, send failure notification, etc.
      // await this.updateOrderStatus(order_no, 'FAILED', null, error_message);
      
      res.json({ 
        success: false, 
        message: 'Payment failed',
        order_no,
        status,
        error_message
      });
    } catch (error) {
      console.error('Payment failure callback error:', error);
      res.status(500).json({ 
        success: false,
        error: (error as Error).message 
      });
    }
  }
}</code></pre>
      </div>

      <h2 id="configuration" class="text-2xl font-bold mt-12 mb-4">Configuration</h2>
      <p class="leading-relaxed mb-4">Set up your YagoutPay hosted payment configuration:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Configuration with Node.js:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/config/yagoutpay.config.ts
export const yagoutPayConfig = {
  // Environment Toggle
  useUat: process.env.NODE_ENV !== 'production',
  
  // UAT Configuration
  uat: {
    merchantId: '202504290002',
    encryptionKey: 'neTdYIKd87JEj4C6ZoYjaeBiCoeOr40ZKBEI8EU/8lo=',
    saltKey: 'YOUR_SALT_KEY',
    gatewayUrl: 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/paymentRedirection/checksumGatewayPage'
  },
  
  // Production Configuration
  production: {
    merchantId: process.env.YAGOUT_MERCHANT_ID || 'YOUR_PRODUCTION_MERCHANT_ID',
    encryptionKey: process.env.YAGOUT_ENCRYPTION_KEY || 'YOUR_PRODUCTION_ENCRYPTION_KEY',
    saltKey: process.env.YAGOUT_SALT_KEY || 'YOUR_PRODUCTION_SALT_KEY',
    gatewayUrl: 'https://checkout.yagoutpay.com/ms-transaction-core-1-0/paymentRedirection/checksumGatewayPage'
  },
  
  // Get current configuration
  get current() {
    return this.useUat ? this.uat : this.production;
  }
};</code></pre>
      </div>

      <h2 id="api-routes" class="text-2xl font-bold mt-12 mb-4">API Routes</h2>
      <p class="leading-relaxed mb-4">Define API routes for hosted payment processing:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example API Routes with Node.js:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/routes/hosted-payment.routes.ts
import express from 'express';
import { HostedPaymentController } from '../controllers/hosted-payment.controller';

const router = express.Router();
const hostedPaymentController = new HostedPaymentController();

// Hosted payment routes
router.post('/hosted/initiate', hostedPaymentController.initiateHostedPayment.bind(hostedPaymentController));
router.post('/hosted/success', hostedPaymentController.handlePaymentSuccess.bind(hostedPaymentController));
router.post('/hosted/failure', hostedPaymentController.handlePaymentFailure.bind(hostedPaymentController));

export default router;</code></pre>
      </div>

      <h2 id="frontend-integration" class="text-2xl font-bold mt-12 mb-4">Frontend Integration</h2>
      <p class="leading-relaxed mb-4">Create a complete hosted payment form with Node.js integration:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Hosted Payment Form with Node.js:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;!-- public/hosted-payment.html --&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;YagoutPay Hosted Payment&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;style&gt;
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
        .form-group input, .form-group select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        .pay-button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        .pay-button:disabled { background: #ccc; cursor: not-allowed; }
        .success-message { color: green; padding: 10px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; }
        .error-message { color: red; padding: 10px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hosted Payment with YagoutPay&lt;/h1&gt;
    
    &lt;form id="hosted-payment-form"&gt;
        &lt;div class="form-group"&gt;
            &lt;label for="amount"&gt;Amount (ETB) *&lt;/label&gt;
            &lt;input type="number" id="amount" name="amount" step="0.01" min="0.01" value="100.00" required&gt;
        &lt;/div&gt;
        
        &lt;div class="form-group"&gt;
            &lt;label for="customer_name"&gt;Customer Name *&lt;/label&gt;
            &lt;input type="text" id="customer_name" name="customer_name" value="Test Customer" required&gt;
        &lt;/div&gt;
        
        &lt;div class="form-group"&gt;
            &lt;label for="email_id"&gt;Email *&lt;/label&gt;
            &lt;input type="email" id="email_id" name="email_id" value="test@example.com" required&gt;
        &lt;/div&gt;
        
        &lt;div class="form-group"&gt;
            &lt;label for="mobile_no"&gt;Mobile Number *&lt;/label&gt;
            &lt;input type="text" id="mobile_no" name="mobile_no" value="0965680964" required&gt;
        &lt;/div&gt;
        
        &lt;div class="form-group"&gt;
            &lt;label for="bill_address"&gt;Billing Address&lt;/label&gt;
            &lt;input type="text" id="bill_address" name="bill_address" value="Addis Ababa"&gt;
        &lt;/div&gt;
        
        &lt;div class="form-group"&gt;
            &lt;label for="bill_city"&gt;Billing City&lt;/label&gt;
            &lt;input type="text" id="bill_city" name="bill_city" value="Addis Ababa"&gt;
        &lt;/div&gt;
        
        &lt;button type="submit" id="pay-button" class="pay-button"&gt;
            &lt;span id="button-text"&gt;Pay with YagoutPay&lt;/span&gt;
            &lt;span id="button-loading" style="display: none;"&gt;Processing...&lt;/span&gt;
        &lt;/button&gt;
    &lt;/form&gt;
    
    &lt;div id="result"&gt;&lt;/div&gt;
    
    &lt;script&gt;
    document.getElementById('hosted-payment-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        showLoading(true);
        
        try {
            const formData = {
                order_no: 'HOSTED_' + Date.now(),
                amount: document.getElementById('amount').value,
                customer_name: document.getElementById('customer_name').value,
                email_id: document.getElementById('email_id').value,
                mobile_no: document.getElementById('mobile_no').value,
                bill_address: document.getElementById('bill_address').value || 'N/A',
                bill_city: document.getElementById('bill_city').value || 'Addis Ababa',
                bill_state: 'Addis Ababa',
                bill_country: 'ET',
                bill_zip: '1000',
                success_url: window.location.origin + '/success',
                failure_url: window.location.origin + '/failure'
            };
            
            const response = await fetch('/api/payments/hosted/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Redirect to YagoutPay hosted page
                window.location.href = result.redirectUrl;
            } else {
                showPaymentResult('error', 'Payment failed: ' + result.error);
            }
        } catch (error) {
            console.error('Payment error:', error);
            showPaymentResult('error', 'Payment processing failed: ' + error.message);
        } finally {
            // Hide loading state
            showLoading(false);
        }
    });
    
    // Show loading state
    function showLoading(show) {
        const button = document.getElementById('pay-button');
        const buttonText = document.getElementById('button-text');
        const buttonLoading = document.getElementById('button-loading');
        
        if (show) {
            button.disabled = true;
            buttonText.style.display = 'none';
            buttonLoading.style.display = 'inline';
        } else {
            button.disabled = false;
            buttonText.style.display = 'inline';
            buttonLoading.style.display = 'none';
        }
    }
    
    // Show payment result
    function showPaymentResult(type, message) {
        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';
        resultDiv.className = type === 'success' ? 'success-message' : 'error-message';
        resultDiv.textContent = message;
        
        // Scroll to result
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-green-900 mb-4">Key Implementation Points</h3>
        <ul class="text-sm text-green-800 list-disc pl-6 space-y-2">
          <li><strong>Encryption:</strong> All payment data must be encrypted using AES-256-CBC with manual padding</li>
          <li><strong>Hash Generation:</strong> Generate SHA-512 security hash for data integrity</li>
          <li><strong>Form Submission:</strong> Auto-submit form to YagoutPay hosted page</li>
          <li><strong>Callback Handling:</strong> Handle success/failure callbacks from YagoutPay</li>
          <li><strong>Domain Registration:</strong> Register your domain with YagoutPay for hosted payments</li>
          <li><strong>No REST API:</strong> Hosted payments use HTML form submission, not REST API calls</li>
        </ul>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After implementing hosted payments, explore <a href="/nodejs/api-integration" class="text-blue-600 hover:underline">API Integration</a> for direct payment processing.</p>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "encryption-service", title: "Encryption Service" },
      { id: "hosted-payment-service", title: "Hosted Payment Service" },
      { id: "hosted-payment-controller", title: "Hosted Payment Controller" },
      { id: "configuration", title: "Configuration" },
      { id: "api-routes", title: "API Routes" },
      { id: "frontend-integration", title: "Frontend Integration" },
    ],
  },
  "nodejs/api-integration": {
    title: "Node.js API Integration",
    description: "Direct API integration with YagoutPay in Node.js applications with complete implementation details.",
    breadcrumbs: [
      { label: "Node.js Integration", href: "/nodejs" },
      { label: "API Integration" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Direct API integration processes payments without redirecting users to external pages. All payment processing happens within your application using YagoutPay's API with AES-256-CBC encryption.</p>
      </div>

      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">Direct API integration uses YagoutPay's API to process payments directly in your Node.js application. The process involves encrypting payment data, making API calls, and handling encrypted responses.</p>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-4">Direct API Payment Flow</h3>
        <ol class="text-sm text-blue-800 list-decimal pl-6 space-y-2">
          <li><strong>Data Collection:</strong> Collect payment data from customer form</li>
          <li><strong>Data Structure:</strong> Build complete payment structure with all required fields</li>
          <li><strong>Encryption:</strong> Encrypt payment data using AES-256-CBC</li>
          <li><strong>API Call:</strong> Send encrypted data to YagoutPay API endpoint</li>
          <li><strong>Response Handling:</strong> Decrypt and process YagoutPay response</li>
          <li><strong>Result Processing:</strong> Handle success/failure and update UI</li>
        </ol>
      </div>

      <h2 id="encryption-service" class="text-2xl font-bold mt-12 mb-4">Encryption Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle AES-256-CBC encryption for direct payments:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Encryption Service with Node.js:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/services/yagoutpay-encryption.service.ts
import crypto from 'crypto';

export class YagoutPayEncryptionService {
  private merchantId: string;
  private encryptionKey: string;
  private iv: string;

  constructor(merchantId: string, encryptionKey: string) {
    this.merchantId = merchantId;
    this.encryptionKey = encryptionKey;
    this.iv = '0123456789abcdef'; // Fixed 16-byte IV
  }

  // AES-256-CBC Encryption for Direct Payments
  encrypt(data: any): string {
    try {
      const key = Buffer.from(this.encryptionKey, 'base64');
      const iv = Buffer.from(this.iv, 'utf8');
      
      const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
      cipher.setAutoPadding(true);
      
      const encrypted = Buffer.concat([
        cipher.update(JSON.stringify(data), 'utf8'),
        cipher.final()
      ]);
      
      return encrypted.toString('base64');
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Encryption failed');
    }
  }

  // AES-256-CBC Decryption for Response Handling
  decrypt(encryptedData: string): any {
    try {
      const key = Buffer.from(this.encryptionKey, 'base64');
      const iv = Buffer.from(this.iv, 'utf8');
      
      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
      decipher.setAutoPadding(true);
      
      const decrypted = Buffer.concat([
        decipher.update(Buffer.from(encryptedData, 'base64')),
        decipher.final()
      ]);
      
      return JSON.parse(decrypted.toString('utf8'));
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Decryption failed');
    }
  }
}</code></pre>
      </div>

      <h2 id="payment-service" class="text-2xl font-bold mt-12 mb-4">Direct Payment Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle direct payment processing:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Direct Payment Service with Node.js:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/services/yagoutpay-direct.service.ts
import axios from 'axios';
import { YagoutPayEncryptionService } from './yagoutpay-encryption.service';

export interface PaymentData {
  order_no: string;
  amount: string;
  customer_name: string;
  email_id: string;
  mobile_no: string;
  bill_address?: string;
  bill_city?: string;
  bill_state?: string;
  bill_country?: string;
  bill_zip?: string;
  wallet_type?: string;
}

export class YagoutPayDirectService {
  private encryptionService: YagoutPayEncryptionService;
  private merchantId: string;
  private apiUrl: string;

  constructor(merchantId: string, encryptionKey: string, apiUrl: string) {
    this.merchantId = merchantId;
    this.apiUrl = apiUrl;
    this.encryptionService = new YagoutPayEncryptionService(merchantId, encryptionKey);
  }

  // Build Complete Payment Data Structure
  buildPaymentData(orderData: PaymentData) {
    return {
      card_details: {
        card_number: '',
        expiry_month: '',
        expiry_year: '',
        cvv: ''
      },
      other_details: {
        order_no: orderData.order_no,
        amount: orderData.amount,
        currency: 'ETB',
        country: 'ETH'
      },
      ship_details: {
        ship_name: orderData.customer_name,
        ship_address: orderData.bill_address || 'N/A',
        ship_city: orderData.bill_city || 'Addis Ababa',
        ship_state: orderData.bill_state || 'Addis Ababa',
        ship_country: orderData.bill_country || 'ET',
        ship_zip: orderData.bill_zip || '1000'
      },
      txn_details: {
        txn_type: 'SALE',
        txn_sub_type: 'PAYMENT'
      },
      item_details: [
        {
          item_name: 'Payment',
          item_amount: orderData.amount,
          item_quantity: '1'
        }
      ],
      cust_details: {
        customer_name: orderData.customer_name,
        customer_email: orderData.email_id,
        customer_mobile: orderData.mobile_no
      },
      pg_details: {
        pg_id: '67ee846571e740418d688c3f',
        paymode: 'WA',
        scheme_id: '7',
        wallet_type: orderData.wallet_type || 'telebirr'
      },
      bill_details: {
        bill_name: orderData.customer_name,
        bill_address: orderData.bill_address || 'N/A',
        bill_city: orderData.bill_city || 'Addis Ababa',
        bill_state: orderData.bill_state || 'Addis Ababa',
        bill_country: orderData.bill_country || 'ET',
        bill_zip: orderData.bill_zip || '1000'
      }
    };
  }

  // Process Direct Payment
  async processPayment(orderData: PaymentData) {
    try {
      // Step 1: Build payment data structure
      const paymentData = this.buildPaymentData(orderData);
      
      // Step 2: Encrypt payment data
      const encryptedData = this.encryptionService.encrypt(paymentData);
      
      // Step 3: Prepare API request
      const requestData = {
        merchantId: this.merchantId,
        merchantRequest: encryptedData
      };
      
      // Step 4: Make API call
      const response = await axios.post(this.apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      // Step 5: Handle response
      if (response.data.status === 'Success') {
        return {
          success: true,
          transactionId: response.data.transactionId,
          message: 'Payment processed successfully'
        };
      } else {
        return {
          success: false,
          error: response.data.statusMessage || 'Payment failed'
        };
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error: 'Payment processing failed: ' + (error as Error).message
      };
    }
  }

  // Validate Payment Data
  validatePaymentData(data: PaymentData) {
    const errors: string[] = [];
    
    if (!data.amount || parseFloat(data.amount) <= 0) {
      errors.push('Amount is required and must be greater than 0');
    }
    
    if (!data.customer_name || data.customer_name.trim() === '') {
      errors.push('Customer name is required');
    }
    
    if (!data.email_id || !this.isValidEmail(data.email_id)) {
      errors.push('Valid email is required');
    }
    
    if (!data.mobile_no || data.mobile_no.trim() === '') {
      errors.push('Mobile number is required');
    }
    
    if (!data.order_no || data.order_no.trim() === '') {
      errors.push('Order number is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  // Email validation helper
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
  }
}</code></pre>
      </div>

      <h2 id="configuration" class="text-2xl font-bold mt-12 mb-4">Configuration</h2>
      <p class="leading-relaxed mb-4">Set up your YagoutPay direct payment configuration:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Configuration with Node.js:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/config/yagoutpay.config.ts
export const yagoutPayConfig = {
  // Environment Toggle
  useUat: process.env.NODE_ENV !== 'production',
  
  // UAT Configuration
  uat: {
    merchantId: '202504290002',
    encryptionKey: 'neTdYIKd87JEj4C6ZoYjaeBiCoeOr40ZKBEI8EU/8lo=',
    apiUrl: 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration'
  },
  
  // Production Configuration
  production: {
    merchantId: process.env.YAGOUT_MERCHANT_ID || 'YOUR_PRODUCTION_MERCHANT_ID',
    encryptionKey: process.env.YAGOUT_ENCRYPTION_KEY || 'YOUR_PRODUCTION_ENCRYPTION_KEY',
    apiUrl: 'https://checkout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration'
  },
  
  // Get current configuration
  get current() {
    return this.useUat ? this.uat : this.production;
  },
  
  // Payment Gateway Details (Never Change)
  pgDetails: {
    pgId: '67ee846571e740418d688c3f',
    paymode: 'WA',
    schemeId: '7'
  },
  
  // Default Values
  defaults: {
    currency: 'ETB',
    country: 'ETH',
    walletType: 'telebirr'
  }
};</code></pre>
      </div>

      <h2 id="payment-controller" class="text-2xl font-bold mt-12 mb-4">Payment Controller</h2>
      <p class="leading-relaxed mb-4">Create a controller to handle payment requests:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Payment Controller with Node.js:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/controllers/payment.controller.ts
import { Request, Response } from 'express';
import { YagoutPayDirectService, PaymentData } from '../services/yagoutpay-direct.service';
import { yagoutPayConfig } from '../config/yagoutpay.config';

export class PaymentController {
  private paymentService: YagoutPayDirectService;

  constructor() {
    const config = yagoutPayConfig.current;
    this.paymentService = new YagoutPayDirectService(
      config.merchantId,
      config.encryptionKey,
      config.apiUrl
    );
  }

  // Process Payment
  async processPayment(req: Request, res: Response) {
    try {
      const paymentData: PaymentData = req.body;
      
      // Validate payment data
      const validation = this.paymentService.validatePaymentData(paymentData);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.errors
        });
      }

      // Process payment
      const result = await this.paymentService.processPayment(paymentData);
      
      if (result.success) {
        // Log successful payment
        console.log('Payment successful:', result.transactionId);
        
        res.json({
          success: true,
          transactionId: result.transactionId,
          message: result.message
        });
      } else {
        // Log failed payment
        console.error('Payment failed:', result.error);
        
        res.status(400).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      console.error('Payment controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Payment processing failed: ' + (error as Error).message
      });
    }
  }

  // Get Payment Status
  async getPaymentStatus(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      
      // Implement payment status checking logic
      res.json({
        success: true,
        orderId,
        status: 'PROCESSING'
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: (error as Error).message 
      });
    }
  }
}</code></pre>
      </div>

      <h2 id="api-routes" class="text-2xl font-bold mt-12 mb-4">API Routes</h2>
      <p class="leading-relaxed mb-4">Define API routes for direct payment processing:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example API Routes with Node.js:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/routes/payment.routes.ts
import express from 'express';
import { PaymentController } from '../controllers/payment.controller';

const router = express.Router();
const paymentController = new PaymentController();

// Direct API payment routes
router.post('/api/initiate', paymentController.processPayment.bind(paymentController));
router.get('/api/status/:orderId', paymentController.getPaymentStatus.bind(paymentController));

export default router;</code></pre>
      </div>

      <h2 id="frontend-integration" class="text-2xl font-bold mt-12 mb-4">Frontend Integration</h2>
      <p class="leading-relaxed mb-4">Create a complete payment form with Node.js integration:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Payment Form with Node.js:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;!-- public/api-payment.html --&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;YagoutPay API Payment&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;style&gt;
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
        .form-group input, .form-group select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        .pay-button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        .pay-button:disabled { background: #ccc; cursor: not-allowed; }
        .success-message { color: green; padding: 10px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; }
        .error-message { color: red; padding: 10px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Direct API Payment with YagoutPay&lt;/h1&gt;
    
    &lt;form id="api-payment-form"&gt;
        &lt;div class="form-group"&gt;
            &lt;label for="amount"&gt;Amount (ETB) *&lt;/label&gt;
            &lt;input type="number" id="amount" name="amount" step="0.01" min="0.01" value="100.00" required&gt;
        &lt;/div&gt;
        
        &lt;div class="form-group"&gt;
            &lt;label for="customer_name"&gt;Customer Name *&lt;/label&gt;
            &lt;input type="text" id="customer_name" name="customer_name" value="Test Customer" required&gt;
        &lt;/div&gt;
        
        &lt;div class="form-group"&gt;
            &lt;label for="email_id"&gt;Email *&lt;/label&gt;
            &lt;input type="email" id="email_id" name="email_id" value="test@example.com" required&gt;
        &lt;/div&gt;
        
        &lt;div class="form-group"&gt;
            &lt;label for="mobile_no"&gt;Mobile Number *&lt;/label&gt;
            &lt;input type="text" id="mobile_no" name="mobile_no" value="0965680964" required&gt;
        &lt;/div&gt;
        
        &lt;div class="form-group"&gt;
            &lt;label for="wallet_type"&gt;Payment Method *&lt;/label&gt;
            &lt;select id="wallet_type" name="wallet_type" required&gt;
                &lt;option value="telebirr"&gt;Telebirr&lt;/option&gt;
                &lt;option value="cbe"&gt;CBE&lt;/option&gt;
                &lt;option value="awash"&gt;Awash Bank&lt;/option&gt;
            &lt;/select&gt;
        &lt;/div&gt;
        
        &lt;div class="form-group"&gt;
            &lt;label for="bill_address"&gt;Billing Address&lt;/label&gt;
            &lt;input type="text" id="bill_address" name="bill_address" value="Addis Ababa"&gt;
        &lt;/div&gt;
        
        &lt;div class="form-group"&gt;
            &lt;label for="bill_city"&gt;Billing City&lt;/label&gt;
            &lt;input type="text" id="bill_city" name="bill_city" value="Addis Ababa"&gt;
        &lt;/div&gt;
        
        &lt;button type="submit" id="pay-button" class="pay-button"&gt;
            &lt;span id="button-text"&gt;Pay Now&lt;/span&gt;
            &lt;span id="button-loading" style="display: none;"&gt;Processing...&lt;/span&gt;
        &lt;/button&gt;
    &lt;/form&gt;
    
    &lt;div id="result"&gt;&lt;/div&gt;
    
    &lt;script&gt;
    document.getElementById('api-payment-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        showLoading(true);
        
        try {
            const formData = {
                order_no: 'ORDER_' + Date.now(),
                amount: document.getElementById('amount').value,
                customer_name: document.getElementById('customer_name').value,
                email_id: document.getElementById('email_id').value,
                mobile_no: document.getElementById('mobile_no').value,
                wallet_type: document.getElementById('wallet_type').value,
                bill_address: document.getElementById('bill_address').value || 'N/A',
                bill_city: document.getElementById('bill_city').value || 'Addis Ababa',
                bill_state: 'Addis Ababa',
                bill_country: 'ET',
                bill_zip: '1000'
            };
            
            const response = await fetch('/api/payments/api/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showPaymentResult('success', 'Payment successful! Transaction ID: ' + result.transactionId);
            } else {
                showPaymentResult('error', 'Payment failed: ' + result.error);
            }
        } catch (error) {
            console.error('Payment error:', error);
            showPaymentResult('error', 'Payment processing failed: ' + error.message);
        } finally {
            // Hide loading state
            showLoading(false);
        }
    });
    
    // Show loading state
    function showLoading(show) {
        const button = document.getElementById('pay-button');
        const buttonText = document.getElementById('button-text');
        const buttonLoading = document.getElementById('button-loading');
        
        if (show) {
            button.disabled = true;
            buttonText.style.display = 'none';
            buttonLoading.style.display = 'inline';
        } else {
            button.disabled = false;
            buttonText.style.display = 'inline';
            buttonLoading.style.display = 'none';
        }
    }
    
    // Show payment result
    function showPaymentResult(type, message) {
        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';
        resultDiv.className = type === 'success' ? 'success-message' : 'error-message';
        resultDiv.textContent = message;
        
        // Scroll to result
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>

      <h2 id="error-handling" class="text-2xl font-bold mt-12 mb-4">Error Handling</h2>
      <p class="leading-relaxed mb-4">Handle common YagoutPay errors and validation:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Error Handling with Node.js:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/utils/error-handler.ts
export class YagoutPayErrorHandler {
  static handleError(error: Error) {
    const errorMessages: { [key: string]: string } = {
      'Order Id already exists': 'This order has already been processed. Please use a different order number.',
      'Invalid Request Body': 'Payment data is invalid. Please check your information.',
      'Unexpected token': 'Invalid response from payment server. Please try again.',
      'INTERNAL_SERVER_ERROR': 'Payment server error. Please try again later.',
      'Encryption failed': 'Payment encryption failed. Please try again.',
      'Decryption failed': 'Payment response could not be processed. Please try again.',
      'Network error': 'Unable to connect to payment server. Please check your internet connection.'
    };
    
    // Check for specific error messages
    for (const [key, message] of Object.entries(errorMessages)) {
      if (error.message.includes(key)) {
        return {
          userMessage: message,
          technicalError: error.message,
          shouldRetry: this.shouldRetryError(key)
        };
      }
    }
    
    // Default error handling
    return {
      userMessage: 'Payment processing failed. Please try again.',
      technicalError: error.message,
      shouldRetry: false
    };
  }
  
  static shouldRetryError(errorType: string): boolean {
    const retryableErrors = [
      'Network error',
      'INTERNAL_SERVER_ERROR',
      'Unexpected token'
    ];
    
    return retryableErrors.includes(errorType);
  }
  
  static async retryPayment(paymentFunction: () => Promise<any>, maxRetries: number = 3): Promise<any> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await paymentFunction();
      } catch (error) {
        const errorInfo = this.handleError(error as Error);
        
        if (attempt === maxRetries || !errorInfo.shouldRetry) {
          throw error;
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }
}</code></pre>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-green-900 mb-4">Key Implementation Points</h3>
        <ul class="text-sm text-green-800 list-disc pl-6 space-y-2">
          <li><strong>Encryption:</strong> All payment data must be encrypted using AES-256-CBC</li>
          <li><strong>API Endpoint:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">/apiRedirection/apiIntegration</code></li>
          <li><strong>Headers Required:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">Content-Type: application/json</code></li>
          <li><strong>Response Handling:</strong> All responses need to be processed for success/failure</li>
          <li><strong>Error Handling:</strong> Implement proper error handling for network and API errors</li>
          <li><strong>Validation:</strong> Validate all required fields before processing</li>
        </ul>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After implementing API integration, explore <a href="/nodejs/payment-links" class="text-blue-600 hover:underline">Payment Links</a> for creating shareable payment links.</p>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "encryption-service", title: "Encryption Service" },
      { id: "payment-service", title: "Direct Payment Service" },
      { id: "configuration", title: "Configuration" },
      { id: "payment-controller", title: "Payment Controller" },
      { id: "api-routes", title: "API Routes" },
      { id: "frontend-integration", title: "Frontend Integration" },
      { id: "error-handling", title: "Error Handling" },
    ],
  },
  "nodejs/payment-links": {
    title: "Node.js Payment Links",
    description: "Create dynamic and static payment links with YagoutPay in Node.js applications.",
    breadcrumbs: [
      { label: "Node.js Integration", href: "/nodejs" },
      { label: "Payment Links" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Payment links allow you to create shareable payment URLs and QR codes for easy payment collection. Support both dynamic and static payment links with YagoutPay.</p>
      </div>

      <h2 id="payment-link-service" class="text-2xl font-bold mt-12 mb-4">Payment Link Service</h2>
      <p class="leading-relaxed mb-4">Create a service for generating payment links:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/services/payment-link.service.ts
import axios from 'axios';
import { CryptoUtil } from '../utils/crypto.util';
import { yagoutPayConfig } from '../config/yagoutpay.config';
import { PaymentLinkDto } from '../dto/payment.dto';

export class PaymentLinkService {
  private cryptoUtil: CryptoUtil;
  private merchantId: string;
  private encryptionKey: string;
  private paymentLinkApi: string;
  private staticLinkApi: string;

  constructor() {
    this.cryptoUtil = new CryptoUtil();
    this.merchantId = yagoutPayConfig.merchantId;
    this.encryptionKey = yagoutPayConfig.encryptionKey;
    this.paymentLinkApi = yagoutPayConfig.paymentLinkApi;
    this.staticLinkApi = yagoutPayConfig.staticLinkApi;
  }

  async createDynamicPaymentLink(dto: PaymentLinkDto) {
    const requestData = {
      req_user_id: "yagou381",
      me_id: this.merchantId,
      amount: String(dto.amount),
      customer_email: String(dto.customer_email ?? ''),
      mobile_no: String(dto.mobile_no ?? ''),
      expiry_date: String(dto.expiry_date ?? '2025-12-31'),
      media_type: ["API"],
      order_id: this.generateOrderId(),
      first_name: String(dto.first_name ?? 'YagoutPay'),
      last_name: String(dto.last_name ?? 'DynamicLink'),
      product: String(dto.product ?? 'Premium Subscription'),
      dial_code: '+251',
      failure_url: String(dto.failure_url ?? 'http://localhost:3000/failure'),
      success_url: String(dto.success_url ?? 'http://localhost:3000/success'),
      country: 'ETH',
      currency: 'ETB'
    };

    const encryptedRequest = this.cryptoUtil.aes256CbcEncryptToBase64(
      JSON.stringify(requestData),
      this.encryptionKey
    );

    const response = await axios.post(
      this.paymentLinkApi,
      { request: encryptedRequest },
      {
        headers: {
          'Content-Type': 'application/json',
          'me_id': this.merchantId
        }
      }
    );

    return this.processPaymentLinkResponse(response.data, requestData.order_id);
  }

  async createStaticPaymentLink(dto: PaymentLinkDto) {
    const requestData = {
      req_user_id: "yagou381",
      me_id: this.merchantId,
      amount: String(dto.amount),
      customer_email: String(dto.customer_email ?? ''),
      mobile_no: String(dto.mobile_no ?? ''),
      expiry_date: String(dto.expiry_date ?? '2025-12-31'),
      media_type: ["API"],
      order_id: this.generateOrderId(),
      first_name: String(dto.first_name ?? 'YagoutPay'),
      last_name: String(dto.last_name ?? 'StaticLink'),
      product: String(dto.product ?? 'Premium Subscription'),
      dial_code: '+251',
      failure_url: String(dto.failure_url ?? 'http://localhost:3000/failure'),
      success_url: String(dto.success_url ?? 'http://localhost:3000/success'),
      country: 'ETH',
      currency: 'ETB'
    };

    const encryptedRequest = this.cryptoUtil.aes256CbcEncryptToBase64(
      JSON.stringify(requestData),
      this.encryptionKey
    );

    const response = await axios.post(
      this.staticLinkApi,
      { request: encryptedRequest },
      {
        headers: {
          'Content-Type': 'application/json',
          'me_id': this.merchantId
        }
      }
    );

    return this.processPaymentLinkResponse(response.data, requestData.order_id);
  }

  private generateOrderId(): string {
    return \`LINK_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
  }

  private processPaymentLinkResponse(response: any, orderId: string) {
    if (response.status === 'SUCCESS') {
      return {
        success: true,
        paymentUrl: response.responseData.payment_url,
        orderId: orderId,
        qrCode: response.responseData.qr_code,
        expiryDate: response.responseData.expiry_date
      };
    } else {
      throw new Error(\`Payment link creation failed: \${response.userMessage}\`);
    }
  }
}</code></pre>
      </div>

      <h2 id="payment-link-controller" class="text-2xl font-bold mt-12 mb-4">Payment Link Controller</h2>
      <p class="leading-relaxed mb-4">Create a controller for payment link endpoints:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/controllers/payment-link.controller.ts
import { Request, Response } from 'express';
import { PaymentLinkService } from '../services/payment-link.service';
import { PaymentLinkDto } from '../dto/payment.dto';

export class PaymentLinkController {
  private paymentLinkService: PaymentLinkService;

  constructor() {
    this.paymentLinkService = new PaymentLinkService();
  }

  async createDynamicLink(req: Request, res: Response) {
    try {
      const linkDto: PaymentLinkDto = req.body;
      const result = await this.paymentLinkService.createDynamicPaymentLink(linkDto);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async createStaticLink(req: Request, res: Response) {
    try {
      const linkDto: PaymentLinkDto = req.body;
      const result = await this.paymentLinkService.createStaticPaymentLink(linkDto);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}</code></pre>
      </div>

      <h2 id="payment-link-routes" class="text-2xl font-bold mt-12 mb-4">Payment Link Routes</h2>
      <p class="leading-relaxed mb-4">Define routes for payment link creation:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// src/routes/payment-link.routes.ts
import express from 'express';
import { PaymentLinkController } from '../controllers/payment-link.controller';

const router = express.Router();
const paymentLinkController = new PaymentLinkController();

// Payment link routes
router.post('/link/dynamic', paymentLinkController.createDynamicLink.bind(paymentLinkController));
router.post('/link/static', paymentLinkController.createStaticLink.bind(paymentLinkController));

export default router;</code></pre>
      </div>

      <h2 id="frontend-payment-links" class="text-2xl font-bold mt-12 mb-4">Frontend Payment Links</h2>
      <p class="leading-relaxed mb-4">Create a frontend form for generating payment links:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;!-- public/payment-links.html --&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;YagoutPay Payment Links&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Create Payment Links with YagoutPay&lt;/h1&gt;
    
    &lt;form id="payment-link-form"&gt;
        &lt;div&gt;
            &lt;label for="amount"&gt;Amount (ETB):&lt;/label&gt;
            &lt;input type="number" id="amount" name="amount" step="0.01" min="0.01" value="500.00" required&gt;
        &lt;/div&gt;
        
        &lt;div&gt;
            &lt;label for="customer_email"&gt;Customer Email:&lt;/label&gt;
            &lt;input type="email" id="customer_email" name="customer_email" value="test@example.com" required&gt;
        &lt;/div&gt;
        
        &lt;div&gt;
            &lt;label for="mobile_no"&gt;Mobile Number:&lt;/label&gt;
            &lt;input type="text" id="mobile_no" name="mobile_no" value="0965680964" required&gt;
        &lt;/div&gt;
        
        &lt;div&gt;
            &lt;label for="expiry_date"&gt;Expiry Date:&lt;/label&gt;
            &lt;input type="date" id="expiry_date" name="expiry_date" value="2025-10-27" required&gt;
        &lt;/div&gt;
        
        &lt;div&gt;
            &lt;label for="first_name"&gt;First Name:&lt;/label&gt;
            &lt;input type="text" id="first_name" name="first_name" value="YagoutPay" required&gt;
        &lt;/div&gt;
        
        &lt;div&gt;
            &lt;label for="last_name"&gt;Last Name:&lt;/label&gt;
            &lt;input type="text" id="last_name" name="last_name" value="TestUser" required&gt;
        &lt;/div&gt;
        
        &lt;div&gt;
            &lt;label for="product"&gt;Product:&lt;/label&gt;
            &lt;input type="text" id="product" name="product" value="Premium Subscription" required&gt;
        &lt;/div&gt;
        
        &lt;div&gt;
            &lt;label&gt;Link Type:&lt;/label&gt;
            &lt;select id="link_type"&gt;
                &lt;option value="dynamic"&gt;Dynamic Link&lt;/option&gt;
                &lt;option value="static"&gt;Static Link&lt;/option&gt;
            &lt;/select&gt;
        &lt;/div&gt;
        
        &lt;button type="submit"&gt;Create Payment Link&lt;/button&gt;
    &lt;/form&gt;
    
    &lt;div id="result"&gt;&lt;/div&gt;
    
    &lt;script&gt;
    document.getElementById('payment-link-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            amount: document.getElementById('amount').value,
            customer_email: document.getElementById('customer_email').value,
            mobile_no: document.getElementById('mobile_no').value,
            expiry_date: document.getElementById('expiry_date').value,
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            product: document.getElementById('product').value
        };
        
        const linkType = document.getElementById('link_type').value;
        const endpoint = linkType === 'dynamic' ? '/api/payments/link/dynamic' : '/api/payments/link/static';
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                document.getElementById('result').innerHTML = 
                    '&lt;div style="color: green;"&gt;Payment link created successfully!&lt;/div&gt;' +
                    '&lt;div&gt;&lt;strong&gt;Payment URL:&lt;/strong&gt; &lt;a href="' + result.data.paymentUrl + '" target="_blank"&gt;' + result.data.paymentUrl + '&lt;/a&gt;&lt;/div&gt;' +
                    '&lt;div&gt;&lt;strong&gt;Order ID:&lt;/strong&gt; ' + result.data.orderId + '&lt;/div&gt;' +
                    '&lt;pre&gt;' + JSON.stringify(result.data, null, 2) + '&lt;/pre&gt;';
            } else {
                document.getElementById('result').innerHTML = 
                    '&lt;div style="color: red;"&gt;Error: ' + result.error + '&lt;/div&gt;';
            }
        } catch (error) {
            document.getElementById('result').innerHTML = 
                '&lt;div style="color: red;"&gt;Error: ' + error.message + '&lt;/div&gt;';
        }
    });
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">INTEGRATION COMPLETE</h3>
        <p class="text-sm text-blue-800">Your YagoutPay Node.js integration is now complete! Explore <a href="/nodejs" class="text-blue-600 hover:underline">all Node.js integration methods</a> for production deployment.</p>
      </div>
    `,
    sections: [
      { id: "payment-link-service", title: "Payment Link Service" },
      { id: "payment-link-controller", title: "Payment Link Controller" },
      { id: "payment-link-routes", title: "Payment Link Routes" },
      { id: "frontend-payment-links", title: "Frontend Payment Links" },
    ],
  },
  "java": {
    title: "Java Integration",
    description: "Complete YagoutPay Java integration guide for e-commerce applications.",
    breadcrumbs: [{ label: "Java Integration" }],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay provides comprehensive Java integration for e-commerce applications with three main stages: Hosted Checkout, Direct API, and Static Link API. Perfect for Java web applications using servlets and JSP.</p>
      </div>
      
      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">YagoutPay Java integration offers flexible payment solutions with AES-256-CBC encryption, comprehensive error handling, and support for both hosted and direct payment methods in Java web applications.</p>
      
      <h2 id="getting-started" class="text-2xl font-bold mt-12 mb-4">Getting Started</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><a href="/java/installation" class="text-primary hover:underline">Install Java Dependencies</a></li>
        <li><a href="/java/configuration" class="text-primary hover:underline">Configure YagoutPay Service</a></li>
        <li><a href="/java/hosted-payments" class="text-primary hover:underline">Choose integration method</a></li>
      </ol>

      <h2 id="integration-methods" class="text-2xl font-bold mt-12 mb-4">Integration Methods</h2>
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Hosted Payments</h3>
          <p class="text-sm text-gray-700 mb-3">Redirect customers to YagoutPay's secure payment page. No PCI compliance required.</p>
          <a href="/java/hosted-payments" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">API Integration</h3>
          <p class="text-sm text-gray-700 mb-3">Direct API payment processing with AES-256-CBC encryption.</p>
          <a href="/java/api-integration" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Payment Links</h3>
          <p class="text-sm text-gray-700 mb-3">Generate static payment links and QR codes for easy payment collection.</p>
          <a href="/java/payment-links" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "getting-started", title: "Getting Started" },
      { id: "integration-methods", title: "Integration Methods" },
    ],
  },
  "java/installation": {
    title: "Java Installation",
    description: "Install YagoutPay Java dependencies and set up your development environment.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Java Integration", href: "/java" },
      { label: "Installation" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay provides comprehensive Java integration for e-commerce applications. This guide covers the complete setup process for Java web applications using servlets and JSP.</p>
      </div>
      
      <div class="flex items-start gap-3 mb-8">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Follow this step-by-step guide to integrate YagoutPay payments into your Java application with minimal setup.</p>
      </div>

      <h2 id="prerequisites" class="text-2xl font-bold mt-12 mb-4">Prerequisites</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Java: JDK 11 or higher</li>
        <li>Servlet Container: Apache Tomcat 10.0.27+</li>
        <li>Database: MySQL 8.0+</li>
        <li>IDE: Eclipse EE or IntelliJ IDEA</li>
        <li>YagoutPay merchant account</li>
        <li>Valid API credentials</li>
      </ul>

      <h2 id="maven-dependencies" class="text-2xl font-bold mt-12 mb-4">Maven Dependencies</h2>
      <p class="leading-relaxed mb-4">Add the following dependencies to your <code class="bg-muted px-2 py-1 rounded text-sm font-mono">pom.xml</code>:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;com.google.code.gson&lt;/groupId&gt;
        &lt;artifactId&gt;gson&lt;/artifactId&gt;
        &lt;version&gt;2.10.1&lt;/version&gt;
    &lt;/dependency&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;mysql&lt;/groupId&gt;
        &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
        &lt;version&gt;9.3.0&lt;/version&gt;
    &lt;/dependency&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;jakarta.servlet&lt;/groupId&gt;
        &lt;artifactId&gt;jakarta.servlet-api&lt;/artifactId&gt;
        &lt;version&gt;6.0.0&lt;/version&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;</code></pre>
      </div>

      <h2 id="manual-jar-installation" class="text-2xl font-bold mt-12 mb-4">Manual JAR Installation</h2>
      <p class="leading-relaxed mb-4">If not using Maven, include these JAR files in <code class="bg-muted px-2 py-1 rounded text-sm font-mono">src/main/webapp/WEB-INF/lib/</code>:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># Required JAR files
gson-2.10.1.jar - JSON processing
mysql-connector-j-9.3.0.jar - MySQL connectivity
jakarta.mail-2.0.1.jar - Email functionality
servlet-api.jar - Servlet support
angus-activation-2.0.1.jar - Activation framework
jakarta.activation-api-2.1.2.jar - Jakarta activation</code></pre>
      </div>

      <h2 id="project-structure" class="text-2xl font-bold mt-12 mb-4">Project Structure</h2>
      <p class="leading-relaxed mb-4">Create the following directory structure for your Java web application:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── yourcompany/
│   │           └── yagoutpay/
│   │               ├── YagoutPayService.java
│   │               ├── PaymentServlet.java
│   │               └── StaticLinkService.java
│   └── webapp/
│       ├── WEB-INF/
│       │   ├── web.xml
│       │   └── lib/
│       │       └── [JAR files]
│       ├── checkout.jsp
│       ├── success.jsp
│       └── failure.jsp</code></pre>
      </div>

      <h2 id="web-xml-config" class="text-2xl font-bold mt-12 mb-4">Web.xml Configuration</h2>
      <p class="leading-relaxed mb-4">Configure your <code class="bg-muted px-2 py-1 rounded text-sm font-mono">web.xml</code> for servlet mapping:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
         https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd"
         version="6.0"&gt;
    
    &lt;servlet&gt;
        &lt;servlet-name&gt;PaymentServlet&lt;/servlet-name&gt;
        &lt;servlet-class&gt;com.yourcompany.yagoutpay.PaymentServlet&lt;/servlet-class&gt;
    &lt;/servlet&gt;
    
    &lt;servlet-mapping&gt;
        &lt;servlet-name&gt;PaymentServlet&lt;/servlet-name&gt;
        &lt;url-pattern&gt;/PaymentServlet&lt;/url-pattern&gt;
    &lt;/servlet-mapping&gt;
    
&lt;/web-app&gt;</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After installation, proceed to <a href="/java/configuration" class="text-blue-600 hover:underline">Configuration</a> to set up your YagoutPay service and start processing payments.</p>
      </div>
    `,
    sections: [
      { id: "prerequisites", title: "Prerequisites" },
      { id: "maven-dependencies", title: "Maven Dependencies" },
      { id: "manual-jar-installation", title: "Manual JAR Installation" },
      { id: "project-structure", title: "Project Structure" },
      { id: "web-xml-config", title: "Web.xml Configuration" },
    ],
  },
  "java/configuration": {
    title: "Java Configuration",
    description: "Configure YagoutPay service and encryption for your Java application.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Java Integration", href: "/java" },
      { label: "Configuration" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Configure your YagoutPay integration with the proper service setup, encryption configuration, and environment settings for Java applications.</p>
      </div>
      
      <h2 id="yagoutpay-service" class="text-2xl font-bold mt-12 mb-4">YagoutPay Service Configuration</h2>
      <p class="leading-relaxed mb-4">Create the core YagoutPay service class with encryption capabilities:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// YagoutPayService.java
package com.yourcompany.yagoutpay;

import com.google.gson.JsonObject;
import com.google.gson.Gson;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.spec.IvParameterSpec;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import javax.servlet.http.HttpServletRequest;

public class YagoutPayService {
    // Configuration Constants
    private static final String MERCHANT_ID = "202508080001";
    private static final String ENCRYPTION_KEY = "IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=";
    private static final String API_URL = "https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration";
    private static final String IV = "0123456789abcdef"; // Fixed 16-byte IV
    
    private Gson gson = new Gson();

    public String encryptData(String data) throws Exception {
        byte[] key = Base64.getDecoder().decode(ENCRYPTION_KEY);
        byte[] ivBytes = IV.getBytes(StandardCharsets.UTF_8);
        
        SecretKeySpec secretKey = new SecretKeySpec(key, "AES");
        IvParameterSpec ivSpec = new IvParameterSpec(ivBytes);
        
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivSpec);
        
        byte[] encrypted = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(encrypted);
    }

    public JsonObject buildPaymentData(HttpServletRequest request) {
        JsonObject paymentData = new JsonObject();
        
        // Card details (empty for direct API)
        JsonObject cardDetails = new JsonObject();
        cardDetails.addProperty("cardNumber", "");
        cardDetails.addProperty("expiryMonth", "");
        cardDetails.addProperty("expiryYear", "");
        cardDetails.addProperty("cvv", "");
        cardDetails.addProperty("cardName", "");
        paymentData.add("card_details", cardDetails);
        
        // Transaction details
        JsonObject txnDetails = new JsonObject();
        txnDetails.addProperty("agId", "yagout");
        txnDetails.addProperty("meId", MERCHANT_ID);
        txnDetails.addProperty("orderNo", request.getParameter("order_no"));
        txnDetails.addProperty("amount", request.getParameter("amount"));
        txnDetails.addProperty("country", "ETH");
        txnDetails.addProperty("currency", "ETB");
        txnDetails.addProperty("transactionType", "SALE");
        txnDetails.addProperty("channel", "API");
        paymentData.add("txn_details", txnDetails);
        
        // Customer details
        JsonObject custDetails = new JsonObject();
        custDetails.addProperty("customerName", request.getParameter("customer_name"));
        custDetails.addProperty("emailId", request.getParameter("email_id"));
        custDetails.addProperty("mobileNumber", request.getParameter("mobile_no"));
        custDetails.addProperty("isLoggedIn", "Y");
        paymentData.add("cust_details", custDetails);
        
        return paymentData;
    }
}</code></pre>
      </div>

      <h2 id="encryption-setup" class="text-2xl font-bold mt-12 mb-4">Encryption Setup</h2>
      <p class="leading-relaxed mb-4">The encryption method uses AES-256-CBC with the following configuration:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Encryption Configuration
Algorithm: AES-256-CBC with PKCS5Padding
Key: Base64 decoded from merchant key
IV: Fixed 16-byte initialization vector
Process:
1. Convert JSON data to string
2. Encrypt using AES-256-CBC
3. Base64 encode the result
4. Send as "merchantRequest" in API call</code></pre>
      </div>

      <h2 id="api-communication" class="text-2xl font-bold mt-12 mb-4">API Communication</h2>
      <p class="leading-relaxed mb-4">Add the API communication method to your YagoutPay service:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>public JsonObject callYagoutPayAPI(JsonObject encryptedData) throws Exception {
    disableSSLVerification(); // For development only
    
    URL url = new URL(API_URL);
    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    
    connection.setRequestMethod("POST");
    connection.setRequestProperty("Content-Type", "application/json");
    connection.setRequestProperty("Accept", "application/json");
    connection.setDoOutput(true);
    
    // Send encrypted data
    String jsonInputString = gson.toJson(encryptedData);
    
    try (OutputStream os = connection.getOutputStream()) {
        byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
        os.write(input, 0, input.length);
    }
    
    // Handle response
    int responseCode = connection.getResponseCode();
    if (responseCode == HttpURLConnection.HTTP_OK) {
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8))) {
            StringBuilder response = new StringBuilder();
            String responseLine;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
            return gson.fromJson(response.toString(), JsonObject.class);
        }
    } else {
        throw new Exception("API call failed with response code: " + responseCode);
    }
}</code></pre>
      </div>

      <h2 id="production-config" class="text-2xl font-bold mt-12 mb-4">Production Configuration</h2>
      <p class="leading-relaxed mb-4">For production, update your configuration:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Production Configuration
private static final String MERCHANT_ID = "your_production_merchant_id";
private static final String ENCRYPTION_KEY = "your_production_encryption_key";
private static final String API_URL = "https://checkout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration";

// Remove SSL bypass in production
// Remove disableSSLVerification() method</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After configuration, proceed to <a href="/java/first-payment" class="text-blue-600 hover:underline">First Payment</a> to process your first payment with YagoutPay.</p>
      </div>
    `,
    sections: [
      { id: "yagoutpay-service", title: "YagoutPay Service Configuration" },
      { id: "encryption-setup", title: "Encryption Setup" },
      { id: "api-communication", title: "API Communication" },
      { id: "production-config", title: "Production Configuration" },
    ],
  },
  "java/first-payment": {
    title: "Java First Payment",
    description: "Process your first payment with YagoutPay in Java applications.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Java Integration", href: "/java" },
      { label: "First Payment" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Process your first payment with YagoutPay in Java. This guide shows you how to create a payment servlet and handle the payment flow.</p>
      </div>

      <h2 id="payment-servlet" class="text-2xl font-bold mt-12 mb-4">Payment Servlet</h2>
      <p class="leading-relaxed mb-4">Create a payment servlet to handle payment requests:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// PaymentServlet.java
@WebServlet("/PaymentServlet")
public class PaymentServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            // Validate required fields
            if (!validateRequest(request)) {
                request.setAttribute("error", "Please fill in all required fields");
                request.getRequestDispatcher("checkout.jsp").forward(request, response);
                return;
            }
            
            YagoutPayService yagoutPayService = new YagoutPayService();
            
            // Step 1: Get encrypted data
            JsonObject encryptedData = yagoutPayService.initiatePayment(request);
            
            // Step 2: Call YagoutPay API
            JsonObject result = yagoutPayService.callYagoutPayAPI(encryptedData);
            
            // Step 3: Handle response
            if (result.has("status") && "Success".equals(result.get("status").getAsString())) {
                response.sendRedirect("success.jsp");
            } else {
                response.sendRedirect("failure.jsp");
            }
        } catch (Exception e) {
            request.setAttribute("error", "Payment processing failed: " + e.getMessage());
            request.getRequestDispatcher("checkout.jsp").forward(request, response);
        }
    }
    
    private boolean validateRequest(HttpServletRequest request) {
        return request.getParameter("customer_name") != null &&
               request.getParameter("email_id") != null &&
               request.getParameter("mobile_no") != null &&
               request.getParameter("amount") != null;
    }
}</code></pre>
      </div>

      <h2 id="checkout-jsp" class="text-2xl font-bold mt-12 mb-4">Checkout JSP</h2>
      <p class="leading-relaxed mb-4">Create a checkout form for payment processing:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;!-- checkout.jsp --&gt;
&lt;%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;YagoutPay Checkout&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Payment with YagoutPay&lt;/h1&gt;
    
    &lt;% if (request.getAttribute("error") != null) { %&gt;
        &lt;div style="color: red;"&gt;&lt;%= request.getAttribute("error") %&gt;&lt;/div&gt;
    &lt;% } %&gt;
    
    &lt;form action="PaymentServlet" method="post"&gt;
        &lt;div&gt;
            &lt;label for="customer_name"&gt;Customer Name:&lt;/label&gt;
            &lt;input type="text" id="customer_name" name="customer_name" value="Test Customer" required&gt;
        &lt;/div&gt;
        
        &lt;div&gt;
            &lt;label for="email_id"&gt;Email:&lt;/label&gt;
            &lt;input type="email" id="email_id" name="email_id" value="test@example.com" required&gt;
        &lt;/div&gt;
        
        &lt;div&gt;
            &lt;label for="mobile_no"&gt;Mobile Number:&lt;/label&gt;
            &lt;input type="text" id="mobile_no" name="mobile_no" value="0965680964" required&gt;
        &lt;/div&gt;
        
        &lt;div&gt;
            &lt;label for="amount"&gt;Amount (ETB):&lt;/label&gt;
            &lt;input type="number" id="amount" name="amount" step="0.01" min="0.01" value="100.00" required&gt;
        &lt;/div&gt;
        
        &lt;input type="hidden" name="order_no" value="&lt;%= System.currentTimeMillis() %&gt;"&gt;
        
        &lt;button type="submit"&gt;Pay Now&lt;/button&gt;
    &lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>

      <h2 id="test-credentials" class="text-2xl font-bold mt-12 mb-4">Test Credentials</h2>
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h3 class="font-semibold text-yellow-900 mb-2">Test Credentials</h3>
        <ul class="text-sm text-yellow-800 space-y-1">
          <li><strong>Merchant ID:</strong> 202508080001</li>
          <li><strong>Test Amount:</strong> 100.00 ETB</li>
          <li><strong>Test Mobile:</strong> 0965680964</li>
          <li><strong>Test Email:</strong> test@example.com</li>
        </ul>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After your first payment, explore <a href="/java/hosted-payments" class="text-blue-600 hover:underline">Hosted Payments</a> and <a href="/java/api-integration" class="text-blue-600 hover:underline">API Integration</a> for more advanced features.</p>
      </div>
    `,
    sections: [
      { id: "payment-servlet", title: "Payment Servlet" },
      { id: "checkout-jsp", title: "Checkout JSP" },
      { id: "test-credentials", title: "Test Credentials" },
    ],
  },
  "java/testing": {
    title: "Java Testing",
    description: "Test your YagoutPay Java integration with comprehensive testing strategies.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Java Integration", href: "/java" },
      { label: "Testing" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Comprehensive testing guide for your YagoutPay Java integration. Learn how to test payments, handle errors, and ensure your integration works correctly.</p>
      </div>

      <h2 id="test-environment" class="text-2xl font-bold mt-12 mb-4">Test Environment Setup</h2>
      <p class="leading-relaxed mb-4">Configure your Java application for testing with YagoutPay:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Test Configuration
private static final String MERCHANT_ID = "202508080001";
private static final String ENCRYPTION_KEY = "IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=";
private static final String API_URL = "https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration";</code></pre>
      </div>

      <h2 id="unit-tests" class="text-2xl font-bold mt-12 mb-4">Unit Tests</h2>
      <p class="leading-relaxed mb-4">Create unit tests for your YagoutPay service:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// YagoutPayServiceTest.java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class YagoutPayServiceTest {
    
    @Test
    public void testEncryption() throws Exception {
        YagoutPayService service = new YagoutPayService();
        String testData = "{\\"test\\": \\"data\\"}";
        
        String encrypted = service.encryptData(testData);
        assertNotNull(encrypted);
        assertTrue(encrypted.length() > 0);
    }
    
    @Test
    public void testPaymentDataBuilding() {
        // Mock HttpServletRequest
        HttpServletRequest mockRequest = createMockRequest();
        YagoutPayService service = new YagoutPayService();
        
        JsonObject paymentData = service.buildPaymentData(mockRequest);
        
        assertNotNull(paymentData);
        assertTrue(paymentData.has("txn_details"));
        assertTrue(paymentData.has("cust_details"));
    }
}</code></pre>
      </div>

      <h2 id="integration-tests" class="text-2xl font-bold mt-12 mb-4">Integration Tests</h2>
      <p class="leading-relaxed mb-4">Test the complete payment flow:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// PaymentIntegrationTest.java
@Test
public void testPaymentFlow() throws Exception {
    // Test payment initiation
    HttpServletRequest request = createTestRequest();
    YagoutPayService service = new YagoutPayService();
    
    JsonObject paymentData = service.buildPaymentData(request);
    String encryptedData = service.encryptData(paymentData.toString());
    
    // Test API call (mock in real tests)
    JsonObject result = service.callYagoutPayAPI(createEncryptedRequest(encryptedData));
    
    assertNotNull(result);
    assertTrue(result.has("status"));
}</code></pre>
      </div>

      <h2 id="test-credentials" class="text-2xl font-bold mt-12 mb-4">Test Credentials</h2>
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h3 class="font-semibold text-yellow-900 mb-2">UAT Test Credentials</h3>
        <ul class="text-sm text-yellow-800 space-y-1">
          <li><strong>Merchant ID:</strong> 202508080001</li>
          <li><strong>Test Amounts:</strong> 100.00, 500.00, 1000.00 ETB</li>
          <li><strong>Test Mobile Numbers:</strong> 0965680964, 0912345678</li>
          <li><strong>Test Emails:</strong> test@example.com, customer@test.com</li>
        </ul>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">TESTING COMPLETE</h3>
        <p class="text-sm text-blue-800">Your YagoutPay Java integration is now fully tested! Explore <a href="/java" class="text-blue-600 hover:underline">all Java integration methods</a> for production deployment.</p>
      </div>
    `,
    sections: [
      { id: "test-environment", title: "Test Environment Setup" },
      { id: "unit-tests", title: "Unit Tests" },
      { id: "integration-tests", title: "Integration Tests" },
      { id: "test-credentials", title: "Test Credentials" },
    ],
  },
  "java/hosted-payments": {
    title: "Java Hosted Payments",
    description: "Implement hosted payments with YagoutPay in Java applications with complete implementation details.",
    breadcrumbs: [
      { label: "Java Integration", href: "/java" },
      { label: "Hosted Payments" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Hosted payments redirect customers to YagoutPay's secure payment page. This method requires no PCI compliance and provides a seamless payment experience with complete encryption and form submission.</p>
      </div>

      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">Hosted payments redirect customers to YagoutPay's secure payment page where they can complete their payment. This method requires no PCI compliance and provides a seamless payment experience.</p>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-4">Hosted Payment Flow</h3>
        <ol class="text-sm text-blue-800 list-decimal pl-6 space-y-2">
          <li><strong>Data Collection:</strong> Collect payment data from customer form</li>
          <li><strong>Data Structure:</strong> Build complete payment structure with all required fields</li>
          <li><strong>Encryption:</strong> Encrypt payment data using AES-256-CBC with manual padding</li>
          <li><strong>Hash Generation:</strong> Generate SHA-512 hash for security</li>
          <li><strong>Form Submission:</strong> Auto-submit form to YagoutPay hosted page</li>
          <li><strong>Payment Processing:</strong> Customer completes payment on YagoutPay page</li>
          <li><strong>Callback Handling:</strong> Handle success/failure callbacks from YagoutPay</li>
        </ol>
      </div>

      <h2 id="encryption-service" class="text-2xl font-bold mt-12 mb-4">Encryption Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle AES-256-CBC encryption for hosted payments:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Encryption Service with Java:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// YagoutPayHostedEncryptionService.java
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class YagoutPayHostedEncryptionService {
    private final String merchantId;
    private final String encryptionKey;
    private final String iv = "0123456789abcdef"; // Fixed 16-byte IV
    
    public YagoutPayHostedEncryptionService(String merchantId, String encryptionKey) {
        this.merchantId = merchantId;
        this.encryptionKey = encryptionKey;
    }
    
    // AES-256-CBC Encryption for Hosted Payments with Padding
    public String encrypt(String text) throws Exception {
        try {
            byte[] keyBytes = Base64.getDecoder().decode(encryptionKey);
            byte[] ivBytes = iv.getBytes(StandardCharsets.UTF_8);
            
            // Manual padding for hosted payments
            int size = 16;
            int pad = size - (text.length() % size);
            String padtext = text + String.valueOf((char) pad).repeat(pad);
            
            SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "AES");
            IvParameterSpec ivSpec = new IvParameterSpec(ivBytes);
            
            Cipher cipher = Cipher.getInstance("AES/CBC/NoPadding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivSpec);
            
            byte[] encrypted = cipher.doFinal(padtext.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            throw new Exception("Encryption failed: " + e.getMessage());
        }
    }
    
    // AES-256-CBC Decryption for Response Handling
    public String decrypt(String encryptedData) throws Exception {
        try {
            byte[] keyBytes = Base64.getDecoder().decode(encryptionKey);
            byte[] ivBytes = iv.getBytes(StandardCharsets.UTF_8);
            
            SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "AES");
            IvParameterSpec ivSpec = new IvParameterSpec(ivBytes);
            
            Cipher cipher = Cipher.getInstance("AES/CBC/NoPadding");
            cipher.init(Cipher.DECRYPT_MODE, secretKey, ivSpec);
            
            byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
            String decryptedText = new String(decrypted, StandardCharsets.UTF_8);
            
            // Remove padding
            int pad = decryptedText.charAt(decryptedText.length() - 1);
            if (pad > decryptedText.length()) {
                throw new Exception("Invalid padding");
            }
            
            return decryptedText.substring(0, decryptedText.length() - pad);
        } catch (Exception e) {
            throw new Exception("Decryption failed: " + e.getMessage());
        }
    }
}</code></pre>
      </div>

      <h2 id="hosted-payment-service" class="text-2xl font-bold mt-12 mb-4">Hosted Payment Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle hosted payment processing:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Hosted Payment Service with Java:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// YagoutPayHostedService.java
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import javax.servlet.http.HttpServletRequest;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;

public class YagoutPayHostedService {
    private final YagoutPayHostedEncryptionService encryptionService;
    private final String merchantId;
    private final String saltKey;
    private final String gatewayUrl;
    
    public YagoutPayHostedService(String merchantId, String encryptionKey, String saltKey, String gatewayUrl) {
        this.merchantId = merchantId;
        this.saltKey = saltKey;
        this.gatewayUrl = gatewayUrl;
        this.encryptionService = new YagoutPayHostedEncryptionService(merchantId, encryptionKey);
    }
    
    // Build Complete Hosted Payment Data Structure
    public JsonObject buildHostedPaymentData(HttpServletRequest request) {
        JsonObject paymentData = new JsonObject();
        
        // Transaction Details
        JsonObject txnDetails = new JsonObject();
        txnDetails.addProperty("ag_id", "yagout");
        txnDetails.addProperty("me_id", merchantId);
        txnDetails.addProperty("order_no", request.getParameter("order_no"));
        txnDetails.addProperty("amount", request.getParameter("amount"));
        txnDetails.addProperty("country", "ETH");
        txnDetails.addProperty("currency", "ETB");
        txnDetails.addProperty("txn_type", "SALE");
        txnDetails.addProperty("success_url", request.getParameter("success_url") != null ? request.getParameter("success_url") : "http://localhost:8080/success");
        txnDetails.addProperty("failure_url", request.getParameter("failure_url") != null ? request.getParameter("failure_url") : "http://localhost:8080/failure");
        txnDetails.addProperty("channel", "WEB");
        paymentData.add("txn_details", txnDetails);
        
        // Payment Gateway Details (empty for hosted)
        JsonObject pgDetails = new JsonObject();
        pgDetails.addProperty("pg_id", "");
        pgDetails.addProperty("paymode", "");
        pgDetails.addProperty("scheme", "");
        pgDetails.addProperty("wallet_type", "");
        paymentData.add("pg_details", pgDetails);
        
        // Card Details (empty for hosted)
        JsonObject cardDetails = new JsonObject();
        cardDetails.addProperty("card_no", "");
        cardDetails.addProperty("exp_month", "");
        cardDetails.addProperty("exp_year", "");
        cardDetails.addProperty("cvv", "");
        paymentData.add("card_details", cardDetails);
        
        // Customer Details
        JsonObject custDetails = new JsonObject();
        custDetails.addProperty("cust_name", request.getParameter("customer_name"));
        custDetails.addProperty("customer_email", request.getParameter("email_id"));
        custDetails.addProperty("customer_mobile", request.getParameter("mobile_no"));
        custDetails.addProperty("customer_id", request.getParameter("customer_id") != null ? request.getParameter("customer_id") : "");
        custDetails.addProperty("is_logged_in", "Y");
        paymentData.add("cust_details", custDetails);
        
        // Billing Details
        JsonObject billDetails = new JsonObject();
        billDetails.addProperty("bill_address", request.getParameter("bill_address") != null ? request.getParameter("bill_address") : "N/A");
        billDetails.addProperty("bill_city", request.getParameter("bill_city") != null ? request.getParameter("bill_city") : "Addis Ababa");
        billDetails.addProperty("bill_state", request.getParameter("bill_state") != null ? request.getParameter("bill_state") : "Addis Ababa");
        billDetails.addProperty("bill_country", request.getParameter("bill_country") != null ? request.getParameter("bill_country") : "ET");
        billDetails.addProperty("bill_zip", request.getParameter("bill_zip") != null ? request.getParameter("bill_zip") : "1000");
        paymentData.add("bill_details", billDetails);
        
        // Shipping Details
        JsonObject shipDetails = new JsonObject();
        shipDetails.addProperty("ship_address", request.getParameter("ship_address") != null ? request.getParameter("ship_address") : "N/A");
        shipDetails.addProperty("ship_city", request.getParameter("ship_city") != null ? request.getParameter("ship_city") : "Addis Ababa");
        shipDetails.addProperty("ship_state", request.getParameter("ship_state") != null ? request.getParameter("ship_state") : "Addis Ababa");
        shipDetails.addProperty("ship_country", request.getParameter("ship_country") != null ? request.getParameter("ship_country") : "ET");
        shipDetails.addProperty("ship_zip", request.getParameter("ship_zip") != null ? request.getParameter("ship_zip") : "1000");
        shipDetails.addProperty("ship_days", request.getParameter("ship_days") != null ? request.getParameter("ship_days") : "1");
        shipDetails.addProperty("address_count", request.getParameter("address_count") != null ? request.getParameter("address_count") : "1");
        paymentData.add("ship_details", shipDetails);
        
        // Item Details
        JsonArray itemDetails = new JsonArray();
        JsonObject item = new JsonObject();
        item.addProperty("item_count", "1");
        item.addProperty("item_value", request.getParameter("amount"));
        item.addProperty("item_category", request.getParameter("item_category") != null ? request.getParameter("item_category") : "General");
        itemDetails.add(item);
        paymentData.add("item_details", itemDetails);
        
        // UPI Details
        JsonObject upiDetails = new JsonObject();
        upiDetails.addProperty("udf_1", request.getParameter("udf_1") != null ? request.getParameter("udf_1") : "");
        upiDetails.addProperty("udf_2", request.getParameter("udf_2") != null ? request.getParameter("udf_2") : "");
        upiDetails.addProperty("udf_3", request.getParameter("udf_3") != null ? request.getParameter("udf_3") : "");
        upiDetails.addProperty("udf_4", request.getParameter("udf_4") != null ? request.getParameter("udf_4") : "");
        upiDetails.addProperty("udf_5", request.getParameter("udf_5") != null ? request.getParameter("udf_5") : "");
        paymentData.add("upi_details", upiDetails);
        
        return paymentData;
    }
    
    // Generate SHA-512 Hash
    public String generateHash(String data) throws Exception {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-512");
            byte[] hash = digest.digest(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new Exception("Hash generation failed: " + e.getMessage());
        }
    }
    
    // Prepare Hosted Payment Data
    public JsonObject prepareHostedPayment(HttpServletRequest request) throws Exception {
        try {
            // Step 1: Build payment data structure
            JsonObject paymentData = buildHostedPaymentData(request);
            
            // Step 2: Create pipe-separated string
            String pipeSeparatedData = createPipeSeparatedData(paymentData);
            
            // Step 3: Encrypt data
            String encryptedData = encryptionService.encrypt(pipeSeparatedData);
            
            // Step 4: Generate hash
            String hash = generateHash(pipeSeparatedData + saltKey);
            
            // Step 5: Prepare hosted payment data
            JsonObject hostedData = new JsonObject();
            hostedData.addProperty("me_id", merchantId);
            hostedData.addProperty("merchant_request", encryptedData);
            hostedData.addProperty("hash", hash);
            hostedData.addProperty("gateway_url", gatewayUrl);
            
            return hostedData;
        } catch (Exception e) {
            throw new Exception("Hosted payment preparation failed: " + e.getMessage());
        }
    }
    
    // Create pipe-separated data string
    private String createPipeSeparatedData(JsonObject paymentData) {
        StringBuilder data = new StringBuilder();
        
        // Transaction Details
        JsonObject txnDetails = paymentData.getAsJsonObject("txn_details");
        data.append(txnDetails.get("ag_id").getAsString()).append("|");
        data.append(txnDetails.get("me_id").getAsString()).append("|");
        data.append(txnDetails.get("order_no").getAsString()).append("|");
        data.append(txnDetails.get("amount").getAsString()).append("|");
        data.append(txnDetails.get("country").getAsString()).append("|");
        data.append(txnDetails.get("currency").getAsString()).append("|");
        data.append(txnDetails.get("txn_type").getAsString()).append("|");
        data.append(txnDetails.get("success_url").getAsString()).append("|");
        data.append(txnDetails.get("failure_url").getAsString()).append("|");
        data.append(txnDetails.get("channel").getAsString()).append("~");
        
        // Payment Gateway Details (empty)
        data.append("|||~");
        
        // Card Details (empty)
        data.append("||||~");
        
        // Customer Details
        JsonObject custDetails = paymentData.getAsJsonObject("cust_details");
        data.append(custDetails.get("cust_name").getAsString()).append("|");
        data.append(custDetails.get("customer_email").getAsString()).append("|");
        data.append(custDetails.get("customer_mobile").getAsString()).append("|");
        data.append(custDetails.get("customer_id").getAsString()).append("|");
        data.append(custDetails.get("is_logged_in").getAsString()).append("|");
        data.append("||||~");
        
        // Billing Details
        JsonObject billDetails = paymentData.getAsJsonObject("bill_details");
        data.append(billDetails.get("bill_address").getAsString()).append("|");
        data.append(billDetails.get("bill_city").getAsString()).append("|");
        data.append(billDetails.get("bill_state").getAsString()).append("|");
        data.append(billDetails.get("bill_country").getAsString()).append("|");
        data.append(billDetails.get("bill_zip").getAsString()).append("|");
        data.append("~");
        
        // Shipping Details
        JsonObject shipDetails = paymentData.getAsJsonObject("ship_details");
        data.append(shipDetails.get("ship_address").getAsString()).append("|");
        data.append(shipDetails.get("ship_city").getAsString()).append("|");
        data.append(shipDetails.get("ship_state").getAsString()).append("|");
        data.append(shipDetails.get("ship_country").getAsString()).append("|");
        data.append(shipDetails.get("ship_zip").getAsString()).append("|");
        data.append(shipDetails.get("ship_days").getAsString()).append("|");
        data.append(shipDetails.get("address_count").getAsString()).append("|");
        data.append("~");
        
        // Item Details
        JsonArray itemDetails = paymentData.getAsJsonArray("item_details");
        JsonObject item = itemDetails.get(0).getAsJsonObject();
        data.append(item.get("item_count").getAsString()).append("|");
        data.append(item.get("item_value").getAsString()).append("|");
        data.append(item.get("item_category").getAsString()).append("|");
        data.append("~");
        
        // UPI Details
        JsonObject upiDetails = paymentData.getAsJsonObject("upi_details");
        data.append(upiDetails.get("udf_1").getAsString()).append("|");
        data.append(upiDetails.get("udf_2").getAsString()).append("|");
        data.append(upiDetails.get("udf_3").getAsString()).append("|");
        data.append(upiDetails.get("udf_4").getAsString()).append("|");
        data.append(upiDetails.get("udf_5").getAsString()).append("|");
        data.append("~");
        
        // Other Details (empty)
        data.append("||");
        
        return data.toString();
    }
}</code></pre>
      </div>

      <h2 id="hosted-payment-servlet" class="text-2xl font-bold mt-12 mb-4">Hosted Payment Servlet</h2>
      <p class="leading-relaxed mb-4">Create a servlet to handle hosted payment initiation:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Hosted Payment Servlet with Java:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// HostedPaymentServlet.java
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;
import com.google.gson.JsonObject;

@WebServlet("/HostedPaymentServlet")
public class HostedPaymentServlet extends HttpServlet {
    private YagoutPayHostedService hostedService;
    
    @Override
    public void init() throws ServletException {
        super.init();
        this.hostedService = new YagoutPayHostedService(
            "202504290002", // Merchant ID
            "neTdYIKd87JEj4C6ZoYjaeBiCoeOr40ZKBEI8EU/8lo=", // Encryption Key
            "YOUR_SALT_KEY", // Salt Key
            "https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/paymentRedirection/checksumGatewayPage"
        );
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            // Prepare hosted payment data
            JsonObject hostedData = hostedService.prepareHostedPayment(request);
            
            // Set attributes for JSP form
            request.setAttribute("me_id", hostedData.get("me_id").getAsString());
            request.setAttribute("merchant_request", hostedData.get("merchant_request").getAsString());
            request.setAttribute("hash", hostedData.get("hash").getAsString());
            request.setAttribute("gateway_url", hostedData.get("gateway_url").getAsString());
            
            // Forward to hosted payment form
            request.getRequestDispatcher("hosted-payment-form.jsp").forward(request, response);
            
        } catch (Exception e) {
            System.err.println("Hosted payment initiation error: " + e.getMessage());
            request.setAttribute("error", "Hosted payment initiation failed: " + e.getMessage());
            request.getRequestDispatcher("checkout.jsp").forward(request, response);
        }
    }
}</code></pre>
      </div>

      <h2 id="callback-handler" class="text-2xl font-bold mt-12 mb-4">Callback Handler</h2>
      <p class="leading-relaxed mb-4">Create a callback servlet to handle payment responses:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Callback Handler with Java:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// PaymentCallbackServlet.java
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;

@WebServlet("/PaymentCallbackServlet")
public class PaymentCallbackServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            // Extract callback parameters
            String status = request.getParameter("status");
            String orderNo = request.getParameter("order_no");
            String transactionId = request.getParameter("transaction_id");
            String amount = request.getParameter("amount");
            String paymentId = request.getParameter("payment_id");
            
            // Log callback for debugging
            System.out.println("Payment Callback - Status: " + status + ", Order: " + orderNo);
            
            if ("SUCCESS".equals(status) || "success".equals(status)) {
                // Handle successful payment
                request.setAttribute("message", "Payment successful!");
                request.setAttribute("orderNo", orderNo);
                request.setAttribute("transactionId", transactionId);
                request.setAttribute("amount", amount);
                request.setAttribute("paymentId", paymentId);
                request.getRequestDispatcher("success.jsp").forward(request, response);
            } else {
                // Handle failed payment
                String errorMessage = request.getParameter("error_message");
                request.setAttribute("error", "Payment failed: " + (errorMessage != null ? errorMessage : "Unknown error"));
                request.setAttribute("orderNo", orderNo);
                request.getRequestDispatcher("failure.jsp").forward(request, response);
            }
        } catch (Exception e) {
            System.err.println("Callback handling error: " + e.getMessage());
            request.setAttribute("error", "Callback processing failed: " + e.getMessage());
            request.getRequestDispatcher("failure.jsp").forward(request, response);
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        // Handle GET requests (some gateways use GET for callbacks)
        doPost(request, response);
    }
}</code></pre>
      </div>

      <h2 id="hosted-payment-form" class="text-2xl font-bold mt-12 mb-4">Hosted Payment Form</h2>
      <p class="leading-relaxed mb-4">Create a JSP form that auto-submits to YagoutPay:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Hosted Payment Form with Java:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;!-- hosted-payment-form.jsp --&gt;
&lt;%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Redirecting to YagoutPay...&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;style&gt;
        .redirect-container { text-align: center; padding: 50px; }
        .spinner { border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; margin: 20px auto; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class="redirect-container"&gt;
        &lt;h2&gt;Redirecting to YagoutPay...&lt;/h2&gt;
        &lt;div class="spinner"&gt;&lt;/div&gt;
        &lt;p&gt;Please wait while we redirect you to the secure payment page.&lt;/p&gt;
    &lt;/div&gt;
    
    &lt;form id="yagoutpay-form" method="POST" action="&lt;%= request.getAttribute("gateway_url") %&gt;"&gt;
        &lt;input type="hidden" name="me_id" value="&lt;%= request.getAttribute("me_id") %&gt;"&gt;
        &lt;input type="hidden" name="merchant_request" value="&lt;%= request.getAttribute("merchant_request") %&gt;"&gt;
        &lt;input type="hidden" name="hash" value="&lt;%= request.getAttribute("hash") %&gt;"&gt;
    &lt;/form&gt;
    
    &lt;script&gt;
        // Auto-submit form after page load
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('yagoutpay-form').submit();
        });
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-green-900 mb-4">Key Implementation Points</h3>
        <ul class="text-sm text-green-800 list-disc pl-6 space-y-2">
          <li><strong>Encryption:</strong> All payment data must be encrypted using AES-256-CBC with manual padding</li>
          <li><strong>Hash Generation:</strong> SHA-512 hash must be generated for security</li>
          <li><strong>Form Submission:</strong> Only HTML form submission is supported, no REST API</li>
          <li><strong>Domain Registration:</strong> Your domain must be registered with YagoutPay</li>
          <li><strong>Localhost Restriction:</strong> localhost is not permitted in production</li>
          <li><strong>Callback Handling:</strong> Implement proper success/failure callback handling</li>
        </ul>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After implementing hosted payments, explore <a href="/java/api-integration" class="text-blue-600 hover:underline">API Integration</a> for direct payment processing.</p>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "encryption-service", title: "Encryption Service" },
      { id: "hosted-payment-service", title: "Hosted Payment Service" },
      { id: "hosted-payment-servlet", title: "Hosted Payment Servlet" },
      { id: "callback-handler", title: "Callback Handler" },
      { id: "hosted-payment-form", title: "Hosted Payment Form" },
    ],
  },
  "java/api-integration": {
    title: "Java API Integration",
    description: "Direct API integration with YagoutPay in Java applications with complete implementation details.",
    breadcrumbs: [
      { label: "Java Integration", href: "/java" },
      { label: "API Integration" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Direct API integration processes payments without redirecting users to external pages. All payment processing happens within your Java application using YagoutPay's API with AES-256-CBC encryption.</p>
      </div>

      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">Direct API integration uses YagoutPay's API to process payments directly in your Java application. The process involves encrypting payment data, making API calls, and handling encrypted responses.</p>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-4">Direct API Payment Flow</h3>
        <ol class="text-sm text-blue-800 list-decimal pl-6 space-y-2">
          <li><strong>Data Collection:</strong> Collect payment data from customer form</li>
          <li><strong>Data Structure:</strong> Build complete payment structure with all required fields</li>
          <li><strong>Encryption:</strong> Encrypt payment data using AES-256-CBC</li>
          <li><strong>API Call:</strong> Send encrypted data to YagoutPay API endpoint</li>
          <li><strong>Response Handling:</strong> Decrypt and process YagoutPay response</li>
          <li><strong>Result Processing:</strong> Handle success/failure and update UI</li>
        </ol>
      </div>

      <h2 id="encryption-service" class="text-2xl font-bold mt-12 mb-4">Encryption Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle AES-256-CBC encryption for direct payments:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Encryption Service with Java:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// YagoutPayEncryptionService.java
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class YagoutPayEncryptionService {
    private final String merchantId;
    private final String encryptionKey;
    private final String iv = "0123456789abcdef"; // Fixed 16-byte IV
    
    public YagoutPayEncryptionService(String merchantId, String encryptionKey) {
        this.merchantId = merchantId;
        this.encryptionKey = encryptionKey;
    }
    
    // AES-256-CBC Encryption for Direct Payments
    public String encrypt(String data) throws Exception {
        try {
            byte[] keyBytes = Base64.getDecoder().decode(encryptionKey);
            byte[] ivBytes = iv.getBytes(StandardCharsets.UTF_8);
            
            SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "AES");
            IvParameterSpec ivSpec = new IvParameterSpec(ivBytes);
            
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivSpec);
            
            byte[] encrypted = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            throw new Exception("Encryption failed: " + e.getMessage());
        }
    }
    
    // AES-256-CBC Decryption for Response Handling
    public String decrypt(String encryptedData) throws Exception {
        try {
            byte[] keyBytes = Base64.getDecoder().decode(encryptionKey);
            byte[] ivBytes = iv.getBytes(StandardCharsets.UTF_8);
            
            SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "AES");
            IvParameterSpec ivSpec = new IvParameterSpec(ivBytes);
            
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, secretKey, ivSpec);
            
            byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
            return new String(decrypted, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new Exception("Decryption failed: " + e.getMessage());
        }
    }
}</code></pre>
      </div>

      <h2 id="payment-service" class="text-2xl font-bold mt-12 mb-4">Direct Payment Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle direct payment processing:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Direct Payment Service with Java:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// YagoutPayDirectService.java
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class YagoutPayDirectService {
    private final YagoutPayEncryptionService encryptionService;
    private final String merchantId;
    private final String apiUrl;
    
    public YagoutPayDirectService(String merchantId, String encryptionKey, String apiUrl) {
        this.merchantId = merchantId;
        this.apiUrl = apiUrl;
        this.encryptionService = new YagoutPayEncryptionService(merchantId, encryptionKey);
    }
    
    // Build Complete Payment Data Structure
    public JsonObject buildPaymentData(HttpServletRequest request) {
        JsonObject paymentData = new JsonObject();
        
        // Card Details (empty for direct payments)
        JsonObject cardDetails = new JsonObject();
        cardDetails.addProperty("card_number", "");
        cardDetails.addProperty("expiry_month", "");
        cardDetails.addProperty("expiry_year", "");
        cardDetails.addProperty("cvv", "");
        paymentData.add("card_details", cardDetails);
        
        // Other Details
        JsonObject otherDetails = new JsonObject();
        otherDetails.addProperty("order_no", request.getParameter("order_no"));
        otherDetails.addProperty("amount", request.getParameter("amount"));
        otherDetails.addProperty("currency", "ETB");
        otherDetails.addProperty("country", "ETH");
        paymentData.add("other_details", otherDetails);
        
        // Customer Details
        JsonObject custDetails = new JsonObject();
        custDetails.addProperty("customer_name", request.getParameter("customer_name"));
        custDetails.addProperty("customer_email", request.getParameter("email_id"));
        custDetails.addProperty("customer_mobile", request.getParameter("mobile_no"));
        paymentData.add("cust_details", custDetails);
        
        // Payment Gateway Details
        JsonObject pgDetails = new JsonObject();
        pgDetails.addProperty("pg_id", "67ee846571e740418d688c3f");
        pgDetails.addProperty("paymode", "WA");
        pgDetails.addProperty("scheme_id", "7");
        pgDetails.addProperty("wallet_type", request.getParameter("wallet_type") != null ? request.getParameter("wallet_type") : "telebirr");
        paymentData.add("pg_details", pgDetails);
        
        return paymentData;
    }
    
    // Process Direct Payment
    public JsonObject processPayment(HttpServletRequest request) throws Exception {
        try {
            // Step 1: Build payment data structure
            JsonObject paymentData = buildPaymentData(request);
            
            // Step 2: Encrypt payment data
            String encryptedData = encryptionService.encrypt(paymentData.toString());
            
            // Step 3: Prepare API request
            JsonObject requestData = new JsonObject();
            requestData.addProperty("merchantId", merchantId);
            requestData.addProperty("merchantRequest", encryptedData);
            
            // Step 4: Make API call
            JsonObject response = callYagoutPayAPI(requestData);
            
            // Step 5: Handle response
            if (response.has("status") && "Success".equals(response.get("status").getAsString())) {
                JsonObject result = new JsonObject();
                result.addProperty("success", true);
                result.addProperty("transactionId", response.get("transactionId").getAsString());
                result.addProperty("message", "Payment processed successfully");
                return result;
            } else {
                JsonObject result = new JsonObject();
                result.addProperty("success", false);
                result.addProperty("error", response.has("statusMessage") ? response.get("statusMessage").getAsString() : "Payment failed");
                return result;
            }
        } catch (Exception e) {
            JsonObject result = new JsonObject();
            result.addProperty("success", false);
            result.addProperty("error", "Payment processing failed: " + e.getMessage());
            return result;
        }
    }
    
    // Call YagoutPay API
    private JsonObject callYagoutPayAPI(JsonObject request) throws Exception {
        URL url = new URL(apiUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setDoOutput(true);
        
        // Send request
        String jsonInputString = request.toString();
        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }
        
        // Handle response
        int responseCode = connection.getResponseCode();
        if (responseCode == HttpURLConnection.HTTP_OK) {
            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8))) {
                StringBuilder response = new StringBuilder();
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                return com.google.gson.JsonParser.parseString(response.toString()).getAsJsonObject();
            }
        } else {
            throw new Exception("API call failed with response code: " + responseCode);
        }
    }
}</code></pre>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-green-900 mb-4">Key Implementation Points</h3>
        <ul class="text-sm text-green-800 list-disc pl-6 space-y-2">
          <li><strong>Encryption:</strong> All payment data must be encrypted using AES-256-CBC</li>
          <li><strong>API Endpoint:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">/apiRedirection/apiIntegration</code></li>
          <li><strong>Headers Required:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">Content-Type: application/json</code></li>
          <li><strong>Response Handling:</strong> All responses need to be processed for success/failure</li>
          <li><strong>Error Handling:</strong> Implement proper error handling for network and API errors</li>
          <li><strong>Validation:</strong> Validate all required fields before processing</li>
        </ul>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After implementing API integration, explore <a href="/java/hosted-payments" class="text-blue-600 hover:underline">Hosted Payments</a> for redirect-based payment processing.</p>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "encryption-service", title: "Encryption Service" },
      { id: "payment-service", title: "Direct Payment Service" },
    ],
  },
  "java/payment-links": {
    title: "Java Payment Links",
    description: "Create dynamic and static payment links with YagoutPay in Java applications with complete implementation details.",
    breadcrumbs: [
      { label: "Java Integration", href: "/java" },
      { label: "Payment Links" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Payment links allow you to create shareable payment URLs and QR codes for easy payment collection. Support both dynamic and static payment links with YagoutPay using complete encryption and API integration.</p>
      </div>

      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">Payment links allow you to create shareable payment URLs and QR codes for easy payment collection. This method is perfect for sending payment requests via SMS, email, or WhatsApp, and supports both dynamic and static payment links.</p>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-4">Payment Link Flow</h3>
        <ol class="text-sm text-blue-800 list-decimal pl-6 space-y-2">
          <li><strong>Data Collection:</strong> Collect payment link data from form</li>
          <li><strong>Data Structure:</strong> Build complete payment link payload</li>
          <li><strong>Encryption:</strong> Encrypt payment link data using AES-256-CBC</li>
          <li><strong>API Call:</strong> Send encrypted data to YagoutPay payment link API</li>
          <li><strong>Response Handling:</strong> Process encrypted response from YagoutPay</li>
          <li><strong>Link Generation:</strong> Generate shareable payment URL and QR code</li>
          <li><strong>Payment Processing:</strong> Customer uses link to complete payment</li>
        </ol>
      </div>

      <h2 id="encryption-service" class="text-2xl font-bold mt-12 mb-4">Encryption Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle AES-256-CBC encryption for payment links:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Encryption Service with Java:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// YagoutPayWidgetEncryptionService.java
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class YagoutPayWidgetEncryptionService {
    private final String merchantId;
    private final String encryptionKey;
    private final String iv = "0123456789abcdef"; // Fixed 16-byte IV
    
    public YagoutPayWidgetEncryptionService(String merchantId, String encryptionKey) {
        this.merchantId = merchantId;
        this.encryptionKey = encryptionKey;
    }
    
    // AES-256-CBC Encryption for Payment Widgets
    public String encrypt(String data) throws Exception {
        try {
            byte[] keyBytes = Base64.getDecoder().decode(encryptionKey);
            byte[] ivBytes = iv.getBytes(StandardCharsets.UTF_8);
            
            SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "AES");
            IvParameterSpec ivSpec = new IvParameterSpec(ivBytes);
            
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivSpec);
            
            byte[] encrypted = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            throw new Exception("Encryption failed: " + e.getMessage());
        }
    }
    
    // AES-256-CBC Decryption for Response Handling
    public String decrypt(String encryptedData) throws Exception {
        try {
            byte[] keyBytes = Base64.getDecoder().decode(encryptionKey);
            byte[] ivBytes = iv.getBytes(StandardCharsets.UTF_8);
            
            SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "AES");
            IvParameterSpec ivSpec = new IvParameterSpec(ivBytes);
            
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, secretKey, ivSpec);
            
            byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
            return new String(decrypted, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new Exception("Decryption failed: " + e.getMessage());
        }
    }
}</code></pre>
      </div>

      <h2 id="payment-link-service" class="text-2xl font-bold mt-12 mb-4">Payment Link Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle payment link generation:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Payment Link Service with Java:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// YagoutPayPaymentLinkService.java
import com.google.gson.JsonObject;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class YagoutPayPaymentLinkService {
    private final YagoutPayWidgetEncryptionService encryptionService;
    private final String merchantId;
    private final String paymentLinkApi;
    private final String staticLinkApi;
    
    public YagoutPayPaymentLinkService(String merchantId, String encryptionKey, String paymentLinkApi, String staticLinkApi) {
        this.merchantId = merchantId;
        this.paymentLinkApi = paymentLinkApi;
        this.staticLinkApi = staticLinkApi;
        this.encryptionService = new YagoutPayWidgetEncryptionService(merchantId, encryptionKey);
    }
    
    // Generate Payment Link
    public JsonObject generatePaymentLink(HttpServletRequest request) throws Exception {
        try {
            // Step 1: Build payment link payload
            JsonObject payload = buildPaymentLinkPayload(request);
            
            // Step 2: Encrypt payload
            String encryptedPayload = encryptionService.encrypt(payload.toString());
            
            // Step 3: Make API call
            JsonObject response = callPaymentLinkAPI(paymentLinkApi, encryptedPayload);
            
            // Step 4: Process response
            return processPaymentLinkResponse(response, payload.get("order_id").getAsString());
        } catch (Exception e) {
            JsonObject result = new JsonObject();
            result.addProperty("success", false);
            result.addProperty("error", "Payment link generation failed: " + e.getMessage());
            return result;
        }
    }
    
    // Generate Static QR Code
    public JsonObject generateStaticQR(HttpServletRequest request) throws Exception {
        try {
            // Step 1: Build static QR payload
            JsonObject payload = buildStaticQRPayload(request);
            
            // Step 2: Encrypt payload
            String encryptedPayload = encryptionService.encrypt(payload.toString());
            
            // Step 3: Make API call
            JsonObject response = callPaymentLinkAPI(staticLinkApi, encryptedPayload);
            
            // Step 4: Process response
            return processPaymentLinkResponse(response, payload.get("order_id").getAsString());
        } catch (Exception e) {
            JsonObject result = new JsonObject();
            result.addProperty("success", false);
            result.addProperty("error", "Static QR generation failed: " + e.getMessage());
            return result;
        }
    }
    
    // Build Payment Link Payload
    private JsonObject buildPaymentLinkPayload(HttpServletRequest request) {
        JsonObject payload = new JsonObject();
        payload.addProperty("req_user_id", "yagou381");
        payload.addProperty("me_id", merchantId);
        payload.addProperty("amount", request.getParameter("amount"));
        payload.addProperty("customer_email", request.getParameter("customer_email") != null ? request.getParameter("customer_email") : "");
        payload.addProperty("mobile_no", request.getParameter("mobile_no") != null ? request.getParameter("mobile_no") : "");
        payload.addProperty("expiry_date", request.getParameter("expiry_date") != null ? request.getParameter("expiry_date") : "2025-12-31");
        payload.addProperty("media_type", "[\"API\"]");
        payload.addProperty("order_id", generateOrderId());
        payload.addProperty("first_name", request.getParameter("first_name") != null ? request.getParameter("first_name") : "YagoutPay");
        payload.addProperty("last_name", request.getParameter("last_name") != null ? request.getParameter("last_name") : "PaymentLink");
        payload.addProperty("product", request.getParameter("product") != null ? request.getParameter("product") : "Payment");
        payload.addProperty("dial_code", "+251");
        payload.addProperty("failure_url", request.getParameter("failure_url") != null ? request.getParameter("failure_url") : "http://localhost:8080/failure");
        payload.addProperty("success_url", request.getParameter("success_url") != null ? request.getParameter("success_url") : "http://localhost:8080/success");
        payload.addProperty("country", "ETH");
        payload.addProperty("currency", "ETB");
        return payload;
    }
    
    // Build Static QR Payload
    private JsonObject buildStaticQRPayload(HttpServletRequest request) {
        JsonObject payload = new JsonObject();
        payload.addProperty("req_user_id", "yagou381");
        payload.addProperty("me_id", merchantId);
        payload.addProperty("amount", request.getParameter("amount"));
        payload.addProperty("customer_email", request.getParameter("customer_email") != null ? request.getParameter("customer_email") : "");
        payload.addProperty("mobile_no", request.getParameter("mobile_no") != null ? request.getParameter("mobile_no") : "");
        payload.addProperty("expiry_date", request.getParameter("expiry_date") != null ? request.getParameter("expiry_date") : "2025-12-31");
        payload.addProperty("media_type", "[\"API\"]");
        payload.addProperty("order_id", generateOrderId());
        payload.addProperty("first_name", request.getParameter("first_name") != null ? request.getParameter("first_name") : "YagoutPay");
        payload.addProperty("last_name", request.getParameter("last_name") != null ? request.getParameter("last_name") : "StaticQR");
        payload.addProperty("product", request.getParameter("product") != null ? request.getParameter("product") : "Payment");
        payload.addProperty("dial_code", "+251");
        payload.addProperty("failure_url", request.getParameter("failure_url") != null ? request.getParameter("failure_url") : "http://localhost:8080/failure");
        payload.addProperty("success_url", request.getParameter("success_url") != null ? request.getParameter("success_url") : "http://localhost:8080/success");
        payload.addProperty("country", "ETH");
        payload.addProperty("currency", "ETB");
        return payload;
    }
    
    // Generate Order ID
    private String generateOrderId() {
        return "LINK_" + System.currentTimeMillis() + "_" + Math.random().toString(36).substring(2, 11);
    }
    
    // Call Payment Link API
    private JsonObject callPaymentLinkAPI(String apiUrl, String encryptedPayload) throws Exception {
        URL url = new URL(apiUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("me_id", merchantId);
        connection.setDoOutput(true);
        
        // Send request
        JsonObject request = new JsonObject();
        request.addProperty("request", encryptedPayload);
        String jsonInputString = request.toString();
        
        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }
        
        // Handle response
        int responseCode = connection.getResponseCode();
        if (responseCode == HttpURLConnection.HTTP_OK) {
            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8))) {
                StringBuilder response = new StringBuilder();
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                return com.google.gson.JsonParser.parseString(response.toString()).getAsJsonObject();
            }
        } else {
            throw new Exception("API call failed with response code: " + responseCode);
        }
    }
    
    // Process Payment Link Response
    private JsonObject processPaymentLinkResponse(JsonObject response, String orderId) {
        if (response.has("status") && "SUCCESS".equals(response.get("status").getAsString())) {
            JsonObject result = new JsonObject();
            result.addProperty("success", true);
            result.addProperty("paymentUrl", response.get("responseData").getAsJsonObject().get("payment_url").getAsString());
            result.addProperty("orderId", orderId);
            result.addProperty("qrCode", response.get("responseData").getAsJsonObject().get("qr_code").getAsString());
            result.addProperty("expiryDate", response.get("responseData").getAsJsonObject().get("expiry_date").getAsString());
            return result;
        } else {
            JsonObject result = new JsonObject();
            result.addProperty("success", false);
            result.addProperty("error", response.has("userMessage") ? response.get("userMessage").getAsString() : "Payment link creation failed");
            return result;
        }
    }
    
    // Validate Payment Link Data
    public JsonObject validatePaymentLinkData(HttpServletRequest request) {
        JsonObject result = new JsonObject();
        JsonObject errors = new JsonObject();
        boolean isValid = true;
        
        String amount = request.getParameter("amount");
        if (amount == null || amount.trim().isEmpty() || Double.parseDouble(amount) <= 0) {
            errors.addProperty("amount", "Amount is required and must be greater than 0");
            isValid = false;
        }
        
        String customerEmail = request.getParameter("customer_email");
        if (customerEmail != null && !customerEmail.trim().isEmpty() && !isValidEmail(customerEmail)) {
            errors.addProperty("customer_email", "Valid email is required");
            isValid = false;
        }
        
        String expiryDate = request.getParameter("expiry_date");
        if (expiryDate != null && !expiryDate.trim().isEmpty() && !isValidDate(expiryDate)) {
            errors.addProperty("expiry_date", "Expiry date must be in YYYY-MM-DD format");
            isValid = false;
        }
        
        result.addProperty("isValid", isValid);
        result.add("errors", errors);
        
        return result;
    }
    
    // Email validation helper
    private boolean isValidEmail(String email) {
        return email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    }
    
    // Date validation helper
    private boolean isValidDate(String dateString) {
        try {
            java.time.LocalDate.parse(dateString);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}</code></pre>
      </div>

      <h2 id="payment-link-servlet" class="text-2xl font-bold mt-12 mb-4">Payment Link Servlet</h2>
      <p class="leading-relaxed mb-4">Create a servlet to handle payment link requests:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Payment Link Servlet with Java:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// PaymentLinkServlet.java
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;
import com.google.gson.JsonObject;

@WebServlet("/PaymentLinkServlet")
public class PaymentLinkServlet extends HttpServlet {
    private YagoutPayPaymentLinkService paymentLinkService;
    
    @Override
    public void init() throws ServletException {
        super.init();
        this.paymentLinkService = new YagoutPayPaymentLinkService(
            "202504290002", // Merchant ID
            "neTdYIKd87JEj4C6ZoYjaeBiCoeOr40ZKBEI8EU/8lo=", // Encryption Key
            "https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/paymentByLinkResponse",
            "https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/staticQRPaymentResponse"
        );
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            String linkType = request.getParameter("link_type");
            
            // Validate payment link data
            JsonObject validation = paymentLinkService.validatePaymentLinkData(request);
            if (!validation.get("isValid").getAsBoolean()) {
                request.setAttribute("error", "Validation failed");
                request.setAttribute("validationErrors", validation.get("errors"));
                request.getRequestDispatcher("payment-link-form.jsp").forward(request, response);
                return;
            }
            
            JsonObject result;
            if ("static".equals(linkType)) {
                // Generate Static QR
                result = paymentLinkService.generateStaticQR(request);
            } else {
                // Generate Payment Link
                result = paymentLinkService.generatePaymentLink(request);
            }
            
            if (result.get("success").getAsBoolean()) {
                // Log successful link generation
                System.out.println("Payment link generated: " + result.get("orderId").getAsString());
                
                request.setAttribute("paymentUrl", result.get("paymentUrl").getAsString());
                request.setAttribute("orderId", result.get("orderId").getAsString());
                request.setAttribute("qrCode", result.get("qrCode").getAsString());
                request.setAttribute("expiryDate", result.get("expiryDate").getAsString());
                request.getRequestDispatcher("payment-link-success.jsp").forward(request, response);
            } else {
                // Log failed link generation
                System.err.println("Payment link generation failed: " + result.get("error").getAsString());
                
                request.setAttribute("error", "Payment link generation failed: " + result.get("error").getAsString());
                request.getRequestDispatcher("payment-link-error.jsp").forward(request, response);
            }
        } catch (Exception e) {
            System.err.println("Payment link servlet error: " + e.getMessage());
            request.setAttribute("error", "Payment link generation failed: " + e.getMessage());
            request.getRequestDispatcher("payment-link-error.jsp").forward(request, response);
        }
    }
}</code></pre>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-green-900 mb-4">Key Implementation Points</h3>
        <ul class="text-sm text-green-800 list-disc pl-6 space-y-2">
          <li><strong>Encryption:</strong> All payment link data must be encrypted using AES-256-CBC</li>
          <li><strong>API Endpoints:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">/sdk/paymentByLinkResponse</code> and <code class="bg-muted px-2 py-1 rounded text-sm font-mono">/sdk/staticQRPaymentResponse</code></li>
          <li><strong>Headers Required:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">Content-Type: application/json</code> and <code class="bg-muted px-2 py-1 rounded text-sm font-mono">me_id: MERCHANT_ID</code></li>
          <li><strong>Response Handling:</strong> All responses need to be processed for success/failure</li>
          <li><strong>QR Code Generation:</strong> Static QR codes are generated for easy sharing</li>
          <li><strong>Expiry Management:</strong> Payment links can have custom expiry dates</li>
        </ul>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After implementing payment links, explore <a href="/java/api-integration" class="text-blue-600 hover:underline">API Integration</a> for direct payment processing.</p>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "encryption-service", title: "Encryption Service" },
      { id: "payment-link-service", title: "Payment Link Service" },
      { id: "payment-link-servlet", title: "Payment Link Servlet" },
    ],
  },
  "wordpress": {
    title: "WordPress Integration",
    description: "Complete YagoutPay WordPress plugin with easy installation and configuration for all payment methods.",
    breadcrumbs: [{ label: "WordPress Integration" }],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay WordPress plugin provides complete payment integration with zero coding required. Simply install, configure, and start accepting payments with three different integration methods: Hosted Checkout, Direct API, and Static Forms.</p>
      </div>
      
      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">The YagoutPay WordPress plugin handles all the complex integration automatically. No coding required - just install the plugin, configure your credentials, and start accepting payments immediately with AES-256-CBC encryption, comprehensive error handling, and support for all payment methods.</p>
      
      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-green-900 mb-4">Plugin Features</h3>
        <ul class="text-sm text-green-800 list-disc pl-6 space-y-2">
          <li><strong>Zero Coding Required:</strong> Complete integration handled by the plugin</li>
          <li><strong>Three Payment Methods:</strong> Hosted, Direct API, and Static Forms</li>
          <li><strong>Easy Configuration:</strong> Simple admin panel for setup</li>
          <li><strong>Shortcode Support:</strong> Easy integration with any page or post</li>
          <li><strong>Automatic Encryption:</strong> AES-256-CBC encryption handled automatically</li>
          <li><strong>Error Handling:</strong> Comprehensive error management built-in</li>
        </ul>
      </div>
      
      <h2 id="getting-started" class="text-2xl font-bold mt-12 mb-4">Getting Started</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><a href="/wordpress/installation" class="text-primary hover:underline">Install WordPress Plugin</a></li>
        <li><a href="/wordpress/configuration" class="text-primary hover:underline">Configure your credentials</a></li>
        <li><a href="/wordpress/hosted-payments" class="text-primary hover:underline">Choose your payment method</a></li>
        <li><a href="/wordpress/shortcodes" class="text-primary hover:underline">Add payment forms to your site</a></li>
      </ol>

      <h2 id="integration-methods" class="text-2xl font-bold mt-12 mb-4">Integration Methods</h2>
      <div class="grid md:grid-cols-3 gap-6 mb-6">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Hosted Payments</h3>
          <p class="text-sm text-gray-700 mb-3">Redirect customers to YagoutPay's secure payment page. No PCI compliance required.</p>
          <a href="/wordpress/hosted-payments" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Direct API</h3>
          <p class="text-sm text-gray-700 mb-3">Process payments directly on your site with custom payment forms.</p>
          <a href="/wordpress/api-integration" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Static Forms</h3>
          <p class="text-sm text-gray-700 mb-3">Custom payment forms with full design control and advanced features.</p>
          <a href="/wordpress/static-forms" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">Quick Start</h3>
        <p class="text-sm text-blue-800">Ready to get started? <a href="/wordpress/installation" class="text-blue-600 hover:underline">Install the plugin</a> and have payments working in minutes!</p>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "getting-started", title: "Getting Started" },
      { id: "integration-methods", title: "Integration Methods" },
    ],
  },
  "wordpress/installation": {
    title: "WordPress Installation",
    description: "Install YagoutPay WordPress plugin and set up your development environment.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "WordPress Integration", href: "/wordpress" },
      { label: "Installation" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay WordPress plugin provides three different payment integration methods. This guide covers the complete setup process for WordPress websites.</p>
      </div>
      
      <div class="flex items-start gap-3 mb-8">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Follow this step-by-step guide to integrate YagoutPay payments into your WordPress website with minimal setup.</p>
      </div>

      <h2 id="prerequisites" class="text-2xl font-bold mt-12 mb-4">Prerequisites</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>WordPress 5.0 or higher</li>
        <li>PHP 7.4 or higher</li>
        <li>SSL Certificate (for production)</li>
        <li>Required PHP Extensions: OpenSSL, cURL, JSON</li>
        <li>YagoutPay merchant account</li>
        <li>Valid API credentials</li>
      </ul>

      <h2 id="check-php-extensions" class="text-2xl font-bold mt-12 mb-4">Check PHP Extensions</h2>
      <p class="leading-relaxed mb-4">Verify that required PHP extensions are installed:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># Check if required extensions are installed
php -m | grep -E "(openssl|curl|json)"

# Expected output:
openssl
curl
json</code></pre>
      </div>

      <h2 id="upload-plugin" class="text-2xl font-bold mt-12 mb-4">Upload Plugin Files</h2>
      <p class="leading-relaxed mb-4">Upload the plugin to your WordPress plugins directory:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># Upload to WordPress plugins directory
/wp-content/plugins/yagoutpay-standalone/
├── yagoutpay-standalone.php
├── includes/
│   ├── class-yagoutpay-client.php
│   ├── class-yagoutpay-webhook.php
│   └── class-yagoutpay-config.php
└── assets/
    ├── css/
    ├── js/
    └── images/</code></pre>
      </div>

      <h2 id="activate-plugin" class="text-2xl font-bold mt-12 mb-4">Activate Plugin</h2>
      <p class="leading-relaxed mb-4">Activate the plugin in WordPress admin:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// In WordPress Admin
1. Go to Plugins → Installed Plugins
2. Find "YagoutPay Payment Gateway"
3. Click "Activate"</code></pre>
      </div>

      <h2 id="plugin-structure" class="text-2xl font-bold mt-12 mb-4">Plugin Structure</h2>
      <p class="leading-relaxed mb-4">The plugin follows WordPress coding standards with proper organization:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>yagoutpay-standalone/
├── yagoutpay-standalone.php          # Main plugin file
├── includes/
│   ├── class-yagoutpay-client.php    # API client class
│   ├── class-yagoutpay-webhook.php   # Webhook handler
│   └── class-yagoutpay-config.php    # Configuration class
├── assets/
│   ├── css/
│   │   └── yagoutpay.css            # Plugin styles
│   ├── js/
│   │   └── yagoutpay.js             # Plugin JavaScript
│   └── images/
│       └── yagoutpay-logo.png       # Plugin logo
├── templates/
│   ├── hosted-payment.php           # Hosted payment template
│   ├── api-payment.php              # API payment template
│   └── static-form.php              # Static form template
└── languages/
    └── yagoutpay.pot                # Translation file</code></pre>
      </div>

      <h2 id="system-requirements" class="text-2xl font-bold mt-12 mb-4">System Requirements</h2>
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h3 class="font-semibold text-yellow-900 mb-2">WordPress Requirements</h3>
        <ul class="text-sm text-yellow-800 space-y-1">
          <li><strong>WordPress:</strong> 5.0 or higher</li>
          <li><strong>PHP:</strong> 7.4 or higher</li>
          <li><strong>SSL Certificate:</strong> Required for production</li>
          <li><strong>Admin Access:</strong> Required for configuration</li>
        </ul>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After installation, proceed to <a href="/wordpress/configuration" class="text-blue-600 hover:underline">Configuration</a> to set up your YagoutPay credentials and start processing payments.</p>
      </div>
    `,
    sections: [
      { id: "prerequisites", title: "Prerequisites" },
      { id: "check-php-extensions", title: "Check PHP Extensions" },
      { id: "upload-plugin", title: "Upload Plugin Files" },
      { id: "activate-plugin", title: "Activate Plugin" },
      { id: "plugin-structure", title: "Plugin Structure" },
      { id: "system-requirements", title: "System Requirements" },
    ],
  },
  "wordpress/configuration": {
    title: "WordPress Configuration",
    description: "Configure YagoutPay credentials and settings for your WordPress plugin.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "WordPress Integration", href: "/wordpress" },
      { label: "Configuration" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Configure your YagoutPay integration with the proper credentials and environment settings. This guide covers both test and live configurations.</p>
      </div>
      
      <h2 id="configure-credentials" class="text-2xl font-bold mt-12 mb-4">Configure Credentials</h2>
      <p class="leading-relaxed mb-4">Set up your YagoutPay credentials in WordPress admin:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Go to Settings → YagoutPay
// Enter your credentials for both test and live environments

// Test Environment
Test Merchant ID: 202508080001
Test Encryption Key: IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=

// Live Environment (Production)
Live Merchant ID: your_production_merchant_id
Live Encryption Key: your_production_encryption_key</code></pre>
      </div>

      <h2 id="environment-settings" class="text-2xl font-bold mt-12 mb-4">Environment Settings</h2>
      <p class="leading-relaxed mb-4">Configure your environment settings:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Environment Configuration
Environment: Test (for development) / Live (for production)
Base URL: https://uatcheckout.yagoutpay.com (Test)
Base URL: https://checkout.yagoutpay.com (Live)

// Success/Failure URLs
Success URL: https://yoursite.com/payment-success/
Failure URL: https://yoursite.com/payment-failure/
Webhook URL: https://yoursite.com/wp-json/yagoutpay/v1/webhook</code></pre>
      </div>

      <h2 id="plugin-settings" class="text-2xl font-bold mt-12 mb-4">Plugin Settings</h2>
      <p class="leading-relaxed mb-4">Configure additional plugin settings:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Plugin Configuration Options
Enable Debug Logging: Yes (for development)
Enable Test Mode: Yes (for development)
Default Currency: ETB
Default Country: ETH
Auto-fill Customer Data: Yes (if user is logged in)
Enable Webhook Verification: Yes
SSL Verification: Yes (for production)</code></pre>
      </div>

      <h2 id="shortcode-registration" class="text-2xl font-bold mt-12 mb-4">Shortcode Registration</h2>
      <p class="leading-relaxed mb-4">The plugin automatically registers the following shortcodes:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Available Shortcodes
[yagoutpay_hosted] - Hosted payment shortcode
[yagoutpay_api] - Direct API payment shortcode
[yagoutpay_test] - Test credentials shortcode
[yagoutpay_debug] - Debug information shortcode</code></pre>
      </div>

      <h2 id="production-config" class="text-2xl font-bold mt-12 mb-4">Production Configuration</h2>
      <p class="leading-relaxed mb-4">For production deployment:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Production Checklist
[ ] Environment set to "Live"
[ ] Live credentials configured
[ ] SSL certificate installed
[ ] Webhook URL configured
[ ] Success/failure pages created
[ ] Debug logging disabled
[ ] Test payments completed
[ ] Error handling configured</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After configuration, proceed to <a href="/wordpress/first-payment" class="text-blue-600 hover:underline">First Payment</a> to process your first payment with YagoutPay.</p>
      </div>
    `,
    sections: [
      { id: "configure-credentials", title: "Configure Credentials" },
      { id: "environment-settings", title: "Environment Settings" },
      { id: "plugin-settings", title: "Plugin Settings" },
      { id: "shortcode-registration", title: "Shortcode Registration" },
      { id: "production-config", title: "Production Configuration" },
    ],
  },
  "wordpress/first-payment": {
    title: "WordPress First Payment",
    description: "Process your first payment with YagoutPay WordPress plugin using shortcodes.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "WordPress Integration", href: "/wordpress" },
      { label: "First Payment" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Process your first payment with YagoutPay WordPress plugin. This guide shows you how to use shortcodes to create payment forms and handle the payment flow.</p>
      </div>

      <h2 id="hosted-payment-shortcode" class="text-2xl font-bold mt-12 mb-4">Hosted Payment Shortcode</h2>
      <p class="leading-relaxed mb-4">Use the hosted payment shortcode for simple payment processing:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Simple hosted payment
[yagoutpay_hosted amount="100" currency="ETB" description="Product Payment"]

// Advanced hosted payment with customer details
[yagoutpay_hosted 
    amount="50" 
    currency="ETB" 
    description="Service Payment"
    customer_name="John Doe"
    email="john@example.com"
    mobile="911223344"
    country="ETH"
]</code></pre>
      </div>

      <h2 id="api-payment-shortcode" class="text-2xl font-bold mt-12 mb-4">API Payment Shortcode</h2>
      <p class="leading-relaxed mb-4">Use the API payment shortcode for direct payment processing:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Simple API payment
[yagoutpay_api amount="100" currency="ETB" description="Product Payment"]

// Advanced API payment with custom styling
[yagoutpay_api 
    amount="50" 
    currency="ETB" 
    description="Service Payment"
    customer_name="John Doe"
    email="john@example.com"
    mobile="911223344"
    button_text="Pay Now"
    button_class="custom-pay-button"
    form_class="custom-payment-form"
    show_billing="yes"
]</code></pre>
      </div>

      <h2 id="test-credentials" class="text-2xl font-bold mt-12 mb-4">Test Credentials</h2>
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h3 class="font-semibold text-yellow-900 mb-2">Test Credentials</h3>
        <ul class="text-sm text-yellow-800 space-y-1">
          <li><strong>Merchant ID:</strong> 202508080001</li>
          <li><strong>Test Amount:</strong> 100.00 ETB</li>
          <li><strong>Test Mobile:</strong> 0965680964</li>
          <li><strong>Test Email:</strong> test@example.com</li>
        </ul>
      </div>

      <h2 id="shortcode-parameters" class="text-2xl font-bold mt-12 mb-4">Shortcode Parameters</h2>
      <p class="leading-relaxed mb-4">Available parameters for both shortcodes:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Common Parameters
amount - Payment amount (required)
currency - Currency code (default: "ETB")
description - Payment description (default: "Payment")
customer_name - Customer name (auto-filled if logged in)
email - Customer email (auto-filled if logged in)
mobile - Customer mobile number
order_no - Custom order number (auto-generated if not provided)
country - Country code (default: "ETH")

// API Payment Additional Parameters
button_text - Custom button text
button_class - Custom CSS class for button
form_class - Custom CSS class for form
show_billing - Show billing address fields (default: "yes")</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After your first payment, explore <a href="/wordpress/hosted-payments" class="text-blue-600 hover:underline">Hosted Payments</a> and <a href="/wordpress/api-integration" class="text-blue-600 hover:underline">API Integration</a> for more advanced features.</p>
      </div>
    `,
    sections: [
      { id: "hosted-payment-shortcode", title: "Hosted Payment Shortcode" },
      { id: "api-payment-shortcode", title: "API Payment Shortcode" },
      { id: "test-credentials", title: "Test Credentials" },
      { id: "shortcode-parameters", title: "Shortcode Parameters" },
    ],
  },
  "wordpress/testing": {
    title: "WordPress Testing",
    description: "Test your YagoutPay WordPress integration with comprehensive testing strategies.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "WordPress Integration", href: "/wordpress" },
      { label: "Testing" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Comprehensive testing guide for your YagoutPay WordPress integration. Learn how to test payments, handle errors, and ensure your integration works correctly.</p>
      </div>

      <h2 id="test-shortcodes" class="text-2xl font-bold mt-12 mb-4">Test Shortcodes</h2>
      <p class="leading-relaxed mb-4">Use built-in test shortcodes to verify your integration:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Test credentials shortcode
[yagoutpay_test]

// Debug information shortcode
[yagoutpay_debug]

// Test hosted payment
[yagoutpay_hosted amount="1" description="Test Payment"]

// Test API payment
[yagoutpay_api amount="1" description="Test API Payment"]</code></pre>
      </div>

      <h2 id="test-environment" class="text-2xl font-bold mt-12 mb-4">Test Environment Setup</h2>
      <p class="leading-relaxed mb-4">Configure your WordPress site for testing with YagoutPay:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Test Configuration
Environment: Test
Test Merchant ID: 202508080001
Test Encryption Key: IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=
Test Base URL: https://uatcheckout.yagoutpay.com</code></pre>
      </div>

      <h2 id="test-credentials" class="text-2xl font-bold mt-12 mb-4">Test Credentials</h2>
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h3 class="font-semibold text-yellow-900 mb-2">UAT Test Credentials</h3>
        <ul class="text-sm text-yellow-800 space-y-1">
          <li><strong>Merchant ID:</strong> 202508080001</li>
          <li><strong>Test Amounts:</strong> 1.00, 10.00, 100.00 ETB</li>
          <li><strong>Test Mobile Numbers:</strong> 0965680964, 0912345678</li>
          <li><strong>Test Emails:</strong> test@example.com, customer@test.com</li>
        </ul>
      </div>

      <h2 id="debug-tools" class="text-2xl font-bold mt-12 mb-4">Debug Tools</h2>
      <p class="leading-relaxed mb-4">Use WordPress debug tools to troubleshoot issues:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Enable WordPress Debug Logging
// In wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

// Check debug logs
// In /wp-content/debug.log</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">TESTING COMPLETE</h3>
        <p class="text-sm text-blue-800">Your YagoutPay WordPress integration is now fully tested! Explore <a href="/wordpress" class="text-blue-600 hover:underline">all WordPress integration methods</a> for production deployment.</p>
      </div>
    `,
    sections: [
      { id: "test-shortcodes", title: "Test Shortcodes" },
      { id: "test-environment", title: "Test Environment Setup" },
      { id: "test-credentials", title: "Test Credentials" },
      { id: "debug-tools", title: "Debug Tools" },
    ],
  },
  "wordpress/hosted-payments": {
    title: "WordPress Hosted Payments",
    description: "Implement hosted payments with YagoutPay WordPress plugin using shortcodes.",
    breadcrumbs: [
      { label: "WordPress Integration", href: "/wordpress" },
      { label: "Hosted Payments" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Hosted payments redirect customers to YagoutPay's secure payment page. This method requires no PCI compliance and provides a seamless payment experience using simple shortcodes.</p>
      </div>

      <h2 id="hosted-shortcode" class="text-2xl font-bold mt-12 mb-4">Hosted Payment Shortcode</h2>
      <p class="leading-relaxed mb-4">Use the hosted payment shortcode for simple payment processing:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Basic hosted payment
[yagoutpay_hosted amount="100" currency="ETB" description="Product Payment"]

// Advanced hosted payment with customer details
[yagoutpay_hosted 
    amount="50" 
    currency="ETB" 
    description="Service Payment"
    customer_name="John Doe"
    email="john@example.com"
    mobile="911223344"
    country="ETH"
]</code></pre>
      </div>

      <h2 id="shortcode-parameters" class="text-2xl font-bold mt-12 mb-4">Shortcode Parameters</h2>
      <p class="leading-relaxed mb-4">Available parameters for the hosted payment shortcode:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Required Parameters
amount - Payment amount (required)
currency - Currency code (default: "ETB")
description - Payment description (default: "Payment")

// Optional Parameters
customer_name - Customer name (auto-filled if logged in)
email - Customer email (auto-filled if logged in)
mobile - Customer mobile number
order_no - Custom order number (auto-generated if not provided)
country - Country code (default: "ETH")</code></pre>
      </div>

      <h2 id="payment-flow" class="text-2xl font-bold mt-12 mb-4">Payment Flow</h2>
      <p class="leading-relaxed mb-4">How hosted payments work:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>1. User clicks payment button
2. Form data is encrypted using AES-256-CBC
3. User is redirected to YagoutPay's secure page
4. User completes payment on YagoutPay's site
5. YagoutPay redirects back to success/failure URLs
6. Payment status is processed</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After implementing hosted payments, explore <a href="/wordpress/api-integration" class="text-blue-600 hover:underline">API Integration</a> for direct payment processing.</p>
      </div>
    `,
    sections: [
      { id: "hosted-shortcode", title: "Hosted Payment Shortcode" },
      { id: "shortcode-parameters", title: "Shortcode Parameters" },
      { id: "payment-flow", title: "Payment Flow" },
    ],
  },
  "wordpress/api-integration": {
    title: "WordPress API Integration",
    description: "Direct API integration with YagoutPay WordPress plugin using shortcodes.",
    breadcrumbs: [
      { label: "WordPress Integration", href: "/wordpress" },
      { label: "API Integration" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Direct API integration processes payments without redirecting users to external pages. All payment processing happens within your WordPress site with AES-256-CBC encryption.</p>
      </div>

      <h2 id="api-shortcode" class="text-2xl font-bold mt-12 mb-4">API Payment Shortcode</h2>
      <p class="leading-relaxed mb-4">Use the API payment shortcode for direct payment processing:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Basic API payment
[yagoutpay_api amount="100" currency="ETB" description="Product Payment"]

// Advanced API payment with custom styling
[yagoutpay_api 
    amount="50" 
    currency="ETB" 
    description="Service Payment"
    customer_name="John Doe"
    email="john@example.com"
    mobile="911223344"
    button_text="Pay Now"
    button_class="custom-pay-button"
    form_class="custom-payment-form"
    show_billing="yes"
]</code></pre>
      </div>

      <h2 id="shortcode-parameters" class="text-2xl font-bold mt-12 mb-4">Shortcode Parameters</h2>
      <p class="leading-relaxed mb-4">Available parameters for the API payment shortcode:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Required Parameters
amount - Payment amount (required)
currency - Currency code (default: "ETB")
description - Payment description (default: "Payment")

// Optional Parameters
customer_name - Customer name (auto-filled if logged in)
email - Customer email (auto-filled if logged in)
mobile - Customer mobile number
order_no - Custom order number (auto-generated if not provided)
country - Country code (default: "ETH")

// API-Specific Parameters
button_text - Custom button text (default: "Process Payment via Direct API")
button_class - Custom CSS class for button
form_class - Custom CSS class for form
show_billing - Show billing address fields (default: "yes")</code></pre>
      </div>

      <h2 id="payment-form" class="text-2xl font-bold mt-12 mb-4">Payment Form</h2>
      <p class="leading-relaxed mb-4">The API shortcode generates a complete payment form with:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Generated Form Fields
- Customer Information (Name, Email, Mobile)
- Card Details (Number, Expiry, CVV, Name on Card)
- Billing Address (Optional)
- Payment Button
- Security Note</code></pre>
      </div>

      <h2 id="encryption-security" class="text-2xl font-bold mt-12 mb-4">Encryption & Security</h2>
      <p class="leading-relaxed mb-4">API integration uses AES-256-CBC encryption:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Encryption Method
Algorithm: AES-256-CBC with PKCS5Padding
Key: Base64 decoded from merchant key
IV: Fixed 16-byte initialization vector
Process: Encrypt JSON data → Base64 encode → Send to API</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After implementing API integration, explore <a href="/wordpress/static-forms" class="text-blue-600 hover:underline">Static Forms</a> for custom payment forms with full design control.</p>
      </div>
    `,
    sections: [
      { id: "api-shortcode", title: "API Payment Shortcode" },
      { id: "shortcode-parameters", title: "Shortcode Parameters" },
      { id: "payment-form", title: "Payment Form" },
      { id: "encryption-security", title: "Encryption & Security" },
    ],
  },
  "wordpress/static-forms": {
    title: "WordPress Static Forms",
    description: "Create custom payment forms with YagoutPay WordPress plugin using shortcodes.",
    breadcrumbs: [
      { label: "WordPress Integration", href: "/wordpress" },
      { label: "Static Forms" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Static forms allow you to create custom payment forms with full design control and advanced features. Perfect for professional payment experiences with complete customization.</p>
      </div>

      <h2 id="static-form-shortcode" class="text-2xl font-bold mt-12 mb-4">Static Form Shortcode</h2>
      <p class="leading-relaxed mb-4">Use the static form shortcode for custom payment forms:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Basic static form
[yagoutpay_api amount="100" description="Product Payment"]

// Advanced static form with custom styling
[yagoutpay_api 
    amount="50" 
    currency="ETB" 
    description="Premium Service"
    customer_name="John Doe"
    email="john@example.com"
    mobile="911223344"
    button_text="Complete Payment"
    button_class="btn-primary"
    form_class="custom-payment-form"
    show_billing="yes"
]</code></pre>
      </div>

      <h2 id="form-features" class="text-2xl font-bold mt-12 mb-4">Form Features</h2>
      <p class="leading-relaxed mb-4">Static forms include comprehensive features:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Form Features
✅ Customer Information Section
✅ Card Details Section
✅ Billing Address Section (Optional)
✅ Real-time Validation
✅ Mobile-first Responsive Design
✅ Custom CSS Classes
✅ Security Features
✅ Error Handling</code></pre>
      </div>

      <h2 id="customization" class="text-2xl font-bold mt-12 mb-4">Customization</h2>
      <p class="leading-relaxed mb-4">Customize your payment forms with CSS classes:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// CSS Customization
.yagoutpay-direct-api-payment {
    max-width: 600px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.yagoutpay-form-row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px 15px -10px;
}

.yagoutpay-form-group {
    flex: 1;
    padding: 0 10px;
    min-width: 120px;
}

@media (max-width: 768px) {
    .yagoutpay-form-group {
        flex: 1 0 100%;
    }
}</code></pre>
      </div>

      <h2 id="validation" class="text-2xl font-bold mt-12 mb-4">Form Validation</h2>
      <p class="leading-relaxed mb-4">Static forms include comprehensive validation:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Validation Features
✅ Real-time card number formatting
✅ Expiry date validation
✅ CVV length validation
✅ Email format validation
✅ Mobile number validation
✅ Required field validation
✅ Server-side validation
✅ Error message display</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">INTEGRATION COMPLETE</h3>
        <p class="text-sm text-blue-800">Your YagoutPay WordPress integration is now complete! Explore <a href="/wordpress" class="text-blue-600 hover:underline">all WordPress integration methods</a> for production deployment.</p>
      </div>
    `,
    sections: [
      { id: "static-form-shortcode", title: "Static Form Shortcode" },
      { id: "form-features", title: "Form Features" },
      { id: "customization", title: "Customization" },
      { id: "validation", title: "Form Validation" },
    ],
  },
  "woocommerce": {
    title: "WooCommerce Integration",
    description: "Complete YagoutPay WooCommerce plugin with easy installation and configuration for seamless payment processing.",
    breadcrumbs: [{ label: "WooCommerce Integration" }],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay WooCommerce plugin provides seamless payment processing integration with WooCommerce stores. Zero coding required - simply install the plugin, configure your credentials, and start accepting payments with automatic order management and secure processing.</p>
      </div>
      
      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">The YagoutPay WooCommerce plugin handles all the complex integration automatically. It extends WooCommerce's native payment gateway system to provide secure payment processing with AES-256-CBC encryption, comprehensive error handling, and automatic order management.</p>
      
      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-green-900 mb-4">Plugin Features</h3>
        <ul class="text-sm text-green-800 list-disc pl-6 space-y-2">
          <li><strong>Zero Coding Required:</strong> Complete integration handled by the plugin</li>
          <li><strong>Native WooCommerce Integration:</strong> Seamless checkout experience</li>
          <li><strong>Automatic Order Management:</strong> Order status updates handled automatically</li>
          <li><strong>Secure Processing:</strong> AES-256-CBC encryption built-in</li>
          <li><strong>Webhook Support:</strong> Real-time payment notifications</li>
          <li><strong>Easy Configuration:</strong> Simple admin panel for setup</li>
        </ul>
      </div>
      
      <h2 id="getting-started" class="text-2xl font-bold mt-12 mb-4">Getting Started</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><a href="/woocommerce/installation" class="text-primary hover:underline">Install WooCommerce Plugin</a></li>
        <li><a href="/woocommerce/configuration" class="text-primary hover:underline">Configure your credentials</a></li>
        <li><a href="/woocommerce/payment-gateway" class="text-primary hover:underline">Enable payment gateway</a></li>
        <li><a href="/woocommerce/testing" class="text-primary hover:underline">Test your integration</a></li>
      </ol>

      <h2 id="key-features" class="text-2xl font-bold mt-12 mb-4">Key Features</h2>
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Native WooCommerce Integration</h3>
          <p class="text-sm text-gray-700 mb-3">Seamlessly integrates with WooCommerce's checkout system as a native payment gateway.</p>
          <a href="/woocommerce/payment-gateway" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Secure Payment Processing</h3>
          <p class="text-sm text-gray-700 mb-3">AES-256-CBC encryption and secure card processing with automatic fraud protection.</p>
          <a href="/woocommerce/payment-gateway" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Automatic Order Management</h3>
          <p class="text-sm text-gray-700 mb-3">Order status updates, payment confirmations, and inventory management handled automatically.</p>
          <a href="/woocommerce/order-management" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Webhook Support</h3>
          <p class="text-sm text-gray-700 mb-3">Real-time payment notifications and automatic order updates for seamless operations.</p>
          <a href="/woocommerce/webhook-support" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">Quick Start</h3>
        <p class="text-sm text-blue-800">Ready to get started? <a href="/woocommerce/installation" class="text-blue-600 hover:underline">Install the plugin</a> and have payments working in your WooCommerce store in minutes!</p>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "getting-started", title: "Getting Started" },
      { id: "key-features", title: "Key Features" },
    ],
  },
  "woocommerce/installation": {
    title: "WooCommerce Installation",
    description: "Install YagoutPay WooCommerce plugin and set up your development environment.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "WooCommerce Integration", href: "/woocommerce" },
      { label: "Installation" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay WooCommerce plugin provides seamless payment processing integration with WooCommerce stores. This guide covers the complete setup process for WooCommerce websites.</p>
      </div>
      
      <div class="flex items-start gap-3 mb-8">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Follow this step-by-step guide to integrate YagoutPay payments into your WooCommerce store with minimal setup.</p>
      </div>

      <h2 id="prerequisites" class="text-2xl font-bold mt-12 mb-4">Prerequisites</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>WordPress 5.0 or higher</li>
        <li>WooCommerce 5.0 or higher</li>
        <li>PHP 7.4 or higher</li>
        <li>SSL Certificate (for production)</li>
        <li>Required PHP Extensions: OpenSSL, cURL, JSON</li>
        <li>YagoutPay merchant account</li>
        <li>Valid API credentials</li>
      </ul>

      <h2 id="check-php-extensions" class="text-2xl font-bold mt-12 mb-4">Check PHP Extensions</h2>
      <p class="leading-relaxed mb-4">Verify that required PHP extensions are installed:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># Check if required extensions are installed
php -m | grep -E "(openssl|curl|json)"

# Expected output:
openssl
curl
json</code></pre>
      </div>

      <h2 id="upload-plugin" class="text-2xl font-bold mt-12 mb-4">Upload Plugin Files</h2>
      <p class="leading-relaxed mb-4">Upload the plugin to your WordPress plugins directory:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># Upload to WordPress plugins directory
/wp-content/plugins/yagoutpay-woocommerce/
├── yagoutpay-woocommerce.php
├── includes/
│   ├── class-yagoutpay-gateway.php
│   ├── class-yagoutpay-client.php
│   └── class-yagoutpay-webhook.php
└── assets/
    ├── css/
    │   └── yagoutpay-woocommerce.css
    ├── js/
    │   └── yagoutpay-woocommerce.js
    └── images/
        └── yagoutpay-logo.png</code></pre>
      </div>

      <h2 id="activate-plugin" class="text-2xl font-bold mt-12 mb-4">Activate Plugin</h2>
      <p class="leading-relaxed mb-4">Activate the plugin in WordPress admin:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// In WordPress Admin
1. Go to Plugins → Installed Plugins
2. Find "YagoutPay Payment Gateway for WooCommerce"
3. Click "Activate"</code></pre>
      </div>

      <h2 id="configure-gateway" class="text-2xl font-bold mt-12 mb-4">Configure Gateway</h2>
      <p class="leading-relaxed mb-4">Configure the payment gateway in WooCommerce:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// In WooCommerce Admin
1. Go to WooCommerce → Settings → Payments
2. Find "YagoutPay" and click "Set up"
3. Enable the gateway and configure credentials</code></pre>
      </div>

      <h2 id="plugin-structure" class="text-2xl font-bold mt-12 mb-4">Plugin Structure</h2>
      <p class="leading-relaxed mb-4">The plugin follows WooCommerce coding standards with proper organization:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>yagoutpay-woocommerce/
├── yagoutpay-woocommerce.php          # Main plugin file
├── includes/
│   ├── class-yagoutpay-gateway.php    # Payment gateway class
│   ├── class-yagoutpay-client.php     # API client class
│   └── class-yagoutpay-webhook.php    # Webhook handler
├── assets/
│   ├── css/
│   │   └── yagoutpay-woocommerce.css  # Plugin styles
│   ├── js/
│   │   └── yagoutpay-woocommerce.js   # Plugin JavaScript
│   └── images/
│       └── yagoutpay-logo.png         # Plugin logo
└── languages/
    └── yagoutpay-woocommerce.pot      # Translation file</code></pre>
      </div>

      <h2 id="system-requirements" class="text-2xl font-bold mt-12 mb-4">System Requirements</h2>
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h3 class="font-semibold text-yellow-900 mb-2">WooCommerce Requirements</h3>
        <ul class="text-sm text-yellow-800 space-y-1">
          <li><strong>WordPress:</strong> 5.0 or higher</li>
          <li><strong>WooCommerce:</strong> 5.0 or higher</li>
          <li><strong>PHP:</strong> 7.4 or higher</li>
          <li><strong>SSL Certificate:</strong> Required for production</li>
          <li><strong>Admin Access:</strong> Required for configuration</li>
        </ul>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After installation, proceed to <a href="/woocommerce/configuration" class="text-blue-600 hover:underline">Configuration</a> to set up your YagoutPay credentials and start processing payments.</p>
      </div>
    `,
    sections: [
      { id: "prerequisites", title: "Prerequisites" },
      { id: "check-php-extensions", title: "Check PHP Extensions" },
      { id: "upload-plugin", title: "Upload Plugin Files" },
      { id: "activate-plugin", title: "Activate Plugin" },
      { id: "configure-gateway", title: "Configure Gateway" },
      { id: "plugin-structure", title: "Plugin Structure" },
      { id: "system-requirements", title: "System Requirements" },
    ],
  },
  "woocommerce/configuration": {
    title: "WooCommerce Configuration",
    description: "Configure YagoutPay payment gateway and settings for your WooCommerce store.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "WooCommerce Integration", href: "/woocommerce" },
      { label: "Configuration" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Configure your YagoutPay WooCommerce integration with the proper credentials and environment settings. This guide covers both test and live configurations.</p>
      </div>
      
      <h2 id="configure-gateway" class="text-2xl font-bold mt-12 mb-4">Configure Payment Gateway</h2>
      <p class="leading-relaxed mb-4">Set up your YagoutPay payment gateway in WooCommerce:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Go to WooCommerce → Settings → Payments
// Find "YagoutPay" and click "Set up"
// Enable the gateway and configure credentials

// Test Environment
Test Merchant ID: 202508080001
Test Encryption Key: IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=

// Live Environment (Production)
Live Merchant ID: your_production_merchant_id
Live Encryption Key: your_production_encryption_key</code></pre>
      </div>

      <h2 id="gateway-settings" class="text-2xl font-bold mt-12 mb-4">Gateway Settings</h2>
      <p class="leading-relaxed mb-4">Configure additional gateway settings:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Gateway Configuration Options
Enable/Disable: Yes (to enable the gateway)
Title: YagoutPay (payment method title)
Description: Pay securely using YagoutPay payment gateway.
Environment: Test (for development) / Live (for production)
Test Merchant ID: 202508080001
Test Encryption Key: IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=
Live Merchant ID: your_production_merchant_id
Live Encryption Key: your_production_encryption_key
Webhook Secret: your_webhook_secret
Debug Mode: Yes (for development)</code></pre>
      </div>

      <h2 id="environment-settings" class="text-2xl font-bold mt-12 mb-4">Environment Settings</h2>
      <p class="leading-relaxed mb-4">Configure your environment settings:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Environment Configuration
Environment: Test (for development) / Live (for production)
Test Base URL: https://uatcheckout.yagoutpay.com
Live Base URL: https://checkout.yagoutpay.com

// Webhook Configuration
Webhook URL: https://yoursite.com/yagoutpay-webhook/
Webhook Secret: your_webhook_secret_key</code></pre>
      </div>

      <h2 id="order-management" class="text-2xl font-bold mt-12 mb-4">Order Management</h2>
      <p class="leading-relaxed mb-4">Configure automatic order management:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Order Management Features
✅ Automatic order status updates
✅ Payment completion handling
✅ Order note management
✅ Transaction ID tracking
✅ Card data capture (for reference)
✅ Error handling and logging</code></pre>
      </div>

      <h2 id="production-config" class="text-2xl font-bold mt-12 mb-4">Production Configuration</h2>
      <p class="leading-relaxed mb-4">For production deployment:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Production Checklist
[ ] Environment set to "Live"
[ ] Live credentials configured
[ ] SSL certificate installed
[ ] Webhook URL configured
[ ] Webhook secret set
[ ] Debug logging disabled
[ ] Test payments completed
[ ] Order management verified</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After configuration, proceed to <a href="/woocommerce/first-payment" class="text-blue-600 hover:underline">First Payment</a> to process your first payment with YagoutPay.</p>
      </div>
    `,
    sections: [
      { id: "configure-gateway", title: "Configure Payment Gateway" },
      { id: "gateway-settings", title: "Gateway Settings" },
      { id: "environment-settings", title: "Environment Settings" },
      { id: "order-management", title: "Order Management" },
      { id: "production-config", title: "Production Configuration" },
    ],
  },
  "woocommerce/first-payment": {
    title: "WooCommerce First Payment",
    description: "Process your first payment with YagoutPay WooCommerce plugin using the payment gateway.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "WooCommerce Integration", href: "/woocommerce" },
      { label: "First Payment" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Process your first payment with YagoutPay WooCommerce plugin. This guide shows you how to use the payment gateway to process payments and handle the payment flow.</p>
      </div>

      <h2 id="payment-gateway" class="text-2xl font-bold mt-12 mb-4">Payment Gateway Setup</h2>
      <p class="leading-relaxed mb-4">The YagoutPay payment gateway integrates seamlessly with WooCommerce's checkout system:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Payment Gateway Features
✅ Native WooCommerce integration
✅ Secure card processing
✅ Automatic order management
✅ Real-time payment notifications
✅ Webhook support
✅ Multi-environment support</code></pre>
      </div>

      <h2 id="checkout-process" class="text-2xl font-bold mt-12 mb-4">Checkout Process</h2>
      <p class="leading-relaxed mb-4">How the payment process works:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>1. Customer adds products to cart
2. Customer proceeds to checkout
3. Customer selects "YagoutPay" payment method
4. Customer enters card details
5. Payment is processed via YagoutPay API
6. Order status is updated automatically
7. Customer receives confirmation</code></pre>
      </div>

      <h2 id="test-credentials" class="text-2xl font-bold mt-12 mb-4">Test Credentials</h2>
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h3 class="font-semibold text-yellow-900 mb-2">Test Credentials</h3>
        <ul class="text-sm text-yellow-800 space-y-1">
          <li><strong>Merchant ID:</strong> 202508080001</li>
          <li><strong>Test Amount:</strong> 1.00 ETB</li>
          <li><strong>Test Mobile:</strong> 972315453</li>
          <li><strong>Test Email:</strong> test@example.com</li>
        </ul>
      </div>

      <h2 id="card-details" class="text-2xl font-bold mt-12 mb-4">Card Details Form</h2>
      <p class="leading-relaxed mb-4">The payment gateway includes a secure card details form:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Card Form Fields
- Card Number (required)
- Expiry Date (MM/YY format)
- Card Code (CVC)
- Cardholder Name (required)

// Form Validation
✅ Real-time card number formatting
✅ Expiry date validation
✅ CVC length validation
✅ Required field validation</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After your first payment, explore <a href="/woocommerce/payment-gateway" class="text-blue-600 hover:underline">Payment Gateway</a> and <a href="/woocommerce/order-management" class="text-blue-600 hover:underline">Order Management</a> for more advanced features.</p>
      </div>
    `,
    sections: [
      { id: "payment-gateway", title: "Payment Gateway Setup" },
      { id: "checkout-process", title: "Checkout Process" },
      { id: "test-credentials", title: "Test Credentials" },
      { id: "card-details", title: "Card Details Form" },
    ],
  },
  "woocommerce/testing": {
    title: "WooCommerce Testing",
    description: "Test your YagoutPay WooCommerce integration with comprehensive testing strategies.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "WooCommerce Integration", href: "/woocommerce" },
      { label: "Testing" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Comprehensive testing guide for your YagoutPay WooCommerce integration. Learn how to test payments, handle errors, and ensure your integration works correctly.</p>
      </div>

      <h2 id="test-environment" class="text-2xl font-bold mt-12 mb-4">Test Environment Setup</h2>
      <p class="leading-relaxed mb-4">Configure your WooCommerce store for testing with YagoutPay:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Test Configuration
Environment: Test
Test Merchant ID: 202508080001
Test Encryption Key: IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=
Test Base URL: https://uatcheckout.yagoutpay.com</code></pre>
      </div>

      <h2 id="test-credentials" class="text-2xl font-bold mt-12 mb-4">Test Credentials</h2>
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h3 class="font-semibold text-yellow-900 mb-2">UAT Test Credentials</h3>
        <ul class="text-sm text-yellow-800 space-y-1">
          <li><strong>Merchant ID:</strong> 202508080001</li>
          <li><strong>Test Amounts:</strong> 1.00, 10.00, 100.00 ETB</li>
          <li><strong>Test Mobile Numbers:</strong> 972315453, 0965680964</li>
          <li><strong>Test Emails:</strong> test@example.com, customer@test.com</li>
        </ul>
      </div>

      <h2 id="debug-tools" class="text-2xl font-bold mt-12 mb-4">Debug Tools</h2>
      <p class="leading-relaxed mb-4">Use WordPress debug tools to troubleshoot issues:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Enable WordPress Debug Logging
// In wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

// Check debug logs
// In /wp-content/debug.log</code></pre>
      </div>

      <h2 id="test-payments" class="text-2xl font-bold mt-12 mb-4">Test Payments</h2>
      <p class="leading-relaxed mb-4">Test different payment scenarios:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Test Scenarios
✅ Successful payment processing
✅ Failed payment handling
✅ Card validation testing
✅ Order status updates
✅ Webhook notifications
✅ Error handling and logging</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">TESTING COMPLETE</h3>
        <p class="text-sm text-blue-800">Your YagoutPay WooCommerce integration is now fully tested! Explore <a href="/woocommerce" class="text-blue-600 hover:underline">all WooCommerce integration methods</a> for production deployment.</p>
      </div>
    `,
    sections: [
      { id: "test-environment", title: "Test Environment Setup" },
      { id: "test-credentials", title: "Test Credentials" },
      { id: "debug-tools", title: "Debug Tools" },
      { id: "test-payments", title: "Test Payments" },
    ],
  },
  "woocommerce/payment-gateway": {
    title: "WooCommerce Payment Gateway",
    description: "Implement native WooCommerce payment gateway with YagoutPay integration.",
    breadcrumbs: [
      { label: "WooCommerce Integration", href: "/woocommerce" },
      { label: "Payment Gateway" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">The YagoutPay payment gateway provides native WooCommerce integration with secure card processing, automatic order management, and comprehensive error handling.</p>
      </div>

      <h2 id="gateway-implementation" class="text-2xl font-bold mt-12 mb-4">Gateway Implementation</h2>
      <p class="leading-relaxed mb-4">The payment gateway extends WooCommerce's payment gateway system:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Gateway Class Structure
class WC_YagoutPay_Gateway extends WC_Payment_Gateway {
    // Gateway properties
    $this->id = 'yagoutpay';
    $this->icon = YAGOUTPAY_WC_PLUGIN_URL . 'assets/images/yagoutpay-logo.png';
    $this->has_fields = true;
    $this->method_title = 'YagoutPay';
    $this->method_description = 'Accept payments via YagoutPay Direct API integration.';
}</code></pre>
      </div>

      <h2 id="payment-processing" class="text-2xl font-bold mt-12 mb-4">Payment Processing</h2>
      <p class="leading-relaxed mb-4">How payment processing works:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Payment Processing Flow
1. Customer selects YagoutPay payment method
2. Customer enters card details
3. Card data is validated and encrypted
4. Payment request is sent to YagoutPay API
5. Response is processed and order is updated
6. Customer receives confirmation</code></pre>
      </div>

      <h2 id="card-form" class="text-2xl font-bold mt-12 mb-4">Card Form</h2>
      <p class="leading-relaxed mb-4">The gateway includes a secure card details form:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Card Form Fields
- Card Number (required, 13-19 digits)
- Expiry Date (MM/YY format)
- Card Code (CVC, 3-4 digits)
- Cardholder Name (required)

// Form Validation
✅ Real-time card number formatting
✅ Expiry date validation
✅ CVC length validation
✅ Required field validation
✅ Server-side validation</code></pre>
      </div>

      <h2 id="encryption-security" class="text-2xl font-bold mt-12 mb-4">Encryption & Security</h2>
      <p class="leading-relaxed mb-4">Payment gateway uses AES-256-CBC encryption:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Encryption Method
Algorithm: AES-256-CBC with PKCS5Padding
Key: Base64 decoded from merchant key
IV: Fixed 16-byte initialization vector
Process: Encrypt JSON data → Base64 encode → Send to API</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After implementing the payment gateway, explore <a href="/woocommerce/order-management" class="text-blue-600 hover:underline">Order Management</a> for automatic order updates.</p>
      </div>
    `,
    sections: [
      { id: "gateway-implementation", title: "Gateway Implementation" },
      { id: "payment-processing", title: "Payment Processing" },
      { id: "card-form", title: "Card Form" },
      { id: "encryption-security", title: "Encryption & Security" },
    ],
  },
  "woocommerce/order-management": {
    title: "WooCommerce Order Management",
    description: "Automatic order management with YagoutPay WooCommerce integration.",
    breadcrumbs: [
      { label: "WooCommerce Integration", href: "/woocommerce" },
      { label: "Order Management" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Automatic order management provides seamless integration with WooCommerce's order system. Orders are automatically updated based on payment status with comprehensive tracking and logging.</p>
      </div>

      <h2 id="automatic-updates" class="text-2xl font-bold mt-12 mb-4">Automatic Order Updates</h2>
      <p class="leading-relaxed mb-4">Orders are automatically updated based on payment status:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Order Status Updates
✅ Payment completion handling
✅ Order status updates
✅ Order note management
✅ Transaction ID tracking
✅ Card data capture (for reference)
✅ Error handling and logging</code></pre>
      </div>

      <h2 id="order-tracking" class="text-2xl font-bold mt-12 mb-4">Order Tracking</h2>
      <p class="leading-relaxed mb-4">Comprehensive order tracking and management:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Order Tracking Features
- Transaction ID tracking
- Payment status monitoring
- Order note management
- Card data capture (masked)
- Error logging and debugging
- Webhook integration</code></pre>
      </div>

      <h2 id="card-data-capture" class="text-2xl font-bold mt-12 mb-4">Card Data Capture</h2>
      <p class="leading-relaxed mb-4">Card data is captured for reference and order management:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Card Data Capture
- Masked card number (last 4 digits)
- Card expiry date
- Cardholder name
- Transaction ID
- Payment status
- Order notes</code></pre>
      </div>

      <h2 id="error-handling" class="text-2xl font-bold mt-12 mb-4">Error Handling</h2>
      <p class="leading-relaxed mb-4">Comprehensive error handling and logging:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Error Handling Features
✅ Payment failure handling
✅ Order status updates
✅ Error logging and debugging
✅ User notification system
✅ Admin notification system
✅ Webhook error handling</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After implementing order management, explore <a href="/woocommerce/webhook-support" class="text-blue-600 hover:underline">Webhook Support</a> for real-time payment notifications.</p>
      </div>
    `,
    sections: [
      { id: "automatic-updates", title: "Automatic Order Updates" },
      { id: "order-tracking", title: "Order Tracking" },
      { id: "card-data-capture", title: "Card Data Capture" },
      { id: "error-handling", title: "Error Handling" },
    ],
  },
  "woocommerce/webhook-support": {
    title: "WooCommerce Webhook Support",
    description: "Real-time payment notifications with YagoutPay WooCommerce webhook integration.",
    breadcrumbs: [
      { label: "WooCommerce Integration", href: "/woocommerce" },
      { label: "Webhook Support" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Webhook support provides real-time payment notifications and automatic order updates. This ensures your WooCommerce store stays synchronized with payment status changes.</p>
      </div>

      <h2 id="webhook-endpoint" class="text-2xl font-bold mt-12 mb-4">Webhook Endpoint</h2>
      <p class="leading-relaxed mb-4">The plugin automatically creates webhook endpoints for payment notifications:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Webhook Endpoint
URL: https://yoursite.com/yagoutpay-webhook/
Method: POST
Content-Type: application/json
Headers: x-yagoutpay-signature</code></pre>
      </div>

      <h2 id="webhook-processing" class="text-2xl font-bold mt-12 mb-4">Webhook Processing</h2>
      <p class="leading-relaxed mb-4">How webhook processing works:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Webhook Processing Flow
1. YagoutPay sends payment notification
2. Webhook endpoint receives notification
3. Signature is verified for security
4. Payment status is processed
5. Order is updated automatically
6. Customer is notified of status change</code></pre>
      </div>

      <h2 id="webhook-security" class="text-2xl font-bold mt-12 mb-4">Webhook Security</h2>
      <p class="leading-relaxed mb-4">Webhook security features:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Security Features
✅ Signature verification
✅ Webhook secret validation
✅ Request validation
✅ Error handling and logging
✅ Rate limiting protection
✅ SSL/TLS encryption</code></pre>
      </div>

      <h2 id="webhook-events" class="text-2xl font-bold mt-12 mb-4">Webhook Events</h2>
      <p class="leading-relaxed mb-4">Supported webhook events:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// Webhook Events
- payment.success: Payment completed successfully
- payment.failure: Payment failed
- payment.pending: Payment is pending
- payment.cancelled: Payment was cancelled
- payment.refunded: Payment was refunded</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">INTEGRATION COMPLETE</h3>
        <p class="text-sm text-blue-800">Your YagoutPay WooCommerce integration is now complete! Explore <a href="/woocommerce" class="text-blue-600 hover:underline">all WooCommerce integration methods</a> for production deployment.</p>
      </div>
    `,
    sections: [
      { id: "webhook-endpoint", title: "Webhook Endpoint" },
      { id: "webhook-processing", title: "Webhook Processing" },
      { id: "webhook-security", title: "Webhook Security" },
      { id: "webhook-events", title: "Webhook Events" },
    ],
  },
  "testing/common-issues": {
    title: "Common Issues",
    description: "Common problems and solutions when integrating YagoutPay.",
    breadcrumbs: [
      { label: "Testing", href: "/flutter/testing" },
      { label: "Common Issues" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Common issues and solutions when integrating YagoutPay. This guide covers the most frequently encountered problems and their solutions.</p>
      </div>

      <h2 id="authentication-issues" class="text-2xl font-bold mt-12 mb-4">Authentication Issues</h2>
      <div class="space-y-6 mb-8">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 class="font-semibold text-red-900 mb-2">"Invalid token" Error</h3>
          <p class="text-sm text-red-800 mb-3">This error occurs when the API credentials are incorrect or the encryption key is invalid.</p>
          <div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre class="text-sm"><code>// Solution: Verify your credentials
Test Merchant ID: 202508080001
Test Encryption Key: IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=

// Check if credentials match exactly
// Ensure no extra spaces or characters
// Verify the encryption key is base64 encoded</code></pre>
          </div>
        </div>

        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 class="font-semibold text-yellow-900 mb-2">"Unauthorized" Error</h3>
          <p class="text-sm text-yellow-800 mb-3">This error indicates that the merchant ID or API key is incorrect.</p>
          <div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre class="text-sm"><code>// Solution: Double-check your credentials
1. Verify merchant ID is correct
2. Check encryption key format
3. Ensure you're using the right environment (test/live)
4. Check if the account is active</code></pre>
          </div>
        </div>
      </div>

      <h2 id="encryption-issues" class="text-2xl font-bold mt-12 mb-4">Encryption Issues</h2>
      <div class="space-y-6 mb-8">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 class="font-semibold text-blue-900 mb-2">"Encryption failed" Error</h3>
          <p class="text-sm text-blue-800 mb-3">This error occurs when the encryption process fails due to incorrect key format or algorithm issues.</p>
          <div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre class="text-sm"><code>// Solution: Check encryption implementation
// Ensure you're using AES-256-CBC
// Verify the key is properly base64 decoded
// Check that the IV is exactly 16 bytes
// Ensure proper padding is applied</code></pre>
          </div>
        </div>

        <div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 class="font-semibold text-purple-900 mb-2">"Invalid key format" Error</h3>
          <p class="text-sm text-purple-800 mb-3">This error indicates that the encryption key is not in the correct format.</p>
          <div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre class="text-sm"><code>// Solution: Verify key format
// Key should be base64 encoded
// Key should be exactly 32 bytes when decoded
// No extra characters or spaces
// Use the exact key provided by YagoutPay</code></pre>
          </div>
        </div>
      </div>

      <h2 id="payment-issues" class="text-2xl font-bold mt-12 mb-4">Payment Issues</h2>
      <div class="space-y-6 mb-8">
        <div class="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 class="font-semibold text-green-900 mb-2">Payment not processing</h3>
          <p class="text-sm text-green-800 mb-3">Payments are not being processed or are failing unexpectedly.</p>
          <div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre class="text-sm"><code>// Solution: Check payment flow
1. Verify all required fields are present
2. Check amount format (should be string)
3. Ensure currency code is correct (ETB)
4. Verify country code (ETH)
5. Check mobile number format
6. Ensure success/failure URLs are accessible</code></pre>
          </div>
        </div>

        <div class="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 class="font-semibold text-orange-900 mb-2">"Payment failed" Error</h3>
          <p class="text-sm text-orange-800 mb-3">Payments are being rejected by the payment gateway.</p>
          <div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre class="text-sm"><code>// Solution: Check payment data
1. Verify card details are valid
2. Check expiry date format
3. Ensure CVV is correct
4. Verify billing address
5. Check if test cards are being used
6. Ensure amount is within limits</code></pre>
          </div>
        </div>
      </div>

      <h2 id="network-issues" class="text-2xl font-bold mt-12 mb-4">Network Issues</h2>
      <div class="space-y-6 mb-8">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold text-gray-900 mb-2">Connection timeout</h3>
          <p class="text-sm text-gray-800 mb-3">API calls are timing out or failing to connect.</p>
          <div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre class="text-sm"><code>// Solution: Check network configuration
1. Verify internet connection
2. Check firewall settings
3. Ensure outbound HTTPS is allowed
4. Check SSL certificate validity
5. Try increasing timeout values
6. Check if proxy is blocking requests</code></pre>
          </div>
        </div>

        <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
          <h3 class="font-semibold text-indigo-900 mb-2">SSL certificate errors</h3>
          <p class="text-sm text-indigo-800 mb-3">SSL/TLS certificate validation is failing.</p>
          <div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre class="text-sm"><code>// Solution: SSL configuration
1. Update SSL certificates
2. Check certificate chain
3. Verify certificate authority
4. For development: disable SSL verification
5. Check system date/time
6. Update root certificates</code></pre>
          </div>
        </div>
      </div>

      <h2 id="debugging-tips" class="text-2xl font-bold mt-12 mb-4">Debugging Tips</h2>
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">Enable Debug Logging</h3>
        <p class="text-sm text-blue-800 mb-3">Enable detailed logging to identify issues:</p>
        <div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <pre class="text-sm"><code>// Enable debug logging
// Check console logs for detailed error messages
// Log API requests and responses
// Monitor network traffic
// Check server error logs
// Use browser developer tools</code></pre>
        </div>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-green-900 mb-2">Still having issues?</h3>
        <p class="text-sm text-green-800">If you're still experiencing problems, contact our support team with:</p>
        <ul class="text-sm text-green-800 mt-2 list-disc pl-6">
          <li>Error messages and codes</li>
          <li>Steps to reproduce the issue</li>
          <li>Your integration environment</li>
          <li>Log files and debug information</li>
        </ul>
      </div>
    `,
    sections: [
      { id: "authentication-issues", title: "Authentication Issues" },
      { id: "encryption-issues", title: "Encryption Issues" },
      { id: "payment-issues", title: "Payment Issues" },
      { id: "network-issues", title: "Network Issues" },
      { id: "debugging-tips", title: "Debugging Tips" },
    ],
  },
  "integration-methods": {
    title: "Integration Methods",
    description: "Choose the right integration method for your YagoutPay implementation.",
    breadcrumbs: [
      { label: "Quick Start", href: "/flutter/installation" },
      { label: "Integration Methods" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay offers multiple integration methods to suit different business needs and technical requirements. Choose the approach that best fits your application architecture and security requirements.</p>
      </div>

      <h2 id="hosted-checkout" class="text-2xl font-bold mt-12 mb-4">Hosted Checkout</h2>
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">Best for: Quick implementation and PCI compliance</h3>
        <p class="text-sm text-blue-800 mb-4">Redirect users to YagoutPay's secure payment page where they complete the payment process. This method requires minimal integration effort and ensures PCI compliance.</p>
        
        <div class="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 class="font-medium text-blue-900 mb-2">✅ Advantages</h4>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• Quick to implement</li>
              <li>• PCI DSS compliant</li>
              <li>• No card data handling</li>
              <li>• Mobile optimized</li>
              <li>• Multi-language support</li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-blue-900 mb-2">⚠️ Considerations</h4>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• User leaves your site</li>
              <li>• Limited customization</li>
              <li>• Redirect dependency</li>
            </ul>
          </div>
        </div>

        <div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <pre class="text-sm"><code>// Example: Redirect to hosted checkout
const paymentUrl = 'https://checkout.yagoutpay.com/pay';
const params = {
  merchant_id: 'your_merchant_id',
  amount: '100.00',
  currency: 'ETB',
  order_id: 'ORDER_123'
};

window.location.href = paymentUrl + '?' + new URLSearchParams(params);</code></pre>
        </div>
      </div>

      <h2 id="direct-api" class="text-2xl font-bold mt-12 mb-4">Direct API Integration</h2>
      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-green-900 mb-2">Best for: Custom payment flows and full control</h3>
        <p class="text-sm text-green-800 mb-4">Process payments directly through API calls without redirecting users. This method provides complete control over the payment experience but requires PCI compliance.</p>
        
        <div class="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 class="font-medium text-green-900 mb-2">✅ Advantages</h4>
            <ul class="text-sm text-green-800 space-y-1">
              <li>• Full control over UX</li>
              <li>• Seamless user experience</li>
              <li>• Custom payment forms</li>
              <li>• Real-time processing</li>
              <li>• Advanced features</li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-green-900 mb-2">⚠️ Considerations</h4>
            <ul class="text-sm text-green-800 space-y-1">
              <li>• PCI DSS compliance required</li>
              <li>• More complex implementation</li>
              <li>• Security considerations</li>
              <li>• Card data handling</li>
            </ul>
          </div>
        </div>

        <div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <pre class="text-sm"><code>// Example: Direct API call
const response = await fetch('/api/process-payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: '100.00',
    currency: 'ETB',
    card_number: '4111111111111111',
    expiry_month: '12',
    expiry_year: '2025',
    cvv: '123'
  })
});

const result = await response.json();</code></pre>
        </div>
      </div>

      <h2 id="payment-links" class="text-2xl font-bold mt-12 mb-4">Payment Links</h2>
      <div class="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-purple-900 mb-2">Best for: Invoice payments and shared links</h3>
        <p class="text-sm text-purple-800 mb-4">Generate shareable payment links that can be sent via email, SMS, or embedded in websites. Perfect for invoices, donations, and one-time payments.</p>
        
        <div class="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 class="font-medium text-purple-900 mb-2">✅ Advantages</h4>
            <ul class="text-sm text-purple-800 space-y-1">
              <li>• Easy to share</li>
              <li>• No integration required</li>
              <li>• Works on any device</li>
              <li>• QR code support</li>
              <li>• Email/SMS delivery</li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-purple-900 mb-2">⚠️ Considerations</h4>
            <ul class="text-sm text-purple-800 space-y-1">
              <li>• Limited customization</li>
              <li>• External dependency</li>
              <li>• Link expiration</li>
            </ul>
          </div>
        </div>

        <div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <pre class="text-sm"><code>// Example: Generate payment link
const paymentLink = await fetch('/api/create-payment-link', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: '500.00',
    currency: 'ETB',
    description: 'Invoice #INV-001',
    customer_email: 'customer@example.com',
    expiry_days: 7
  })
});

const { link_url, qr_code } = await paymentLink.json();</code></pre>
        </div>
      </div>

      <h2 id="webhooks" class="text-2xl font-bold mt-12 mb-4">Webhooks</h2>
      <div class="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-orange-900 mb-2">Real-time payment notifications</h3>
        <p class="text-sm text-orange-800 mb-4">Receive instant notifications when payment events occur. Essential for order management, inventory updates, and customer notifications.</p>
        
        <div class="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <pre class="text-sm"><code>// Example: Webhook endpoint
app.post('/webhook/yagoutpay', (req, res) => {
  const { event_type, payment_id, status, amount } = req.body;
  
  switch (event_type) {
    case 'payment.success':
      updateOrderStatus(payment_id, 'completed');
      sendConfirmationEmail(payment_id);
      break;
    case 'payment.failed':
      updateOrderStatus(payment_id, 'failed');
      notifyCustomer(payment_id);
      break;
  }
  
  res.status(200).send('OK');
});</code></pre>
        </div>
      </div>

      <h2 id="choosing-method" class="text-2xl font-bold mt-12 mb-4">Choosing the Right Method</h2>
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <div class="grid md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Quick Start</h3>
            <p class="text-sm text-gray-600">Use Hosted Checkout for fastest implementation</p>
          </div>
          
          <div class="text-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Full Control</h3>
            <p class="text-sm text-gray-600">Use Direct API for complete customization</p>
          </div>
          
          <div class="text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Flexible</h3>
            <p class="text-sm text-gray-600">Use Payment Links for easy sharing</p>
          </div>
        </div>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 class="font-semibold text-blue-900 mb-2">Need help choosing?</h3>
        <p class="text-sm text-blue-800 mb-3">Our integration specialists can help you choose the right method for your specific use case.</p>
        <a href="https://yagoutpay.com/merchant-portal/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
          Contact our team
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>
      </div>
    `,
    sections: [
      { id: "hosted-checkout", title: "Hosted Checkout" },
      { id: "direct-api", title: "Direct API Integration" },
      { id: "payment-links", title: "Payment Links" },
      { id: "webhooks", title: "Webhooks" },
      { id: "choosing-method", title: "Choosing the Right Method" },
    ],
  },
};

export function getPageContent(slug: string): PageContent {
  return (
    pageContents[slug] || {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist.",
      breadcrumbs: [],
      html: "<p>This page could not be found.</p>",
      sections: [],
    }
  );
}

export function getAllPageSlugs(): string[] {
  return Object.keys(pageContents);
}

export interface PageContent {
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  html: string;
  sections?: { id: string; title: string }[];
}

const pageContents: Record<string, PageContent> = {
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0
  webview_flutter: ^4.4.2
  provider: ^6.1.1
  crypto: ^3.0.3</code></pre>
      </div>

      <h2 id="install-dependencies" class="text-2xl font-bold mt-12 mb-4">Install Dependencies</h2>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>flutter pub get</code></pre>
      </div>

      <h2 id="import-packages" class="text-2xl font-bold mt-12 mb-4">Import Required Packages</h2>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>import 'package:http/http.dart' as http;
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>class YagoutPayConfig {
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
    title: "Hosted Payments",
    description:
      "Integrate YagoutPay hosted payment processing in your Flutter app.",
    breadcrumbs: [
      { label: "Flutter Integration", href: "/flutter" },
      { label: "Payment Methods", href: "/payment-methods" },
      { label: "Hosted Payments" },
    ],
    html: `
      <p class="leading-relaxed mb-6">Hosted payments redirect customers to YagoutPay's secure payment page, providing a seamless checkout experience with minimal integration effort.</p>
      
      <h2 id="features" class="text-2xl font-bold mt-12 mb-4">Features</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>✅ Secure payment processing</li>
        <li>✅ Multiple payment methods</li>
        <li>✅ Mobile-optimized interface</li>
        <li>✅ Automatic success/failure detection</li>
      </ul>

      <h2 id="implementation" class="text-2xl font-bold mt-12 mb-4">Implementation</h2>
      <p class="leading-relaxed mb-4">Create your YagoutPay service class:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>class YagoutPayService {
  static Future&lt;Map&lt;String, dynamic&gt;&gt; payViaHosted({
    required String orderNo,
    required String amount,
    required String successUrl,
    required String failureUrl,
    required String email,
    required String mobile,
    String? customerName,
    String country = 'ETH',
    String currency = 'ETB',
    String channel = 'MOBILE',
    String transactionType = 'SALE',
  }) async {
    // Generate unique order ID
    final uniqueOrderNo = generateUniqueOrderId(orderNo);
    
    // Build payment data sections
    final txnDetails = [
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
    
    // Encrypt data
    final paddedData = AesUtil.padForZeroPadding(allValues);
    final merchantRequest = AesUtil.encryptToBase64(paddedData, YagoutPayConfig.hostedKey);
    final hash = AesUtil.generateHash(paddedData, YagoutPayConfig.hostedKey);
    
    // Generate HTML form
    final html = '''
    &lt;!DOCTYPE html&gt;
    &lt;html&gt;
      &lt;body onload="document.forms[0].submit()"&gt;
        &lt;form action="\${YagoutPayConfig.hostedUrl}" method="POST"&gt;
          &lt;input type="hidden" name="merchantId" value="\${YagoutPayConfig.hostedMerchantId}"&gt;
          &lt;input type="hidden" name="merchantRequest" value="$merchantRequest"&gt;
          &lt;input type="hidden" name="hash" value="$hash"&gt;
        &lt;/form&gt;
      &lt;/body&gt;
    &lt;/html&gt;
    ''';
    
    return {
      'status': 'SUCCESS',
      'html': html,
      'orderId': uniqueOrderNo,
    };
  }
}</code></pre>
      </div>

      <h2 id="usage" class="text-2xl font-bold mt-12 mb-4">Usage in Flutter</h2>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// In your checkout screen
Future&lt;void&gt; _processHostedPayment() async {
  final result = await YagoutPayService.payViaHosted(
    orderNo: 'ORDER-123',
    amount: '100.00',
    successUrl: 'https://yourapp.com/success',
    failureUrl: 'https://yourapp.com/failure',
    email: 'customer@example.com',
    mobile: '+251912345678',
    customerName: 'John Doe',
  );
  
  if (result['status'] == 'SUCCESS') {
    // Navigate to WebView with HTML content
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) =&gt; YagoutPayWebViewScreen(
          htmlContent: result['html'],
          successUrl: 'https://yourapp.com/success',
          failureUrl: 'https://yourapp.com/failure',
        ),
      ),
    );
  }
}</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">Learn about <a href="/flutter/webview-integration" class="text-blue-600 hover:underline">WebView Integration</a> to handle the payment flow in your app.</p>
      </div>
    `,
    sections: [
      { id: "features", title: "Features" },
      { id: "implementation", title: "Implementation" },
      { id: "usage", title: "Usage in Flutter" },
    ],
  },
  "flutter/api-integration": {
    title: "API Integration",
    description:
      "Direct API integration for seamless payment processing in your Flutter app.",
    breadcrumbs: [
      { label: "Flutter Integration", href: "/flutter" },
      { label: "Payment Methods", href: "/payment-methods" },
      { label: "API Integration" },
    ],
    html: `
      <p class="leading-relaxed mb-6">API integration allows you to process payments directly within your app without redirecting customers, providing a seamless user experience.</p>
      
      <h2 id="features" class="text-2xl font-bold mt-12 mb-4">Features</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>✅ Seamless user experience</li>
        <li>✅ Custom payment UI</li>
        <li>✅ Real-time payment processing</li>
        <li>✅ Direct API communication</li>
      </ul>

      <h2 id="implementation" class="text-2xl font-bold mt-12 mb-4">Implementation</h2>
      <p class="leading-relaxed mb-4">Create your API integration service:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>static Future&lt;Map&lt;String, dynamic&gt;&gt; payViaApi({
  required String orderNo,
  required String amount,
  required String successUrl,
  required String failureUrl,
  required String email,
  required String mobile,
  String? customerName,
  String country = 'ETH',
  String currency = 'ETB',
  String channel = 'API',
  String transactionType = 'SALE',
}) async {
  final meId = YagoutPayConfig.apiMerchantId;
  final key = YagoutPayConfig.apiKey;
  
  // Build API payload
  final Map&lt;String, dynamic&gt; plain = {
    'card_details': {
      'cardNumber': '',
      'expiryMonth': '',
      'expiryYear': '',
      'cvv': '',
      'cardName': ''
    },
    'txn_details': {
      'agId': YagoutPayConfig.aggregatorId,
      'meId': meId,
      'orderNo': orderNo,
      'amount': amount,
      'country': country,
      'currency': currency,
      'transactionType': transactionType,
      'sucessUrl': successUrl,
      'failureUrl': failureUrl,
      'channel': channel,
    },
    'cust_details': {
      'customerName': customerName ?? '',
      'emailId': email,
      'mobileNumber': mobile,
      'uniqueId': '',
      'isLoggedIn': 'Y'
    },
    'pg_details': {
      'pg_Id': YagoutPayConfig.pgId,
      'paymode': YagoutPayConfig.paymode,
      'scheme_Id': YagoutPayConfig.schemeId,
      'wallet_type': YagoutPayConfig.walletType,
    },
  };
  
  // Encrypt payload
  final plainStr = jsonEncode(plain);
  final encrypted = AesUtil.encryptToBase64(plainStr, key);
  
  // Make API request
  final response = await http.post(
    Uri.parse(YagoutPayConfig.apiUrl),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({
      'merchantId': meId,
      'merchantRequest': encrypted,
    }),
  );
  
  // Process response
  final responseData = json.decode(response.body);
  final status = responseData['status'] ?? '';
  final statusMessage = responseData['statusMessage'] ?? '';
  
  return {
    'status': status,
    'statusMessage': statusMessage,
    'response': responseData,
  };
}</code></pre>
      </div>

      <h2 id="usage" class="text-2xl font-bold mt-12 mb-4">Usage in Flutter</h2>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// In your payment processing
Future&lt;void&gt; _processApiPayment() async {
  final result = await YagoutPayService.payViaApi(
    orderNo: 'ORDER-123',
    amount: '100.00',
    successUrl: 'https://yourapp.com/success',
    failureUrl: 'https://yourapp.com/failure',
    email: 'customer@example.com',
    mobile: '+251912345678',
    customerName: 'John Doe',
  );
  
  if (result['status'] == 'SUCCESS') {
    // Handle successful payment
    _showSuccessDialog(result);
  } else {
    // Handle payment failure
    _showErrorDialog(result['statusMessage']);
  }
}</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">Learn about <a href="/flutter/error-handling" class="text-blue-600 hover:underline">Error Handling</a> to manage payment failures gracefully.</p>
      </div>
    `,
    sections: [
      { id: "features", title: "Features" },
      { id: "implementation", title: "Implementation" },
      { id: "usage", title: "Usage in Flutter" },
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>static Future&lt;Map&lt;String, dynamic&gt;&gt; createPaymentLink({
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
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Create payment link
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
    title: "Get Started",
    description: "Welcome to YagoutPay Flutter integration documentation.",
    breadcrumbs: [{ label: "Get Started" }],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Welcome to YagoutPay Flutter integration documentation. Get started with our comprehensive guide to integrate payment processing into your Flutter applications.</p>
      </div>
      
      <h2 id="quick-start" class="text-2xl font-bold mt-12 mb-4">Quick Start</h2>
      <p class="leading-relaxed mb-4">Follow these steps to get started with YagoutPay Flutter integration:</p>
      
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><a href="/flutter/installation" class="text-primary hover:underline">Install Flutter dependencies</a></li>
        <li><a href="/flutter/configuration" class="text-primary hover:underline">Configure your credentials</a></li>
        <li><a href="/flutter/hosted-payments" class="text-primary hover:underline">Choose integration method</a></li>
        <li><a href="/flutter/test-credentials" class="text-primary hover:underline">Test your integration</a></li>
      </ol>

      <h2 id="integration-methods" class="text-2xl font-bold mt-12 mb-4">Integration Methods</h2>
      <p class="leading-relaxed mb-4">YagoutPay offers multiple integration methods for Flutter:</p>
      
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Hosted Payments</h3>
          <p class="text-sm text-gray-700 mb-3">Redirect customers to YagoutPay's secure payment page.</p>
          <a href="/flutter/hosted-payments" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">API Integration</h3>
          <p class="text-sm text-gray-700 mb-3">Process payments directly within your app.</p>
          <a href="/flutter/api-integration" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Payment Links</h3>
          <p class="text-sm text-gray-700 mb-3">Generate shareable payment URLs.</p>
          <a href="/flutter/payment-links" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Static Links</h3>
          <p class="text-sm text-gray-700 mb-3">QR code and recurring payments.</p>
          <a href="/flutter/static-links" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
      </div>
    `,
    sections: [
      { id: "quick-start", title: "Quick Start" },
      { id: "integration-methods", title: "Integration Methods" },
    ],
  },
  flutter: {
    title: "Flutter Integration",
    description: "Complete YagoutPay Flutter integration guide.",
    breadcrumbs: [{ label: "Flutter Integration" }],
    html: `
      <p class="leading-relaxed mb-6">Complete guide to integrating YagoutPay payments in your Flutter applications.</p>
      
      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">YagoutPay provides comprehensive Flutter integration with multiple payment methods and seamless user experience.</p>
      
      <h2 id="getting-started" class="text-2xl font-bold mt-12 mb-4">Getting Started</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><a href="/flutter/installation" class="text-primary hover:underline">Install dependencies</a></li>
        <li><a href="/flutter/configuration" class="text-primary hover:underline">Configure credentials</a></li>
        <li><a href="/flutter/first-payment" class="text-primary hover:underline">Process first payment</a></li>
      </ol>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "getting-started", title: "Getting Started" },
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># Using npm
npm install yagoutpay-sdk

# Using yarn
yarn add yagoutpay-sdk

# For React Native WebView integration
npm install react-native-webview</code></pre>
      </div>

      <h2 id="ios-setup" class="text-2xl font-bold mt-12 mb-4">iOS Setup</h2>
      <p class="leading-relaxed mb-4">For iOS, you need to add permissions to your Info.plist:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;key&gt;NSAppTransportSecurity&lt;/key&gt;
&lt;dict&gt;
    &lt;key&gt;NSAllowsArbitraryLoads&lt;/key&gt;
    &lt;true/&gt;
&lt;/dict&gt;</code></pre>
      </div>

      <h2 id="android-setup" class="text-2xl font-bold mt-12 mb-4">Android Setup</h2>
      <p class="leading-relaxed mb-4">For Android, add internet permission to your AndroidManifest.xml:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;uses-permission android:name="android.permission.INTERNET" /&gt;</code></pre>
      </div>

      <h2 id="import-sdk" class="text-2xl font-bold mt-12 mb-4">Import SDK</h2>
      <p class="leading-relaxed mb-4">Import the YagoutPay SDK in your React Native component:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>import { YagoutPay, YagoutPayWebView } from 'yagoutpay-sdk';
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>export const YagoutPayConfig = {
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>import { YagoutPay } from 'yagoutpay-sdk';
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>import { YagoutPay } from 'yagoutpay-sdk';
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>import React, { useState } from 'react';
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
      { title: "API Integration" },
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>import { YagoutPayConfig } from '../config/YagoutPayConfig';

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
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>import React, { useState } from 'react';
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>class YagoutPayLinkService {
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
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>import React, { useState } from 'react';
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
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Create static link for QR code
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># Using npm
npm install yagoutpay-sdk

# Using yarn
yarn add yagoutpay-sdk

# For browser usage
npm install yagoutpay-sdk-browser</code></pre>
      </div>

      <h2 id="browser-setup" class="text-2xl font-bold mt-12 mb-4">Browser Setup</h2>
      <p class="leading-relaxed mb-4">For browser usage, include the SDK via CDN or build it into your project:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;!-- Via CDN --&gt;
&lt;script src="https://cdn.yagoutpay.com/sdk/yagoutpay-sdk.min.js"&gt;&lt;/script&gt;

&lt;!-- Or import in your JavaScript --&gt;
import { YagoutPay } from 'yagoutpay-sdk';</code></pre>
      </div>

      <h2 id="import-sdk" class="text-2xl font-bold mt-12 mb-4">Import SDK</h2>
      <p class="leading-relaxed mb-4">Import the YagoutPay SDK in your JavaScript application:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// ES6 modules
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>export const YagoutPayConfig = {
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>import { YagoutPay } from 'yagoutpay-sdk';
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
    description: "Process payments directly in your JavaScript application.",
    breadcrumbs: [
      { label: "JavaScript Integration", href: "/javascript" },
      { label: "Payment Methods", href: "/payment-methods" },
      { label: "Direct Payment Integration" },
    ],
    html: `
      <p class="leading-relaxed mb-6">Direct payment integration allows you to process payments directly within your JavaScript application, providing a seamless user experience without redirecting customers.</p>
      
      <h2 id="features" class="text-2xl font-bold mt-12 mb-4">Features</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>✅ Process payments directly in your app</li>
        <li>✅ Multiple payment methods (Telebirr, CBE, Awash Bank)</li>
        <li>✅ Real-time payment processing</li>
        <li>✅ Custom payment UI</li>
        <li>✅ Secure data encryption</li>
      </ul>

      <h2 id="implementation" class="text-2xl font-bold mt-12 mb-4">Implementation</h2>
      <p class="leading-relaxed mb-4">Create your payment processing service:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>import { YagoutPay } from 'yagoutpay-sdk';
import { YagoutPayConfig } from '../config/yagoutpayConfig';

class YagoutPayService {
  static async processPayment({
    amount,
    currency = 'ETB',
    orderId,
    customerName,
    email,
    mobileNumber,
    paymentMethod = 'telebirr', // or 'cbe', 'awash'
    successUrl,
    failureUrl,
  }) {
    try {
      // Create payment request
      const paymentRequest = {
        amount: amount,
        currency: currency,
        orderId: orderId,
        customerName: customerName,
        email: email,
        mobileNumber: mobileNumber,
        paymentMethod: paymentMethod,
        successUrl: successUrl,
        failureUrl: failureUrl,
      };

      // Process payment
      const result = await YagoutPay.processPayment(paymentRequest);
      
      if (result.isSuccess) {
        console.log('Payment successful:', result.transactionId);
        return {
          success: true,
          transactionId: result.transactionId,
          message: 'Payment processed successfully'
        };
      } else {
        console.log('Payment failed:', result.errorMessage);
        return {
          success: false,
          error: result.errorMessage
        };
      }
    } catch (error) {
      console.error('Payment error:', error);
      return {
        success: false,
        error: 'Payment processing failed'
      };
    }
  }
}</code></pre>
      </div>

      <h2 id="usage" class="text-2xl font-bold mt-12 mb-4">Usage in JavaScript</h2>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// HTML
&lt;div id="payment-form"&gt;
  &lt;input type="number" id="amount" placeholder="Amount" /&gt;
  &lt;input type="text" id="customer-name" placeholder="Customer Name" /&gt;
  &lt;input type="email" id="email" placeholder="Email" /&gt;
  &lt;input type="tel" id="mobile" placeholder="Mobile Number" /&gt;
  &lt;select id="payment-method"&gt;
    &lt;option value="telebirr"&gt;Telebirr&lt;/option&gt;
    &lt;option value="cbe"&gt;CBE&lt;/option&gt;
    &lt;option value="awash"&gt;Awash Bank&lt;/option&gt;
  &lt;/select&gt;
  &lt;button id="pay-button"&gt;Pay Now&lt;/button&gt;
&lt;/div&gt;

// JavaScript
document.getElementById('pay-button').addEventListener('click', async () => {
  const amount = document.getElementById('amount').value;
  const customerName = document.getElementById('customer-name').value;
  const email = document.getElementById('email').value;
  const mobile = document.getElementById('mobile').value;
  const paymentMethod = document.getElementById('payment-method').value;
  
  const result = await YagoutPayService.processPayment({
    amount: parseFloat(amount),
    orderId: 'ORDER_' + Date.now(),
    customerName: customerName,
    email: email,
    mobileNumber: mobile,
    paymentMethod: paymentMethod,
    successUrl: 'https://yourapp.com/success',
    failureUrl: 'https://yourapp.com/failure',
  });
  
  if (result.success) {
    alert('Payment successful! Transaction ID: ' + result.transactionId);
  } else {
    alert('Payment failed: ' + result.error);
  }
});</code></pre>
      </div>

      <h2 id="payment-methods" class="text-2xl font-bold mt-12 mb-4">Available Payment Methods</h2>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">Telebirr</h3>
          <p class="text-sm text-gray-700">Mobile money payment solution</p>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">CBE</h3>
          <p class="text-sm text-gray-700">Commercial Bank of Ethiopia</p>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">Awash Bank</h3>
          <p class="text-sm text-gray-700">Local bank integration</p>
        </div>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">Learn about <a href="/javascript/payment-links" class="text-blue-600 hover:underline">Payment Link Generation</a> for creating shareable payment URLs.</p>
      </div>
    `,
    sections: [
      { id: "features", title: "Features" },
      { id: "implementation", title: "Implementation" },
      { id: "usage", title: "Usage in JavaScript" },
      { id: "payment-methods", title: "Available Payment Methods" },
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>class YagoutPayLinkService {
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
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Create payment link
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
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Check link status
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;!-- HTML --&gt;
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>class CustomPaymentWidget {
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
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>/* CSS for custom payment widget */
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Encryption is handled automatically
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Sandbox environment (for testing)
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
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>try {
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
  flutter: {
    title: "Flutter Integration",
    description:
      "Complete guide to integrating YagoutPay with Flutter applications.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Flutter Integration" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay Flutter SDK provides seamless payment integration for your Flutter applications with support for both hosted and direct payment methods.</p>
      </div>

      <h2 id="quick-start" class="text-2xl font-bold mt-12 mb-4">Quick Start</h2>
      <p class="leading-relaxed mb-4">Get up and running with YagoutPay Flutter integration in minutes:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><a href="/flutter/installation" class="text-blue-600 hover:underline">Installation</a> - Set up the SDK</li>
        <li><a href="/flutter/configuration" class="text-blue-600 hover:underline">Configuration</a> - Configure your credentials</li>
        <li><a href="/flutter/hosted-payments" class="text-blue-600 hover:underline">Hosted Payments</a> - Quick payment integration</li>
        <li><a href="/flutter/api-integration" class="text-blue-600 hover:underline">API Integration</a> - Direct API calls</li>
      </ul>

      <h2 id="integration-methods" class="text-2xl font-bold mt-12 mb-4">Integration Methods</h2>
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Hosted Payments</h3>
          <p class="text-sm text-gray-700 mb-4">Redirect users to YagoutPay's hosted payment page for a secure, PCI-compliant checkout experience.</p>
          <a href="/flutter/hosted-payments" class="text-blue-600 hover:underline text-sm">Learn more →</a>
        </div>
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">API Integration</h3>
          <p class="text-sm text-gray-700 mb-4">Integrate payments directly into your app using our REST API with custom UI components.</p>
          <a href="/flutter/api-integration" class="text-blue-600 hover:underline text-sm">Learn more →</a>
        </div>
      </div>

      <h2 id="features" class="text-2xl font-bold mt-12 mb-4">Features</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Multiple payment methods (cards, bank transfers, mobile money)</li>
        <li>WebView integration for seamless user experience</li>
        <li>Payment links for easy sharing</li>
        <li>Comprehensive error handling</li>
        <li>Test and production environments</li>
      </ul>
    `,
    sections: [
      { id: "quick-start", title: "Quick Start" },
      { id: "integration-methods", title: "Integration Methods" },
      { id: "features", title: "Features" },
    ],
  },
  "react-native": {
    title: "React Native Integration",
    description:
      "Complete guide to integrating YagoutPay with React Native applications.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "React Native Integration" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay React Native SDK provides seamless payment integration for your React Native applications with support for both hosted and direct payment methods.</p>
      </div>

      <h2 id="quick-start" class="text-2xl font-bold mt-12 mb-4">Quick Start</h2>
      <p class="leading-relaxed mb-4">Get up and running with YagoutPay React Native integration in minutes:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><a href="/react-native/installation" class="text-blue-600 hover:underline">Installation</a> - Set up the SDK</li>
        <li><a href="/react-native/configuration" class="text-blue-600 hover:underline">Configuration</a> - Configure your credentials</li>
        <li><a href="/react-native/hosted-payments" class="text-blue-600 hover:underline">Hosted Payments</a> - Quick payment integration</li>
        <li><a href="/react-native/api-integration" class="text-blue-600 hover:underline">API Integration</a> - Direct API calls</li>
      </ul>

      <h2 id="integration-methods" class="text-2xl font-bold mt-12 mb-4">Integration Methods</h2>
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Hosted Payments</h3>
          <p class="text-sm text-gray-700 mb-4">Redirect users to YagoutPay's hosted payment page for a secure, PCI-compliant checkout experience.</p>
          <a href="/react-native/hosted-payments" class="text-blue-600 hover:underline text-sm">Learn more →</a>
        </div>
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">API Integration</h3>
          <p class="text-sm text-gray-700 mb-4">Integrate payments directly into your app using our REST API with custom UI components.</p>
          <a href="/react-native/api-integration" class="text-blue-600 hover:underline text-sm">Learn more →</a>
        </div>
      </div>

      <h2 id="features" class="text-2xl font-bold mt-12 mb-4">Features</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Multiple payment methods (cards, bank transfers, mobile money)</li>
        <li>WebView integration for seamless user experience</li>
        <li>Payment links for easy sharing</li>
        <li>Comprehensive error handling</li>
        <li>Test and production environments</li>
      </ul>
    `,
    sections: [
      { id: "quick-start", title: "Quick Start" },
      { id: "integration-methods", title: "Integration Methods" },
      { id: "features", title: "Features" },
    ],
  },
  javascript: {
    title: "JavaScript Integration",
    description:
      "Complete guide to integrating YagoutPay with JavaScript applications.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "JavaScript Integration" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay JavaScript SDK provides seamless payment integration for your web applications with support for both hosted and direct payment methods.</p>
      </div>

      <h2 id="quick-start" class="text-2xl font-bold mt-12 mb-4">Quick Start</h2>
      <p class="leading-relaxed mb-4">Get up and running with YagoutPay JavaScript integration in minutes:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><a href="/javascript/installation" class="text-blue-600 hover:underline">Installation</a> - Set up the SDK</li>
        <li><a href="/javascript/configuration" class="text-blue-600 hover:underline">Configuration</a> - Configure your credentials</li>
        <li><a href="/javascript/direct-payment" class="text-blue-600 hover:underline">Direct Payment</a> - Direct payment integration</li>
        <li><a href="/javascript/payment-links" class="text-blue-600 hover:underline">Payment Links</a> - Generate payment links</li>
      </ul>

      <h2 id="integration-methods" class="text-2xl font-bold mt-12 mb-4">Integration Methods</h2>
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Direct Payment</h3>
          <p class="text-sm text-gray-700 mb-4">Integrate payments directly into your web application using our JavaScript SDK.</p>
          <a href="/javascript/direct-payment" class="text-blue-600 hover:underline text-sm">Learn more →</a>
        </div>
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Payment Links</h3>
          <p class="text-sm text-gray-700 mb-4">Generate secure payment links that can be shared via email, SMS, or embedded in your website.</p>
          <a href="/javascript/payment-links" class="text-blue-600 hover:underline text-sm">Learn more →</a>
        </div>
      </div>

      <h2 id="features" class="text-2xl font-bold mt-12 mb-4">Features</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Multiple payment methods (cards, bank transfers, mobile money)</li>
        <li>Payment widgets for easy integration</li>
        <li>Payment links for easy sharing</li>
        <li>Comprehensive error handling</li>
        <li>Test and production environments</li>
      </ul>
    `,
    sections: [
      { id: "quick-start", title: "Quick Start" },
      { id: "integration-methods", title: "Integration Methods" },
      { id: "features", title: "Features" },
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
  api: {
    title: "API Reference",
    description: "Complete API reference for YagoutPay integration.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "API Reference" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay REST API provides programmatic access to payment processing, customer management, and transaction history.</p>
      </div>

      <h2 id="authentication" class="text-2xl font-bold mt-12 mb-4">Authentication</h2>
      <p class="leading-relaxed mb-4">All API requests require authentication using your API key:</p>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.yagoutpay.com/v1/payments</code></pre>
      </div>

      <h2 id="base-url" class="text-2xl font-bold mt-12 mb-4">Base URL</h2>
      <p class="leading-relaxed mb-4">All API requests are made to:</p>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>https://api.yagoutpay.com/v1</code></pre>
      </div>

      <h2 id="endpoints" class="text-2xl font-bold mt-12 mb-4">Key Endpoints</h2>
      <div class="space-y-4 mb-8">
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">POST /payments</h3>
          <p class="text-sm text-gray-700">Create a new payment</p>
        </div>
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">GET /payments/{id}</h3>
          <p class="text-sm text-gray-700">Retrieve payment details</p>
        </div>
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">POST /customers</h3>
          <p class="text-sm text-gray-700">Create a new customer</p>
        </div>
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">GET /webhooks</h3>
          <p class="text-sm text-gray-700">List webhook endpoints</p>
        </div>
      </div>
    `,
    sections: [
      { id: "authentication", title: "Authentication" },
      { id: "base-url", title: "Base URL" },
      { id: "endpoints", title: "Key Endpoints" },
    ],
  },
  testing: {
    title: "Testing",
    description: "Guide to testing your YagoutPay integration.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Testing" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Test your YagoutPay integration using our test environment and test credentials.</p>
      </div>

      <h2 id="test-environment" class="text-2xl font-bold mt-12 mb-4">Test Environment</h2>
      <p class="leading-relaxed mb-4">Use our test environment to safely test your integration without processing real payments:</p>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>Base URL: https://api-test.yagoutpay.com/v1
API Key: yp_test_...</code></pre>
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

      <h2 id="webhooks" class="text-2xl font-bold mt-12 mb-4">Testing Webhooks</h2>
      <p class="leading-relaxed mb-4">Use our webhook testing tool to simulate webhook events:</p>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>curl -X POST https://api-test.yagoutpay.com/v1/webhooks/test \\
  -H "Authorization: Bearer yp_test_..." \\
  -H "Content-Type: application/json" \\
  -d '{"event": "payment.succeeded"}'</code></pre>
      </div>
    `,
    sections: [
      { id: "test-environment", title: "Test Environment" },
      { id: "test-credentials", title: "Test Credentials" },
      { id: "webhooks", title: "Testing Webhooks" },
    ],
  },
  support: {
    title: "Support",
    description: "Get help with your YagoutPay integration.",
    breadcrumbs: [
      { label: "Get started", href: "/get-started" },
      { label: "Support" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Get help with your YagoutPay integration through our comprehensive support channels.</p>
      </div>

      <h2 id="support-channels" class="text-2xl font-bold mt-12 mb-4">Support Channels</h2>
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">📧 Email Support</h3>
          <p class="text-sm text-gray-700 mb-4">Get help via email with detailed technical support.</p>
          <p class="text-sm font-mono">support@yagoutpay.com</p>
        </div>
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">💬 Live Chat</h3>
          <p class="text-sm text-gray-700 mb-4">Chat with our support team in real-time.</p>
          <p class="text-sm">Available 24/7</p>
        </div>
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">📚 Documentation</h3>
          <p class="text-sm text-gray-700 mb-4">Comprehensive guides and API references.</p>
          <a href="/" class="text-blue-600 hover:underline text-sm">Browse docs →</a>
        </div>
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">🐛 Bug Reports</h3>
          <p class="text-sm text-gray-700 mb-4">Report bugs and issues with our SDK.</p>
          <p class="text-sm font-mono">bugs@yagoutpay.com</p>
        </div>
      </div>

      <h2 id="community" class="text-2xl font-bold mt-12 mb-4">Community</h2>
      <div class="space-y-4 mb-8">
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">GitHub Discussions</h3>
          <p class="text-sm text-gray-700">Join our GitHub community for discussions and Q&A.</p>
        </div>
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">Stack Overflow</h3>
          <p class="text-sm text-gray-700">Ask questions tagged with 'yagoutpay' on Stack Overflow.</p>
        </div>
      </div>
    `,
    sections: [
      { id: "support-channels", title: "Support Channels" },
      { id: "community", title: "Community" },
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>import 'package:yagoutpay_flutter/yagoutpay_flutter.dart';

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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>ElevatedButton(
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
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Configure for test environment
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
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>final result = await YagoutPay.createPayment(
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>import { YagoutPay } from 'yagoutpay-react-native';

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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>import React, { useState } from 'react';
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
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>import { YagoutPay } from 'yagoutpay-react-native';

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
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>const result = await YagoutPay.createPayment({
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;script src="https://js.yagoutpay.com/v1/yagoutpay.js"&gt;&lt;/script&gt;
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;button onclick="createPayment()"&gt;Create Payment&lt;/button&gt;

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
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;script src="https://js-test.yagoutpay.com/v1/yagoutpay.js"&gt;&lt;/script&gt;
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
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>const result = await yagoutpay.payments.create({
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

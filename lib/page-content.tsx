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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># Required packages for YagoutPay integration
composer require guzzlehttp/guzzle
composer require laravel/sanctum

# For payment widget (QR code generation)
composer require simplesoftwareio/simple-qrcode

# For image processing (optional)
composer require intervention/image</code></pre>
      </div>

      <h2 id="environment-config" class="text-2xl font-bold mt-12 mb-4">Environment Configuration</h2>
      <p class="leading-relaxed mb-4">Add the following configuration to your <code class="bg-muted px-2 py-1 rounded text-sm font-mono">.env</code> file:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># YagoutPay Configuration
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// app/Services/YagoutPayService.php
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
    description: "Implement hosted payments in Laravel applications with YagoutPay.",
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
        <p class="leading-relaxed">Hosted payments redirect customers to YagoutPay's secure payment page, providing a seamless payment experience without requiring PCI compliance on your end.</p>
      </div>

      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">Hosted payments are the simplest way to integrate YagoutPay into your Laravel application. Customers are redirected to a secure payment page hosted by YagoutPay, where they complete their payment before being redirected back to your application.</p>

      <h2 id="implementation" class="text-2xl font-bold mt-12 mb-4">Implementation</h2>
      <p class="leading-relaxed mb-4">Create a payment controller to handle hosted payment flows:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// app/Http/Controllers/PaymentController.php
&lt;?php

namespace App\\Http\\Controllers;

use App\\Services\\YagoutPayService;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\Response;

class PaymentController extends Controller
{
    protected $yagoutPayService;

    public function __construct(YagoutPayService $yagoutPayService)
    {
        $this->yagoutPayService = $yagoutPayService;
    }

    public function initiatePayment(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'email' => 'required|email',
            'mobile_no' => 'required|string',
            'customer_name' => 'required|string',
            'order_no' => 'required|string|unique:orders,order_no'
        ]);

        $paymentData = [
            'order_no' => $request->order_no,
            'amount' => number_format($request->amount, 2, '.', ''),
            'email_id' => $request->email,
            'mobile_no' => $request->mobile_no,
            'customer_name' => $request->customer_name,
            'bill_address' => $request->bill_address ?? 'N/A',
            'bill_city' => $request->bill_city ?? 'Addis Ababa',
            'bill_state' => $request->bill_state ?? 'Addis Ababa',
            'bill_country' => $request->bill_country ?? 'ET',
            'bill_zip' => $request->bill_zip ?? '1000',
            'wallet_type' => $request->wallet_type ?? 'telebirr',
            'pg_id' => '67ee846571e740418d688c3f',
            'paymode' => 'WA',
            'scheme_id' => '7'
        ];

        try {
            $response = $this->yagoutPayService->processPayment($paymentData);
            
            if ($response['status'] === 'Success') {
                return redirect($response['payment_url']);
            } else {
                return back()->with('error', $response['message'] ?? 'Payment initiation failed');
            }
        } catch (\\Exception $e) {
            return back()->with('error', 'Payment processing failed: ' . $e->getMessage());
        }
    }

    public function handleCallback(Request $request)
    {
        // Handle payment callback from YagoutPay
        $status = $request->input('status');
        $orderNo = $request->input('order_no');
        
        if ($status === 'Success') {
            // Update order status to completed
            // Send confirmation email
            // Redirect to success page
            return redirect('/payment/success')->with('order_no', $orderNo);
        } else {
            // Handle failed payment
            return redirect('/payment/failure')->with('order_no', $orderNo);
        }
    }
}</code></pre>
      </div>

      <h2 id="routes" class="text-2xl font-bold mt-12 mb-4">Routes</h2>
      <p class="leading-relaxed mb-4">Add the following routes to your <code class="bg-muted px-2 py-1 rounded text-sm font-mono">routes/web.php</code>:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Payment routes
Route::post('/payment/initiate', [PaymentController::class, 'initiatePayment'])->name('payment.initiate');
Route::get('/payment/callback', [PaymentController::class, 'handleCallback'])->name('payment.callback');
Route::get('/payment/success', [PaymentController::class, 'paymentSuccess'])->name('payment.success');
Route::get('/payment/failure', [PaymentController::class, 'paymentFailure'])->name('payment.failure');</code></pre>
      </div>

      <h2 id="frontend-form" class="text-2xl font-bold mt-12 mb-4">Frontend Payment Form</h2>
      <p class="leading-relaxed mb-4">Create a payment form in your Blade template:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;!-- resources/views/payment/form.blade.php --&gt;
&lt;form action="{{ route('payment.initiate') }}" method="POST"&gt;
    @csrf
    &lt;div class="form-group"&gt;
        &lt;label for="amount"&gt;Amount (ETB)&lt;/label&gt;
        &lt;input type="number" name="amount" id="amount" step="0.01" min="0.01" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="email"&gt;Email&lt;/label&gt;
        &lt;input type="email" name="email" id="email" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="mobile_no"&gt;Mobile Number&lt;/label&gt;
        &lt;input type="text" name="mobile_no" id="mobile_no" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="customer_name"&gt;Customer Name&lt;/label&gt;
        &lt;input type="text" name="customer_name" id="customer_name" required&gt;
    &lt;/div&gt;
    
    &lt;input type="hidden" name="order_no" value="{{ uniqid('ORDER_') }}"&gt;
    
    &lt;button type="submit" class="btn btn-primary"&gt;Pay Now&lt;/button&gt;
&lt;/form&gt;</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">Learn about <a href="/laravel/api-integration" class="text-blue-600 hover:underline">API Integration</a> for direct payment processing in your Laravel application.</p>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "implementation", title: "Implementation" },
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

      <h2 id="payment-service" class="text-2xl font-bold mt-12 mb-4">Enhanced Payment Service</h2>
      <p class="leading-relaxed mb-4">Create an enhanced YagoutPay service with comprehensive payment processing:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// app/Services/YagoutPayService.php
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

            $result = json_decode($response->getBody(), true);
            
            // Log payment attempt
            Log::info('YagoutPay Payment Response', [
                'order_no' => $paymentData['order_no'],
                'status' => $result['status'] ?? 'Unknown'
            ]);

            return $result;
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

    public function validatePayment($response)
    {
        return isset($response['status']) && $response['status'] === 'Success';
    }
}</code></pre>
      </div>

      <h2 id="payment-controller" class="text-2xl font-bold mt-12 mb-4">Payment Controller</h2>
      <p class="leading-relaxed mb-4">Create a comprehensive payment controller:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// app/Http/Controllers/PaymentController.php
&lt;?php

namespace App\\Http\\Controllers;

use App\\Services\\YagoutPayService;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;

class PaymentController extends Controller
{
    protected $yagoutPayService;

    public function __construct(YagoutPayService $yagoutPayService)
    {
        $this->yagoutPayService = $yagoutPayService;
    }

    public function processPayment(Request $request): JsonResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'email' => 'required|email',
            'mobile_no' => 'required|string',
            'customer_name' => 'required|string',
            'order_no' => 'required|string'
        ]);

        $paymentData = [
            'order_no' => $request->order_no,
            'amount' => number_format($request->amount, 2, '.', ''),
            'email_id' => $request->email,
            'mobile_no' => $request->mobile_no,
            'customer_name' => $request->customer_name,
            'bill_address' => $request->bill_address ?? 'N/A',
            'bill_city' => $request->bill_city ?? 'Addis Ababa',
            'bill_state' => $request->bill_state ?? 'Addis Ababa',
            'bill_country' => $request->bill_country ?? 'ET',
            'bill_zip' => $request->bill_zip ?? '1000',
            'wallet_type' => $request->wallet_type ?? 'telebirr',
            'pg_id' => '67ee846571e740418d688c3f',
            'paymode' => 'WA',
            'scheme_id' => '7'
        ];

        try {
            $response = $this->yagoutPayService->processPayment($paymentData);
            
            if ($this->yagoutPayService->validatePayment($response)) {
                return response()->json([
                    'success' => true,
                    'message' => 'Payment processed successfully',
                    'data' => $response
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => $response['message'] ?? 'Payment failed'
                ], 400);
            }
        } catch (\\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Payment processing failed: ' . $e->getMessage()
            ], 500);
        }
    }
}</code></pre>
      </div>

      <h2 id="api-routes" class="text-2xl font-bold mt-12 mb-4">API Routes</h2>
      <p class="leading-relaxed mb-4">Add API routes for payment processing:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// routes/api.php
Route::post('/payment/process', [PaymentController::class, 'processPayment']);
Route::get('/payment/status/{order_no}', [PaymentController::class, 'getPaymentStatus']);</code></pre>
      </div>

      <h2 id="frontend-integration" class="text-2xl font-bold mt-12 mb-4">Frontend Integration</h2>
      <p class="leading-relaxed mb-4">Create a JavaScript integration for seamless payment processing:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;script&gt;
async function processPayment(formData) {
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
      { id: "payment-service", title: "Payment Service" },
      { id: "payment-controller", title: "Payment Controller" },
      { id: "api-routes", title: "API Routes" },
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// app/Services/StaticLinkService.php
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// app/Http/Controllers/StaticLinkController.php
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// routes/api.php
Route::post('/static-links/create', [StaticLinkController::class, 'createLink']);
Route::post('/static-links/qr', [StaticLinkController::class, 'createQR']);</code></pre>
      </div>

      <h2 id="frontend-usage" class="text-2xl font-bold mt-12 mb-4">Frontend Usage</h2>
      <p class="leading-relaxed mb-4">Example of how to use the static link service in your frontend:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;script&gt;
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;?php

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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># YagoutPay Configuration
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// app/Providers/AppServiceProvider.php
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># Production Configuration
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;!-- resources/views/payment/form.blade.php --&gt;
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// app/Http/Controllers/PaymentController.php
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// config/yagoutpay.php
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// tests/Unit/YagoutPayServiceTest.php
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// tests/Feature/PaymentTest.php
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>public function test_invalid_amount()
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># Required packages for YagoutPay integration
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># YagoutPay Configuration
YAGOUT_MERCHANT_ID=202508080001
YAGOUT_ENCRYPTION_KEY=IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=
YAGOUT_API_URL=https://uatcheckout.yagoutpay.com

# For Payment Links
YAGOUT_PAYMENT_LINK_API=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/paymentByLinkResponse
YAGOUT_STATIC_LINK_API=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/staticQRPaymentResponse</code></pre>
      </div>

      <h2 id="create-crypto-util" class="text-2xl font-bold mt-12 mb-4">Create Crypto Utility</h2>
      <p class="leading-relaxed mb-4">Create a crypto utility class for encryption and decryption:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// src/utils/crypto.util.ts
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// src/payments/dto/payment.dto.ts
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># YagoutPay Configuration
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// src/config/yagoutpay.config.ts
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// src/services/yagoutpay.service.ts
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># Production Configuration
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// src/app.ts
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;!-- public/index.html --&gt;
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># Install dependencies
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># .env.test
YAGOUT_MERCHANT_ID=202508080001
YAGOUT_ENCRYPTION_KEY=IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=
YAGOUT_API_URL=https://uatcheckout.yagoutpay.com
NODE_ENV=test</code></pre>
      </div>

      <h2 id="unit-tests" class="text-2xl font-bold mt-12 mb-4">Unit Tests</h2>
      <p class="leading-relaxed mb-4">Create unit tests for your YagoutPay service:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// tests/yagoutpay.service.test.ts
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// tests/payment.integration.test.ts
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>describe('Error Handling', () => {
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
    description: "Implement hosted payments with YagoutPay in Node.js applications.",
    breadcrumbs: [
      { label: "Node.js Integration", href: "/nodejs" },
      { label: "Hosted Payments" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Hosted payments redirect customers to YagoutPay's secure payment page. This method requires no PCI compliance and provides a seamless payment experience.</p>
      </div>

      <h2 id="implementation" class="text-2xl font-bold mt-12 mb-4">Implementation</h2>
      <p class="leading-relaxed mb-4">Create a hosted payment controller for your Node.js application:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// src/controllers/payment.controller.ts
import { Request, Response } from 'express';
import { YagoutPayService } from '../services/yagoutpay.service';
import { PaymentDto } from '../dto/payment.dto';

export class PaymentController {
  private yagoutPayService: YagoutPayService;

  constructor() {
    this.yagoutPayService = new YagoutPayService();
  }

  async initiateHostedPayment(req: Request, res: Response) {
    try {
      const paymentDto: PaymentDto = req.body;
      const result = await this.yagoutPayService.initiatePayment(paymentDto);
      
      res.json({
        success: true,
        data: result,
        redirectUrl: result.redirectUrl
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async handlePaymentCallback(req: Request, res: Response) {
    try {
      const { status, order_no, transaction_id } = req.body;
      
      if (status === 'SUCCESS') {
        // Handle successful payment
        res.json({ success: true, message: 'Payment successful' });
      } else {
        // Handle failed payment
        res.json({ success: false, message: 'Payment failed' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}</code></pre>
      </div>

      <h2 id="routes" class="text-2xl font-bold mt-12 mb-4">Routes</h2>
      <p class="leading-relaxed mb-4">Define routes for hosted payment endpoints:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// src/routes/payment.routes.ts
import express from 'express';
import { PaymentController } from '../controllers/payment.controller';

const router = express.Router();
const paymentController = new PaymentController();

// Hosted payment routes
router.post('/hosted/initiate', paymentController.initiateHostedPayment.bind(paymentController));
router.post('/hosted/callback', paymentController.handlePaymentCallback.bind(paymentController));

export default router;</code></pre>
      </div>

      <h2 id="frontend-integration" class="text-2xl font-bold mt-12 mb-4">Frontend Integration</h2>
      <p class="leading-relaxed mb-4">Create a frontend form to initiate hosted payments:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;!-- public/hosted-payment.html --&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;YagoutPay Hosted Payment&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hosted Payment with YagoutPay&lt;/h1&gt;
    
    &lt;form id="hosted-payment-form"&gt;
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
        
        &lt;button type="submit"&gt;Pay with YagoutPay&lt;/button&gt;
    &lt;/form&gt;
    
    &lt;div id="result"&gt;&lt;/div&gt;
    
    &lt;script&gt;
    document.getElementById('hosted-payment-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            amount: document.getElementById('amount').value,
            customer_name: document.getElementById('customer_name').value,
            email_id: document.getElementById('email_id').value,
            mobile_no: document.getElementById('mobile_no').value,
            order_no: 'HOSTED_' + Date.now()
        };
        
        try {
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
                window.location.href = result.data.redirectUrl;
            } else {
                document.getElementById('result').innerHTML = 'Error: ' + result.error;
            }
        } catch (error) {
            document.getElementById('result').innerHTML = 'Error: ' + error.message;
        }
    });
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After implementing hosted payments, explore <a href="/nodejs/api-integration" class="text-blue-600 hover:underline">API Integration</a> for direct payment processing.</p>
      </div>
    `,
    sections: [
      { id: "implementation", title: "Implementation" },
      { id: "routes", title: "Routes" },
      { id: "frontend-integration", title: "Frontend Integration" },
    ],
  },
  "nodejs/api-integration": {
    title: "Node.js API Integration",
    description: "Direct API integration with YagoutPay in Node.js applications.",
    breadcrumbs: [
      { label: "Node.js Integration", href: "/nodejs" },
      { label: "API Integration" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Direct API integration processes payments without redirecting users to external pages. All payment processing happens within your application with AES-256-CBC encryption.</p>
      </div>

      <h2 id="enhanced-service" class="text-2xl font-bold mt-12 mb-4">Enhanced YagoutPay Service</h2>
      <p class="leading-relaxed mb-4">Create an enhanced service for direct API payments:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// src/services/yagoutpay.service.ts
import axios from 'axios';
import { CryptoUtil } from '../utils/crypto.util';
import { yagoutPayConfig } from '../config/yagoutpay.config';
import { PaymentDto } from '../dto/payment.dto';

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

  async initiateDirectPayment(dto: PaymentDto) {
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

    try {
      const response = await axios.post(
        \`\${this.apiUrl}/ms-transaction-core-1-0/sdk/initiateTransaction\`,
        { request: encryptedData },
        {
          headers: {
            'Content-Type': 'application/json',
            'me_id': this.merchantId
          }
        }
      );

      return this.processYagoutPayResponse(response.data);
    } catch (error) {
      throw new Error(\`Payment processing failed: \${error.message}\`);
    }
  }

  private processYagoutPayResponse(response: any) {
    if (response.status === 'SUCCESS') {
      return {
        success: true,
        paymentUrl: response.responseData.payment_url,
        orderId: response.responseData.order_id,
        transactionId: response.responseData.transaction_id
      };
    } else {
      throw new Error(\`Payment failed: \${response.userMessage}\`);
    }
  }
}</code></pre>
      </div>

      <h2 id="api-controller" class="text-2xl font-bold mt-12 mb-4">API Controller</h2>
      <p class="leading-relaxed mb-4">Create API endpoints for direct payment processing:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// src/controllers/api-payment.controller.ts
import { Request, Response } from 'express';
import { YagoutPayService } from '../services/yagoutpay.service';
import { PaymentDto } from '../dto/payment.dto';

export class ApiPaymentController {
  private yagoutPayService: YagoutPayService;

  constructor() {
    this.yagoutPayService = new YagoutPayService();
  }

  async processDirectPayment(req: Request, res: Response) {
    try {
      const paymentDto: PaymentDto = req.body;
      const result = await this.yagoutPayService.initiateDirectPayment(paymentDto);
      
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
      res.status(500).json({ error: error.message });
    }
  }
}</code></pre>
      </div>

      <h2 id="api-routes" class="text-2xl font-bold mt-12 mb-4">API Routes</h2>
      <p class="leading-relaxed mb-4">Define API routes for direct payment processing:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// src/routes/api-payment.routes.ts
import express from 'express';
import { ApiPaymentController } from '../controllers/api-payment.controller';

const router = express.Router();
const apiPaymentController = new ApiPaymentController();

// Direct API payment routes
router.post('/api/initiate', apiPaymentController.processDirectPayment.bind(apiPaymentController));
router.get('/api/status/:orderId', apiPaymentController.getPaymentStatus.bind(apiPaymentController));

export default router;</code></pre>
      </div>

      <h2 id="frontend-js" class="text-2xl font-bold mt-12 mb-4">Frontend JavaScript</h2>
      <p class="leading-relaxed mb-4">Create a frontend form for direct API payments:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;!-- public/api-payment.html --&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;YagoutPay API Payment&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Direct API Payment with YagoutPay&lt;/h1&gt;
    
    &lt;form id="api-payment-form"&gt;
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
        
        &lt;button type="submit"&gt;Process Payment&lt;/button&gt;
    &lt;/form&gt;
    
    &lt;div id="result"&gt;&lt;/div&gt;
    
    &lt;script&gt;
    document.getElementById('api-payment-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            amount: document.getElementById('amount').value,
            customer_name: document.getElementById('customer_name').value,
            email_id: document.getElementById('email_id').value,
            mobile_no: document.getElementById('mobile_no').value,
            order_no: 'API_' + Date.now()
        };
        
        try {
            const response = await fetch('/api/payments/api/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                document.getElementById('result').innerHTML = 
                    '&lt;div style="color: green;"&gt;Payment processed successfully!&lt;/div&gt;' +
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
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After implementing API integration, explore <a href="/nodejs/payment-links" class="text-blue-600 hover:underline">Payment Links</a> for creating shareable payment links.</p>
      </div>
    `,
    sections: [
      { id: "enhanced-service", title: "Enhanced Service" },
      { id: "api-controller", title: "API Controller" },
      { id: "api-routes", title: "API Routes" },
      { id: "frontend-js", title: "Frontend JavaScript" },
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// src/services/payment-link.service.ts
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// src/controllers/payment-link.controller.ts
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// src/routes/payment-link.routes.ts
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;!-- public/payment-links.html --&gt;
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;dependencies&gt;
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># Required JAR files
gson-2.10.1.jar - JSON processing
mysql-connector-j-9.3.0.jar - MySQL connectivity
jakarta.mail-2.0.1.jar - Email functionality
servlet-api.jar - Servlet support
angus-activation-2.0.1.jar - Activation framework
jakarta.activation-api-2.1.2.jar - Jakarta activation</code></pre>
      </div>

      <h2 id="project-structure" class="text-2xl font-bold mt-12 mb-4">Project Structure</h2>
      <p class="leading-relaxed mb-4">Create the following directory structure for your Java web application:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>src/
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// YagoutPayService.java
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Encryption Configuration
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>public JsonObject callYagoutPayAPI(JsonObject encryptedData) throws Exception {
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Production Configuration
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// PaymentServlet.java
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>&lt;!-- checkout.jsp --&gt;
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Test Configuration
private static final String MERCHANT_ID = "202508080001";
private static final String ENCRYPTION_KEY = "IG3CNW5uNrUO2mU2htUOWb9rgXCF7XMAXmL63d7wNZo=";
private static final String API_URL = "https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/apiRedirection/apiIntegration";</code></pre>
      </div>

      <h2 id="unit-tests" class="text-2xl font-bold mt-12 mb-4">Unit Tests</h2>
      <p class="leading-relaxed mb-4">Create unit tests for your YagoutPay service:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// YagoutPayServiceTest.java
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// PaymentIntegrationTest.java
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
    description: "Implement hosted payments with YagoutPay in Java applications.",
    breadcrumbs: [
      { label: "Java Integration", href: "/java" },
      { label: "Hosted Payments" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Hosted payments redirect customers to YagoutPay's secure payment page. This method requires no PCI compliance and provides a seamless payment experience.</p>
      </div>

      <h2 id="hosted-payment-servlet" class="text-2xl font-bold mt-12 mb-4">Hosted Payment Servlet</h2>
      <p class="leading-relaxed mb-4">Create a servlet for hosted payment processing:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// HostedPaymentServlet.java
@WebServlet("/HostedPaymentServlet")
public class HostedPaymentServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            YagoutPayService yagoutPayService = new YagoutPayService();
            
            // Build payment data
            JsonObject paymentData = yagoutPayService.buildPaymentData(request);
            
            // Encrypt data
            String encryptedData = yagoutPayService.encryptData(paymentData.toString());
            
            // Create request for hosted payment
            JsonObject hostedRequest = new JsonObject();
            hostedRequest.addProperty("merchantId", "202508080001");
            hostedRequest.addProperty("merchantRequest", encryptedData);
            
            // Redirect to YagoutPay hosted page
            String redirectUrl = "https://uatcheckout.yagoutpay.com/checkout?" + 
                "merchantId=" + URLEncoder.encode("202508080001", "UTF-8") +
                "&merchantRequest=" + URLEncoder.encode(encryptedData, "UTF-8");
            
            response.sendRedirect(redirectUrl);
            
        } catch (Exception e) {
            request.setAttribute("error", "Hosted payment initiation failed: " + e.getMessage());
            request.getRequestDispatcher("checkout.jsp").forward(request, response);
        }
    }
}</code></pre>
      </div>

      <h2 id="callback-handler" class="text-2xl font-bold mt-12 mb-4">Callback Handler</h2>
      <p class="leading-relaxed mb-4">Create a callback servlet to handle payment responses:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// PaymentCallbackServlet.java
@WebServlet("/PaymentCallbackServlet")
public class PaymentCallbackServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String status = request.getParameter("status");
        String orderNo = request.getParameter("order_no");
        String transactionId = request.getParameter("transaction_id");
        
        if ("SUCCESS".equals(status)) {
            // Handle successful payment
            request.setAttribute("message", "Payment successful!");
            request.setAttribute("orderNo", orderNo);
            request.setAttribute("transactionId", transactionId);
            request.getRequestDispatcher("success.jsp").forward(request, response);
        } else {
            // Handle failed payment
            request.setAttribute("error", "Payment failed!");
            request.getRequestDispatcher("failure.jsp").forward(request, response);
        }
    }
}</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After implementing hosted payments, explore <a href="/java/api-integration" class="text-blue-600 hover:underline">API Integration</a> for direct payment processing.</p>
      </div>
    `,
    sections: [
      { id: "hosted-payment-servlet", title: "Hosted Payment Servlet" },
      { id: "callback-handler", title: "Callback Handler" },
    ],
  },
  "java/api-integration": {
    title: "Java API Integration",
    description: "Direct API integration with YagoutPay in Java applications.",
    breadcrumbs: [
      { label: "Java Integration", href: "/java" },
      { label: "API Integration" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Direct API integration processes payments without redirecting users to external pages. All payment processing happens within your application with AES-256-CBC encryption.</p>
      </div>

      <h2 id="enhanced-service" class="text-2xl font-bold mt-12 mb-4">Enhanced YagoutPay Service</h2>
      <p class="leading-relaxed mb-4">Create an enhanced service for direct API payments:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Enhanced YagoutPayService.java
public class YagoutPayService {
    
    public JsonObject initiateDirectPayment(HttpServletRequest request) throws Exception {
        // Build payment data
        JsonObject paymentData = buildPaymentData(request);
        
        // Encrypt data
        String encryptedData = encryptData(paymentData.toString());
        
        // Create API request
        JsonObject apiRequest = new JsonObject();
        apiRequest.addProperty("request", encryptedData);
        
        // Call YagoutPay API
        return callYagoutPayAPI(apiRequest);
    }
    
    public JsonObject callYagoutPayAPI(JsonObject request) throws Exception {
        URL url = new URL(API_URL);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setDoOutput(true);
        
        // Send request
        String jsonInputString = gson.toJson(request);
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
    }
}</code></pre>
      </div>

      <h2 id="api-payment-servlet" class="text-2xl font-bold mt-12 mb-4">API Payment Servlet</h2>
      <p class="leading-relaxed mb-4">Create a servlet for direct API payment processing:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// ApiPaymentServlet.java
@WebServlet("/ApiPaymentServlet")
public class ApiPaymentServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            YagoutPayService yagoutPayService = new YagoutPayService();
            
            // Process direct payment
            JsonObject result = yagoutPayService.initiateDirectPayment(request);
            
            // Handle response
            if (result.has("status") && "Success".equals(result.get("status").getAsString())) {
                request.setAttribute("message", "Payment processed successfully!");
                request.setAttribute("transactionId", result.get("transaction_id").getAsString());
                request.getRequestDispatcher("success.jsp").forward(request, response);
            } else {
                request.setAttribute("error", "Payment failed: " + result.get("message").getAsString());
                request.getRequestDispatcher("failure.jsp").forward(request, response);
            }
            
        } catch (Exception e) {
            request.setAttribute("error", "Payment processing failed: " + e.getMessage());
            request.getRequestDispatcher("failure.jsp").forward(request, response);
        }
    }
}</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">After implementing API integration, explore <a href="/java/payment-links" class="text-blue-600 hover:underline">Payment Links</a> for creating shareable payment links.</p>
      </div>
    `,
    sections: [
      { id: "enhanced-service", title: "Enhanced Service" },
      { id: "api-payment-servlet", title: "API Payment Servlet" },
    ],
  },
  "java/payment-links": {
    title: "Java Payment Links",
    description: "Create static payment links with YagoutPay in Java applications.",
    breadcrumbs: [
      { label: "Java Integration", href: "/java" },
      { label: "Payment Links" },
    ],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">Payment links allow you to create shareable payment URLs and QR codes for easy payment collection. Support static payment links with YagoutPay.</p>
      </div>

      <h2 id="static-link-service" class="text-2xl font-bold mt-12 mb-4">Static Link Service</h2>
      <p class="leading-relaxed mb-4">Create a service for generating static payment links:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// StaticLinkService.java
public class StaticLinkService {
    private static final String STATIC_LINK_URL = "https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/staticQRPaymentResponse";
    private static final String PAYMENT_LINK_URL = "https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0/sdk/paymentByLinkResponse";
    
    public JsonObject createStaticLink(JsonObject paymentData) throws Exception {
        // Encrypt payment data
        String encryptedData = encryptData(gson.toJson(paymentData));
        
        // Create request with encrypted data
        JsonObject request = new JsonObject();
        request.addProperty("request", encryptedData);
        
        // Call API with me_id header
        return callAPI(STATIC_LINK_URL, request);
    }
    
    public JsonObject createPaymentLink(JsonObject paymentData) throws Exception {
        String encryptedData = encryptData(gson.toJson(paymentData));
        
        JsonObject request = new JsonObject();
        request.addProperty("request", encryptedData);
        
        return callAPI(PAYMENT_LINK_URL, request);
    }
    
    private JsonObject callAPI(String url, JsonObject request) throws Exception {
        HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("me_id", "202508080001"); // Required header
        
        connection.setDoOutput(true);
        String jsonInputString = gson.toJson(request);
        
        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }
        
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
    }
}</code></pre>
      </div>

      <h2 id="payment-link-servlet" class="text-2xl font-bold mt-12 mb-4">Payment Link Servlet</h2>
      <p class="leading-relaxed mb-4">Create a servlet for payment link generation:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// PaymentLinkServlet.java
@WebServlet("/PaymentLinkServlet")
public class PaymentLinkServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            StaticLinkService staticLinkService = new StaticLinkService();
            
            // Build payment link data
            JsonObject paymentData = buildPaymentLinkData(request);
            
            // Create static link
            JsonObject result = staticLinkService.createStaticLink(paymentData);
            
            if (result.has("status") && "SUCCESS".equals(result.get("status").getAsString())) {
                request.setAttribute("paymentUrl", result.get("payment_url").getAsString());
                request.setAttribute("qrCode", result.get("qr_code").getAsString());
                request.getRequestDispatcher("payment-link-success.jsp").forward(request, response);
            } else {
                request.setAttribute("error", "Payment link creation failed");
                request.getRequestDispatcher("payment-link-error.jsp").forward(request, response);
            }
            
        } catch (Exception e) {
            request.setAttribute("error", "Payment link creation failed: " + e.getMessage());
            request.getRequestDispatcher("payment-link-error.jsp").forward(request, response);
        }
    }
    
    private JsonObject buildPaymentLinkData(HttpServletRequest request) {
        JsonObject paymentData = new JsonObject();
        paymentData.addProperty("req_user_id", "yagou381");
        paymentData.addProperty("me_id", "202508080001");
        paymentData.addProperty("amount", request.getParameter("amount"));
        paymentData.addProperty("customer_email", request.getParameter("customer_email"));
        paymentData.addProperty("mobile_no", request.getParameter("mobile_no"));
        paymentData.addProperty("expiry_date", request.getParameter("expiry_date"));
        paymentData.addProperty("order_id", "LINK_" + System.currentTimeMillis());
        paymentData.addProperty("first_name", request.getParameter("first_name"));
        paymentData.addProperty("last_name", request.getParameter("last_name"));
        paymentData.addProperty("product", request.getParameter("product"));
        paymentData.addProperty("dial_code", "+251");
        paymentData.addProperty("failure_url", "http://localhost:8080/failure");
        paymentData.addProperty("success_url", "http://localhost:8080/success");
        paymentData.addProperty("country", "ETH");
        paymentData.addProperty("currency", "ETB");
        
        return paymentData;
    }
}</code></pre>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">INTEGRATION COMPLETE</h3>
        <p class="text-sm text-blue-800">Your YagoutPay Java integration is now complete! Explore <a href="/java" class="text-blue-600 hover:underline">all Java integration methods</a> for production deployment.</p>
      </div>
    `,
    sections: [
      { id: "static-link-service", title: "Static Link Service" },
      { id: "payment-link-servlet", title: "Payment Link Servlet" },
    ],
  },
  "wordpress": {
    title: "WordPress Integration",
    description: "Complete YagoutPay WordPress plugin integration guide with three payment methods.",
    breadcrumbs: [{ label: "WordPress Integration" }],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay WordPress plugin provides three different payment integration methods: Hosted Checkout, Direct API, and Static Forms. Perfect for WordPress websites with easy shortcode implementation.</p>
      </div>
      
      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">YagoutPay WordPress integration offers flexible payment solutions with AES-256-CBC encryption, comprehensive error handling, and support for both hosted and direct payment methods using simple shortcodes.</p>
      
      <h2 id="getting-started" class="text-2xl font-bold mt-12 mb-4">Getting Started</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><a href="/wordpress/installation" class="text-primary hover:underline">Install WordPress Plugin</a></li>
        <li><a href="/wordpress/configuration" class="text-primary hover:underline">Configure credentials</a></li>
        <li><a href="/wordpress/hosted-payments" class="text-primary hover:underline">Choose integration method</a></li>
      </ol>

      <h2 id="integration-methods" class="text-2xl font-bold mt-12 mb-4">Integration Methods</h2>
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Hosted Payments</h3>
          <p class="text-sm text-gray-700 mb-3">Redirect customers to YagoutPay's secure payment page using simple shortcodes.</p>
          <a href="/wordpress/hosted-payments" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">API Integration</h3>
          <p class="text-sm text-gray-700 mb-3">Direct API payment processing with custom payment forms.</p>
          <a href="/wordpress/api-integration" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Static Forms</h3>
          <p class="text-sm text-gray-700 mb-3">Custom payment forms with full design control and advanced features.</p>
          <a href="/wordpress/static-forms" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># Check if required extensions are installed
php -m | grep -E "(openssl|curl|json)"

# Expected output:
openssl
curl
json</code></pre>
      </div>

      <h2 id="upload-plugin" class="text-2xl font-bold mt-12 mb-4">Upload Plugin Files</h2>
      <p class="leading-relaxed mb-4">Upload the plugin to your WordPress plugins directory:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># Upload to WordPress plugins directory
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// In WordPress Admin
1. Go to Plugins → Installed Plugins
2. Find "YagoutPay Payment Gateway"
3. Click "Activate"</code></pre>
      </div>

      <h2 id="plugin-structure" class="text-2xl font-bold mt-12 mb-4">Plugin Structure</h2>
      <p class="leading-relaxed mb-4">The plugin follows WordPress coding standards with proper organization:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>yagoutpay-standalone/
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Go to Settings → YagoutPay
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Environment Configuration
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Plugin Configuration Options
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Available Shortcodes
[yagoutpay_hosted] - Hosted payment shortcode
[yagoutpay_api] - Direct API payment shortcode
[yagoutpay_test] - Test credentials shortcode
[yagoutpay_debug] - Debug information shortcode</code></pre>
      </div>

      <h2 id="production-config" class="text-2xl font-bold mt-12 mb-4">Production Configuration</h2>
      <p class="leading-relaxed mb-4">For production deployment:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Production Checklist
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Simple hosted payment
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Simple API payment
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Common Parameters
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Test credentials shortcode
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Test Configuration
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Enable WordPress Debug Logging
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Basic hosted payment
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Required Parameters
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>1. User clicks payment button
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Basic API payment
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Required Parameters
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Generated Form Fields
- Customer Information (Name, Email, Mobile)
- Card Details (Number, Expiry, CVV, Name on Card)
- Billing Address (Optional)
- Payment Button
- Security Note</code></pre>
      </div>

      <h2 id="encryption-security" class="text-2xl font-bold mt-12 mb-4">Encryption & Security</h2>
      <p class="leading-relaxed mb-4">API integration uses AES-256-CBC encryption:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Encryption Method
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Basic static form
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Form Features
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// CSS Customization
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Validation Features
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
    description: "Complete YagoutPay WooCommerce plugin integration guide with native payment gateway support.",
    breadcrumbs: [{ label: "WooCommerce Integration" }],
    html: `
      <div class="flex items-start gap-3 mb-6">
        <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="leading-relaxed">YagoutPay WooCommerce plugin provides seamless payment processing integration with WooCommerce stores using YagoutPay's Direct API. It extends WooCommerce's payment gateway system to provide secure credit card processing with automatic order management.</p>
      </div>
      
      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">YagoutPay WooCommerce integration offers native payment gateway support with AES-256-CBC encryption, comprehensive error handling, and support for both test and live environments with automatic order management.</p>
      
      <h2 id="getting-started" class="text-2xl font-bold mt-12 mb-4">Getting Started</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><a href="/woocommerce/installation" class="text-primary hover:underline">Install WooCommerce Plugin</a></li>
        <li><a href="/woocommerce/configuration" class="text-primary hover:underline">Configure payment gateway</a></li>
        <li><a href="/woocommerce/payment-gateway" class="text-primary hover:underline">Set up payment processing</a></li>
      </ol>

      <h2 id="key-features" class="text-2xl font-bold mt-12 mb-4">Key Features</h2>
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">WooCommerce Integration</h3>
          <p class="text-sm text-gray-700 mb-3">Native payment gateway that integrates seamlessly with WooCommerce's checkout system.</p>
          <a href="/woocommerce/payment-gateway" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Direct API Processing</h3>
          <p class="text-sm text-gray-700 mb-3">Secure card processing with AES-256-CBC encryption for maximum security.</p>
          <a href="/woocommerce/payment-gateway" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Order Management</h3>
          <p class="text-sm text-gray-700 mb-3">Automatic order status updates and payment processing integration.</p>
          <a href="/woocommerce/order-management" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-2">Webhook Support</h3>
          <p class="text-sm text-gray-700 mb-3">Real-time payment notifications and automatic order updates.</p>
          <a href="/woocommerce/webhook-support" class="text-primary hover:underline text-sm">Learn more →</a>
        </div>
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
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># Check if required extensions are installed
php -m | grep -E "(openssl|curl|json)"

# Expected output:
openssl
curl
json</code></pre>
      </div>

      <h2 id="upload-plugin" class="text-2xl font-bold mt-12 mb-4">Upload Plugin Files</h2>
      <p class="leading-relaxed mb-4">Upload the plugin to your WordPress plugins directory:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code># Upload to WordPress plugins directory
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// In WordPress Admin
1. Go to Plugins → Installed Plugins
2. Find "YagoutPay Payment Gateway for WooCommerce"
3. Click "Activate"</code></pre>
      </div>

      <h2 id="configure-gateway" class="text-2xl font-bold mt-12 mb-4">Configure Gateway</h2>
      <p class="leading-relaxed mb-4">Configure the payment gateway in WooCommerce:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// In WooCommerce Admin
1. Go to WooCommerce → Settings → Payments
2. Find "YagoutPay" and click "Set up"
3. Enable the gateway and configure credentials</code></pre>
      </div>

      <h2 id="plugin-structure" class="text-2xl font-bold mt-12 mb-4">Plugin Structure</h2>
      <p class="leading-relaxed mb-4">The plugin follows WooCommerce coding standards with proper organization:</p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>yagoutpay-woocommerce/
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Go to WooCommerce → Settings → Payments
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Gateway Configuration Options
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Environment Configuration
Environment: Test (for development) / Live (for production)
Test Base URL: https://uatcheckout.yagoutpay.com
Live Base URL: https://checkout.yagoutpay.com

// Webhook Configuration
Webhook URL: https://yoursite.com/yagoutpay-webhook/
Webhook Secret: your_webhook_secret_key</code></pre>
      </div>

      <h2 id="order-management" class="text-2xl font-bold mt-12 mb-4">Order Management</h2>
      <p class="leading-relaxed mb-4">Configure automatic order management:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Order Management Features
✅ Automatic order status updates
✅ Payment completion handling
✅ Order note management
✅ Transaction ID tracking
✅ Card data capture (for reference)
✅ Error handling and logging</code></pre>
      </div>

      <h2 id="production-config" class="text-2xl font-bold mt-12 mb-4">Production Configuration</h2>
      <p class="leading-relaxed mb-4">For production deployment:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Production Checklist
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Payment Gateway Features
✅ Native WooCommerce integration
✅ Secure card processing
✅ Automatic order management
✅ Real-time payment notifications
✅ Webhook support
✅ Multi-environment support</code></pre>
      </div>

      <h2 id="checkout-process" class="text-2xl font-bold mt-12 mb-4">Checkout Process</h2>
      <p class="leading-relaxed mb-4">How the payment process works:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>1. Customer adds products to cart
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Card Form Fields
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Test Configuration
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Enable WordPress Debug Logging
// In wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

// Check debug logs
// In /wp-content/debug.log</code></pre>
      </div>

      <h2 id="test-payments" class="text-2xl font-bold mt-12 mb-4">Test Payments</h2>
      <p class="leading-relaxed mb-4">Test different payment scenarios:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Test Scenarios
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Gateway Class Structure
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Payment Processing Flow
1. Customer selects YagoutPay payment method
2. Customer enters card details
3. Card data is validated and encrypted
4. Payment request is sent to YagoutPay API
5. Response is processed and order is updated
6. Customer receives confirmation</code></pre>
      </div>

      <h2 id="card-form" class="text-2xl font-bold mt-12 mb-4">Card Form</h2>
      <p class="leading-relaxed mb-4">The gateway includes a secure card details form:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Card Form Fields
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Encryption Method
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Order Status Updates
✅ Payment completion handling
✅ Order status updates
✅ Order note management
✅ Transaction ID tracking
✅ Card data capture (for reference)
✅ Error handling and logging</code></pre>
      </div>

      <h2 id="order-tracking" class="text-2xl font-bold mt-12 mb-4">Order Tracking</h2>
      <p class="leading-relaxed mb-4">Comprehensive order tracking and management:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Order Tracking Features
- Transaction ID tracking
- Payment status monitoring
- Order note management
- Card data capture (masked)
- Error logging and debugging
- Webhook integration</code></pre>
      </div>

      <h2 id="card-data-capture" class="text-2xl font-bold mt-12 mb-4">Card Data Capture</h2>
      <p class="leading-relaxed mb-4">Card data is captured for reference and order management:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Card Data Capture
- Masked card number (last 4 digits)
- Card expiry date
- Cardholder name
- Transaction ID
- Payment status
- Order notes</code></pre>
      </div>

      <h2 id="error-handling" class="text-2xl font-bold mt-12 mb-4">Error Handling</h2>
      <p class="leading-relaxed mb-4">Comprehensive error handling and logging:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Error Handling Features
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

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Webhook Endpoint
URL: https://yoursite.com/yagoutpay-webhook/
Method: POST
Content-Type: application/json
Headers: x-yagoutpay-signature</code></pre>
      </div>

      <h2 id="webhook-processing" class="text-2xl font-bold mt-12 mb-4">Webhook Processing</h2>
      <p class="leading-relaxed mb-4">How webhook processing works:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Webhook Processing Flow
1. YagoutPay sends payment notification
2. Webhook endpoint receives notification
3. Signature is verified for security
4. Payment status is processed
5. Order is updated automatically
6. Customer is notified of status change</code></pre>
      </div>

      <h2 id="webhook-security" class="text-2xl font-bold mt-12 mb-4">Webhook Security</h2>
      <p class="leading-relaxed mb-4">Webhook security features:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Security Features
✅ Signature verification
✅ Webhook secret validation
✅ Request validation
✅ Error handling and logging
✅ Rate limiting protection
✅ SSL/TLS encryption</code></pre>
      </div>

      <h2 id="webhook-events" class="text-2xl font-bold mt-12 mb-4">Webhook Events</h2>
      <p class="leading-relaxed mb-4">Supported webhook events:</p>

      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
        <pre class="text-sm"><code>// Webhook Events
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

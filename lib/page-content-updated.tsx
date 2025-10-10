export interface PageContent {
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  html: string;
  sections?: { id: string; title: string }[];
}

const pageContents: Record<string, PageContent> = {
  "laravel/payment-widget": {
    title: "Laravel Payment Widget",
    description: "Generate static payment links and QR codes with YagoutPay Payment Link API in Laravel.",
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
        <p class="leading-relaxed">Payment widgets allow you to generate static payment links and QR codes for quick payments using YagoutPay's Payment Link API. These links can be shared via SMS, email, or other channels.</p>
      </div>

      <h2 id="overview" class="text-2xl font-bold mt-12 mb-4">Overview</h2>
      <p class="leading-relaxed mb-4">The Payment Widget API provides two main functionalities: Payment Link generation and Static QR Code generation. Both use the same encryption method and API structure, with different endpoints for each service.</p>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-4">Payment Widget Flow</h3>
        <ol class="text-sm text-blue-800 list-decimal pl-6 space-y-2">
          <li><strong>Data Preparation:</strong> Collect payment data and build JSON payload</li>
          <li><strong>Encryption:</strong> Encrypt JSON payload using AES-256-CBC</li>
          <li><strong>API Call:</strong> Send encrypted data to YagoutPay Payment Link API</li>
          <li><strong>Response Handling:</strong> Decrypt response to get payment link or QR code</li>
          <li><strong>Link Sharing:</strong> Share generated link via SMS, email, or other channels</li>
        </ol>
      </div>

      <h2 id="encryption-service" class="text-2xl font-bold mt-12 mb-4">Encryption Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle AES-256-CBC encryption for payment widgets:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Encryption Service with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// app/Services/YagoutPayWidgetEncryptionService.php
&lt;?php

namespace App\\Services;

class YagoutPayWidgetEncryptionService
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

    // AES-256-CBC Encryption for Payment Widgets
    public function encrypt($data)
    {
        $jsonString = json_encode($data);
        $encrypted = openssl_encrypt(
            $jsonString,
            'AES-256-CBC',
            base64_decode($this->encryptionKey),
            OPENSSL_RAW_DATA,
            $this->iv
        );
        return base64_encode($encrypted);
    }

    // AES-256-CBC Decryption for Response Handling
    public function decrypt($encryptedData)
    {
        $decrypted = openssl_decrypt(
            base64_decode($encryptedData),
            'AES-256-CBC',
            base64_decode($this->encryptionKey),
            OPENSSL_RAW_DATA,
            $this->iv
        );
        return json_decode($decrypted, true);
    }
}</code></pre>
      </div>

      <h2 id="payment-link-service" class="text-2xl font-bold mt-12 mb-4">Payment Link Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle payment link generation:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Payment Link Service with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// app/Services/YagoutPayLinkService.php
&lt;?php

namespace App\\Services;

use Illuminate\\Support\\Facades\\Http;
use Illuminate\\Support\\Facades\\Log;

class YagoutPayLinkService
{
    private $encryptionService;
    private $merchantId;
    private $apiUrl;

    public function __construct(YagoutPayWidgetEncryptionService $encryptionService)
    {
        $this->encryptionService = $encryptionService;
        $this->merchantId = config('yagoutpay.merchant_id');
        $this->apiUrl = config('yagoutpay.api_url');
    }

    // Generate Payment Link
    public function generatePaymentLink($paymentData)
    {
        try {
            // Build payment link payload
            $payload = $this->buildPaymentLinkPayload($paymentData);
            
            // Encrypt the payload
            $encryptedData = $this->encryptionService->encrypt($payload);
            
            // Send to YagoutPay API
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'me_id' => $this->merchantId
            ])->post($this->apiUrl . '/sdk/paymentByLinkResponse', [
                'request' => $encryptedData
            ]);

            if ($response->successful()) {
                $result = $response->json();
                return $this->encryptionService->decrypt($result['response']);
            }

            throw new \\Exception('Payment link generation failed: ' . $response->body());
        } catch (\\Exception $e) {
            Log::error('Payment Link Generation Error: ' . $e->getMessage());
            throw $e;
        }
    }

    // Build Payment Link Payload
    private function buildPaymentLinkPayload($data)
    {
        return [
            'req_user_id' => $data['req_user_id'] ?? 'yagou381',
            'me_id' => $this->merchantId,
            'amount' => $data['amount'],
            'customer_email' => $data['customer_email'] ?? '',
            'mobile_no' => $data['mobile_no'],
            'expiry_date' => $data['expiry_date'],
            'media_type' => $data['media_type'] ?? ['API'],
            'order_id' => $data['order_id'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'product' => $data['product'],
            'dial_code' => $data['dial_code'] ?? '+251',
            'failure_url' => $data['failure_url'],
            'success_url' => $data['success_url'],
            'country' => $data['country'] ?? 'ETH',
            'currency' => $data['currency'] ?? 'ETB'
        ];
    }
}</code></pre>
      </div>

      <h2 id="static-qr-service" class="text-2xl font-bold mt-12 mb-4">Static QR Code Service</h2>
      <p class="leading-relaxed mb-4">Create a service to handle static QR code generation:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Static QR Service with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// app/Services/YagoutPayStaticQRService.php
&lt;?php

namespace App\\Services;

use Illuminate\\Support\\Facades\\Http;
use Illuminate\\Support\\Facades\\Log;

class YagoutPayStaticQRService
{
    private $encryptionService;
    private $merchantId;
    private $apiUrl;

    public function __construct(YagoutPayWidgetEncryptionService $encryptionService)
    {
        $this->encryptionService = $encryptionService;
        $this->merchantId = config('yagoutpay.merchant_id');
        $this->apiUrl = config('yagoutpay.api_url');
    }

    // Generate Static QR Code
    public function generateStaticQR($qrData)
    {
        try {
            // Build static QR payload
            $payload = $this->buildStaticQRPayload($qrData);
            
            // Encrypt the payload
            $encryptedData = $this->encryptionService->encrypt($payload);
            
            // Send to YagoutPay API
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'me_id' => $this->merchantId
            ])->post($this->apiUrl . '/sdk/staticQRPaymentResponse', [
                'request' => $encryptedData
            ]);

            if ($response->successful()) {
                $result = $response->json();
                return $this->encryptionService->decrypt($result['response']);
            }

            throw new \\Exception('Static QR generation failed: ' . $response->body());
        } catch (\\Exception $e) {
            Log::error('Static QR Generation Error: ' . $e->getMessage());
            throw $e;
        }
    }

    // Build Static QR Payload
    private function buildStaticQRPayload($data)
    {
        return [
            'ag_id' => $data['ag_id'] ?? '',
            'ag_code' => $data['ag_code'] ?? '',
            'ag_name' => $data['ag_name'] ?? '',
            'req_user_id' => $data['req_user_id'] ?? 'yagou381',
            'me_code' => $this->merchantId,
            'me_name' => $data['me_name'] ?? '',
            'qr_code_id' => $data['qr_code_id'] ?? '',
            'brandName' => $data['brandName'] ?? 'Ahmed',
            'qr_name' => $data['qr_name'] ?? '',
            'status' => $data['status'] ?? 'ACTIVE',
            'storeName' => $data['storeName'] ?? 'YP',
            'store_id' => $data['store_id'] ?? '',
            'token' => $data['token'] ?? '',
            'qr_transaction_amount' => $data['qr_transaction_amount'] ?? '1',
            'logo' => $data['logo'] ?? '',
            'store_email' => $data['store_email'] ?? '',
            'mobile_no' => $data['mobile_no'] ?? '',
            'udf' => $data['udf'] ?? '',
            'udfmerchant' => $data['udfmerchant'] ?? '',
            'file_name' => $data['file_name'] ?? '',
            'from_date' => $data['from_date'] ?? '',
            'to_date' => $data['to_date'] ?? '',
            'file_extn' => $data['file_extn'] ?? '',
            'file_url' => $data['file_url'] ?? '',
            'file' => $data['file'] ?? '',
            'original_file_name' => $data['original_file_name'] ?? '',
            'successURL' => $data['successURL'] ?? '',
            'failureURL' => $data['failureURL'] ?? '',
            'addAll' => $data['addAll'] ?? '',
            'source' => $data['source'] ?? ''
        ];
    }
}</code></pre>
      </div>

      <h2 id="payment-widget-controller" class="text-2xl font-bold mt-12 mb-4">Payment Widget Controller</h2>
      <p class="leading-relaxed mb-4">Create a controller to handle payment widget requests:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Payment Widget Controller with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// app/Http/Controllers/PaymentWidgetController.php
&lt;?php

namespace App\\Http\\Controllers;

use App\\Services\\YagoutPayLinkService;
use App\\Services\\YagoutPayStaticQRService;
use Illuminate\\Http\\Request;

class PaymentWidgetController extends Controller
{
    protected $linkService;
    protected $qrService;

    public function __construct(YagoutPayLinkService $linkService, YagoutPayStaticQRService $qrService)
    {
        $this->linkService = $linkService;
        $this->qrService = $qrService;
    }

    // Generate Payment Link
    public function generatePaymentLink(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'customer_email' => 'required|email',
            'mobile_no' => 'required|string',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'product' => 'required|string',
            'expiry_date' => 'required|date|after:today'
        ]);

        $paymentData = [
            'req_user_id' => auth()->id() ?? 'yagou381',
            'amount' => $request->amount,
            'customer_email' => $request->customer_email,
            'mobile_no' => $request->mobile_no,
            'expiry_date' => $request->expiry_date,
            'media_type' => ['API'],
            'order_id' => 'ORDER_LINK_' . time(),
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'product' => $request->product,
            'dial_code' => '+251',
            'failure_url' => route('payment.failure'),
            'success_url' => route('payment.success'),
            'country' => 'ETH',
            'currency' => 'ETB'
        ];

        try {
            $result = $this->linkService->generatePaymentLink($paymentData);
            return response()->json([
                'success' => true,
                'payment_link' => $result['payment_link'] ?? null,
                'qr_code' => $result['qr_code'] ?? null,
                'order_id' => $result['order_id'] ?? null
            ]);
        } catch (\\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Payment link generation failed: ' . $e->getMessage()
            ], 500);
        }
    }

    // Generate Static QR Code
    public function generateStaticQR(Request $request)
    {
        $request->validate([
            'qr_transaction_amount' => 'required|numeric|min:0.01',
            'brandName' => 'required|string',
            'storeName' => 'required|string'
        ]);

        $qrData = [
            'req_user_id' => auth()->id() ?? 'yagou381',
            'qr_transaction_amount' => $request->qr_transaction_amount,
            'brandName' => $request->brandName,
            'storeName' => $request->storeName,
            'status' => 'ACTIVE',
            'qr_name' => $request->qr_name ?? 'Static QR',
            'store_email' => $request->store_email ?? '',
            'mobile_no' => $request->mobile_no ?? '',
            'successURL' => $request->successURL ?? route('payment.success'),
            'failureURL' => $request->failureURL ?? route('payment.failure')
        ];

        try {
            $result = $this->qrService->generateStaticQR($qrData);
            return response()->json([
                'success' => true,
                'qr_code' => $result['qr_code'] ?? null,
                'qr_link' => $result['qr_link'] ?? null,
                'qr_id' => $result['qr_id'] ?? null
            ]);
        } catch (\\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Static QR generation failed: ' . $e->getMessage()
            ], 500);
        }
    }
}</code></pre>
      </div>

      <h2 id="configuration" class="text-2xl font-bold mt-12 mb-4">Configuration</h2>
      <p class="leading-relaxed mb-4">Set up your YagoutPay payment widget configuration:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Configuration with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// config/yagoutpay.php
&lt;?php

return [
    'merchant_id' => env('YAGOUT_MERCHANT_ID'),
    'encryption_key' => env('YAGOUT_ENCRYPTION_KEY'),
    'api_url' => env('YAGOUT_API_URL', 'https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0'),
    'payment_link_endpoint' => '/sdk/paymentByLinkResponse',
    'static_qr_endpoint' => '/sdk/staticQRPaymentResponse',
];</code></pre>
      </div>

      <h3 class="text-lg font-semibold mt-8 mb-3">Environment Variables with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code># .env file
YAGOUT_MERCHANT_ID=202508080001
YAGOUT_ENCRYPTION_KEY=your_base64_encoded_key
YAGOUT_API_URL=https://uatcheckout.yagoutpay.com/ms-transaction-core-1-0</code></pre>
      </div>

      <h2 id="routes" class="text-2xl font-bold mt-12 mb-4">Routes</h2>
      <p class="leading-relaxed mb-4">Add routes for payment widget functionality:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Web Routes with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>// routes/web.php
Route::post('/payment/widget/link', [PaymentWidgetController::class, 'generatePaymentLink'])->name('payment.widget.link');
Route::post('/payment/widget/qr', [PaymentWidgetController::class, 'generateStaticQR'])->name('payment.widget.qr');</code></pre>
      </div>

      <h2 id="frontend-integration" class="text-2xl font-bold mt-12 mb-4">Frontend Integration</h2>
      <p class="leading-relaxed mb-4">Create forms to generate payment links and QR codes:</p>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Payment Link Form with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;!-- resources/views/payment/link-form.blade.php --&gt;
&lt;form id="paymentLinkForm"&gt;
    @csrf
    &lt;div class="form-group"&gt;
        &lt;label for="amount"&gt;Amount (ETB)&lt;/label&gt;
        &lt;input type="number" name="amount" id="amount" step="0.01" min="0.01" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="customer_email"&gt;Customer Email&lt;/label&gt;
        &lt;input type="email" name="customer_email" id="customer_email" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="mobile_no"&gt;Mobile Number&lt;/label&gt;
        &lt;input type="text" name="mobile_no" id="mobile_no" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="first_name"&gt;First Name&lt;/label&gt;
        &lt;input type="text" name="first_name" id="first_name" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="last_name"&gt;Last Name&lt;/label&gt;
        &lt;input type="text" name="last_name" id="last_name" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="product"&gt;Product/Service&lt;/label&gt;
        &lt;input type="text" name="product" id="product" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="expiry_date"&gt;Expiry Date&lt;/label&gt;
        &lt;input type="date" name="expiry_date" id="expiry_date" required&gt;
    &lt;/div&gt;
    
    &lt;button type="submit" class="btn btn-primary"&gt;Generate Payment Link&lt;/button&gt;
&lt;/form&gt;</code></pre>
      </div>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example Static QR Form with PHP:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;!-- resources/views/payment/qr-form.blade.php --&gt;
&lt;form id="staticQRForm"&gt;
    @csrf
    &lt;div class="form-group"&gt;
        &lt;label for="qr_transaction_amount"&gt;Transaction Amount (ETB)&lt;/label&gt;
        &lt;input type="number" name="qr_transaction_amount" id="qr_transaction_amount" step="0.01" min="0.01" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="brandName"&gt;Brand Name&lt;/label&gt;
        &lt;input type="text" name="brandName" id="brandName" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="storeName"&gt;Store Name&lt;/label&gt;
        &lt;input type="text" name="storeName" id="storeName" required&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="qr_name"&gt;QR Name (Optional)&lt;/label&gt;
        &lt;input type="text" name="qr_name" id="qr_name"&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label for="store_email"&gt;Store Email (Optional)&lt;/label&gt;
        &lt;input type="email" name="store_email" id="store_email"&gt;
    &lt;/div&gt;
    
    &lt;button type="submit" class="btn btn-primary"&gt;Generate Static QR&lt;/button&gt;
&lt;/form&gt;</code></pre>
      </div>

      <h3 class="text-lg font-semibold mt-8 mb-3">Example JavaScript Integration with JavaScript:</h3>
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        <pre class="text-sm whitespace-pre"><code>&lt;script&gt;
// Payment Link Form Handler
document.getElementById('paymentLinkForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    try {
        const response = await fetch('/payment/widget/link', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        });
        
        const result = await response.json();
        
        if (result.success) {
            showPaymentLinkResult(result);
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        alert('Error generating payment link: ' + error.message);
    }
});

// Static QR Form Handler
document.getElementById('staticQRForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    try {
        const response = await fetch('/payment/widget/qr', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        });
        
        const result = await response.json();
        
        if (result.success) {
            showQRResult(result);
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        alert('Error generating static QR: ' + error.message);
    }
});

function showPaymentLinkResult(result) {
    const resultDiv = document.getElementById('paymentResult');
    resultDiv.innerHTML = \`
        &lt;h3&gt;Payment Link Generated&lt;/h3&gt;
        &lt;p&gt;&lt;strong&gt;Payment Link:&lt;/strong&gt; &lt;a href="\${result.payment_link}" target="_blank"&gt;\${result.payment_link}&lt;/a&gt;&lt;/p&gt;
        \${result.qr_code ? \`&lt;p&gt;&lt;strong&gt;QR Code:&lt;/strong&gt; &lt;img src="\${result.qr_code}" alt="QR Code"&gt;&lt;/p&gt;\` : ''}
    \`;
    resultDiv.style.display = 'block';
}

function showQRResult(result) {
    const resultDiv = document.getElementById('qrResult');
    resultDiv.innerHTML = \`
        &lt;h3&gt;Static QR Generated&lt;/h3&gt;
        \${result.qr_code ? \`&lt;p&gt;&lt;strong&gt;QR Code:&lt;/strong&gt; &lt;img src="\${result.qr_code}" alt="Static QR Code"&gt;&lt;/p&gt;\` : ''}
        \${result.qr_link ? \`&lt;p&gt;&lt;strong&gt;QR Link:&lt;/strong&gt; &lt;a href="\${result.qr_link}" target="_blank"&gt;\${result.qr_link}&lt;/a&gt;&lt;/p&gt;\` : ''}
    \`;
    resultDiv.style.display = 'block';
}
&lt;/script&gt;</code></pre>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-green-900 mb-4">API Endpoints</h3>
        <ul class="text-sm text-green-800 list-disc pl-6 space-y-2">
          <li><strong>Payment Link:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">/sdk/paymentByLinkResponse</code></li>
          <li><strong>Static QR:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">/sdk/staticQRPaymentResponse</code></li>
          <li><strong>Headers Required:</strong> <code class="bg-muted px-2 py-1 rounded text-sm font-mono">me_id</code> and <code class="bg-muted px-2 py-1 rounded text-sm font-mono">Content-Type: application/json</code></li>
          <li><strong>Encryption:</strong> All payloads must be encrypted using AES-256-CBC</li>
          <li><strong>Response:</strong> All responses are encrypted and need to be decrypted</li>
        </ul>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-blue-900 mb-2">NEXT STEPS</h3>
        <p class="text-sm text-blue-800">Learn about <a href="/laravel/api-integration" class="text-blue-600 hover:underline">API Integration</a> for direct payment processing in your Laravel application.</p>
      </div>
    `,
    sections: [
      { id: "overview", title: "Overview" },
      { id: "encryption-service", title: "Encryption Service" },
      { id: "payment-link-service", title: "Payment Link Service" },
      { id: "static-qr-service", title: "Static QR Code Service" },
      { id: "payment-widget-controller", title: "Payment Widget Controller" },
      { id: "configuration", title: "Configuration" },
      { id: "routes", title: "Routes" },
      { id: "frontend-integration", title: "Frontend Integration" },
    ],
  },
};

export default pageContents;

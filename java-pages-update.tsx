// Complete Java pages with comprehensive implementation details

export const javaApiIntegration = {
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
import java.util.Base64;

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
        
        // Ship Details
        JsonObject shipDetails = new JsonObject();
        shipDetails.addProperty("ship_name", request.getParameter("customer_name"));
        shipDetails.addProperty("ship_address", request.getParameter("bill_address") != null ? request.getParameter("bill_address") : "N/A");
        shipDetails.addProperty("ship_city", request.getParameter("bill_city") != null ? request.getParameter("bill_city") : "Addis Ababa");
        shipDetails.addProperty("ship_state", request.getParameter("bill_state") != null ? request.getParameter("bill_state") : "Addis Ababa");
        shipDetails.addProperty("ship_country", request.getParameter("bill_country") != null ? request.getParameter("bill_country") : "ET");
        shipDetails.addProperty("ship_zip", request.getParameter("bill_zip") != null ? request.getParameter("bill_zip") : "1000");
        paymentData.add("ship_details", shipDetails);
        
        // Transaction Details
        JsonObject txnDetails = new JsonObject();
        txnDetails.addProperty("txn_type", "SALE");
        txnDetails.addProperty("txn_sub_type", "PAYMENT");
        paymentData.add("txn_details", txnDetails);
        
        // Item Details
        JsonArray itemDetails = new JsonArray();
        JsonObject item = new JsonObject();
        item.addProperty("item_name", "Payment");
        item.addProperty("item_amount", request.getParameter("amount"));
        item.addProperty("item_quantity", "1");
        itemDetails.add(item);
        paymentData.add("item_details", itemDetails);
        
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
        
        // Billing Details
        JsonObject billDetails = new JsonObject();
        billDetails.addProperty("bill_name", request.getParameter("customer_name"));
        billDetails.addProperty("bill_address", request.getParameter("bill_address") != null ? request.getParameter("bill_address") : "N/A");
        billDetails.addProperty("bill_city", request.getParameter("bill_city") != null ? request.getParameter("bill_city") : "Addis Ababa");
        billDetails.addProperty("bill_state", request.getParameter("bill_state") != null ? request.getParameter("bill_state") : "Addis Ababa");
        billDetails.addProperty("bill_country", request.getParameter("bill_country") != null ? request.getParameter("bill_country") : "ET");
        billDetails.addProperty("bill_zip", request.getParameter("bill_zip") != null ? request.getParameter("bill_zip") : "1000");
        paymentData.add("bill_details", billDetails);
        
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
    
    // Validate Payment Data
    public JsonObject validatePaymentData(HttpServletRequest request) {
        JsonObject result = new JsonObject();
        JsonArray errors = new JsonArray();
        
        String amount = request.getParameter("amount");
        if (amount == null || amount.trim().isEmpty() || Double.parseDouble(amount) <= 0) {
            errors.add("Amount is required and must be greater than 0");
        }
        
        String customerName = request.getParameter("customer_name");
        if (customerName == null || customerName.trim().isEmpty()) {
            errors.add("Customer name is required");
        }
        
        String email = request.getParameter("email_id");
        if (email == null || email.trim().isEmpty() || !isValidEmail(email)) {
            errors.add("Valid email is required");
        }
        
        String mobileNo = request.getParameter("mobile_no");
        if (mobileNo == null || mobileNo.trim().isEmpty()) {
            errors.add("Mobile number is required");
        }
        
        String orderNo = request.getParameter("order_no");
        if (orderNo == null || orderNo.trim().isEmpty()) {
            errors.add("Order number is required");
        }
        
        result.addProperty("isValid", errors.size() == 0);
        result.add("errors", errors);
        
        return result;
    }
    
    // Email validation helper
    private boolean isValidEmail(String email) {
        return email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
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
  }
};

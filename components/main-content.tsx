import { Sparkles, Copy, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getPageContent } from "@/lib/page-content"
import { CodeBlock } from "@/components/code-block"
import { Tabs } from "@/components/tabs"

interface MainContentProps {
  slug: string
}

export function MainContent({ slug }: MainContentProps) {
  const content = getPageContent(slug)

  const renderContent = () => {
    if (slug === "get-started/development-environment") {
      return (
        <div className="prose prose-slate max-w-none">
          <div className="flex items-start gap-3 mb-6">
            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="leading-relaxed">
              Stripe's server-side SDKs and command-line interface (CLI) allow you to interact with Stripe's REST APIs.
              Start with the Stripe CLI to streamline your development environment and make API calls.
            </p>
          </div>

          <div className="flex items-start gap-3 mb-8">
            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="leading-relaxed">
              Use the SDKs to avoid writing boilerplate code. To start sending requests from your environment, choose a
              language to follow a quickstart guide.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">NOT A DEVELOPER?</h3>
            <p className="text-sm text-blue-800">
              Check out our{" "}
              <Link href="/no-code" className="text-blue-600 hover:underline">
                no-code docs
              </Link>
              , use a{" "}
              <Link href="/prebuilt" className="text-blue-600 hover:underline">
                prebuilt solution from our partner directory
              </Link>
              , or{" "}
              <Link href="/experts" className="text-blue-600 hover:underline">
                hire a Stripe-certified expert
              </Link>
              .
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold mb-2">Chrome extensions</h3>
            <p className="text-sm text-gray-700 mb-3">
              We recommend you build your payment integration with Stripe (such as{" "}
              <Link href="/elements" className="text-blue-600 hover:underline">
                Elements
              </Link>{" "}
              or{" "}
              <Link href="/checkout" className="text-blue-600 hover:underline">
                Checkout
              </Link>
              ) on your own website. Then, set up your Chrome extension to send users to this payment page when they're
              ready to complete a purchase.
            </p>
            <p className="text-sm text-gray-700">
              This method is more secure and easier to maintain than trying to handle payments directly within the
              extension.
            </p>
          </div>

          <Tabs
            tabs={[
              {
                label: "Ruby",
                content: (
                  <div className="space-y-8">
                    <div>
                      <h2 id="install" className="text-2xl font-bold mb-4">
                        Install
                      </h2>
                      <p className="leading-relaxed mb-4">
                        In this quickstart, you install the{" "}
                        <Link href="/cli" className="text-blue-600 hover:underline">
                          Stripe CLI
                        </Link>
                        —an essential tool that gets you command line access to your Stripe integration. You also
                        install the{" "}
                        <Link href="/ruby" className="text-blue-600 hover:underline">
                          Stripe Ruby server-side SDK
                        </Link>{" "}
                        to get access to Stripe APIs from applications written in Ruby.
                      </p>
                      <CodeBlock
                        code={`# Install the Stripe CLI
brew install stripe/stripe-cli/stripe

# Verify installation
stripe --version`}
                        language="bash"
                      />
                    </div>

                    <div>
                      <h2 id="authenticate" className="text-2xl font-bold mb-4">
                        Authenticate
                      </h2>
                      <p className="leading-relaxed mb-4">
                        Authenticate the CLI with your Stripe account by running the login command:
                      </p>
                      <CodeBlock code={`stripe login`} language="bash" />
                      <p className="leading-relaxed mt-4">
                        This command will open your browser and ask you to grant access to your Stripe account.
                      </p>
                    </div>

                    <div>
                      <h2 id="confirm-setup" className="text-2xl font-bold mb-4">
                        Confirm setup
                      </h2>
                      <p className="leading-relaxed mb-4">Test your authentication by listing your Stripe products:</p>
                      <CodeBlock code={`stripe products list`} language="bash" />
                    </div>

                    <div>
                      <h2 id="install-sdk" className="text-2xl font-bold mb-4">
                        Install the Ruby server-side SDK
                      </h2>
                      <p className="leading-relaxed mb-4">Install the Stripe Ruby gem:</p>
                      <CodeBlock code={`gem install stripe`} language="bash" />
                      <p className="leading-relaxed mt-4">Or add it to your Gemfile:</p>
                      <CodeBlock code={`gem 'stripe'`} language="ruby" filename="Gemfile" />
                    </div>

                    <div>
                      <h2 id="run-first-request" className="text-2xl font-bold mb-4">
                        Run your first SDK request
                      </h2>
                      <p className="leading-relaxed mb-4">Create a customer using the Ruby SDK:</p>
                      <CodeBlock
                        code={`require 'stripe'

Stripe.api_key = 'sk_test_...'

customer = Stripe::Customer.create(
  email: 'customer@example.com',
  name: 'Jenny Rosen'
)

puts customer.id`}
                        language="ruby"
                        filename="create_customer.rb"
                      />
                    </div>
                  </div>
                ),
              },
              {
                label: "Python",
                content: (
                  <div className="space-y-8">
                    <div>
                      <h2 id="install" className="text-2xl font-bold mb-4">
                        Install
                      </h2>
                      <p className="leading-relaxed mb-4">
                        Install the Stripe CLI and the Stripe Python library to get started:
                      </p>
                      <CodeBlock
                        code={`# Install the Stripe CLI
brew install stripe/stripe-cli/stripe

# Verify installation
stripe --version`}
                        language="bash"
                      />
                    </div>

                    <div>
                      <h2 id="authenticate" className="text-2xl font-bold mb-4">
                        Authenticate
                      </h2>
                      <p className="leading-relaxed mb-4">
                        Authenticate the CLI with your Stripe account by running the login command:
                      </p>
                      <CodeBlock code={`stripe login`} language="bash" />
                    </div>

                    <div>
                      <h2 id="confirm-setup" className="text-2xl font-bold mb-4">
                        Confirm setup
                      </h2>
                      <p className="leading-relaxed mb-4">Test your authentication by listing your Stripe products:</p>
                      <CodeBlock code={`stripe products list`} language="bash" />
                    </div>

                    <div>
                      <h2 id="install-sdk" className="text-2xl font-bold mb-4">
                        Install the Python server-side SDK
                      </h2>
                      <p className="leading-relaxed mb-4">Install the Stripe Python library:</p>
                      <CodeBlock code={`pip install stripe`} language="bash" />
                    </div>

                    <div>
                      <h2 id="run-first-request" className="text-2xl font-bold mb-4">
                        Run your first SDK request
                      </h2>
                      <p className="leading-relaxed mb-4">Create a customer using the Python SDK:</p>
                      <CodeBlock
                        code={`import stripe

stripe.api_key = 'sk_test_...'

customer = stripe.Customer.create(
    email='customer@example.com',
    name='Jenny Rosen'
)

print(customer.id)`}
                        language="python"
                        filename="create_customer.py"
                      />
                    </div>
                  </div>
                ),
              },
              {
                label: "Go",
                content: (
                  <div className="space-y-8">
                    <div>
                      <h2 id="install" className="text-2xl font-bold mb-4">
                        Install
                      </h2>
                      <p className="leading-relaxed mb-4">
                        Install the Stripe CLI and the Stripe Go library to get started:
                      </p>
                      <CodeBlock
                        code={`# Install the Stripe CLI
brew install stripe/stripe-cli/stripe

# Verify installation
stripe --version`}
                        language="bash"
                      />
                    </div>

                    <div>
                      <h2 id="authenticate" className="text-2xl font-bold mb-4">
                        Authenticate
                      </h2>
                      <p className="leading-relaxed mb-4">
                        Authenticate the CLI with your Stripe account by running the login command:
                      </p>
                      <CodeBlock code={`stripe login`} language="bash" />
                    </div>

                    <div>
                      <h2 id="confirm-setup" className="text-2xl font-bold mb-4">
                        Confirm setup
                      </h2>
                      <p className="leading-relaxed mb-4">Test your authentication by listing your Stripe products:</p>
                      <CodeBlock code={`stripe products list`} language="bash" />
                    </div>

                    <div>
                      <h2 id="install-sdk" className="text-2xl font-bold mb-4">
                        Install the Go server-side SDK
                      </h2>
                      <p className="leading-relaxed mb-4">Install the Stripe Go library:</p>
                      <CodeBlock code={`go get github.com/stripe/stripe-go/v76`} language="bash" />
                    </div>

                    <div>
                      <h2 id="run-first-request" className="text-2xl font-bold mb-4">
                        Run your first SDK request
                      </h2>
                      <p className="leading-relaxed mb-4">Create a customer using the Go SDK:</p>
                      <CodeBlock
                        code={`package main

import (
    "fmt"
    "github.com/stripe/stripe-go/v76"
    "github.com/stripe/stripe-go/v76/customer"
)

func main() {
    stripe.Key = "sk_test_..."

    params := &stripe.CustomerParams{
        Email: stripe.String("customer@example.com"),
        Name:  stripe.String("Jenny Rosen"),
    }
    
    c, _ := customer.New(params)
    fmt.Println(c.ID)
}`}
                        language="go"
                        filename="main.go"
                      />
                    </div>
                  </div>
                ),
              },
              {
                label: "Java",
                content: (
                  <div className="space-y-8">
                    <div>
                      <h2 id="install" className="text-2xl font-bold mb-4">
                        Install
                      </h2>
                      <p className="leading-relaxed mb-4">
                        Install the Stripe CLI and add the Stripe Java library to your project:
                      </p>
                      <CodeBlock
                        code={`# Install the Stripe CLI
brew install stripe/stripe-cli/stripe

# Verify installation
stripe --version`}
                        language="bash"
                      />
                    </div>

                    <div>
                      <h2 id="authenticate" className="text-2xl font-bold mb-4">
                        Authenticate
                      </h2>
                      <p className="leading-relaxed mb-4">
                        Authenticate the CLI with your Stripe account by running the login command:
                      </p>
                      <CodeBlock code={`stripe login`} language="bash" />
                    </div>

                    <div>
                      <h2 id="confirm-setup" className="text-2xl font-bold mb-4">
                        Confirm setup
                      </h2>
                      <p className="leading-relaxed mb-4">Test your authentication by listing your Stripe products:</p>
                      <CodeBlock code={`stripe products list`} language="bash" />
                    </div>

                    <div>
                      <h2 id="install-sdk" className="text-2xl font-bold mb-4">
                        Install the Java server-side SDK
                      </h2>
                      <p className="leading-relaxed mb-4">Add the Stripe Java library to your Maven pom.xml:</p>
                      <CodeBlock
                        code={`<dependency>
  <groupId>com.stripe</groupId>
  <artifactId>stripe-java</artifactId>
  <version>24.0.0</version>
</dependency>`}
                        language="xml"
                        filename="pom.xml"
                      />
                    </div>

                    <div>
                      <h2 id="run-first-request" className="text-2xl font-bold mb-4">
                        Run your first SDK request
                      </h2>
                      <p className="leading-relaxed mb-4">Create a customer using the Java SDK:</p>
                      <CodeBlock
                        code={`import com.stripe.Stripe;
import com.stripe.model.Customer;
import com.stripe.param.CustomerCreateParams;

public class CreateCustomer {
    public static void main(String[] args) {
        Stripe.apiKey = "sk_test_...";

        CustomerCreateParams params = CustomerCreateParams.builder()
            .setEmail("customer@example.com")
            .setName("Jenny Rosen")
            .build();

        Customer customer = Customer.create(params);
        System.out.println(customer.getId());
    }
}`}
                        language="java"
                        filename="CreateCustomer.java"
                      />
                    </div>
                  </div>
                ),
              },
              {
                label: "Node.js",
                content: (
                  <div className="space-y-8">
                    <div>
                      <h2 id="install" className="text-2xl font-bold mb-4">
                        Install
                      </h2>
                      <p className="leading-relaxed mb-4">
                        Install the Stripe CLI and the Stripe Node.js library to get started:
                      </p>
                      <CodeBlock
                        code={`# Install the Stripe CLI
brew install stripe/stripe-cli/stripe

# Verify installation
stripe --version`}
                        language="bash"
                      />
                    </div>

                    <div>
                      <h2 id="authenticate" className="text-2xl font-bold mb-4">
                        Authenticate
                      </h2>
                      <p className="leading-relaxed mb-4">
                        Authenticate the CLI with your Stripe account by running the login command:
                      </p>
                      <CodeBlock code={`stripe login`} language="bash" />
                    </div>

                    <div>
                      <h2 id="confirm-setup" className="text-2xl font-bold mb-4">
                        Confirm setup
                      </h2>
                      <p className="leading-relaxed mb-4">Test your authentication by listing your Stripe products:</p>
                      <CodeBlock code={`stripe products list`} language="bash" />
                    </div>

                    <div>
                      <h2 id="install-sdk" className="text-2xl font-bold mb-4">
                        Install the Node.js server-side SDK
                      </h2>
                      <p className="leading-relaxed mb-4">Install the Stripe Node.js library:</p>
                      <CodeBlock code={`npm install stripe`} language="bash" />
                    </div>

                    <div>
                      <h2 id="run-first-request" className="text-2xl font-bold mb-4">
                        Run your first SDK request
                      </h2>
                      <p className="leading-relaxed mb-4">Create a customer using the Node.js SDK:</p>
                      <CodeBlock
                        code={`const stripe = require('stripe')('sk_test_...');

const customer = await stripe.customers.create({
  email: 'customer@example.com',
  name: 'Jenny Rosen',
});

console.log(customer.id);`}
                        language="javascript"
                        filename="create-customer.js"
                      />
                    </div>
                  </div>
                ),
              },
              {
                label: "PHP",
                content: (
                  <div className="space-y-8">
                    <div>
                      <h2 id="install" className="text-2xl font-bold mb-4">
                        Install
                      </h2>
                      <p className="leading-relaxed mb-4">
                        Install the Stripe CLI and the Stripe PHP library to get started:
                      </p>
                      <CodeBlock
                        code={`# Install the Stripe CLI
brew install stripe/stripe-cli/stripe

# Verify installation
stripe --version`}
                        language="bash"
                      />
                    </div>

                    <div>
                      <h2 id="authenticate" className="text-2xl font-bold mb-4">
                        Authenticate
                      </h2>
                      <p className="leading-relaxed mb-4">
                        Authenticate the CLI with your Stripe account by running the login command:
                      </p>
                      <CodeBlock code={`stripe login`} language="bash" />
                    </div>

                    <div>
                      <h2 id="confirm-setup" className="text-2xl font-bold mb-4">
                        Confirm setup
                      </h2>
                      <p className="leading-relaxed mb-4">Test your authentication by listing your Stripe products:</p>
                      <CodeBlock code={`stripe products list`} language="bash" />
                    </div>

                    <div>
                      <h2 id="install-sdk" className="text-2xl font-bold mb-4">
                        Install the PHP server-side SDK
                      </h2>
                      <p className="leading-relaxed mb-4">Install the Stripe PHP library using Composer:</p>
                      <CodeBlock code={`composer require stripe/stripe-php`} language="bash" />
                    </div>

                    <div>
                      <h2 id="run-first-request" className="text-2xl font-bold mb-4">
                        Run your first SDK request
                      </h2>
                      <p className="leading-relaxed mb-4">Create a customer using the PHP SDK:</p>
                      <CodeBlock
                        code={`<?php
require_once('vendor/autoload.php');

\\Stripe\\Stripe::setApiKey('sk_test_...');

$customer = \\Stripe\\Customer::create([
    'email' => 'customer@example.com',
    'name' => 'Jenny Rosen',
]);

echo $customer->id;`}
                        language="php"
                        filename="create_customer.php"
                      />
                    </div>
                  </div>
                ),
              },
              {
                label: ".NET",
                content: (
                  <div className="space-y-8">
                    <div>
                      <h2 id="install" className="text-2xl font-bold mb-4">
                        Install
                      </h2>
                      <p className="leading-relaxed mb-4">
                        Install the Stripe CLI and the Stripe .NET library to get started:
                      </p>
                      <CodeBlock
                        code={`# Install the Stripe CLI
brew install stripe/stripe-cli/stripe

# Verify installation
stripe --version`}
                        language="bash"
                      />
                    </div>

                    <div>
                      <h2 id="authenticate" className="text-2xl font-bold mb-4">
                        Authenticate
                      </h2>
                      <p className="leading-relaxed mb-4">
                        Authenticate the CLI with your Stripe account by running the login command:
                      </p>
                      <CodeBlock code={`stripe login`} language="bash" />
                    </div>

                    <div>
                      <h2 id="confirm-setup" className="text-2xl font-bold mb-4">
                        Confirm setup
                      </h2>
                      <p className="leading-relaxed mb-4">Test your authentication by listing your Stripe products:</p>
                      <CodeBlock code={`stripe products list`} language="bash" />
                    </div>

                    <div>
                      <h2 id="install-sdk" className="text-2xl font-bold mb-4">
                        Install the .NET server-side SDK
                      </h2>
                      <p className="leading-relaxed mb-4">Install the Stripe .NET library using NuGet:</p>
                      <CodeBlock code={`dotnet add package Stripe.net`} language="bash" />
                    </div>

                    <div>
                      <h2 id="run-first-request" className="text-2xl font-bold mb-4">
                        Run your first SDK request
                      </h2>
                      <p className="leading-relaxed mb-4">Create a customer using the .NET SDK:</p>
                      <CodeBlock
                        code={`using Stripe;

StripeConfiguration.ApiKey = "sk_test_...";

var options = new CustomerCreateOptions
{
    Email = "customer@example.com",
    Name = "Jenny Rosen",
};

var service = new CustomerService();
Customer customer = service.Create(options);

Console.WriteLine(customer.Id);`}
                        language="csharp"
                        filename="Program.cs"
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      )
    }

    if (slug === "get-started/first-api-request") {
      return (
        <div className="prose prose-slate max-w-none">
          <p className="leading-relaxed mb-8">
            After setting up your development environment, you're ready to make your first API request to Stripe. This
            guide walks you through creating a customer and retrieving their information.
          </p>

          <Tabs
            tabs={[
              {
                label: "Ruby",
                content: (
                  <div className="space-y-8">
                    <div>
                      <h2 id="create-customer" className="text-2xl font-bold mb-4">
                        Create a customer
                      </h2>
                      <p className="leading-relaxed mb-4">
                        Create a customer object to represent a buyer in your system:
                      </p>
                      <CodeBlock
                        code={`require 'stripe'

Stripe.api_key = 'sk_test_...'

customer = Stripe::Customer.create(
  email: 'customer@example.com',
  name: 'Jenny Rosen',
  description: 'My First Test Customer'
)

puts customer.id`}
                        language="ruby"
                        filename="create_customer.rb"
                      />
                    </div>

                    <div>
                      <h2 id="retrieve-customer" className="text-2xl font-bold mb-4">
                        Retrieve a customer
                      </h2>
                      <p className="leading-relaxed mb-4">Retrieve the customer you just created:</p>
                      <CodeBlock
                        code={`customer = Stripe::Customer.retrieve('cus_...')
puts customer.email`}
                        language="ruby"
                      />
                    </div>
                  </div>
                ),
              },
              {
                label: "Python",
                content: (
                  <div className="space-y-8">
                    <div>
                      <h2 id="create-customer" className="text-2xl font-bold mb-4">
                        Create a customer
                      </h2>
                      <p className="leading-relaxed mb-4">
                        Create a customer object to represent a buyer in your system:
                      </p>
                      <CodeBlock
                        code={`import stripe

stripe.api_key = 'sk_test_...'

customer = stripe.Customer.create(
    email='customer@example.com',
    name='Jenny Rosen',
    description='My First Test Customer'
)

print(customer.id)`}
                        language="python"
                        filename="create_customer.py"
                      />
                    </div>

                    <div>
                      <h2 id="retrieve-customer" className="text-2xl font-bold mb-4">
                        Retrieve a customer
                      </h2>
                      <p className="leading-relaxed mb-4">Retrieve the customer you just created:</p>
                      <CodeBlock
                        code={`customer = stripe.Customer.retrieve('cus_...')
print(customer.email)`}
                        language="python"
                      />
                    </div>
                  </div>
                ),
              },
              {
                label: "Node.js",
                content: (
                  <div className="space-y-8">
                    <div>
                      <h2 id="create-customer" className="text-2xl font-bold mb-4">
                        Create a customer
                      </h2>
                      <p className="leading-relaxed mb-4">
                        Create a customer object to represent a buyer in your system:
                      </p>
                      <CodeBlock
                        code={`const stripe = require('stripe')('sk_test_...');

const customer = await stripe.customers.create({
  email: 'customer@example.com',
  name: 'Jenny Rosen',
  description: 'My First Test Customer',
});

console.log(customer.id);`}
                        language="javascript"
                        filename="create-customer.js"
                      />
                    </div>

                    <div>
                      <h2 id="retrieve-customer" className="text-2xl font-bold mb-4">
                        Retrieve a customer
                      </h2>
                      <p className="leading-relaxed mb-4">Retrieve the customer you just created:</p>
                      <CodeBlock
                        code={`const customer = await stripe.customers.retrieve('cus_...');
console.log(customer.email);`}
                        language="javascript"
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      )
    }

    // For demonstration, we'll add some interactive examples
    if (slug === "checkout/quickstart") {
      return (
        <div className="prose prose-slate max-w-none">
          <p className="leading-relaxed mb-8">
            This quickstart guide will help you accept your first payment with Checkout in about 10 minutes.
          </p>

          <h2 id="install-stripe" className="text-2xl font-bold mt-12 mb-4">
            Install Stripe
          </h2>
          <p className="leading-relaxed mb-4">Install the Stripe library for your programming language:</p>

          <Tabs
            tabs={[
              {
                label: "Node.js",
                content: <CodeBlock code="npm install stripe" language="bash" />,
              },
              {
                label: "Python",
                content: <CodeBlock code="pip install stripe" language="bash" />,
              },
              {
                label: "Ruby",
                content: <CodeBlock code="gem install stripe" language="bash" />,
              },
              {
                label: "PHP",
                content: <CodeBlock code="composer require stripe/stripe-php" language="bash" />,
              },
            ]}
          />

          <h2 id="create-a-product" className="text-2xl font-bold mt-12 mb-4">
            Create a product
          </h2>
          <p className="leading-relaxed mb-4">Create a product and price in the Stripe Dashboard or via the API:</p>

          <CodeBlock
            code={`const stripe = require('stripe')('sk_test_...');

const product = await stripe.products.create({
  name: 'T-shirt',
});

const price = await stripe.prices.create({
  product: product.id,
  unit_amount: 2000,
  currency: 'usd',
});`}
            language="javascript"
            filename="server.js"
          />

          <h2 id="create-a-checkout-session" className="text-2xl font-bold mt-12 mb-4">
            Create a Checkout Session
          </h2>
          <p className="leading-relaxed mb-4">
            Create a Checkout Session on your server and redirect your customer to the Checkout page:
          </p>

          <CodeBlock
            code={`const session = await stripe.checkout.sessions.create({
  line_items: [{
    price: 'price_...',
    quantity: 1,
  }],
  mode: 'payment',
  success_url: 'https://example.com/success',
  cancel_url: 'https://example.com/cancel',
});

// Redirect to Checkout
res.redirect(303, session.url);`}
            language="javascript"
            filename="server.js"
          />

          <h2 id="test-the-integration" className="text-2xl font-bold mt-12 mb-4">
            Test the integration
          </h2>
          <p className="leading-relaxed mb-4">
            Use test card number{" "}
            <code className="bg-muted px-2 py-1 rounded text-sm font-mono">4242 4242 4242 4242</code> with any future
            expiration date and CVC to test your integration.
          </p>
        </div>
      )
    }

    // Default content rendering with section IDs
    return (
      <div
        className="prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{
          __html: content.html.replace(/<h2/g, (match) => {
            const nextText = content.html.substring(content.html.indexOf(match))
            const titleMatch = nextText.match(/<h2[^>]*>([^<]+)<\/h2>/)
            if (titleMatch) {
              const id = titleMatch[1].toLowerCase().replace(/\s+/g, "-")
              return `<h2 id="${id}"`
            }
            return match
          }),
        }}
      />
    )
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 md:mb-8 overflow-x-auto">
          <Link href="/" className="hover:text-foreground whitespace-nowrap">
            Home
          </Link>
          {content.breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-2 whitespace-nowrap">
              <span>/</span>
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-foreground">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{content.title}</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed">{content.description}</p>

        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent text-xs md:text-sm">
            <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
            Ask about this page
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent text-xs md:text-sm">
            <Copy className="h-3 w-3 md:h-4 md:w-4" />
            Copy for LLM
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent text-xs md:text-sm hidden sm:flex">
            <FileText className="h-3 w-3 md:h-4 md:w-4" />
            View as Markdown
          </Button>
        </div>

        {renderContent()}
      </div>
    </main>
  )
}

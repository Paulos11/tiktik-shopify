// app/terms-conditions/page.js
"use client";

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Agreement to Terms
            </h2>
            <p className="text-gray-700 mb-4">
              By accessing or using tiktikwatch.com, you agree to be bound by
              these Terms and Conditions. If you disagree with any part of these
              terms, you may not access our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Use of Website
            </h2>
            <p className="text-gray-700 mb-4">
              You agree to use our website only for lawful purposes and in a way
              that does not infringe upon the rights of others.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>You must be at least 18 years old to make purchases</li>
              <li>
                You are responsible for maintaining account confidentiality
              </li>
              <li>
                You agree not to misuse our services or disrupt website
                functionality
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Information
            </h2>
            <p className="text-gray-700 mb-4">
              We strive to provide accurate product descriptions and pricing.
              However, we do not warrant that product descriptions or other
              content is accurate, complete, or error-free.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Orders and Payment
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>All orders are subject to acceptance and availability</li>
              <li>We reserve the right to refuse or cancel any order</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment must be received before order processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Shipping and Delivery
            </h2>
            <p className="text-gray-700 mb-4">
              Delivery times are estimates and not guaranteed. We are not
              responsible for delays caused by shipping carriers or customs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Returns and Refunds
            </h2>
            <p className="text-gray-700 mb-4">
              Please refer to our{" "}
              <a href="/shipping" className="text-blue-600 hover:underline">
                Shipping & Returns
              </a>{" "}
              page for detailed information about our return policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Intellectual Property
            </h2>
            <p className="text-gray-700 mb-4">
              All content on this website, including text, images, logos, and
              designs, is the property of TikTik and protected by copyright
              laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-4">
              To the fullest extent permitted by law, TikTik shall not be liable
              for any indirect, incidental, special, or consequential damages
              arising from your use of our website or products.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Governing Law
            </h2>
            <p className="text-gray-700 mb-4">
              These Terms and Conditions are governed by the laws of Malta. Any
              disputes shall be resolved in the courts of Malta.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these terms at any time. Continued
              use of the website after changes constitutes acceptance of the new
              terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                Email:{" "}
                <a
                  href="mailto:info@tiktikwatch.com"
                  className="text-blue-600 hover:underline"
                >
                  info@tiktikwatch.com
                </a>
              </p>
              <p className="text-gray-700">
                Phone:{" "}
                <a
                  href="tel:+35699676602"
                  className="text-blue-600 hover:underline"
                >
                  +356 9967 6602
                </a>
              </p>
              <p className="text-gray-700">
                Address: Mdina Road, Ħaz-Zebbug, Malta
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

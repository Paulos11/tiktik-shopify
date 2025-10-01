"use client";
import { Cookie, Shield, Settings, BarChart3, Users, CheckCircle2 } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-black rounded-full">
              <Cookie className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-gray-600 text-center text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Learn how we use cookies to enhance your browsing experience and provide personalized services
          </p>
          <p className="text-gray-500 text-center text-xs md:text-sm mt-4">
            Last Updated: September 30, 2025
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        
        {/* Introduction */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">What Are Cookies?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, understanding how you use our site, and enabling certain features.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period or until you delete them).
          </p>
        </div>

        {/* Types of Cookies */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Types of Cookies We Use</h2>
          
          <div className="space-y-6 md:space-y-8">
            {/* Essential Cookies */}
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 bg-black rounded-lg shrink-0">
                  <Shield className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">Essential Cookies</h3>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                    These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 text-xs bg-white px-3 py-1 rounded-full border border-gray-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Authentication
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-white px-3 py-1 rounded-full border border-gray-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Shopping Cart
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-white px-3 py-1 rounded-full border border-gray-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Security
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preference Cookies */}
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 bg-black rounded-lg shrink-0">
                  <Settings className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">Preference Cookies</h3>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                    These cookies allow our website to remember choices you make (such as your language preference or region) and provide enhanced, personalized features.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 text-xs bg-white px-3 py-1 rounded-full border border-gray-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Language
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-white px-3 py-1 rounded-full border border-gray-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Currency
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-white px-3 py-1 rounded-full border border-gray-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Display Settings
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 bg-black rounded-lg shrink-0">
                  <BarChart3 className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">Analytics Cookies</h3>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our services.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 text-xs bg-white px-3 py-1 rounded-full border border-gray-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Traffic Analysis
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-white px-3 py-1 rounded-full border border-gray-200">
                      <CheckCircle2 className="w-3 h-3" />
                      User Behavior
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-white px-3 py-1 rounded-full border border-gray-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Performance
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 bg-black rounded-lg shrink-0">
                  <Users className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">Marketing Cookies</h3>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                    These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an advertisement.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 text-xs bg-white px-3 py-1 rounded-full border border-gray-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Targeted Ads
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-white px-3 py-1 rounded-full border border-gray-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Retargeting
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-white px-3 py-1 rounded-full border border-gray-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Social Media
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third-Party Cookies */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Third-Party Cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may use third-party service providers who are authorized to place cookies on our website to help us analyze website usage and provide targeted advertising. These third parties have their own privacy policies addressing how they use such information.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Common third-party services we use include Google Analytics for website analytics, social media platforms for sharing functionality, and advertising networks for targeted marketing campaigns.
          </p>
        </div>

        {/* Managing Cookies */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Managing Your Cookie Preferences</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by setting or amending your web browser controls. Please note that if you choose to reject cookies, you may still use our website though your access to some functionality and areas may be restricted.
          </p>
          
          <div className="bg-gray-50 p-6 md:p-8 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Browser Settings</h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
            </p>
            <div className="space-y-2 text-sm md:text-base">
              <p className="text-gray-700">
                <span className="font-semibold">Chrome:</span> Settings → Privacy and security → Cookies and other site data
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Firefox:</span> Options → Privacy & Security → Cookies and Site Data
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Safari:</span> Preferences → Privacy → Manage Website Data
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Edge:</span> Settings → Cookies and site permissions → Cookies and site data
              </p>
            </div>
          </div>
        </div>

        {/* Updates to Policy */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may update our Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on this page with an updated "Last Updated" date.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies and related technologies.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-gray-900 to-black text-white p-6 md:p-10 rounded-lg">
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Questions About Cookies?</h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
            If you have any questions about our use of cookies or other technologies, please contact us at:
          </p>
          <div className="space-y-2 text-sm md:text-base">
            <p className="text-gray-300">
              <span className="font-semibold text-white">Email:</span> privacy@yourdomain.com
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Phone:</span> +1 (555) 123-4567
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Address:</span> 123 Watch Street, New York, NY 10001
            </p>
          </div>
        </div>

      </section>
    </div>
  );
}
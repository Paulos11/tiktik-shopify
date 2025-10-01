// CareGuidePage.jsx
"use client";
import {
  Droplets,
  Sun,
  Wrench,
  AlertTriangle,
  Sparkles,
  Clock,
} from "lucide-react";

import HeroHeader from "@/components/layout/HeroHeader"; // Assuming HeroHeader is imported

export default function CareGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <HeroHeader
        title="Your Watch Care Guide"
        subtitle="Ensure the longevity and precision of your timepiece with our essential maintenance tips."
        bgImageSrc="/head-banner.jpg"
      />

      {/* Main Content: CHANGED max-w-4xl to max-w-3xl */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Quick Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-gray-200 rounded-lg p-6 text-center">
            <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">
              Water Resistance
            </h3>
            <p className="text-sm text-gray-600">
              Check rating before exposure
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">
              Regular Service
            </h3>
            <p className="text-sm text-gray-600">Every 3-5 years recommended</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 text-center">
            <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Keep Clean</h3>
            <p className="text-sm text-gray-600">Wipe daily with soft cloth</p>
          </div>
        </div>

        {/* Daily Care */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            Daily Care
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Cleaning Your Watch
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • Wipe down with a soft, lint-free cloth after each wear
                </li>
                <li>
                  • For water-resistant watches, occasionally clean with
                  slightly damp cloth
                </li>
                <li>
                  • Use a soft toothbrush for hard-to-reach areas around the
                  case and bracelet
                </li>
                <li>• Dry thoroughly after any water exposure</li>
                <li>• Never use harsh chemicals or solvents</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Wearing Your Watch
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • Remove watch during activities that may cause impact or
                  shock
                </li>
                <li>
                  • Avoid extreme temperatures (saunas, freezing conditions)
                </li>
                <li>
                  • Keep away from strong magnetic fields (speakers, phones,
                  magnetic clasps)
                </li>
                <li>• Don't operate crown or buttons while underwater</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Water Resistance */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            Understanding Water Resistance
          </h2>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 font-semibold text-gray-900">
                    Rating
                  </th>
                  <th className="text-left py-3 font-semibold text-gray-900">
                    Suitable For
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-200">
                  <td className="py-3">30m (3 ATM)</td>
                  <td className="py-3">Splash resistant, handwashing</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3">50m (5 ATM)</td>
                  <td className="py-3">Swimming, showering (no diving)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3">100m (10 ATM)</td>
                  <td className="py-3">Snorkeling, recreational swimming</td>
                </tr>
                <tr>
                  <td className="py-3">200m+ (20 ATM)</td>
                  <td className="py-3">Scuba diving, water sports</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-900 mb-1">Important</p>
                <p className="text-sm text-yellow-800">
                  Water resistance can deteriorate over time. Have gaskets
                  checked during regular service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Storage */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            Proper Storage
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                When Not Wearing
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Store in a cool, dry place away from direct sunlight</li>
                <li>• Use a watch box or soft pouch to prevent scratches</li>
                <li>• Keep away from magnetic objects and electronics</li>
                <li>
                  • For automatic watches, use a watch winder if not worn daily
                </li>
                <li>
                  • Store leather straps separately to prevent moisture damage
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Long-Term Storage
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Wind mechanical watches at least once a month</li>
                <li>
                  • Remove batteries from quartz watches if storing for extended
                  periods
                </li>
                <li>• Keep in temperature-controlled environment (15-25°C)</li>
                <li>• Use silica gel packets to absorb moisture</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Maintenance Schedule */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            Maintenance Schedule
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center font-bold">
                  1M
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Monthly</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Check for moisture under crystal</li>
                    <li>• Inspect strap or bracelet for wear</li>
                    <li>• Clean with soft cloth</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center font-bold">
                  1Y
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Yearly</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Test water resistance</li>
                    <li>• Check accuracy (mechanical watches)</li>
                    <li>• Replace battery (quartz watches)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  3-5Y
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Every 3-5 Years
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Complete service by authorized technician</li>
                    <li>• Movement cleaning and lubrication</li>
                    <li>• Replace gaskets and seals</li>
                    <li>• Pressure test for water resistance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Issues */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            Common Issues & Solutions
          </h2>

          <div className="space-y-4">
            <div className="border-l-4 border-gray-300 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                Watch Running Fast/Slow
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Mechanical watches may gain or lose a few seconds per day. If
                accuracy exceeds ±10 seconds/day, professional servicing may be
                needed.
              </p>
            </div>

            <div className="border-l-4 border-gray-300 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                Condensation Under Crystal
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Immediately remove from wrist and take to authorized service
                center. Water damage requires urgent attention.
              </p>
            </div>

            <div className="border-l-4 border-gray-300 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                Crown Won't Screw Down
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Don't force it. Check for dirt or debris around threads. Clean
                gently and try again. If problem persists, seek professional
                help.
              </p>
            </div>

            <div className="border-l-4 border-gray-300 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                Bracelet Link Loose
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Stop wearing immediately to prevent loss. Visit us or an
                authorized dealer to have it tightened or repaired.
              </p>
            </div>
          </div>
        </section>

        {/* Professional Service */}
        <section className="bg-gray-50 rounded-lg p-6 md:p-8">
          <div className="flex gap-4 mb-4">
            <Wrench className="w-8 h-8 text-gray-900 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Professional Servicing
              </h2>
              <p className="text-gray-700 mb-4">
                Regular professional maintenance ensures your watch performs
                optimally and maintains its value. Our authorized service center
                provides comprehensive care for all timepieces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Schedule Service
                </a>
                <a
                  href="tel:+35699676602"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 transition"
                >
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

import Link from "next/link"

export default function Privacy() {
  return (
    <div className="container max-w-4xl py-12 mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-center">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="mb-3">
          At Rakkaranta Resort, we are committed to protecting your privacy and ensuring the security of your personal
          information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our
          services.
        </p>
        <p className="mb-3">
          We comply with the General Data Protection Regulation (GDPR) and other applicable Finnish and European Union
          data protection laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Information Collection</h2>

        <h3 className="text-xl font-medium mb-2">Personal Data Collected During Booking</h3>
        <p className="mb-3">When you make a reservation, we collect the following information:</p>
        <ul className="list-disc pl-6 mb-3 space-y-1">
          <li>Full name</li>
          <li>Contact information (email address, phone number)</li>
          <li>Postal address</li>
          <li>Payment information</li>
          <li>Date of birth (for age verification)</li>
          <li>Nationality and passport/ID details (where required by law)</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Optional Information</h3>
        <p className="mb-3">You may choose to provide additional information such as:</p>
        <ul className="list-disc pl-6 mb-3 space-y-1">
          <li>Dietary preferences or restrictions</li>
          <li>Special requests or accessibility needs</li>
          <li>Information about accompanying guests</li>
          <li>Preferences for activities or services</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">IoT Sensor Data</h3>
        <p className="mb-3">
          Our accommodations may be equipped with Internet of Things (IoT) sensors that collect non-personal data such
          as:
        </p>
        <ul className="list-disc pl-6 mb-3 space-y-1">
          <li>Temperature and humidity levels</li>
          <li>Energy consumption</li>
          <li>Occupancy detection (for energy efficiency, not surveillance)</li>
          <li>Water usage</li>
        </ul>
        <p className="mb-3">
          These sensors do not record audio or video and are used solely for facility management and guest comfort.
        </p>

        <h3 className="text-xl font-medium mb-2">Website Analytics and Cookies</h3>
        <p className="mb-3">
          When you visit our website, we collect standard internet log information and details of visitor behavior
          patterns using cookies and similar technologies. This helps us improve our website and provide a better user
          experience.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Usage</h2>

        <h3 className="text-xl font-medium mb-2">Reservation Management</h3>
        <p className="mb-3">
          We use your personal data to process and manage your reservation, including check-in/check-out procedures,
          payment processing, and communication regarding your stay.
        </p>

        <h3 className="text-xl font-medium mb-2">Personalization of Guest Experience</h3>
        <p className="mb-3">
          With your consent, we may use your preferences and past stay information to personalize your experience and
          offer tailored services during your visit.
        </p>

        <h3 className="text-xl font-medium mb-2">Communication with Guests</h3>
        <p className="mb-3">
          We use your contact information to send reservation confirmations, pre-arrival information, post-stay surveys,
          and other communications directly related to your stay.
        </p>

        <h3 className="text-xl font-medium mb-2">IoT Monitoring</h3>
        <p className="mb-3">
          Data from IoT sensors is used to ensure optimal conditions in accommodations, manage energy usage efficiently,
          and identify maintenance needs promptly.
        </p>

        <h3 className="text-xl font-medium mb-2">Marketing</h3>
        <p className="mb-3">
          With your explicit consent, we may send you marketing communications about special offers, events, and news
          from Rakkaranta Resort. You can opt out of these communications at any time.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Storage & Security</h2>

        <h3 className="text-xl font-medium mb-2">Protection Measures</h3>
        <p className="mb-3">
          We implement appropriate technical and organizational measures to protect your personal data against
          unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h3 className="text-xl font-medium mb-2">Data Retention</h3>
        <p className="mb-3">
          We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected,
          including legal, accounting, or reporting requirements:
        </p>
        <ul className="list-disc pl-6 mb-3 space-y-1">
          <li>Reservation data: 3 years after your last stay</li>
          <li>Financial records: 7 years (as required by Finnish law)</li>
          <li>Marketing preferences: Until you withdraw consent</li>
          <li>IoT sensor data: Aggregated after 30 days, with individual data points deleted</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Server Locations</h3>
        <p className="mb-3">
          All personal data is stored on secure servers located within the European Economic Area (EEA).
        </p>

        <h3 className="text-xl font-medium mb-2">IoT Security</h3>
        <p className="mb-3">
          Our IoT systems are designed with security in mind, including encryption, regular security updates, and access
          controls to protect any data collected.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Sharing & Third Parties</h2>

        <h3 className="text-xl font-medium mb-2">Service Providers</h3>
        <p className="mb-3">
          We may share your information with third-party service providers who perform services on our behalf, such as:
        </p>
        <ul className="list-disc pl-6 mb-3 space-y-1">
          <li>Payment processors</li>
          <li>Booking platform partners</li>
          <li>Email service providers</li>
          <li>Customer support services</li>
        </ul>
        <p className="mb-3">
          These service providers are contractually obligated to use your data only for the specific services they
          provide to us.
        </p>

        <h3 className="text-xl font-medium mb-2">Legal Requirements</h3>
        <p className="mb-3">
          We may disclose your personal data if required to do so by law or in response to valid requests by public
          authorities (e.g., for tax purposes or in response to a court order).
        </p>

        <h3 className="text-xl font-medium mb-2">No Selling of Personal Data</h3>
        <p className="mb-3">
          We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Guest Rights</h2>

        <h3 className="text-xl font-medium mb-2">Right to Access</h3>
        <p className="mb-3">You have the right to request a copy of the personal data we hold about you.</p>

        <h3 className="text-xl font-medium mb-2">Right to Rectification</h3>
        <p className="mb-3">
          You have the right to request that we correct any inaccurate or incomplete personal data we hold about you.
        </p>

        <h3 className="text-xl font-medium mb-2">Right to Erasure</h3>
        <p className="mb-3">
          In certain circumstances, you have the right to request that we delete your personal data.
        </p>

        <h3 className="text-xl font-medium mb-2">Right to Restriction of Processing</h3>
        <p className="mb-3">
          You have the right to request that we restrict the processing of your personal data in certain circumstances.
        </p>

        <h3 className="text-xl font-medium mb-2">Right to Data Portability</h3>
        <p className="mb-3">
          You have the right to receive your personal data in a structured, commonly used, and machine-readable format.
        </p>

        <h3 className="text-xl font-medium mb-2">How to Exercise Your Rights</h3>
        <p className="mb-3">
          To exercise any of these rights, please contact our Data Protection Officer at{" "}
          <Link href="mailto:privacy@rakkaranta.fi" className="underline">
            privacy@rakkaranta.fi
          </Link>{" "}
          or by mail at Rakkaranta Resort, Privacy Office, [Address], Finland.
        </p>

        <h3 className="text-xl font-medium mb-2">Marketing Opt-Out</h3>
        <p className="mb-3">
          You can opt out of receiving marketing communications at any time by clicking the &quot;unsubscribe&quot; link in any
          marketing email or by contacting us directly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cookies & Tracking</h2>

        <h3 className="text-xl font-medium mb-2">Types of Cookies Used</h3>
        <p className="mb-3">Our website uses the following types of cookies:</p>
        <ul className="list-disc pl-6 mb-3 space-y-1">
          <li>Essential cookies: Required for the website to function properly</li>
          <li>Preference cookies: Remember your preferences and settings</li>
          <li>Analytics cookies: Help us understand how visitors use our website</li>
          <li>Marketing cookies: Used to deliver relevant advertisements (only with your consent)</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Purpose of Tracking Technologies</h3>
        <p className="mb-3">
          We use tracking technologies to improve our website, enhance user experience, and analyze the effectiveness of
          our marketing efforts.
        </p>

        <h3 className="text-xl font-medium mb-2">Managing Cookie Preferences</h3>
        <p className="mb-3">
          You can manage your cookie preferences through our cookie consent banner or by adjusting your browser
          settings. Most browsers allow you to refuse cookies or alert you when websites set or access cookies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>

        <h3 className="text-xl font-medium mb-2">Data Protection Officer</h3>
        <p className="mb-3">
          Our Data Protection Officer can be contacted at:{" "}
          <Link href="mailto:privacy@rakkaranta.fi" className="underline">
            privacy@rakkaranta.fi
          </Link>
        </p>

        <h3 className="text-xl font-medium mb-2">Privacy Questions or Concerns</h3>
        <p className="mb-3">
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:{" "}
          <Link href="mailto:privacy@rakkaranta.fi" className="underline">
            privacy@rakkaranta.fi
          </Link>{" "}
          or by phone at +358 XX XXX XXXX.
        </p>

        <h3 className="text-xl font-medium mb-2">Supervisory Authority</h3>
        <p className="mb-3">
          You have the right to lodge a complaint with the Finnish Data Protection Ombudsman if you believe that we have
          violated your data protection rights. Contact information can be found at{" "}
          <Link href="https://tietosuoja.fi/en" className="underline" target="_blank" rel="noopener noreferrer">
            https://tietosuoja.fi/en
          </Link>
          .
        </p>

        <h3 className="text-xl font-medium mb-2">Policy Updates</h3>
        <p className="mb-3">
          We may update this Privacy Policy from time to time. Any significant changes will be notified to you via email
          or a prominent notice on our website.
        </p>
      </section>

      <div className="border-t pt-6 mt-12">
        <p className="text-sm text-muted-foreground">Last updated: March 20, 2025</p>
        <p className="text-sm text-muted-foreground mt-2">
          For questions regarding this privacy policy, please contact us at{" "}
          <Link href="mailto:privacy@rakkaranta.fi" className="underline">
            privacy@rakkaranta.fi
          </Link>
        </p>
      </div>
    </div>
  )
}


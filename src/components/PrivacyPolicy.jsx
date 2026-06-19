export default function PrivacyPolicy({ brandColors }) {
  const teal = brandColors.teal;
  const gold = brandColors.gold;
  const serif = "'Cormorant Garamond', serif";

  const Section = ({ title, children }) => (
    <section className="mb-10">
      <h2 className="text-2xl font-light mb-4" style={{ fontFamily: serif, color: teal }}>{title}</h2>
      {children}
    </section>
  );

  const P = ({ children }) => (
    <p className="text-sm leading-[1.85] opacity-75 mb-3">{children}</p>
  );

  return (
    <div className="animate-fadeIn w-full">
      <div className="w-full px-6 md:px-12 lg:px-20 pt-16 pb-8 text-center">
        <p className="text-[10px] font-medium tracking-[0.28em] uppercase mb-3" style={{ color: gold }}>
          Legal
        </p>
        <h1 className="text-4xl md:text-5xl font-light mb-5" style={{ fontFamily: serif, color: teal }}>
          Privacy Policy
        </h1>
        <p className="text-sm opacity-60 max-w-md mx-auto leading-relaxed">
          Last updated: June 17, 2026
        </p>
        <div className="w-10 h-px mx-auto mt-5" style={{ backgroundColor: gold }} />
      </div>

      <div className="w-full px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-2xl mx-auto">

          <Section title="Who We Are">
            <P>
              Noor Creative Atelier ("we", "us", "our") operates the website
              noorcreativeatelier.com. This Privacy Policy explains how we collect,
              use, and protect your information when you visit our site.
            </P>
          </Section>

          <Section title="Information We Collect">
            <P>
              <strong style={{ color: teal }}>Information you provide directly:</strong> If
              you subscribe to our newsletter, contact us, or make a purchase through
              a third-party platform (such as Amazon or Gumroad), you may provide
              your name and email address.
            </P>
            <P>
              <strong style={{ color: teal }}>Information collected automatically:</strong> When
              you visit our site, certain data may be collected automatically,
              including your IP address, browser type, device type, pages visited,
              and referring URL. This data is collected through cookies and similar
              technologies.
            </P>
          </Section>

          <Section title="Cookies">
            <P>
              Our site uses cookies — small text files stored on your device — to
              improve your experience and enable certain functionality. The types of
              cookies we use include:
            </P>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-[1.85] opacity-75 mb-3">
              <li><strong style={{ color: teal }}>Essential cookies:</strong> Required for the site to function properly.</li>
              <li><strong style={{ color: teal }}>Analytics cookies:</strong> Help us understand how visitors interact with our site so we can improve it.</li>
              <li><strong style={{ color: teal }}>Advertising cookies:</strong> Used by third-party advertising partners (such as Google AdSense) to serve relevant ads and measure their effectiveness.</li>
            </ul>
            <P>
              You can control cookies through your browser settings. Disabling
              certain cookies may affect site functionality.
            </P>
          </Section>

          <Section title="Third-Party Advertising">
            <P>
              We may use third-party advertising companies, including Google AdSense,
              to serve ads when you visit our website. These companies may use
              cookies and web beacons to collect non-personally identifiable
              information (such as your browsing activity) in order to provide
              advertisements about goods and services that may interest you.
            </P>
            <P>
              Google's use of advertising cookies enables it and its partners to
              serve ads based on your visit to this site and/or other sites on the
              Internet. You may opt out of personalised advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noreferrer"
                className="underline"
                style={{ color: gold }}
              >
                Google Ads Settings
              </a>.
            </P>
          </Section>

          <Section title="How We Use Your Information">
            <ul className="list-disc pl-6 space-y-2 text-sm leading-[1.85] opacity-75 mb-3">
              <li>To deliver and improve our website and content</li>
              <li>To send newsletters and updates you have opted into</li>
              <li>To understand how visitors use our site (analytics)</li>
              <li>To display relevant advertisements</li>
              <li>To comply with legal obligations</li>
            </ul>
          </Section>

          <Section title="Third-Party Links">
            <P>
              Our site contains links to third-party websites (such as Amazon,
              Gumroad, and YouTube). We are not responsible for the privacy practices
              or content of those sites. We encourage you to review their privacy
              policies independently.
            </P>
          </Section>

          <Section title="Data Security">
            <P>
              We take reasonable measures to protect the information we collect.
              However, no method of transmission over the Internet is 100% secure,
              and we cannot guarantee absolute security.
            </P>
          </Section>

          <Section title="Children's Privacy">
            <P>
              Our website is intended for parents and families. We do not knowingly
              collect personal information from children under 13. If you believe a
              child has provided us with personal data, please contact us and we will
              promptly remove it.
            </P>
          </Section>

          <Section title="Your Rights">
            <P>
              Depending on your location, you may have the right to access, correct,
              or delete the personal information we hold about you. To exercise these
              rights, please contact us using the details below.
            </P>
          </Section>

          <Section title="Changes to This Policy">
            <P>
              We may update this Privacy Policy from time to time. Changes will be
              posted on this page with an updated revision date. We encourage you to
              review this page periodically.
            </P>
          </Section>

          <Section title="Contact Us">
            <P>
              If you have any questions about this Privacy Policy, you can reach us at:
            </P>
            <P>
              <strong style={{ color: teal }}>Email:</strong>{' '}
              <a href="mailto:noorcreativeatelier@gmail.com" className="underline" style={{ color: gold }}>
                noorcreativeatelier@gmail.com
              </a>
            </P>
          </Section>

        </div>
      </div>
    </div>
  );
}

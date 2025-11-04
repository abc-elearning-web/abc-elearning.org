"use client";
import React from "react";
import Footer from "@/components/footer/footer";
import Head from "./head";

const EduPassPrivacyPolicy: React.FC = () => {
  return (
    <>
      <Head />
      <div className="edupass-policy-container">
        <div className="policy-content">
          {/* Header */}
          <header className="policy-header">
            <h1 className="policy-title">Privacy Policy</h1>
            <p className="policy-date">Effective Date: October 20, 2025</p>
          </header>

          {/* Introduction */}
          <section className="policy-section">
            <h2 className="section-title">Introduction</h2>
            <p className="section-text">
              At EduPass ("we," "our," or "us"), protecting your privacy is one
              of our top priorities. This Privacy Policy outlines how we
              collect, use, and protect your personal information when you use
              our learning platform (the "App").
            </p>
          </section>

          {/* Entity Information */}
          <section className="policy-section">
            <h2 className="section-title">Entity Information</h2>
            <p className="section-text">
              This Privacy Policy applies to EduPass, the App's developer, which
              is available on the Google Play Store.
            </p>
            <p className="section-text">
              This page explains our policy regarding the collection, use, and
              disclosure of personal information for users who choose to access
              or use our Service.
            </p>
            <p className="section-text">
              By using our Service, you agree to the collection and use of
              information as described in this Policy. Any personal information
              collected will only be used to operate and improve our Service. We
              do not sell or share your data except as stated in this Privacy
              Policy.
            </p>
            <p className="section-text">
              Unless defined otherwise in this document, the terms used in this
              Privacy Policy shall bear the same meanings as those in our Terms
              and Conditions, which can be accessed through our App.
            </p>
          </section>

          {/* Information Collection and Usage */}
          <section className="policy-section">
            <h2 className="section-title">Information Collection and Usage</h2>
            <p className="section-text">
              To provide you with a better user experience, we may request
              certain personally identifiable information. This data will be
              securely stored and used in accordance with this Policy.
            </p>
            <p className="section-text">
              The App integrates third-party services that may collect data to
              help identify users or analyze usage patterns.
            </p>
            <div className="highlight-box">
              <p className="highlight-title">
                Third-party services used by the App include:
              </p>
              <ul className="service-list">
                <li>
                  <a
                    href="https://www.google.com/policies/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Play Services
                  </a>
                </li>
                <li>
                  <a
                    href="https://firebase.google.com/policies/analytics"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Analytics for Firebase
                  </a>
                </li>
                <li>
                  <a
                    href="https://firebase.google.com/support/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Firebase Crashlytics
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.google.com/admob/answer/6128543"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Admob
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Log Data */}
          <section className="policy-section">
            <h2 className="section-title">Log Data</h2>
            <p className="section-text">
              Whenever you use our Service and an error occurs within the App,
              certain data and information may be automatically collected
              through third-party tools on your device, known as Log Data. This
              Log Data can include details such as your device's Internet
              Protocol (IP) address, device name, operating system version, app
              configuration at the time of use, time and date of access, and
              other relevant technical statistics.
            </p>
          </section>

          {/* Non-Governmental Entity Notice */}
          <section className="policy-section">
            <h2 className="section-title">Non-Governmental Entity Notice</h2>
            <p className="section-text">
              This App is an independent service and is not associated with or
              endorsed by any government agency or authority.
            </p>
          </section>

          {/* Cookies */}
          <section className="policy-section">
            <h2 className="section-title">Cookies</h2>
            <p className="section-text">
              Cookies are small data files that often serve as anonymous unique
              identifiers. They are sent to your browser by the websites you
              visit and stored on your device's internal memory.
            </p>
            <p className="section-text">
              While our Service does not directly use "cookies", some
              third-party tools or libraries integrated into the App may use
              cookies to gather information and enhance their performance. You
              can choose to accept or decline cookies, as well as receive
              notifications when a cookie is being sent to your device. Please
              note that if you choose to decline cookies, certain features of
              the Service may not function properly.
            </p>
          </section>

          {/* Third-Party Service Providers */}
          <section className="policy-section">
            <h2 className="section-title">Third-Party Service Providers</h2>
            <p className="section-text">
              We may engage external companies or individuals for the following
              purposes:
            </p>
            <ul className="policy-list">
              <li>To operate and maintain our Service;</li>
              <li>To provide the Service on our behalf;</li>
              <li>To assist with Service-related activities; or</li>
              <li>To analyze how users interact with our Service.</li>
            </ul>
            <p className="section-text">
              These third parties may have access to your personal information
              strictly for performing their assigned tasks and are contractually
              obligated not to disclose or use it for any other reason.
            </p>
          </section>

          {/* Purchases and Subscriptions */}
          <section className="policy-section">
            <h2 className="section-title">Purchases and Subscriptions</h2>
            <p className="section-text">
              Some features of the App may require payment or a subscription.
              When you make a purchase, your account will be billed based on the
              terms displayed during checkout.
            </p>
            <div className="info-grid">
              <div className="info-card">
                <h3 className="info-card-title">Subscription Terms</h3>
                <p className="info-card-text">
                  Auto-renewing subscriptions are charged periodically until
                  canceled in your account settings.
                </p>
              </div>
              <div className="info-card">
                <h3 className="info-card-title">Refund Policy</h3>
                <p className="info-card-text">
                  Payments are non-refundable. No refunds are provided for
                  unused or partial subscription periods.
                </p>
              </div>
              <div className="info-card">
                <h3 className="info-card-title">Payment Processing</h3>
                <p className="info-card-text">
                  Transactions are handled by third-party payment providers in
                  accordance with their own terms and privacy policies. EduPass
                  is not responsible for issues such as service downtime or
                  outages of these external providers.
                </p>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="policy-section">
            <h2 className="section-title">Security</h2>
            <p className="section-text">
              We value the trust you place in us by sharing your personal
              information, and we strive to protect it using commercially
              reasonable security measures. However, please keep in mind that no
              method of data transmission over the internet or method of
              electronic storage is completely secure or error-free. Therefore,
              while we work to safeguard your information, we cannot guarantee
              its absolute security.
            </p>
          </section>

          {/* Links to External Sites */}
          <section className="policy-section">
            <h2 className="section-title">Links to External Sites</h2>
            <p className="section-text">
              Our Service may include links to external websites. When you click
              on a third-party link, you will be redirected to that external
              site. Please note that these websites are not operated or
              controlled by us. Thus, we strongly recommend that you review the
              Privacy Policy of any website you visit, as we have no
              responsibility for the content, privacy practices, or operations
              of third-party sites or services.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="policy-section">
            <h2 className="section-title">Children's Privacy</h2>
            <p className="section-text">
              Our Services are not directed toward individuals under the age of
              13. We do not knowingly collect any personal information from
              children under 13 years old. If we discover that a child under 13
              has provided personal data, we will promptly delete it from our
              records. If you are a parent or guardian and believe that your
              child has shared personal information with us, please contact us
              so we can take the appropriate action.
            </p>
          </section>

          {/* In-App Purchases and Subscription Management */}
          <section className="policy-section">
            <h2 className="section-title">
              In-App Purchases and Subscription Management
            </h2>
            <p className="section-text">
              If you purchase an auto-renewing subscription, your account will
              continue to be billed on a recurring basis until you cancel it as
              described below.
            </p>
            <p className="section-text">
              If you wish to stop automatic renewals or modify your
              subscription, please contact Google Support and follow their
              instructions to manage or cancel your subscription.
            </p>
            <p className="section-text">
              Developers reserve the right to change, adjust, or update
              subscription pricing at any time. We are not responsible to you or
              any third party for exercising these rights.
            </p>
            <p className="section-text">
              By completing a purchase, you agree to pay all fees and applicable
              taxes associated with your account, whether incurred by you or by
              anyone using your registered account. You must ensure that all
              purchase and billing information provided is accurate, complete,
              and up-to-date. Any applicable taxes related to purchases or
              transactions are your responsibility.
            </p>
          </section>

          {/* Payment Processors */}
          <section className="policy-section">
            <h2 className="section-title">Payment Processors</h2>
            <p className="section-text">
              All subscription-related transactions are handled by third-party
              payment processors in accordance with their respective terms of
              service, privacy policies, and applicable payment conditions. We
              encourage you to review the policies and practices of these
              third-party providers to understand how your data is managed.
            </p>
            <p className="section-text">
              Please note that we are not responsible for the actions,
              omissions, or performance of any third-party payment processor,
              including but not limited to system downtime, technical errors, or
              payment service interruptions.
            </p>
          </section>

          {/* Refund Policy */}
          <section className="policy-section">
            <h2 className="section-title">Refund Policy</h2>
            <p className="section-text">
              All payments made through our Service are nonrefundable. We do not
              issue refunds for subscriptions or partially used billing periods.
            </p>
            <p className="section-text">
              If you cancel your subscription, you will retain access to the
              app's premium features until the end of your current billing
              cycle.
            </p>
          </section>

          {/* User Registration */}
          <section className="policy-section">
            <h2 className="section-title">User Registration</h2>
            <p className="section-text">
              When registering for an account, you agree to:
            </p>
            <ul className="policy-list">
              <li>Provide accurate and complete information as requested;</li>
              <li>
                Keep your login credentials and subscription details
                confidential; and
              </li>
              <li>
                Accept full responsibility for all activity conducted under your
                registered account.
              </li>
            </ul>
            <p className="section-text">
              Our Service is not intended for children under the age of 13. We
              do not knowingly collect or store personal information from anyone
              under 13 years old. If we identify that a child under 13 has
              provided us with personal data, we will take immediate steps to
              delete that information from our records. If you are a parent or
              guardian and believe that your child has shared personal
              information with us, please contact us so we can take the
              appropriate action.
            </p>
          </section>

          {/* Changes to This Privacy Policy */}
          <section className="policy-section">
            <h2 className="section-title">Changes to This Privacy Policy</h2>
            <p className="section-text">
              We may revise or update this Privacy Policy periodically. Thus,
              you are recommended to review this page regularly for any updates.
              Any modifications will take effect immediately upon posting the
              new version on this page.
            </p>
            <p className="section-text">
              The effective date of this policy is October 20, 2025
            </p>
          </section>

          {/* Contact Us */}
          <section className="policy-section contact-section">
            <h2 className="section-title">Contact Us</h2>
            <p className="section-text">
              If you have any questions, concerns, or suggestions regarding this
              Privacy Policy, please reach out to us:
            </p>
            <div className="contact-box">
              <p className="contact-info">
                <strong>Email:</strong>{" "}
                <a href="mailto:andao971904@gmail.com">andao971904@gmail.com</a>
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EduPassPrivacyPolicy;

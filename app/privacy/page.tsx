'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-24">
      <Card className="bg-black/80 backdrop-blur-md border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white text-3xl font-serif">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Introduction</h2>
            <p className="text-white/80">
              This Privacy Policy describes how Wellness Notebook collects or uses your Personal Data. We take your privacy very seriously as it is at the heart of our relationship and the building of a strong community bound by respect and trust.
            </p>
            <p className="text-white/80">
              This policy outlines our commitment to and management of the data you share on our website. We will only collect information where we must do so, and we will only collect information if it is relevant to our dealings with you or otherwise relates to our services. All use of your personal information will be in the manner set out in this Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Definitions</h2>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li><strong>You (r)</strong> - Any user of this site outside the management team.</li>
              <li><strong>Us/We/Our</strong> - Owners and managers of the website: www.thewelnessnotebook.com</li>
              <li><strong>Personal Data</strong> - Any information relating to an identified or identifiable natural person, such as name, an identification number, location data, e-mail address, telephone number, etc.</li>
              <li><strong>Data Protection Law</strong> - The Data Protection Act, No. 24 of 2019, and its attendant regulations thereunder.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Our Privacy Principles</h2>
            <p className="text-white/80 mb-4">Collection of Personal Data is guided by the following principles:</p>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>The collection demonstrates good faith on your part while using our services and sharing information.</li>
              <li>The consent you provide.</li>
              <li>Public interest, such as health and security purposes, but within the context of the law.</li>
              <li>We may request personal data for marketing our services and website. In which case, we shall seek full details of the information that we would like and the reason we need it.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Information Collected</h2>
            <p className="text-white/80 mb-4">The Personal Data that we collect depends on the context of your interactions with our website/blogs/social media pages. It includes but is not limited to the following:</p>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Internet Protocol (IP) addresses, browser type, browser version, the pages of our website that you visit, the time and date of your visit, the time spent and other statistics which are collected automatically when you visit our website.</li>
              <li>Your financial and transactional data when you use and pay for our services.</li>
              <li>Your contact information (phone number and e-mail address), such as when you call us, place an order for delivery or interact with us through social media platforms or email.</li>
              <li>Cookies to track your activity and interactions when visiting our website. You can instruct your browser to refuse all cookies, permit a limited number of cookies, accept all cookies, or indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions or the full functionality of our website.</li>
              <li>Your name, email address and phone number when registering for group membership on social media.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Use of Personal Information</h2>
            <p className="text-white/80 mb-4">We will only use your personal information for the purposes for which we collected it, unless we reasonably consider that we need to use it for another reason and that reason is compatible with the original purpose. If we need to use your personal information for an unrelated purpose, we will seek your approval.</p>
            <p className="text-white/80 mb-4">We may use and analyse your information for the following purposes:</p>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Understanding you better from your previous posts or queries.</li>
              <li>Customer service enhancement</li>
              <li>Preventing and detecting fraud or other crimes.</li>
              <li>In business practices, including quality control, training, and ensuring effective system operations.</li>
              <li>To recognise you during subsequent visits to our website and develop customised information suited to your interests and needs.</li>
              <li>To protect your interests (or someone else's interests regarding security, health and safety, and public health regulations).</li>
              <li>To send you marketing and promotional communications, subject to your consent.</li>
              <li>To contact you about your use of our website or any related business and service cooperation</li>
              <li>To collect aggregated demographic information for our business operations and strategies. This sharing does not include any Personal Data that can identify any person.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Third-Party Websites</h2>
            <p className="text-white/80">
              If you click on a link to a Third-Party website, you will be taken to a website we do not control, and our Privacy Policy will no longer be in effect. Your browsing and interaction on any other website are subject to the terms of use and privacy, and other policies of such Third-Party website.
            </p>
            <p className="text-white/80">
              We are not responsible or liable for the information or content on such Third-Party websites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Retention Period</h2>
            <p className="text-white/80">
              We retain your Data for as long as is required to fulfil the activities set out in this Privacy Policy, for as long as otherwise communicated to you or for as long as is permitted by the legally prescribed periods.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Marketing Communications and Promotions</h2>
            <p className="text-white/80">
              We may use and analyse your information to send you marketing and promotional communications for which you have consented and opted in. When you consent and opt in to receiving our information, we may also send you other information about us, the website, our products, sales promotions, our newsletters, and anything relating to the website services and affiliated activities.
            </p>
            <p className="text-white/80">
              In all cases, we shall give you the option to opt out or unsubscribe or just call or write an email with specific requests and instructions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Information Safety</h2>
            <p className="text-white/80">
              We intend to keep your Data safe, and we have put in place appropriate technical, organisational and security measures to ensure the integrity, availability, and confidentiality of your data via available control measures.
            </p>
            <p className="text-white/80">
              We aim to create a relationship of mutual trust, and the security of your Personal Data is important to us. However, we cannot guarantee its absolute security due to the complexity of the issues involved. But we shall do our best to protect your Data without any malice or prejudice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Information from Minors</h2>
            <p className="text-white/80">
              Our website carries information for use by adults. Hence, we do not at any time knowingly/intentionally collect or target information regarding persons under eighteen (18) years of age.
            </p>
            <p className="text-white/80">
              A minor can only use our website under the supervision of a parent or legal guardian who agrees to be bound by this Privacy. If we become aware that we have collected Personal Data from children without verification of parental or guardian consent, we shall delete the information.
            </p>
            <p className="text-white/80">
              If you become aware of any data, we have collected regarding minors, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Your Privacy Rights</h2>
            <p className="text-white/80 mb-4">Subject to legal and contractual exceptions, you have rights under data protection laws about your Data. These are listed below:</p>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Right to be informed that we are collecting Personal Data about you.</li>
              <li>Right to access Personal Data that we hold about you and request information about how we process it.</li>
              <li>Right to request that we correct your Data where it is inaccurate or incomplete.</li>
              <li>Right to request that we erase your Data.</li>
              <li>Right to object and withdraw your consent to the processing of your Data where we are relying on consent to process your Data.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Modifications/Amendments to This Policy</h2>
            <p className="text-white/80">
              We reserve the right to modify and update this Privacy Policy from time to time. We will bring these changes to your attention should they be indicative of a fundamental change to the processing, or be relevant to the nature of the processing or be relevant to you and impact your data protection rights.
            </p>
            <p className="text-white/80">
              Any amendment or modification to this Privacy Policy will take effect from the date of notification on our website.
            </p>
          </section>

          <section>
            <h2 className="text-white/90 text-2xl font-serif mb-4">Contact Us About This Policy</h2>
            <p className="text-white/80">
              If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or want more information, contact us as follows:
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
} 
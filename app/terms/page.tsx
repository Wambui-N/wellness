'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto py-24">
      <Card className="bg-black/80 backdrop-blur-md border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white text-3xl font-serif">Terms and Conditions of Use and Participation</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Introduction</h2>
            <p className="text-white/80">
              This website is for everyone. It is an interactive platform for sharing experiences in the wellness journey. The aim is the democratisation of knowledge and information about healthcare services in our country, while challenging healthcare providers to be more responsive.
            </p>
            <p className="text-white/80">
              We aim to become the number one digital platform for sharing experiences, useful information, chit-chat and gossip about health and wellness. Every adult is welcome and encouraged to participate, subject to the following general rules and terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Good Faith and Ethics</h2>
            <p className="text-white/80">
              The website and its affiliated social media pages shall not wage hate or vendetta against any healthcare provider, whether private or public, individual or institutional. We shall support any criticism made in good faith. However, the admin retains the discretion to vet posts to curb malice or deliberate falsification.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Embrace Diversity. Be sensitive. Be responsible</h2>
            <p className="text-white/80 mb-4">
              We are building a community of shared experiences. This may involve discussing personally intimate experiences. Our interactions must be sensitive and respectful to cultivate an atmosphere of mutual trust and a sense of family.
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Do not be rude, abusive or judgmental to anybody seeking help in the group.</li>
              <li>Appreciate and respect our diversity; refrain from any bullying or prejudicial attitude towards other people's identities, be it cultural, religious, gender, or age.</li>
              <li>Offenders will be blocked at the discretion of the admin.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">No Unauthorised Business Marketing</h2>
            <p className="text-white/80">
              All advertisements or promotions on the website must be channelled through the admin. Unapproved adverts will be deleted, and repeat offenders will be blocked.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Have Fun</h2>
            <p className="text-white/80">
              Humour and laughter are core objectives of the website. Go ahead and light the moment! Share with us that "unserious" thing you encountered at the doctor's clinic, the ward, and even in the theatre. Make us laugh, but all in the context of wellness.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">No Politics; No Religion</h2>
            <p className="text-white/80">
              Partisan political opinions are not allowed on the website or social media to safeguard our diversity. Political sentiments may be tolerated under special circumstances, but the discretion remains with the admin.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Promote the Site</h2>
            <p className="text-white/80">
              We encourage all members to promote the site by inviting their friends and associates to subscribe and become active members. Stronger together.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Generosity and Kindness</h2>
            <p className="text-white/80">
              We're all in this together; let us cultivate and champion a culture of love and community. Arise and support each other generously by sharing personal experiences, information and tips on how to cope with situations, ailments and circumstances. Let us cultivate a strong and vibrant community of self-support, always guided by a deep spirit of human kindness and empathy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">No Spam. No Plagiarism</h2>
            <p className="text-white/80">
              Acknowledge and disclose borrowed information. Don't spam the site with superfluous or irrelevant information or share unnecessary external links.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Respect Others' Privacy</h2>
            <p className="text-white/80">
              People will share a lot of confidential and personal information in search of emotional support and advice. Respect their privacy; protect their dignity. It behoves every member to be mature and understanding. We will block those who offend this principle.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Talk to the Admin/s</h2>
            <p className="text-white/80">
              If you have questions or concerns, contact the admins or moderators.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-white/90 text-2xl font-serif mb-4">Protect the Site Integrity</h2>
            <p className="text-white/80">
              All of us must keep our group values intact. If you see someone breaking the rules, please alert the admins for appropriate action. Also, feel free to make proposals on how best we can manage the site and maximise its utility value to the members.
            </p>
          </section>

          <section>
            <h2 className="text-white/90 text-2xl font-serif mb-4">Information in Good Faith. No Obligation</h2>
            <p className="text-white/80">
              The group exists to advance our collective wellness by sharing information. Opinions and advice from group members are provided in good faith, but we do not take responsibility for accuracy. Relying on them is at your sole risk. Membership and contributions to the group are predicated on your agreement to defend, indemnify and hold harmless The Wellness Notebook for any consequences.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
} 
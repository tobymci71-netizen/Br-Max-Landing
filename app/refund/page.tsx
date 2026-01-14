import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RefundPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20">
              <span className="text-xs text-accent-primary font-semibold tracking-wide">LEGAL</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Cancellation & Refund Policy</h1>
            <p className="text-muted-foreground">
              Understanding our cancellation and refund procedures
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-card border border-border p-8 md:p-10">
            <div className="prose prose-sm md:prose-base max-w-none">
              <p className="text-muted-foreground mb-6 pb-6 border-b border-border">
                <strong className="text-foreground">Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">1.</span> Refund Eligibility
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  At BRMAX, we strive to ensure customer satisfaction with our services. We understand that
                  circumstances may arise where you need to request a refund.
                </p>
                <div className="bg-accent-primary/5 border-l-4 border-accent-primary rounded-r-lg p-5 my-4">
                  <p className="text-foreground font-semibold mb-2">⏰ Important Time Limit</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Refund requests must be submitted within <strong className="text-foreground">24 hours of the original purchase</strong>.
                    After this period, refund requests will not be applicable or processed.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">2.</span> How to Request a Refund
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To request a refund within the eligible timeframe, please follow these steps:
                </p>
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground ml-4">
                  <li className="leading-relaxed">
                    Contact our support team at{' '}
                    <a href="mailto:help@brmax.xyz" className="text-accent-primary hover:underline font-medium">
                      help@brmax.xyz
                    </a>
                  </li>
                  <li className="leading-relaxed">
                    Include your order number or transaction ID in the subject line
                  </li>
                  <li className="leading-relaxed">
                    Provide a brief explanation for your refund request
                  </li>
                  <li className="leading-relaxed">
                    Our team will review your request and respond within 24-48 business hours
                  </li>
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">3.</span> Refund Processing
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Once your refund request is approved:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li className="leading-relaxed">
                    Refunds will be processed to the original payment method used for the purchase
                  </li>
                  <li className="leading-relaxed">
                    Processing time typically takes 5-10 business days, depending on your financial institution
                  </li>
                  <li className="leading-relaxed">
                    You will receive a confirmation email once the refund has been initiated
                  </li>
                  <li className="leading-relaxed">
                    Access to the service will be revoked upon refund approval
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">4.</span> Cancellation Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You may cancel your subscription or service at any time by creating a support ticket on our discord server.
                </p>
                <div className="bg-background rounded-xl border border-border p-5 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Subscription Cancellations</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      If you cancel a subscription, you will retain access to the service until the end of your
                      current billing period. No refunds will be provided for partial billing periods.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">New Subscriptions</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      New subscriptions are eligible for refunds only within the 24-hour window as specified above.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">5.</span> Non-Refundable Items
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The following items are not eligible for refunds under any circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li className="leading-relaxed">
                    Services or products purchased more than 24 hours ago
                  </li>
                  <li className="leading-relaxed">
                    Promotional or discounted items marked as &quot;non-refundable&quot;
                  </li>
                  <li className="leading-relaxed">
                    Gift cards or promotional credits
                  </li>
                  <li className="leading-relaxed">
                    Services that have been fully consumed or utilized
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">6.</span> Exceptional Circumstances
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  In cases of technical issues, service outages, or billing errors on our part, we may offer
                  refunds or credits at our discretion, even outside the standard 24-hour window. Please contact us on discord to discuss your specific situation.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">7.</span> Disputes and Chargebacks
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We encourage you to contact us directly before initiating a chargeback with your financial
                  institution. Chargebacks may result in immediate suspension of your account and services.
                  We are committed to resolving any billing concerns fairly and promptly.
                </p>
              </section>

              <section className="mb-0 pt-6 border-t border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">8.</span> Questions About Refunds?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about our cancellation and refund policy, or need assistance with
                  a refund request, please don&apos;t hesitate to reach out:
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:help@brmax.xyz"
                    className="inline-flex items-center gap-2 text-accent-primary hover:underline font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    help@brmax.xyz
                  </a>
                  <a
                    href="https://studio.brmax.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent-primary hover:underline font-medium"
                  >
                    Visit BRMAX Studio
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

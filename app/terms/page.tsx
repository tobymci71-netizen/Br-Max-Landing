import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsAndConditions() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20">
              <span className="text-xs text-accent-primary font-semibold tracking-wide">LEGAL</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Terms & Conditions</h1>
            <p className="text-muted-foreground">
              Please read these terms carefully before using BRMAX services
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-card border border-border p-8 md:p-10">
            <div className="prose prose-sm md:prose-base max-w-none">
              <p className="text-muted-foreground mb-6 pb-6 border-b border-border">
                <strong className="text-foreground">Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">1.</span> Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using this service, you accept and agree to be bound by the terms and provision
                  of this agreement. If you do not agree to these terms, please do not use our service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">2.</span> Use License
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Permission is granted to temporarily access the materials on our service for personal,
                  non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">3.</span> User Responsibilities
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account and password. You agree
                  to accept responsibility for all activities that occur under your account.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">4.</span> Prohibited Uses
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You may not use our service for any illegal or unauthorized purpose. You must not transmit any
                  worms, viruses, or any code of a destructive nature.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">5.</span> Disclaimer
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The materials on our service are provided on an &apos;as is&apos; basis. We make no warranties, expressed
                  or implied, and hereby disclaim all other warranties including, without limitation, implied
                  warranties or conditions of merchantability.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">6.</span> Limitations
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall we or our suppliers be liable for any damages arising out of the use or
                  inability to use the materials on our service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">7.</span> Modifications
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may revise these terms of service at any time without notice. By using this service, you
                  are agreeing to be bound by the current version of these terms.
                </p>
              </section>

              <section className="mb-0 pt-6 border-t border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">8.</span> Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about these Terms & Conditions, please contact us at legal@brmax.xyz
                </p>
                <a
                  href="https://studio.brmax.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-primary hover:underline font-medium"
                >
                  Visit BRMAX Studio
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

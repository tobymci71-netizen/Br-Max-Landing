import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20">
              <span className="text-xs text-accent-primary font-semibold tracking-wide">LEGAL</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Learn how BRMAX protects and manages your data
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-card border border-border p-8 md:p-10">
            <div className="prose prose-sm md:prose-base max-w-none">
              <p className="text-muted-foreground mb-6 pb-6 border-b border-border">
                <strong className="text-foreground">Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">1.</span> Information We Collect
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We collect information that you provide directly to us, including when you create an account,
                  use our services, or communicate with us. This may include your name, email address, and other
                  contact information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">2.</span> How We Use Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use the information we collect to provide, maintain, and improve our services, to communicate
                  with you, and to protect our users and services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">3.</span> Information Sharing
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell your personal information. We may share your information with service providers
                  who perform services on our behalf, or when required by law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">4.</span> Data Security
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">5.</span> Your Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You have the right to access, correct, or delete your personal information. You may also have
                  the right to restrict or object to certain processing of your data.
                </p>
              </section>

              <section className="mb-0 pt-6 border-t border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-accent-primary">6.</span> Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, please contact us at privacy@brmax.xyz
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

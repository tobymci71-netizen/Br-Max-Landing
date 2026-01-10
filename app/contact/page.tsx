import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20">
              <span className="text-xs text-accent-primary font-semibold tracking-wide">SUPPORT</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Contact Us</h1>
            <p className="text-muted-foreground">
              Get in touch with our team - we&apos;re here to help
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-card border border-border p-8 md:p-10">
            <div className="prose prose-sm md:prose-base max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">We&apos;re Here to Help</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Have questions, feedback, or need assistance? Our team is ready to support you.
                  Reach out through any of the channels below and we&apos;ll get back to you as soon as possible.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="text-accent-primary">💬</span> Discord Community
                </h2>
                <div className="bg-background rounded-xl border border-border p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Join our Discord community to connect with other users, get real-time support,
                    and stay updated with the latest news and features.
                  </p>
                  <a
                    href="https://discord.gg/6ECnujbEYq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    Join Our Discord
                  </a>
                  <p className="text-muted-foreground text-sm mt-3">
                    Get instant help from our community and team members.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="text-accent-primary">📧</span> Email Support
                </h2>
                <div className="bg-background rounded-xl border border-border p-6">
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    For general inquiries, technical support, or any questions about our services:
                  </p>
                  <a
                    href="mailto:help@brmax.xyz"
                    className="inline-flex items-center gap-2 text-accent-primary hover:underline font-semibold text-lg"
                  >
                    help@brmax.xyz
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                  <p className="text-muted-foreground text-sm mt-3">
                    We typically respond within 24 business hours.
                  </p>
                </div>
              </section>

              <section className="mb-0 pt-6 border-t border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Visit Our Studio</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Explore more about BRMAX and discover what we&apos;re building.
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

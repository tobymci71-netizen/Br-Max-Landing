"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background border-l border-r border-border max-w-6xl mx-auto">
      <div className="h-[100px] border-b border-border"></div>
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Brand */}
        <div className="p-8 border-border border-b md:border-r md:border-b-0">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-foreground mb-4"
          >
            <Image src={"BR.svg"} height={40} width={40} alt="Logo" />
          </Link>

          <p className="text-sm text-muted-foreground">
            Create stunning texting videos in minutes. Subscribe and your work
            never stops.
          </p>
        </div>

        {/* Product */}
        <div className="p-8 border-border border-b md:border-r md:border-b-0">
          <h4 className="text-foreground font-semibold mb-4 text-sm">Product</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <button
                onClick={() => scrollToSection("features")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("examples")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Examples
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </button>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="p-8 border-border border-b md:border-r md:border-b-0">
          <h4 className="text-foreground font-semibold mb-4 text-sm">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="p-8 border-border border-b md:border-b-0">
          <h4 className="text-foreground font-semibold mb-4 text-sm">Support</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <a
                href={`https://${process.env.NEXT_PUBLIC_STUDIO_BASE_URL}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-8 px-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} BR Max. All rights reserved.</p>
      </div>
    </footer>
  );
}

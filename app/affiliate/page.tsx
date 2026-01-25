"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

function SectionDivider({
  dotPositions = ["left", "right"],
}: {
  dotPositions?: string[];
}) {
  return (
    <div className="relative w-full">
      <div className="w-full h-px bg-border" />
      {dotPositions.map((pos, i) => (
        <div
          key={i}
          className="absolute top-0 w-1.5 h-1.5 bg-foreground rounded-full -translate-y-1/2"
          style={{
            left: pos === "left" ? 0 : pos === "right" ? "100%" : pos,
            transform:
              pos === "right"
                ? "translateX(-100%) translateY(-50%)"
                : pos === "left"
                ? "translateY(-50%)"
                : "translateX(-50%) translateY(-50%)",
          }}
        />
      ))}
    </div>
  );
}

function InnerDivider({ dotPositions = [] }: { dotPositions?: string[] }) {
  return (
    <div className="relative w-full">
      <div className="w-full h-px bg-border" />
      {dotPositions.map((pos, i) => (
        <div
          key={i}
          className="absolute top-0 w-1.5 h-1.5 bg-foreground rounded-full -translate-y-1/2"
          style={{
            left: pos === "left" ? 0 : pos === "right" ? "100%" : pos,
            transform:
              pos === "right"
                ? "translateX(-100%) translateY(-50%)"
                : pos === "left"
                ? "translateY(-50%)"
                : "translateX(-50%) translateY(-50%)",
          }}
        />
      ))}
    </div>
  );
}

function BackgroundDecoration() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <motion.div
        className="absolute top-20 -left-32 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 -right-32 w-80 h-80 bg-accent-secondary/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/3 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default function AffiliatePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [rewardsRef, rewardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [howItWorksRef, howItWorksInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [examplesRef, examplesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [whyJoinRef, whyJoinInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [rulesRef, rulesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const rewards = [
    {
      icon: "💰",
      title: "30% Lifetime Commission",
      description:
        "Earn 30% for every paying customer who signs up through your unique affiliate link. Passive income that keeps growing!",
      highlight: true,
    },
    {
      icon: "🏆",
      title: "$250 Prize",
      description:
        "For the person with the Most Purchased Referrals during the campaign period.",
      highlight: false,
    },
    {
      icon: "📈",
      title: "$250 Prize",
      description:
        "For the person with the Highest Viewed Video promoting BR Max.",
      highlight: false,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create the Content",
      description:
        "Make 15-20 second text videos with a quick 3-5 second BR Max promo at the end. Simple and effective!",
    },
    {
      number: "02",
      title: "Follow the Style",
      description:
        'Think viral "text-story" or "quick fire" style videos. We\'ll show you examples below that perform amazingly well.',
    },
    {
      number: "03",
      title: "Post Consistently",
      description:
        "It only takes 30-60 minutes a day to generate and post these videos across TikTok, Reels, and Shorts.",
    },
    {
      number: "04",
      title: "Get Discounted Access",
      description:
        "We provide you with a discounted version of BR Max specifically for creating these promotional videos.",
    },
  ];

  const exampleVideos = [
    {
      title: "Text Story Style",
      embedUrl: "https://www.youtube.com/embed/BV2pATVV5ds",
      platform: "YouTube Shorts",
    },
  ];

  const exampleChannels = [
    {
      name: "@parkour_text",
      platform: "TikTok",
      url: "https://www.tiktok.com/@parkour_text",
      description: "Great example of quick-fire text content",
    },
    {
      name: "@CaseohText",
      platform: "YouTube",
      url: "https://www.youtube.com/@CaseohText",
      description: "Viral text story format done right",
    },
  ];

  const rules = [
    {
      title: "Content Guidelines",
      items: [
        "Videos must be 15-20 seconds with a 3-5 second BR Max promo",
        "Content must be appropriate and follow platform guidelines",
        "Use your unique affiliate link in video descriptions",
        "Be authentic - don't make false claims about the product",
      ],
    },
    {
      title: "Eligibility",
      items: [
        "Must be 18 years or older to participate",
        "Must have an active social media account",
        "One affiliate account per person",
        "Prizes are paid via PayPal or crypto",
      ],
    },
    {
      title: "Tracking & Payment",
      items: [
        "Commissions are tracked via your unique link",
        "30-day cookie duration for referrals",
        "Minimum payout threshold: $50",
        "Payments processed monthly",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BackgroundDecoration />
      <Header />

      {/* Affiliate Banner */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_100%] text-white py-3"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-3">
          <span className="text-lg">💰</span>
          <span className="font-semibold text-sm md:text-base">
            AFFILIATE OPPORTUNITY
          </span>
          <span className="hidden sm:inline text-sm opacity-90">
            - Earn 30% commission + $500 in prizes!
          </span>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>

      <main>
        {/* Hero Section */}
        <section className="min-h-[80vh] flex items-center justify-center pt-32 border-l border-r border-border max-w-6xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent-primary/10 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-20 right-10 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div className="w-full py-16 px-8 relative z-10" ref={heroRef}>
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 rounded-full text-accent-primary text-sm font-medium mb-6"
                variants={fadeIn}
              >
                <span>🚀</span>
                <span>Limited Time Campaign</span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                Join the BR Max{" "}
                <span className="text-accent-primary">Affiliate Challenge</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Earn <span className="text-accent-primary font-semibold">30% lifetime commission</span> + compete for{" "}
                <span className="text-accent-secondary font-semibold">$500 in prizes!</span>
              </motion.p>

              <motion.p
                className="text-base text-muted-foreground max-w-xl mx-auto mb-10"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                We&apos;re looking for creators to help spread the word. If you want to make easy money by posting short-form content, this is for you!
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.a
                  href="#apply"
                  className="px-8 py-3 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90 transition-all text-base font-medium"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply Now
                </motion.a>
                <motion.a
                  href="#how-it-works"
                  className="px-8 py-3 bg-background text-foreground border border-border rounded-lg hover:bg-muted transition-colors text-base font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </motion.a>
              </motion.div>

              <motion.div
                className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground"
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <svg className="w-5 h-5 text-accent-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Winners announced in <span className="font-semibold text-foreground">Discord</span></span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto">
          <SectionDivider />
        </div>

        {/* Rewards Section */}
        <section className="border-l border-r border-border max-w-6xl mx-auto">
          <div ref={rewardsRef}>
            <motion.div
              className="text-center py-16 px-8"
              initial="hidden"
              animate={rewardsInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent-primary text-sm font-medium mb-4">
                The Rewards
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                What You Can Earn
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Multiple ways to earn with our affiliate program
              </p>
            </motion.div>

            <InnerDivider dotPositions={["left", "33.333%", "66.666%", "right"]} />

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3"
              initial="hidden"
              animate={rewardsInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {rewards.map((reward, index) => (
                <motion.div
                  key={index}
                  className={`py-12 px-8 flex flex-col items-center text-center relative ${
                    index > 0 ? "md:border-l border-border" : ""
                  } ${
                    index < rewards.length - 1
                      ? "border-b md:border-b-0 border-border"
                      : ""
                  } ${reward.highlight ? "bg-accent-primary/5" : ""}`}
                  variants={scaleIn}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                >
                  <motion.div
                    className="text-5xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {reward.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {reward.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {reward.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto">
          <SectionDivider />
        </div>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="border-l border-r border-border max-w-6xl mx-auto"
        >
          <div ref={howItWorksRef}>
            <motion.div
              className="text-center py-16 px-8"
              initial="hidden"
              animate={howItWorksInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent-primary text-sm font-medium mb-4">
                How It Works
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Simple Steps to Start Earning
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Follow these easy steps to become a successful BR Max affiliate
              </p>
            </motion.div>

            <InnerDivider dotPositions={["left", "25%", "50%", "75%", "right"]} />

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              initial="hidden"
              animate={howItWorksInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`py-12 px-6 border-border ${
                    index > 0 ? "lg:border-l" : ""
                  } ${index === 1 ? "md:border-l" : ""} ${
                    index === 2 ? "md:border-l lg:border-l" : ""
                  } ${index === 3 ? "md:border-l" : ""} ${
                    index > 0 ? "border-t md:border-t lg:border-t-0" : ""
                  } ${index === 2 ? "lg:border-t-0" : ""}`}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                >
                  <motion.div
                    className="text-4xl font-bold text-accent-primary/30 mb-4"
                    whileHover={{ scale: 1.1, color: "var(--accent-primary)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {step.number}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto">
          <SectionDivider />
        </div>

        {/* Example Videos Section */}
        <section className="border-l border-r border-border max-w-6xl mx-auto">
          <div ref={examplesRef}>
            <motion.div
              className="text-center py-16 px-8"
              initial="hidden"
              animate={examplesInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent-primary text-sm font-medium mb-4">
                Content Examples
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                See What Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Check out these viral text-story style videos for inspiration
              </p>
            </motion.div>

            <InnerDivider dotPositions={["left", "50%", "right"]} />

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-0"
              initial="hidden"
              animate={examplesInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {/* Video Example */}
              <motion.div
                className="p-8 border-border md:border-r"
                variants={scaleIn}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Example Video Style
                </h3>
                <div className="aspect-[9/16] max-w-[300px] mx-auto bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/BV2pATVV5ds"
                    title="Example Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  This is the style we&apos;re looking for - quick, engaging text stories
                </p>
              </motion.div>

              {/* Channel Examples */}
              <motion.div
                className="p-8 border-border border-t md:border-t-0"
                variants={scaleIn}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Channels to Study
                </h3>
                <div className="space-y-4">
                  {exampleChannels.map((channel, index) => (
                    <motion.a
                      key={index}
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">
                          {channel.name}
                        </span>
                        <span className="text-xs px-2 py-1 bg-accent-primary/10 text-accent-primary rounded">
                          {channel.platform}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {channel.description}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-accent-primary text-sm">
                        <span>Visit Channel</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-accent-secondary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Pro Tip:</span>{" "}
                    Study these channels to understand what makes their content viral. Then add your own creative twist!
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto">
          <SectionDivider />
        </div>

        {/* Why Join Section */}
        <section className="border-l border-r border-border max-w-6xl mx-auto">
          <div ref={whyJoinRef}>
            <motion.div
              className="text-center py-16 px-8"
              initial="hidden"
              animate={whyJoinInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent-primary text-sm font-medium mb-4">
                Why Join?
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                The Easiest Side Hustle of the Year
              </h2>
            </motion.div>

            <InnerDivider dotPositions={["left", "right"]} />

            <motion.div
              className="p-8 md:p-12"
              initial="hidden"
              animate={whyJoinInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Videos Make Themselves</h3>
                      <p className="text-sm text-muted-foreground">With BR Max, you can generate dozens of clips in minutes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent-secondary/10 flex items-center justify-center text-accent-secondary shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Passive Income</h3>
                      <p className="text-sm text-muted-foreground">Post everywhere and watch the commissions roll in.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Low Time Investment</h3>
                      <p className="text-sm text-muted-foreground">Only 30-60 minutes a day to create and post content.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent-secondary/10 flex items-center justify-center text-accent-secondary shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">$500 Prize Pool</h3>
                      <p className="text-sm text-muted-foreground">Compete for bonus prizes on top of your commissions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto">
          <SectionDivider />
        </div>

        {/* Rules & Conditions Section */}
        <section className="border-l border-r border-border max-w-6xl mx-auto">
          <div ref={rulesRef}>
            <motion.div
              className="text-center py-16 px-8"
              initial="hidden"
              animate={rulesInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent-primary text-sm font-medium mb-4">
                Rules & Conditions
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Program Guidelines
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Please review before applying
              </p>
            </motion.div>

            <InnerDivider dotPositions={["left", "33.333%", "66.666%", "right"]} />

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3"
              initial="hidden"
              animate={rulesInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {rules.map((rule, index) => (
                <motion.div
                  key={index}
                  className={`py-8 px-6 border-border ${
                    index > 0 ? "md:border-l" : ""
                  } ${
                    index < rules.length - 1
                      ? "border-b md:border-b-0"
                      : ""
                  }`}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {rule.title}
                  </h3>
                  <ul className="space-y-3">
                    {rule.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <svg
                          className="w-4 h-4 text-accent-primary flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto">
          <SectionDivider />
        </div>

        {/* CTA / Apply Section */}
        <section
          id="apply"
          className="border-l border-r border-border max-w-6xl mx-auto"
        >
          <div ref={ctaRef}>
            <motion.div
              className="py-20 px-8 text-center"
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="text-6xl mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Ready to Start?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                This campaign runs until <span className="font-semibold text-foreground">February 1st</span>.
                Don&apos;t miss out on the easiest side hustle of the year.
              </p>

              <div className="max-w-md mx-auto p-6 bg-muted/50 rounded-xl border border-border mb-8">
                <h3 className="font-semibold text-foreground mb-4">How to Apply</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary text-sm font-medium shrink-0">
                      1
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Join our Discord community
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary text-sm font-medium shrink-0">
                      2
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Open a ticket regarding the affiliate opportunity
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary text-sm font-medium shrink-0">
                      3
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get your unique link and discounted BR Max access!
                    </p>
                  </div>
                </div>
              </div>

              <motion.a
                href="https://discord.gg/brmax"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#5865F2] text-white rounded-lg hover:bg-[#4752C4] transition-all text-base font-medium"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px -10px rgba(88, 101, 242, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Join Discord & Apply
              </motion.a>

              <p className="mt-6 text-sm text-muted-foreground">
                Questions? Join our server and open a support ticket on Discord
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto">
          <SectionDivider />
        </div>
      </main>

      <Footer />
    </div>
  );
}

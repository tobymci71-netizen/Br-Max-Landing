"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import CountUp from "react-countup";
import Link from "next/link";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";


interface TikTokStats {
  likes: number;
  comments: number;
  shares: number;
  views: number;
  title: string;
}

interface TokenPackage {
  id: string;
  created_at: string;
  name: string;
  tokens: number;
  priceUSD: number;
  features: string[];
  popular: boolean;
}

interface CachedStats {
  data: Record<string, TikTokStats>;
  timestamp: number;
}

const CACHE_KEY = "tiktok_stats_cache";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Format large numbers (e.g., 20400 -> "20.4K")
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

// Full-width section divider with dots at edges only
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

// Inner horizontal divider within sections
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

export default function Home() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [tiktokStats, setTiktokStats] = useState<Record<string, TikTokStats>>(
    {}
  );
  const [statsLoading, setStatsLoading] = useState(true);
  const [tokenPackages, setTokenPackages] = useState<TokenPackage[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(true);

  // Define examples before hooks (to avoid "Cannot access variable before declaration" error)
  const examples = [
    {
      title: "@RIZZ APP they betrayed him... link in bio #textstories…",
      thumbnail: "/viral-story-texting-video-thumbnail.jpg",
      tiktokUrl:
        "https://www.tiktok.com/@texty.stories.daily/video/7597578004876856598",
      videoUrl: "https://br-max.s3.ap-south-1.amazonaws.com/ExampleVideo1_v2.mp4",
      fallbackStats: {
        views: 465000,
        likes: 17000,
        comments: 48,
        title: "@RIZZ APP they betrayed him... link in bio #textstories…",
      },
    },
    {
      title: "@RIZZ APP she got it right back... link in bio #textstories",
      thumbnail: "/reddit-drama-texting-video-thumbnail.jpg",
      tiktokUrl: "https://www.tiktok.com/@texty.stories.daily/video/7599790603211214102",
      videoUrl: "https://br-max.s3.ap-south-1.amazonaws.com/ExampleVideo2_v2.mp4",
      fallbackStats: {
        views: 291450,
        likes: 10450,
        comments: 54,
        title: "@RIZZ APP she got it right back... link in bio #textstories",
      },
    },
    {
      title: "part 2 anyone?... link in bio #textstories",
      thumbnail: "/aita-thread-texting-video-thumbnail.jpg",
      tiktokUrl: "https://www.tiktok.com/@speakingtexts/video/7600204876609686786",
      videoUrl: "https://br-max.s3.ap-south-1.amazonaws.com/ExampleVideo3_v2.mp4",
      fallbackStats: {
        views: 183785,
        likes: 9950,
        comments: 59,
        title: "part 2 anyone?... link in bio #textstories",
      },
    },
    {
      title: "@RIZZ APP pick a side... link in bio #textstories",
      thumbnail: "/text-confession-video-thumbnail.jpg",
      tiktokUrl: "https://www.tiktok.com/@speakingtexts/video/7598697536353832214",
      videoUrl: "https://br-max.s3.ap-south-1.amazonaws.com/ExampleVideo4_v2.mp4",
      fallbackStats: {
        views: 150545,
        likes: 7600,
        comments: 185,
        title: "@RIZZ APP pick a side... link in bio #textstories",
      },
    },
  ];

  // Add this new section data after your existing examples array
  const creatorProof = [
    {
      handle: "@texty.stories.daily",
      followers: "550.6K",
      totalLikes: "29M",
      profileImage: "/TiktokProfile_1.png",
      earningsImage: "/TiktokEarnings_1.webp",
      analyticsImage: "/TiktokAnalytics_1.webp",
      earnings: "$90,000+",
      period: "30 days",
      postViews: "87M",
      likes: "29M",
      rpm: "$1+",
    },
    {
      handle: "@speakingtexts",
      followers: "202.6K",
      totalLikes: "16.5M",
      profileImage: "/TiktokProfile_2.png",
      earningsImage: "/TiktokEarnings_2.webp",
      analyticsImage: "/TiktokAnalytics_2.webp",
      earnings: "$90,000+",
      period: "All time",
      postViews: "87M",
      likes: "16.5M",
      rpm: "$1+",
    },
  ];

  // Add intersection observer for the new section (add this with your other useInView hooks)
  const [creatorProofRef, creatorProofInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Fetch TikTok stats for all examples with caching
  useEffect(() => {
    const fetchAllStats = async () => {
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const cachedData: CachedStats = JSON.parse(cached);
          const now = Date.now();

          // Use cached data if it's less than 1 hour old
          if (now - cachedData.timestamp < CACHE_DURATION) {
            setTiktokStats(cachedData.data);
            setStatsLoading(false);
            return;
          }
        } catch (error) {
          console.error("Failed to parse cached data:", error);
        }
      }

      // Fetch fresh data if cache is invalid or expired
      const statsPromises = examples.map(async (example) => {
        if (!example.tiktokUrl) return null;

        try {
          const response = await fetch(
            `/api/tiktok-stats?url=${encodeURIComponent(example.tiktokUrl)}`
          );
          const result = await response.json();

          if (result.success && result.data) {
            return { url: example.tiktokUrl, stats: result.data };
          }
        } catch (error) {
          console.error(
            `Failed to fetch stats for ${example.tiktokUrl}:`,
            error
          );
        }
        return null;
      });

      const results = await Promise.all(statsPromises);
      const statsMap: Record<string, TikTokStats> = {};

      results.forEach((result) => {
        if (result) {
          statsMap[result.url] = {
            likes: result.stats.likes,
            comments: result.stats.comments,
            shares: result.stats.shares,
            views: result.stats.views,
            title: result.stats.title,
          };
        }
      });

      // Cache the new data
      const cacheData: CachedStats = {
        data: statsMap,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

      setTiktokStats(statsMap);
      setStatsLoading(false);
    };

    fetchAllStats();
  }, []);

  // Fetch token packages from API
  useEffect(() => {
    const fetchTokenPackages = async () => {
      try {
        const response = await fetch(`https://${process.env.NEXT_PUBLIC_STUDIO_BASE_URL}/api/token-packages`);
        if (response.ok) {
          const data: TokenPackage[] = await response.json();
          // @ts-expect-error It does exist
          setTokenPackages(data.packages);
        }
      } catch (error) {
        console.error('Failed to fetch token packages:', error);
      } finally {
        setPackagesLoading(false);
      }
    };

    fetchTokenPackages();
  }, []);

  // Animation variants
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

  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  };

  // Intersection observers for scroll animations
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [examplesRef, examplesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [pricingRef, pricingInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [bentoRef, bentoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Create intersection observers for each example card
  const [card0Ref, card0InView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [card1Ref, card1InView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [card2Ref, card2InView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [card3Ref, card3InView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const cardRefs = [card0Ref, card1Ref, card2Ref, card3Ref];
  const cardInViews = [card0InView, card1InView, card2InView, card3InView];

  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Lightning Fast",
      description:
        "Create professional texting videos in minutes, not hours. Our streamlined workflow gets you from idea to export faster than ever.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "iMessage Authentic",
      description:
        "Pixel-perfect iMessage interface that looks 100% real. Your audience won't know it's generated - that's the magic.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Continuous Progress",
      description:
        "Subscribe and keep your projects moving non-stop. Monthly plans ensure your work never pauses - consistent output, every single month.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      ),
      title: "Export Ready",
      description:
        "Download high-quality MP4 files optimized for TikTok, Instagram, YouTube Shorts, and every social platform.",
    },
  ];

  const faqs = [
    {
      question: "How does the subscription work?",
      answer:
        "With your subscription, you get continuous access to all features and consistent video generation every month. Your work never stops - as long as you're subscribed, we keep delivering results.",
    },
    {
      question: "What video formats do you support?",
      answer:
        "We export in MP4 format optimized for all major social platforms including TikTok, Instagram Reels, YouTube Shorts, and more. Videos are rendered in Full HD (1080p) quality.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Yes! We offer a money-back guarantee. If you're not satisfied with BR Max, contact us within 24 hours of purchase for a full refund. See our refund policy for details.",
    },
    {
      question: "What happens with my subscription?",
      answer:
        "Your subscription keeps everything running smoothly month after month. Continuous service, continuous results - your momentum never stops as long as you're with us.",
    },
    {
      question: "How realistic do the videos look?",
      answer:
        "Our iMessage interface is pixel-perfect and indistinguishable from real conversations. We've spent countless hours ensuring every detail matches authentic iOS messaging.",
    },
    {
      question: "Can I customize the conversations?",
      answer:
        "You have full control over messages, timing, contact names, profile pictures, and more. Create exactly the story you want to tell.",
    },
  ];

  const bentoItems = [
    {
      title: "Built-in Silence Remover",
      description:
        "Create snappy, fast-paced videos by automatically removing pauses between text. Perfect for keeping viewers engaged with rapid-fire content.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      colSpan: "md:col-span-2",
      rowSpan: "",
    },
    {
      title: "Real-Time Preview",
      description:
        "See your video come to life as you edit. No waiting for renders—instant feedback for faster iteration and creative flow.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      colSpan: "",
      rowSpan: "md:row-span-2",
    },
    {
      title: "Rizz Monetization",
      description:
        "Integrate monetization opportunities directly into your videos. Turn your content into revenue.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      colSpan: "",
      rowSpan: "",
    },
    {
      title: "Lightning Fast Generation",
      description:
        "Get your videos rendered quickly so you can publish faster. Speed depends on video length.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      colSpan: "",
      rowSpan: "",
    },
    {
      title: "6 Minute Max Length",
      description:
        "Create longer videos up to 6 minutes—more than double the 2.5 min limit of other apps. Tell complete stories.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 4V2m0 2a2 2 0 00-2 2v1h10V6a2 2 0 00-2-2H7zm-4 5h14M5 9v10a2 2 0 002 2h6a2 2 0 002-2V9H5z"
          />
        </svg>
      ),
      colSpan: "md:col-span-2",
      rowSpan: "",
    },
    {
      title: "Community-Driven Features",
      description:
        "We build what you need. Submit feature requests and earn 500+ tokens when your suggestion gets implemented.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      colSpan: "",
      rowSpan: "",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BackgroundDecoration />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-32 border-l border-r border-border max-w-6xl mx-auto relative overflow-hidden">
          {/* Background Graphics */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

            {/* Gradient orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent-primary/10 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-20 right-10 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 rounded-full blur-3xl" />

            {/* Decorative lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="lineGrad1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--accent-primary)"
                    stopOpacity="0.1"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--accent-secondary)"
                    stopOpacity="0.1"
                  />
                </linearGradient>
              </defs>
              <path
                d="M0 200 Q 400 100 800 200 T 1600 200"
                stroke="url(#lineGrad1)"
                strokeWidth="1"
                fill="none"
                className="opacity-50"
              />
              <path
                d="M0 400 Q 400 300 800 400 T 1600 400"
                stroke="url(#lineGrad1)"
                strokeWidth="1"
                fill="none"
                className="opacity-30"
              />
            </svg>

            {/* Floating dots */}
            <div
              className="absolute top-32 right-20 w-2 h-2 bg-accent-primary/40 rounded-full animate-bounce"
              style={{ animationDuration: "3s" }}
            />
            <div
              className="absolute top-48 left-32 w-1.5 h-1.5 bg-accent-secondary/40 rounded-full animate-bounce"
              style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
            />
            <div
              className="absolute bottom-40 right-40 w-2 h-2 bg-accent-primary/30 rounded-full animate-bounce"
              style={{ animationDuration: "4s", animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-60 left-20 w-1 h-1 bg-accent-secondary/50 rounded-full animate-bounce"
              style={{ animationDuration: "3.5s", animationDelay: "0.3s" }}
            />
          </div>

          <div className="w-full py-16 px-8 relative z-10" ref={heroRef}>
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.p
                className="text-accent-primary text-sm font-medium mb-4"
                variants={fadeIn}
              >
                For content creators who move fast.
              </motion.p>

              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                Create Viral{" "}
                <span className="text-accent-primary">Texting Videos</span> in
                Minutes
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                The fastest way to create authentic texting videos that help you grow and <span className="text-green-500 font-bold italic">get paid</span> on TikTok, Instagram, and YouTube. Subscribe once and keep earning from your creativity.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.a
                  href={`https://${process.env.NEXT_PUBLIC_STUDIO_BASE_URL}`}
                  className="px-8 py-3 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90 transition-all text-base font-medium"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start building
                </motion.a>
                <motion.button
                  onClick={() =>
                    document
                      .getElementById("pricing")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-3 bg-background text-foreground border border-border rounded-lg hover:bg-muted transition-colors text-base font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View pricing
                </motion.button>
              </motion.div>

              {/* Discord Invite Section */}
              <motion.div
                className="mt-10"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.a
                  href="https://discord.gg/Ef3EuKSjaR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#5865F2]/10 to-[#5865F2]/5 border border-[#5865F2]/20 hover:border-[#5865F2]/40 transition-all duration-300"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 8px 32px -8px rgba(88, 101, 242, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Discord Icon */}
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-[#5865F2]/20 rounded-full blur-md"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                    <svg
                      className="w-5 h-5 text-[#5865F2] relative z-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-foreground group-hover:text-[#5865F2] transition-colors">
                      Join our Discord
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Latest updates & community support
                    </span>
                  </div>

                  {/* Arrow Icon */}
                  <motion.svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-[#5865F2] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                </motion.a>
              </motion.div>


              {/* Scroll Down Indicator */}
              <motion.div
                className="mt-16 flex flex-col items-center gap-2 cursor-pointer"
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.8 }}
                onClick={() =>
                  document
                    .getElementById("examples")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                whileHover={{ y: 5 }}
              >
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  View Examples
                </span>
                <motion.div
                  animate={
                    heroInView
                      ? {
                        y: [0, 8, 0],
                      }
                      : { y: 0 }
                  }
                  transition={{
                    duration: 1.5,
                    repeat: heroInView ? Number.POSITIVE_INFINITY : 0,
                    ease: "easeInOut",
                  }}
                  className="flex flex-col items-center"
                >
                  <svg
                    className="w-6 h-6 text-accent-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto">
          <SectionDivider />
        </div>


        <section
          id="examples"
          className="border-l border-r border-border max-w-6xl mx-auto"
        >
          <div ref={examplesRef}>
            <motion.div
              className="text-center py-16 px-8"
              initial="hidden"
              animate={examplesInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent-primary text-sm font-medium mb-4">
                See It In Action
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Real creators, real results
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Check out videos created{" "}
                <span className="text-accent-primary font-semibold relative inline-block">
                  with BR Max
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-primary"
                    initial={{ scaleX: 0 }}
                    animate={examplesInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                </span>{" "}
                by content creators worldwide.
              </p>
            </motion.div>

            <InnerDivider
              dotPositions={["left", "25%", "50%", "75%", "right"]}
            />

            {/* Carousel Section */}
            <div className="py-8 px-4">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1.3}
                centeredSlides={false}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 0,
                  },
                }}
                className="examples-swiper"
              >
                {examples.map((example, index) => {
                  const cardRef = cardRefs[index];
                  const cardInView = cardInViews[index];

                  return (
                    <SwiperSlide key={index}>
                      <motion.div
                        ref={cardRef}
                        className="group relative overflow-hidden border border-border"
                        variants={scaleIn}
                        transition={{ duration: 0.5 }}
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                      >
                        <div className="aspect-[9/16] relative overflow-hidden">
                          {example.videoUrl ? (
                            <video
                              src={example.videoUrl}
                              className="w-full h-full object-cover"
                              autoPlay
                              muted
                              loop
                              controls
                              controlsList="nofullscreen"
                              disablePictureInPicture
                              playsInline
                            />
                          ) : (
                            <motion.img
                              src={example.thumbnail || "/placeholder.svg"}
                              alt={example.title}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.4 }}
                            />
                          )}
                        </div>
                        <div className="p-6 border-t border-border">
                          <h3 className="font-semibold text-foreground mb-3 text-sm leading-relaxed">
                            {example.tiktokUrl && tiktokStats[example.tiktokUrl]
                              ? tiktokStats[example.tiktokUrl].title
                              : example.fallbackStats?.title || example.title}
                          </h3>

                          {/* Stats display */}
                          {example.tiktokUrl && (
                            <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                              <div className="flex items-center w-[33%] gap-1">
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
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                                {statsLoading ? (
                                  <div className="h-4 w-12 bg-muted animate-pulse rounded" />
                                ) : (
                                  <span className="font-medium">
                                    {cardInView && (
                                      <CountUp
                                        start={0}
                                        end={
                                          tiktokStats[example.tiktokUrl]?.views ||
                                          example.fallbackStats?.views ||
                                          0
                                        }
                                        duration={15}
                                        separator=","
                                        formattingFn={formatNumber}
                                      />
                                    )}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center w-[33%] gap-1">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                {statsLoading ? (
                                  <div className="h-4 w-12 bg-muted animate-pulse rounded" />
                                ) : (
                                  <span className="font-medium">
                                    {cardInView && (
                                      <CountUp
                                        start={0}
                                        end={
                                          tiktokStats[example.tiktokUrl]?.likes ||
                                          example.fallbackStats?.likes ||
                                          0
                                        }
                                        duration={15}
                                        separator=","
                                        formattingFn={formatNumber}
                                      />
                                    )}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center w-[33%] gap-1">
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
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                  />
                                </svg>
                                {statsLoading ? (
                                  <div className="h-4 w-12 bg-muted animate-pulse rounded" />
                                ) : (
                                  <span className="font-medium">
                                    {cardInView && (
                                      <CountUp
                                        start={0}
                                        end={
                                          tiktokStats[example.tiktokUrl]
                                            ?.comments ||
                                          example.fallbackStats?.comments ||
                                          0
                                        }
                                        duration={15}
                                        separator=","
                                        formattingFn={formatNumber}
                                      />
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {example.tiktokUrl && (
                            <motion.a
                              href={example.tiktokUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-accent-primary hover:underline flex items-center gap-1"
                              whileHover={{ x: 4 }}
                            >
                              View on TikTok
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
                            </motion.a>
                          )}
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </section>

        {/* Creator Proof Section - Professional Grid Design */}
        <section
          id="creator-proof"
          className="border-l border-r border-border max-w-6xl mx-auto"
        >
          <div ref={creatorProofRef}>
            {/* Title Area */}
            <motion.div
              className="text-center py-10 md:py-12 px-4 md:px-8"
              initial="hidden"
              animate={creatorProofInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-600 dark:text-green-400 text-xs font-semibold">Verified Results</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 text-balance">
                Proof That It Works
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
                Real screenshots from real creators using{" "}
                <span className="text-accent-primary font-semibold">BR Max</span>.
                No fake numbers. No edited images. Just results.
              </p>
            </motion.div>

            <InnerDivider dotPositions={["left", "50%", "right"]} />

            {/* Creators Grid - All Visible */}
            <div className="py-8 md:py-10 px-4 md:px-8">
              <div className="space-y-8 md:space-y-10">
                {creatorProof.map((creator, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={creatorProofInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className="max-w-5xl mx-auto mb-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary p-0.5">
                          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                            <span className="text-lg font-bold text-accent-primary">{creator.handle[1]}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-lg">{creator.handle}</h3>
                          <p className="text-sm text-muted-foreground">{creator.followers} Followers · {creator.totalLikes} Likes</p>
                        </div>
                      </div>
                    </div>
                    {/* ✅ Bento Proof Grid (Profile Left, Earnings+Analytics Stacked Right, Equal Height) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-5xl mx-auto items-stretch">

                      {/* ✅ Profile Screenshot (KEEP EXACT HEIGHT) */}
                      <motion.div
                        className="lg:col-span-5 rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-all h-[700px]"
                        whileHover={{ y: -2 }}
                      >
                        <div className="px-3 py-2 text-[11px] font-medium bg-muted/40 border-b border-border">
                          TikTok Profile
                        </div>

                        <div className="p-2 h-[calc(700px-34px)] flex">
                          <Image
                            src={creator.profileImage}
                            alt={`${creator.handle} profile`}
                            width={800}
                            height={1600}
                            className="w-full h-full object-contain rounded-xl"
                          />
                        </div>
                      </motion.div>

                      {/* ✅ Right Side Stack (MATCH PROFILE HEIGHT) */}
                      <div className="lg:col-span-7 flex flex-col gap-4 h-[700px]">

                        {/* ✅ Earnings Screenshot (Half Height) */}
                        <motion.div
                          className="rounded-2xl overflow-hidden border-2 border-green-500/30 bg-card shadow-sm hover:shadow-md transition-all flex-1"
                          whileHover={{ y: -2 }}
                        >
                          <div className="px-3 py-2 text-[11px] font-medium bg-green-500/10 border-b border-green-500/20 text-green-600 dark:text-green-400">
                            Earnings Proof
                          </div>

                          <div className="p-2 h-[calc(100%-34px)] flex">
                            <Image
                              src={creator.earningsImage}
                              alt={`${creator.handle} earnings`}
                              width={900}
                              height={700}
                              className="w-full h-full object-contain rounded-xl"
                            />
                          </div>
                        </motion.div>

                        {/* ✅ Analytics Screenshot (Half Height) */}
                        <motion.div
                          className="rounded-2xl overflow-hidden border-2 border-accent-primary/30 bg-card shadow-sm hover:shadow-md transition-all flex-1"
                          whileHover={{ y: -2 }}
                        >
                          <div className="px-3 py-2 text-[11px] font-medium bg-accent-primary/10 border-b border-accent-primary/20 text-accent-primary">
                            Analytics Proof
                          </div>

                          <div className="p-2 h-[calc(100%-34px)] flex">
                            <Image
                              src={creator.analyticsImage}
                              alt={`${creator.handle} analytics`}
                              width={900}
                              height={900}
                              className="w-full h-full object-contain rounded-xl"
                            />
                          </div>
                        </motion.div>

                      </div>
                    </div>

                    {/* ✅ Stats Row Bento */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 max-w-5xl mx-auto">
                      <div className="p-3 rounded-xl bg-muted/40 border border-border text-center">
                        <div className="text-[11px] text-muted-foreground">Post Views</div>
                        <div className="text-base font-bold">{creator.postViews}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-center">
                        <div className="text-[11px] text-muted-foreground">Earnings</div>
                        <div className="text-base font-bold">{creator.earnings}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-muted/40 border border-border text-center">
                        <div className="text-[11px] text-muted-foreground">Total Likes</div>
                        <div className="text-base font-bold">{creator.likes}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-accent-primary/10 border border-accent-primary/20 text-center">
                        <div className="text-[11px] text-muted-foreground">RPM</div>
                        <div className="text-base font-bold text-accent-primary">
                          {creator.rpm}
                        </div>
                      </div>
                    </div>

                  </motion.div>
                ))}
              </div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={creatorProofInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mt-10 md:mt-12 p-6 md:p-8 rounded-xl bg-gradient-to-br from-accent-primary/5 via-background to-accent-secondary/5 border border-border max-w-2xl mx-auto"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 mb-3">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-primary"></span>
                  </span>
                  <span className="text-accent-primary text-[10px] font-medium">Join 1,000+ creators</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  Your results could be next
                </h3>
                <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
                  Start creating viral content today and see your earnings grow.
                </p>
                <Link href={`https://${process.env.NEXT_PUBLIC_STUDIO_BASE_URL}`}>
                  <motion.button
                    className="px-6 py-3 bg-accent-primary text-white rounded-lg font-semibold text-sm shadow-lg shadow-accent-primary/25 hover:shadow-xl hover:shadow-accent-primary/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Creating Now
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>



        <div className="max-w-6xl mx-auto">
          <SectionDivider />
        </div>

        {/* Features Section - grid lines divide content, no cards */}
        <section
          id="features"
          className="border-l border-r border-border max-w-6xl mx-auto"
        >
          <div ref={featuresRef}>
            {/* Title area */}
            <motion.div
              className="text-center py-16 px-8"
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent-primary text-sm font-medium mb-4">
                How it works
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Everything You Need
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed to make video creation effortless
              </p>
            </motion.div>

            <InnerDivider
              dotPositions={["left", "25%", "50%", "75%", "right"]}
            />

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`py-12 px-6 border-border ${index > 0 ? "lg:border-l" : ""
                    } ${index === 1 ? "md:border-l" : ""} ${index === 2 ? "md:border-l lg:border-l" : ""
                    } ${index === 3 ? "md:border-l" : ""} ${index > 0 ? "border-t md:border-t lg:border-t-0" : ""
                    } ${index === 2 ? "lg:border-t-0" : ""}`}
                  variants={index % 2 === 0 ? slideInLeft : slideInRight}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto">
          <SectionDivider />
        </div>

        {/* Capabilities / Bento Grid Section */}
        <section
          id="capabilities"
          className="border-l border-r border-border max-w-6xl mx-auto"
        >
          <div ref={bentoRef}>
            <motion.div
              className="text-center py-16 px-8"
              initial="hidden"
              animate={bentoInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent-primary text-sm font-medium mb-4">
                Capabilities
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Built for Creators
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every feature you need to create scroll-stopping content
              </p>
            </motion.div>

            <InnerDivider
              dotPositions={["left", "33.333%", "66.666%", "right"]}
            />

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3"
              initial="hidden"
              animate={bentoInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {/* Row 1: Silence Remover (2 cols) + Real-Time Preview (1 col, spans 2 rows) */}
              {/* First item - Silence Remover (spans 2 columns) */}
              <motion.div
                className="p-8 border-border relative overflow-hidden group md:col-span-2 border-b md:border-r"
                variants={scaleIn}
                transition={{ duration: 0.5 }}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <motion.div
                  className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary mb-4 relative z-10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {bentoItems[0].icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground mb-2 relative z-10">
                  {bentoItems[0].title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                  {bentoItems[0].description}
                </p>
              </motion.div>

              {/* Second item - Real-Time Preview (spans 2 rows, full height) */}
              <motion.div
                className="p-8 border-border relative overflow-hidden group md:row-span-2 border-b flex flex-col justify-between min-h-[280px]"
                variants={scaleIn}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div>
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-accent-secondary/10 flex items-center justify-center text-accent-secondary mb-4 relative z-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {bentoItems[1].icon}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 relative z-10">
                    {bentoItems[1].title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                    {bentoItems[1].description}
                  </p>
                </div>
                {/* Visual element */}
                <div className="mt-6 flex-1 flex items-end">
                  <div className="w-full h-32 rounded-lg bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 flex items-center justify-center border border-border/50">
                    <svg
                      className="w-16 h-16 text-accent-primary/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Row 2: Rizz Monetization + Fast Generation */}
              {/* Third item - Rizz Monetization */}
              <motion.div
                className="p-8 border-border relative overflow-hidden group border-b md:border-r"
                variants={scaleIn}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <motion.div
                  className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary mb-4 relative z-10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {bentoItems[2].icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground mb-2 relative z-10">
                  {bentoItems[2].title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                  {bentoItems[2].description}
                </p>
              </motion.div>

              {/* Fourth item - Fast Generation */}
              <motion.div
                className="p-8 border-border relative overflow-hidden group border-b md:border-r"
                variants={scaleIn}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <motion.div
                  className="w-10 h-10 rounded-lg bg-accent-secondary/10 flex items-center justify-center text-accent-secondary mb-4 relative z-10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {bentoItems[3].icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground mb-2 relative z-10">
                  {bentoItems[3].title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                  {bentoItems[3].description}
                </p>
                <p className="text-accent-secondary text-xs mt-2 relative z-10">
                  *Speed depends on video length & internet
                </p>
              </motion.div>

              {/* Row 3: 6 Min Max (2 cols) + Community Features (1 col) */}
              {/* Fifth item - 6 Minute Max Length (spans 2 columns) */}
              <motion.div
                className="p-8 border-border relative overflow-hidden group md:col-span-2 md:border-r"
                variants={scaleIn}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="flex items-start gap-6">
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary relative z-10 shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {bentoItems[4].icon}
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 relative z-10">
                      {bentoItems[4].title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                      {bentoItems[4].description}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-accent-primary">
                          6 min
                        </span>
                        <span className="text-xs text-muted-foreground">
                          BR Max
                        </span>
                      </div>
                      <span className="text-muted-foreground">vs</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-medium text-muted-foreground line-through">
                          2.5 min
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Others
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sixth item - Community Features */}
              <motion.div
                className="p-8 border-border relative overflow-hidden group"
                variants={scaleIn}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <motion.div
                  className="w-10 h-10 rounded-lg bg-accent-secondary/10 flex items-center justify-center text-accent-secondary mb-4 relative z-10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {bentoItems[5].icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground mb-2 relative z-10">
                  {bentoItems[5].title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                  {bentoItems[5].description}
                </p>
                <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 bg-accent-secondary/10 rounded text-accent-secondary text-xs font-medium">
                  <span>+500 tokens</span>
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto">
          <SectionDivider />
        </div>

        <section className="border-l border-r border-border max-w-6xl mx-auto">
          <div className="py-16 px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CardSpotlight className="bg-background border-border">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary mb-6">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Start Creating Today
                  </h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    Join thousands of creators who are already making viral
                    texting videos. No credit card required to get started.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="text-accent-primary">✓</span> Free tier
                      available
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent-primary">✓</span> No
                      watermarks
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent-primary">✓</span> Export in
                      4K
                    </li>
                  </ul>
                </div>
              </CardSpotlight>

              <CardSpotlight className="bg-background border-border">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-accent-secondary/10 flex items-center justify-center text-accent-secondary mb-6">
                    {/* Refresh / Updates icon */}
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12a8 8 0 0 0-14.314-4.9M4 12a8 8 0 0 0 14.314 4.9"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 7H2V3M18 17h4v4"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Always Improving
                  </h3>

                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    BRMAX is actively developed — we ship regular updates,
                    performance upgrades, and brand-new features to help you
                    create faster and publish better content every week.
                  </p>

                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="text-accent-secondary">✓</span> Frequent
                      feature releases
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent-secondary">✓</span>{" "}
                      Improvements based on creator feedback
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent-secondary">✓</span> Faster
                      rendering & stability updates
                    </li>
                  </ul>
                </div>
              </CardSpotlight>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto">
          <SectionDivider />
        </div>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="border-l border-r border-border max-w-6xl mx-auto"
        >
          <div ref={pricingRef}>
            {/* Title area */}
            <motion.div
              className="text-center py-12 md:py-16 px-4 md:px-8"
              initial="hidden"
              animate={pricingInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent-primary text-sm font-medium mb-3 md:mb-4">
                Pricing
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4 text-balance">
                Simple, transparent pricing
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Subscribe and keep the momentum going. Continuous work, no interruptions.
              </p>
            </motion.div>

            <InnerDivider
              dotPositions={["left", "33.333%", "66.666%", "right"]}
            />

            {/* Desktop Grid / Mobile Carousel */}
            <div className="pricing-container">
              {/* Mobile Carousel */}
              <div className="block lg:hidden py-8 px-4">
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={16}
                  slidesPerView={1.3}
                  centeredSlides={true}
                  initialSlide={1} // Start with the "popular" plan
                  navigation
                  pagination={{
                    clickable: true,
                    dynamicBullets: true
                  }}
                  breakpoints={{
                    480: {
                      slidesPerView: 1.2,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 1.3,
                      spaceBetween: 24,
                    },
                  }}
                  className="pricing-swiper"
                >
                  {packagesLoading ? (
                    [...Array(3)].map((_, index) => (
                      <SwiperSlide key={index}>
                        <div className="py-10 px-6 flex flex-col h-full bg-card rounded-2xl border border-border shadow-sm">
                          <div className="mb-3 h-6" />
                          <div className="mb-5">
                            <div className="h-6 w-24 bg-muted animate-pulse rounded mb-2" />
                            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                          </div>
                          <div className="mb-5">
                            <div className="h-10 w-28 bg-muted animate-pulse rounded" />
                          </div>
                          <div className="space-y-2.5 mb-6 flex-grow">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="h-4 bg-muted animate-pulse rounded" />
                            ))}
                          </div>
                          <div className="h-12 bg-muted animate-pulse rounded-lg" />
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    tokenPackages.map((pkg, index) => {
                      const isCreatorPackage = pkg.name.toLowerCase().includes("creator");
                      return (
                      <SwiperSlide key={pkg.id}>
                        <div
                          className={`py-10 px-6 flex flex-col h-full relative rounded-2xl border-2 shadow-lg ${pkg.popular
                            ? "bg-accent-primary/5 border-accent-primary"
                            : "bg-card border-border"
                            }`}
                        >
                          {pkg.popular && (
                            <div
                              className="inline-block mb-3 px-3 py-1.5 bg-accent-primary text-white text-xs font-semibold rounded-full w-fit"
                            >
                              ⭐ Best Value
                            </div>
                          )}
                          {!pkg.popular && <div className="mb-3 h-6" />}

                          {isCreatorPackage && (
                            <div
                              className="relative mb-4 overflow-hidden rounded-xl border border-accent-primary/50 bg-gradient-to-br from-accent-primary/20 via-accent-primary/15 to-accent-secondary/15 px-3 py-2.5"
                              style={{ boxShadow: "0 0 24px rgba(var(--accent-primary-rgb), 0.45), 0 0 48px rgba(var(--accent-primary-rgb), 0.2), inset 0 1px 0 rgba(255,255,255,0.2)" }}
                            >
                              <span className="absolute right-2 top-1.5 text-base text-accent-primary opacity-90">✨</span>
                              <p className="text-sm font-bold text-accent-primary">
                                First month just $1
                              </p>
                              <p className="text-xs font-medium text-muted-foreground mt-0.5">
                                Then ${pkg.priceUSD}/mo from month 2
                              </p>
                            </div>
                          )}

                          <div className="mb-5">
                            <h3 className="text-2xl font-bold text-foreground mb-2">
                              {pkg.name}
                            </h3>
                            <p className="text-sm text-muted-foreground font-medium">
                              {pkg.tokens.toLocaleString()} tokens
                            </p>
                          </div>

                          <div className="mb-6">
                            <div className="flex flex-col gap-1">
                              {/* Original Price */}
                              <span className="text-lg font-medium text-muted-foreground line-through opacity-70">
                                ${(pkg.priceUSD + 20).toFixed(2)}
                              </span>

                              {/* Current Price */}
                              <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-foreground">
                                  ${isCreatorPackage ? "1" : pkg.priceUSD}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  /month
                                </span>
                              </div>
                            </div>
                          </div>

                          <ul className="space-y-2.5 mb-6 flex-grow">
                            {pkg.features.map((feature, fIndex) => (
                              <li
                                key={fIndex}
                                className="flex items-start gap-2.5 text-sm text-muted-foreground"
                              >
                                <svg
                                  className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span className="leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <Link href={`https://${process.env.NEXT_PUBLIC_STUDIO_BASE_URL}`}>
                            <button
                              className={`w-full py-3.5 rounded-xl font-semibold transition-all text-base ${pkg.popular
                                ? "bg-accent-primary text-white hover:bg-accent-primary/90 shadow-md"
                                : "bg-foreground text-background hover:opacity-90"
                                }`}
                            >
                              Get started
                            </button>
                          </Link>
                        </div>
                      </SwiperSlide>
                    );
                    })
                  )}
                </Swiper>
              </div>

              {/* Desktop Grid */}
              <div className="hidden lg:grid grid-cols-3">
                {packagesLoading ? (
                  [...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className={`py-12 px-8 flex flex-col h-full ${index > 0 ? "border-l border-border" : ""
                        }`}
                    >
                      <div className="mb-4 h-6" />
                      <div className="mb-6">
                        <div className="h-6 w-24 bg-muted animate-pulse rounded mb-2" />
                        <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                      </div>
                      <div className="mb-6">
                        <div className="h-10 w-28 bg-muted animate-pulse rounded" />
                      </div>
                      <div className="space-y-3 mb-8 flex-grow">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="h-4 bg-muted animate-pulse rounded" />
                        ))}
                      </div>
                      <div className="h-12 bg-muted animate-pulse rounded-lg" />
                    </div>
                  ))
                ) : (
                  tokenPackages.map((pkg, index) => {
                    const isCreatorPackage = pkg.name.toLowerCase().includes("creator");
                    return (
                    <motion.div
                      key={pkg.id}
                      className={`py-12 px-8 flex flex-col h-full relative ${index > 0 ? "border-l border-border" : ""
                        } ${pkg.popular ? "bg-accent-primary/5" : ""}`}
                      whileHover={{
                        backgroundColor: pkg.popular
                          ? "rgba(var(--accent-primary-rgb), 0.08)"
                          : "rgba(0,0,0,0.02)",
                      }}
                    >
                      {pkg.popular && (
                        <>
                          <motion.div
                            className="absolute inset-0 border-2 border-accent-primary rounded-lg pointer-events-none"
                            animate={{
                              boxShadow: [
                                "0 0 0 0 rgba(var(--accent-primary-rgb), 0)",
                                "0 0 0 8px rgba(var(--accent-primary-rgb), 0.1)",
                                "0 0 0 0 rgba(var(--accent-primary-rgb), 0)",
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          />
                          <div className="inline-block mb-4 px-3 py-1 bg-accent-primary text-white text-xs font-medium rounded-full w-fit relative z-10">
                            Best Value
                          </div>
                        </>
                      )}
                      {!pkg.popular && <div className="mb-4 h-6" />}

                      {isCreatorPackage && (
                        <motion.div
                          className="relative mb-5 overflow-hidden rounded-xl border border-accent-primary/50 bg-gradient-to-br from-accent-primary/20 via-accent-primary/15 to-accent-secondary/15 px-4 py-3"
                          style={{
                            boxShadow: "0 0 28px rgba(var(--accent-primary-rgb), 0.45), 0 0 56px rgba(var(--accent-primary-rgb), 0.2), inset 0 1px 0 rgba(255,255,255,0.25)",
                          }}
                          animate={{
                            boxShadow: [
                              "0 0 28px rgba(var(--accent-primary-rgb), 0.45), 0 0 56px rgba(var(--accent-primary-rgb), 0.2), inset 0 1px 0 rgba(255,255,255,0.25)",
                              "0 0 36px rgba(var(--accent-primary-rgb), 0.55), 0 0 64px rgba(var(--accent-primary-rgb), 0.25), inset 0 1px 0 rgba(255,255,255,0.25)",
                              "0 0 28px rgba(var(--accent-primary-rgb), 0.45), 0 0 56px rgba(var(--accent-primary-rgb), 0.2), inset 0 1px 0 rgba(255,255,255,0.25)",
                            ],
                          }}
                          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        >
                          <span className="absolute right-3 top-2 text-lg text-accent-primary opacity-90">✨</span>
                          <p className="text-sm font-bold text-accent-primary">
                            First month just $1
                          </p>
                          <p className="text-xs font-medium text-muted-foreground mt-1">
                            Then ${pkg.priceUSD}/mo from month 2
                          </p>
                        </motion.div>
                      )}

                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {pkg.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {pkg.tokens.toLocaleString()} tokens
                        </p>
                      </div>

                      <div className="mb-6 flex items-baseline gap-2">
                        <span className="text-xl font-medium text-muted-foreground line-through opacity-80">
                          ${(pkg.priceUSD + 20).toFixed(2)}
                        </span>

                        <span>
                          <span className="text-4xl font-bold text-foreground">
                            ${isCreatorPackage ? "1" : pkg.priceUSD}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {" "}
                            /month
                          </span>
                        </span>
                      </div>

                      <ul className="space-y-3 mb-8 flex-grow">
                        {pkg.features.map((feature, fIndex) => (
                          <li
                            key={fIndex}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <svg
                              className="w-4 h-4 text-accent-primary flex-shrink-0"
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
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Link href={`https://${process.env.NEXT_PUBLIC_STUDIO_BASE_URL}`}>
                        <motion.button
                          className={`w-full py-3 rounded-lg font-medium transition-all mt-auto ${pkg.popular
                            ? "bg-accent-primary text-white hover:bg-accent-primary/90"
                            : "bg-foreground text-background hover:opacity-90"
                            }`}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 8px 25px -8px rgba(0,0,0,0.3)",
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Get started
                        </motion.button>
                      </Link>
                    </motion.div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Token explanation */}
            <motion.div
              className="px-4 md:px-8 py-6 text-center"
              initial="hidden"
              animate={pricingInView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-xs md:text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                <span className="font-semibold text-foreground">
                  How tokens work:
                </span>{" "}
                Each video consumes tokens based on its length and complexity.
                Shorter videos use fewer tokens, while longer videos use more tokens.
                Your tokens never expire, so use them at your own pace.
              </p>
            </motion.div>
          </div>
        </section>



        <div className="max-w-6xl mx-auto">
          <SectionDivider />
        </div>

        {/* FAQ Section */}
        <section
          id="faq"
          className="border-l border-r border-border max-w-6xl mx-auto"
        >
          <div ref={faqRef}>
            <motion.div
              className="text-center py-16 px-8"
              initial="hidden"
              animate={faqInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent-primary text-sm font-medium mb-4">
                FAQ
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Frequently asked questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about the product.
              </p>
            </motion.div>

            <InnerDivider dotPositions={["left", "50%", "right"]} />

            <motion.div
              initial="hidden"
              animate={faqInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {/* Split FAQs into two columns */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left column */}
                <div className="border-border">
                  {faqs
                    .slice(0, Math.ceil(faqs.length / 2))
                    .map((faq, index) => (
                      <motion.div
                        key={index}
                        className={`border-border ${index > 0 ? "border-t" : ""
                          }`}
                        variants={fadeInUp}
                      >
                        <motion.button
                          className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                          onClick={() =>
                            setActiveQuestion(
                              activeQuestion === index ? null : index
                            )
                          }
                          whileHover={{ x: 4 }}
                        >
                          <span className="font-medium text-foreground pr-4">
                            {faq.question}
                          </span>
                          <motion.svg
                            className="w-5 h-5 text-muted-foreground flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{
                              rotate: activeQuestion === index ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </motion.button>
                        <motion.div
                          initial={false}
                          animate={{
                            height: activeQuestion === index ? "auto" : 0,
                            opacity: activeQuestion === index ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 text-muted-foreground">
                            {faq.answer}
                          </p>
                        </motion.div>
                      </motion.div>
                    ))}
                </div>
                {/* Right column with left border */}
                <div className="border-border md:border-l border-t md:border-t-0">
                  {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => {
                    const actualIndex = index + Math.ceil(faqs.length / 2);
                    return (
                      <motion.div
                        key={actualIndex}
                        className={`border-border ${index > 0 ? "border-t" : ""
                          }`}
                        variants={fadeInUp}
                      >
                        <motion.button
                          className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                          onClick={() =>
                            setActiveQuestion(
                              activeQuestion === actualIndex
                                ? null
                                : actualIndex
                            )
                          }
                          whileHover={{ x: 4 }}
                        >
                          <span className="font-medium text-foreground pr-4">
                            {faq.question}
                          </span>
                          <motion.svg
                            className="w-5 h-5 text-muted-foreground flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{
                              rotate: activeQuestion === actualIndex ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </motion.button>
                        <motion.div
                          initial={false}
                          animate={{
                            height: activeQuestion === actualIndex ? "auto" : 0,
                            opacity: activeQuestion === actualIndex ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 text-muted-foreground">
                            {faq.answer}
                          </p>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
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

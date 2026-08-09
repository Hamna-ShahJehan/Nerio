"use client";

import { useEffect, useRef, useState } from "react";
import NativeAdCard from "@/components/ui/NativeAdCard";

interface InFeedNativeAdProps {
  position: string;
  pageType?: "homepage" | "article" | "category" | "website";
  cardStyle?: "news-grid" | "hero-featured" | "hero-recent" | "sidebar-list" | "sidebar-featured" | "latest-articles" | "hero-side" | "review-list" | "carousel" | "most-viewed" | "social-card" | "popular-articles" | "travel-intel" | "top-destinations" | "sidebar-tabs" | "top-flights" | "article-inline" | "related-articles" | "sidebar-ad";
  className?: string;
}

interface NativeContent {
  title: string;
  excerpt: string;
  image: string;
  sponsorLabel: string;
  sponsorName: string;
  sponsorLogo: string;
  clickThroughUrl: string;
  category: string;
  categoryColor: string;
  readTime: string;
  author: string;
  layout: "column" | "row";
  cardStyle: string;
}

interface ResolvedAd {
  _id: string;
  name: string;
  templateType?: string;
  nativeContent?: NativeContent;
  trackingPixels?: { impression?: string; click?: string };
  [key: string]: any;
}

export default function InFeedNativeAd({
  position,
  pageType = "homepage",
  cardStyle,
  className = "",
}: InFeedNativeAdProps) {
  const [ad, setAd] = useState<ResolvedAd | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const impressionFired = useRef(false);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(`/api/ads/resolve?pageType=${pageType}&position=${position}`);
        if (res.ok) {
          const data = await res.json();
          if (data.ad && data.ad.templateType === "native_feed") {
            setAd(data.ad);
          }
        }
      } catch {}
    };
    fetchAd();
  }, [position, pageType]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [ad]);

  useEffect(() => {
    if (isVisible && ad?.trackingPixels?.impression && !impressionFired.current) {
      impressionFired.current = true;
      const img = new Image();
      img.src = ad.trackingPixels.impression;
    }
  }, [isVisible, ad]);

  if (!ad?.nativeContent) return null;

  return (
    <div
      ref={containerRef}
      className={`in-feed-native-ad ${className}`}
      data-ad-position={position}
      data-ad-id={ad._id}
    >
      <NativeAdCard
        ad={ad as any}
        cardStyle={cardStyle || ad.nativeContent?.cardStyle as any}
        position={position}
        pageType={pageType}
        className={className}
      />
    </div>
  );
}

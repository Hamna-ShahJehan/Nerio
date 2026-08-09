"use client";

import { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  position: string;
  className?: string;
}

interface ResolvedAd {
  _id: string;
  name: string;
  label: string;
  code: string;
  templateType?: string;
  mediaUrl?: string;
  clickThroughUrl?: string;
  appearance?: {
    showLabel?: boolean;
    labelText?: string;
    borderStyle?: string;
    borderWidth?: number;
    borderColor?: string;
    backgroundColor?: string;
    borderRadius?: number;
  };
  slotSizing?: {
    desktop: { width: number; height: number; maxWidth?: string; maxHeight?: string };
    tablet: { width: number; height: number; maxWidth?: string; maxHeight?: string };
    mobile: { width: number; height: number; maxWidth?: string; maxHeight?: string };
    responsive?: boolean;
  };
}

export default function AdBanner({ position, className = "" }: AdBannerProps) {
  const [ad, setAd] = useState<ResolvedAd | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(`/api/ads/resolve?pageType=homepage&position=${position}`);
        if (res.ok) {
          const data = await res.json();
          if (data.ad) setAd(data.ad);
        }
      } catch {}
    };
    fetchAd();
  }, [position]);

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

  if (!ad) return null;

  const appearance = ad.appearance || {};
  const sizing = ad.slotSizing || {
    desktop: { width: 728, height: 90 },
    tablet: { width: 468, height: 60 },
    mobile: { width: 320, height: 50 },
  };

  return (
    <div
      ref={containerRef}
      className={`ad-banner-wrapper my-[30px] ${className}`}
      data-ad-position={position}
      data-ad-id={ad._id}
    >
      {appearance.showLabel !== false && (
        <div className="ad-label text-[11px] text-gray-400 uppercase tracking-wider mb-1 text-center">
          {appearance.labelText || "Advertisement"}
        </div>
      )}
      <div
        className="ad-banner-container mx-auto overflow-hidden"
        style={{
          maxWidth: sizing.desktop.maxWidth || "100%",
          border: appearance.borderStyle && appearance.borderStyle !== "none"
            ? `${appearance.borderWidth || 1}px ${appearance.borderStyle} ${appearance.borderColor || "#e5e5e5"}`
            : "none",
          backgroundColor: appearance.backgroundColor || "transparent",
          borderRadius: appearance.borderRadius || 0,
        }}
      >
        {isVisible && ad.clickThroughUrl ? (
          <a
            href={ad.clickThroughUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block"
          >
            <AdContent ad={ad} sizing={sizing} />
          </a>
        ) : isVisible ? (
          <AdContent ad={ad} sizing={sizing} />
        ) : null}
      </div>
    </div>
  );
}

function AdContent({ ad, sizing }: { ad: ResolvedAd; sizing: ResolvedAd["slotSizing"] }) {
  if (ad.templateType === "programmatic" && ad.code) {
    return (
      <div
        className="ad-programmatic"
        dangerouslySetInnerHTML={{ __html: ad.code }}
      />
    );
  }

  if (ad.mediaUrl) {
    return (
      <picture>
        <source
          media="(max-width: 767px)"
          srcSet={ad.mediaUrl}
        />
        <source
          media="(max-width: 1023px)"
          srcSet={ad.mediaUrl}
        />
        <img
          src={ad.mediaUrl}
          alt={ad.name}
          className="w-full h-auto object-contain"
          style={{
            maxWidth: sizing?.desktop?.width || 728,
            maxHeight: sizing?.desktop?.height || 90,
          }}
          loading="lazy"
        />
      </picture>
    );
  }

  if (ad.code) {
    return (
      <div
        className="ad-code"
        dangerouslySetInnerHTML={{ __html: ad.code }}
      />
    );
  }

  return null;
}

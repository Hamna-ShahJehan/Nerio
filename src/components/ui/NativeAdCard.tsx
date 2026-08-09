"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface NativeContent {
    title: string;
    excerpt: string;
    image: string;
    sponsorLabel: string;
    sponsorName: string;
    sponsorLogo?: string;
    clickThroughUrl: string;
    category?: string;
    categoryColor?: string;
    readTime?: string;
    author?: string;
    layout?: "column" | "row";
    /** Controls which card style to render — matches the surrounding article cards */
    cardStyle?: "news-grid" | "sidebar-list" | "sidebar-featured" | "latest-articles" | "hero-side" | "review-list" | "carousel" | "most-viewed" | "social-card" | "popular-articles" | "travel-intel" | "top-destinations" | "sidebar-tabs" | "top-flights" | "article-inline" | "related-articles" | "sidebar-ad";
}

interface NativeAdData {
    _id: string;
    nativeContent: NativeContent;
    vastTagUrl?: string;
    vastUrl?: string;
    trackingPixels?: {
        impression?: string;
        click?: string;
    };
}

interface Props {
    ad: NativeAdData;
    variant?: "grid" | "list";
    /** Force a specific card style — overrides ad.nativeContent.cardStyle */
    cardStyle?: "news-grid" | "hero-featured" | "hero-recent" | "sidebar-list" | "sidebar-featured" | "latest-articles" | "hero-side" | "review-list" | "carousel" | "most-viewed" | "social-card" | "popular-articles" | "travel-intel" | "top-destinations" | "sidebar-tabs" | "top-flights" | "article-inline" | "related-articles" | "sidebar-ad";
    position?: string;
    pageType?: string;
    className?: string;
}

// ── Card style configs ───────────────────────────────────────────
const CARD_STYLES = {
    /** News Grid: compact image + title + date (matches hero-recent-grid cards 114x88) */
    "news-grid": {
        imageHeight: "88px",
        imageWidth: "114px",
        imageMb: "mb-2",
        imageRounded: true,
        imageRoundedValue: "8px",
        titleSize: "15px",
        titleLineHeight: "18px",
        showCategory: true,
        showExcerpt: false,
        showAuthor: false,
        showDate: false,
        showReadTime: false,
    },
    /** Hero Featured: horizontal card with 80x70 thumbnail (matches hero-featured-card) */
    "hero-featured": {
        imageHeight: "70px",
        imageWidth: "80px",
        imageMb: "mb-0",
        imageRounded: true,
        imageRoundedValue: "8px",
        cardRoundedValue: "10px",
        titleSize: "14px",
        titleLineHeight: "18px",
        showCategory: true,
        showExcerpt: false,
        showAuthor: false,
        showDate: false,
        showReadTime: false,
    },
    /** Hero Recent: horizontal card with 114x88 thumbnail (matches hero-recent-grid cards) */
    "hero-recent": {
        imageHeight: "88px",
        imageWidth: "114px",
        imageMb: "mb-0",
        imageRounded: true,
        imageRoundedValue: "8px",
        cardRoundedValue: "8px",
        titleSize: "14px",
        titleLineHeight: "18px",
        showCategory: true,
        showExcerpt: false,
        showAuthor: false,
        showDate: false,
        showReadTime: false,
    },
    /** Sidebar text list: no image, title + category + excerpt (matches TopStories) */
    "sidebar-list": {
        imageHeight: "0",
        imageMb: "mb-0",
        imageRounded: false,
        titleSize: "18px",
        titleLineHeight: "24px",
        showCategory: true,
        showExcerpt: true,
        showAuthor: false,
        showDate: false,
        showReadTime: false,
    },
    /** Sidebar featured: 180px image + title + excerpt (matches Tech & Innovation / Editor's Picks) */
    "sidebar-featured": {
        imageHeight: "180px",
        imageMb: "mb-3",
        imageRounded: false,
        titleSize: "15px",
        titleLineHeight: "20px",
        showCategory: false,
        showExcerpt: true,
        showAuthor: false,
        showDate: false,
        showReadTime: false,
    },
    /** Latest Articles: horizontal card with 100x85 thumbnail (matches BreakingNews side posts) */
    "latest-articles": {
        imageHeight: "85px",
        imageWidth: "100px",
        imageMb: "mb-0",
        imageRounded: true,
        imageRoundedValue: "8px",
        cardRoundedValue: "8px",
        titleSize: "14px",
        titleLineHeight: "20px",
        showCategory: true,
        showExcerpt: false,
        showAuthor: true,
        showDate: false,
        showReadTime: false,
    },
    /** Hero side card: full-bleed image, no rounded, no margin (matches HeroSliderBlock) */
    "hero-side": {
        imageHeight: "100%",
        imageMb: "mb-0",
        imageRounded: false,
        titleSize: "17px",
        titleLineHeight: "24px",
        showCategory: true,
        showExcerpt: true,
        showAuthor: true,
        showDate: false,
        showReadTime: false,
    },
    /** Review list: 80x60 thumb + title + stars (matches Latest Reviews sidebar) */
    "review-list": {
        imageHeight: "60px",
        imageWidth: "80px",
        imageMb: "mb-0",
        imageRounded: false,
        titleSize: "15px",
        titleLineHeight: "20px",
        showCategory: false,
        showExcerpt: false,
        showAuthor: false,
        showDate: false,
        showReadTime: false,
    },
    /** Carousel: 80x60 thumb in table layout (matches FeaturedCarousel) */
    "carousel": {
        imageHeight: "60px",
        imageWidth: "80px",
        imageMb: "mb-0",
        imageRounded: false,
        titleSize: "15px",
        titleLineHeight: "20px",
        showCategory: true,
        showExcerpt: false,
        showAuthor: true,
        showDate: false,
        showReadTime: false,
    },
    /** Most Viewed: number + title (matches Most Viewed sidebar list) */
    "most-viewed": {
        imageHeight: "0",
        imageMb: "mb-0",
        imageRounded: false,
        titleSize: "16px",
        titleLineHeight: "22px",
        showCategory: false,
        showExcerpt: false,
        showAuthor: false,
        showDate: false,
        showReadTime: false,
    },
    /** Social Card: colored bg + icon + name + followers (matches FollowWidget social cards) */
    "social-card": {
        imageHeight: "0",
        imageMb: "mb-0",
        imageRounded: false,
        titleSize: "16px",
        titleLineHeight: "20px",
        showCategory: false,
        showExcerpt: false,
        showAuthor: false,
        showDate: false,
        showReadTime: false,
    },
    /** Popular Articles: vertical card with 16:10 aspect ratio (matches BreakingNews carousel) */
    "popular-articles": {
        imageHeight: "0",
        imageAspect: "16/10",
        imageMb: "mb-2",
        imageRounded: true,
        imageRoundedValue: "8px",
        cardRoundedValue: "12px",
        titleSize: "16px",
        titleLineHeight: "22px",
        showCategory: true,
        showExcerpt: false,
        showAuthor: true,
        showDate: true,
        showReadTime: false,
    },
    /** Travel Intel: compact horizontal card (matches VideoNews side cards 112x112) */
    "travel-intel": {
        imageHeight: "112px",
        imageWidth: "112px",
        imageMb: "mb-0",
        imageRounded: true,
        imageRoundedValue: "8px",
        titleSize: "14px",
        titleLineHeight: "20px",
        showCategory: true,
        showExcerpt: false,
        showAuthor: true,
        showDate: false,
        showReadTime: false,
    },
    /** Top Destinations: 2-col grid card (matches TopOfWeek ArticleCard 200x130) */
    "top-destinations": {
        imageHeight: "130px",
        imageWidth: "200px",
        imageMb: "mb-2",
        imageRounded: true,
        imageRoundedValue: "10px",
        titleSize: "16px",
        titleLineHeight: "22px",
        showCategory: true,
        showExcerpt: false,
        showAuthor: true,
        showDate: true,
        showReadTime: false,
    },
    /** Sidebar Tabs: horizontal card with small thumbnail (matches TopOfWeek TabItem 65x65) */
    "sidebar-tabs": {
        imageHeight: "65px",
        imageWidth: "65px",
        imageMb: "mb-0",
        imageRounded: true,
        imageRoundedValue: "8px",
        titleSize: "13px",
        titleLineHeight: "18px",
        showCategory: false,
        showExcerpt: false,
        showAuthor: true,
        showDate: false,
        showReadTime: false,
    },
    /** Top Flights: horizontal card (matches TopStories smallCards 180x130) */
    "top-flights": {
        imageHeight: "130px",
        imageWidth: "180px",
        imageMb: "mb-0",
        imageRounded: true,
        imageRoundedValue: "8px",
        cardRoundedValue: "12px",
        titleSize: "16px",
        titleLineHeight: "22px",
        showCategory: true,
        showExcerpt: false,
        showAuthor: true,
        showDate: false,
        showReadTime: false,
    },
    /** Article Inline: full-width inline card between paragraphs */
    "article-inline": {
        imageHeight: "clamp(150px, 25vw, 200px)",
        imageMb: "mb-2",
        imageRounded: true,
        titleSize: "16px",
        titleLineHeight: "22px",
        showCategory: true,
        showExcerpt: true,
        showAuthor: true,
        showDate: false,
        showReadTime: false,
    },
    /** Related Articles: carousel card (matches RelatedPosts) */
    "related-articles": {
        imageHeight: "200px",
        imageMb: "mb-0",
        imageRounded: true,
        titleSize: "16px",
        titleLineHeight: "22px",
        showCategory: true,
        showExcerpt: false,
        showAuthor: true,
        showDate: false,
        showReadTime: false,
    },
    /** Sidebar Ad: compact sidebar card */
    "sidebar-ad": {
        imageHeight: "clamp(100px, 20vw, 150px)",
        imageMb: "mb-2",
        imageRounded: true,
        titleSize: "14px",
        titleLineHeight: "20px",
        showCategory: true,
        showExcerpt: false,
        showAuthor: false,
        showDate: false,
        showReadTime: false,
    },
} as const;

type CardStyleKey = keyof typeof CARD_STYLES;

/**
 * NativeAdCard — renders a native ad that matches the surrounding article cards.
 * 
 * The `cardStyle` field on nativeContent controls which card style to use:
 * - "news-grid": compact grid (NewsGridItem style)
 * - "sidebar-list": text-only list (TopStories style)
 * - "sidebar-featured": featured image + text (Tech & Innovation / Editor's Picks style)
 * - "latest-articles": list with image left, text right
 * - "hero-side": compact grid for hero side cards
 * 
 * Falls back to "grid" / "list" variants for backward compatibility.
 */
export default function NativeAdCard({ ad, variant: variantProp, cardStyle: cardStyleOverride, position, pageType, className }: Props) {
    const { nativeContent: nc, trackingPixels } = ad;
    const containerRef = useRef<HTMLDivElement>(null);
    const [impressionTracked, setImpressionTracked] = useState(false);

    // Determine card style: prop override > nativeContent.cardStyle > variant fallback
    const cardStyle: CardStyleKey = cardStyleOverride || nc.cardStyle || (nc.layout === "row" ? "latest-articles" : "news-grid");
    const style = CARD_STYLES[cardStyle] || CARD_STYLES["news-grid"];

    // ── Impression tracking ──────────────────────────────────────────
    useEffect(() => {
        if (!ad._id || impressionTracked || !containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !impressionTracked) {
                        setImpressionTracked(true);
                        fetch(`/api/ads/${ad._id}/analytics`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ event: "impression" }),
                        }).catch(() => {});
                        if (trackingPixels?.impression) {
                            const img = new window.Image();
                            img.src = trackingPixels.impression;
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [ad._id, impressionTracked, trackingPixels?.impression]);

    // ── Click handler ────────────────────────────────────────────────
    const handleClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (ad._id) {
            fetch(`/api/ads/${ad._id}/analytics`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ event: "click" }),
            }).catch(() => {});
        }
        if (trackingPixels?.click) {
            const img = new window.Image();
            img.src = trackingPixels.click;
        }
        if (nc.clickThroughUrl) {
            window.open(nc.clickThroughUrl, "_blank", "noopener,noreferrer");
        }
    }, [ad._id, nc.clickThroughUrl, trackingPixels?.click]);

    if (!nc.title && !nc.image) return null;

    const imgRounded = style.imageRounded ? `rounded-[${(style as any).imageRoundedValue || "8px"}]` : "";
    const cardRounded = (style as any).cardRoundedValue ? `rounded-[${(style as any).cardRoundedValue}]` : "";

    // ── "carousel" style: 80x60 table layout (matches FeaturedCarousel) ──
    if (cardStyle === "carousel") {
        return (
            <div
                ref={containerRef}
                className="group cursor-pointer"
                style={{ display: "table", width: "100%", padding: "0", textAlign: "left" }}
                onClick={handleClick}
                role="link"
                tabIndex={0}
                aria-label={`Sponsored: ${nc.title}`}
            >
                <div style={{ display: "table-cell", width: "80px", maxWidth: "100px", verticalAlign: "top", position: "relative" }}>
                    <div className="block relative overflow-hidden">
                        {nc.image ? (
                            <img
                                src={nc.image}
                                alt={nc.title || "Sponsored content"}
                                style={{ width: "80px", height: "60px", objectFit: "cover", display: "block" }}
                                className="transition-transform duration-300 hover:opacity-80"
                            />
                        ) : (
                            <div style={{ width: "80px", height: "60px", backgroundColor: "#333" }} />
                        )}
                    </div>
                </div>
                <div style={{ display: "table-cell", verticalAlign: "top", padding: "0 0 0 15px" }}>
                    {nc.category && style.showCategory && (
                        <span
                            className="inline-block"
                            style={{
                                backgroundColor: nc.categoryColor || "#ef4444",
                                color: "#fff",
                                fontSize: "11px",
                                padding: "0px 6px",
                                lineHeight: "16px",
                                letterSpacing: "0.5px",
                                textTransform: "uppercase",
                                marginBottom: "6px",
                                fontWeight: 600,
                            }}
                        >
                            {nc.category}
                        </span>
                    )}
                    <h5 style={{ marginTop: 0, lineHeight: style.titleLineHeight, fontSize: style.titleSize, fontWeight: 400, color: "var(--heading-color, #fff)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {nc.title}
                    </h5>
                    <div className="authar-info" style={{ fontSize: "12px", color: "var(--meta-fcolor, #888)", marginTop: "5px" }}>
                        {(nc.author || nc.sponsorName) && style.showAuthor && (
                            <span>{nc.author || nc.sponsorName}</span>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // ── "hero-side" style: full-bleed image, no rounded, no margin ──
    if (cardStyle === "hero-side") {
        return (
            <div
                ref={containerRef}
                className="group relative overflow-hidden cursor-pointer"
                style={{ width: "100%", height: "100%", backgroundColor: "#111" }}
                onClick={handleClick}
                role="link"
                tabIndex={0}
                aria-label={`Sponsored: ${nc.title}`}
            >
                {nc.image ? (
                    <img
                        src={nc.image}
                        alt={nc.title || "Sponsored content"}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        className="transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />
                )}
                <div
                    className="absolute bottom-0 left-0 right-0 z-10"
                    style={{
                        padding: "15px",
                        backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)",
                        pointerEvents: "none",
                    }}
                >
                    <div style={{ pointerEvents: "auto" }}>
                        {nc.category && style.showCategory && (
                            <span
                                className="inline-block"
                                style={{
                                    backgroundColor: nc.categoryColor || "#EF4444",
                                    color: "#fff",
                                    fontSize: "11px",
                                    padding: "0px 6px",
                                    lineHeight: "16px",
                                    letterSpacing: "0.5px",
                                    textTransform: "uppercase",
                                    marginBottom: "5px",
                                    fontWeight: 600,
                                }}
                            >
                                {nc.category}
                            </span>
                        )}
                        <h2 style={{ color: "#fff", fontWeight: 500, fontSize: style.titleSize, lineHeight: style.titleLineHeight, textShadow: "1px 1px 1px rgba(0,0,0,.3)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", marginTop: "4px", marginBottom: 0 }}>
                            {nc.title}
                        </h2>
                        {nc.excerpt && style.showExcerpt && (
                            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: "18px", margin: "6px 0 0", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                {nc.excerpt}
                            </p>
                        )}
                        <ul style={{ listStyle: "none", padding: 0, margin: "6px 0 0", display: "flex", flexWrap: "wrap", gap: "4px" }}>
                            {(nc.author || nc.sponsorName) && style.showAuthor && (
                                <li style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                                    By <span style={{ fontWeight: 700, color: "#fff" }}>{nc.author || nc.sponsorName}</span>
                                </li>
                            )}
                            <li style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", backgroundColor: "rgba(0,0,0,0.4)", padding: "1px 6px", borderRadius: "3px" }}>
                                Ad
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    // ── "review-list" style: 80x60 thumb + title + stars ───────────
    if (cardStyle === "review-list") {
        return (
            <div
                ref={containerRef}
                className="group flex gap-3 mb-3 pb-3 cursor-pointer"
                style={{ borderBottom: "1px solid var(--flex-gray-15, rgba(255,255,255,0.1))" }}
                onClick={handleClick}
                role="link"
                tabIndex={0}
                aria-label={`Sponsored: ${nc.title}`}
            >
                <div className="shrink-0 relative overflow-hidden" style={{ width: "80px", height: "60px" }}>
                    {nc.image ? (
                        <img src={nc.image} alt={nc.title || "Sponsored content"} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />
                    )}
                    <div className="absolute bottom-0 right-0 flex items-center justify-center" style={{ backgroundColor: "#EB0254", color: "#fff", height: "20px", width: "24px", fontSize: "10px" }}>
                        Ad
                    </div>
                </div>
                <div className="min-w-0">
                    <h6 className="font-bold leading-snug mb-1" style={{ fontSize: style.titleSize, color: "var(--heading-color, #fff)" }}>
                        {nc.title}
                    </h6>
                    <div className="flex items-center gap-1" style={{ fontSize: "11px", color: "var(--meta-fcolor, #888)" }}>
                        {[1,2,3,4,5].map(s => (
                            <i key={s} className="fas fa-star" style={{ color: s <= 4 ? "#f5a623" : "#555", fontSize: "10px" }} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // ── "latest-articles" style: image left, text right ─────────────
    if (cardStyle === "latest-articles") {
        return (
            <div
                ref={containerRef}
                className="group flex flex-row gap-4 mb-4 pb-4 cursor-pointer"
                onClick={handleClick}
                role="link"
                tabIndex={0}
                aria-label={`Sponsored: ${nc.title}`}
            >
                <div className="shrink-0 relative" style={{ flex: "0 0 45%" }}>
                    {nc.image ? (
                        <img
                            src={nc.image}
                            alt={nc.title || "Sponsored content"}
                            className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            style={{ height: style.imageHeight }}
                        />
                    ) : (
                        <div className="w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" style={{ height: style.imageHeight }} />
                    )}
                    <div className="absolute flex items-center justify-center rounded-full z-1" style={{ backgroundColor: "#eb0254", color: "#fff", height: "30px", width: "30px", fontSize: "13px", top: "-15px", left: "20px" }}>
                        <i className="fa-solid fa-bolt-lightning" />
                    </div>
                </div>
                <div className="min-w-0" style={{ flex: "1 1 65%" }}>
                    {nc.category && style.showCategory && (
                        <span className="inline-block mb-1" style={{ backgroundColor: nc.categoryColor || "#eb0254", color: "#fff", fontSize: "12px", padding: "0px 8px", lineHeight: "18px", textTransform: "uppercase" }}>
                            {nc.category}
                        </span>
                    )}
                    <h4 className="font-normal md:font-bold leading-tight mb-1" style={{ fontSize: style.titleSize, lineHeight: style.titleLineHeight, color: "var(--heading-color, #fff)" }}>
                        {nc.title}
                    </h4>
                    <div className="flex items-center gap-2 mb-2" style={{ fontSize: "12px", color: "var(--meta-fcolor, #888)" }}>
                        {(nc.author || nc.sponsorName) && style.showAuthor && (
                            <span>By <span style={{ fontWeight: 700, color: "var(--heading-color, #fff)" }}>{nc.author || nc.sponsorName}</span></span>
                        )}
                    </div>
                    {nc.excerpt && style.showExcerpt && (
                        <p className="text-sm line-clamp-2 hidden sm:block" style={{ color: "var(--excerpt-color, #bbb)" }}>{nc.excerpt}</p>
                    )}
                </div>
            </div>
        );
    }

    // ── "sidebar-featured" style: full-width image + title + excerpt ─
    if (cardStyle === "sidebar-featured") {
        const sfImgWidth = (style as any).imageWidth;
        return (
            <div
                ref={containerRef}
                className="mb-3 pb-3 cursor-pointer"
                onClick={handleClick}
                role="link"
                tabIndex={0}
                aria-label={`Sponsored: ${nc.title}`}
            >
                {nc.image && (
                    <div className="block mb-3" style={sfImgWidth ? { width: sfImgWidth } : undefined}>
                        <img src={nc.image} alt={nc.title || "Sponsored content"} className={`object-cover ${sfImgWidth ? "" : "w-full"}`} style={{ height: style.imageHeight, width: sfImgWidth || "100%" }} />
                    </div>
                )}
                <h5 className="font-bold leading-snug mb-1" style={{ fontSize: style.titleSize, lineHeight: style.titleLineHeight, color: "var(--heading-color, #fff)" }}>
                    {nc.title}
                </h5>
                {nc.excerpt && style.showExcerpt && (
                    <p className="text-xs" style={{ color: "var(--meta-fcolor, #888)", fontSize: "12px" }}>{nc.excerpt}</p>
                )}
            </div>
        );
    }

    // ── "sidebar-list" style: text only, no image ────────────────────
    if (cardStyle === "sidebar-list") {
        return (
            <div
                ref={containerRef}
                className="post-grid cursor-pointer"
                style={{ padding: "14px 0", borderBottom: "1px solid var(--flex-gray-15, rgba(255,255,255,0.1))" }}
                onClick={handleClick}
                role="link"
                tabIndex={0}
                aria-label={`Sponsored: ${nc.title}`}
            >
                <div className="posts-inner" style={{ padding: 0 }}>
                    <h6 className="posts-title" style={{ fontFamily: "Roboto, sans-serif", fontSize: style.titleSize, lineHeight: style.titleLineHeight, fontWeight: 500, color: "var(--heading-color, #fff)", marginBottom: "5px" }}>
                        {nc.title}
                    </h6>
                    <div className="flex items-center gap-2" style={{ fontSize: "12px", color: "var(--meta-fcolor, #888)", marginBottom: "5px" }}>
                        {nc.category && style.showCategory && (
                            <span style={{ backgroundColor: nc.categoryColor || "#4c66a3", color: "#fff", fontSize: "14px", padding: "0px 8px", lineHeight: "20px", textTransform: "uppercase", fontWeight: 600 }}>{nc.category}</span>
                        )}
                        <span style={{ color: "#71717a", fontSize: "10px", fontWeight: 400, textTransform: "uppercase" }}>Sponsored</span>
                    </div>
                    {nc.excerpt && style.showExcerpt && (
                        <p style={{ fontFamily: '"Source Sans Pro", sans-serif', fontWeight: 400, fontSize: "15px", color: "var(--excerpt-color, #bbb)", lineHeight: "20px", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {nc.excerpt}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // ── "most-viewed" style: number + title (renders inside template's <li>) ──
    if (cardStyle === "most-viewed") {
        return (
            <div
                ref={containerRef}
                className="cursor-pointer"
                onClick={handleClick}
                role="link"
                tabIndex={0}
                aria-label={`Sponsored: ${nc.title}`}
            >
                <span className="count" style={{ width: "20%", float: "left", color: "var(--meta-fcolor, #888)", fontSize: "40px", paddingInlineEnd: "20px", lineHeight: "24px", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 600 }}>
                    {nc.readTime || "04"}
                </span>
                <span className="text" style={{ width: "80%", float: "left", fontSize: "16px", paddingInlineStart: "20px", borderLeft: "1px solid var(--flex-gray-15, rgba(255,255,255,0.1))", fontWeight: 600, lineHeight: "22px", color: "var(--heading-color, #fff)" }}>
                    {nc.title}
                    <span style={{ display: "block", fontSize: "10px", color: "#71717a", fontWeight: 400, textTransform: "uppercase", marginTop: "4px" }}>Sponsored</span>
                </span>
                <div style={{ clear: "both" }} />
            </div>
        );
    }

    // ── "social-card" style: colored bg + icon + name + followers ──
    if (cardStyle === "social-card") {
        const bgColor = nc.categoryColor || "#0073FF";
        return (
            <div
                ref={containerRef}
                className="group cursor-pointer"
                onClick={handleClick}
                role="link"
                tabIndex={0}
                aria-label={`Sponsored: ${nc.title}`}
            >
                <div
                    className="flex items-center p-[12px_15px] rounded-[6px] transition-opacity duration-300 hover:opacity-70"
                    style={{ backgroundColor: bgColor }}
                >
                    <div className="icon-wrapper flex items-center justify-center w-[30px] h-auto flex-shrink-0 mr-[15px]">
                        {nc.sponsorLogo ? (
                            <img src={nc.sponsorLogo} alt="" className="w-[20px] h-[20px] object-contain" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-white">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                            </svg>
                        )}
                    </div>
                    <div className="content-wrapper flex flex-col">
                        <span className="text-wrapper text-[16px] font-bold text-white leading-tight">
                            {nc.sponsorName || nc.title}
                        </span>
                        <span className="sub-text text-[13px] font-medium text-white/90 mt-[2px]">
                            {nc.sponsorLabel || "Sponsored"}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    // ── "hero-featured" style: matches .hero-featured-card (dark bg, border, padding) ──
    const imgWidth = (style as any).imageWidth;
    const imgAspect = (style as any).imageAspect;
    if (cardStyle === "hero-featured") {
        return (
            <div
                ref={containerRef}
                className="group flex items-start h-25 gap-[12px] cursor-pointer"
                onClick={handleClick}
                role="link"
                tabIndex={0}
                aria-label={`Sponsored: ${nc.title}`}
            >
                <div className="flex-shrink-0 relative overflow-hidden rounded-[8px]" style={{ width: "80px", height: "70px" }}>
                    {nc.image ? (
                        <img src={nc.image} alt={nc.title || "Sponsored content"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    {nc.category && (
                        <span className="inline-block mb-[2px]" style={{ backgroundColor: nc.categoryColor || "#ef4444", color: "#fff", fontSize: "10px", padding: "0px 6px", lineHeight: "16px", textTransform: "uppercase", fontWeight: 600 }}>
                            {nc.category}
                        </span>
                    )}
                    <h5 className="font-semibold leading-[1.35] line-clamp-2" style={{ fontSize: "14px", color: "#fff" }}>
                        {nc.title}
                    </h5>
                    <div className="flex items-center gap-2 mt-[11px]" style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>
                        {(nc.author || nc.sponsorName) && (
                            <span>By {nc.author || nc.sponsorName}</span>
                        )}
                        <span>Sponsored</span>
                    </div>
                </div>
            </div>
        );
    }

    // ── Horizontal card: fixed-width thumbnail + text (used by most card styles) ──
    if (imgWidth) {
        return (
            <div
                ref={containerRef}
                className={`group flex items-center gap-[15px] cursor-pointer ${cardRounded}`}
                onClick={handleClick}
                role="link"
                tabIndex={0}
                aria-label={`Sponsored: ${nc.title}`}
            >
                <div className={`flex-shrink-0 relative overflow-hidden ${imgRounded}`} style={{ width: imgWidth, height: style.imageHeight }}>
                    {nc.image ? (
                        <img
                            src={nc.image}
                            alt={nc.title || "Sponsored content"}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    {nc.category && style.showCategory && (
                        <span className="inline-block mb-1" style={{ backgroundColor: nc.categoryColor || "#ef4444", color: "#fff", fontSize: "11px", padding: "0px 6px", lineHeight: "16px", textTransform: "uppercase", fontWeight: 600 }}>
                            {nc.category}
                        </span>
                    )}
                    <h5
                        className="font-bold leading-snug mb-1 line-clamp-2"
                        style={{
                            fontSize: style.titleSize,
                            lineHeight: style.titleLineHeight,
                            color: "var(--heading-color, #fff)",
                        }}
                    >
                        {nc.title}
                    </h5>
                    <div className="flex items-center gap-2" style={{ fontSize: "11px", color: "var(--meta-fcolor, #888)" }}>
                        {(nc.author || nc.sponsorName) && style.showAuthor && (
                            <span>By {nc.author || nc.sponsorName}</span>
                        )}
                        <span>Sponsored</span>
                    </div>
                </div>
            </div>
        );
    }

    // ── Vertical card: full-width image (with optional aspect ratio) ──
    return (
        <div
            ref={containerRef}
            className="group cursor-pointer"
            onClick={handleClick}
            role="link"
            tabIndex={0}
            aria-label={`Sponsored: ${nc.title}`}
        >
            {nc.image && (
                <div className={`relative overflow-hidden ${imgRounded} mb-2`} style={imgAspect ? { aspectRatio: imgAspect } : undefined}>
                    <img
                        src={nc.image}
                        alt={nc.title || "Sponsored content"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}
            <h5
                className="font-bold leading-snug mb-1"
                style={{
                    fontSize: style.titleSize,
                    lineHeight: style.titleLineHeight,
                    color: "var(--heading-color, #fff)",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}
            >
                {nc.title}
            </h5>
            <div className="flex items-center gap-2" style={{ fontSize: "12px", color: "var(--meta-fcolor, #888)" }}>
                <span>Sponsored</span>
            </div>
        </div>
    );
}

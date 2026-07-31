"use client";

import Link from "next/link";
import data from "@/data/data.json";

const { heading, viewChannelText, viewChannelHref, leftCards, featured, rightCards } =
  data.videoNews;

function PlayIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CategoryPill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="video-cat-pill"
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
}

function SmallVideoCard({
  post,
}: {
  post: (typeof leftCards)[0];
}) {
  return (
    <div className="flex items-center gap-[15px]">
      <Link href={post.href} className="block flex-shrink-0 w-[105px] min-w-[105px] h-[75px] rounded-lg overflow-hidden relative group">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="video-play-btn w-[32px] h-[32px]">
          <PlayIcon size={14} />
        </span>
      </Link>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <CategoryPill label={post.category.label} color={post.category.color} />
        <h6 className="text-[14px] font-semibold text-white leading-[1.35] line-clamp-2 mt-1">
          <Link href={post.href} className="hover:text-[var(--primaryColor)] transition-colors">
            {post.title}
          </Link>
        </h6>
        <ul className="flex items-center gap-2 text-[11px] text-white/60 mt-1">
          <li className="flex items-center gap-1">
            <span>By</span>
            <Link href="#" className="video-author-link transition-colors">
              {post.author}
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3 fill-current opacity-60">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            <span>{post.views} Views</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function VideoNews() {
  return (
    <section className="video-section">
      <div className="nerio-container">
        {/* SECTION HEADER */}
        <div className="flex justify-between items-center mb-[30px]">
          <h2 className="text-[28px] font-bold text-white">{heading}</h2>
          <Link
            href={viewChannelHref}
            className="group relative inline-flex items-center gap-2 text-white font-semibold text-[16px] no-underline"
          >
            <span>{viewChannelText}</span>
            <span className="inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 12"
                className="w-[18px] h-3 fill-current"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.2079 5.0991C14.0115 5.0991 12.0097 3.0991 12.0097 0.900901V0H10.2079V0.900901C10.2079 2.4991 10.9088 3.9982 12.0088 5.0991H0.892578V6.9009H12.0088C10.9088 8.0018 10.2079 9.5009 10.2079 11.0991V12H12.0097V11.0991C12.0097 8.9018 14.0115 6.9009 16.2079 6.9009H17.1088V5.0991H16.2079Z"
                />
              </svg>
            </span>
            <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-[var(--primaryColor)] transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>

        {/* MAIN 3-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[28fr_44fr_28fr] gap-[20px] items-stretch">
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-between gap-[20px] order-2 lg:order-1">
            {leftCards.map((post, i) => (
              <SmallVideoCard key={i} post={post} />
            ))}
          </div>

          {/* CENTER FEATURED CARD */}
          <div className="relative rounded-xl overflow-hidden min-h-[380px] lg:min-h-full flex flex-col justify-end p-[30px] order-1 lg:order-2 group">
            <Link href={featured.href} className="absolute inset-0 z-0">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <div className="video-thumb-overlay" />
            <span className="video-play-btn video-play-btn--large z-[2]">
              <PlayIcon size={24} />
            </span>
            <div className="relative z-[2] mt-auto">
              <CategoryPill label={featured.category.label} color={featured.category.color} />
              <h4 className="mt-[10px] text-[20px] lg:text-[22px] font-bold text-white leading-[1.3] line-clamp-2">
                {featured.title}
              </h4>
              <ul className="flex items-center gap-[12px] mt-[10px] text-[13px] text-white/70 flex-wrap">
                <li className="flex items-center gap-1">
                  <span>By</span>
                  <span className="video-author-link transition-colors cursor-pointer">
                    {featured.author}
                  </span>
                </li>
                <li className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current opacity-60">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                  <span>{featured.views} Views</span>
                </li>
                <li className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current opacity-60">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
                  </svg>
                  <span>{featured.date}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-between gap-[20px] order-3">
            {rightCards.map((post, i) => (
              <SmallVideoCard key={i} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
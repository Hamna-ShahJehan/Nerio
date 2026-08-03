"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

import Link from "next/link";
import data from "@/data/data.json";

const { heading, viewAllText, viewAllHref, featured, sidePosts, sliderPosts } =
  data.breakingNews;

function PostBadge({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <span className="post-cat w-fit" style={{ "--catCurrentBgColor": color, "--catCurrentColor": "#ffffff" } as React.CSSProperties}>
      {label}
    </span>
  );
}

export default function BreakingNews() {
  return (
    <section className="breaking-section py-[60px] bg-white">
      <div className="nerio-container">
        {/* SECTION HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[28px] font-bold text-[var(--titleColor)]">{heading}</h2>
          <Link href={viewAllHref} className="group inline-flex items-center gap-2 text-[var(--titleColor)] font-semibold text-base no-underline relative">
            <span>{viewAllText}</span>
            <span className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 12" className="w-[18px] h-3 fill-current">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.2079 5.0991C14.0115 5.0991 12.0097 3.0991 12.0097 0.900901V0H10.2079V0.900901C10.2079 2.4991 10.9088 3.9982 12.0088 5.0991H0.892578V6.9009H12.0088C10.9088 8.0018 10.2079 9.5009 10.2079 11.0991V12H12.0097V11.0991C12.0097 8.9018 14.0115 6.9009 16.2079 6.9009H17.1088V5.0991H16.2079Z" />
              </svg>
            </span>
            <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-[var(--primaryColor)] transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>

        {/* TOP ROW — Featured card left + Side cards right */}
        <div className="flex gap-6 max-[1024px]:flex-col max-[1024px]:gap-5">
          {/* LEFT — Large featured card */}
          <div className="flex-1 min-w-0 relative rounded-xl overflow-hidden group">
            <Link href={featured.href} className="block relative h-full">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <PostBadge label={featured.category.label} color={featured.category.color} />
                <h3 className="mt-3 text-xl md:text-[22px] font-semibold text-white leading-snug">
                  {featured.title}
                </h3>
                <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-[13px] text-white/70">
                  <li className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current opacity-60"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    <span>By <span className="hover:text-[var(--primaryColor)] transition-colors cursor-pointer">{featured.author}</span></span>
                  </li>
                  <li className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current opacity-60"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                    <span>{featured.views}</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current opacity-60"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>
                    <span>{featured.date}</span>
                  </li>
                </ul>
              </div>
            </Link>
          </div>

          {/* RIGHT — 3 compact horizontal cards stacked */}
          <div className="w-[380px] flex-shrink-0 flex flex-col max-[1024px]:w-full">
            {sidePosts.map((post, i) => (
              <div
                key={i}
                className="flex gap-3 bg-white rounded-lg p-3 mb-3 last:mb-0 border border-gray-100 transition-colors hover:bg-gray-50"
              >
                <Link href={post.href} className="block flex-shrink-0 w-[100px] h-[85px] rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                  <PostBadge label={post.category.label} color={post.category.color} />
                  <h6 className="text-sm font-semibold text-[var(--titleColor)] leading-[1.35] line-clamp-2">
                    <Link href={post.href} className="hover:text-[var(--primaryColor)] transition-colors">
                      {post.title}
                    </Link>
                  </h6>
                  <ul className="flex items-center gap-2 text-[11px] text-[var(--bodyColor)]">
                    <li className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3 fill-current opacity-50"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                      <span>By <Link href="#" className="text-[var(--bodyColor)] hover:text-[var(--primaryColor)] transition-colors">{post.author}</Link></span>
                    </li>
                    <li className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3 fill-current opacity-50"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                      <span>{post.views} Views</span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM ROW — Swiper carousel */}
        <div className="mt-8">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false }}
            loop
            spaceBetween={24}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {sliderPosts.map((post, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="group flex h-full flex-col bg-white border border-[var(--borderColor,#e5e7eb)] rounded-[12px] overflow-hidden p-[16px] transition-all duration-300 hover:shadow-md">
                  <Link href={post.href} className="block relative overflow-hidden rounded-[8px] aspect-[16/10] flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-col flex-1 pt-[16px]">
                    <PostBadge label={post.category.label} color={post.category.color} />
                    <h4 className="mt-[10px] text-[18px] font-bold text-[var(--titleColor)] leading-[1.35] line-clamp-2">
                      <Link href={post.href} className="text-[var(--titleColor)] transition-colors duration-200 hover:text-[var(--primaryColor)]">
                        {post.title}
                      </Link>
                    </h4>
                    <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-[12px] mt-auto text-[14px] text-[var(--bodyColor)]">
                      <li className="flex items-center gap-1">
                        <span>By</span>
                        <Link href="#" className="font-medium text-[var(--titleColor)] transition-colors duration-200 hover:text-[var(--primaryColor)]">
                          {post.author}
                        </Link>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                        <span>{post.views} Views</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>
                        <span>{post.date}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

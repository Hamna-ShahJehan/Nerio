"use client";

import { useState, type ReactElement } from "react";
import Link from "next/link";
import data from "@/data/data.json";

const { heading, viewAllText, viewAllHref, articles, tabs, weather, social, tags } =
  data.topOfWeek;

type TabKey = "recent" | "popular" | "trendy";
const tabLabels: { key: TabKey; label: string }[] = [
  { key: "recent", label: "Recent" },
  { key: "popular", label: "Popular" },
  { key: "trendy", label: "Trendy" },
];

function ViewAllButton({ text, href }: { text: string; href: string }) {
  return (
    <Link href={href} className="tw-view-all-btn group inline-flex items-center gap-2 text-[16px] font-semibold text-[#121213] no-underline">
      <span className="tw-btn-text" data-text={text}>{text}</span>
      <span className="tw-btn-icon inline-flex items-center overflow-hidden w-[1em] h-[1em]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 12" className="w-[18px] h-3 fill-current transition-transform duration-300 group-hover:translate-x-[150%] absolute">
          <path fillRule="evenodd" clipRule="evenodd" d="M16.2079 5.0991C14.0115 5.0991 12.0097 3.0991 12.0097 0.900901V0H10.2079V0.900901C10.2079 2.4991 10.9088 3.9982 12.0088 5.0991H0.892578V6.9009H12.0088C10.9088 8.0018 10.2079 9.5009 10.2079 11.0991V12H12.0097V11.0991C12.0097 8.9018 14.0115 6.9009 16.2079 6.9009H17.1088V5.0991H16.2079Z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 12" className="w-[18px] h-3 fill-current transition-transform duration-300 -translate-x-[150%] group-hover:translate-x-0 absolute">
          <path fillRule="evenodd" clipRule="evenodd" d="M16.2079 5.0991C14.0115 5.0991 12.0097 3.0991 12.0097 0.900901V0H10.2079V0.900901C10.2079 2.4991 10.9088 3.9982 12.0088 5.0991H0.892578V6.9009H12.0088C10.9088 8.0018 10.2079 9.5009 10.2079 11.0991V12H12.0097V11.0991C12.0097 8.9018 14.0115 6.9009 16.2079 6.9009H17.1088V5.0991H16.2079Z" />
        </svg>
      </span>
    </Link>
  );
}

function CategoryPill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center px-[10px] py-[1px] rounded-[0_100px_100px_70px] font-medium text-[12px] uppercase leading-[22px] text-white"
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
}

function ArticleCard({ post }: { post: (typeof articles)[0] }) {
  return (
    <div className="tw-article-card group flex flex-col md:flex-row items-center md:items-stretch gap-[25px] p-3 rounded-[10px] border border-[var(--borderColor)] overflow-hidden transition-all duration-300">
      <Link href={post.href} className="block w-full md:w-[320px] aspect-[16/10] md:aspect-auto md:h-auto flex-shrink-0 rounded-[10px] overflow-hidden relative group/img">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-110"
        />
      </Link>
      <div className="flex flex-col justify-between py-[15px] gap-[10px] flex-1 min-w-0 w-full">
        <div>
          <CategoryPill label={post.category.label} color={post.category.color} />
          <h4 className="mt-[9px] mb-[7px] text-[18px] font-bold text-[var(--titleColor)] leading-[1.4]">
            <Link href={post.href} className="transition-colors duration-300 group-hover:text-[var(--primaryColor)]">
              {post.title}
            </Link>
          </h4>
          <p className="text-[14px] text-[var(--bodyColor)] leading-[1.6] line-clamp-2">
            {post.excerpt}
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-3 text-[14px] text-[var(--bodyColor)]">
          <li className="flex items-center gap-1">
            <span>By</span>
            <Link href="#" className="transition-colors duration-300 group-hover:text-[var(--primaryColor)] font-medium">
              {post.author}
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
              <path d="M3.34 17a10.018 10.018 0 0 1-.978-2.326 3 3 0 0 1 1.069-.955l.011-.007.014-.008a3 3 0 0 1 1.557-1l.119.003a3 3 0 0 1 2.827 2.828l.005.115a3 3 0 0 1-1.001 2.137l-.009.008-.01.008a3 3 0 0 1-1.217.744l-.004.001a3 3 0 0 1-2.411-.318l.642-.642a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.642.642A3 3 0 0 1 3.34 17z" />
            </svg>
            <span>{post.views} Views</span>
          </li>
          <li className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
            </svg>
            <span>{post.date}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function TabCard({ post }: { post: (typeof tabs.recent)[0] }) {
  return (
    <div className="tw-tab-card flex items-center gap-[15px]">
      <Link href={post.href} className="block flex-shrink-0 w-[80px] h-[80px] rounded-full overflow-hidden group">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <h6 className="text-[14px] font-semibold text-[var(--titleColor)] leading-[1.35] line-clamp-2 mb-[7px]">
          <Link href={post.href} className="hover:text-[var(--primaryColor)] transition-colors">
            {post.title}
          </Link>
        </h6>
        <ul className="flex items-center gap-2 text-[13px] text-[var(--bodyColor)] whitespace-nowrap">
          <li className="flex items-center gap-1">
            <span>By</span>
            <Link href="#" className="hover:text-[var(--primaryColor)] transition-colors">
              {post.author}
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3 fill-current">
              <path d="M3.34 17a10.018 10.018 0 0 1-.978-2.326 3 3 0 0 1 1.069-.955l.011-.007.014-.008a3 3 0 0 1 1.557-1l.119.003a3 3 0 0 1 2.827 2.828l.005.115a3 3 0 0 1-1.001 2.137l-.009.008-.01.008a3 3 0 0 1-1.217.744l-.004.001a3 3 0 0 1-2.411-.318l.642-.642a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.642.642A3 3 0 0 1 3.34 17z" />
            </svg>
            <span>{post.views} Views</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function WeatherCard() {
  return (
    <div className="tw-weather-card relative rounded-[10px] p-[24px] overflow-hidden text-white">
      <div className="relative z-[2]">
        {/* Top Header & Date */}
        <div className="flex justify-between items-center mb-[15px] pb-[15px] border-b border-white/25">
          <div>
            <h3 className="text-[20px] font-bold leading-tight">Weather</h3>
            <span className="text-[12px] opacity-90">Current weather {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <span className="text-[13px]">
            {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
          </span>
        </div>

        {/* Main Temperature Display */}
        <div className="flex items-center gap-[10px] mb-[15px] pb-[15px] border-b border-white/25">
          <div className="tw-sun-icon w-[50px] h-[50px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" className="w-full h-full">
              <defs>
                <linearGradient id="sunGrad" x1="150" x2="234" y1="119.2" y2="264.8" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#fbbf24" />
                  <stop offset=".5" stopColor="#fbbf24" />
                  <stop offset="1" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              <circle cx="192" cy="192" r="84" fill="url(#sunGrad)" stroke="#f8af18" strokeMiterlimit="10" strokeWidth="6" />
              <path fill="none" stroke="#fbbf24" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="24" d="M192 61.7V12m0 360v-49.7m92.2-222.5 35-35M64.8 319.2l35.1-35.1m0-184.4-35-35m254.5 254.5-35.1-35.1M61.7 192H12m360 0h-49.7">
                <animateTransform additive="sum" attributeName="transform" dur="6s" repeatCount="indefinite" type="rotate" values="0 192 192; 45 192 192" />
              </path>
            </svg>
          </div>
          <div className="text-[36px] font-semibold leading-none">
            {weather.temperature}<sup className="text-[18px] ml-[2px]">°C</sup>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div className="flex items-center gap-[10px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0"><path d="M15 13V5a3 3 0 0 0-6 0v8a5 5 0 1 0 6 0zm-6-1a4 4 0 1 1 4 4h-8a4 4 0 0 1 4-4z" /></svg>
            <div className="flex flex-col-reverse">
              <div className="text-[12px] opacity-80">Feels Like</div>
              <div className="text-[13px] font-medium">{weather.feelsLike}°C</div>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0"><path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z" /></svg>
            <div className="flex flex-col-reverse">
              <div className="text-[12px] opacity-80">Humidity</div>
              <div className="text-[13px] font-medium">{weather.humidity}</div>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0"><path d="M17 4l-1.41 1.41L18.17 8H11v2h7.17l-2.58 2.59L17 14l5-5-5-5zM5 2h6v2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h6v-2H5V4h14v7h2V4c0-1.1-.9-2-2-2H5z" /></svg>
            <div className="flex flex-col-reverse">
              <div className="text-[12px] opacity-80">Condition</div>
              <div className="text-[13px] font-medium">{weather.condition}</div>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" /></svg>
            <div className="flex flex-col-reverse">
              <div className="text-[12px] opacity-80">Current City</div>
              <div className="text-[13px] font-medium">{weather.city}</div>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0"><path d="M14.5 17c0 1.65-1.35 3-3 3s-3-1.35-3-3h2c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1H2v-2h9.5c1.65 0 3 1.35 3 3zM19 6.5C19 4.57 17.43 3 15.5 3S12 4.57 12 6.5h2c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S16.33 8 15.5 8H2v2h13.5c1.93 0 3.5-1.57 3.5-3.5zm-.5 4.5H2v2h16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S17 15.33 17 14.5h-2c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z" /></svg>
            <div className="flex flex-col-reverse">
              <div className="text-[12px] opacity-80">Wind Info</div>
              <div className="text-[13px] font-medium">{weather.wind}</div>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
            <div className="flex flex-col-reverse">
              <div className="text-[12px] opacity-80">Country</div>
              <div className="text-[13px] font-medium">{weather.country}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FollowCard() {
  const socialIcons: Record<string, ReactElement> = {
    facebook: <svg viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>,
    twitter: <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>,
    dribbble: <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.252 8 8 119.252 8 256s111.252 248 248 248 248-111.252 248-248S392.748 8 256 8zm163.97 114.366c29.503 36.046 47.369 81.957 47.835 131.955-6.984-1.477-77.018-15.682-147.502-6.818-5.752-14.041-11.181-26.393-18.617-41.614 78.321-31.977 113.818-77.482 118.284-83.523zM396.421 97.87c-3.81 5.427-35.697 48.286-111.021 76.519-34.712-63.776-73.185-116.168-79.04-124.008 67.176-16.193 137.966 1.27 190.061 47.489zm-230.48-33.25c5.585 7.659 43.438 60.116 78.537 122.509-99.087 26.313-186.36 25.934-195.834 25.809C62.38 147.205 106.678 92.573 165.941 64.62zM44.17 256.323c0-2.166.043-4.322.108-6.473 9.268.19 111.92 1.513 217.706-30.146 6.064 11.868 11.857 23.915 17.174 35.949-76.599 21.575-146.194 83.527-180.531 142.306C64.794 360.405 44.17 310.73 44.17 256.323zm81.807 167.113c22.127-45.233 82.178-103.622 167.579-132.756 29.74 77.283 42.039 142.053 45.189 160.638-68.112 29.013-150.015 21.053-212.768-27.882zm248.38 8.489c-2.171-12.886-13.446-74.897-41.152-151.033 66.38-10.626 124.7 6.768 131.947 9.055-9.442 58.941-43.273 109.844-90.795 141.978z" /></svg>,
    pinterest: <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z" /></svg>,
    linkedin: <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" /></svg>,
    instagram: <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>,
  };

  return (
    <div className="tw-follow-card rounded-[10px] border border-[var(--borderColor)] p-[30px]">
      <h4 className="text-[18px] font-bold text-[var(--titleColor)] mb-[20px]">Follow Us</h4>
      <div className="flex flex-col gap-3">
        {social.map((item) => (
          <a
            key={item.name}
            href="#"
            className="tw-social-link flex items-center gap-3 p-[12px_20px] rounded-[8px] !text-white no-underline transition-all duration-300 hover:brightness-110 hover:shadow-md"
            style={{ backgroundColor: item.color }}
          >
            <span className="w-5 h-5 flex-shrink-0 !fill-white flex items-center justify-center">
              {socialIcons[item.icon]}
            </span>
            <span className="text-[15px] font-medium !text-white">{item.name}</span>
            <span className="text-[14px] font-normal ml-auto opacity-95 !text-white">{item.followers}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function TagsCard() {
  return (
    <div className="tw-tags-card bg-white rounded-[10px] border border-[var(--borderColor)] p-[30px] shadow-sm">
      <h4 className="text-[18px] font-bold text-[var(--titleColor)] mb-[20px]">Tags</h4>
      <div className="flex flex-wrap gap-[15px]">
        {tags.map((tag) => (
          <Link
            key={tag}
            href="#"
            className="tw-tag-item px-[15px] py-[5px] rounded-md font-normal text-[14px] bg-white border border-[var(--borderColor)] !text-black transition-all duration-300 hover:bg-[var(--primaryColor)] hover:!text-white hover:border-[var(--primaryColor)]"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function TopOfWeek() {
  const [activeTab, setActiveTab] = useState<TabKey>("recent");

  return (
    <section className="py-[70px] bg-white">
      <div className="nerio-container">
        <div className="flex justify-between items-center mb-[30px]">
          <h2 className="text-[28px] font-bold text-[var(--titleColor)]">{heading}</h2>
          <ViewAllButton text={viewAllText} href={viewAllHref} />
        </div>

        <div className="flex flex-col lg:flex-row gap-[30px]">
          {/* LEFT COLUMN — Articles */}
          <div className="flex-1 min-w-0 flex flex-col gap-[30px]">
            {articles.map((post, i) => (
              <ArticleCard key={i} post={post} />
            ))}
          </div>

          {/* RIGHT COLUMN — Sidebar containing all sidebar cards */}
          <div className="w-full lg:w-[350px] flex-shrink-0 flex flex-col gap-[30px] lg:sticky lg:top-[125px] self-start">
            {/* Tabs Section */}
            <div className="rounded-[10px] border border-[var(--borderColor)] p-[25px]">
              <div className="grid grid-cols-3 gap-[8px] mb-[20px]">
                {tabLabels.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`py-[10px] rounded-md text-[14px] font-semibold transition-all duration-300 border text-center whitespace-nowrap ${activeTab === tab.key
                      ? "bg-[var(--primaryColor)] text-white border-[var(--primaryColor)]"
                      : "bg-transparent text-[var(--titleColor)] border-[var(--borderColor)] hover:bg-[var(--primaryColor)] hover:text-white hover:border-[var(--primaryColor)]"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-col">
                {tabs[activeTab].map((post, i) => (
                  <TabCard key={`${activeTab}-${i}`} post={post} />
                ))}
              </div>
            </div>

            {/* Weather Card */}
            <WeatherCard />

            {/* Follow Us Card */}
            <FollowCard />

            {/* Tags Card */}
            <TagsCard />
          </div>
        </div>
      </div>
    </section>
  );
}
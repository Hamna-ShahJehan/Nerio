"use client";

import { useState } from "react";
import Link from "next/link";
import data from "@/data/data.json";
import { generateSlug } from "@/lib/slug";

type TabKey = "recent" | "popular" | "trendy";

const tabs: { key: TabKey; label: string }[] = [
  { key: "recent", label: "Recent" },
  { key: "popular", label: "Popular" },
  { key: "trendy", label: "Trendy" },
];

function getHref(item: { href: string; title: string }) {
  return item.href !== "#" ? item.href : `/${generateSlug(item.title)}`;
}

export default function TabWidget() {
  const [activeTab, setActiveTab] = useState<TabKey>("recent");
  const posts = data.topOfWeek.tabs[activeTab];

  return (
    <div className="border border-border rounded-[10px] p-[20px_20px_10px] bg-white">
      <div className="flex gap-[12px] mb-[20px]">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-[12px] px-[16px] text-[16px] font-bold rounded-[8px] transition-all duration-200 ${activeTab === tab.key
              ? "text-white bg-[#007AFF]"
              : "text-titleColor bg-white border border-border hover:text-primary"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {posts.map((post, i) => (
          <div key={i} className="flex items-center gap-[16px] py-[15px] group">
            <Link href={getHref(post)} className="w-[85px] h-[85px] rounded-full overflow-hidden flex-shrink-0">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <h6 className="text-[16px] font-normal text-black leading-[1.35] line-clamp-2 group-hover:text-primary transition-colors">
                <Link href={getHref(post)}>{post.title}</Link>
              </h6>
              <ul className="fpg-post-meta flex flex-wrap items-center gap-[12px] mt-[10px] text-[13px] text-bodyColor">
                <li>
                  <span className="fpg-meta flex items-center flex-wrap gap-[8px]">
                    <span>By {post.author}</span>
                  </span>
                </li>
                <li className="flex items-center gap-[4px]">
                  <span className="w-[3px] h-[3px] rounded-full bg-bodyColor/60"></span>
                </li>
                <li>
                  <span className="fpg-meta flex items-center gap-[5px]">
                    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                    {post.views} Views
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
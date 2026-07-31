"use client";

import Link from "next/link";
import data from "@/data/data.json";

const { heading, viewAllText, viewAllHref, cards } = data.topStories;

function ViewAllButton({ text, href }: { text: string; href: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-[16px] font-semibold text-[var(--titleColor)] no-underline"
    >
      <span className="relative overflow-hidden inline-block h-[1.3em] leading-[1.3em]">
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {text}
        </span>
        <span className="block absolute left-0 top-full transition-transform duration-300 ease-out group-hover:-translate-y-full text-[var(--primaryColor)]">
          {text}
        </span>
      </span>

      <span className="inline-flex items-center overflow-hidden w-[1em] h-[1em] relative text-current">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 12"
          className="w-[18px] h-3 fill-current transition-transform duration-300 ease-out group-hover:translate-x-[150%] absolute"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.2079 5.0991C14.0115 5.0991 12.0097 3.0991 12.0097 0.900901V0H10.2079V0.900901C10.2079 2.4991 10.9088 3.9982 12.0088 5.0991H0.892578V6.9009H12.0088C10.9088 8.0018 10.2079 9.5009 10.2079 11.0991V12H12.0097V11.0991C12.0097 8.9018 14.0115 6.9009 16.2079 6.9009H17.1088V5.0991H16.2079Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 12"
          className="w-[18px] h-3 fill-current transition-transform duration-300 ease-out -translate-x-[150%] group-hover:translate-x-0 absolute"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.2079 5.0991C14.0115 5.0991 12.0097 3.0991 12.0097 0.900901V0H10.2079V0.900901C10.2079 2.4991 10.9088 3.9982 12.0088 5.0991H0.892578V6.9009H12.0088C10.9088 8.0018 10.2079 9.5009 10.2079 11.0991V12H12.0097V11.0991C12.0097 8.9018 14.0115 6.9009 16.2079 6.9009H17.1088V5.0991H16.2079Z"
          />
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

/* ── LEFT CARD ── */
function LargeCard({ post }: { post: (typeof cards)[0] }) {
  return (
    <div className="group relative rounded-[12px] overflow-hidden h-full min-h-[495px] flex flex-col justify-end shadow-sm">
      <Link href={post.href} className="absolute inset-0 z-0 block">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      <div className="absolute bottom-0 left-0 right-0 h-[230px] bg-gradient-to-t from-black/95 via-black/55 to-transparent pointer-events-none z-[1]" />

      <div className="relative p-[25px] z-[2]">
        <CategoryPill label={post.category.label} color={post.category.color} />
        <h4 className="mt-[10px] mb-[10px] text-[20px] font-bold text-white leading-[1.35]">
          <Link href={post.href}>{post.title}</Link>
        </h4>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-white/80">
          <li className="flex items-center gap-1">
            <span>By</span>
            <Link
              href="#"
              className="text-white font-medium transition-colors duration-200 hover:text-[var(--primaryColor)]"
            >
              {post.author}
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            <span>{post.views} Views</span>
          </li>
          <li className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
            </svg>
            <span>{post.date}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

/* ── RIGHT CARDS ── Tighter spacing and taller image area ── */
function StandardCard({ post }: { post: (typeof cards)[1] }) {
  return (
    <div className="group relative bg-white border border-[var(--borderColor,#e5e7eb)] rounded-[12px] overflow-hidden h-full min-h-[495px] flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-md p-[16px]">
      <div className="relative overflow-hidden rounded-[8px] h-[310px] flex-shrink-0">
        <Link href={post.href} className="block w-full h-full">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>
      </div>
      <div className="flex flex-col justify-end pt-1 pb-1 px-1">
        <div className="mb-[6px]">
          <CategoryPill label={post.category.label} color={post.category.color} />
        </div>
        <h4 className="mb-[6px] text-[18px] font-bold text-[var(--titleColor)] leading-[1.35] line-clamp-2">
          <Link
            href={post.href}
            className="transition-colors duration-200 hover:text-[var(--primaryColor)]"
          >
            {post.title}
          </Link>
        </h4>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-[var(--bodyColor,#6b7280)]">
          <li className="flex items-center gap-1">
            <span>By</span>
            <Link
              href="#"
              className="font-medium text-[var(--titleColor)] transition-colors duration-200 hover:text-[var(--primaryColor)]"
            >
              {post.author}
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            <span>{post.views} Views</span>
          </li>
          <li className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
            </svg>
            <span>{post.date}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function TopStories() {
  return (
    <section className="py-[70px] bg-white">
      <div className="nerio-container">
        <div className="flex justify-between items-center mb-[30px]">
          <h2 className="text-[28px] font-bold text-[var(--titleColor)]">{heading}</h2>
          <ViewAllButton text={viewAllText} href={viewAllHref} />
        </div>

        <div className="grid grid-cols-12 gap-[25px] items-stretch">
          <div className="col-span-12 lg:col-span-4">
            <LargeCard post={cards[0]} />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <StandardCard post={cards[1]} />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <StandardCard post={cards[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}
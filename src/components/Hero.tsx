"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

import data from "@/data/data.json";

const { featured, featuredCards, recentNews } = data.hero;

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        {/* LEFT COLUMN — Featured post + cards below */}
        <div className="hero-featured">
          <div className="hero-featured-content">
            <div className="hero-post-cat">
              <a
                href={featured.href}
                className="post-cat"
                style={{
                  "--catCurrentBgColor": featured.category.color,
                  "--catCurrentColor": "#ffffff",
                } as React.CSSProperties}
              >
                {featured.category.label}
              </a>
            </div>
            <h1 className="hero-post-title">
              <a href={featured.href}>{featured.title}</a>
            </h1>
            <ul className="hero-post-meta">
              <li>
                <span className="fpg-meta">
                  <span>
                    By{" "}
                    <a href="#" className="fpg-author-link">
                      {featured.author}
                    </a>
                  </span>
                </span>
              </li>
              <li>
                <span className="fpg-meta">
                  <i className="ri-pulse-fill" /> {featured.views}
                </span>
              </li>
              <li>
                <span className="fpg-meta">
                  <i className="ri-calendar-line" /> {featured.date}
                </span>
              </li>
            </ul>
            <div className="fpg-btn-wrapper">
              <a href={featured.href}>{featured.buttonText}</a>
            </div>
          </div>

          {/* Featured cards carousel below the button */}
          <div className="hero-featured-cards">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false }}
              loop
              spaceBetween={20}
              slidesPerView={1}
              slidesPerGroup={1}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 3 },
              }}
            >
              {featuredCards.map((post, i) => (
                <SwiperSlide key={i} className="h-auto">
                  <div className="hero-featured-card">
                    <div className="fpg-post-thumb">
                      <a href={post.href} className="image-link">
                        <img src={post.image} alt="" width={300} height={149} />
                      </a>
                    </div>
                    <div className="fpg-post-content">
                      <div className="fpg-post-content-inner">
                        <div className="fpg-post-cat">
                          <a
                            href={post.href}
                            className="post-cat"
                            style={{
                              "--catCurrentBgColor": post.category.color,
                              "--catCurrentColor": "#ffffff",
                            } as React.CSSProperties}
                          >
                            {post.category.label}
                          </a>
                        </div>
                        <h6 className="fpg-post-title">
                          <a href={post.href}>{post.title}</a>
                        </h6>
                      </div>
                      <ul className="fpg-post-meta">
                        <li>
                          <span className="fpg-meta">
                            <span>
                              By{" "}
                              <a href="#" className="fpg-author-link">
                                {post.author}
                              </a>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="fpg-meta">
                            <i className="ri-pulse-fill" /> {post.views} Views
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* RIGHT COLUMN — Recent News */}
        <div className="hero-recent">
          <div className="hero-recent-header">
            <h4>{recentNews.heading}</h4>
            <a href={recentNews.viewAllHref} className="hero-view-all-btn">
              <span className="button-text" data-text={recentNews.viewAllText}>
                {recentNews.viewAllText}
              </span>
              <span className="button-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 12">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.2079 5.0991C14.0115 5.0991 12.0097 3.0991 12.0097 0.900901V0H10.2079V0.900901C10.2079 2.4991 10.9088 3.9982 12.0088 5.0991H0.892578V6.9009H12.0088C10.9088 8.0018 10.2079 9.5009 10.2079 11.0991V12H12.0097V11.0991C12.0097 8.9018 14.0115 6.9009 16.2079 6.9009H17.1088V5.0991H16.2079Z"
                  />
                </svg>
              </span>
            </a>
          </div>
          <div className="hero-recent-grid">
            {recentNews.posts.map((post, i) => (
              <div className="fpg-card-style style-two" key={i}>
                <div className="fpg-post-thumb">
                  <a href={post.href} className="image-link">
                    <img src={post.image} alt="" width={300} height={149} />
                  </a>
                </div>
                <div className="fpg-post-content">
                  <div className="fpg-post-content-inner">
                    <div className="fpg-post-cat">
                      <a
                        href={post.href}
                        className="post-cat"
                        style={{
                          "--catCurrentBgColor": post.category.color,
                          "--catCurrentColor": "#ffffff",
                        } as React.CSSProperties}
                      >
                        {post.category.label}
                      </a>
                    </div>
                    <h6 className="fpg-post-title">
                      <a href={post.href}>{post.title}</a>
                    </h6>
                  </div>
                  <ul className="fpg-post-meta">
                    <li>
                      <span className="fpg-meta">
                        <span>
                          By{" "}
                          <a href="#" className="fpg-author-link">
                            {post.author}
                          </a>
                        </span>
                      </span>
                    </li>
                    <li>
                      <span className="fpg-meta">
                        <i className="ri-pulse-fill" /> {post.views} Views
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

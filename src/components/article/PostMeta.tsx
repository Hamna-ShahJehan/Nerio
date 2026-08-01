export default function PostMeta({
  author,
  date,
  category,
  comments,
}: {
  author: { name: string; avatar: string };
  date: string;
  category: { label: string; color: string };
  comments: string;
}) {
  return (
    <div className="rstb-post-meta flex flex-wrap items-center gap-[15px] mt-[25px] mb-[28px]">
      <a href="#" className="post-meta post-meta-author flex items-center gap-[8px] group">
        <span className="meta-icon w-[25px] rounded-[50px] overflow-hidden inline-flex items-center">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-full h-auto object-cover"
          />
        </span>
        <span className="text-[15px] text-bodyColor group-hover:text-primaryColor transition-colors">
          {author.name}
        </span>
      </a>

      <a href="#" className="post-meta post-meta-date flex items-center gap-[8px] text-[15px] text-bodyColor hover:text-primaryColor transition-colors">
        <span className="meta-icon inline-flex items-center text-primaryColor">
          <svg width="14" height="14" viewBox="0 0 448 512" fill="currentColor">
            <path d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z" />
          </svg>
        </span>
        <span>{date}</span>
      </a>

      <div className="post-meta post-meta-category flex items-center gap-[8px] text-[15px] text-bodyColor">
        <span className="meta-icon inline-flex items-center text-primaryColor">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 8V20.9932C21 21.5501 20.5552 22 20.0066 22H3.9934C3.44495 22 3 21.556 3 21.0082V2.9918C3 2.45531 3.4487 2 4.00221 2H14.9968L21 8ZM19 9H14V4H5V20H19V9ZM8 7H11V9H8V7ZM8 11H16V13H8V11ZM8 15H16V17H8V15Z" />
          </svg>
        </span>
        <span className="inner-pills-wrapper flex items-center">
          <a href="#" className="inner-pill-item px-[15px] py-[10px] rounded-[5px] text-bodyColor hover:text-primaryColor transition-colors text-[15px]">{category.label}</a>
        </span>
      </div>

      <a href="#" className="post-meta post-meta-comment flex items-center gap-[8px] text-[15px] text-bodyColor hover:text-primaryColor transition-colors">
        <span className="meta-icon inline-flex items-center text-primaryColor">
          <svg width="14" height="14" viewBox="0 0 512 512" fill="currentColor">
            <path d="M144 208c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm112 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm112 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zM256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z" />
          </svg>
        </span>
        <span>{comments}</span>
      </a>
    </div>
  );
}

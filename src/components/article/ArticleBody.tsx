export default function ArticleBody({
  content,
}: {
  content: { type: string; text?: string; src?: string; images?: string[]; author?: string; items?: string[] }[];
}) {
  return (
    <div className="rstb-post-content mb-[30px]">
      {content.map((block, i) => {
        if (block.type === "paragraph") {
          return (
            <p key={i} className="text-bodyColor text-[16px] leading-[1.75] mb-[20px]">
              {block.text}
            </p>
          );
        }

        if (block.type === "heading") {
          return (
            <h3 key={i} className="font-title text-titleColor text-[22px] lg:text-[24px] font-bold mt-[30px] mb-[16px] leading-[1.3]">
              {block.text}
            </h3>
          );
        }

        if (block.type === "check-list") {
          return (
            <ul key={i} className="rs-has-check-icon mb-[20px]">
              {(block.items || block.text?.split("\n") || []).map((item, j) => (
                <li key={j} className="text-bodyColor text-[16px] leading-[1.75] mb-[8px]">
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "images-side-by-side") {
          return (
            <div key={i} className="wp-block-gallery rs-img-rounded-sm grid grid-cols-1 sm:grid-cols-2 gap-[16px] mb-[24px]">
              {block.images?.map((img, j) => (
                <figure key={j} className="wp-block-image rounded-[6px] overflow-hidden m-0">
                  <img src={img} alt="" className="w-full h-auto object-cover" />
                </figure>
              ))}
            </div>
          );
        }

        if (block.type === "image-full") {
          return (
            <figure key={i} className="wp-block-image rs-img-rounded-sm rounded-[6px] overflow-hidden mb-[24px] m-0">
              <img src={block.src} alt="" className="w-full h-auto object-cover" />
            </figure>
          );
        }

        if (block.type === "blockquote") {
          return (
            <blockquote
              key={i}
              className="rs-post-quote-box"
            >
              <p className="text-titleColor">
                {block.text}
              </p>
              <cite className="text-titleColor">
                {block.author}
              </cite>
            </blockquote>
          );
        }

        return null;
      })}
    </div>
  );
}

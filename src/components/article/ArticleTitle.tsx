export default function ArticleTitle({ title }: { title: string }) {
  return (
    <h1 className="rstb-page-title font-title text-[32px] sm:text-[36px] lg:text-[40px] text-black leading-[1.25] mb-[20px]">
      {title}
    </h1>
  );
}
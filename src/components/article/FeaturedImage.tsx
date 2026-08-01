export default function FeaturedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mb-[24px] rounded-[6px] overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover"
      />
    </div>
  );
}

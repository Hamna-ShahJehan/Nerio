import Preloader from "@/components/Preloader";
import HomeTemplate from "@/components/HomeTemplate";
import { fetchArticles, fetchCategories } from "@/lib/api";

export default async function Home() {
  const [{ articles }, categories] = await Promise.all([
    fetchArticles({ limit: 100 }),
    fetchCategories(),
  ]);

  return (
    <>
      <Preloader />
      <HomeTemplate articles={articles} categories={categories} />
    </>
  );
}

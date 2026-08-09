import HomeTemplate from "@/components/HomeTemplate";
import { fetchArticles, fetchCategories, fetchComparisons, fetchHomepageSettings, resolveFeaturedComparisons } from "@/lib/api";
import type { ComparisonArticle } from "@/types";
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cockpit.Travel – Travel News & Updates",
  description: "Your daily source for travel news, destination guides, hotel reviews, and flight updates.",
};

export default async function HomePage() {
  const [{ articles }, categories, { articles: comparisons }, homepageSettings] = await Promise.all([
    fetchArticles({ limit: 100 }),
    fetchCategories(),
    fetchComparisons({ limit: 50 }),
    fetchHomepageSettings(),
  ]);

  const featuredComparisons = resolveFeaturedComparisons(
    comparisons as ComparisonArticle[],
    homepageSettings.featuredComparisonIds,
    homepageSettings.maxCount
  );

  return (
    <HomeTemplate
      articles={articles}
      comparisons={comparisons as ComparisonArticle[]}
      featuredComparisons={featuredComparisons}
      categories={categories}
      featuredComparisonsMaxCount={homepageSettings.maxCount}
    />
  );
}

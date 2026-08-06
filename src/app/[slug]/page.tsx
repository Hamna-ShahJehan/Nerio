import { notFound } from "next/navigation";
import data from "@/data/data.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticlePage from "@/components/ArticleTemplate";
import Breadcrumb from "@/components/article/Breadcrumb";
import { generateSlug } from "@/lib/slug";

interface MinimalArticle {
  slug: string;
  title: string;
  category: { label: string; color: string };
  author: { name: string; avatar: string; bio: string };
  date: string;
  views: string;
  comments: string;
  featuredImage: string;
  content: { type: string; text?: string }[];
  tags: string[];
  prevPost: { slug: string; title: string; image: string };
  nextPost: { slug: string; title: string; image: string };
}

function getAllSectionArticles() {
  const items: { title: string; href?: string; image?: string; category?: { label: string; color: string }; author?: string; views?: string; date?: string }[] = [];
  const h = data.hero;
  if (h.featured) items.push(h.featured);
  if (h.featuredCards) items.push(...h.featuredCards);
  if (h.recentNews?.posts) items.push(...h.recentNews.posts);
  const b = data.breakingNews;
  if (b.featured) items.push(b.featured);
  if (b.sidePosts) items.push(...b.sidePosts);
  if (b.sliderPosts) items.push(...b.sliderPosts);
  const v = data.videoNews;
  if (v.featured) items.push(v.featured);
  if (v.leftCards) items.push(...v.leftCards);
  if (v.rightCards) items.push(...v.rightCards);
  const t = data.topOfWeek;
  if (t.articles) items.push(...t.articles);
  if (t.tabs?.recent) items.push(...t.tabs.recent);
  if (t.tabs?.popular) items.push(...t.tabs.popular);
  if (t.tabs?.trendy) items.push(...t.tabs.trendy);
  const s = data.topStories;
  if (s.cards) items.push(...s.cards);
  return items;
}

function createMinimalArticle(
  item: (typeof getAllSectionArticles extends () => (infer T)[] ? T : never),
  slug: string
): MinimalArticle {
  const template = data.articles[0];
  return {
    ...template,
    slug,
    title: item.title,
    category: item.category || template.category,
    featuredImage: (item as any).image || (item as any).featuredImage || template.featuredImage,
    date: item.date || template.date,
    views: item.views || template.views,
  } as MinimalArticle;
}

function findArticleBySlug(slug: string): MinimalArticle | null {
  const fullArticle = data.articles.find((a) => a.slug === slug);
  if (fullArticle) {
    return fullArticle as MinimalArticle;
  }

  const allItems = getAllSectionArticles();

  const found = allItems.find((item) => {
    if (item.href && item.href !== "#") {
      return item.href.replace(/^\//, "") === slug;
    }
    return generateSlug(item.title) === slug;
  });

  if (found) {
    return createMinimalArticle(found, slug);
  }

  return null;
}

export function generateStaticParams() {
  const slugs = new Set<string>();
  data.articles.forEach((a) => slugs.add(a.slug));
  const allItems = getAllSectionArticles();
  allItems.forEach((item) => slugs.add(generateSlug(item.title)));
  return Array.from(slugs).map((slug) => ({ slug }));
}

export default async function ArticleSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = data.articles.filter((a) => a.slug !== slug).slice(0, 6);

  return (
    <>
      <div className="nerio-page-wrapper flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 mb-[50px]">
          <Breadcrumb category={article.category} title={article.title} />
          <ArticlePage
            article={article}
            sidebar={data.sidebar}
            relatedArticles={relatedArticles}
          />
        </main>
        <Footer />
      </div>
    </>
  );
}

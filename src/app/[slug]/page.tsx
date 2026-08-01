import { notFound } from "next/navigation";
import data from "@/data/data.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticlePage from "@/components/ArticlePage";
import Breadcrumb from "@/components/article/Breadcrumb";

export function generateStaticParams() {
  return data.articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = data.articles.find((a) => a.slug === slug);

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

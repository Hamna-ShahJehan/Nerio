"use client";

import FeaturedImage from "./article/FeaturedImage";
import ArticleTitle from "./article/ArticleTitle";
import PostMeta from "./article/PostMeta";
import ArticleBody from "./article/ArticleBody";
import TagsAndShare from "./article/TagsAndShare";
import AuthorBox from "./article/AuthorBox";
import PostNavigation from "./article/PostNavigation";
import CommentForm from "./article/CommentForm";
import RelatedPosts from "./article/RelatedPosts";
import Sidebar from "./article/Sidebar";

interface ContentBlock {
  type: string;
  text?: string;
  src?: string;
  images?: string[];
  author?: string;
  items?: string[];
}

interface Article {
  slug: string;
  title: string;
  category: { label: string; color: string };
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  date: string;
  views: string;
  comments: string;
  featuredImage: string;
  content: ContentBlock[];
  tags: string[];
  prevPost: { slug: string; title: string; image: string };
  nextPost: { slug: string; title: string; image: string };
}

interface SidebarData {
  categories: { name: string; count: number; href: string; image?: string }[];
  socialCards: { name: string; followers: string; color: string; icon: string }[];
  tags: string[];
}

interface ArticlePageProps {
  article: Article;
  sidebar: SidebarData;
  relatedArticles: Article[];
}

export default function ArticlePage({ article, sidebar, relatedArticles }: ArticlePageProps) {
  return (
    <div className="nerio-container has-sidebar py-[80px]">
      <div className="flex flex-col lg:flex-row gap-[30px] items-start">
        <div className="w-full lg:w-[67%] min-w-0">
          <FeaturedImage src={article.featuredImage} alt={article.title} />
          <ArticleTitle title={article.title} />
          <PostMeta
            author={article.author}
            date={article.date}
            category={article.category}
            comments={article.comments}
          />
          <ArticleBody content={article.content} />
          <TagsAndShare tags={article.tags} />
          <AuthorBox author={article.author} />
          <PostNavigation prevPost={article.prevPost} nextPost={article.nextPost} />
          <CommentForm />
          <RelatedPosts articles={relatedArticles} />
        </div>
        <aside className="w-full lg:w-[33%] sticky top-[100px]">
          <Sidebar data={sidebar} />
        </aside>
      </div>
    </div>
  );
}

import SearchWidget from "./SearchWidget";
import TabWidget from "./TabWidget";
import CategoriesWidget from "./CategoriesWidget";
import FollowWidget from "./FollowWidget";
import TagsWidget from "./TagsWidget";
import InFeedNativeAd from "@/components/ads/InFeedNativeAd";

interface SidebarArticle {
  slug: string;
  title: string;
  image?: string;
  authorName: string;
  views: number;
}

interface SidebarData {
  categories: { name: string; count: number; href: string; image?: string }[];
  socialCards: { name: string; followers: string; color: string; icon: string }[];
  tags: string[];
  recentArticles?: SidebarArticle[];
  popularArticles?: SidebarArticle[];
  trendyArticles?: SidebarArticle[];
}

export default function Sidebar({ data }: { data: SidebarData }) {
  return (
    <div className="space-y-[30px]">
      <SearchWidget />
      <TabWidget
        recentArticles={data.recentArticles}
        popularArticles={data.popularArticles}
        trendyArticles={data.trendyArticles}
      />
      <InFeedNativeAd position="sidebar-sticky" cardStyle="sidebar-ad" pageType="article" />
      <CategoriesWidget categories={data.categories} />
      <FollowWidget socialCards={data.socialCards} />
      <TagsWidget tags={data.tags} />
    </div>
  );
}

import SearchWidget from "./SearchWidget";
import TabWidget from "./TabWidget";
import CategoriesWidget from "./CategoriesWidget";
import FollowWidget from "./FollowWidget";
import TagsWidget from "./TagsWidget";

interface SidebarData {
  categories: { name: string; count: number; href: string }[];
  socialCards: { name: string; followers: string; color: string; icon: string }[];
  tags: string[];
}

export default function Sidebar({ data }: { data: SidebarData }) {
  return (
    <div className="space-y-[30px]">
      <SearchWidget />
      <TabWidget />
      <div className="rounded-[6px] overflow-hidden">
        <a href="/contact">
          <img
            src="/assets/images/article/ad-banner-thumb-02.png"
            alt="Nerio Theme"
            className="w-full h-auto"
          />
        </a>
      </div>
      <CategoriesWidget categories={data.categories} />
      <FollowWidget socialCards={data.socialCards} />
      <TagsWidget tags={data.tags} />
    </div>
  );
}

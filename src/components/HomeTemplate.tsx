import Hero from "@/components/Hero";
import BreakingNews from "@/components/BreakingNews";
import VideoNews from "@/components/VideoNews";
import TopOfWeek from "@/components/TopOfWeek";
import TopStories from "@/components/TopStories";
import Subscribe from "@/components/Subscribe";

export default function HomeTemplate() {
  return (
    <>
      <Hero />
      <BreakingNews />
      <VideoNews />
      <TopOfWeek />
      <TopStories />
      <Subscribe />
    </>
  );
}

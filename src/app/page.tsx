import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BreakingNews from "@/components/BreakingNews";
import VideoNews from "@/components/VideoNews";
import TopOfWeek from "@/components/TopOfWeek";
import TopStories from "@/components/TopStories";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <div className="nerio-page-wrapper flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Hero />
          <BreakingNews />
          <VideoNews />
          <TopOfWeek />
          <TopStories />
          <Subscribe />
        </main>
        <Footer />
      </div>
    </>
  );
}

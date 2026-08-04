import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/article/Breadcrumb";

export default function AboutUsPage() {
  return (
    <div className="nerio-page-wrapper flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 mb-[50px]">
        <Breadcrumb category={{ label: "Pages", color: "#e033e0" }} title="About Us" />
        <section className="nerio-container py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">About Us</h1>
            <div className="space-y-6 text-[var(--bodyColor)] leading-relaxed">
              <p>
                Welcome to Nerio News Magazine — your trusted source for the latest sports news, in-depth analysis, and comprehensive coverage of athletic events from around the globe.
              </p>
              <p>
                Founded with a passion for sports journalism, we deliver timely and accurate reporting across multiple disciplines including football, basketball, cricket, tennis, hockey, and emerging esports competitions.
              </p>
              <p>
                Our team of experienced journalists and analysts work around the clock to bring you breaking news, exclusive interviews, and thoughtful commentary that keeps you informed and engaged with the sports world.
              </p>
              <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
              <p>
                To provide readers with honest, accurate, and engaging sports coverage that informs, inspires, and connects fans worldwide. We believe in the power of sports to bring people together and tell stories that matter.
              </p>
              <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>
              <p>
                Our editorial team consists of seasoned sports journalists, data analysts, and multimedia specialists who share a common goal: delivering the highest quality sports content to our readers every day.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

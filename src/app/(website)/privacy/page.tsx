import AdSlot from "@/components/ui/AdSlot";

export default function PrivacyPage() {
    return (
        <main className="rb-container py-12" style={{ backgroundColor: "var(--solid-white)", color: "var(--body-fcolor)" }}>
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <div className="mb-10">
                    <h1 className="mb-3 text-[var(--heading-color)]" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800 }}>
                        Privacy Policy
                    </h1>
                    <p className="text-[var(--meta-fcolor)] text-sm">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                {/* Top Ad */}
                <div className="mb-10">
                    <AdSlot 
                        pageType="website"
                        position="top-leaderboard"
                        label="Top Leaderboard Ad" 
                        width="728px" 
                        height="90px" 
                        responsive 
                        mobileWidth="320px" 
                        mobileHeight="50px" 
                    />
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none space-y-8" style={{ lineHeight: 1.8 }}>
                    <section>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            Introduction
                        </h2>
                        <p className="text-[var(--body-fcolor)]">
                            Trendsposts ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            Information We Collect
                        </h2>
                        <p className="text-[var(--body-fcolor)]">
                            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-[var(--body-fcolor)]">
                            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name and email address, that you voluntarily give to us when you contact us or subscribe to our newsletter.</li>
                            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed.</li>
                            <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method, that we may collect when you purchase, order, or request information about our services.</li>
                            <li><strong>Data from Social Networks:</strong> User information from social networking sites, such as Facebook, Twitter, Instagram, including your name, social network username, and profile picture.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            Use of Your Information
                        </h2>
                        <p className="text-[var(--body-fcolor)]">
                            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-[var(--body-fcolor)]">
                            <li>Create and manage your account</li>
                            <li>Email you regarding your account or order</li>
                            <li>Fulfill and manage purchases, orders, payments, and other transactions</li>
                            <li>Generate a personal profile about you to make future visits more personalized</li>
                            <li>Increase the efficiency and operation of the Site</li>
                            <li>Monitor and analyze usage and trends to improve your experience</li>
                            <li>Notify you of updates to the Site</li>
                            <li>Perform other business activities as needed</li>
                        </ul>
                    </section>

                    <section>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            Disclosure of Your Information
                        </h2>
                        <p className="text-[var(--body-fcolor)]">
                            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-[var(--body-fcolor)]">
                            <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information is necessary to comply with the law or protect our rights.</li>
                            <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf.</li>
                            <li><strong>Marketing Communications:</strong> With your consent, we may share your information with third parties for marketing purposes.</li>
                            <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with a merger, sale, or acquisition.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            Cookies and Tracking Technologies
                        </h2>
                        <p className="text-[var(--body-fcolor)]">
                            We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            Security of Your Information
                        </h2>
                        <p className="text-[var(--body-fcolor)]">
                            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            Contact Us
                        </h2>
                        <p className="text-[var(--body-fcolor)]">
                            If you have questions or comments about this Privacy Policy, please contact us at:
                        </p>
                        <p className="text-[var(--body-fcolor)]">
                            <strong>Email:</strong> <a href="mailto:privacy@Trendsposts.com" className="text-[var(--g-color)] hover:underline">privacy@Trendsposts.com</a>
                        </p>
                    </section>
                </div>

                {/* Bottom Ad */}
                <div className="mt-12">
                    <AdSlot 
                        pageType="website"
                        position="bottom-leaderboard"
                        label="Bottom Leaderboard Ad" 
                        width="728px" 
                        height="90px" 
                        responsive 
                        mobileWidth="320px" 
                        mobileHeight="50px" 
                    />
                </div>
            </div>
        </main>
    );
}

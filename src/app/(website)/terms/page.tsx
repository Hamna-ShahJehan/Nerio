import AdSlot from "@/components/ui/AdSlot";

export default function TermsPage() {
    return (
        <main className="rb-container py-12" style={{ backgroundColor: "var(--solid-white)", color: "var(--body-fcolor)" }}>
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <div className="mb-10">
                    <h1 className="mb-3 text-[var(--heading-color)]" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800 }}>
                        Terms & Services
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
                        <h2 className="text-[var(--heading-color)]" style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            Agreement to Terms
                        </h2>
                        <p className="text-[var(--body-fcolor)]">
                            By accessing and using Cockpit.Travel ("the Site"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            Use License
                        </h2>
                        <p className="text-[var(--body-fcolor)]">
                            Permission is granted to temporarily download one copy of the materials (information or software) on Cockpit.Travel for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-[var(--body-fcolor)]">
                            <li>Modify or copy the materials</li>
                            <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                            <li>Attempt to decompile or reverse engineer any software contained on the Site</li>
                            <li>Remove any copyright or other proprietary notations from the materials</li>
                            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                        </ul>
                    </section>

                    <section>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            Disclaimer
                        </h2>
                        <p className="text-[var(--body-fcolor)]">
                            The materials on Cockpit.Travel are provided on an 'as is' basis. Cockpit.Travel makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            Limitations
                        </h2>
                        <p className="text-[var(--body-fcolor)]">
                            In no event shall Cockpit.Travel or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Site, even if Cockpit.Travel or an authorized representative has been notified orally or in writing of the possibility of such damage.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            Accuracy of Materials
                        </h2>
                        <p className="text-[var(--body-fcolor)]">
                            The materials appearing on the Site could include technical, typographical, or photographic errors. Cockpit.Travel does not warrant that any of the materials on its website are accurate, complete, or current. Cockpit.Travel may make changes to the materials contained on its website at any time without notice.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            Links
                        </h2>
                        <p className="text-[var(--body-fcolor)]">
                            Cockpit.Travel has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Cockpit.Travel of the site. Use of any such linked website is at the user's own risk.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            Modifications
                        </h2>
                        <p className="text-[var(--body-fcolor)]">
                            Cockpit.Travel may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            Governing Law
                        </h2>
                        <p className="text-[var(--body-fcolor)]">
                            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            Contact Information
                        </h2>
                        <p className="text-[var(--body-fcolor)]">
                            If you have any questions about these Terms, please contact us at:
                        </p>
                        <p className="text-[var(--body-fcolor)]">
                            <strong>Email:</strong> <a href="mailto:legal@cockpit.travel" className="text-[var(--g-color)] hover:underline">legal@cockpit.travel</a>
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

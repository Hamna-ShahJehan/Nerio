"use client";
import { useState } from "react";
import { useTranslations } from "@/hooks/useTranslations";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const tContact = useTranslations("contact");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const inputCls =
        "w-full px-4 py-3 rounded-[var(--round-5)] border border-[var(--flex-gray-15)] bg-[var(--flex-gray-7)] text-[var(--body-fcolor)] text-sm outline-none focus:border-[var(--g-color)] transition-colors";

    return (
        <main className="rb-container py-12" style={{ backgroundColor: "var(--solid-white)", color: "var(--body-fcolor)" }}>
            {/* Heading */}
            <div className="max-w-2xl mx-auto text-center mb-10">
                <h1 className="mb-3 text-[var(--heading-color)]" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800 }}>
                    {tContact("title")}
                </h1>
                <p className="text-[var(--meta-fcolor)] text-base">
                    {tContact("description")}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 max-w-4xl mx-auto">
                {/* Form */}
                <div className="bg-[var(--flex-gray-7)] border border-[var(--flex-gray-15)] rounded-[var(--round-7)] p-6 md:p-8">
                    {submitted ? (
                            <div className="text-center py-10">
                            <div className="text-5xl mb-4">✅</div>
                            <h2 className="text-xl font-bold mb-2 text-[var(--heading-color)]" style={{ fontFamily: "var(--font-heading)" }}>{tContact("messageSent")}</h2>
                            <p className="text-[var(--meta-fcolor)]">{tContact("messageSentDescription")}</p>
                            <button
                                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                                className="mt-6 is-btn"
                            >
                                {tContact("sendAnother")}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5 text-[var(--heading-color)]" style={{ fontFamily: "var(--font-heading)" }}>{tContact("name")} *</label>
                                    <input type="text" required className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={tContact("namePlaceholder")} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5 text-[var(--heading-color)]" style={{ fontFamily: "var(--font-heading)" }}>{tContact("email")} *</label>
                                    <input type="email" required className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={tContact("emailPlaceholder")} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold mb-1.5 text-[var(--heading-color)]" style={{ fontFamily: "var(--font-heading)" }}>{tContact("subject")} *</label>
                                <input type="text" required className={inputCls} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder={tContact("subjectPlaceholder")} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold mb-1.5 text-[var(--heading-color)]" style={{ fontFamily: "var(--font-heading)" }}>{tContact("message")} *</label>
                                <textarea required rows={6} className={inputCls} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={tContact("messagePlaceholder")} style={{ resize: "vertical" }} />
                            </div>
                            <button type="submit" className="is-btn w-full justify-center" style={{ height: 46 }}>
                                {tContact("sendMessage")} →
                            </button>
                        </form>
                    )}
                </div>

                {/* Info panel */}
                <div className="flex flex-col gap-5">
                    {[
                        { icon: "📧", title: tContact("emailUs"), detail: "hello@Trendsposts.com" },
                        { icon: "💼", title: tContact("pressMedia"), detail: "press@Trendsposts.com" },
                        { icon: "📰", title: tContact("submitTip"), detail: "tips@Trendsposts.com" },
                    ].map((item) => (
                        <div key={item.title} className="flex items-start gap-4 p-5 rounded-[var(--round-7)] border border-[var(--flex-gray-15)] bg-[var(--flex-gray-7)]">
                            <span className="text-2xl shrink-0">{item.icon}</span>
                            <div>
                                <h3 className="font-semibold text-sm mb-0.5 text-[var(--heading-color)]" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                                <a href={`mailto:${item.detail}`} className="text-sm text-[var(--g-color)] hover:underline">{item.detail}</a>
                            </div>
                        </div>
                    ))}

                    <div className="p-5 rounded-[var(--round-7)] border border-[var(--flex-gray-15)] bg-[var(--flex-gray-7)]">
                        <h3 className="font-semibold text-sm mb-3 text-[var(--heading-color)]" style={{ fontFamily: "var(--font-heading)" }}>{tContact("followUs")}</h3>
                        <div className="flex gap-3">
                            {[tContact("twitter"), tContact("facebook"), tContact("instagram")].map((s) => (
                                <a key={s} href="#" className="px-3 py-2 rounded-[var(--round-5)] bg-[var(--flex-gray-15)] text-xs font-semibold hover:bg-[var(--g-color)] hover:text-white transition-colors">
                                    {s}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

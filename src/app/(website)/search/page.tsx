"use client";
import { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ArticleCard from "@/components/ui/ArticleCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Article, Category } from "@/types";
import { useTranslations } from "@/hooks/useTranslations";

function SearchResults() {
    const params = useSearchParams();
    const router = useRouter();
    const q = params.get("q")?.toLowerCase() ?? "";
    const categoryFilter = params.get("category") ?? "";
    const sortBy = params.get("sort") ?? "relevance";
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const tSearch = useTranslations("sidebar");
    const tCommon = useTranslations("common");

    useEffect(() => {
        async function loadData() {
            try {
                const [articlesRes, categoriesRes] = await Promise.all([
                    fetch("/api/articles?status=published"),
                    fetch("/api/categories"),
                ]);
                const articlesData = await articlesRes.json();
                const categoriesData = await categoriesRes.json();

                const articlesArray = Array.isArray(articlesData) ? articlesData : articlesData.articles || [];

                setArticles(articlesArray);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const results = useMemo(() => {
        let filtered = q
            ? articles.filter(
                (a) =>
                    a.title.toLowerCase().includes(q) ||
                    a.excerpt.toLowerCase().includes(q) ||
                    a.category.includes(q) ||
                    a.tags.some((t) => t.includes(q))
            )
            : [];

        // Category filter
        if (categoryFilter) {
            filtered = filtered.filter((a) => a.category === categoryFilter);
        }

        // Sort
        if (sortBy === "views") {
            filtered = [...filtered].sort((a, b) => (b.views || 0) - (a.views || 0));
        } else if (sortBy === "date") {
            filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        // "relevance" keeps default filter order

        return filtered;
    }, [q, articles, categoryFilter, sortBy]);

    const updateParam = (key: string, value: string) => {
        const sp = new URLSearchParams(params.toString());
        if (value) {
            sp.set(key, value);
        } else {
            sp.delete(key);
        }
        router.push(`/search?${sp.toString()}`);
    };

    if (loading) {
        return (
            <div className="rb-container py-12">
                <div className="text-center py-20">
                    <p className="text-[var(--meta-fcolor)]">{tCommon("loading")}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rb-container py-12">
            {/* Search bar */}
            <form
                method="GET"
                action="/search"
                className="mb-6 max-w-2xl mx-auto"
            >
                <div className="flex gap-3">
                    <input
                        name="q"
                        type="search"
                        defaultValue={q}
                        placeholder={tCommon("searchArticlesPlaceholder")}
                        autoFocus
                        className="flex-1 px-5 py-4 rounded-[var(--round-5)] border border-[var(--flex-gray-15)] bg-[var(--flex-gray-7)] text-base outline-none focus:border-[var(--g-color)] transition-colors"
                    />
                    <button
                        type="submit"
                        className="is-btn px-8"
                    >
                        {tCommon("searchPlaceholder").split(" ")[0]}
                    </button>
                </div>

                {/* Filters row */}
                <div className="mt-4 flex flex-wrap gap-3 items-center">
                    {/* Category filter */}
                    <select
                        name="category"
                        value={categoryFilter}
                        onChange={(e) => updateParam("category", e.target.value)}
                        className="rounded-lg border border-[var(--flex-gray-15)] bg-[var(--flex-gray-7)] px-3 py-2 text-sm text-[var(--body-fcolor)] outline-none focus:border-[var(--g-color)]"
                    >
                        <option value="">{tCommon("categories")} ({tCommon("viewAll")})</option>
                        {categories.map((c) => (
                            <option key={c.slug} value={c.slug}>{c.label}</option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        name="sort"
                        value={sortBy}
                        onChange={(e) => updateParam("sort", e.target.value)}
                        className="rounded-lg border border-[var(--flex-gray-15)] bg-[var(--flex-gray-7)] px-3 py-2 text-sm text-[var(--body-fcolor)] outline-none focus:border-[var(--g-color)]"
                    >
                        <option value="relevance">Relevance</option>
                        <option value="date">{tSearch("recentPosts")}</option>
                        <option value="views">{tCommon("viewAll")} {tCommon("followers")}</option>
                    </select>

                    {categoryFilter && (
                        <button
                            type="button"
                            onClick={() => updateParam("category", "")}
                            className="text-xs text-[var(--g-color)] hover:underline"
                        >
                            Clear filter
                        </button>
                    )}
                </div>
            </form>

            {/* Results */}
            {q || categoryFilter ? (
                <>
                    <SectionHeading
                        label={
                            results.length
                                ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${q || categoryFilter}"`
                                : `No results for "${q || categoryFilter}"`
                        }
                    />
                    {results.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                            {results.map((a) => (
                                <ArticleCard key={a.slug} article={a} variant="grid" categories={categories} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center text-[var(--meta-fcolor)]">
                            <p className="text-lg font-semibold mb-2">{tCommon("noArticlesFound")}</p>
                            <p className="text-sm">Try different keywords or browse our categories.</p>
                        </div>
                    )}
                </>
            ) : (
                <div className="py-16 text-center text-[var(--meta-fcolor)]">
                    <p className="text-lg font-semibold">{tCommon("searchPlaceholder").split("...")[0]}</p>
                    <p className="text-sm mt-2">Enter a keyword to find articles.</p>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense>
            <SearchResults />
        </Suspense>
    );
}

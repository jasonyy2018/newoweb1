import { getAllArticles, getArticleBySlug } from '@/lib/articles';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Link } from '@/i18n/routing';

interface Props {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
}

export async function generateStaticParams() {
    const locales = ['zh', 'en', 'ja'];
    const allParams = [];

    for (const locale of locales) {
        const articles = getAllArticles(locale);
        allParams.push(...articles.map((article) => ({
            slug: article.slug,
            locale: locale,
        })));
    }

    return allParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const article = getArticleBySlug(slug, locale);

    if (!article) {
        return {
            title: 'Article Not Found',
        };
    }

    return {
        title: `${article.title} | Tech Blog`,
        description: article.description,
        openGraph: {
            title: article.title,
            description: article.description,
            type: 'article',
            publishedTime: article.date,
            authors: [article.author],
            tags: article.tags,
            locale: locale,
        },
    };
}

export default async function ArticlePage({ params }: Props) {
    const { slug, locale } = await params;
    const article = getArticleBySlug(slug, locale);

    if (!article) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-dark pt-32 pb-16 md:pt-40 md:pb-20">
                <div className="container mx-auto px-4">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Back to Blog
                    </Link>
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider">
                            {article.tags[0]}
                        </span>
                        <span className="text-gray-400">
                            {new Date(article.date).toLocaleDateString(locale, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400">By {article.author}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
                        {article.title}
                    </h1>
                    {article.image && (
                        <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl bg-gray-800 aspect-21/9">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-3xl mx-auto">
                    <article className="prose prose-lg md:prose-xl prose-slate max-w-none">
                        <div
                            dangerouslySetInnerHTML={{ __html: article.content }}
                            className="[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-12 [&>h2]:mb-6
                         [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-8 [&>h3]:mb-4
                         [&>p]:text-gray-600 [&>p]:leading-relaxed [&>p]:mb-6
                         [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:text-gray-600 [&>ul>li]:mb-2
                         [&>strong]:font-semibold [&>strong]:text-gray-900"
                        />
                    </article>

                    {/* Share / Tags */}
                    <div className="mt-16 pt-8 border-t border-gray-100">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                            Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm hover:bg-gray-200 transition-colors cursor-default"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

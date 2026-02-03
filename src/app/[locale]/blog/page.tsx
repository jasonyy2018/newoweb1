import { getAllArticles } from '@/lib/articles';
import { Link } from '@/i18n/routing';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Tech Insights',
    description: 'Explore our latest blog posts on web development, design, and technology.',
};

export default async function ArticlesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const articles = getAllArticles(locale);

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-dark pt-40 pb-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Blog
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Latest insights, tutorials, and guides from our tech team.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <Link
                            key={article.id}
                            href={`/blog/${article.slug}`}
                            className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {article.image && (
                                <div className="aspect-video overflow-hidden bg-gray-100">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}
                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                                        {article.tags[0]}
                                    </span>
                                    <span className="text-gray-400 text-xs">
                                        {new Date(article.date).toLocaleDateString(locale)}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-gray-500 mb-6 line-clamp-3">
                                    {article.description}
                                </p>
                                <div className="flex items-center text-primary font-semibold">
                                    Read Post
                                    <svg
                                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function PageHeader({ title, description }: { title: string; description?: string }) {
    return (
        <section className="pt-32 pb-16 bg-linear-to-br from-dark to-primary/80 text-white">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                    {title}
                </h1>
                {description && (
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>
                )}
                <div className="w-20 h-1 bg-primary mx-auto mt-8"></div>
            </div>
        </section>
    );
}

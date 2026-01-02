import SolutionsSection from '@/components/ui/SolutionsSection';
import { useTranslations } from 'next-intl';

export default function SolutionsPage() {
    const t = useTranslations('Common');

    return (
        <div className="bg-white">
            <div className="bg-dark pt-40 pb-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        {t('solutions')}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        {t('hero_desc')}
                    </p>
                </div>
            </div>
            <SolutionsSection />
        </div>
    );
}

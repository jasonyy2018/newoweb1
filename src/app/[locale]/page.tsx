import Hero from '@/components/ui/Hero';
import AboutSection from '@/components/ui/AboutSection';
import SolutionsSection from '@/components/ui/SolutionsSection';
import ContactSection from '@/components/ui/ContactSection';
import Testimonials from '@/components/ui/Testimonials';
import { AdBanner } from '@/components/ads';

export default function Home() {
    return (
        <>
            <Hero />

            <SolutionsSection />
            {/* Ad placement: between main content sections */}
            <AdBanner position="between-sections" />

            <Testimonials />
        </>
    );
}


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
            {/* 广告位1: Hero下方 */}
            <AdBanner position="hero-bottom" />

            <AboutSection />
            {/* 广告位2: About与Solutions之间 */}
            <AdBanner position="between-sections" />

            <SolutionsSection />
            {/* 广告位3: Solutions与Testimonials之间 */}
            <AdBanner position="between-sections" className="bg-white" />

            <Testimonials />
            {/* 广告位4: Footer上方 */}
            <AdBanner position="before-footer" />

            <ContactSection />
        </>
    );
}

import Hero from '@/components/ui/Hero';
import AboutSection from '@/components/ui/AboutSection';
import SolutionsSection from '@/components/ui/SolutionsSection';
import ContactSection from '@/components/ui/ContactSection';
import Testimonials from '@/components/ui/Testimonials';

export default function Home() {
    return (
        <>
            <Hero />
            <AboutSection />
            <SolutionsSection />
            <Testimonials />
            <ContactSection />
        </>
    );
}

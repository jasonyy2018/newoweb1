export default function PrivacyPage() {
    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8 text-dark">Privacy Policy</h1>
                <div className="prose prose-lg text-gray-600 max-w-none space-y-6">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us, such as when you submit a consultation request through our contact form. This may include your name, email address, company name, and phone number.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">2. How We Use Your Information</h2>
                        <p>We use the information we collect to respond to your inquiries, provide the requested services, and improve our website and AI solutions.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">3. Information Security</h2>
                        <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or alteration.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">4. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at jyu@wisdomitc.com.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

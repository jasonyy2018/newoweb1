export default function TermsPage() {
    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8 text-dark">Terms of Service</h1>
                <div className="prose prose-lg text-gray-600 max-w-none space-y-6">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">2. Use License</h2>
                        <p>Permission is granted to temporarily download one copy of the materials (information or software) on WSAI's website for personal, non-commercial transitory viewing only.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">3. Disclaimer</h2>
                        <p>The materials on WSAI's website are provided on an 'as is' basis. WSAI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-dark mb-4">4. Governing Law</h2>
                        <p>These terms and conditions are governed by and construed in accordance with the laws of China and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

import '@/app/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Matomo */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var _paq = window._paq = window._paq || [];
              /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
              _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
              if (window.location.hostname.indexOf('wisdomitc.com') !== -1) {
                _paq.push(["setCookieDomain", "*.www.wisdomitc.com"]);
                _paq.push(["setDomains", ["*.www.wisdomitc.com"]]);
              }
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u="//matomo.wisdomitc.com/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '2']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
              })();
            `,
          }}
        />
        <noscript>
          <p>
            <img
              referrerPolicy="no-referrer-when-downgrade"
              src="//matomo.wisdomitc.com/matomo.php?idsite=2&amp;rec=1"
              style={{ border: 0 }}
              alt=""
            />
          </p>
        </noscript>
        {/* End Matomo Code */}
      </head>
      <body className="font-sans antialiased text-dark bg-light" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

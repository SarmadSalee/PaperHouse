import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '../components/ClientLayout';

export const metadata: Metadata = {
  title: 'PaperHouse — Free Matric & FSc Past Papers Pakistan | All Punjab Boards',
  description:
    'Find any Matric and FSc past paper — free, fast, forever. All Punjab Boards, all subjects, 2018-2026. No signup required.',
  keywords: ['past papers pakistan', 'matric past papers', 'fsc past papers', 'punjab board past papers', 'free past papers'],
  openGraph: {
    title: 'PaperHouse — Pakistan\'s #1 Free Past Papers Library',
    description: 'Find any Matric and FSc past paper — free, fast, forever.',
    siteName: 'PaperHouse',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="google-site-verification" content="QlHFUicK3DzftRcD8uQP3TG2lzE3iUBTfnv7HB0PRlw" />
        <meta name="google-site-verification" content="ajocOz_q5hwWtTvPGGbk54xi9Zla1HUdOUrDLgWyodo" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-17S1WE7H86" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-17S1WE7H86');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-P4NJGPZT');
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3677408471082558"
          crossOrigin="anonymous"
        />
        <script src="https://pl29539364.effectivecpmnetwork.com/88/88/4d/88884d07d6693c14ce7aeb668aea1d60.js" />
        <script src="https://pl29539366.effectivecpmnetwork.com/81/6d/81/816d8186ea83fa30c44178661b8e88e0.js" />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P4NJGPZT"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  updatedAt?: string;
  image?: string;
}

const SITE_URL = 'https://paper-house.vercel.app';
const SITE_NAME = 'PaperHouse';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export default function SEOHead({
  title,
  description,
  keywords = [],
  canonical,
  type = 'website',
  publishedAt,
  updatedAt,
  image = DEFAULT_IMAGE,
}: SEOHeadProps) {
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  const articleSchema = type === 'article' ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl || SITE_URL,
    },
  } : null;

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Article-specific OG */}
      {type === 'article' && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === 'article' && updatedAt && (
        <meta property="article:modified_time" content={updatedAt} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
}

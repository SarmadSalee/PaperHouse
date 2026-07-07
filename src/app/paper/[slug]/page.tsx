import PaperViewClient from './PaperViewClient';

export default async function PaperViewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PaperViewClient slug={slug} />;
}

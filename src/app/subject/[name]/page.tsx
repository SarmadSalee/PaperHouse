import SubjectPageClient from './SubjectPageClient';

export default async function SubjectPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  return <SubjectPageClient name={name} />;
}

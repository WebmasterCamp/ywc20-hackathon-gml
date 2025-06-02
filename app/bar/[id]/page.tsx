import { MOCK_BARS } from '@/lib/constants';
import { notFound } from 'next/navigation';
import UserGridClient from './UserGridClient';


export async function generateStaticParams() {
  return MOCK_BARS.map((bar) => ({
    id: bar.id,
  }));
}

export default async function BarUserGridPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bar = MOCK_BARS.find((b) => b.id === id);

  if (!bar) {
    notFound();
  }

  return (
    <div className="container px-3 sm:px-4 py-3 sm:py-4 md:py-8 max-w-5xl mx-auto">
      <UserGridClient bar={bar} />
    </div>
  );
}
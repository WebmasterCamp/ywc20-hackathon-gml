import { MOCK_BARS } from "@/lib/constants";
import { BarDetailClient } from "./bar-detail-client";

// This function tells Next.js which dynamic paths to pre-render
export async function generateStaticParams() {
  return MOCK_BARS.map((bar) => ({
    id: bar.id,
  }));
}

export default function BarDetailPage() {
  return <BarDetailClient />;
}
import { BarList } from "@/components/bars/bar-list";
import { PageHeader } from "@/components/layout/page-header";

const barList = []


export default function Home() {
  return (
    <div className="container px-3 py-3 sm:px-4 sm:py-4 md:py-8 max-w-5xl mx-auto">
      <PageHeader 
        title="Discover Bars" 
      />
      <BarList />
    </div>
  );
}
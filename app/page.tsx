import { BarList } from "@/components/bars/bar-list";
import { PageHeader } from "@/components/layout/page-header";

export default function Home() {
  return (
    <div className="container px-3 py-3 sm:px-4 sm:py-4 md:py-6 lg:py-8 max-w-5xl xl:max-w-7xl mx-auto">
      <PageHeader 
        title="Discover Bars" 
      />
      <BarList />
    </div>
  );
}
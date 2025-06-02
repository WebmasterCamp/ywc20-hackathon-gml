"use client";
import { BarList } from "@/components/bars/bar-list";
import { PageHeader } from "@/components/layout/page-header";
import { useEffect, useState } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

function CojonLogo() {
  return (
    <div className="mb-4">
      <img src="/cojon.png" alt="Cojon" className="h-24 w-30 w-auto mx-auto mt-4" />
    </div>
  );
}

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <div className="container px-3 py-3 sm:px-4 sm:py-4 md:py-6 lg:py-8 max-w-5xl xl:max-w-7xl mx-auto">
      {isMobile ? <CojonLogo /> : <PageHeader title="Discover Place" />}
      <BarList />
    </div>
  );
}

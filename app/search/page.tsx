"use client";

import { useState } from "react";
import { MOCK_BARS, Bar } from "@/lib/constants";
import { SearchFilters } from "@/components/bars/search-filters";
import { PageHeader } from "@/components/layout/page-header";
import { MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<Bar[]>(MOCK_BARS);

  return (
    <div className="container px-3 sm:px-4 py-3 sm:py-4 md:py-8 max-w-5xl mx-auto">
      <PageHeader 
        title="Find Bars" 
        description="Search for bars by name, location, or features"
      />
      
      <SearchFilters />
      
      <div className="space-y-2 sm:space-y-3">
        {searchResults.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium">No results found</h3>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          searchResults.map((bar) => (
            <Link key={bar.id} href={`/bar/${bar.id}`}>
              <div className="border rounded-lg p-3 sm:p-4 hover:bg-accent transition-colors active:scale-[0.98] sm:active:scale-100 flex items-center space-x-3 sm:space-x-4">
                <div className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={bar.image} 
                    alt={bar.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm sm:text-base">{bar.name}</h3>
                  <div className="flex items-center text-muted-foreground text-xs sm:text-sm mt-1">
                    <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 flex-shrink-0" />
                    <span className="truncate">{bar.location}</span>
                  </div>
                  <p className="text-xs sm:text-sm mt-1 text-muted-foreground line-clamp-1">{bar.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
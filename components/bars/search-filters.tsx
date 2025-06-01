"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X, Beer, Wine, MapPin, Star, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export function SearchFilters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [distance, setDistance] = useState([5]);

  return (
    <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
      {/* Enhanced search bar with pub theming */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-pub-amber/20 to-pub-gold/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        <div className="relative bg-pub-mahogany/10 border border-pub-brass/30 rounded-lg overflow-hidden">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pub-copper group-hover:text-pub-amber transition-colors duration-300" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Discover amazing bars..."
            className="pl-10 pr-10 h-11 sm:h-10 text-base sm:text-sm bg-transparent border-0 text-pub-leather placeholder:text-pub-copper focus:ring-2 focus:ring-pub-amber/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-pub-copper hover:text-pub-amber p-1 transition-colors duration-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button size="sm" variant="outline" className="text-xs h-9 sm:h-8 px-3 bg-pub-amber/10 border-pub-brass/40 text-pub-leather hover:bg-pub-amber hover:text-pub-mahogany transition-all duration-300 group">
            <Star className="h-3 w-3 mr-1 animate-pulse" />
            Trending
          </Button>
          <Button size="sm" variant="outline" className="text-xs h-9 sm:h-8 px-3 bg-pub-copper/10 border-pub-brass/40 text-pub-leather hover:bg-pub-copper hover:text-pub-foam transition-all duration-300">
            <MapPin className="h-3 w-3 mr-1" />
            Near Me
          </Button>
          <Button size="sm" variant="outline" className="text-xs h-9 sm:h-8 px-3 hidden xs:inline-flex bg-pub-gold/10 border-pub-brass/40 text-pub-leather hover:bg-pub-gold hover:text-pub-mahogany transition-all duration-300">
            <Clock className="h-3 w-3 mr-1" />
            Most Active
          </Button>
        </div>

        <Sheet open={showFilters} onOpenChange={setShowFilters}>
          <SheetTrigger asChild>
            <Button size="sm" variant="outline" className="text-xs h-9 sm:h-8 min-w-[80px] sm:min-w-0 bg-pub-leather/10 border-pub-brass/40 text-pub-leather hover:bg-pub-leather hover:text-pub-foam transition-all duration-300">
              <SlidersHorizontal className="h-3.5 w-3.5 mr-1" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] sm:h-auto sm:max-w-md sm:rounded-t-lg bg-pub-mahogany/5 border-pub-brass/30">
            {/* Background effects */}
            <div className="absolute inset-0 bg-wood-texture opacity-10"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pub-amber via-pub-gold to-pub-copper"></div>
            
            <SheetHeader className="text-left relative z-10">
              <div className="flex items-center gap-2">
                <Beer className="h-5 w-5 text-pub-amber" />
                <SheetTitle className="text-pub-leather">Filter Results</SheetTitle>
              </div>
              <SheetDescription className="text-pub-copper">
                Refine your search to find the perfect watering hole.
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-6 space-y-6 overflow-auto flex-1 relative z-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Wine className="h-4 w-4 text-pub-copper" />
                  <h4 className="text-sm font-medium text-pub-leather">Category</h4>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="h-11 sm:h-10 bg-pub-mahogany/10 border-pub-brass/30 text-pub-leather">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-pub-mahogany/95 border-pub-brass/30">
                    <SelectItem value="all" className="text-pub-leather hover:bg-pub-amber/20">All Categories</SelectItem>
                    <SelectItem value="sports" className="text-pub-leather hover:bg-pub-amber/20">Sports Bar</SelectItem>
                    <SelectItem value="pub" className="text-pub-leather hover:bg-pub-amber/20">Pub</SelectItem>
                    <SelectItem value="cocktail" className="text-pub-leather hover:bg-pub-amber/20">Cocktail Bar</SelectItem>
                    <SelectItem value="wine" className="text-pub-leather hover:bg-pub-amber/20">Wine Bar</SelectItem>
                    <SelectItem value="nightclub" className="text-pub-leather hover:bg-pub-amber/20">Nightclub</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-pub-copper" />
                    <h4 className="text-sm font-medium text-pub-leather">Distance</h4>
                  </div>
                  <span className="text-sm text-pub-copper font-medium bg-pub-amber/20 px-2 py-1 rounded">
                    {distance[0]} km
                  </span>
                </div>
                <Slider
                  defaultValue={[5]}
                  max={20}
                  step={1}
                  value={distance}
                  onValueChange={setDistance}
                  className="py-4"
                />
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-pub-leather">Price Range</h4>
                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" size="sm" className="h-11 sm:h-9 text-base sm:text-sm bg-pub-amber/10 border-pub-brass/40 text-pub-leather hover:bg-pub-amber hover:text-pub-mahogany">$</Button>
                  <Button variant="outline" size="sm" className="h-11 sm:h-9 text-base sm:text-sm bg-pub-copper/10 border-pub-brass/40 text-pub-leather hover:bg-pub-copper hover:text-pub-foam">$$</Button>
                  <Button variant="secondary" size="sm" className="h-11 sm:h-9 text-base sm:text-sm bg-pub-gold text-pub-mahogany border-pub-brass/40">$$$</Button>
                  <Button variant="outline" size="sm" className="h-11 sm:h-9 text-base sm:text-sm bg-pub-leather/10 border-pub-brass/40 text-pub-leather hover:bg-pub-leather hover:text-pub-foam">$$$$</Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-pub-leather">Features</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="h-9 text-xs bg-pub-amber/10 border-pub-brass/40 text-pub-leather hover:bg-pub-amber hover:text-pub-mahogany">🎵 Live Music</Button>
                  <Button variant="secondary" size="sm" className="h-9 text-xs bg-pub-copper text-pub-foam">🌿 Outdoor Seating</Button>
                  <Button variant="outline" size="sm" className="h-9 text-xs bg-pub-gold/10 border-pub-brass/40 text-pub-leather hover:bg-pub-gold hover:text-pub-mahogany">🍻 Happy Hour</Button>
                  <Button variant="outline" size="sm" className="h-9 text-xs bg-pub-leather/10 border-pub-brass/40 text-pub-leather hover:bg-pub-leather hover:text-pub-foam">🍽️ Food Served</Button>
                  <Button variant="outline" size="sm" className="h-9 text-xs bg-pub-brass/10 border-pub-brass/40 text-pub-leather hover:bg-pub-brass hover:text-pub-mahogany">📅 Reservations</Button>
                </div>
              </div>
            </div>
            
            <SheetFooter className="flex flex-col sm:flex-row gap-2 pt-6 border-t border-pub-brass/30 relative z-10">
              <SheetClose asChild>
                <Button variant="outline" className="h-11 sm:h-10 bg-pub-leather/10 border-pub-brass/40 text-pub-leather hover:bg-pub-leather hover:text-pub-foam">Clear All</Button>
              </SheetClose>
              <SheetClose asChild>
                <Button className="h-11 sm:h-10 bg-pub-amber hover:bg-pub-gold text-pub-mahogany font-semibold">Apply Filters</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
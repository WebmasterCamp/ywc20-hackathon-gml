"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Star, Beer, Wine, Clock, Sparkles } from "lucide-react";
import { MOCK_BARS } from "@/lib/constants";

export function BarList() {
  const [bars] = useState(MOCK_BARS);

  if (bars.length === 0) {
    return (
      <div className="text-center py-10 bg-pub-mahogany/10 rounded-xl border border-pub-brass/20">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Beer className="h-12 w-12 text-pub-amber" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-pub-foam rounded-full animate-fizz"></div>
          </div>
        </div>
        <h3 className="text-lg font-medium text-pub-leather">No bars found</h3>
        <p className="text-pub-copper mt-1">Try adjusting your filters to discover amazing venues</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bars.map((bar) => (
        <Card key={bar.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] sm:active:scale-100 group bg-gradient-to-br from-pub-mahogany/5 to-pub-leather/5 border-pub-brass/30 hover:border-pub-gold/50 relative">
          {/* Decorative elements */}
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-pub-foam rounded-full animate-bubble"></div>
              <div className="w-1 h-1 bg-pub-foam rounded-full animate-bubble delay-75"></div>
              <div className="w-1.5 h-1.5 bg-pub-foam rounded-full animate-bubble delay-150"></div>
            </div>
          </div>
          
          <div className="relative h-40 sm:h-48 overflow-hidden">
            <Image
              src={bar.image}
              alt={bar.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-pub-mahogany/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="absolute top-2 right-2">
              <Badge className="bg-pub-mahogany/90 hover:bg-pub-mahogany border border-pub-brass/40 text-pub-foam text-xs shadow-lg">
                <Star className="h-3 w-3 mr-1 fill-pub-gold stroke-pub-gold animate-pulse" />
                {bar.rating}
              </Badge>
            </div>
            
            {/* Active users indicator */}
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-pub-amber/90 hover:bg-pub-amber border border-pub-gold/40 text-pub-mahogany text-xs">
                <Users className="h-3 w-3 mr-1 animate-pulse" />
                {bar.activeUsers}
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-3 sm:p-4 relative">
            {/* Background texture */}
            <div className="absolute inset-0 bg-wood-texture opacity-5"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-base sm:text-lg truncate text-pub-leather group-hover:text-pub-amber transition-colors duration-300">
                  {bar.name}
                </h3>
                <div className="flex gap-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <Beer className="h-4 w-4 text-pub-amber" />
                  <Wine className="h-4 w-4 text-pub-copper" />
                </div>
              </div>
              
              <div className="flex items-center text-pub-copper mt-1 text-xs sm:text-sm">
                <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 flex-shrink-0" />
                <span className="truncate">{bar.location}</span>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center text-xs sm:text-sm">
                  <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 text-pub-copper flex-shrink-0" />
                  <span className="text-pub-copper">Open now</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm">
                  <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 text-pub-gold animate-pulse" />
                  <span className="text-pub-gold font-medium">Popular</span>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm mt-2 line-clamp-2 text-pub-leather/80 group-hover:text-pub-leather transition-colors duration-300">
                {bar.description}
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="p-3 sm:p-4 pt-0 flex justify-between relative">
            <div className="absolute inset-0 bg-wood-texture opacity-5"></div>
            <Link href={`/bar/${bar.id}`} className="w-full relative z-10">
              <Button className="w-full h-9 sm:h-10 text-sm bg-pub-amber hover:bg-pub-gold text-pub-mahogany border border-pub-brass/40 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]" variant="outline">
                <Beer className="h-4 w-4 mr-2" />
                Explore Venue
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MOCK_BARS } from "@/lib/constants";
import { User, MapPin, Wine, Navigation, Users2, ExternalLink, Music } from "lucide-react";

export function BarList() {
  const router = useRouter();
  const [bars] = useState(MOCK_BARS);

  // Function to open Google Maps
  const openGoogleMaps = (bar: any, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card click
    const { coordinates, location } = bar;
    let mapsUrl;
    
    if (coordinates) {
      mapsUrl = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    } else {
      mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    }
    
    window.open(mapsUrl, '_blank');
  };

  // Generate mock male/female counts for each bar
  const getGenderCounts = (barId: string, activeUsers: number) => {
    // Use bar ID to generate consistent random seed
    const seed = parseInt(barId) || 1;
    const maleRatio = 0.4 + ((seed * 17) % 20) * 0.01; // 40-60% male ratio
    const maleCount = Math.floor(activeUsers * maleRatio);
    const femaleCount = activeUsers - maleCount;
    return { male: maleCount, female: femaleCount };
  };

  // Generate placeholder image for each bar
  const getBarImage = (barId: string) => {
    const imageIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const seed = parseInt(barId) || 1;
    const imageId = imageIds[seed % imageIds.length];
    return `https://picsum.photos/seed/bar${imageId}/400/240`;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-8 bg-gradient-to-b from-background to-muted/20">
      {/* Map Circle UI with modern styling */}
      <div className="relative w-72 h-72 mb-8 group">
        {/* Animated Outer Circles with glassmorphism */}
        <div className="absolute inset-0 rounded-full border-2 border-border/40 bg-background/10 backdrop-blur-sm animate-pulse"></div>
        <div className="absolute inset-6 rounded-full border-2 border-border/60 bg-background/20 backdrop-blur-sm"></div>
        <div className="absolute inset-12 rounded-full border-2 border-primary/50 bg-primary/10 backdrop-blur-sm shadow-lg"></div>

        {/* Center user with modern styling */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group">
          <div className="relative p-4 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-xl border-2 border-primary-foreground/20">
            <User className="w-8 h-8 text-primary-foreground" fill="currentColor" />
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
          </div>
        </div>

        {/* Modern Bar markers */}
        {bars.slice(0, 3).map((bar, i) => {
          const positions = [
            { top: "12%", left: "68%" },
            { top: "68%", left: "78%" },
            { top: "58%", left: "18%" },
          ];
          const genderCounts = getGenderCounts(bar.id, bar.activeUsers);

          return (
            <div
              key={bar.id}
              className="absolute group cursor-pointer transition-all duration-300 hover:scale-110"
              style={{ ...positions[i] }}
              onClick={() => router.push(`/bar/${bar.id}`)}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 border-2 border-white/20">
                <Wine className="w-6 h-6 text-white" />
              </div>

              {/* Always visible info box */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg shadow-xl whitespace-nowrap min-w-max">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{bar.name}</p>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{genderCounts.male}M</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{genderCounts.female}F</span>
                  </div>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200 dark:border-t-gray-600"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern Bar List */}
      <div className="w-full max-w-md">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-2 border-gray-200 dark:border-gray-600 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b-2 border-gray-200 dark:border-gray-600 bg-gradient-to-r from-gray-50 dark:from-gray-700 to-transparent">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" />
              <h2 className="text-gray-900 dark:text-white font-semibold">สถานที่ใกล้เคียง</h2>
              <span className="ml-auto text-sm text-gray-600 dark:text-gray-400 font-medium">{bars.length} แห่ง</span>
            </div>
          </div>

          {/* Bar Items */}
          <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
            {bars.map((bar, index) => {
              const genderCounts = getGenderCounts(bar.id, bar.activeUsers);
              return (
                <div
                  key={bar.id}
                  className="group relative rounded-xl border-2 border-gray-200 dark:border-gray-600 transition-all duration-300 cursor-pointer hover:shadow-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-primary/50 overflow-hidden"
                  onClick={() => router.push(`/bar/${bar.id}`)}
                >
                  {/* Bar Image at Top */}
                  <div className="relative w-full h-32 overflow-hidden">
                    <Image
                      src={getBarImage(bar.id)}
                      alt={bar.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    {/* Status indicator overlay */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                      <div
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index % 2 === 0 ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      />
                      <span className="text-xs font-medium text-white">
                        {index % 2 === 0 ? "เปิด" : "ปิดเร็ว"}
                      </span>
                    </div>
                  </div>                  {/* Content Below Image */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors text-base line-clamp-1">
                        {bar.name}
                      </h3>
                      {/* Google Maps Button */}
                      <button
                        onClick={(e) => openGoogleMaps(bar, e)}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-md transition-colors"
                        title="เปิดใน Google Maps"
                      >
                        <ExternalLink className="w-3 h-3" />
                        แผนที่
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm line-clamp-1">{bar.location}</span>
                    </div>

                    {/* Genre */}
                    <div className="flex items-center gap-1 mb-2">
                      <Music className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span className="text-sm text-purple-700 dark:text-purple-400 font-medium">
                        แนวดนตรี: {bar.genre}
                      </span>
                    </div>

                    {/* Today's Band */}
                    <div className="mb-3 p-2 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                      <div className="text-xs text-orange-700 dark:text-orange-300 font-medium mb-1">
                        วงดนตรีวันนี้:
                      </div>
                      <div className="text-sm font-semibold text-orange-800 dark:text-orange-200">
                        {bar.todaysBand}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">{genderCounts.male} ชาย</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">{genderCounts.female} หญิง</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {bar.activeUsers} คน
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
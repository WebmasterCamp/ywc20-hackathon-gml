"use client";

import { Bar, MOCK_BARS, MOCK_USERS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ExternalLink, Music, Navigation, User, Wine, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";



export function BarList() {
  const router = useRouter();
  const [bars] = useState<Bar[]>(MOCK_BARS);
  const [activeUsersMap, setActiveUsersMap] = useState<Record<string, number>>({});

  // Calculate active users for each bar
  useEffect(() => {
    const usersInBars = MOCK_USERS.reduce((acc, user) => {
      if (user.currentBarId) {
        acc[user.currentBarId] = (acc[user.currentBarId] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    setActiveUsersMap(usersInBars);
  }, []);

  // Sort bars by status and number of people
  const sortedBars = useMemo(() => {
    return [...bars].sort((a, b) => {
      // First sort by status (open bars first)
      if (a.isOpen !== b.isOpen) {
        return a.isOpen ? -1 : 1;
      }

      // Then sort by number of people (descending)
      const aUsers = activeUsersMap[a.id] || 0;
      const bUsers = activeUsersMap[b.id] || 0;
      return bUsers - aUsers;
    });
  }, [bars, activeUsersMap]);

  // Function to get active users count for a bar
  const getActiveUsersCount = (barId: string) => {
    return activeUsersMap[barId] || 0;
  };

  // Generate mock male/female counts for each bar
  const getGenderCounts = (barId: string, activeUsers: number) => {
    const seed = parseInt(barId) || 1;
    const maleRatio = 0.4 + ((seed * 17) % 20) * 0.01;
    const maleCount = Math.floor(activeUsers * maleRatio);
    const femaleCount = activeUsers - maleCount;
    return { male: maleCount, female: femaleCount };
  };

  // Function to open Google Maps
  const openGoogleMaps = (bar: Bar, event: React.MouseEvent) => {
    event.stopPropagation();
    const { coordinates, location } = bar;
    let mapsUrl;

    if (coordinates) {
      mapsUrl = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    } else {
      mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    }

    window.open(mapsUrl, '_blank');
  };


  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-8 bg-gradient-to-b from-background to-muted/20">
      {/* Map Circle UI */}
      <div className="relative w-72 h-72 mb-8 group">
        <div className="absolute inset-0 rounded-full border-2 border-border/40 bg-background/10 backdrop-blur-sm animate-pulse"></div>
        <div className="absolute inset-6 rounded-full border-2 border-border/60 bg-background/20 backdrop-blur-sm"></div>
        <div className="absolute inset-12 rounded-full border-2 border-primary/50 bg-primary/10 backdrop-blur-sm shadow-lg"></div>

        {/* Center user */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group">
          <div className="relative p-4 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-xl border-2 border-primary-foreground/20">
            <User className="w-8 h-8 text-primary-foreground" fill="currentColor" />
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
          </div>
        </div>

        {/* Bar markers */}
        {sortedBars.slice(0, 3).map((bar, i) => {
          const positions = [
            { top: "12%", left: "68%" },
            { top: "68%", left: "78%" },
            { top: "58%", left: "18%" },
          ];
          const genderCounts = getGenderCounts(bar.id, getActiveUsersCount(bar.id));

          return (
            <div
              key={bar.id}
              className="absolute group cursor-pointer transition-all duration-300 hover:scale-110"
              style={{ ...positions[i] }}
              onClick={() => router.push(`/bar/${bar.id}`)}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-br from-theme-purple to-theme-pink hover:from-theme-pink hover:to-theme-purple border-2 border-theme-light-pink/20">
                <Wine className="w-6 h-6 text-theme-light-pink" />
              </div>

              {/* Info box */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-card border-2 border-border shadow-xl whitespace-nowrap min-w-max">
                <p className="text-sm font-semibold text-card-foreground">{bar.name} <span className="text-muted-foreground text-xs">{bar.distance}</span></p>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-muted-foreground">ชาย</span>
                    <span className="font-medium text-muted-foreground">{genderCounts.male}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-muted-foreground">หญิง</span>
                    <span className="font-medium text-muted-foreground">{genderCounts.female}</span>
                  </div>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bar List */}
      <div className="w-full max-w-md">
        <div className="bg-card/90 backdrop-blur-md border-2 border-border rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b-2 border-border bg-gradient-to-r from-muted to-transparent">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" />
              <h2 className="text-card-foreground font-semibold">สถานที่ใกล้เคียง</h2>
              <span className="ml-auto text-sm text-muted-foreground font-medium">{sortedBars.length} แห่ง</span>
            </div>
          </div>

          {/* Bar Items */}
          <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
            {sortedBars.map((bar, index) => {
              const activeUsers = getActiveUsersCount(bar.id);
              const genderCounts = getGenderCounts(bar.id, activeUsers);
              return (
                <div
                  key={bar.id}
                  className={cn(!bar.isOpen ? "opacity-50" : "cursor-pointer", "group relative rounded-xl border-2 border-border transition-all duration-300  hover:shadow-lg bg-card hover:bg-card/80 hover:border-primary/50 overflow-hidden")}
                  onClick={() => bar.isOpen && router.push(`/bar/${bar.id}`)}
                >
                  <div className="flex">
                    <div className="relative w-32 flex-shrink-0">
                      <Image
                        priority
                        src={bar.image}
                        alt={bar.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 128px, 128px"
                      />
                      {/* Status indicator overlay */}
                      <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-background/50 backdrop-blur-sm">
                        <div
                          className={`w-2 h-2 rounded-full transition-colors ${bar.isOpen ? "bg-green-500" : "bg-yellow-500"
                            }`}
                        />
                        <span className="text-xs font-medium text-theme-light-pink">
                          {bar.isOpen ? "เปิด" : "ปิดเร็ว"}
                        </span>
                      </div>
                    </div>

                    {/* Content on Right */}
                    <div className="flex-1 p-3">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors text-sm line-clamp-1">
                          {bar.name}
                        </h3>
                        {/* Google Maps Button with Distance */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-theme-purple" />
                            {bar.distance || "0.8 กม."}
                          </span>
                          <button
                            onClick={(e) => openGoogleMaps(bar, e)}
                            className="flex items-center gap-1 px-2 py-0.5 text-xs bg-theme-purple/10 hover:bg-theme-purple/20 text-theme-purple rounded-md transition-colors"
                            title="เปิดใน Google Maps"
                          >
                            <ExternalLink className="w-3 h-3" />
                            แผนที่
                          </button>
                        </div>
                      </div>

                      {/* Genre */}
                      <div className="flex items-center gap-1 mb-1">
                        <Music className="w-3 h-3 text-theme-purple flex-shrink-0" />
                        <span className="text-xs text-theme-pink font-medium">
                          {bar.genre}
                          <span className="text-muted-foreground"> {bar.todaysBand}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-xs">
                            <div className="w-2 h-2 rounded-full bg-theme-purple"></div>
                            <span className="font-medium text-muted-foreground">
                              ชาย
                              <span className="font-medium text-muted-foreground"> {genderCounts.male}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <div className="w-2 h-2 rounded-full bg-theme-pink"></div>
                            <span className="font-medium text-muted-foreground">
                              หญิง
                              <span className="font-medium text-muted-foreground"> {genderCounts.female}</span>
                            </span>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          {activeUsers} คน
                        </div>
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
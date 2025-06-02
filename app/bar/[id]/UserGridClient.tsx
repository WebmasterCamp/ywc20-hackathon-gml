"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Users, Star, MessageSquare, UserPlus, Search, CalendarDays, Coffee, UserCircle, MapPin, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_USERS, User } from "@/lib/constants";
import { useAuth } from "@/components/auth/auth-provider";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface Bar {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  location: string;
  activeUsers: number;
  category: string;
  features: string[];
  distance?: string;
  band?: {
    name: string;
    description: string;
    image: string;
  };
}

interface UserGridClientProps {
  bar: Bar;
}

export default function UserGridClient({ bar }: UserGridClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "alphabetical">("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      // Find users who like similar bar categories and are available to join
      const similarUsers = MOCK_USERS.filter(u => 
        u.id !== user?.id && // Exclude current user
        u.preferences?.favoriteCategories?.includes(bar.category) // Similar interests
      );
      setAvailableUsers(similarUsers);
      setFilteredUsers(similarUsers);
      setLoading(false);
    }, 500);
  }, [bar.category, user?.id]);

  // Filter and sort users
  useEffect(() => {
    let filtered = availableUsers.filter(u => 
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.bio?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort users
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        case "oldest":
          return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
        case "alphabetical":
          return a.username.localeCompare(b.username);
        default:
          return 0;
      }
    });

    setFilteredUsers(filtered);
  }, [availableUsers, searchTerm, sortBy]);

  const handleConnectUser = (targetUser: User) => {
    // In a real app, this would send a connection request
    alert(`Connection request sent to ${targetUser.username}!`);
  };

  const handleMessageUser = (targetUser: User) => {
    // In a real app, this would open a chat or send to messages
    alert(`Opening chat with ${targetUser.username}...`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] sm:h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Loading users...</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="bg-card px-4 pt-6 pb-4 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold leading-tight">{bar.name}</h1>
            <span className="flex items-center text-sm text-muted-foreground ml-2">
              <MapPin className="w-4 h-4 mr-1" />
              {bar.distance || "0.8 กม."}
            </span>
          </div>
          {/* Placeholder for logout/profile */}
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          {bar.description || "Lorem ipsum dolor amet consectetur. Lacus leo gravida."}
        </p>
        {/* Feature Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {bar.features?.map((feature) => (
            <Badge
              key={feature}
              className="rounded-full px-3 py-1 bg-background border border-foreground/30 text-foreground text-xs font-medium shadow-sm"
            >
              #{feature}
            </Badge>
          ))}
        </div>
        {/* Stats & Band */}
        <div className="flex gap-2 w-full">
          <div className="flex-1 flex flex-col items-center justify-center bg-muted rounded-xl p-3 border border-border">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-6 h-6 mb-1 text-foreground" />
              <div className="text-2xl font-bold leading-none">{bar.activeUsers}</div>
            </div>
            <div className="text-xs text-muted-foreground">คนในร้านขณะนี้</div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center bg-muted rounded-xl p-3 border border-border">
            <div className="flex items-center gap-2 mb-1">
              {bar.band?.image && (
                <Image src={bar.band.image || "/default-band.png"} alt={bar.band.name} width={32} height={32} className="rounded-full object-cover" />
              )}
              <span className="text-xs text-muted-foreground">กำลังเล่นอยู่ในขณะนี้</span>
            </div>
            <div className="text-base font-semibold flex items-center gap-1">
              {bar.band?.name || "วงดนตรี"}
              <Music className="w-4 h-4" />
            </div>
            <div className="text-xs text-muted-foreground line-clamp-1">
              {bar.band?.description || '"We\'re alternative rock band"'}
            </div>
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 bg-muted/40 px-0 pt-4 pb-8 overflow-y-auto">
        <div className="flex flex-col gap-4 max-w-lg mx-auto">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-card rounded-xl shadow border border-border flex items-center px-4 py-3 gap-3">
              {/* Profile Image */}
              <Image
                src={user.avatar || "/default-avatar.png"}
                alt={user.username}
                width={56}
                height={56}
                className="rounded-full object-cover border-2 border-theme-pink flex-shrink-0 w-12 h-12"
              />
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="mb-1">
                  <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full mb-1">
                    ต้องการใครสักคนที่เข้าใจ
                  </span>
                </div>
                <div className="font-semibold text-sm leading-tight truncate">
                  {user.username}
                </div>
                <div className="text-xs text-muted-foreground mb-1 truncate">
                  {user.bio || "มหาสนั่นท์"}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.preferences?.favoriteCategories?.slice(0, 3).map((cat) => (
                    <Badge
                      key={cat}
                      className="rounded-full px-2 py-0.5 border border-foreground/30 text-xs font-medium bg-background text-foreground"
                    >
                      #{cat}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Bars Button */}
      <div className="mt-8 text-center">
        <Button variant="outline" onClick={() => router.push("/")}>
          ← Back to All Bars
        </Button>
      </div>
    </div>
  );
}

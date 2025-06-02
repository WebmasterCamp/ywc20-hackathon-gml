"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Users, Star, MessageSquare, UserPlus, Search, CalendarDays, Coffee, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_USERS, User } from "@/lib/constants";
import { useAuth } from "@/components/auth/auth-provider";
import { formatDistanceToNow } from "date-fns";

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
    <>
      {/* Header Section */}
      <div className="relative rounded-xl overflow-hidden h-32 md:h-48 mb-6">
        <Image
          src={bar.image}
          alt={bar.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4 md:p-6 text-white w-full">
            <h1 className="text-2xl md:text-3xl font-bold">{bar.name}</h1>
            <div className="flex items-center mt-2">
              <Badge variant="secondary" className="mr-2 bg-white/20 hover:bg-white/20">
                {bar.category.charAt(0).toUpperCase() + bar.category.slice(1)}
              </Badge>
              <div className="flex items-center text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 text-white">{bar.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Info */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          Find People to Join at {bar.name}
        </h2>
        <p className="text-muted-foreground">
          Connect with other {bar.category} enthusiasts who love the same vibe as you do.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or bio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <Select value={sortBy} onValueChange={(value: "newest" | "oldest" | "alphabetical") => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest Members</SelectItem>
                <SelectItem value="oldest">Oldest Members</SelectItem>
                <SelectItem value="alphabetical">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* User Grid */}
      {filteredUsers.length === 0 ? (
        <Card className="p-8 text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium">No users found</h3>
          <p className="text-muted-foreground mt-2">
            {searchTerm ? 
              "Try adjusting your search terms or filters." : 
              "No users with similar interests are currently available to join."
            }
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((targetUser) => (
            <Card key={targetUser.id} className="p-4 hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarImage src={targetUser.avatar} alt={targetUser.username} />
                  <AvatarFallback>{targetUser.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm truncate">{targetUser.username}</h3>
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      {targetUser.preferences?.favoriteCategories?.[0] || bar.category}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {targetUser.bio || "No bio available"}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      <span>Joined {formatDistanceToNow(new Date(targetUser.joinDate), { addSuffix: true })}</span>
                    </div>
                  </div>
                  
                  {/* Favorite Categories */}
                  {targetUser.preferences?.favoriteCategories && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {targetUser.preferences.favoriteCategories.slice(0, 3).map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs px-1.5 py-0.5">
                          {category}
                        </Badge>
                      ))}
                      {targetUser.preferences.favoriteCategories.length > 3 && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                          +{targetUser.preferences.favoriteCategories.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 h-8 text-xs"
                      onClick={() => handleConnectUser(targetUser)}
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
                      Connect
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 h-8 text-xs"
                      onClick={() => handleMessageUser(targetUser)}
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Back to Bars Button */}
      <div className="mt-8 text-center">
        <Button variant="outline" onClick={() => router.push("/")}>
          ← Back to All Bars
        </Button>
      </div>
    </>
  );
}

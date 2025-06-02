"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { Badge } from "@/components/ui/badge";
import { Bar, MOCK_USERS, User } from "@/lib/constants";
import { MapPin, Music, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


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
      // Find users who are currently at this bar and have similar interests
      const similarUsers = MOCK_USERS.filter(u =>
        u.id !== user?.id && // Exclude current user
        u.currentBarId === bar.id && // Only users currently at this bar
        u.preferences?.favoriteCategories?.includes(bar.category) // Similar interests
      );
      setAvailableUsers(similarUsers);
      setFilteredUsers(similarUsers);
      setLoading(false);
    }, 500);
  }, [bar.category, bar.id, user?.id]);

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
    <div className="bg-background text-foreground flex flex-col ">
      <button onClick={() => router.push("/")} className="absolute right-4 top-4 rounded-full flex flex-col items-center z-10">
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
          <svg
            width={22}
            height={22}
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.44909 5.78712C8.79034 5.78712 8.252 5.24171 8.252 4.58296C8.252 4.26547 8.37812 3.96099 8.60262 3.73649C8.82712 3.51199 9.1316 3.38587 9.44909 3.38587C10.1149 3.38587 10.6533 3.92421 10.6533 4.58296C10.6533 5.24171 10.1149 5.78712 9.44909 5.78712ZM7.29575 14.1171L3.09534 13.2813L3.33617 12.0771L6.27575 12.6792L7.232 7.82004L6.15534 8.24504V10.2709H4.95825V7.46587L8.07492 6.14129L8.5495 6.08462C8.9745 6.08462 9.32867 6.32546 9.56242 6.68671L10.1716 7.64296C10.6533 8.50004 11.6095 9.08087 12.7499 9.08087V10.2709C11.4324 10.2709 10.2283 9.68296 9.44909 8.78337L9.09492 10.5825L10.3487 11.7796V16.2917H9.15159V12.6792L7.89075 11.4821L7.29575 14.1171ZM14.8749 16.2917H13.4583V2.12504H4.24992V11.4113L2.83325 11.1138V0.708374H14.8749V16.2917ZM4.24992 16.2917H2.83325V14.0109L4.24992 14.3084V16.2917Z"
              fill="url(#paint0_linear_44_637)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_44_637"
                x1={-6}
                y1={-7}
                x2="16.5"
                y2={18}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.264923" stopColor="white" />
                <stop offset="0.505011" stopColor="#E780B3" />
                <stop offset="0.73055" stopColor="#D274A3" />
                <stop offset={1} stopColor="#985476" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <span className="text-xs text-theme-light-pink">ออก</span>
      </button>


      {/* Cover Image Section */}
      <div className="absolute w-full h-[220px] left-0 top-0">
        <Image
          src={bar.image || "/images/cover/1.png"}
          alt={bar.name}
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="relative w-full h-56 sm:h-64 md:h-72 mb-0">
        {/* Bar Info Overlay */}
        <div className="absolute left-0 right-0 bottom-0 px-4 pb-6 pt-8 flex flex-col items-start z-10">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold leading-tight text-theme-light-pink drop-shadow-lg">{bar.name}</h1>
            <span className="flex items-center text-lg text-theme-light-pink ml-2 drop-shadow-lg">
              <MapPin className="w-5 h-5 mr-1" />
              {bar.distance || "0.8 กม."}
            </span>
          </div>
          <p className="text-base text-theme-light-pink mb-3 drop-shadow-lg">
            {bar.description || "Lorem ipsum dolor amet consectetur. Lacus leo gravida."}
          </p>
        </div>
      </div>
      {/* Feature Tags below cover */}
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
      <div className="px-4">
        <div className="flex gap-2 w-full">
          <div className="  flex-1 flex flex-col items-center justify-center bg-muted rounded-xl p-3 border border-border">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-6 h-6 mb-1 text-foreground" />
              <div className="text-2xl font-bold leading-none">{filteredUsers.length}</div>
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
      <div className="flex-1 h-full px-0 pt-4 pb-8 overflow-y-auto">
        <div className="flex flex-col gap-4 max-w-lg mx-auto">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-card rounded-xl shadow border border-border flex items-center px-4 py-3 gap-3 cursor-pointer hover:bg-muted/60 transition"
              onClick={() => router.push(`/profile/${user.id}`)}
            >
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
                <div className="mb-1 relative">
                  <div className="inline-block bg-muted text-muted-foreground text-xs px-3 py-1.5 rounded-2xl relative">
                    {user.note || "ต้องการใครสักคนที่เข้าใจ"}
                    <div className="w-[9px] h-[9px] rounded-full bg-theme-pink/40 absolute bottom-0 left-0">
                    </div>
                    <div className="w-[4px] h-[4px] rounded-full bg-theme-pink/40 absolute -bottom-1 -left-1">
                    </div>
               
                  </div>
                </div>
                <div className="font-semibold text-sm leading-tight truncate">
                  {user.username}
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



    </div>
  );
}

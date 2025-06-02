"use client";
import { User } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function UserProfileClient({ user }: { user: User }) {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [isWaiting, setIsWaiting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleJoinChat = () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }

    setIsWaiting(true);
    
    // Show notification after 2.5 seconds, then navigate
    setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => {
        router.push(`/chat/${user.id}`);
      }, 1000);
    }, 2500);
  };

  // Hide notification when component unmounts
  useEffect(() => {
    return () => {
      setShowNotification(false);
    };
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-2xl font-bold">ไม่พบผู้ใช้</div>
      </div>
    );
  }
  return (
    <div className="bg-background flex flex-col items-center py-4 px-4 md:py-8 lg:py-12">
      {/* Container with responsive max width */}
      <div className="w-full max-w-md lg:max-w-4xl xl:max-w-5xl">
        <div className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 md:mb-6 lg:mb-8 text-center">Profile</div>
        
        {/* Desktop layout - side by side */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12">
          {/* Left column (or main content on mobile) */}
          <div className="flex flex-col items-center lg:items-start">
            {/* Quote */}
            <div className="bg-muted text-foreground rounded-xl px-4 py-3 md:px-6 md:py-4 text-base md:text-lg font-medium mb-4 md:mb-6 w-full max-w-md lg:max-w-none text-center relative">
              <span className="absolute left-3 md:left-4 top-1 md:top-2 text-2xl md:text-3xl">&ldquo;</span>
              <span>ต้องการใครสักคนที่เข้าใจ</span>
              <span className="absolute right-3 md:right-4 bottom-1 md:bottom-2 text-2xl md:text-3xl">&rdquo;</span>
            </div>
            
            {/* Avatar */}
            <div className="relative mb-4 md:mb-6">
              <Image
                src={user.avatar || "/default-avatar.png"}
                alt={user.username}
                width={120}
                height={120}
                className="rounded-full border-4 border-theme-pink object-cover w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
              />
              <span className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1 border-2 border-white">
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
              </span>
            </div>
            
            {/* User Info */}
            <div className="bg-card rounded-xl shadow border border-border w-full max-w-md lg:max-w-none px-4 py-4 md:px-6 md:py-6 flex flex-col items-center lg:items-start mb-4 md:mb-6">
              <div className="text-lg md:text-xl lg:text-2xl font-bold mb-1 text-center lg:text-left">{user.username} <span className="text-sm md:text-base font-normal">(21 ปี)</span></div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm md:text-base text-muted-foreground mb-4 text-center lg:text-left">
                <div>เพศกำเนิด <span className="font-medium">ชาย</span></div>
                <div>อาชีพ <span className="font-medium">นักศึกษา</span></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 w-full mb-4">
                <button className="bg-gradient-to-r from-[#9F45B0] to-[#FE8CC5] text-white rounded-full py-2 px-3 md:py-3 md:px-4 font-medium text-sm md:text-base">#ความชอบ 1</button>
                <button className="bg-gradient-to-r from-[#9F45B0] to-[#FE8CC5] text-white rounded-full py-2 px-3 md:py-3 md:px-4 font-medium text-sm md:text-base">#ความชอบ 2</button>
                <button className="bg-gradient-to-r from-[#9F45B0] to-[#FE8CC5] text-white rounded-full py-2 px-3 md:py-3 md:px-4 font-medium text-sm md:text-base">#ความชอบ 3</button>
              </div>
              <div className="text-center lg:text-left text-muted-foreground text-sm md:text-base mb-2">
                {user.bio || "-"}
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-2">
                {user.preferences?.favoriteCategories?.map((cat) => (
                  <span key={cat} className="bg-background border border-foreground/30 rounded-full px-3 py-1 text-xs md:text-sm font-medium text-foreground">#{cat}</span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column (badges and action - desktop only side by side) */}
          <div className="flex flex-col items-center lg:items-start">
            {/* Badges (static for now) */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8 lg:mb-12">
              <Image src="/badges/words.png" alt="Words of Affirmation" width={90} height={90} className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
              <Image src="/badges/quality.png" alt="Quality Time" width={90} height={90} className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
              <Image src="/badges/physical.png" alt="Physical Touch" width={90} height={90} className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
              <Image src="/badges/acts.png" alt="Acts of Service" width={90} height={90} className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
              <Image src="/badges/receiving.png" alt="Receiving Gifts" width={90} height={90} className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
            </div>
            
            {/* Action Button */}
            <button
              className={`w-full max-w-md lg:max-w-none rounded-full py-3 md:py-4 lg:py-5 text-lg md:text-xl lg:text-2xl font-bold shadow-lg transition ${
                isWaiting 
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
              : 'bg-foreground text-background hover:bg-theme-pink'
              }`}
              onClick={handleJoinChat}
              disabled={isWaiting}
            >
              {isWaiting ? 'กำลังรอการตอบรับ' : 'จอยกัน !'}
            </button>
          </div>
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">คำขอถูกตอบรับแล้ว!</span>
          </div>
        </div>
      )}
    </div>
  );
}
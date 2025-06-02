"use client";
import { User } from "@/lib/constants";
import Image from "next/image";

export default function UserProfileClient({ user }: { user: User }) {
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-2xl font-bold">ไม่พบผู้ใช้</div>
      </div>
    );
  }

  return (
    <div className="bg-background flex flex-col items-center py-8 px-4">
      <div className="text-3xl font-semibold mb-6">Profile</div>
      {/* Quote */}
      <div className="bg-muted text-foreground rounded-xl px-6 py-4 text-lg font-medium mb-4 w-full max-w-md text-center relative">
        <span className="absolute left-4 top-2 text-3xl">"</span>
        <span>ต้องการใครสักคนที่เข้าใจ</span>
        <span className="absolute right-4 bottom-2 text-3xl">"</span>
      </div>
      {/* Avatar */}
      <div className="relative mb-4">
        <Image
          src={user.avatar || "/default-avatar.png"}
          alt={user.username}
          width={120}
          height={120}
          className="rounded-full border-4 border-theme-pink object-cover w-28 h-28"
        />
        <span className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1 border-2 border-white">
          <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        </span>
      </div>
      {/* User Info */}
      <div className="bg-card rounded-xl shadow border border-border w-full max-w-md px-6 py-6 flex flex-col items-center mb-6">
        <div className="text-xl font-bold mb-1">{user.username} <span className="text-base font-normal">(21 ปี)</span></div>
        <div className="flex gap-6 text-sm text-muted-foreground mb-4">
          <div>เพศกำเนิด <span className="font-medium">ชาย</span></div>
          <div>อาชีพ <span className="font-medium">นักศึกษา</span></div>
        </div>
        <div className="flex gap-3 w-full mb-4">
          <button className="flex-1 bg-muted text-foreground rounded-full py-2 font-medium">ความชอบ 1</button>
          <button className="flex-1 bg-muted text-foreground rounded-full py-2 font-medium">ความชอบ 2</button>
          <button className="flex-1 bg-muted text-foreground rounded-full py-2 font-medium">ความชอบ 3</button>
        </div>
        <div className="text-center text-muted-foreground text-base mb-2">
          {user.bio || "-"}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {user.preferences?.favoriteCategories?.map((cat) => (
            <span key={cat} className="bg-background border border-foreground/30 rounded-full px-3 py-1 text-xs font-medium text-foreground">#{cat}</span>
          ))}
        </div>
      </div>
      {/* Badges (static for now) */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Image src="/badges/words.png" alt="Words of Affirmation" width={90} height={90} />
        <Image src="/badges/quality.png" alt="Quality Time" width={90} height={90} />
        <Image src="/badges/physical.png" alt="Physical Touch" width={90} height={90} />
        <Image src="/badges/acts.png" alt="Acts of Service" width={90} height={90} />
        <Image src="/badges/receiving.png" alt="Receiving Gifts" width={90} height={90} />
      </div>
      <button className="w-full max-w-md bg-foreground text-background rounded-full py-4 text-xl font-bold shadow-lg hover:bg-theme-pink transition">จอยกัน !</button>
    </div>
  );
} 
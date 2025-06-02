"use client";
import { User } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { ChevronLeft, User as UserIcon, Briefcase, Circle } from "lucide-react";
import Image from "next/image";

export default function UserProfileClient({ user }: { user: User }) {
  const router = useRouter();

  // Placeholder badges
  const badges = [
    { src: "/badges/words.png", alt: "Words of Affirmation" },
    { src: "/badges/quality.png", alt: "Quality Time" },
    { src: "/badges/physical.png", alt: "Physical Touch" },
    { src: "/badges/acts.png", alt: "Acts of Service" },
    { src: "/badges/receiving.png", alt: "Receiving Gifts" },
  ];

  // Placeholder tags
  const tags = ["#บาร์แจ๊ส", "#นั่งชิว", "#หุ้น"];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 pb-8 relative">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-4 bg-muted/70 hover:bg-muted rounded-full p-2 text-2xl text-muted-foreground shadow-md z-10"
        aria-label="ย้อนกลับ"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      {/* Username */}
      <div className="pt-12 pb-2 text-3xl font-bold text-center text-white drop-shadow-lg">{user.username || "น้องมานีมีลูกแมว"}</div>
      {/* Info Row */}
      <div className="flex items-center justify-center gap-6 text-theme-light-pink text-base font-medium mb-2">
        <div className="flex items-center gap-1"><UserIcon className="w-5 h-5" /> 21 ปี</div>
        <div className="flex items-center gap-1"><span className="text-lg">♂</span> ชาย</div>
        <div className="flex items-center gap-1"><Briefcase className="w-5 h-5" /> นักศึกษา</div>
      </div>
      {/* Bio */}
      <div className="text-theme-light-pink text-center text-sm max-w-xs mx-auto mb-4">
        “ชอบนั่งร้านเหล้าชิล ๆ มากกว่าผับเสียงดัง เบียร์เย็น ๆ เพลงเบา ๆ กับบทสนทนาดี ๆ คือความสุขของวันศุกร์ 🍻 ใครสายชิลเหมือนกันทักมาได้เลยนะ”
      </div>
      {/* Quote */}
      <div className="flex justify-center mb-2">
        <div className="relative bg-white bg-opacity-90 rounded-xl px-6 py-2 text-theme-dark text-base font-semibold shadow-lg border-2 border-theme-pink" style={{ filter: "drop-shadow(0 0 12px #F7B0E0)" }}>
          <span className="">ต้องการใครสักคนที่เข้าใจ</span>
        </div>
      </div>
      {/* Avatar with badge */}
      <div className="relative flex justify-center mb-4">
        <div className="rounded-full p-1 bg-gradient-to-tr from-theme-pink to-theme-purple shadow-xl" style={{ boxShadow: "0 0 24px #F7B0E0" }}>
          <Image
            src={user.avatar || "https://randomuser.me/api/portraits/women/44.jpg"}
            alt={user.username}
            width={180}
            height={180}
            className="rounded-full object-cover border-4 border-white w-44 h-44"
          />
        </div>
        {/* Verified badge */}
        <div className="absolute bottom-4 right-1 bg-blue-500 rounded-full border-4 border-white p-1 shadow-lg">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#3B82F6"/><path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
      {/* Tags */}
      <div className="flex justify-center gap-3 mb-4">
        {tags.map((tag, i) => (
          <span key={tag} className={`px-5 py-2 rounded-full text-base font-semibold ${i === 2 ? 'bg-muted text-white' : 'bg-gradient-to-r from-theme-pink to-theme-purple text-white'} shadow-md`}>
            {tag}
          </span>
        ))}
      </div>
      {/* Badges */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 max-w-xs mx-auto">
        {badges.map((badge) => (
          <div key={badge.alt} className="w-24 h-24 flex items-center justify-center">
            <Image src={badge.src} alt={badge.alt} width={90} height={90} className="object-contain" />
          </div>
        ))}
      </div>
      {/* Action Button */}
      <button className="w-full max-w-md mx-auto py-4 text-xl font-bold rounded-full bg-gradient-to-r from-[#F7B0E0] to-[#5B5BFF] text-white shadow-xl hover:from-[#FE8CC5] hover:to-[#9F45B0] transition mt-2" style={{ boxShadow: '0 4px 24px 0 #0002' }}>
        ขอเป็นเพื่อนก่อนน้า :)
      </button>
    </div>
  );
}
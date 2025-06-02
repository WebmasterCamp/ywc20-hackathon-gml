"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function NotePage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center min-h-screen bg-background py-8 px-4">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 bg-muted/70 hover:bg-muted rounded-full p-2 text-2xl text-muted-foreground shadow-md"
        aria-label="ย้อนกลับ"
      >
      <ChevronLeft className="w-6 h-6" />   
      </button>
      {/* Title */}
      <div className="text-2xl font-semibold text-center text-theme-light-pink mt-12 mb-8">สร้างโน้ตใหม่</div>
      {/* Quote Box */}
      <Card className="relative bg-muted text-foreground rounded-xl px-6 py-8 text-lg font-medium mb-8 w-full max-w-md text-center shadow-lg">
        <span className="absolute left-4 top-2 text-3xl text-theme-pink">&ldquo;</span>
        <span>ต้องการใครสักคนที่เข้าใจ</span>
        <span className="absolute right-4 bottom-2 text-3xl text-theme-pink">&rdquo;</span>
      </Card>
      {/* Profile Image */}
      <div className="mb-10">
        <Avatar className="w-40 h-40 border-4 border-theme-pink shadow-lg">
          <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="profile" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      </div>
      {/* Share Button */}
      <Button
        className="w-full max-w-md py-4 text-xl font-bold rounded-full bg text-white shadow-xl transition"
        style={{ boxShadow: '0 4px 24px 0 #0002' }}
      >
        แชร์โน้ตเลย!
      </Button>
    </div>
  );
} 
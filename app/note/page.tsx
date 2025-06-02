"use client"
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useBarStore } from '@/lib/barStore';

export default function NotePage() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const { currentBarId } = useBarStore();

  useEffect(() => {
    if (!currentBarId) {
      router.replace('/');
    }
  }, [currentBarId, router]);

  if (!currentBarId) return null;

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
      {/* Quote Box with textarea */}
      <Card className="relative bg-muted text-foreground rounded-xl px-4 py-4 text-base font-medium mb-6 w-full max-w-md text-center shadow-md">
        <span className="absolute left-3 top-1 text-2xl text-theme-pink">&ldquo;</span>
        <textarea
          className="w-full bg-transparent border-none outline-none resize-none text-center text-base font-medium placeholder:text-muted-foreground focus:ring-0 py-1 min-h-[36px]"
          rows={2}
          maxLength={120}
          placeholder="เขียนข้อความของคุณ..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <span className="absolute right-3 bottom-1 text-2xl text-theme-pink">&rdquo;</span>
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
      onClick={() => router.push(`/bar/${currentBarId}`)}
        className="w-full max-w-md py-4 text-xl font-bold rounded-full bg text-white shadow-xl transition"
        style={{ boxShadow: '0 4px 24px 0 #0002' }}
        disabled={!message.trim()}
      >
        แชร์โน้ตเลย!
      </Button>
    </div>
  );
} 
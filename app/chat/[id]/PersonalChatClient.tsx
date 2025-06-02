"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { User } from "@/lib/constants";
import { Message } from "@/lib/type";
import { Card } from "@/components/ui/card";
import { ChatRoom } from "@/components/chat/chat-room";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PersonalChatClientProps {
  targetUser: User;
}

export default function PersonalChatClient({ targetUser }: PersonalChatClientProps) {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      router.push("/login");
      return;
    }

    // Load initial personal messages (in a real app, this would come from a database)
    const personalMessages: Message[] = [
      {
        id: "pm1",
        userId: targetUser.id,
        username: targetUser.username,
        avatar: targetUser.avatar || `https://ui-avatars.com/api/?name=${targetUser.username.slice(0, 2)}&background=random`,
        content: "สวัสดี! ยินดีที่ได้รู้จัก 😊",
        timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        barId: "personal",
      },
    ];

    setMessages(personalMessages);
  }, [currentUser, targetUser, router]);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading chat...</h2>
          <p className="text-muted-foreground">Please wait</p>
        </div>
      </div>
    );
  }
  return (
    <div className="h-screen flex flex-col md:container md:px-4 md:py-8 md:max-w-4xl md:mx-auto md:h-auto">
      {/* Header with back button and user info */}
      <div className="flex items-center gap-4 mb-4 md:mb-6 px-4 md:px-0 py-2 md:py-0 bg-background border-b md:border-none">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="flex-shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-3 flex-1">
          <Avatar className="h-10 w-10">
            <AvatarImage src={targetUser.avatar} alt={targetUser.username} />
            <AvatarFallback>{targetUser.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">{targetUser.username}</h1>
            <p className="text-sm text-muted-foreground">Personal Chat</p>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden flex-1 md:flex-none rounded-none md:rounded-lg border-0 md:border">        <ChatRoom
          roomName={`Chat with ${targetUser.username}`}
          messages={messages}
          currentUser={currentUser}
          className="h-full flex-1"
          onSendMessage={(content) => {
            const newMessage: Message = {
              id: `pm-${Date.now()}`,
              userId: currentUser.id,
              username: currentUser.username,
              avatar: currentUser.avatar || `https://ui-avatars.com/api/?name=${currentUser.username.slice(0, 2)}&background=random`,
              content,
              timestamp: new Date().toISOString(),
              barId: "personal",
            };
            setMessages(prev => [...prev, newMessage]);

            // Simulate a response after a delay (in a real app, this would be real-time)
            setTimeout(() => {
              const responses = [
                "ว้าว น่าสนใจมาก!",
                "จริงหรอ ฟังดูดีเลย",
                "เห็นด้วยเลย!",
                "555 ตลกจัง",
                "ขอบคุณที่แชร์นะ",
                "อันนี้ผมชอบ!",
                "เดี๋ยวเจอกันที่บาร์นะ",
                "มาเจอกันที่บาร์ดีกว่า!",
                "ขอบคุณที่ชวนนะ 😊",
              ];
              
              const randomResponse = responses[Math.floor(Math.random() * responses.length)];
              
              const responseMessage: Message = {
                id: `pm-response-${Date.now()}`,
                userId: targetUser.id,
                username: targetUser.username,
                avatar: targetUser.avatar || `https://ui-avatars.com/api/?name=${targetUser.username.slice(0, 2)}&background=random`,
                content: randomResponse,
                timestamp: new Date().toISOString(),
                barId: "personal",
              };
              
              setMessages(prev => [...prev, responseMessage]);
            }, 1000 + Math.random() * 3000); // Random delay between 1-4 seconds
          }}
        />
      </Card>
    </div>
  );
}
    
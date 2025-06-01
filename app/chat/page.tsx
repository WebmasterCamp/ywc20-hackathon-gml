"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_MESSAGES, Message } from "@/lib/constants";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatRoom } from "@/components/chat/chat-room";
import { useAuth } from "@/components/auth/auth-provider";

export default function ChatPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push("/login");
      return;
    }
    
    // Load initial messages
    setMessages(MOCK_MESSAGES);
    
    // Simulate receiving new messages periodically
    const interval = setInterval(() => {
      const randomMessage: Message = {
        id: `msg-${Date.now()}`,
        userId: `user${Math.floor(Math.random() * 10) + 1}`,
        username: ["BeerLover", "WhiskeyWiz", "CocktailPro", "WineEnthusiast"][Math.floor(Math.random() * 4)],
        avatar: `https://ui-avatars.com/api/?name=${["BL", "WW", "CP", "WE"][Math.floor(Math.random() * 4)]}&background=random`,
        content: [
          "Anyone going to The Crafty Brew tonight?",
          "Just tried an amazing IPA at Corner Pocket!",
          "The new cocktail menu at Skyline Lounge is impressive",
          "Happy hour deals at Rustic Barrel are insane right now"
        ][Math.floor(Math.random() * 4)],
        timestamp: new Date().toISOString(),
        barId: Math.random() > 0.6 ? "lobby" : ["1", "2", "3"][Math.floor(Math.random() * 3)],
      };
      
      setMessages(prev => [...prev, randomMessage]);
    }, 60000); // Add new message every minute
    
    return () => clearInterval(interval);
  }, [router, user]);
  
  if (!user) return null;
  
  const lobbyMessages = messages.filter(msg => msg.barId === "lobby");
  const bar1Messages = messages.filter(msg => msg.barId === "1");
  const bar2Messages = messages.filter(msg => msg.barId === "2");
  
  return (
    <div className="container px-4 py-4 md:py-8 max-w-4xl mx-auto">
      <PageHeader
        title="Chat Rooms"
        description="Connect with other bar enthusiasts"
      />
      
      <Card className="overflow-hidden">
        <Tabs defaultValue="lobby" className="w-full">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none h-12">
              <TabsTrigger value="lobby" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Lobby
              </TabsTrigger>
              <TabsTrigger value="craftyBrew" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                The Crafty Brew
              </TabsTrigger>
              <TabsTrigger value="skylineLounge" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Skyline Lounge
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="lobby" className="m-0 p-0">
            <ChatRoom 
              roomName="Global Lobby" 
              messages={lobbyMessages} 
              currentUser={user}
              onSendMessage={(content) => {
                const newMessage: Message = {
                  id: `msg-${Date.now()}`,
                  userId: user.id,
                  username: user.username,
                  avatar: user.avatar,
                  content,
                  timestamp: new Date().toISOString(),
                  barId: "lobby",
                };
                setMessages(prev => [...prev, newMessage]);
              }}
            />
          </TabsContent>
          
          <TabsContent value="craftyBrew" className="m-0 p-0">
            <ChatRoom 
              roomName="The Crafty Brew" 
              messages={bar1Messages}
              currentUser={user}
              onSendMessage={(content) => {
                const newMessage: Message = {
                  id: `msg-${Date.now()}`,
                  userId: user.id,
                  username: user.username,
                  avatar: user.avatar,
                  content,
                  timestamp: new Date().toISOString(),
                  barId: "1",
                };
                setMessages(prev => [...prev, newMessage]);
              }}
            />
          </TabsContent>
          
          <TabsContent value="skylineLounge" className="m-0 p-0">
            <ChatRoom 
              roomName="Skyline Lounge" 
              messages={bar2Messages}
              currentUser={user}
              onSendMessage={(content) => {
                const newMessage: Message = {
                  id: `msg-${Date.now()}`,
                  userId: user.id,
                  username: user.username,
                  avatar: user.avatar,
                  content,
                  timestamp: new Date().toISOString(),
                  barId: "2",
                };
                setMessages(prev => [...prev, newMessage]);
              }}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
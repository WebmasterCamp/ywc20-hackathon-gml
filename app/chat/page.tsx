"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_MESSAGES } from "@/lib/constants";
import { Message } from "@/lib/type";
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
    const transformedMessages: Message[] = MOCK_MESSAGES.map(msg => ({
      ...msg,
      username: msg.userName,
      avatar: `https://ui-avatars.com/api/?name=${msg.userName.slice(0, 2)}&background=random`,
      timestamp: msg.timestamp.toISOString()
    }));
    setMessages(transformedMessages);
    
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
    <div className="container px-3 py-3 sm:px-4 sm:py-4 md:py-6 lg:py-8 max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
      <PageHeader
        title="Chat Rooms"
        description="Connect with other bar enthusiasts"
      />
      
      <Card className="overflow-hidden shadow-lg">
        <Tabs defaultValue="lobby" className="w-full">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none h-10 sm:h-12 md:h-14 overflow-x-auto">
              <TabsTrigger 
                value="lobby" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary text-xs sm:text-sm md:text-base px-2 sm:px-4 md:px-6 whitespace-nowrap"
              >
                Lobby
              </TabsTrigger>
              <TabsTrigger 
                value="craftyBrew" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary text-xs sm:text-sm md:text-base px-2 sm:px-4 md:px-6 whitespace-nowrap"
              >
                The Crafty Brew
              </TabsTrigger>
              <TabsTrigger 
                value="skylineLounge" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary text-xs sm:text-sm md:text-base px-2 sm:px-4 md:px-6 whitespace-nowrap"
              >
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
                  avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.username.slice(0, 2)}&background=random`,
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
                  avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.username.slice(0, 2)}&background=random`,
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
                  avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.username.slice(0, 2)}&background=random`,
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
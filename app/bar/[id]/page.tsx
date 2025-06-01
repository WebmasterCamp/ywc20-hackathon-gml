"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { MapPin, Phone, Globe, Clock, Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { MOCK_BARS, MOCK_MESSAGES, Bar, Message } from "@/lib/constants";
import { useAuth } from "@/components/auth/auth-provider";
import { ChatRoom } from "@/components/chat/chat-room";

// This function tells Next.js which dynamic paths to pre-render
export async function generateStaticParams() {
  return MOCK_BARS.map((bar) => ({
    id: bar.id,
  }));
}

export default function BarDetailPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { user } = useAuth();
  const [bar, setBar] = useState<Bar | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      const foundBar = MOCK_BARS.find((b) => b.id === id);
      if (foundBar) {
        setBar(foundBar);
        setMessages(MOCK_MESSAGES.filter((msg) => msg.barId === id));
      } else {
        router.push("/404");
      }
      setLoading(false);
    }, 500);
  }, [id, router]);

  if (loading) {
    return (
      <div className="container px-3 sm:px-4 py-4 sm:py-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-center h-[60vh] sm:h-[70vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Loading bar details...</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Please wait</p>
          </div>
        </div>
      </div>
    );
  }

  if (!bar) return null;

  return (
    <div className="container px-3 sm:px-4 py-3 sm:py-4 md:py-8 max-w-5xl mx-auto">
      <div className="relative rounded-xl overflow-hidden h-48 md:h-80 mb-6">
        <img
          src={bar.image}
          alt={bar.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4 md:p-6 text-white w-full">
            <h1 className="text-3xl font-bold">{bar.name}</h1>
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

      <Tabs defaultValue="info">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="chat">Chat Room</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p>{bar.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{bar.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>www.{bar.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>5:00 PM - 2:00 AM</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {bar.features.map((feature) => (
                    <Badge key={feature} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Happy Hour</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>5:00 PM - 7:00 PM</span>
              </div>
              <div>
                <h3 className="font-medium mt-2">Specials</h3>
                <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                  <li>$5 Draft Beers</li>
                  <li>$7 House Wines</li>
                  <li>$8 Signature Cocktails</li>
                  <li>Half-price appetizers</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="chat">
          {user ? (
            <ChatRoom 
              roomName={bar.name} 
              messages={messages} 
              currentUser={user}
              onSendMessage={(content) => {
                const newMessage: Message = {
                  id: `msg-${Date.now()}`,
                  userId: user.id,
                  username: user.username,
                  avatar: user.avatar,
                  content,
                  timestamp: new Date().toISOString(),
                  barId: bar.id,
                };
                setMessages(prev => [...prev, newMessage]);
              }}
            />
          ) : (
            <Card className="p-6 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">Join the conversation</h3>
              <p className="text-muted-foreground mt-2 mb-4">
                You need to be logged in to chat with other bar enthusiasts.
              </p>
              <Button onClick={() => router.push("/login")}>Log In</Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="events">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Live Jazz Night</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      This Friday, 8:00 PM - 11:00 PM
                    </p>
                    <p className="text-sm mt-2">
                      Join us for an evening of smooth jazz with the John Smith Quartet.
                    </p>
                  </div>
                  <Badge>Music</Badge>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Craft Beer Tasting</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Next Wednesday, 6:00 PM - 9:00 PM
                    </p>
                    <p className="text-sm mt-2">
                      Sample our newest craft beers with complimentary appetizers.
                    </p>
                  </div>
                  <Badge>Tasting</Badge>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Trivia Night</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Every Monday, 7:00 PM - 9:00 PM
                    </p>
                    <p className="text-sm mt-2">
                      Test your knowledge and win prizes! Teams of up to 4 players.
                    </p>
                  </div>
                  <Badge>Games</Badge>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
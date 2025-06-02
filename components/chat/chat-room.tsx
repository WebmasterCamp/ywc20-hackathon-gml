"use client";

import { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/lib/type";
import { User } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ChatRoomProps {
  roomName: string;
  messages: Message[];
  currentUser: User;
  onSendMessage: (content: string) => void;
  className?: string;
  hideHeader?: boolean;
}

export function ChatRoom({ roomName, messages, currentUser, onSendMessage, className, hideHeader = false }: ChatRoomProps) {
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };  return (
    <div className={cn("flex flex-col h-full", className)}>
      {!hideHeader && (
        <div className="p-3 sm:p-4 border-b bg-background/95 backdrop-blur-sm flex-shrink-0">
          <h2 className="text-base sm:text-lg font-medium">{roomName}</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">{messages.length} messages</p>
        </div>
      )}      <ScrollArea ref={scrollAreaRef} className="flex-1 p-3 sm:p-4 min-h-0 pb-20 md:pb-3">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-center px-4">
            <div>
              <div className="text-4xl mb-2">💬</div>
              <p className="text-sm sm:text-base">No messages yet.</p>
              <p className="text-xs sm:text-sm">Be the first to say hello!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4 pb-4 md:pb-0">            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-end gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%]",
                  message.userId === currentUser.id ? "ml-auto" : ""
                )}
              >
                {message.userId !== currentUser.id && (
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                    <AvatarImage src={message.avatar} alt={message.username} />
                    <AvatarFallback className="text-xs">{message.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                )}
                
                <div className={cn(
                  "space-y-1 flex-1",
                  message.userId === currentUser.id ? "items-end" : "items-start",
                )}>
                  <div className="flex items-center gap-2">
                    {message.userId !== currentUser.id && (
                      <span className="text-xs sm:text-sm font-medium">{message.username}</span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <div className={cn(
                    "p-2.5 sm:p-3 max-w-full break-words",
                    message.userId === currentUser.id 
                      ? "bg-primary text-primary-foreground ml-auto rounded-lg rounded-br-none" 
                      : "bg-secondary rounded-lg rounded-bl-none"
                  )}>
                    <p className="text-xs sm:text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
                
                {message.userId === currentUser.id && (
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                    <AvatarImage src={message.avatar} alt={message.username} />
                    <AvatarFallback className="text-xs">{message.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>
        <div className="p-3 sm:p-4 border-t bg-background/95 backdrop-blur-sm flex-shrink-0 md:relative fixed bottom-16 left-0 right-0 md:bottom-auto z-10">
        <form onSubmit={handleSendMessage} className="flex gap-2 max-w-4xl mx-auto">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 h-10 sm:h-10 text-sm"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()} className="h-10 w-10 sm:h-10 sm:w-10 flex-shrink-0">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/auth-provider";

const formSchema = z.object({
  email: z.string()
    .min(1, { message: "กรุณากรอกที่อยู่อีเมล" })
    .refine((email) => {
      const emailRegex = /^[a-zA-Z0-9\u0E00-\u0E7F._-]+@[a-zA-Z0-9\u0E00-\u0E7F.-]+\.[a-zA-Z\u0E00-\u0E7F]{2,}$/;
      return emailRegex.test(email);
    }, { message: "กรุณากรอกที่อยู่อีเมลที่ถูกต้อง (รองรับโดเมนไทย)" }),
});

interface EmailFormProps {
  onSuccess: (email: string) => void;
}

export default function EmailForm({ onSuccess }: EmailFormProps) {
  const { toast } = useToast();
  const { sendOTP } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "admin@โคจร.ไทย",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await sendOTP(values.email);
      onSuccess(values.email);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "ไม่สามารถส่ง OTP ได้",
        description: error instanceof Error ? error.message : "กรุณาลองใหม่อีกครั้ง",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm md:text-base">ที่อยู่อีเมล</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="h-11 sm:h-10 md:h-12 text-base md:text-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full h-11 sm:h-10 md:h-12 text-base sm:text-sm md:text-lg font-semibold" disabled={isLoading}>
          {isLoading ? "กำลังส่ง OTP..." : "ส่ง OTP"}
        </Button>
      </form>
    </Form>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/auth-provider";

const otpSchema = z.object({
  otp: z.string().min(6, { message: "รหัส OTP ต้องมี 6 หลัก" }).max(6, { message: "รหัส OTP ต้องมี 6 หลัก" }),
});

interface OtpFormProps {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

export default function OtpForm({ email, onSuccess, onBack }: OtpFormProps) {
  const { toast } = useToast();
  const { verifyOTP } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof otpSchema>) {
    setIsLoading(true);
    try {
      await verifyOTP(email, values.otp);
      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "รหัส OTP ไม่ถูกต้อง",
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
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm md:text-base">รหัส OTP 6 หลัก</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  className="justify-center scale-90 md:scale-100"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground text-center">
                กรอกตัวเลข 6 หลักที่ท่านได้รับทางอีเมล
              </p>
            </FormItem>
          )}
        />
        <div className="space-y-3 md:space-y-4">
          <Button type="submit" className="w-full h-11 sm:h-10 md:h-12 text-base sm:text-sm md:text-lg font-semibold" disabled={isLoading}>
            {isLoading ? "กำลังตรวจสอบ..." : "ตรวจสอบ OTP"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 sm:h-10 md:h-12 text-base sm:text-sm md:text-lg"
            onClick={onBack}
            disabled={isLoading}
          >
            กลับไปกรอกอีเมล
          </Button>
        </div>
      </form>
    </Form>
  );
}

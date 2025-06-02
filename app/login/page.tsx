"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/auth-provider";

const formSchema = z.object({
  email: z.string()
    .min(1, { message: "กรุณากรอกที่อยู่อีเมล" })
    .refine((email) => {
      // Support both English and Thai characters in email
      const emailRegex = /^[a-zA-Z0-9\u0E00-\u0E7F._-]+@[a-zA-Z0-9\u0E00-\u0E7F.-]+\.[a-zA-Z\u0E00-\u0E7F]{2,}$/;
      return emailRegex.test(email);
    }, { message: "กรุณากรอกที่อยู่อีเมลที่ถูกต้อง (รองรับโดเมนไทย)" }),
});

const otpSchema = z.object({
  otp: z.string().min(6, { message: "รหัส OTP ต้องมี 6 หลัก" }).max(6, { message: "รหัส OTP ต้องมี 6 หลัก" }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { sendOTP, verifyOTP } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });
  async function onSubmitEmail(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await sendOTP(values.email);
      setEmail(values.email);
      setStep('otp');
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

  async function onSubmitOTP(values: z.infer<typeof otpSchema>) {
    setIsLoading(true);
    try {
      await verifyOTP(email, values.otp);
      toast({
        title: "ยินดีต้อนรับกลับมา!",
        description: "คุณเข้าสู่ระบบสำเร็จแล้ว",
      });
      router.push("/");
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
    <div className="flex items-center justify-center min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <Card className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
        <CardHeader className="space-y-1 text-center sm:text-left px-4 py-4 md:px-6 md:py-6">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            {step === 'email' ? 'ยินดีต้อนรับกลับมา' : 'กรอกรหัส OTP'}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg">
            {step === 'email'
              ? 'กรอกที่อยู่อีเมลของคุณเพื่อรับรหัส OTP'
              : `เราได้ส่งรหัสยืนยันไปที่ ${email}`
            }
          </CardDescription>        </CardHeader>
        <CardContent className="px-4 py-4 md:px-6 md:py-6">
          {step === 'email' ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitEmail)} className="space-y-4 md:space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm md:text-base">ที่อยู่อีเมล</FormLabel>
                      <FormControl>
                        <Input
                          type="text" // เปลี่ยนจาก email เป็น text เพื่อรองรับอีเมลภาษาไทย
                          placeholder="your@email.com"
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
          ) : (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onSubmitOTP)} className="space-y-4 md:space-y-6">
                <FormField
                  control={otpForm.control}
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
              />                <div className="space-y-3 md:space-y-4">
                  <Button type="submit" className="w-full h-11 sm:h-10 md:h-12 text-base sm:text-sm md:text-lg font-semibold" disabled={isLoading}>
                    {isLoading ? "กำลังตรวจสอบ..." : "ตรวจสอบ OTP"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11 sm:h-10 md:h-12 text-base sm:text-sm md:text-lg"
                    onClick={() => {
                      setStep('email');
                      setEmail('');
                      otpForm.reset();
                    }}
                    disabled={isLoading}
                  >
                    กลับไปกรอกอีเมล
                  </Button>
                </div>
              </form>
            </Form>
          )}        </CardContent>
        <CardFooter className="flex flex-col space-y-4 px-4 py-4 md:px-6 md:py-6">
          <div className="text-sm md:text-base text-center text-muted-foreground">
            ยังไม่มีบัญชี?{" "}
            <Link href="/register" className="text-primary underline underline-offset-2 font-medium hover:text-primary/80 transition-colors">
              สมัครสมาชิก
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
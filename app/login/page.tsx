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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/auth-provider";

const formSchema = z.object({
  emailOrUsername: z.string().min(1, { message: "กรุณากรอกอีเมลหรือชื่อผู้ใช้" }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrUsername: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (!otpSent) {
        // Send OTP
        await login(values.emailOrUsername, true);
        setOtpSent(true);
        toast({
          title: "ส่งรหัส OTP แล้ว",
          description: "กรุณาตรวจสอบอีเมลของคุณเพื่อรับรหัส OTP",
        });
      } else {
        // Verify OTP and complete login
        await login(values.emailOrUsername, false, otp);
        toast({
          title: "ยินดีต้อนรับกลับ!",
          description: "คุณได้เข้าสู่ระบบสำเร็จแล้ว",
        });
        router.push("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "เข้าสู่ระบบล้มเหลว",
        description: otpSent ? "รหัส OTP ไม่ถูกต้อง" : "ไม่พบอีเมลหรือชื่อผู้ใช้นี้ในระบบ",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-3 sm:p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center sm:text-left">
          <CardTitle className="text-xl sm:text-2xl font-bold">ยินดีต้อนรับกลับ</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            กรอกอีเมลหรือชื่อผู้ใช้เพื่อเข้าสู่ระบบ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="emailOrUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>อีเมลหรือชื่อผู้ใช้</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com หรือชื่อผู้ใช้" className="h-11 sm:h-10" {...field} disabled={otpSent} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {otpSent && (
                <FormItem>
                  <FormLabel>รหัส OTP</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="กรอกรหัส OTP ที่ได้รับจากอีเมล" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="h-11 sm:h-10"
                    />
                  </FormControl>
                </FormItem>
              )}
              <Button type="submit" className="w-full h-11 sm:h-10 text-base sm:text-sm" disabled={isLoading}>
                {isLoading 
                  ? (otpSent ? "กำลังตรวจสอบ..." : "กำลังส่งรหัส OTP...") 
                  : (otpSent ? "ยืนยันรหัส OTP" : "ส่งรหัส OTP")}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            ยังไม่มีบัญชี?{" "}
            <Link href="/register" className="text-primary underline underline-offset-2 font-medium">
              ลงทะเบียน
            </Link>
          </div>
          
          {/* Demo credentials */}
          <div className="bg-muted/50 p-3 rounded-lg border text-sm">
            <div className="text-center text-muted-foreground mb-2 font-medium">บัญชีทดลอง:</div>
            <div className="space-y-1 text-xs">
              <div><strong>อีเมล:</strong> demo@example.com</div>
              <div><strong>ชื่อผู้ใช้:</strong> gml</div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
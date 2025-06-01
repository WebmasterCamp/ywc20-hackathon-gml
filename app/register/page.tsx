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
  username: z
    .string()
    .min(3, { message: "ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร" })
    .max(20, { message: "ชื่อผู้ใช้ต้องไม่เกิน 20 ตัวอักษร" }),
  email: z.string().email({ message: "กรุณากรอกอีเมลที่ถูกต้อง" }),
});

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (!otpSent) {
        // Send OTP
        await register(values.email, values.username, true);
        setOtpSent(true);
        toast({
          title: "ส่งรหัส OTP แล้ว",
          description: "กรุณาตรวจสอบอีเมลของคุณเพื่อรับรหัส OTP",
        });
      } else {
        // Verify OTP and complete registration
        await register(values.email, values.username, false, otp);
        toast({
          title: "สร้างบัญชีสำเร็จ!",
          description: "คุณได้ลงทะเบียนเรียบร้อยแล้ว",
        });
        router.push("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "การลงทะเบียนล้มเหลว",
        description: otpSent ? "รหัส OTP ไม่ถูกต้อง" : "อีเมลนี้อาจถูกใช้งานแล้ว",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">สร้างบัญชี</CardTitle>
          <CardDescription>
            กรอกข้อมูลของคุณเพื่อสร้างบัญชี Bar Hub
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อผู้ใช้</FormLabel>
                    <FormControl>
                      <Input placeholder="ชื่อผู้ใช้ของคุณ" {...field} disabled={otpSent} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>อีเมล</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} disabled={otpSent} />
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
                    />
                  </FormControl>
                </FormItem>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading 
                  ? (otpSent ? "กำลังตรวจสอบ..." : "กำลังส่งรหัส OTP...") 
                  : (otpSent ? "ยืนยันรหัส OTP" : "ส่งรหัส OTP")}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            มีบัญชีอยู่แล้ว?{" "}
            <Link href="/login" className="text-primary underline underline-offset-2">
              เข้าสู่ระบบ
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
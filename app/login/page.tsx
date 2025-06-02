"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import EmailForm from "@/components/auth/email-form";
import OtpForm from "@/components/auth/otp-form";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');

  const handleEmailSuccess = (email: string) => {
    setEmail(email);
    setStep('otp');
  };

  const handleOtpSuccess = () => {
    toast({
      title: "ยินดีต้อนรับกลับมา!",
      description: "คุณเข้าสู่ระบบสำเร็จแล้ว",
    });
    router.push("/");
  };

  const handleBack = () => {
    setStep('email');
    setEmail('');
  };

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
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-4 md:px-6 md:py-6">
          {step === 'email' ? (
            <EmailForm onSuccess={handleEmailSuccess} />
          ) : (
            <OtpForm email={email} onSuccess={handleOtpSuccess} onBack={handleBack} />
          )}
        </CardContent>
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
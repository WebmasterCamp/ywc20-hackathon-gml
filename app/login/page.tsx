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
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const otpSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 digits" }).max(6, { message: "OTP must be 6 digits" }),
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
        title: "Failed to send OTP",
        description: error instanceof Error ? error.message : "Please try again.",
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
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-3 sm:p-4">
      <Card className="w-full max-w-md">        <CardHeader className="space-y-1 text-center sm:text-left">
          <CardTitle className="text-xl sm:text-2xl font-bold">
            {step === 'email' ? 'Welcome Back' : 'Enter OTP'}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {step === 'email' 
              ? 'Enter your email address to receive an OTP'
              : `We've sent a verification code to ${email}`
            }
          </CardDescription>
        </CardHeader>        <CardContent>
          {step === 'email' ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitEmail)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="your@email.com" 
                          className="h-11 sm:h-10" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-11 sm:h-10 text-base sm:text-sm" disabled={isLoading}>
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onSubmitOTP)} className="space-y-4">                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>6-Digit OTP</FormLabel>
                      <FormControl>
                        <InputOTP 
                          maxLength={6} 
                          value={field.value}
                          onChange={field.onChange}
                          className="justify-center"
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
                        For demo purposes, enter any 6-digit number
                      </p>
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <Button type="submit" className="w-full h-11 sm:h-10 text-base sm:text-sm" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify OTP"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-11 sm:h-10 text-base sm:text-sm" 
                    onClick={() => {
                      setStep('email');
                      setEmail('');
                      otpForm.reset();
                    }}
                    disabled={isLoading}
                  >
                    Back to Email
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary underline underline-offset-2 font-medium">
              Register
            </Link>
          </div>          
          {/* Demo credentials */}
          {step === 'email' && (
            <div className="bg-muted/50 p-3 rounded-lg border text-sm">
              <div className="text-center text-muted-foreground mb-2 font-medium">Demo Email Addresses:</div>
              <div className="space-y-1 text-xs">
                <div><strong>Admin:</strong> admin@barhub.com</div>
                <div><strong>User:</strong> alex@example.com</div>
                <div><strong>User:</strong> sarah@example.com</div>
                <div className="text-center text-muted-foreground mt-2 italic">
                  Use any 6-digit number as OTP
                </div>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
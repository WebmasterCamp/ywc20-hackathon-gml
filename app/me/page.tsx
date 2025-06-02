"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/layout/page-header";
import { useAuth } from "@/components/auth/auth-provider";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be less than 20 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  bio: z.string().max(160, { message: "Bio must be less than 160 characters" }).optional(),
  avatarUrl: z.string().url({ message: "Please enter a valid URL" }).optional(),
});

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, updateProfile, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      bio: user?.bio || "",
      avatarUrl: user?.avatar || "",
    },
  });

  if (!user) {
    router.push("/login");
    return null;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await updateProfile(values);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "There was an error updating your profile.",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="container px-3 py-3 sm:px-4 sm:py-4 md:py-6 lg:py-8 max-w-3xl xl:max-w-5xl mx-auto">
      <PageHeader
        title="Profile"
        description="Manage your account settings"
      />
      
      <Card className="shadow-lg">
        <CardHeader className="space-y-1 px-4 py-4 md:px-6 md:py-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
            <Avatar className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback className="text-lg md:text-xl lg:text-2xl">{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-xl md:text-2xl lg:text-3xl">{user.username}</CardTitle>
              <CardDescription className="text-sm md:text-base">Member since {new Date(user.joinDate).toLocaleDateString()}</CardDescription>
            </div>
          </div>
        </CardHeader>        <CardContent className="px-4 py-4 md:px-6 md:py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm md:text-base">Username</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-10 md:h-12" />
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
                      <FormLabel className="text-sm md:text-base">Email</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-10 md:h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-base">Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little about yourself"
                        className="resize-none min-h-20 md:min-h-24"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatarUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-base">Avatar URL</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} className="h-10 md:h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="mt-4 md:mt-6 h-10 md:h-12 text-base md:text-lg font-semibold w-full sm:w-auto">
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 md:pt-6 border-t">
          <Button variant="outline" onClick={() => router.push("/")} className="h-10 md:h-12 w-full sm:w-auto text-sm md:text-base">
            Cancel
          </Button>
          <Button variant="destructive" onClick={logout} className="h-10 md:h-12 w-full sm:w-auto text-sm md:text-base">
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
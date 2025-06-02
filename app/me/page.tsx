"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/layout/page-header";
import { useAuth } from "@/components/auth/auth-provider";
import ProfileForm, { profileFormSchema } from "@/components/forms/profile-form";
import * as z from "zod";

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, updateProfile, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    router.push("/login");
    return null;
  }

  async function onSubmit(values: z.infer<typeof profileFormSchema>, profileImage: string | null) {
    setIsLoading(true);
    try {
      await updateProfile({
        ...values,
        profileImage,
      } as any);
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
          <CardTitle className="text-xl md:text-2xl lg:text-3xl">Edit Profile</CardTitle>
          <CardDescription className="text-sm md:text-base">Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-4 md:px-6 md:py-6">
          <ProfileForm
            defaultValues={{
              username: user?.username || "",
              email: user?.email || "",
              name: (user as any)?.name || "",
              age: (user as any)?.age || undefined,
              gender: (user as any)?.gender || undefined,
              career: (user as any)?.career || "",
              description: (user as any)?.description || "",
            }}
            defaultImage={(user as any)?.profileImage || null}
            onSubmit={onSubmit}
            isLoading={isLoading}
            submitText="Save Changes"
          />
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
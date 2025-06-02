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

// Admin mockup data function
function getAdminMockupData() {
  return {
    username: "admin",
    email: "admin@โคจร.ไทย",
    name: "System Administrator",
    age: 25,
    gender: "male" as const,
    career: "Full Stack Developer & System Admin",
    description: "ผู้ดูแลระบบหลักของแพลตฟอร์ม โคจร | Cojon พร้อมช่วยเหลือผู้ใช้ทุกคนในการหาเพื่อนดื่มและสถานบันเทิง มีประสบการณ์ในการพัฒนาแอปพลิเคชันมากกว่า 5 ปี ชอบไปผับและบาร์ต่างๆ เพื่อทดสอบฟีเจอร์ของแอปและพบปะผู้ใช้งาน",
    profileImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, updateProfile, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    router.push("/login");
    return null;
  }

  // Use admin mockup data if user is admin, otherwise use real user data
  const isAdmin = user?.id === "admin";
  const mockupData = isAdmin
    ? getAdminMockupData()
    : {
        username: user?.username || "",
        email: user?.email || "",
        name: (user as any)?.name || "",
        age: (user as any)?.age || undefined,
        gender: (user as any)?.gender || undefined,
        career: (user as any)?.career || "",
        description: (user as any)?.description || "",
        profileImage: (user as any)?.profileImage || null
      };

  async function onSubmit(values: z.infer<typeof profileFormSchema>, profileImage: string | null) {
    setIsLoading(true);
    try {
      await updateProfile({
        ...values,
        profileImage,
      } as any);
      toast({
        title: "Profile updated",
        description: user?.id === "admin"
          ? "Admin profile has been updated successfully."
          : "Your profile has been updated successfully.",
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
        title={isAdmin ? "Admin Profile" : "Profile"}
        description={isAdmin ? "Manage administrator account settings" : "Manage your account settings"}
      />
      <Card className="shadow-lg">
        <CardHeader className="space-y-1 px-4 py-4 md:px-6 md:py-6">
          <CardTitle className="text-xl md:text-2xl lg:text-3xl">
            {isAdmin ? "Edit Admin Profile" : "Edit Profile"}
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            {isAdmin
              ? "Update administrator information and system settings"
              : "Update your personal information"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-4 md:px-6 md:py-6">
          <ProfileForm
            defaultValues={mockupData}
            defaultImage={mockupData.profileImage}
            onSubmit={onSubmit}
            isLoading={isLoading}
            submitText={isAdmin ? "Update Admin Profile" : "Save Changes"}
          />
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 md:pt-6 border-t">
          <Button variant="outline" onClick={() => router.push("/")} className="h-10 md:h-12 w-full sm:w-auto text-sm md:text-base">
            Cancel
          </Button>
          <Button variant="destructive" onClick={logout} className="h-10 md:h-12 w-full sm:w-auto text-sm md:text-base">
            {isAdmin ? "Admin Logout" : "Logout"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
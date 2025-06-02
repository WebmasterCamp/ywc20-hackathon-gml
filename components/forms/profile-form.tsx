"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Camera } from "lucide-react";

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be less than 20 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  name: z.string().min(1, { message: "Name is required" }),
  age: z.number().min(18, { message: "Must be at least 18 years old" }).max(100, { message: "Please enter a valid age" }),
  gender: z.enum(["male", "female"], { message: "Please select a gender" }),
  career: z.string().min(1, { message: "Career is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
});

interface ProfileFormProps {
  defaultValues?: Partial<z.infer<typeof profileFormSchema>>;
  defaultImage?: string | null;
  onSubmit: (values: z.infer<typeof profileFormSchema>, profileImage: string | null) => Promise<void>;
  submitText?: string;
  isLoading?: boolean;
}

// Helper for rendering text input fields
function RenderInputField({ control, name, label, type = "text" }: { control: any, name: any, label: string, type?: string }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: any) => (
        <FormItem>
          <FormLabel className="text-sm md:text-base">{label}</FormLabel>
          <FormControl>
            <Input {...field} type={type} className="h-10 md:h-12" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default function ProfileForm({
  defaultValues = {},
  defaultImage = null,
  onSubmit,
  submitText = "Save Changes",
  isLoading = false
}: ProfileFormProps) {
  const [profileImage, setProfileImage] = useState<string | null>(defaultImage);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      age: undefined,
      gender: undefined,
      career: "",
      description: "",
      ...defaultValues,
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    await onSubmit(values, profileImage);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:space-y-6">
        {/* Profile Picture Upload */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 cursor-pointer">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <Camera className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <RenderInputField control={form.control} name="name" label="Full Name" />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm md:text-base">Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                    className="h-10 md:h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm md:text-base">Gender</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-10 md:h-12">
                      <SelectValue placeholder="Please Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <RenderInputField control={form.control} name="career" label="Career" />
          <RenderInputField control={form.control} name="username" label="Username" />
          <RenderInputField control={form.control} name="email" label="Email" type="email" />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm md:text-base">Description</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none min-h-20 md:min-h-24"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="mt-4 md:mt-6 h-10 md:h-12 text-base md:text-lg font-semibold w-full sm:w-auto">
          {isLoading ? "Saving..." : submitText}
        </Button>
      </form>
    </Form>
  );
}

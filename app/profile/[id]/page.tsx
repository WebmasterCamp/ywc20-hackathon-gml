import { MOCK_USERS } from "@/lib/constants";
import UserProfileClient from "./UserProfileClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return MOCK_USERS.map((user) => ({ id: user.id }));
}

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = MOCK_USERS.find((u) => u.id === id);
  if (!user) return notFound();
  return <UserProfileClient user={user} />;
}
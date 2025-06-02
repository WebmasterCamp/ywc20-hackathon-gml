import { MOCK_USERS } from "@/lib/constants";
import UserProfileClient from "./UserProfileClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return MOCK_USERS.map((user) => ({ id: user.id }));
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const user = MOCK_USERS.find((u) => u.id === params.id);
  if (!user) return notFound();
  return <UserProfileClient user={user} />;
} 
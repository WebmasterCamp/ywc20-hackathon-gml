import { MOCK_USERS } from "@/lib/constants";
import { notFound } from "next/navigation";
import PersonalChatClient from "./PersonalChatClient";

export async function generateStaticParams() {
    return MOCK_USERS.map((user) => ({
        id: user.id,
    }));
}

export default async function PersonalChatPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = MOCK_USERS.find((u) => u.id === id);

    if (!user) {
        notFound();
    }

    return <PersonalChatClient targetUser={user} />;
}

import { useChatStore } from "@/stores/useChatStore";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function ChatHeader() {
    const { selectedUserId, onlineUsers} = useChatStore()

    if (!selectedUserId) {
        return null; // or you can return a placeholder
    }

    return (
        <div className="p-4 border-b border-zinc-800">
            <div className="flex items-center justify-start gap-4">
                <Avatar className="avatarWidth">
                    <AvatarImage src={selectedUserId.imageUrl} className="userSize rounded-full" width={100} height={100}/>
                    <AvatarFallback>{selectedUserId.fullName[0]}</AvatarFallback>
                </Avatar>

                <div>
                    <h2 className="font-medium">{selectedUserId.fullName}</h2>
                    <p className="text-sm text-zinc-400">
                        {onlineUsers.has(selectedUserId.clerkId) ? "Online" : "Offline"}
                    </p>
                </div>
            </div>
        </div>
    )
}
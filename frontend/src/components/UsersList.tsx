'use client'

import { useChatStore } from "@/stores/useChatStore"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import UsersListSkeleton from "./skeleton/UsersListSkeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

export default function UsersList() {

    const {users, selectedUserId, isLoading, currentUserId, setSelectedUserId, onlineUsers} = useChatStore()
   

    const otherUsers = users.filter(
        (user) => user.clerkId !== currentUserId
    );    


    return (
        <div className="border border-zinc-800">
            <div className="flex flex-col h-full">
                <ScrollArea className="h-[calc(100vh-211px)]">
                    <div className="space-y-2">
                        {isLoading ? (
                            <UsersListSkeleton/>
                        ) : (
							otherUsers.map((user) => (
								<div
									key={user._id}
									onClick={() => setSelectedUserId(user)}
									className={`flex items-center justify-start lg:justify-start gap-3 p-3 
										rounded-lg cursor-pointer transition-colors w-auto
                    ${selectedUserId?.clerkId === user.clerkId ? "bg-zinc-800" : "hover:bg-zinc-800/50"}`}
								>
									<div className='relative'>
										<Avatar className='size-8 md:size-12 userSize rounded-full'>
											<AvatarImage src={user.imageUrl} width={80} height={80}/>
											<AvatarFallback>{user.fullName[0]}</AvatarFallback>
										</Avatar>
										{/* online indicator */}
										<div
											className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900
                        ${onlineUsers.has(user.clerkId) ? "bg-green-500" : "bg-zinc-500"}`}
										/>
									</div>

									<div className='flex-1 min-w-0 lg:block hidden'>
										<span className='font-medium truncate'>{user.fullName}</span>
									</div>
								</div>
							))
						)}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}
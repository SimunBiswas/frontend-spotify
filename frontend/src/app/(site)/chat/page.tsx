'use client'

import TopBar from '@/components/TopBar'
import UsersList from '@/components/UsersList'
import { useChatStore } from '@/stores/useChatStore'
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import Image from 'next/image';
import ChatHeader from '@/components/ChatHeader'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '@radix-ui/react-avatar';
import MessageInput from '@/components/ui/MessageInput'

const NoConversationPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-6">
    <Image src="/spotify.png" alt='spotify' className="size-16 animate-bounce" width={100} height={100}/>
    <div className="text-center">
      <h3 className="text-zinc-300 text-lg font-medium mb-1">No conversation selected</h3>
      <p className="text-zinc-500 text-sm">Choose a friend to start chatting</p>
    </div>
  </div>
)

export default function Home() {
  const {user} = useUser()
  const {messages, selectedUserId, fetchUsers, fetchMessages } = useChatStore()


  useEffect(() => {
    if(user) fetchUsers()
  }, [user, fetchUsers])

  useEffect(() => {
    if(selectedUserId) fetchMessages(selectedUserId.clerkId)
  }, [selectedUserId, fetchMessages])

  const formatTime = (date: string) => {
	return new Date(date).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};

  return (
    <main className='h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden'>
      <TopBar/>

      <div className='grid grid-cols-[80px_1fr] lg:grid-cols-[300px_1fr] h-[calc(100vh-540px)]'>
        <UsersList/>

        {/* container for chat messegages */}
        <div className="flex flex-col h-full w-full">
          {selectedUserId ? (
            <>
            <ChatHeader/>

            <ScrollArea >
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message._id} className={`flex items-start gap-3 ${message.senderId === user?.id ? "flex-row-reverse" : ""}`}>
                    <Avatar className='size-8'>
                        <AvatarImage 
                        className='rounded-full'
                        src={
                          message.senderId === user?.id
                          ? user.imageUrl
                          : selectedUserId.imageUrl
                        }/>
                    </Avatar>
                    
                    <div className={`rounded-lg p-3 max-w-[70%]
                      ${message.senderId ===  user?.id ? "bg-green-300" : "bg-zinc-800"}`}>
                        <p className='text-sm'>{message.content}</p>
                        <span className='text-sm text-zinc-300 mt-1 block'>{formatTime(message.createdAt)}</span>
                      </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
                 <MessageInput/>
           
            </>
          ) : (
            NoConversationPlaceholder()
          )}
        </div>
      </div>
    </main>
  )
}




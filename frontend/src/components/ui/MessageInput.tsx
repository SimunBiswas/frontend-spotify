"use client"

import { useChatStore } from "@/stores/useChatStore"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { Input } from "./input"
import { Button } from "./button"
import { Send } from "lucide-react"

const MessageInput = () => {
    const [newMessage, setNewMessage] = useState("")
    const {user} = useUser()
    const {selectedUserId, sendMessage} = useChatStore()

    const handleSend = () => {
        if(!selectedUserId || !user || !newMessage) return;
        sendMessage(selectedUserId.clerkId, user.id, newMessage.trim())
        setNewMessage("") // Clear the input after sending
    }
  return (
    <div className="p-4 mt-auto border-t border-zinc-800">
        <div className="flex gap-2">

            <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="bg-zinc-800 border-none"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <Button size={"icon"} onClick={handleSend} disabled={!newMessage.trim()}>
                <Send className="size-4"/>
            </Button>
        </div>
    </div>
  )
}

export default MessageInput

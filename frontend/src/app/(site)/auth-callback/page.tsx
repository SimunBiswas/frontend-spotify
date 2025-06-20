'use client'

import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from "react";

export default function Home() {
    const {isLoaded, user} = useUser()
    const syncAttempted = useRef(false)
    const router = useRouter()

        useEffect(() => {
            const syncUser = async () => {

                if(!isLoaded || !user || syncAttempted.current) return
                try{
                    syncAttempted.current = true

                    await axiosInstance.post('/auth/callback', {
                        id: user.id,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        imageUrl : user.imageUrl,
                    })
                }
                catch(error){
                    console.log("Error in auth callback", error)
                }finally{
                    router.push('/')
                }
            }

            syncUser()

        }, [isLoaded, user, router])

  return (

    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 animate-spin text-emerald-400" />
          <h3 className="text-zinc-400 text-xl font-bold">Logging you in...</h3>
          <p className="text-zinc-400 text-sm">Redirecting</p>
        </CardContent>
      </Card>
    </div>
  );
}

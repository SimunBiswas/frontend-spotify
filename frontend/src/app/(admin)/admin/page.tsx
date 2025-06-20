'use client'

import Header from "../components/Header";
import DashboardStats from "../components/DashboardStats";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Album, Music } from "lucide-react";
import SongsTabContent from "../components/SongsTabContent";
import AlbumsTabContent from "../components/AlbumsTabContent";
import { useMusicStore } from "@/stores/useMusicStores";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

const Page = () => {

  const {isAdmin , isLoading} = useAuthStore();

  const {fetchAlbums, fetchSongs, fetchStats} = useMusicStore()

  useEffect(() => {
    fetchAlbums()
    fetchSongs()
    fetchStats()
  },[fetchAlbums, fetchSongs, fetchStats])


  if(!isAdmin && !isLoading) return <div>Unauthorized</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
      <Header/>

      <DashboardStats/>

      {/* <Tabs/> */}
      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1.5 bg-zinc-800/50 w-fit flex rounded-md">
          <TabsTrigger value="songs" className="flex data-[state=active]:bg-zinc-700 p-2 rounded-md items-center">
            <Music className='mr-2 size-4'/>
            Songs
          </TabsTrigger>
          <TabsTrigger value="albums" className="flex rounded-md p-2 data-[state=active]:bg-zinc-700 items-center">
            <Album className='mr-2 size-4'/>
            Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
          <SongsTabContent/>
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsTabContent/>
        </TabsContent>
        
      </Tabs>


    </div>
  )
}

export default Page

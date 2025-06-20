
'use client'

import { FeaturedSection } from "@/components/FeaturedSection";
import SectionGrid from "@/components/SectionGrid";
import TopBar from "@/components/TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStores";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect } from "react";

export default function Home() {

  const {fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, isLoading, madeForYouSongs, trendingSongs, featuredSongs} = useMusicStore()

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs()
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

useEffect(() => {
  if(madeForYouSongs.length > 0 && trendingSongs.length > 0 && featuredSongs.length) {
    const allSongs = [...madeForYouSongs, ...trendingSongs, ...featuredSongs];
    initializeQueue(allSongs);
  }
}, [madeForYouSongs, trendingSongs, featuredSongs, initializeQueue]);


  return (
   <div className="rounded-md h-full bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-y-auto">
      <TopBar />
      <ScrollArea>
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Good afternoon
          </h1>
          <FeaturedSection/>

        <div className="space-y-8">
          <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading}/>
          <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading}/>
        </div>

        </div>

      </ScrollArea>
   </div>
  );
}

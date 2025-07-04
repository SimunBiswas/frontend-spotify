'use client'

import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/stores/useMusicStores";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Clock, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const formatDuration = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export default function Home() {

  const { albumId } = useParams() as { albumId: string };  

  
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore() 
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore()

  const imageURL = currentAlbum?.imageUrl

  useEffect(() => {

     if(albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);



  if (isLoading || !currentAlbum?.imageUrl || !currentAlbum?.songs) return null;

  const handlePlayAlbum = () => {

    if(!currentAlbum) return;

    const isCurrentAlbumPlaying = currentSong && currentAlbum?.songs.some(song => song._id === currentSong._id);

    if(isCurrentAlbumPlaying){
      // toggle play if the current album is already playing
      togglePlay();
    }else{
      playAlbum(currentAlbum.songs, 0);
    }

  }

  const handlePlaySong = (index : number) => {

    if(!currentAlbum?.songs || currentAlbum.songs.length === 0) return;

    // if the song is already playing, toggle play
    // if(currentSong?._id === currentAlbum.songs[index]._id){
    //   togglePlay();
    //   return;
    // }

    // play the album from the given index
    playAlbum(currentAlbum?.songs, index);
  }


  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md overflow-hidden">
        {/* Main Content */}
        <div className="relative h-full">
          {/* bg-gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zic-900/80 to-zinc-900 pointer-events-none" aria-hidden='true'/>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              
              <Image src={imageURL || './albums/1.jpg'} alt={currentAlbum?.title} width={240} height={240}
              className='w-[240px] h-[240px] shadow-xl rounded'/>
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">
                  Album
                </p>

                <h1 className="text-7xl font-bold my-4">{currentAlbum?.title}</h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span> • {currentAlbum?.songs.length} Songs</span>
                  <span> • {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* play button */}
            <div className="px-6 pb-4 items-center gap-6">
              <Button
              onClick={ handlePlayAlbum }
              size='icon'
              className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all cursor-pointer">
                {isPlaying && currentSong && currentAlbum?.songs.some(song => song._id === currentSong._id) ? (
                  <Pause className="h-7 w-7 text-black" />
                ) : (
                  <Play className="h-7 w-7 text-black"/>
                )}
              </Button>
            </div>
            {/* Table section */}
            <div className="bg-black/20 backdrop-blur-sm">
            {/* table-header */}
            <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
              <div>#</div>
              <div>Title</div>
              <div>Released Date</div>
              <div>
                <Clock className="h-4 w-4"/>
              </div>
            </div>

            {/* Song List */}

            <div className="px-5">
              <div className="space-y-2 py-4">
                {currentAlbum.songs && currentAlbum?.songs.map((song, index) => {
                  const currentSongId = currentSong?._id === song._id;

                  return (
                   <div 
                      key={song._id}
                      className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 py-2 text-sm text-zinc-400 border-b border-white/5 rounded-md group cursor-pointer`}
                      onClick={() => handlePlaySong(index)}
                      >
                    <div className="flex items-center justify-center">
                      {currentSongId && isPlaying ? (
                        <div className="size-4 text-green-500">♫</div>
                      ) : (
                        <span className="group-hover:hidden">{index + 1}</span>
                      )}
                      {!currentSongId && (
                        <Play className="h-4 w-4 hidden group-hover:block"/>
                      )}
                    </div>

                    <div className="flex item-center gap-3">
                      <Image src={song.imageUrl} alt={song.title} className="size-10" width={100} height={100} />

                      <div>
                        <div className="font-medium text-white">
                          {song.title}
                        </div>
                        <div>{song.artist}</div>
                      </div>

                      

                    </div>
                    <div className="flex items-center">{song.createdAt.split('T')[0]}</div>
                    <div className="flex items-center">{formatDuration(song.duration)}</div>

                   </div>
                  )
                })}
              </div>
            </div>

            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}   

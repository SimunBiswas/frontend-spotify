import { useMusicStore } from "@/stores/useMusicStores"
import FeaturedGridSkeleton from "./skeleton/FeaturedGridSkeleton"
import Image from "next/image"
import PlayButton from "./PlayButton"

export function FeaturedSection() {

    const {isLoading, featuredSongs, error} = useMusicStore()
    if(isLoading) return <div><FeaturedGridSkeleton/></div>

    if(error) return <div className="text-red-500 text-lg mb-4">{error}</div>
    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {featuredSongs.map((song) => (
                // {console.log(song)}
                <div key={song._id} 
                className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors group cursor-pointer relative">
                    <Image src={song.imageUrl || "./albums/1.jpg"} alt={song.title} className="w-20 lg:w-16 h-20 lg:h-16 object-cover flex-shrink-0" width={100} height={100}/>
                    <div className="flex-1 p-4">
                       <p className="font-medium truncate">{song.title}</p>
                       <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
                    </div>
                    <PlayButton song={song}/>
                </div>

              ))}
        </div>
    )
}
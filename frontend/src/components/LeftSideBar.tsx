
import { cn } from '@/lib/utils';
import { HomeIcon, Library, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { SignedIn } from '@clerk/nextjs';
import PlaylistSkeleton from './skeleton/PlaylistSkeleton';
import { useMusicStore } from '@/stores/useMusicStores';
import { useEffect } from 'react';
import Image from 'next/image';
import { ScrollArea } from './ui/scroll-area';


export const LeftSideBar = () => {
    // const Isloading = false;
    // const Isloading = true;
    const { albums, isLoading, fetchAlbums} = useMusicStore()


    useEffect(() => {
        fetchAlbums();
    }, [fetchAlbums]);

  return (
    <div className="h-full flex flex-col gap-1 overflow-y-auto">

        {/* Navigation Menu */}
        <div className="rounded-lg bg-zinc-900 p-4">
            <div className="space y-2">
                <Link href="/" className={cn(buttonVariants(
                    {
                        variant: "ghost",
                        className: "w-full justify-start text-white hover:bg-zinc-800",
                    },
                  
                ))}>
                    <HomeIcon className="mr-2 size-5" />
                    <span className='hidden md:inline'>Home</span>
                </Link>

                <SignedIn>
                    <Link href={"/chat"} className={cn(buttonVariants(
                        {
                            variant: "ghost",
                            className: "w-full justify-start text-white hover:bg-zinc-800",
                        },
                      
                    ))}>
                        <MessageCircle className="mr-2 size-5" />
                        <span className='hidden md:inline'>Messages</span>
                    </Link>
                </SignedIn>
            </div>

        </div>

        {/* Library Section */}

        <div className="flex-1 rounded-lg bg-zinc-900 p-4">
            <div className="flex items-center justify-between md-4">
                <div className=' flex items-center text-white p-4'>
                    <Library className='size-5 mr-2'/>
                    <span className='hidden md:inline'>Playlists</span>
                </div>
            </div>

            <ScrollArea className='h-[calc(100vh-300px)]'>
                <div className='space-y-2 p-3'>
                    {isLoading ? (
                        <PlaylistSkeleton />
                    ) : (
                        albums.map((album) => {
                            return (
                                <Link href={`/albums/${album._id}`} key={album._id} 
                                className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer ">
                                   <Image
                                        src={album.imageUrl}
                                        alt="Playlist-img"
                                        width={48}
                                        height={48}
                                        className="rounded-md flex-shrink-0 object-cover"
                                    />

                                    <div className='flex-1 min-w-0 hidden md:block'>
                                        <p className='font-medium truncate'>
                                            {album.title}
                                        </p>
                                        <p className='text-sm text-zinc-400 truncate'>
                                            Album • {album.artist}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })
                    ) }
                </div>
            </ScrollArea>
        </div>

        
      
    </div>
  )
}


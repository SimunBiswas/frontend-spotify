'use client'

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useMusicStore } from "@/stores/useMusicStores"
import { Calendar, Music, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

const AlbumTable = () => {

    const {albums, deleteAlbum, fetchAlbums} = useMusicStore();

    // console.log(isLoading)
    useEffect(() => {
        fetchAlbums();
    }, [fetchAlbums])


    return (
        <Table className="border-zinc-700/50">
            <TableHeader>
				<TableRow className='border-zinc-700/50 hover:bg-zinc-800/50'>
					<TableHead className='w-[50px]'></TableHead>
					<TableHead>Title</TableHead>
					<TableHead>Artist</TableHead>
					<TableHead>Release Year</TableHead>
					<TableHead>Songs</TableHead>
					<TableHead className='text-right'>Actions</TableHead>
				</TableRow>
			</TableHeader>

            <TableBody>
				{albums.map((album) => (
					<TableRow key={album._id} className='border-zinc-700/50 hover:bg-zinc-800/50'>
						<TableCell>
							<Image src={album.imageUrl} alt={album.title} className='w-10 h-10 rounded object-cover' width={100} height={100}/>
						</TableCell>
						<TableCell className='font-medium'>{album.title}</TableCell>
						<TableCell>{album.artist}</TableCell>
						<TableCell>
							<span className='inline-flex items-center gap-1 text-zinc-400'>
								<Calendar className='h-4 w-4' />
								{album.releaseYear}
							</span>
						</TableCell>
						<TableCell>
							<span className='inline-flex items-center gap-1 text-zinc-400'>
								<Music className='h-4 w-4' />
								{album.songs.length} songs
							</span>
						</TableCell>
						<TableCell className='text-right'>
							<div className='flex gap-2 justify-end'>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => deleteAlbum(album._id)}
									className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
								>
									<Trash2 className='h-4 w-4' />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
    </Table>
    )
    

  
}

export default AlbumTable;

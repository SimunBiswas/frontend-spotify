'use client'

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useMusicStore } from "@/stores/useMusicStores"
import { Calendar, Trash2 } from "lucide-react";
import Image from "next/image";

const SongsTable = () => {

    const {songs, isLoading, error, deleteSong} = useMusicStore();

    // console.log(isLoading)

    if(isLoading){
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-zinc-400">Loading Songs...</div>
            </div>
        )
    }

    if(error) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-red-400">{error}</div>
            </div>
        )
    }

    return (
        <Table className="border-zinc-700/50">
        <TableHeader className="border-zinc-700/50 hover:bg-zinc-800/50">
            <TableRow className="border-zinc-700/50">
                <TableHead className="hover:bg-zinc-800/50"></TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Released Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {songs.map((song) => (
                <TableRow key={song._id} className="border-zinc-700/50 hover:bg-zinc-800/50">
                    <TableCell>
                        <Image src={song.imageUrl} alt={song.title} width={100} height={100} className="size-10 rounded object-cover"/>
                    </TableCell>
                    <TableCell className="font-medium">{song.title}</TableCell>
                    <TableCell>{song.artist}</TableCell>
                    <TableCell className="inline-flex items-center gap-1 text-zinc-400 p-auto mt-2">
                            <div className="inline-flex items-center gap-2">
                                <Calendar/>{song.createdAt.split("T")[0]}
                            </div>
                    </TableCell>
                    <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                            <Button 
                            variant={'ghost'}
                            size={'sm'}
                            className="text-red-400 hover:texy-red-300 hover:bg-red-400/10"
                            onClick={() => deleteSong(song._id)}
                            >
                                <Trash2 className="size-4"/>
                            </Button>
                        </div>
                    </TableCell>
                    
                </TableRow>
            ))}
        </TableBody>
    </Table>
    )
    

  
}

export default SongsTable;

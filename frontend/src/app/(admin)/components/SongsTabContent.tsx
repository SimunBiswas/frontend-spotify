'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music } from 'lucide-react';
import SongsTable from "./SongsTable";
import AddSongDialog from "./AddSongDialog";

export default function SongsTabContent(){
  
  return (
    <Card className="border-zinc-700/50 bg-zinc-800/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Music className="size-5 text-emerald-500"/>
              Songs Library
            </CardTitle>
            <CardDescription>Manage your music tracks</CardDescription>
          </div>
          <AddSongDialog/>
        </div>
      </CardHeader>
      <CardContent>
        <SongsTable/>
      </CardContent>
    </Card>
  )
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music } from "lucide-react"
import AlbumTable from "./AlbumTable"
import AddAlbumDialog from "./AddAlbumDialog"

const AlbumsTabContent = () => {
  
  return (
   <Card className="border-zinc-800/50 bg-zinc-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Music className="size-5 text-emerald-500"/>
              Album Library
            </CardTitle>
            <CardDescription>Manage your album Collection</CardDescription>
          </div>
          <AddAlbumDialog/>
        </div>
      </CardHeader>
      <CardContent>
        <AlbumTable/>
      </CardContent>
    </Card>
  )
}

export default AlbumsTabContent

import Link from "next/link"
import Image from 'next/image';
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center-gap-3 mb-8">
        <div className="p-2">
          <Link href='/' className="rounded-lg">
            <Image src='/spotify.png' alt='Spotify Image' className='size-10 text-black' width={100} height={100}/>
          </Link>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Music Manager</h1>
          <p className="text-zinc-400 mt-1">Manage Your Music Catalog</p>
        </div>
      </div>

      <UserButton/>
    </div>
  )
}

export default Header

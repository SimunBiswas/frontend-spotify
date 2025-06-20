'use client'

import { usePlayerStore } from "@/stores/usePlayerStore";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/Slider";
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1 } from "lucide-react";

 const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const PlayBackPanelControls = () => {

    const {currentSong, isPlaying, playNext, playPrevious, togglePlay} = usePlayerStore()

    const[volume, setVolume] = useState(75);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    
    useEffect(() => {
        audioRef.current = document.querySelector('audio');

        const audio = audioRef.current;
        if(!audio) return;

        const updateTime = () => { setCurrentTime(audio.currentTime)}
        const updateDuration = () => { setDuration(audio.duration)}
        const handleCleanup = () => {
            usePlayerStore.setState({ isPlaying: false });
        }

        return () => {
            audio.addEventListener('timeupdate', updateTime)
            audio.addEventListener('loadedmetadata', updateDuration)
            audio.addEventListener('ended', handleCleanup)
        }

    }, [currentSong])

    const handleSeek = (value : number[]) => {
        if(audioRef.current){
            audioRef.current.currentTime = value[0]
        }
    }


    return (
        <footer className="h-20 sm:h-24 bg-zinc-900 border-zinc-800">
            <div className="flex justify-center lg:justify-between items-center h-full max-w-[1080px] mx-auto">
                {/* Currently Playing Song */}
                <div className=" flex items-center gap-4 min-w-[200px] w-auto">
                    {currentSong && (
                            <>
                            <div className="w-auto">
                                <Image
                                src={currentSong.imageUrl || "/albums/1.jpg"}
                                alt={currentSong.title}
                                width={60}
                                height={60}
                                className="rounded-md object-cover"
                            />
                            </div>
                            <div className="flex-1 min-w-0 w-[50%]">
                                <div className="fony-medium truncate hover:underline cursor-pointer">
                                    {currentSong.title}
                                </div>
                                <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                                    {currentSong.artist}
                                </div>
                            </div>
                            </>
                    )}
                </div>

                {/* Player Controlls */}
                <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-auto">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <Button 
                        size="icon"
                        variant="ghost"
                        className="hidden sm:inline-flex hover:text-white text-zinc-400"
                        >
                            <Shuffle className="h-4 w-4"/>
                        </Button>

                        <Button
                        size="icon"
                        variant="ghost"
                        className="hover:text-white text-zinc-400"
                        onClick={playPrevious}
                        disabled={!currentSong}
                        >
                            <SkipBack className="h-4 w-4"/>
                        </Button>

                        <Button
							size='icon'
							className='bg-white hover:bg-white/80 text-black rounded-full h-8 w-8'
							onClick={togglePlay}
							disabled={!currentSong}
						>
							{isPlaying ? <Pause className='h-5 w-5' /> : <Play className='h-5 w-5' />}
						</Button>

                        <Button
                        size="icon"
                        variant="ghost"
                        disabled={!currentSong}
                        onClick={playNext}
                        className="hover:text-white text-zinc-400"
                        >
                            <SkipForward className="h-4 w-4"/>
                        </Button>

                        <Button
                        size="icon"
                        variant="ghost"
                        className="hidden sm:inline-flex hover:text-white text-zinc-400">
                            <Repeat className="h-4 w-4"/>
                        </Button>

                    </div>

                    <div className="hidden sm:flex items-center gap-2 w-full">
                        <div className="text-xs text-zinc-400">
                            {formatTime(currentTime)}
                        </div>
                        <Slider
                        value={[currentTime]}
                        max={duration}
                        step={1}
                        className="w-full hover:cursor-grab active:cursor-grabbing"
                        onValueChange={handleSeek}
                         />

                        <div className="text-xs text-zinc-400">
                            {formatTime(duration)}
                        </div>
                    </div>
                </div>

                {/* Volume COntrols */}
                <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
                    <Button size='icon' variant='ghost' className="hover:text-white text-zinc-400">
                        <Mic2 className="h-4 w-4"/>
                    </Button>
                    <Button size='icon' variant='ghost' className="hover:text-white text-zinc-400">
                        <ListMusic className="h-4 w-4"/>
                    </Button>
                    <Button size='icon' variant='ghost' className="hover:text-white text-zinc-400">
                        <Laptop2 className="h-4 w-4"/>
                    </Button>

                    <div className="flex items-center-gap-2">
                         <Button size='icon' variant='ghost' className="hover:text-white text-zinc-400">
                            <Volume1 className="h-4 w-4"/>
                        </Button>

                        <Slider
                            value={[volume]}
                            max={100}
                            step={1}
                            className="w-24 hover:cursor-grab active:cursor-grabbing"
                            onValueChange={(value) => {
                                setVolume(value[0]);
                                if(audioRef.current) {
                                    audioRef.current.volume = value[0] / 100;
                                }
                            }}/>
                    </div>

                </div>
            </div>

        </footer>
    )
}

export default PlayBackPanelControls;
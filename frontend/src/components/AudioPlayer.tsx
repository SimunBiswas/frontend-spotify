'use client'

import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null)
    const prevSongRef = useRef<string | null>(null)

    const {currentSong, playNext, isPlaying} = usePlayerStore()


    // hanlde play/pause

    useEffect(() => {
        if(!audioRef.current) return;

        if(isPlaying){
            audioRef.current.play()
        }else{
            audioRef.current.pause()
        }
    }, [isPlaying])

    //handle song end
    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => {
            playNext()
        }
        audio?.addEventListener('ended', handleEnded)

        return () => {
            audio?.removeEventListener('ended', handleEnded)
        }
    }, [playNext])

    //handle song change
    useEffect(() => {

        if (!audioRef.current || !currentSong) return;

        const audio = audioRef.current;

        //check if there is new song
        const isSongChange  = prevSongRef.current !== currentSong?._id;

        if(isSongChange){
                if (audio) {
                    audio.src = currentSong?.audioUrl || '';
                    // reset the playback position
                    audio.currentTime = 0;
                    prevSongRef.current = currentSong?.audioUrl ?? null;

                    if(isPlaying) audio.play();
                }
                
        }
        
       
    },[currentSong, isPlaying])

    return <audio ref={audioRef}/>
}

export default AudioPlayer;
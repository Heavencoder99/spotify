"use client";

import { Song } from "@/types";
import MediaItem from "./mediaitem";
import LikeButton from "./likebutton";
import { FaDesktop, FaPause, FaPlay } from "react-icons/fa";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark , HiSpeakerWave } from "react-icons/hi2";
import Slider from "./slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";
interface PlayerContentProps{
    song: Song;
    songUrl:string;
}

const PlayerContent: React.FC<PlayerContentProps>= ({
    song,
    songUrl
} ) => {
    const player = usePlayer();
    const [Volume, setVolume] = useState(1);
    const  [isPlaying , setIsPlaying ] =useState(false);

    const Icon = isPlaying ? FaPause : FaPlay;
    const VolumeIcon = Volume === 0 ? HiSpeakerXMark :HiSpeakerWave;
    const onPlayNext = () => {
        if (player.ids.length === 0){
            return;
        }
        const currentIndex =player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex+1]
        if (!nextSong){
            return player.setId(player.ids[0]);
        }
        player.setId(nextSong);
    } 
    const onPlayPrevious = () => {
        if (player.ids.length === 0){
            return;
        }
        const currentIndex =player.ids.findIndex((id) => id === player.activeId);
        const prevSong = player.ids[currentIndex-1]
        if (!prevSong){
            return player.setId(player.ids[player.ids.length-1]);
        }
        player.setId(prevSong);
    };

    const [play , {pause, sound}] = useSound(
        songUrl,{
            volume: Volume,
            onplay: () =>setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );
    useEffect(( ) => {
        sound?.play();
    
    return ()=> {
        sound?.unload( );
    }
    }, [sound]);
    const handlePlay =() => {
        if (!isPlaying){
            play();
        }else{
            pause();
        }
    };
    const togglemute = ()=> {
        if (Volume === 0){
            setVolume (1);
        }else{
            setVolume(0);
        }
    }


    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data = {song}/>
                    <LikeButton songId={song.id}/>
                </div>
            </div>
            <div className="flex md:hidden col-auto w-full justify-end items-center">
                <div 
                onClick={handlePlay}
                className="h-10 w-10 flex items-center rounded-full p-1 cursor-pointer">
                    <Icon size = {26} className=" text-neutral-100 hover:opacity-50 "/>
                </div>
            </div>
            <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
                <AiFillStepBackward
                onClick={onPlayPrevious} 
                size={30} 
                className="text-neutral-400 cursor-pointer hover:text-white transition"/>
            
            <div 
            onClick={handlePlay}
            className="flex items-center justify-center h-10 w-10 rounded-full p-1 cursor-pointer">
                <Icon size={30} className="text-neutral-400 hover:text-neutral-100 transition"/>
            </div>
            <AiFillStepForward
            onClick={onPlayNext}
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-neutral-100 transition"/>
            </div>
        <div className="hidden md:flex w-full justify-end pr-2">
            <div className="flex items-center gap-x-2 w-[120px]">
                <VolumeIcon 
                onClick={togglemute}
                className="cursor-pointer"
                size={34}/>
                <Slider value={Volume}
                onChange={(value) => setVolume(value)}/>
            </div>
        </div>
        </div>
    );
}
export default PlayerContent;
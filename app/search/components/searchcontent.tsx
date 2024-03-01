"use client";

import LikeButton from "@/components/likebutton";
import MediaItem from "@/components/mediaitem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface SearchContentProps{
    songs : Song[];
}

const SearchContent : React.FC<SearchContentProps> = ({
    songs
})=>{
    const onPlay = useOnPlay(songs);
    if (songs.length === 0){
        return(
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No songs found
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-y-2 w-full px-4">
            {songs.map((song) => (
                <div
                className="flex items-center px-2 w-full"
                key ={song.id}>
                    <div className="flex-1">
                        <MediaItem onClick={(id:string)=>onPlay(id)} data={song}/>
                </div>
                <LikeButton songId={song.id} />
            </div>
            ))}
        </div>
    )    
}

export default SearchContent;
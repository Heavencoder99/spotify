import {TbPlaylist} from "react-icons/tb";
import {AiOutlinePlus} from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./mediaitem";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps{ 
    songs: Song[];
}
const Library: React.FC<LibraryProps> = ({
    songs}) => {
    const authModal= useAuthModal();
    const { user } =useUser();
    const onPlay = useOnPlay(songs);
    const uploadModal = useUploadModal();
    const onClick=()=>{
        if (!user){
            return authModal.onOpen(); 
        }
        return uploadModal.onOpen();
    };
    return (
        <div className="flex flex-col ">
            <div className="flex items-center justify-between pt-2">
                <div className="inline-flex items-center gap-x-2">
            
                    <TbPlaylist size={26}/>
    
                    <p className="text-neutral-400 text-lg font-medium hover:text-white transition cursor-pointer">Your Library</p>
                </div>
                <div className="text-neutral-400 text-lg font-medium hover:text-white transition cursor-pointer">
                <AiOutlinePlus size={20} onClick={onClick}/>
                </div>
            </div>
            <div className="text-lg py-2 justify-center">
                {songs.map((item)=> (
                    <MediaItem
                        onClick ={(id:string) => onPlay(id)}
                        key ={item.id}
                        data = {item}/>
                ))}
            </div>
        </div>
    );
}
export default Library;
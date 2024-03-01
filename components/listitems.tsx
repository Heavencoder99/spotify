"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {FaPlay} from "react-icons/fa";
interface ListItemsProps{
    image: string;
    name: string;
    href: string;
}
const ListItems:React.FC<ListItemsProps> = ({
    image,
    name,
    href
}) => {
    const router= useRouter();
    const onClick=()=>{
        router.push(href);
    }
    return (
        <button
        onClick={onClick} 
        className="relative group flex items-center rounded-md  overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
            <div className="object-cover relative h-full min-w-[70px]">
                <Image className="rounded" fill  src={image} alt="Image" />
            </div>
            <p className="font-medium text-lg truncate py-5">
                {name}
            </p>
            <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-2 group-hover:opacity-100 hover:scale-110">
                <FaPlay/>
            </div>
        </button>
    );
}
export default ListItems;
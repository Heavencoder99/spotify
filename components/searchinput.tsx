"use client";
import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./input";

const SearchInput = () => {
    const router =useRouter();
    const [value , setValue] =useState<string>("");
    const debouncedValue =useDebounce<string>(value, 500);

    useEffect(()=>{
        const query = {
            title: debouncedValue,
        };

        const url = qs.stringifyUrl({
            url: '/search',
            query:query
        });

        router.push(url);
    }, [debouncedValue , router]);
    
    
    return ( 
        <Input placeholder="What do you want to listen to?"
        value ={value}
        onChange={e=>setValue(e.target.value)}
        className="bg-neutral-700 placeholder:text-neutral-300 text-md hover:bg-opacity-50 hover:text-zinc-600 transition">
            
        </Input>
    );
}

export default SearchInput;
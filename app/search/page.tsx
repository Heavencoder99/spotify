import getsongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/header";
import SearchInput from "@/components/searchinput";
import SearchContent from "./components/searchcontent";


interface SearchProps{
    searchParams: {
        title:string;
    }
};

const Search = async ({searchParams}:SearchProps) => {
    const songs = await getsongsByTitle(searchParams.title);
    
    return (  
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header >
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Search
                    </h1>
                </div>
                <SearchInput/>
            </Header>
            <SearchContent songs= {songs}/>
        </div>
    )};
export default Search;
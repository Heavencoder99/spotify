import getSongs from '@/actions/getSongs';
import Header from '../../components/header';
import ListItems from "../../components/listitems";
import Pagecontent from './components/pagecontent';

export default async function Home() {
  console.log("Home");
  const songs= await getSongs();
  return (
    <div className="bg-neutral-800 rounded-lg h-full w-full  overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className='text-white text-3xl font-semibold'>
            Welcome Back
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mt-4'>
            <ListItems 
            image="/image/liked_songs.jpg"
            name= "Liked Songs"
            href= "liked"
            />
          </div>
        </div>
      </Header>
      <div className='mt-2 mb-7 px-6'>
        <div className=' flex justify-between items-center'>
          <h1 className='text-white text-2xl font-semibold text-md'>
            Newest Songs!
          </h1>
        </div>
        <Pagecontent songs={songs} />
      </div>
    </div>
  )
}
export const revalidate = 0;
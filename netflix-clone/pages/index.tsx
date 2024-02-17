import { Inter } from "next/font/google";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context:NextPageContext) {
  const session = await getSession(context);

  if(!session){
      return {
          redirect:{
              destination:"/auth",
              permanent:false
          }
      }
  }

  return{
      props: {}
  }
}

export default function Home() {
  const {data:user} = useCurrentUser();
  const {data:movies} = useMovieList(); 
  return (
<>
<Navbar></Navbar>
<Billboard></Billboard>
<div className="lg:mt-44 sm:mt-5"></div>

<div className="p-6 ">
<MovieList title='Trending' data={movies}></MovieList>
</div>

</>
  );
}

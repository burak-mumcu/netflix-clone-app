import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useFavoriMovie = () => {
    const {data,error,isLoading} = useSWR('/api/favorilist',fetcher,{
        revalidateIfStale:false,
        revalidateOnFocus:false,
        revalidateOnReconnect:false
    })

    return{
        data,error,isLoading
    }
}

export default useFavoriMovie;
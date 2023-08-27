import { useSearchParams } from "react-router-dom"
import { SEARCH_QUERY_API } from "../constants"
import { useEffect, useState } from "react"
import axios from "axios"
import FlatVideoCard from "./FlatVideoCard"
// import { useDispatch, useSelector } from "react-redux"
// import { addVideos } from "../store/searchedVideosSlice"
// import { RootState } from "../store"

export default function SearchResults() {

  const [searchParams] = useSearchParams()
  const search_query = searchParams.get('search_query') as string
  const [searchResults, setSearchResults] = useState<VideoInfo[]>([])
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState('')

  // const dispatch = useDispatch()
  // const searchStore = useSelector((store: RootState) => store.searchVideo)
  // const searchResults = searchStore[search_query]
  const getSearchResults = async () => {
    // if (search_query === '') return
    // if (searchResults.videosList.length > 0) return
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await axios(SEARCH_QUERY_API(search_query, nextPageToken))
      // dispatch(addVideos({ key: search_query, videosList: data.items }))
      setSearchResults(prev => [...prev, ...data.items])
      setNextPageToken(data.nextPageToken)
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getSearchResults()
  }, [search_query])
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    getSearchResults();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  if (error) return <h3>{JSON.stringify(error)}</h3>

  return (
    <div className="w-full ">
      <div className="flex flex-col items-center">
        {searchResults.length > 0 ? searchResults.map((video) => <FlatVideoCard key={video.id.videoId} video={video} />) : null}
        {isLoading ? <h3> Loading......</h3> : null}
      </div>
    </div >
  )
}

import { useEffect, useState } from "react"
import VideoCard from "./VideoCard"
import axios from "axios"
import { POPULAR_VIDEOS_API } from "../constants"
import { useDispatch, useSelector } from "react-redux"
import { addVideos } from "../store/popularVideoSlice"
import { RootState } from "../store"


export default function VideoContainer() {


  const dispatch = useDispatch()
  const [nextPageToken, setNextPageToken] = useState('')
  const popularVideos = useSelector((store: RootState) => store.popularVideo.videos)


  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  async function getPopularVideos() {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await axios(POPULAR_VIDEOS_API(nextPageToken))
      dispatch(addVideos(data.items))
      setNextPageToken(data.nextPageToken)
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (popularVideos.length == 0)
      getPopularVideos()
  }, [])

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    getPopularVideos();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  if (error) return <h3>{error}</h3>

  return (
    <div className="m-2 flex flex-wrap justify-evenly">

      {popularVideos.length > 0 ? popularVideos.map((video) => {
        return <VideoCard video={video} key={video.id} />
      }) : null}
      {isLoading ? <h3> Loading......</h3> : null}
    </div>
  )
}

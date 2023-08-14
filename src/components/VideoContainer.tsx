import { useEffect, useState } from "react"
import VideoCard from "./VideoCard"
import axios from "axios"
import { POPULAR_VIDEOS_API } from "../constants"


export default function VideoContainer() {


  const [videos, setVideos] = useState<any>([])
  async function getVideos() {
    const res = await axios(POPULAR_VIDEOS_API)
    // console.log(res)
    setVideos(res.data.items)
  }

  useEffect(() => {
    getVideos()
  }, [])

  // console.log(videos[0])
  return (
    <div className="m-2 flex flex-wrap justify-items-start">

      {videos.map((video: any) => {
        return <VideoCard video={video} key={video.id} />
      })}
    </div>
  )
}

import { Link } from "react-router-dom"
import { CHANNEL_INFO_API, formatter } from "../constants"
import { useEffect, useState } from "react"
import ToggleVideoNThumbnail from "./ToggleVideoNThumbnail"



export default function VideoCard({ video }: { video: Video }) {

  const { snippet, statistics, id } = video
  const { channelId, channelTitle, thumbnails, title, publishedAt, liveBroadcastContent } = snippet
  const { viewCount } = statistics
  const [channelLogo, setChannelLogo] = useState('')

  useEffect(() => {
    async function getChannelLogo() {
      const url = await CHANNEL_INFO_API(channelId).then(url => url)
      setChannelLogo(url)
    }
    getChannelLogo()
  }, [])
  // console.log(`render VideoCard`)
  return (
    <Link to={`/watch?v=${id}`} className="">
      <div className="w-96 m-1 p-1 rounded transition hover:bg-neutral-800 hover:bg-opacity-70 ">
        <ToggleVideoNThumbnail id={id} thumbnails={thumbnails.high} title={title} />

        <div className="flex p-1">
          <img className=' h-8 rounded-full' src={channelLogo} alt="" />
          <ul className="ml-2">
            <li className="font-semibold text-xs">{title}</li>
            <li className="text-xs">{channelTitle}</li>
            <li className="text-xs">{formatter(viewCount)} views - <span>{new Date(publishedAt).toDateString()}</span>
              {(liveBroadcastContent == 'live') ? <span className=' m-1  px-1 bg-red-600 rounded'>{liveBroadcastContent}</span> : null}</li>
          </ul>
        </div>
      </div>
    </Link>
  )
}

import { Link } from "react-router-dom"
import { CHANNEL_INFO_API, formatter } from "../constants"
import { useEffect, useRef, useState } from "react"



export default function VideoCard({ video }: { video: Video }) {


  const { snippet, statistics, id } = video
  const { channelId, channelTitle, thumbnails, title, publishedAt } = snippet
  const { viewCount } = statistics
  const [channelLogo, setChannelLogo] = useState('')
  const [shouldPlay, setShouldPlay] = useState(false);
  const handleTimeoutRef = useRef<number>()

  function handleMouseEnter() {
    handleTimeoutRef.current = setTimeout(() => {
      setShouldPlay(true)
    }, 1000);
  }
  function handleMouseLeave() {
    clearTimeout(handleTimeoutRef.current)
    setShouldPlay(false)
  }

  useEffect(() => {
    async function getChannelLogo() {
      const url = await CHANNEL_INFO_API(channelId).then(url => url)
      setChannelLogo(url)
    }
    getChannelLogo()
  }, [])
  // console.log(`render VideoCard ${title}`)
  return (
    <Link to={`/watch?v=${video.id}`}>
      <div className="w-72 m-1 p-1 rounded hover:bg-neutral-800 hover:bg-opacity-70 transition"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title={title}>
        {shouldPlay ? (<iframe
          className='aspect-video w-full'
          src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1`}
          title=""
          autoFocus
          // frameBorder={ }
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>)
          : (<img
            className="rounded"
            src={thumbnails.medium.url}
            alt={title} />)
        }
        <div className="flex justify-between p-1">
          {/* {console.log(CHANNEL_INFO_API(channelId))} */}
          <img className=' h-8 rounded-full' src={channelLogo} alt="" />
          <ul className="ml-1">
            <li className="font-semibold text-xs">{title}</li>
            <li className="text-xs">{channelTitle}</li>
            <li className="text-xs">{formatter(viewCount)} views . {publishedAt}</li>
          </ul>
        </div>
      </div>
    </Link >
  )
}

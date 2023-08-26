import { Link } from 'react-router-dom'
import ToggleVideoNThumbnail from './ToggleVideoNThumbnail'

export default function FlatVideoCard({ video }: { video: VideoInfo }) {

  const { videoId } = video.id
  const { thumbnails, title, channelTitle, liveBroadcastContent } = video.snippet
  // const { url, width, height } = thumbnails.high
  console.log('rendering flatvideocard')
  return (
    <Link to={`/watch?v=${videoId}`}>
      <div className="flex w-[52rem] my-1 rounded-lg hover:bg-opacity-5 hover:bg-white">
        <ToggleVideoNThumbnail title={title} id={videoId} thumbnails={thumbnails.high} width='w-[20rem]' />
        <div className="w-[32rem] m-3">
          <h2 className="font-bold text-lg">{title}</h2>
          <span>{channelTitle}</span> - <span>{new Date(video.snippet.publishedAt).toDateString()}</span>
          {(liveBroadcastContent == 'live') ? <span className=' m-1  px-1 bg-red-600 rounded'>{liveBroadcastContent}</span> : null}
        </div>
      </div>
    </Link>
  )
}

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Menu } from '../store/appSlice'
import CommentSection from './CommentSection'
// import useDocumentTitle from '../hooks/useDocumentTitle'
import { VIDEO_INFO_API } from '../constants'
import axios from 'axios'
import useDocumentTitle from '../hooks/useDocumentTitle'
import LiveChat from './LiveChat'

type IvideoInfo = {
  snippet: {
    title: string
  }
} | null

export default function Watch() {

  const [searchParam] = useSearchParams()
  const videoId = searchParam.get('v') as string
  const dispatch = useDispatch()
  useEffect(() => { dispatch(Menu(false)) }, [])
  const [videoInfo, setVideoInfo] = useState<IvideoInfo>(null)


  const getVideoInfo = async () => {
    const response = await axios(VIDEO_INFO_API(videoId))
    setVideoInfo(response.data.items[0])
  }

  useEffect(() => { getVideoInfo() }, [])
  useDocumentTitle(videoInfo?.snippet.title!)

  return (
    !videoInfo ? <div>Loading..</div> :
      <div className='w-full  m-3'>
        <div className="flex">
          <div className=''>
            <iframe
              className='aspect-video w-[1000px]'
              src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1`}
              autoFocus
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen></iframe>
            <h1 className='font-bold text-lg'>{videoInfo?.snippet.title!}</h1>
          </div>
          <LiveChat />
        </div>
        <div className=''>
          <CommentSection />
          <div className='w-'></div>
        </div>
      </div>
  )
}

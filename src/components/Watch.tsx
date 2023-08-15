import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Menu } from '../store/appSlice'
import CommentSection from './CommentSection'
// import useDocumentTitle from '../hooks/useDocumentTitle'
import { VIDEO_INFO_API } from '../constants'
import axios from 'axios'
import useDocumentTitle from '../hooks/useDocumentTitle'

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
      <div className='h-auto w-full m-3'>
        <iframe
          className='aspect-video w-3/5'
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
          autoFocus
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
        <h1 className='font-bold text-lg'>{videoInfo?.snippet.title!}</h1>
        <CommentSection />
      </div >
  )
}

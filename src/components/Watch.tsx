import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Menu } from '../store/appSlice'

export default function Watch() {
  const [searchParam] = useSearchParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(Menu(false))
  }, [])

  return (
    <div className='h-auto w-full m-3'>
      <iframe
        className='aspect-video w-3/5'
        src={`https://www.youtube.com/embed/${searchParam.get('v')}?autoplay=1&mute=1`}
        title=""
        // frameBorder={}
        autoFocus
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen></iframe>
      <h1> v={ } <br /> a={searchParam.get('a')}</h1>
    </div >
  )
}

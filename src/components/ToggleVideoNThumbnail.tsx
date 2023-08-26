import { useRef, useState } from 'react'

export default function ToggleVideoNThumbnail({ title, thumbnails, id, width }: { title: string, thumbnails: ThumbnailProperties, id: string, width?: string }) {
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
  // console.log(`render toggleVideoNthumbnail`)

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={title}
      className={`${width} `}>
      {shouldPlay ?
        (<iframe
          className={`aspect-video w-full`}
          src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1`}
          title={title}
          autoFocus
          // frameBorder={ }
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>) :
        (<img
          className={` w-full object-cover aspect-video   rounded`}
          src={thumbnails.url}
          alt={title} />)
      }
    </div>
  )
}

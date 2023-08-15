import axios from "axios"

const POPULAR_VIDEOS_API = `https://youtube.googleapis.com/youtube/v3/videos?maxResults=50&part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
const CHANNEL_INFO_API = async (id: string): Promise<string> => {

  const { data } = await axios(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`)
  return data.items[0].snippet.thumbnails.default.url
}

const VIDEO_INFO_API = (id: string): string => {

  return (`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`)
}

const formatter = (num: string) => {

  return Intl.NumberFormat('en', { notation: 'compact' }).format(Number(num))
}

const SEARCH_AUTOCOMPLETE_API = 'http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q='


export { POPULAR_VIDEOS_API, CHANNEL_INFO_API, formatter, SEARCH_AUTOCOMPLETE_API, VIDEO_INFO_API }
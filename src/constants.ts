import axios from "axios"

const POPULAR_VIDEOS_API = (nextPageToken?: string) => {
  let pageTokenArg = ''
  if (nextPageToken) pageTokenArg = `&pageToken=${nextPageToken}`

  return `https://youtube.googleapis.com/youtube/v3/videos?maxResults=50&part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular${pageTokenArg}&regionCode=IN&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
}
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

const SEARCH_QUERY_API = (search_query: string | null, pageToken?: string) => {
  if (search_query == null) return ''
  let pageTokenArg = ''
  if (pageToken) pageTokenArg = `&pageToken=${pageToken}`
  return `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25${pageTokenArg}&q=${search_query}&type=video&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
}

export { SEARCH_QUERY_API, POPULAR_VIDEOS_API, CHANNEL_INFO_API, formatter, SEARCH_AUTOCOMPLETE_API, VIDEO_INFO_API }
interface VideoInfo {
  id: {
    videoId: string,
  },
  snippet: VideoSnippet;
}

interface VideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnail;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  };
};

interface Video {
  kind: string;
  etag: string;
  id: string;
  snippet: VideoSnippet;
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    regionRestriction: {
      blocked: string[];
    };
    contentRating: Record<string, any>;
    projection: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}



interface ThumbnailProperties {
  url: string;
  width: number;
  height: number;
}

interface Thumbnail {

  default: ThumbnailProperties;
  medium: ThumbnailProperties;
  high: ThumbnailProperties;
  standard: ThumbnailProperties;
  maxres: ThumbnailProperties;

}



interface IsearchResults {
  nextPageToken: string,
  items: [
    VideoInfo
  ]
}


interface IComment {
  name: string,
  text: string,
  replies: IComment[]
}
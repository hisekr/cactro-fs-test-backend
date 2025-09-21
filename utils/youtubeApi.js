import { google } from "googleapis";
import youtubeOauth2Client from "../config/youtubeAuth.js";

const youtube = google.youtube({ version: "v3", auth: youtubeOauth2Client });

export const getMyVideos = async () => {
  try {
    const res = await youtube.channels.list({ part: ["contentDetails"], mine: true });
    if (!res.data.items || res.data.items.length === 0) return [];

    const uploadsId = res.data.items[0].contentDetails.relatedPlaylists.uploads;

    const playlist = await youtube.playlistItems.list({
      part: ["snippet", "contentDetails"],
      playlistId: uploadsId,
      maxResults: 50,
    });

    return playlist.data.items.map((i) => ({
      id: i.contentDetails.videoId,
      snippet: i.snippet,
    }));
  } catch (err) {
    console.error("getMyVideos error:", err);
    throw err;
  }
};

export const getVideoDetails = async (videoId) => {
  try {
    const res = await youtube.videos.list({
      part: ["snippet", "status", "statistics"],
      id: [videoId],
    });
    if (!res.data.items || res.data.items.length === 0) return null;
    return res.data.items[0];
  } catch (err) {
    console.error("getVideoDetails error:", err);
    throw err;
  }
};

export const updateVideoMetadata = async (videoId, title, description) => {
  try {
    const current = await youtube.videos.list({
      part: ["snippet"],
      id: [videoId],
    });

    if (!current.data.items || current.data.items.length === 0) {
      throw new Error("Video not found");
    }

    const snippet = current.data.items[0].snippet;

    const res = await youtube.videos.update({
      part: ["snippet"],
      requestBody: {
        id: videoId,
        snippet: {
          title: title || snippet.title,
          description: description || snippet.description,
          categoryId: snippet.categoryId, 
        },
      },
    });

    return res.data;
  } catch (err) {
    console.error("updateVideoMetadata error:", err);
    throw err;
  }
};


export const listComments = async (videoId) => {
  try {
    const res = await youtube.commentThreads.list({
      part: ["snippet", "replies"],
      videoId,
      maxResults: 50,
    });
    return res.data.items || [];
  } catch (err) {
    console.error("listComments error:", err);
    throw err;
  }
};

export const insertComment = async (videoId, text) => {
  try {
    const res = await youtube.commentThreads.insert({
      part: ["snippet"],
      requestBody: {
        snippet: {
          videoId,
          topLevelComment: { snippet: { textOriginal: text } },
        },
      },
    });
    return res.data;
  } catch (err) {
    console.error("insertComment error:", err);
    throw err;
  }
};

export const deleteComment = async (commentId) => {
  try {
    await youtube.comments.delete({ id: commentId });
  } catch (err) {
    console.error("deleteComment error:", err);
    throw err;
  }
};

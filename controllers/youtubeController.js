import pool from "../db/pool.js";
import { 
  getMyVideos, getVideoDetails, updateVideoMetadata, 
  listComments, insertComment, deleteComment 
} from "../utils/youtubeApi.js";
import { logEvent } from "../services/logsService.js";

export const fetchMyVideos = async (req, res) => {
  try {
    const videos = await getMyVideos();
    res.json({ videos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ videos: [] });
  }
};

export const fetchVideo = async (req, res) => {
  try {
    const video = await getVideoDetails(req.query.videoId);
    res.json({ video });
  } catch (err) {
    console.error(err);
    res.status(500).json({ video: null });
  }
};

export const editVideo = async (req, res) => {
  const { videoId, title, description } = req.body;
  try {
    const updated = await updateVideoMetadata(videoId, title, description);
    await logEvent("VIDEO_UPDATED", { title, description }, videoId);
    res.json({ video: updated });
  } catch (err) {
    console.error("editVideo error:", err);
    res.status(500).json({ video: null });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await listComments(req.query.videoId);
    res.json({ comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ comments: [] });
  }
};

export const addComment = async (req, res) => {
  const { videoId, text } = req.body;
  try {
    const comment = await insertComment(videoId, text);
    await logEvent("COMMENT_ADDED", { text, commentId: comment.id }, videoId);
    res.json({ comment });
  } catch (err) {
    console.error("addComment error:", err);
    res.status(500).json({ comment: null });
  }
};

export const removeComment = async (req, res) => {
  const { videoId, commentId } = req.body;
  try {
    await deleteComment(commentId);
    await logEvent("COMMENT_DELETED", { commentId }, videoId);
    res.json({ success: true });
  } catch (err) {
    console.error("removeComment error:", err);
    res.status(500).json({ success: false });
  }
};

export const getNotes = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM notes WHERE video_id=$1 ORDER BY created_at DESC",
      [req.query.videoId]
    );
    res.json({ notes: rows });
  } catch (err) {
    console.error("getNotes error:", err);
    res.status(500).json({ notes: [] });
  }
};

export const addNote = async (req, res) => {
  const { videoId, text } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO notes (video_id, text) VALUES ($1,$2) RETURNING *",
      [videoId, text]
    );
    await logEvent("NOTE_ADDED", { text, noteId: rows[0].id }, videoId);
    res.json({ note: rows[0] });
  } catch (err) {
    console.error("addNote error:", err);
    res.status(500).json({ note: null });
  }
};

export const getLogs = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM logs WHERE video_id=$1 ORDER BY timestamp DESC",
      [req.query.videoId]
    );
    res.json({ logs: rows });
  } catch (err) {
    console.error("getLogs error:", err);
    res.status(500).json({ logs: [] });
  }
};

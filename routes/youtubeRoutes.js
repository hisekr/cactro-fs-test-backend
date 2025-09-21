import express from "express";
import {
  fetchMyVideos,
  fetchVideo,
  editVideo,
  getComments,
  addComment,
  removeComment,
  getNotes,
  addNote,
  getLogs
} from "../controllers/youtubeController.js";

const router = express.Router();

// --- Videos ---
router.get("/my-videos", fetchMyVideos);     // GET all uploaded videos
router.get("/video", fetchVideo);            // GET details of a single video by ?videoId=...
router.put("/video", editVideo);             // PUT to edit title/description

// --- Comments ---
router.get("/comments", getComments);        // GET comments for ?videoId=...
router.post("/comments", addComment);       // POST { videoId, text }
router.delete("/comments", removeComment);  // DELETE { videoId, commentId }

// --- Notes ---
router.get("/notes", getNotes);             // GET notes for ?videoId=...
router.post("/notes", addNote);             // POST { videoId, text }

// --- Logs ---
router.get("/logs", getLogs);               // GET logs for ?videoId=...

export default router;

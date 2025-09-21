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

router.get("/my-videos", fetchMyVideos);     
router.get("/video", fetchVideo);            
router.put("/video", editVideo);             

router.get("/comments", getComments);       
router.post("/comments", addComment);       
router.delete("/comments", removeComment);  

router.get("/notes", getNotes);             
router.post("/notes", addNote);             

router.get("/logs", getLogs);               

export default router;

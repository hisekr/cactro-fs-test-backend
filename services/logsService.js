import pool from "../db/pool.js";

export const logEvent = async (eventType, details, videoId = null) => {
  try {
    await pool.query(
      `INSERT INTO logs (video_id, event_type, details) VALUES ($1, $2, $3)`,
      [videoId, eventType, JSON.stringify(details)]
    );
  } catch (err) {
    console.error("Failed to log event:", err);
  }
};

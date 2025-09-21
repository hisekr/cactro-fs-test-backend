import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const youtubeOauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

// Always use your refresh token (from your YouTube account)
youtubeOauth2Client.setCredentials({
  refresh_token: process.env.YOUTUBE_REFRESH_TOKEN,
});

export default youtubeOauth2Client;

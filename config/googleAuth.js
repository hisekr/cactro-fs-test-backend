import { google } from "googleapis";
import dotenv from "dotenv";
import { readTokens, saveTokens } from "../utils/tokenManager.js";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const tokens = readTokens();
if (tokens) oauth2Client.setCredentials(tokens);

oauth2Client.on("tokens", (tokens) => {
  if (tokens.refresh_token) saveTokens(tokens);
});

export default oauth2Client;

import oauth2Client from "../config/googleAuth.js";
import { deleteTokens } from "../utils/tokenManager.js";
import { google } from "googleapis";

export const startGoogleOAuth = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
    prompt: "consent",
  });
  res.redirect(url);
};

export const handleGoogleCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.redirect(process.env.CLIENT_ORIGIN);

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.redirect(`${process.env.CLIENT_ORIGIN}/dashboard`);
  } catch (err) {
    console.error("OAuth Callback Error:", err);
    res.redirect(process.env.CLIENT_ORIGIN);
  }
};

export const logout = (req, res) => {
  deleteTokens();
  res.json({ success: true, message: "Logged out successfully" });
};

export const getUserInfo = async (req, res) => {
  try {
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();
    res.json({ user: data });
  } catch (err) {
    console.error("Fetch User Info Error:", err);
    res.status(401).json({ user: null });
  }
};

import fs from "fs";
import path from "path";

const TOKEN_PATH = path.resolve("google_tokens.json");

export const readTokens = () => {
  if (fs.existsSync(TOKEN_PATH)) {
    return JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
  }
  return null;
};

export const saveTokens = (tokens) => {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
};

export const deleteTokens = () => {
  if (fs.existsSync(TOKEN_PATH)) fs.unlinkSync(TOKEN_PATH);
};

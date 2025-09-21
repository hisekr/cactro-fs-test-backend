# YouTube Dashboard API

Backend API to manage YouTube videos, comments, notes, and logs.

---

## Authentication Routes

| Method | Endpoint                 | Description                  |
|--------|--------------------------|------------------------------|
| GET    | `/auth/google`           | Start Google OAuth2 login    |
| GET    | `/auth/google/callback`  | Handle OAuth2 callback       |
| POST   | `/auth/logout`           | Logout user                  |
| GET    | `/auth/me`               | Get logged-in user info      |

---

## YouTube Routes

| Method | Endpoint                 | Description                       |
|--------|--------------------------|-----------------------------------|
| GET    | `/youtube/my-videos`     | Fetch user's uploaded videos      |
| GET    | `/youtube/video`         | Fetch details of a video          |
| PUT    | `/youtube/video`         | Edit video title/description      |
| GET    | `/youtube/comments`      | Get comments for a video          |
| POST   | `/youtube/comments`      | Add a comment to a video          |
| DELETE | `/youtube/comments`      | Delete a comment by ID            |
| GET    | `/youtube/notes`         | Get notes for a video             |
| POST   | `/youtube/notes`         | Add a note for a video            |
| GET    | `/youtube/logs`          | Get logs for a video              |

## Database Schema

### Notes Table

```sql
CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    video_id VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_notes_video_id ON notes(video_id);
```

### Logs Table

```sql
CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    video_id VARCHAR(255),
    event_type VARCHAR(255) NOT NULL,
    details JSONB,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_logs_event_type ON logs(event_type);
```
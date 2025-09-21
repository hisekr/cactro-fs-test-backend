CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(255) NOT NULL,
    details JSONB,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP

CREATE INDEX IF NOT EXISTS idx_logs_event_type ON logs(event_type);
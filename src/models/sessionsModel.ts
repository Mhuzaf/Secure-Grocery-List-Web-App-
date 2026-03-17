import { db } from "../app/db.ts";

export interface SessionProps {
    sessionId: string,
    username: string,
    access: string
}

export const createSessionsTable = () => {
    db.prepare(`
        CREATE TABLE sessions (
            sessionId TEXT PRIMARY KEY,
            username TEXT NOT NULL,
            access TEXT NOT NULL,
            FOREIGN KEY (username) REFERENCES users(username)
        );
    `).run();
}

export const createSession = (username: string, role: string) => {
    const sessionId = crypto.randomUUID();
    db.prepare(`
        INSERT INTO sessions (sessionId, username, access) VALUES
            (?, ?, ?)
    `).run(sessionId, username, role);
    return sessionId;
}

export const getSession = (sessionId: string) => {
    return db.prepare(`
        SELECT * FROM sessions WHERE sessionId = ?    
    `).get(sessionId);
}

export const deleteSession = (sessionId: string) => {
    db.prepare(`
        DELETE FROM sessions WHERE sessionId = ?
    `).run(sessionId);
}

export const deleteSessionsTable = () => {
    db.prepare("DROP TABLE IF EXISTS sessions").run();
}
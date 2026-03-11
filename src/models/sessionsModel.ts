import { db } from "../app/db.ts";

interface SessionProps {
    sessionId: string,
    username: string,
    access: string
}

export const createSession = (username: string, role: string) => {
    const sessionId = crypto.randomUUID();
    db.prepare(`
        INSERT INTO sessions (session_id, username, role) VALUES
            (?, ?, ?)
    `).run(sessionId, username, role);
    return sessionId;
}

export const getSession = (sessionId: string) => {
    return db.prepare(`
        SELECT * FROM sessions WHERE session_id = ?    
    `).get(sessionId);
}

export const deleteSession = (sessionId: string) => {
    db.prepare(`
        DELETE FROM sessions WHERE session_id = ?
    `).run(sessionId);
}
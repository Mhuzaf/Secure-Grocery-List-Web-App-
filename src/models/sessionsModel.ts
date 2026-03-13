import { db } from "../app/db.ts";

export interface SessionProps {
    sessionId: string,
    username: string,
    access: string
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
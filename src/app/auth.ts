import { deleteCookie, getCookies, setCookie } from "@std/http/cookie";
import { createSession, deleteSession, getSession } from "../models/sessionsModel.ts";

export const login = (headers: Headers, username: string) => {
    let sessionId;
    if (username === "admin") sessionId = createSession(username, "admin");
    else sessionId = createSession(username, "normal");
    
    setCookie(headers, {
        name: "sessionId",
        value: sessionId,
        path: "/"
    });
}

export const currentSession = (requestHeaders: Headers) => {
    const { sessionId } = getCookies(requestHeaders);
    const session = getSession(sessionId);
    if (session) return {
        sessionId: sessionId,
        username: session.username,
        access: session.access
    }
    return null;
}

export const logout = (requestHeaders: Headers, session) => {
    deleteSession(session.sessionId);
    deleteCookie(requestHeaders, "sessionId", { path: "/" });
}
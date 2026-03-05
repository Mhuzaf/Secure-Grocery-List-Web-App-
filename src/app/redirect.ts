import { setFlash } from "./flash.ts";

export const redirect = (headers: Headers, location: string, flash: string) => {
    if (flash) setFlash(headers, flash);
    headers.set("location", location);
    return new Response(null, { headers, status: 302 });
}
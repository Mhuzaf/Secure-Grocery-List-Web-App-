import { deleteCookie, getCookies, setCookie } from "@std/http/cookie";
import { decodeBase64, encodeBase64 } from "@std/encoding/base64";

export const setFlash = (headers: Headers, msg: string) => {
    setCookie(headers, {
        name: "flash",
        value: encodeBase64(msg),
        path: "/"
    });
}

export const getFlash = (requestHeaders: Headers, responseHeaders: Headers) => {
    const { flash } = getCookies(requestHeaders);
    if (flash) {
        deleteCookie(responseHeaders, "flash", { path: "/" });
        return new TextDecoder().decode(decodeBase64(flash));
    }
    return null;
}
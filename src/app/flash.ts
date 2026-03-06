import { deleteCookie, getCookies, setCookie } from "@std/http/cookie";
import { decodeBase64Url, encodeBase64Url } from "@std/encoding/base64url";

export const setFlash = (headers: Headers, msg: string) => {
    setCookie(headers, {
        name: "flash",
        value: encodeBase64Url(msg),
        path: "/"
    });
}

export const getFlash = (requestHeaders: Headers, responseHeaders: Headers) => {
    console.log("is this fr" + requestHeaders);
    const { flash } = getCookies(requestHeaders);
    if (flash) {
        deleteCookie(responseHeaders, "flash", { path: "/" });
        return new TextDecoder().decode(decodeBase64Url(flash));
    }
    return "";
}
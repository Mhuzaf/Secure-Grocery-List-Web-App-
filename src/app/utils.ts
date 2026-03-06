export const stripSpaces = (str: string) => {
    return str.replace(RegExp("\\s+"), "_");
}
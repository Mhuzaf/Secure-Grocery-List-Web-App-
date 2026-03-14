export const withLogs = async (ctx, next) => {
    const { request } = ctx;
    const url = new URL(request.url);
    console.log(`${request.method} ${url.pathname}${url.search}`);
    const response = await next(ctx);
    console.log("status: ", response.status);
    return response;
}
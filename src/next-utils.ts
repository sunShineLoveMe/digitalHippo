import next from "next";

const PORT = Number(process.env.PORT) || 3000

export const nextApp = next({
    dev: process.env.NODE_ENV !== "production",
    port: PORT
})

// 获取next.js请求处理器，用于处理传入的http请求,
// 并根据next.js应用的路由来响应这些请求。
export const nextHandler = nextApp.getRequestHandler()
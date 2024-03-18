import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";

/**
 * 配置payload cms 内容管理系统
 */
export default buildConfig({
    // 设置服务器的 URL，从环境变量 NEXT_PUBLIC_SERVER_URL 获取
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [],
    // 定义路由，例如管理界面的路由。
    routes: {
        admin: '/sell'
    },
    admin: {
        // 设置用于 Payload CMS 管理界面的打包工具，这里使用了
        bundler: webpackBundler(),
        // 配置管理系统 Meta
        meta: {
            titleSuffix: '- DigitalHippo',
            favicon: '/favicon.ico',
            ogImage: '/thumbnail.jpg',
        }
    },
     // 配置请求的速率限制，这里设置了最大值。
    rateLimit: {
        max: 2000
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGODB_URI!,
    }),
    typescript: {
        outputFile: path.resolve(__dirname, 'payload.config.ts')
    }
})
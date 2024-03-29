import path from "path"
import dotenv from "dotenv"
import { webpackBundler } from "@payloadcms/bundler-webpack"
import { buildConfig } from "payload/config"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { Users } from "./collections/Users"
import { slateEditor } from "@payloadcms/richtext-slate"

dotenv.config({
    path: path.resolve(__dirname, '../.env')
})

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [Users],
    routes:{
        admin: '/sell',
    },
    admin: {
        user: "users",
        bundler: webpackBundler(),
        meta: {
            titleSuffix: '- DigitalHippo',
            favicon: '/favicon.ico',
            ogImage: '/thumbnail.jpg'
        },

    },
    rateLimit: {
        max: 2000
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        // 在ts中，！后缀是一个非空断言运算符。当你确定某个值肯定不是
        // null/undefined，可以使用！
        url: process.env.MONGODB_URI!,
    }),
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts')
    }
})
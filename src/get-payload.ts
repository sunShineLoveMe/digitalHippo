import dotenv from 'dotenv';
import path from 'path';
import { InitOptions } from 'payload/config';
import payload from 'payload';

dotenv.config({ 
    path: path.resolve(__dirname, '../.env') 
});

// 处理缓存机制。确保应用中多处需要使用 Payload 客户端时不会重复初始化，提高效率
// 使用 Node.js 的 global 对象来存储缓存。
let cached = (global as any).payload
if(!cached) {
    cached = (global as any).payload = {
        clientL: null,
        promise: null
    }
}

interface Args {
    initOptions?: Partial<InitOptions>
}

/**
 * 负责初始化 Payload 客户端
 * @return {Promise<Payload>}
 */
export const getPayloadClient = async ({
    initOptions,
}: Args = {}) => {
    if(!process.env.PAYLOAD_SECRET) {
        throw new Error("Payload secert is missing")
    }

    if(cached.client) {
        return cached.client
    }

    if(!cached.promise) {
        // payload 初始化赋值
        cached.promise = payload.init({
            secret: process.env.PAYLOAD_SECRET,
            local: initOptions?.express ? false : true,
            ...(initOptions || {})
        })
    }
}
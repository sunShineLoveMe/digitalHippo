import dotenv from 'dotenv';
import path from 'path';
import { InitOptions } from 'payload/config';
import payload, { Payload } from 'payload';
import nodemailer from 'nodemailer';

dotenv.config({ 
    path: path.resolve(__dirname, '../.env') 
});

const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    secure: true,
    port: 465,
    auth: {
        user:'resend',
        pass: process.env.RESEND_API_KEY
    }
})

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
/**
 * Retrieves the payload client asynchronously.
 * @param {Args} [initOptions] - The initialization options for the payload client.
 * @returns {Promise<Payload>} - A promise that resolves to the payload client.
 * @throws {Error} - Throws an error if the payload secret is missing.
 */
export const getPayloadClient = async ({
    initOptions,
}: Args = {}): Promise<Payload> => {
    if(!process.env.PAYLOAD_SECRET) {
        throw new Error("Payload secert is missing")
    }

    if(cached.client) {
        return cached.client
    }

    if(!cached.promise) {
        // payload 初始化赋值
        cached.promise = payload.init({
            email: {
                transport: transporter,
                fromAddress: "Acme <onboarding@resend.dev>",
                fromName: "DigitalHippo"
            },
            secret: process.env.PAYLOAD_SECRET,
            local: initOptions?.express ? false : true,
            ...(initOptions || {})
        })
    }
    try {
        cached.client = await cached.promise
    } catch (e: unknown) {
        cached.promise = null
        throw e
    }
    return cached.client
}
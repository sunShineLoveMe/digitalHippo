import dotenv from 'dotenv';
import path from 'path';
import { InitOptions } from 'payload/config';
import payload from 'payload';

dotenv.config({ 
    path: path.resolve(__dirname, '../.env') 
});

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
        cached.promise = payload.init({
            secret: process.env.PAYLOAD_SECRET,
            local: initOptions?.express ? false : true,
            ...(initOptions || {})
        })
    }
}
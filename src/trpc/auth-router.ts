import { AuthCredentialsValidator } from "../lib/validators/account-credential-validators";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";

/**
 * trpc库创建的路由函数
 * 用于处理用户注册请求
 */
export const authRouter = router({
    /**
     * 接受一个包含email 和 password属性的输入对象。在函数内部，首先从payloadClient中获取payload对象。
     * 通过payload对象的find方法，查找是否已经存在具有相同邮箱的用户。如果存在，抛出CONFLICT错误。
     * 如果不存在，调用payload对象的create方法，创建一个新用户，包含email, password, role属性。
     * 并返回一个包含success和sentToEmail属性的对象。
     */
    createPayloadUser:
         publicProcedure.input(AuthCredentialsValidator).mutation(async({input}) => {
            const { email, password } = input
            const payload = await getPayloadClient()

            // check if user already exists
            const {docs: users} = await payload.find({
                collection: 'users',
                where: {
                    email: {
                        equals: email
                    }
                }
            })

            if(users.length !== 0) {
                throw new TRPCError({ code: 'CONFLICT'})
            }

            await payload.create({
                collection: 'users',
                data: {
                    email,
                    password,
                    role: "user"
                },
            })
            return { success: true, sentToEmail: email }
    })
})
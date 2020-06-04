import type { MiddlewareFunc } from 'https://deno.land/x/abc@v1.0.0-rc10/mod.ts'
import { validateJwt } from "https://deno.land/x/djwt/validate.ts"

import { api } from '../config/local.ts'
const authenticate = async (context: any, next: any) => {
    try {
        const token = context.request.headers.get('Authorization').split(' ')[1]
        
        if (!!token) {
            context.response.body = {
                code: 403,
                name: 'Invalid token'
            }
        }

        const decode = await validateJwt(token, api.secret)

        context.request.user = decode
        return next(context);

    } catch (error) {
        context.response.body = {
            code: 403,
            name: 'Invalid token'
        }
    }
};

export default authenticate
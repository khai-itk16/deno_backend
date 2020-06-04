import { insert, search, update, remove, findByUsername } from '../services/account.service.ts'
import { accountInterface } from '../model/accountInterface.ts'
import { api } from '../config/local.ts'
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts"


async function login (context: any) {
    try {
        const data = await context.request.body()
        const { email, password } = data.value
        console.log(data.value)
        if (!email || !password || typeof email === 'undefined'|| typeof password === 'undefined'
        || email === '') {
            
            context.response.status = 400
            context.response.body = {
                error: 401,
                message: 'invalid username or password'
            }

            return
        }

        const user = await findByUsername(email)

        if (!user || typeof user === 'undefined') {
            
            context.response.status = 400
            context.response.body = {
                error: 401,
                message: 'invalid username'
            }

            return
        }

        if (password.toString() !== user.password.toString()) {
            context.response.status = 400
            context.response.body = {
                error: 401,
                message: 'invalid password'
            }

            return
        }

        const header: Jose = {
            alg: "HS256",
            typ: "JWT",
        }

        const payload: Payload = {
            account_id: user.account_id,
            email
        }
        const key = api.secret

        const token = makeJwt({ header, payload, key})
        context.response.body = {
            accessToken: token
        }

        return

    } catch (error) {
        
    }
}

async function signUp (context: any) {
    try {
        const data = await context.request.body()
        const { username, password, fullname } = data.value
        if (!username || password || typeof username === 'string'|| typeof password === 'string'
        || username === '') {
            context.response.body = {
                error: 401,
                message: 'invalid username or password'
            }
        }

        const user = await findByUsername(username)

        if (user) {
            context.response.body = {
                error: 400,
                message: 'this username isalready exist'
            }
        }

        const newAccount = await insert({fullname, username, password}) 

        const header: Jose = {
            alg: "HS256",
            typ: "JWT",
        }

        const payload: Payload = {
            account_id: newAccount.lastInsertId,
            email: username
        }
        const key = api.secret

        const token = makeJwt({ header, payload, key})
        context.response.body = {
            accessToken: token
        }

    } catch (error) {
        
    }
}



async function addAccount ({ request, response }: { request: any; response: any }) {
    const body = await request.body();
    const accountInfo: accountInterface = body.value;
    let status = 200;

    if (accountInfo.hasOwnProperty('fullname') && accountInfo.hasOwnProperty('username') && accountInfo.hasOwnProperty('password') ) {
      response.body = await insert(accountInfo);
    } else {
      response.body = { "error": "Invalid request!" };
      status = 400;
    }

    response.status = status;
}

async function getAccount ({ params, response }: { params: any; response: any }) {
    const result = await search(params);
    response.body = result.rows;
}

async function updateAccount ({ request, response, params }: { request: any; response: any; params: any }) {
    const body = await request.body();
    let responseMessage = {};
    const accountInfo: accountInterface = body.value; 
    responseMessage = await update(accountInfo.fullname, accountInfo.password, params.id);
    response.body = responseMessage;
}

async function deleteAccount ({ params, response }: { params: any; response: any }) {
    let responseMessage = {};
    responseMessage = await remove(params.id);
    response.body = responseMessage;
}

export default {
    addAccount,
    getAccount,
    updateAccount,
    deleteAccount,
    login,
    signUp
}
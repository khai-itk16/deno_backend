import client from '../connection/connectMysql.ts'

interface Key {
    id?: any
}

export async function insert({ fullname, username, password }: { fullname: string; username: string; password: string }) {
    return await client.execute(`INSERT INTO accounts(fullname, username, password) values(?,?,?)`, [
        fullname, username, password
    ]);
}

export async function search(params:Key = {}) { 
    const isSpecific = Object.keys(params).length !== 0;
    if (isSpecific) {
        return await client.execute(`SELECT * FROM accounts WHERE account_id = ?`, [params.id]);
    } else {
        return await client.execute(`SELECT * FROM accounts`);   
    }
}

export async function findByUsername(username: string) { 
    try {
        const account: any = await client.execute(`SELECT * FROM accounts WHERE username = "${username}"`);
        return account.rows[0]
    } catch (error) {
        
    }
}

export async function update(fullname: string, password: string, id: number) {
    return await client.execute(`UPDATE card SET fullname= ?, password= ? WHERE account_id = ?`, [
        fullname, password, id
    ]);
}

export async function remove(id: number) {
    return await client.execute(`DELETE FROM account WHERE account_id = ?`, [id]); 
}
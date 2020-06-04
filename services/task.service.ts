import db from '../connection/connectMysql.ts'
import { Task, status, FindMany, UpdateOne, FindOne, Filter } from '../model/task.model.ts'
import { buildWhereClause, buildInsertQuery } from '../helper/get.ts'

export const createOne= async (task: Task) => {
    try {
        const sql = `INSERT INTO task (taskName, startTime, endTime, finished, status, account_id) 
        VALUES ("${task.taskName}", "${task.startTime}", "${task.endTime}", false, "${status.OPEN}", ${task.account_id})`

        console.log(sql)

        const newTask = await db.execute(sql)
        return newTask
    } catch (error) {
        throw error
    }
}

export const findMany = async (findmany: FindMany) => {
    try {

        const query = buildWhereClause(findmany)
        const sql = `SELECT * FROM task ${query}`

        console.log(sql)

        const result = await db.execute(sql)

        return result.rows
    } catch (error) {
        console.log(error)
        throw error
    }
}


export const filter = async (filter: Filter) => {
    try {

        //const query = buildWhereClause(findmany)
        const sql = `SELECT * FROM task where account_id = ${filter.account_id} and (taskName like "%${filter.keySearch}%"
        or status like "%${filter.keySearch}%")`

        console.log(sql)

        const result = await db.execute(sql)

        return result.rows
    } catch (error) {
        console.log(error)
        throw error
    }
}











export const updateOne = async (findOne: FindOne, updateOne: UpdateOne) => {
    try {
        const insert = buildInsertQuery(updateOne)
        const sql = `UPDATE task 
        SET ${insert}
        WHERE taskId = ${findOne.taskId}`

        console.log(sql)

        const result = await db.execute(sql)

        return result
        
    } catch (error) {
        throw error
    }
}

export const deleteOne = async (taskId: any) => {
    try {
        const sql = `DELETE FROM task WHERE taskId = ${taskId}`

        console.log(sql)

        await db.execute(sql)

        return true
        
    } catch (error) {
        throw error
    }
}
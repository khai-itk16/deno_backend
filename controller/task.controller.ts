import { createOne, findMany, updateOne, deleteOne, filter } from '../services/task.service.ts'
import { Task, status } from '../model/task.model.ts'
async function getTask (context: any) {
    try {
        const query = await context.request.body()
        const credential: any = context.request.user.payload


        const tasks = await findMany({ account_id: credential.account_id, ...query.value})

        context.response.body = {
            isSuccess: true,
            list: tasks
        }
    } catch (error) {
        context.response.body = error
    }
}

async function search (context: any) {
    try {
        const credential: any = context.request.user.payload
        const  keySearch: string = context.params.keySearch

        const tasks = await filter({ account_id: credential.account_id, keySearch })

        context.response.body = {
            isSuccess: true,
            list: tasks
        }
    } catch (error) {
        context.response.body = error
    }
}

async function createTask (context: any) {
    try {
        // const user = 
        const task = await (context.request.body())
        
        const credential: any = context.request.user.payload

        const newTask = await createOne({ account_id: credential.account_id, ...task.value})

        context.response.body = {
            isSuccess: true,
            data: newTask,
        }
    } catch (error) {
        console.log(error)
    }
}

async function updateTask (context: any) {
    try {
        console.log('OKE')
        const { taskId } = context.params

        const update = await context.request.body()

        const updateTask = await updateOne({taskId}, update.value)

        context.response.body = {
            isSuccess: true,
            data: updateTask,
        }

        return
    } catch (error) {
        context.response.body = error
    }
}

async function deleteTask (context: any) {
    try {
        const taskId = context.params.taskId

        const updateTask = await deleteOne(taskId)

        context.response.body = {
            isSuccess: true,
        }

        return
    } catch (error) {
        context.response.body = error
    }
}

export default {
    getTask,
    createTask,
    updateTask,
    deleteTask,
    search
}
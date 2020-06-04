import { Router } from 'https://deno.land/x/oak/mod.ts'
import taskController from './controller/task.controller.ts'
import accountController from './controller/account.controller.ts'
import authenticate from './middleware/authenticate.ts'

const router = new Router()

router.get('/tasks',authenticate , taskController.getTask)
router.post('/task',authenticate, taskController.createTask)
router.put('/task/:taskId',authenticate, taskController.updateTask)

router.get('/account/get/:id',authenticate, accountController.getAccount);
router.post('/account/add',authenticate, accountController.addAccount);
router.put('/account/update/:id',authenticate, accountController.updateAccount);
router.delete('/account/delete/:id',authenticate, accountController.deleteAccount);

router.post('/auth/login', accountController.login)
router.post('/auth/signUp', accountController.signUp)

export default router
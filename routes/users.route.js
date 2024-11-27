import express from 'express'

import { changeUserRole, deleteUser, getAllUsers,createUser } from '../controllers/users.controller.js';

const route=express.Router()

route.get('/getAllUsers',getAllUsers)

route.post('/rolechange',changeUserRole)
route.post('/create',createUser)
route.delete('/delete/:userId',deleteUser)

export default route
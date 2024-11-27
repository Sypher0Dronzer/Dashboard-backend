import express from 'express'
import { createPermission, deletePermission, getAllPermissions } from '../controllers/permission.controller.js'



const route=express.Router()

route.get('/getAllPermissions',getAllPermissions)
route.delete('/delete/:permissionId',deletePermission)
route.post('/create',createPermission)

export default route
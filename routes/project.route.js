import express from 'express'
import { addMembersToProject, createProject, deleteProject, getAllProjects, removeMembersFromProject } from '../controllers/project.controller.js'

const route=express.Router()
route.get('/allProjects',getAllProjects)
route.post('/create',createProject)
route.delete('/delete/:projectId',deleteProject)
route.post('/addMembers',addMembersToProject)
route.post('/removeMembers',removeMembersFromProject)


export default route
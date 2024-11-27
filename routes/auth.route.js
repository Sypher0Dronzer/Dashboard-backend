import express from 'express'
import { authCheck,  login, logout, signup } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'


const route=express.Router()
// const users = [
//     {
//       name: "Liam Carter",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//       email: "liam.carter@example.com",
//       role: "manager",
//     },
//     {
//       name: "Olivia Martinez",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1494790108377-be9c29b29330.webp",
//       email: "olivia.martinez@example.com",
//       role: "contributor",
//     },
//     {
//       name: "Noah Davis",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1502767089025-6572583495b6.webp",
//       email: "noah.davis@example.com",
//       role: "admin",
//     },
//     {
//       name: "Emma Wilson",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1525332540231-6a7d27e88cc5.webp",
//       email: "emma.wilson@example.com",
//       role: "manager",
//     },
//     {
//       name: "James Brown",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1534528573215-7dc85a0f5fc4.webp",
//       email: "james.brown@example.com",
//       role: "admin",
//     },
//     {
//       name: "Sophia Turner",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1544725176-7c40e5a9d3f6.webp",
//       email: "sophia.turner@example.com",
//       role: "contributor",
//     },
//     {
//       name: "Benjamin White",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//       email: "benjamin.white@example.com",
//       role: "admin",
//     },
//     {
//       name: "Charlotte King",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1494790108377-be9c29b29330.webp",
//       email: "charlotte.king@example.com",
//       role: "manager",
//     },
//     {
//       name: "William Hall",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1502767089025-6572583495b6.webp",
//       email: "william.hall@example.com",
//       role: "admin",
//     },
//     {
//       name: "Isabella Scott",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1525332540231-6a7d27e88cc5.webp",
//       email: "isabella.scott@example.com",
//       role: "contributor",
//     },
//     {
//       name: "Henry Adams",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1534528573215-7dc85a0f5fc4.webp",
//       email: "henry.adams@example.com",
//       role: "manager",
//     },
//     {
//       name: "Mia Clark",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1544725176-7c40e5a9d3f6.webp",
//       email: "mia.clark@example.com",
//       role: "admin",
//     },
//     {
//       name: "Lucas Baker",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//       email: "lucas.baker@example.com",
//       role: "contributor",
//     },
//     {
//       name: "Amelia Parker",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1494790108377-be9c29b29330.webp",
//       email: "amelia.parker@example.com",
//       role: "manager",
//     },
//     {
//       name: "Ethan Perez",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1502767089025-6572583495b6.webp",
//       email: "ethan.perez@example.com",
//       role: "admin",
//     },
//     {
//       name: "Harper Evans",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1525332540231-6a7d27e88cc5.webp",
//       email: "harper.evans@example.com",
//       role: "contributor",
//     },
//     {
//       name: "Alexander Collins",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1534528573215-7dc85a0f5fc4.webp",
//       email: "alexander.collins@example.com",
//       role: "manager",
//     },
//     {
//       name: "Ava Bell",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1544725176-7c40e5a9d3f6.webp",
//       email: "ava.bell@example.com",
//       role: "admin",
//     },
//     {
//       name: "Michael Young",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//       email: "michael.young@example.com",
//       role: "manager",
//     },
//     {
//       name: "Emily Sanchez",
//       profilePic: "https://img.daisyui.com/images/stock/photo-1494790108377-be9c29b29330.webp",
//       email: "emily.sanchez@example.com",
//       role: "contributor",
//     },
//   ];

//   route.get('/test',async()=>{
//     users.forEach(async(user)=>{
//         const { name, email,role } = user;
//         const password='123456'
//         const salt = await bcryptjs.genSalt(10);
//     const hashedPassword = await bcryptjs.hash(password, salt);
//     const existingUserByEmail = await userModel.findOne({ email });
    

//         const newUser = new userModel({
//             name,
//             email,
//             password: hashedPassword,
//             projects:[],
//             role ,
//           });
      
//           await newUser.save();
    
//     })
//   })
route.post('/signup',signup)

route.post('/login',login)
route.post('/logout',logout)
route.get('/authcheck',protectRoute, authCheck)

export default route
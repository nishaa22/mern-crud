import express from 'express'
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/user.controller.js'

const router = express.Router()

router.get("/users", getUsers)
router.post("/users", createUser)
router.get("/users/:id", getUserById)
router.put("/users/:id", updateUser)
router.delete("/users/:id", deleteUser)

export const userRoutes = router;

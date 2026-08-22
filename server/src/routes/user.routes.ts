import { Router } from "express";
import { googleSignIn, searchUser, signIn, signUp } from "../controller/user.controller.js";
import { deleteChat, getFriends, getMessages } from "../controller/message.controller.js";
const router = Router()

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.post('/google-sign-in', googleSignIn)
router.get('/users/search', searchUser)
router.get('/fetch-messages', getMessages)
router.get('/fetch-friends', getFriends)
router.delete('/delete-chat', deleteChat)

export default router
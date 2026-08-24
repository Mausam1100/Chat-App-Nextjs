import { Router } from "express";
import { editProfile, googleSignIn, searchUser, signIn, signUp } from "../controller/user.controller.js";
import { deleteChat, getFriends, getMessages } from "../controller/message.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
const router = Router();
router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/google-sign-in', googleSignIn);
router.get('/users/search', authMiddleware, searchUser);
router.get('/fetch-messages', authMiddleware, getMessages);
router.get('/fetch-friends', authMiddleware, getFriends);
router.delete('/delete-chat', authMiddleware, deleteChat);
router.put('/profile', authMiddleware, upload.single('image'), editProfile);
export default router;
//# sourceMappingURL=user.routes.js.map
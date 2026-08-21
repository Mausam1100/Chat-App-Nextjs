import { Router } from "express";
import { googleSignIn, signIn, signUp } from "../controller/user.controller.js";
const router = Router();
router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/google-sign-in', googleSignIn);
export default router;
//# sourceMappingURL=user.routes.js.map
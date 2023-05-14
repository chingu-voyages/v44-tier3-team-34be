import { Router } from "express";
import * as postsCtrl from '../controllers/posts.js'
import { decodeUserFromToken , checkAuth} from "../middleware/auth.js";

const router = Router ()

// ========== Public Routes ===========

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/', checkAuth, postsCtrl.index)
router.get('/:id', checkAuth, postsCtrl.show)
router.post('/', checkAuth, postsCtrl.create)
router.put('/:id', checkAuth, postsCtrl.update)



export { router }
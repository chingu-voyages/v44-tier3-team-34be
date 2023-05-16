import { Router } from 'express';
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";
import { repost } from '../controllers/repost.js';


const router = Router();

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, repost)

export { router }

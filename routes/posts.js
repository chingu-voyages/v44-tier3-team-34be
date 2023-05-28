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
router.post('/:id/comments', checkAuth, postsCtrl.createComment)
//reactions and "likes"
router.post('/:id/reactions', checkAuth, postsCtrl.createReaction)

router.put('/:id', checkAuth, postsCtrl.update)

router.put('/:postId/comments/:commentId', checkAuth, postsCtrl.updateComment)

router.delete('/:id', checkAuth, postsCtrl.delete)
//the author of the post and the comment can delete the comment
router.delete('/:postId/comments/:commentId', checkAuth, postsCtrl.deleteComment)

router.delete('/:postId/reactions/:reactionId', checkAuth, postsCtrl.deleteReaction)



export { router }
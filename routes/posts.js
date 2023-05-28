import { Router } from "express";
import * as postsCtrl from '../controllers/posts.js'
import { decodeUserFromToken , checkAuth} from "../middleware/auth.js";

const router = Router ()

// ========== Public Routes ===========

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)

//index posts
router.get('/', checkAuth, postsCtrl.index)
//show one specific post
router.get('/:id', checkAuth, postsCtrl.show)
//create post 
router.post('/', checkAuth, postsCtrl.create)
//create comment
router.post('/:id/comments', checkAuth, postsCtrl.createComment)
//reactions and "likes"
router.post('/:id/reactions', checkAuth, postsCtrl.createReaction)
//update post
router.put('/:id', checkAuth, postsCtrl.update)
//update comments
router.put('/:postId/comments/:commentId', checkAuth, postsCtrl.updateComment)
//delete post
router.delete('/:id', checkAuth, postsCtrl.delete)
//the author of the post and the comment can delete the comment
router.delete('/:postId/comments/:commentId', checkAuth, postsCtrl.deleteComment)
//delete reaction
router.delete('/:postId/reactions/:reactionId', checkAuth, postsCtrl.deleteReaction)



export { router }
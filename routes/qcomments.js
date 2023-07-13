import express from "express"

import { postqComment, deleteComment} from '../controllers/qcomments.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.patch('/addcomment/:id', auth, postqComment)
router.patch('/deletecomment/:id',auth, deleteComment)

export default router

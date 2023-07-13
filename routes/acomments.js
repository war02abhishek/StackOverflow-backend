import express from "express"

import { postaComment, deleteaComment} from '../controllers/acomments.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.patch('/addcomment/:id', auth, postaComment)
router.patch('/deleteacomment/:id',auth, deleteaComment)

export default router

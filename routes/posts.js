const express = require('express')
const router = express.Router()
const Controllers = require('../Controllers/postsController')
const { isAuth } = require('../middlewares')


router.get('/' , isAuth, Controllers.allPosts)
router.post('/createpost' , isAuth, Controllers.createPost)
router.get('/singlepost/:id' , isAuth, Controllers.getSinglePost)
router.get('/deletepost' , isAuth , Controllers.deletPost)
router.put('/editpost' , isAuth , Controllers.editPost)



module.exports = router
var express = require("express");
var router = express.Router();
var comController = require("../Controllers/comController");
var { isAuth } = require("../middlewares");

router.post("/createcomment", isAuth, comController.createComment);
router.get("/", isAuth, comController.getAllPosts);
router.post("/getCommentsByPostId", isAuth, comController.getCommentsByPostId);
router.put("/editcomment", isAuth, comController.editComment);

module.exports = router;

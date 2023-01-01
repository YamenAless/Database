var express = require("express");
var router = express.Router();
var controllers = require("../controllers/userController");
var { isAuth } = require("../middlewares");

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("users page");
});
router.post("/signup", controllers.signUp);
router.post("/login", controllers.login);
router.put("/update", isAuth, controllers.update);
router.get("/me", isAuth, controllers.myPorfile);

module.exports = router;

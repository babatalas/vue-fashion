const router = require("express").Router();
const { authentication } = require("../middlewares/authUser");
const UsersController = require("../controllers/UsersController");

router.route("/login").post(UsersController.login);
router.route("/register").post(UsersController.register);
router.route("/me").post(authentication, UsersController.me);
router.route("/googleLogin").post(UsersController.googleLogin);

router
    .route("/")
    .get((_, res) => res.status(200).json({ data: { status: "ok" } }));

module.exports = router;

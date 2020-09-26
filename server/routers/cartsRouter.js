const router = require("express").Router();
const Controller = require("../controllers/CartsController");
const {
    authentication,
    authorization,
    cartAuthorization,
} = require("../middlewares/authUser");

router.use(authentication);
router.route("/").get(Controller.getMany).post(Controller.createOne);

router.use(cartAuthorization);
router.route("/").delete(Controller.delete).put(Controller.update);

router.route("/checkout").post(Controller.checkout);

module.exports = router;

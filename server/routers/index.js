const router = require("express").Router();
const AppError = require("../helpers/appError");
const specialRouter = require("./specialRouter");
const productsRouter = require("./productsRouter");
const cartsRouter = require("./cartsRouter");

router.use("/", specialRouter);
router.use("/carts", cartsRouter);
router.use("/products", productsRouter);

router.all("*", (req, res, next) => {
    next(new AppError(`CANT_FIND_ENDPOINT`, 404));
});

module.exports = router;

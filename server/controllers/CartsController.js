const { Product, Cart, User } = require("../models");
const AppError = require("../helpers/appError");

class CartsController {
    static getMany(req, res, next) {
        const { id } = req.user;
        User.findByPk(id, {
            include: [{ model: Product }],
        })
            .then((result) => {
                // console.log(result.Products)
                // const cart = result.Products.map(el => {
                //   let item = {}
                //   item = el.Cart
                //   item.Product = el
                //   return item
                // });
                res.status(200).json(result.Products);
            })
            .catch((err) => {
                next(err);
            });
    }

    static createOne(req, res, next) {
        const { ProductId, quantity } = req.body;
        const UserId = req.user.id;
        Cart.create({ ProductId, UserId, quantity })
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((err) => next(err));
    }

    static update(req, res, next) {
        const { ProductId, quantity } = req.body;
        const UserId = req.user.id;
        Cart.update(
            {
                ProductId,
                UserId,
                quantity,
            },
            { where: { ProductId, UserId } }
        )
            .then((result) => {
                res.status(200).json({ ProductId, UserId, quantity });
            })
            .catch((err) => next(err));
    }

    static delete(req, res, next) {
        const { ProductId } = req.body;
        const UserId = req.user.id;
        Cart.destroy({ where: { ProductId, UserId } })
            .then((result) => {
                if (result === 0) {
                    next({ name: "CART_NOT_FOUND" });
                    return;
                } else {
                    res.status(200).json({
                        cartItem: { ProductId: Number(ProductId), UserId },
                    });
                }
            })
            .catch((err) => next(err));
    }

    static checkout(req, res, next) {
        const UserId = req.user.id;
        User.findByPk(UserId, {
            include: [{ model: Product }],
        })
            .then((result) => {
                console.log(result.Products);
                result.Products.forEach((el) => {
                    try {
                        Product.update(
                            {
                                stock: el.stock - el.Cart.quantity,
                            },
                            {
                                where: {
                                    id: el.id,
                                },
                            }
                        );
                    } catch (err) {
                        throw err;
                    }
                });
            })
            .then(() => Cart.destroy({ where: { UserId } }))
            .then((result) => {
                if (result === 0) {
                    next({ name: "CART_NOT_FOUND" });
                    return;
                } else {
                    // actually it should be create record for a transaction
                    res.status(200).json({ cart: [] });
                }
            })
            .catch((err) => {
                next(err);
            });

        // Cart.destroy({ where : { UserId }})
        //   .then(result => {
        //     if(result === 0){
        //       next({ name: 'CART_NOT_FOUND' })
        //       return
        //     }else{
        //       // actually it should be create record for a transaction
        //       res.status(200).json({ cart: [] })
        //     }
        //   })
        //   .catch(err => next(err))
    }
}

module.exports = CartsController;

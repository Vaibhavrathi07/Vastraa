const order = require("../models/orderModel.js");
const product = require("../models/productModel.js");


// Create new Order
export const newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });
});

// get Single Order
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (!order) {
        res.json({
            success: false,
            message: "Order not found with this Id",
        });
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// get logged in user  Orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders,
    });
});

// get all Orders -- Admin
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

// update Order Status -- Admin
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await order.findById(req.params.id);

    if (!order) {
      res.json({
        success: false,
        message: "Order not found with this Id",
      })
    }

    if (order.orderStatus === "Delivered") {
       res.json({
        success: false,
        message: "You have already delivered this order",
       })
    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
        });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await order.findById(req.params.id);

    if (!order) {
        res.json({
            success: false,
            message: "Order not found with this Id",
        });
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
});
module.exports = {
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder,
};
const express = require("express");

const { OrderItem } = require("../models/order-item");
const { Order } = require("../models/order");

exports.getAllOrders = async (req, res) => {
  try {
    const orderList = await Order.find()
      .populate("user", "name")
      .sort({ dateOrdered: -1 });

    if (!orderList) {
      return res
        .status(500)
        .json({ success: false, message: "There is no order list!" });
    }
    res.send(orderList);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          populate: "category",
        },
      });

    if (!order) {
      return res
        .status(500)
        .json({ success: false, message: "This order doesn't exist!" });
    }
    res.send(order);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.addOrder = async (req, res) => {
  try {
    const orderItemsIds = await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
      })
    );
    const totalPrices = await Promise.all(
      orderItemsIds.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price"
        );
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
      orderItems: orderItemsIds,
      shippingAddress: req.body.shippingAddress,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: totalPrice,
      user: req.body.user,
    });

    order = await order.save();

    if (!order) {
      return res.status(400).send("This order cannot be created!");
    }

    res.send(order);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update an order by id
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.shippingAddress = req.body.shippingAddress || order.shippingAddress;
    order.city = req.body.city || order.city;
    order.zip = req.body.zip || order.zip;
    order.country = req.body.country || order.country;
    order.phone = req.body.phone || order.phone;
    order.status = req.body.status || order.status;

    const updatedOrder = await order.save();

    if (!updatedOrder) {
      return res.status(400).json({ success: false, message: "Failed to update order" });
    }

    res.status(200).json({ success: true, message: "Order updated successfully", data: updatedOrder });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndRemove(req.params.id);

    if (order) {
      await Promise.all(
        order.orderItems.map(async (orderItem) => {
          await OrderItem.findByIdAndRemove(orderItem);
        })
      );
      return res
        .status(200)
        .json({ success: true, message: "The order is deleted!" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Order not found!" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getTotalSales = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
    ]);

    if (!totalSales) {
      return res.status(400).send("The order sales cannot be generated");
    }

    res.send({ totalsales: totalSales.pop().totalsales });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get the count of all orders
exports.howManyOrders = async (req, res) => {
  try {
    const orderCount = await Order.countDocuments((count) => count);

    if (!orderCount) {
      res.status(500).json({ success: false });
    }
    res.send({
      orderCount: orderCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all the orders a specific user has made
exports.getAllUserOrders = async (req, res) => {
  try {
    const userOrderList = await Order.find({ user: req.params.userid })
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          populate: "category",
        },
      })
      .sort({ dateOrdered: -1 });

    if (!userOrderList) {
      res.status(500).json({ success: false });
    }
    res.send(userOrderList);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

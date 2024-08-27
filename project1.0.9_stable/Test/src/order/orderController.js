const express = require('express');
const router = express.Router();
const orderService = require('./orderService');

// Create a new order
async function createOrderController(req, res){
  console.log(JSON.stringify(req.body)+',req.body -> createOrderController');
  try {
    const orderDetails = req.body; // Assuming req.body contains order details
    const order = await orderService.createOrder(orderDetails);
    res.status(201).json('Order created successfully');
    return order;
  } catch (error) {
    console.error('Error in createOrderController:', error.message);
    res.status(500).json({ error: 'Failed to create order -> orderController WTF' });
  }
}

// Delete an order by ID
async function deleteOrderController(req, res){
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await orderService.deleteOrder(orderId);
    if (deletedOrder) {
      res.status(200).json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
}

async function markDishOrderAsComplete(req, res) {
  console.log(JSON.stringify(req.body)+',req.body -> markDishOrderAsComplete');
    try {
      const orderId = req.params.orderId; // Extract order ID from request params
      await orderService.markDishOrderAsComplete(orderId);
      res.status(200).json({ message: 'Order marked as complete' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to mark order as complete' });
    }
}


async function markDrinkOrderAsComplete(req, res) {
  console.log(JSON.stringify(req.body)+',req.body -> markDrinkOrderAsComplete');
    try {
      const orderId = req.params.orderId; // Extract order ID from request params
      await orderService.markDrinkOrderAsComplete(orderId);
      res.status(200).json({ message: 'Order marked as complete' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to mark order as complete' });
    }
}

async function getOrderById(req,res){
  //console.log(req.params.orderId+',req.body -> OrderController gerorderByI');
  try{
  const orderId = req.params.orderId;
    const received = await orderService.getOrderById(orderId);
    //console.log(received + 'received -> orderController');

    res.status(200).json(received);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get order ->OrderController gerorderById' });
  }
}

//Get all orders for the waiter/cashier
async function getAllOrders(req,res){
  try{
      const received = await orderService.getAllOrdersFn();
      //console.log(received + 'received -> getNewOrders orderController');
  
      res.json(received);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get new order ->OrderController getNewOrders' });
    }  
}

//Get all finished dish orders for the waiter/cashier
async function getFinishedOrders(req,res){
  try{
      const received = await orderService.getFinishedOrdersFn();
      //console.log(received + 'received -> getNewOrders orderController');
  
      res.json(received);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get order ->OrderController getNewOrders' });
    }  
}

//Get all finished dish orders for the waiter/cashier
async function getFinishedDishOrders(req,res){
  try{
      const received = await orderService.getFinishedDishOrdersFn();
      //console.log(received + 'received -> getNewOrders orderController');
  
      res.json(received);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get order ->OrderController getNewOrders' });
    }  
}

//Get all finished orders for the waiter/cashier
async function getFinishedDrinkOrders(req,res){
  try{
      const received = await orderService.getFinishedDrinkOrdersFn();
      //console.log(received + 'received -> getNewOrders orderController');
  
      res.json(received);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get order ->OrderController getNewOrders' });
    }  
}

//Get all new orders for the cook
async function getNewOrdersCook(req,res){
  try{
      const received = await orderService.getNewOrdersCookFn();
      //console.log(received + 'received -> getNewOrders orderController');
  
      res.json(received);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get new order ->OrderController getNewOrders' });
    }  
}

//Get all new orders for the barista
async function getNewOrdersBar(req,res){
  try{
      const received = await orderService.getNewOrdersBarFn();
      //console.log(received + 'received -> getNewOrders orderController');
  
      res.json(received);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get new order ->OrderController getNewOrders' });
    }  
}

//Set order preparation flag to true
async function setDishInPrep(req, res) {
  try {
    //console.log('Request Body:', JSON.stringify(req.body)); // Check req.body
    const received = await orderService.setDishInPrepFn(req);
    //console.log('Preparation Result:', JSON.stringify(received)); // Check received result
    console.log("Dish has start preparation");
    res.json(received);
  } catch (error) {
    console.error('Error updating order setInPreparationCont:', error.message);
    res.status(500).json({ error: 'Failed to update order -> OrderController setInPreparation' });
  }
}

async function setDrinkInPrep(req, res) {
  try {
    //console.log('Request Body:', JSON.stringify(req.body)); // Check req.body
    const received = await orderService.setDrinkInPrepFn(req);
    //console.log('Preparation Result:', JSON.stringify(received)); // Check received result
    console.log("Drink has start preparation");
    res.json(received);
  } catch (error) {
    console.error('Error updating order setInPreparationCont:', error.message);
    res.status(500).json({ error: 'Failed to update order -> OrderController setInPreparation' });
  }
}



//Set order DishComplete flag to true
async function setDishComplete(req,res){
  try{
      //const tableNumber = req.params.tableNumber;
      const received = await orderService.setDishCompleteFn(req);
      //console.log('Complete Result:', JSON.stringify(received)); // Check received result
      console.log("Dish has been complete");
      res.json(received);
  } catch (error) {
    console.error('Error updating order setDishCompleteCont:', error.message);
    res.status(500).json({ error: 'Failed to get order ->OrderController gerorderById' });
  }
}

async function setDrinkComplete(req,res){
  try{
      //const orderId = req.params.orderId;
      const received = await orderService.setDrinkCompleteFn(req);
      //console.log('Complete Result:', JSON.stringify(received)); // Check received result
      console.log("Drink has been complete");
      res.json(received);
  } catch (error) {
    console.error('Error updating order setDishCompleteCont:', error.message);
    res.status(500).json({ error: 'Failed to get order ->OrderController gerorderById' });
  }
}

async function getOrderDetailsByTableNumber(req, res) {
  const tableNumber = req.params.tableNumber;
  try {
    //const orders = await Order.find({ tableNumber });
    const orders = await orderService.getOrderDetailsByTableNumberFn(req);
    if (!orders || orders.length === 0) {
      res.status(404).json({ status: false, message: 'No orders found for the provided table number' });
      return;
    }
    console.log('Complete Result:', JSON.stringify(orders)); // Check received result
    res.json(orders);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ status: false, message: 'An error occurred while fetching order details' });
  }
}

async function deleteOrderById(req, res){
  try {
    console.log(JSON.stringify(req.params)+',req.body -> OrderController');
    const updatedTable = await tableService.deleteOrderByIdFn(req.params);
    
    if (!updatedTable) {
      res.status(404).json({ message: `Order not found` });
    }

    res.json("Order Deleted");
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal server error' + req.body });
  }
}

module.exports = {
    markDishOrderAsComplete,
    markDrinkOrderAsComplete,
    createOrderController,
    deleteOrderController,
    getOrderById,
    getNewOrdersCook,
    getNewOrdersBar,
    setDishInPrep,
    setDrinkInPrep,
    setDishComplete,
    setDrinkComplete,
    getOrderDetailsByTableNumber,
    getAllOrders,
    deleteOrderById,
    getFinishedOrders,
    getFinishedDishOrders,
    getFinishedDrinkOrders
};

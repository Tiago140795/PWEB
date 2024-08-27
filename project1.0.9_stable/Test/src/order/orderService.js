const Order = require('./orderModel');

async function createOrder(req,res) {
    const orderDetails = req; // Assuming the order details are in the request body
    console.log(JSON.stringify(req)+'orderDetails -> orderService');
    const newOrder = new Order(orderDetails);
    console.log(JSON.stringify(newOrder)+'orderDetails -> orderService');
    return await newOrder.save();
    

}

async function deleteOrder(orderId) {
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    return deletedOrder;
  } catch (error) {
    throw error;
  }
}

async function markDishOrderAsComplete(orderId) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      order.dishComplete = true;
      await order.save();
    } catch (error) {
      throw error;
    }
}

async function markDrinkOrderAsComplete(req, res) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      order.drinkComplete = true;
      await order.save();
    } catch (error) {
      throw error;
    }
}

async function getOrderById(req) {
  try {
    const orderInt = parseInt(req)
    const received = await Order.findOne({ orderId: orderInt })
    //const received = await Order.findById(orderId);
    //console.log(JSON.stringify(received) + 'received stringify-> orderService');
    console.log(received + 'received -> orderService');
    return received;

  } catch (error) {
    console.log(re,parseInt(req) +',orderId -> OrderService gerorderByI');
    return{ status: 500, error: 'Failed to get order by Id -> orderService' };
  }
}

async function getAllOrdersFn(req,res){
  try {
    const allOrders = await Order.find();
    return allOrders;
  } catch (error) {
    console.error('Error fetching incomplete orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getFinishedOrdersFn(req,res){
  try {
    const allOrders = await Order.find({
      drinkComplete: true,
      dishComplete: true,
    });
    return allOrders;
  } catch (error) {
    console.error('Error fetching incomplete orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getFinishedDishOrdersFn(req,res){
  try {
    const allOrders = await Order.find({
      dishComplete: true,
      dishInPrep: true
    });
    return allOrders;
  } catch (error) {
    console.error('Error fetching incomplete orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getFinishedDrinkOrdersFn(req,res){
  try {
    const allOrders = await Order.find({
      drinkComplete: true,
      drinkInPrep: true,
    });
    return allOrders;
  } catch (error) {
    console.error('Error fetching incomplete orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getNewOrdersCookFn(req,res){
  try {
    const incompleteOrders = await Order.find({
      dishComplete: false,
      dishInPrep: false
    });

    return incompleteOrders; // Send the retrieved orders to the client
  } catch (error) {
    console.error('Error fetching incomplete orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getNewOrdersBarFn(req, res) {
  try {
    const incompleteOrders = await Order.find({
      drinkComplete: false,
      drinkInPrep: false
    });

    return incompleteOrders; // Send the retrieved orders to the client
  } catch (error) {
    console.error('Error fetching incomplete orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function setDishInPrepFn(req, res) {
  try {
    const orderId = req.body.orderId;
    const tableNumber = req.body.tableNumber;
    if (!orderId) {
      return res.status(400).json({ error: 'orderId is required' });
    }
    //console.log(typeof orderId, orderId + ' -> orderId setInPreparation');
    const result = await Order.findOneAndUpdate(
      { orderId: orderId, tableNumber: tableNumber},
      { dishInPrep: true },
      { new: true } // Set new: true to return the updated order
    );
    if (!result) {
      return res.status(404).json({ error: 'Order not found' });
    }
    //console.log(JSON.stringify(result));
    return result;
  } catch (error) {
    console.error('Error updating order setInPreparationServ:', error.message);
    return res.status(500).json({ error: 'Internal server error preparation orderServ' });
  }
}

async function setDrinkInPrepFn(req, res) {
  try {
    const orderId = req.body.orderId;
    const tableNumber = req.body.tableNumber;
    if (!orderId) {
      return res.status(400).json({ error: 'orderId is required' });
    }
    //console.log(typeof orderId, orderId + ' -> orderId setInPreparation');
    const result = await Order.findOneAndUpdate(
      { orderId: orderId, tableNumber: tableNumber},
      { drinkInPrep: true },
      { new: true } // Set new: true to return the updated order
    );
    if (!result) {
      return res.status(404).json({ error: 'Order not found' });
    }
    //console.log(JSON.stringify(result));
    return result;
  } catch (error) {
    console.error('Error updating order setInPreparationServ:', error.message);
    return res.status(500).json({ error: 'Internal server error preparation orderServ' });
  }
}

async function setDishCompleteFn(req,res){
  try {
    const orderId = req.body.orderId;
    const tableNumber = req.body.tableNumber;
    if (!orderId) {
      return res.status(400).json({ error: 'orderId is required' });
    }
    //console.log(typeof(orderId),orderId+' -> orderId setDishComplete')
    const result = await Order.findOneAndUpdate(
      { orderId: orderId, tableNumber: tableNumber},
      { dishComplete: true },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return result;
  } catch (error) {
    console.error('Error updating order setDishCompleteServ:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function setDrinkCompleteFn(req,res){
  try {
    const orderId = req.body.orderId;
    const tableNumber = req.body.tableNumber;
    if (!orderId) {
      return res.status(400).json({ error: 'orderId is required' });
    }
    //console.log(typeof(orderId),orderId+' -> orderId setDishComplete')
    const result = await Order.findOneAndUpdate(
      { orderId: orderId, tableNumber: tableNumber},
      { drinkComplete: true },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return result;
  } catch (error) {
    console.error('Error updating order setDishCompleteServ:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getOrderDetailsByTableNumberFn(req, res) {
  const tableNumber = req.params;
  try {
    console.log(JSON.stringify(tableNumber));
    const orders = await Order.find(tableNumber);
    if (!orders || orders.length === 0) {
      res.status(404).json({message: 'No orders found for the provided table number' });
    }

    return orders;
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({message: 'An error occurred while fetching order details' });
  }
}

async function deleteOrderByIdFn(req, res){
  const order = req.orderId;
  console.log(JSON.stringify(table)+',order -> OrderService');
  try {
    // Find and delete the document by its ID
  const deletedItem = await Table.findOneAndDelete({orderId: order});
  return deletedItem;

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = {
  createOrder,
  deleteOrder,
  markDrinkOrderAsComplete,
  markDishOrderAsComplete,
  getOrderById,
  getNewOrdersCookFn,
  getNewOrdersBarFn,
  setDishInPrepFn,
  setDrinkInPrepFn,
  setDishCompleteFn,
  setDrinkCompleteFn,
  getOrderDetailsByTableNumberFn,
  getAllOrdersFn,
  deleteOrderByIdFn,
  getFinishedOrdersFn,
  getFinishedDishOrdersFn,
  getFinishedDrinkOrdersFn
};

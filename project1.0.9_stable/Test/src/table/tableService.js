const Table = require('./tableModel');


async function createTable(tableDetails) {
    try {
      console.log(JSON.stringify(tableDetails)+',tableDetails -> TableService');
   
      const newTable = await Table.create(tableDetails);
      await newTable.save();
    } catch (error) {
      console.log(error , 'TableService');
    }
  }

  
async function getAllTables() {
  try {
    const tables = await Table.find();
    return tables;
  } catch (error) {
    console.error('Error retrieving tables:', error);
    throw error;
  }
}

async function changeTableReservationStatus(req, res) {
  console.log(JSON.stringify(req)+',req -> TableService');
  const reqtableNumber = req.tableNumber;
  const newReservationStatus = req.isReserved;

  try {
    const updatedTable = await Table.findOneAndUpdate(
      { tableNumber: reqtableNumber},
      { isReserved: newReservationStatus},
      { new: true } // Return the updated table
    );

    return updatedTable;
  } catch (error) {
    console.error('Error updating table reservation status: {|'+req+"|}", error);
  }
}

async function deleteTableByTableNumberFn(req, res){
  const table = req.parsedTableNumber;
  console.log(JSON.stringify(table)+',table -> TableService');
  try {
    // Find and delete the document by its ID
  const deletedItem = await Table.findOneAndDelete({tableNumber: table});
  return deletedItem;

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createTable, getAllTables, changeTableReservationStatus, deleteTableByTableNumberFn
};


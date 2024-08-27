var tableService = require('./tableService');

async function createTableFn(req, res){
  try {
    console.log(JSON.stringify(req.body)+',req.body -> TableController');
    //const tableDetails = req.body; // Assuming the request body contains table details
    //console.log(tableDetails+', TableController');
   
    const newTable = await tableService.createTable(req.body);
    
    //console.log("\ntableController: status " + newTable + "\n");
    res.status(201).json(newTable);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create table, table controller' + JSON.stringify(req.body)});
  }
};

async function getAllTables(req, res) {
  try {
    const tables = await tableService.getAllTables();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving tables' });
  }
}

async function changeTableReservationStatus(req, res) {
  try {
    console.log(JSON.stringify(req.body)+',req.body -> TableController');
    const updatedTable = await tableService.changeTableReservationStatus(req.body);
    
    if (updatedTable) {
      res.status(200).json({ message: 'Table deleted successfully' });
      return(updatedTable)
    } else {
      res.status(404).json({ message: 'Table not found' });
    }
  } catch (error) {
    console.error('Error updating table reservation status:', error);
    res.status(500).json({ message: 'Internal server error' + req.body });
  }
}

async function deleteTableByTableNumber(req, res){
  try {
    console.log(JSON.stringify(req.params)+',req.body -> TableController');
    const updatedTable = await tableService.deleteTableByTableNumberFn(req.params);
    
    if (!updatedTable) {
      res.status(404).json({ message: `Table ${req} not found` });
    }

    res.status(201).json("Table Deleted");
  } catch (error) {
    console.error('Error updating table reservation status:', error);
    res.status(500).json({ message: 'Internal server error' + req.body });
  }

}

module.exports = {
  createTableFn, getAllTables, changeTableReservationStatus, deleteTableByTableNumber
};

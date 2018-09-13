let express = require('express');
let router = express.Router();

let employee = require('../controllers/EmployeeController');

// Get ALL Employees
router.get('/', employee.list);

// Get SINGLE Employee by ID
router.get('/show/:id', employee.show);

// Create Employee
router.get('/create', employee.create);

// Save Employee
router.post('/save', employee.save);

// Edit Employee
router.get('/edit/:id', employee.edit);

// Edit update Employee
router.post('/update/:id', employee.update);

// Delete Employee
router.post('/delete/:id', employee.delete);

module.exports = router;
let mongoose = require('mongoose');
let Employee = require('../models/Employee');

// Create Employee object
let employeeController = {};

// Create Employee control functions
employeeController.list = (req, res) => {
    Employee.find({}).exec((err, employees) => {
        if (err) {
            console.log('Error: ', err);
        } else {
            res.render('../views/employees/index', { employees: employees });
        } // End of IF-ELSE
    });
};

employeeController.show = (req, res) => {
    Employee.findOne({ _id: req.params.id }).exec((err, employee) => {
        if (err) {
            console.log('Error: ', err);
        } else {
            res.render('../views/employees/show', { employee: employee });
        } // End of IF-ELSE
    });
};

employeeController.create = (req, res) => {
    res.render('../views/employees/create');
};

employeeController.save = (req, res) => {
    let employee = new Employee(req.body);

    employee.save((err) => {
        if (err) {
            console.log(err);
            res.render('../views/employees/create');
        } else {
            console.log('Employee successfully created!');
            res.redirect('/employees/show/' + employee._id);
        } // End of IF-ELSE
    });
};

employeeController.edit = (req, res) => {
    Employee.findOne({ _id: req.params.id }).exec((err, employee) => {
        if (err) {
            console.log('Error: ', err);
        } else {
            res.render('../views/employees/edit', { employee: employee });
        } // End of IF-ELSE
    });
};

employeeController.update = (req, res) => {
    Employee.findByIdAndUpdate(
        req.params.id,
        { $set: {
            name: req.body.name,
            address: req.body.address,
            position: req.body.position,
            salary: req.body.salary
        }},
        { new: true },
        (err, employee) => {
            if (err) {
                console.log(err);
                res.render('../views/employees/edit', { employee: req.body });
            } // End of IF

            res.redirect('/employees/show/' + employee._id);
        }
    );
};

employeeController.delete = (req, res) => {
    Employee.remove({ _id: req.params.id }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Employee successfully deleted!');
            res.redirect('/employees');
        } // End of IF-ELSE
    });
};

module.exports = employeeController;

const inquirer = require('inquirer');
const mySQL = require('mysql2');
require('dotenv').config();
require('console.table');

const db = mySQL.createConnection(
    {
        host: 'localhost',
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD

    },
    console.log(`Connected to ${process.env.DB_NAME}`)
);
function start () {
    inquirer.prompt([{
    type: 'list',
    message: 'what will we be doing today',
    name: 'option',
    choices: [
        'add role',
        'add employee',
        'add department',
        'veiw employee',
        'view department',
        'veiw roles',
        'update role of an employee',
        'finish'

    ],
   
    
    }])
    .then(function(result){
        console.log('your option:' + result.option);
        switch (result.option){
            case 'add role': addRole();
            break;
            case 'add employee': addEmployee()
            break;
            case 'add department': addDepartment()
            break;
            case 'veiw employee': veiwEmployee()
            break
            case 'view department': viewDepartment()
            break;
            case  'veiw roles': veiwRoles()
            break;
            case 'update role of an employee': updateRoleEmployee()
            break;
            default: finish()
        }
    })
}

function addRole() {
    inquirer.prompt([
        {
        type: 'input',
        message: 'name of role?',
        name: 'nameRole'
        },
        {
           type: 'input',
           message: 'how much is thier sallery',
           name: 'saloryAmount' 
        },
        {
            type: 'input',
            message: 'whats the id for this department',
            name: 'departmentId'
        }

    ])
    .then(function(answer) {
       db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',[answer.nameRole, answer.saloryAmount, answer.departmentId], function(err,res){
        if (err) throw err;
        console.table(res);
        start();
       })
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'first name for employee',
            name: 'employeeFname'
        },
        {
            type: 'input',
            message: 'last name for employee',
            name: 'employeeLname'
        },
        {
            type: 'input',
            message: 'the role id number',
            name: 'idRole'
        },
        {
            type: 'input',
            message: 'what the manager id',
            name: 'idManager'
        }
    ])
    
    .then(function(answer) {
    db.query("INSERT INTO employee (first_name, Last_name, role_id, manager_id) VALUES (?,?,?,?)", [answer.employeeFname, answer.employeeLname, answer.idRole, answer.idManager], function(err,res){
        if (err) throw err;
        console.table(res);
        start();
    }); 
});

}


function addDepartment() {
    inquirer.prompt({
        type: 'input',
        message: 'name of the department',
        name: 'nameDepartment'
    })
    .then(function(answer){
        db.query("INSERT INTO department (name) VALUES (?)", [answer.nameDepartment] , function(err, res) {
            if (err) throw err;
            console.table(res)
            start()
    })
    })
    
}


function veiwEmployee() {
    let query = "SELECT * FROM employee";
    db.query(query, function(err, res){
        if (err) throw err
        console.table(res);
        start();
    });
}

function viewDepartment() {
    let query =  "SELECT * FROM department";
    db.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
}

function veiwRoles() {
    let query = "SELECT * FROM role";
    db.query(query, function(err, res){
        if (err) throw err;
        console.table(res)
        start()
    })
}


function updateRoleEmployee() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "pick which eployee to update?",
        name: "employeeUpdate"
      },

      {
        type: "input",
        message: "what role do you want to change to?",
        name: "roleUpdate"
      }
    ])
    .then(function(answer) {
        db.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.roleUpdate, answer.employeeUpdate],function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
          });
        });
    }



    function finish() {
        connection.end();
  process.exit();
    };
    
    start()
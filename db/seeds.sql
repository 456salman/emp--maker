

INSERT INTO department (name)
VALUES ("legal"),
    ("engineering"), 
    ("production"), 
    ("operations");


 INSERT INTO role (title, salary, department_id)
VALUES ("lawyer",1000000,1), 
    ("engineer",2340000,2), 
        ("producer",4543000,3), 
            ("operator",32450000,4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("john", "ham", 1, NULL),
    ("cam", "dam", 2, NULL),
    ("fam", "gam", 3, NULL),
    ("nam", "kam", 4, NULL);

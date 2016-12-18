var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'pimpin66',
    database: 'Bamazon'
});

connection.connect();

var start = function(){
    connection.query('SELECT * FROM products', function(err, rows){
        if (err) throw err;
            console.log("Item ID -- Product Title -- Department -- Price -- Stock");
            for (var i in rows){
            console.log(rows[i].item_id, rows[i].product_name, rows[i].department_name, rows[i].price, rows[i].stock_quantity);
    }
    inquirer.prompt({
        name: 'idWanted',
        type: 'input',
        message: 'What item would you like to purchase - please enter the Item ID',
        validate: function(value){
            if(isNaN(value) === false){
                return true;
            };
        }
    }).then(function(answer){
       
        if(rows[i].item_id === answer.idWanted){
            
            inquirer.prompt({
                name: "quantityWanted",
                type: 'input',
                message: 'How many would you like to purchase?',
                validate: function(value){
                    if(isNaN(value) === false){
                        return true;
                    }
                    return false;
                }
            }).then(function(answer){
                if (rows[i].stock_quantity > answer.quantityWanted){
                    console.log("The total price for your order is: " + (rows[i].price * answer.quantityWanted));
                }
            });
        }
        });
    
    });
};

   
    
//     ,{
//         name: 'quantityWanted',
//         type: 'input',
//         message: 'How many would you like to purchase?',
//         validate: function(value){
//             if(isNaN(value) === false){
//                 return true;
//             }
//             return false;
//         }
//     }]).then(function(answer){
//         if (rows[i].item_id === answer.idWanted && rows[i].stock_quantity >= answer.quantityWanted){
//         console.log("The total price for your order is: " + (rows[i].price * answer.quantityWanted));
//         }
//         else if (rows[i].item_id === answer.idWanted){
//             console.log("The item id that you put in does not exists, please try again");
//         }
//         else {
//             console.log("The quantity that you want is not available");
//         }
//     })
//     })
// };
start();
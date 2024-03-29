
const { Sequelize } = require('sequelize');

// const Op = Sequelize.Op;


// Option 2: Passing parameters separately (other dialects)
// const db = new Sequelize('uptasknode', 'root', 'root', {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: '3306',
//     define: {
//         timestamps: false
//     },
//     ppool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//       }
// });
const db = new Sequelize('Uptask', '', '', {
    dialect: 'sqlite',
    storage: 'uptask.sqlite', // or ':memory:'
    define:{
        underscored:true
    },
    operatorsAliases:false
});
module.exports = db; 
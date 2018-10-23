var Sequelize = require('sequelize');
var sequelize = new Sequelize('stp', 'root', 'root', { dialect: 'mysql'});

var User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    password: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    role: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    email: {
        type: Sequelize.INTEGER,
        validate: {
            isEmail: true
        },
        defaultValue: null
    },
    phone: {
        type: Sequelize.STRING,
        validate: {
            len: 10
        },
        defaultValue: null
    }
  });
  
  
  User.sync();

//   User.create({username: 'vineeth-cnbr'}).then( res => console.log );

  module.exports = User;
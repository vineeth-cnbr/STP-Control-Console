var Sequelize = require('sequelize');
var sequelize = new Sequelize('stp', 'root', 'root', { dialect: 'mysql'});
var Stp = require('./Stp');

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
        notNull: true
    },
    role: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    email: {
        type: Sequelize.STRING,
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
  
  User.belongsTo(Stp);
  User.sync();

  const addUser = async () => {
    try {
        let stp = await Stp.findById('STP101');
        let user = await User.create({username: 'vineeth-cnbr'});
        user.setStp(stp);
    }catch(err) {
        console.log(err);
    }
  }
  console.log("Add user");
  
//   addUser();
  
  module.exports = User;
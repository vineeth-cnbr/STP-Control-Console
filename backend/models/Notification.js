var Sequelize = require('sequelize');
var sequelize = new Sequelize('stp', 'root', 'root', { dialect: 'mysql'});
var Stp = require('./Stp');

var Notification = sequelize.define('notification', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    msg: {
        type: Sequelize.STRING,
        defaultValue: null
    }
  });
  
  Notification.belongsTo(Stp);
  Notification.sync();

  const addNotification = async () => {
    try {
        let stp = await Stp.findById('STP101');
        let notification = await Notification.create({id: '201',msg: 'OVERFLOW'});
        notification.setStp(stp);
    }catch(err) {
        console.log(err);
    }
  }
  console.log("Add Notification");
  
//   addNotification();
  
  module.exports = Notification;
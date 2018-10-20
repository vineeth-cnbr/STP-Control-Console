var Sequelize = require('sequelize');
var sequelize = new Sequelize('stp', 'root', 'root', { dialect: 'mysql'});

var Tank = sequelize.define('tank', {
  id: {
  type: Sequelize.STRING,
  primaryKey: true
  },
  length: Sequelize.INTEGER,
  breadth: Sequelize.INTEGER,
  height: Sequelize.INTEGER,
  status: Sequelize.BOOLEAN,
  level: Sequelize.INTEGER(3)
});


Tank.sync();

// sequelize.sync().then(function() {
//   return User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
//   });
// }).then(function(jane) {
//   console.log(jane.get({
//     plain: true
//   }));
// });
// Tank.create({id: 'C101', length: 1200, breadth: 5600, height: 8700, status: false, level: 30});
// Tank.create({id: 'A101', length: 3200, breadth: 5630, height: 8750, status: true, level: 0});

module.exports = Tank;